import { validateContactSubmission, checkRateLimit, checkDuplicateSubmission, sendContactEmail } from '../src/server/emailService';

export default async function handler(req: any, res: any) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 
               req.socket?.remoteAddress || 
               'unknown';
    const userAgent = req.headers['user-agent'] || 'unknown';

    // 1. Rate Limiting Check
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: 'Too many messages sent. Please wait a few minutes before trying again.' 
      });
    }

    const { name, email, subject, message, honeypot } = req.body || {};

    // 2. Server-side validation
    const validation = validateContactSubmission({ name, email, subject, message, honeypot });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error || 'Invalid form submission.' });
    }

    // 3. Duplicate submission check
    if (checkDuplicateSubmission({ name, email, subject, message })) {
      return res.status(200).json({ 
        success: true, 
        message: 'Message already received. Thanks for reaching out.' 
      });
    }

    // 4. Send Email via configured provider
    const result = await sendContactEmail({
      name,
      email,
      subject,
      message,
      honeypot,
      ip,
      userAgent,
    });

    if (!result.success) {
      return res.status(500).json({ 
        error: 'Your message could not be sent. Please try again or reach out directly by email.' 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Message sent successfully! Your message has been delivered. Thanks for reaching out.' 
    });
  } catch (err: any) {
    console.error('[API /contact] Serverless handler error:', err);
    return res.status(500).json({ 
      error: 'Something went wrong while processing your request. Please try again later.' 
    });
  }
}
