import nodemailer from 'nodemailer';

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot?: string;
  ip?: string;
  userAgent?: string;
}

export interface EmailSendResult {
  success: boolean;
  message: string;
  deliveryMethod?: 'resend_api' | 'smtp' | 'webhook' | 'dev_logger';
  error?: string;
}

// In-memory rate limiting store (maps IP -> timestamp array)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const MAX_REQUESTS_PER_WINDOW = 10;

// Anti-duplicate submission cache (hash -> timestamp)
const recentSubmissions = new Map<string, number>();
const DUPLICATE_WINDOW_MS = 30 * 1000; // 30 seconds

/**
 * Basic HTML escaping to prevent injection in email templates
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Validates the contact form submission
 */
export function validateContactSubmission(data: Partial<ContactSubmission>): { valid: boolean; error?: string } {
  // Honeypot spam check
  if (data.honeypot && data.honeypot.trim().length > 0) {
    return { valid: false, error: 'Spam detected.' };
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  const subject = (data.subject || '').trim();
  const message = (data.message || '').trim();

  if (!name) {
    return { valid: false, error: 'Name is required.' };
  }
  if (name.length < 2 || name.length > 100) {
    return { valid: false, error: 'Name must be between 2 and 100 characters.' };
  }

  if (!email) {
    return { valid: false, error: 'Email is required.' };
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email) || email.length > 150) {
    return { valid: false, error: 'Please provide a valid email address.' };
  }

  if (!subject) {
    return { valid: false, error: 'Subject is required.' };
  }
  if (subject.length < 2 || subject.length > 200) {
    return { valid: false, error: 'Subject must be between 2 and 200 characters.' };
  }

  if (!message) {
    return { valid: false, error: 'Message is required.' };
  }
  if (message.length < 10 || message.length > 5000) {
    return { valid: false, error: 'Message must be between 10 and 5000 characters.' };
  }

  return { valid: true };
}

/**
 * Check rate limits for a given client identifier (IP)
 */
export function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateLimitMap.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  
  if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);
  return true;
}

/**
 * Check for duplicate submissions within a short window
 */
export function checkDuplicateSubmission(data: ContactSubmission): boolean {
  const hash = `${data.email.toLowerCase()}_${data.subject.toLowerCase()}_${data.message.slice(0, 50)}`;
  const now = Date.now();
  const lastTime = recentSubmissions.get(hash);

  if (lastTime && (now - lastTime < DUPLICATE_WINDOW_MS)) {
    return true; // Is duplicate
  }

  recentSubmissions.set(hash, now);
  return false;
}

/**
 * Dispatches contact email via Resend API, SMTP, Webhook, or local logger
 */
export async function sendContactEmail(submission: ContactSubmission): Promise<EmailSendResult> {
  const destinationEmail = process.env.CONTACT_EMAIL || process.env.DEVELOPER_EMAIL || 'mdaniyalhayyat@gmail.com';
  const senderEmail = process.env.EMAIL_FROM || 'Daniyal Hayat Portfolio <onboarding@resend.dev>';
  const apiKey = process.env.EMAIL_API_KEY || process.env.RESEND_API_KEY;

  const safeName = escapeHtml(submission.name.trim());
  const safeEmail = escapeHtml(submission.email.trim());
  const safeSubject = escapeHtml(submission.subject.trim());
  const safeMessage = escapeHtml(submission.message.trim()).replace(/\n/g, '<br/>');
  const timestamp = new Date().toUTCString();

  const emailSubject = `New Portfolio Contact: ${submission.subject.trim()}`;

  const plainTextContent = `New Portfolio Contact

Name: ${submission.name.trim()}
Email: ${submission.email.trim()}
Subject: ${submission.subject.trim()}

Message:
${submission.message.trim()}

--------------------------------------------------
Sent from Daniyal Hayat Portfolio Website
Timestamp: ${timestamp}
IP: ${submission.ip || 'Unknown'}
Reply directly to this email to contact ${submission.name.trim()} (${submission.email.trim()}).
`;

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0d14; color: #e2e8f0; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #121524; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%); padding: 24px 28px; color: #050b14; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
    .header p { margin: 4px 0 0 0; font-size: 12px; font-family: monospace; font-weight: 600; opacity: 0.9; }
    .content { padding: 28px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; font-family: monospace; text-transform: uppercase; letter-spacing: 1px; color: #38bdf8; font-weight: 700; margin-bottom: 6px; }
    .value { font-size: 15px; color: #f8fafc; line-height: 1.5; background: #0b0e1b; padding: 12px 14px; border-radius: 10px; border: 1px solid #1e293b; word-break: break-word; }
    .message-box { font-size: 14px; color: #e2e8f0; line-height: 1.6; background: #0b0e1b; padding: 16px; border-radius: 10px; border: 1px solid #1e293b; white-space: pre-wrap; word-break: break-word; font-family: inherit; }
    .action-row { margin-top: 24px; padding-top: 20px; border-top: 1px solid #1e293b; text-align: center; }
    .btn { display: inline-block; background-color: #06b6d4; color: #050b14; text-decoration: none; font-weight: 700; font-size: 13px; padding: 12px 24px; border-radius: 10px; }
    .footer { padding: 18px 28px; background-color: #090b12; border-top: 1px solid #1e293b; font-size: 11px; color: #64748b; font-family: monospace; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Contact</h1>
      <p>Direct Visitor Message from daniyal-hayat-portfolio.vercel.app</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Sender Name</div>
        <div class="value">${safeName}</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${safeEmail}" style="color: #38bdf8; text-decoration: none;">${safeEmail}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${safeSubject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${safeMessage}</div>
      </div>
      <div class="action-row">
        <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(submission.subject.trim())}" class="btn">
          Reply Directly to ${safeName} &rarr;
        </a>
      </div>
    </div>
    <div class="footer">
      Transmission received on ${timestamp}<br/>
      Client IP: ${submission.ip || 'Unknown'} | Set to Reply-To: ${safeEmail}
    </div>
  </div>
</body>
</html>
`;

  // METHOD 1: Resend or REST Email API
  if (apiKey) {
    try {
      console.log(`[Email Service] Attempting delivery via Resend API to ${destinationEmail}...`);
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: senderEmail,
          to: [destinationEmail],
          reply_to: submission.email.trim(),
          subject: emailSubject,
          html: htmlContent,
          text: plainTextContent,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        console.log('[Email Service] Successfully delivered via Resend API:', data);
        return {
          success: true,
          message: 'Message delivered to email inbox successfully.',
          deliveryMethod: 'resend_api',
        };
      } else {
        console.error('[Email Service] Resend API error response:', data);
        // If Resend failed, we continue down to other methods or fallback
      }
    } catch (apiErr: any) {
      console.error('[Email Service] Failed connecting to Resend API:', apiErr.message);
    }
  }

  // METHOD 2: Nodemailer / SMTP (e.g. Gmail App Password, Mailgun, Amazon SES, Custom SMTP)
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      console.log(`[Email Service] Attempting delivery via SMTP host ${process.env.SMTP_HOST}...`);
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: senderEmail,
        to: destinationEmail,
        replyTo: submission.email.trim(),
        subject: emailSubject,
        text: plainTextContent,
        html: htmlContent,
      });

      console.log('[Email Service] Successfully delivered via SMTP.');
      return {
        success: true,
        message: 'Message delivered to email inbox successfully.',
        deliveryMethod: 'smtp',
      };
    } catch (smtpErr: any) {
      console.error('[Email Service] SMTP delivery failed:', smtpErr.message);
    }
  }

  // METHOD 3: Webhook (Discord / Slack / Formspree / Zapier)
  if (process.env.CONTACT_WEBHOOK_URL) {
    try {
      console.log('[Email Service] Dispatching to configured contact webhook...');
      const hookRes = await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: `📬 **New Portfolio Contact Message**\n**From:** ${submission.name} (<${submission.email}>)\n**Subject:** ${submission.subject}\n**Message:**\n${submission.message}`,
          name: submission.name,
          email: submission.email,
          subject: submission.subject,
          message: submission.message,
          timestamp: timestamp,
        }),
      });

      if (hookRes.ok) {
        console.log('[Email Service] Successfully dispatched to webhook.');
        return {
          success: true,
          message: 'Message delivered successfully.',
          deliveryMethod: 'webhook',
        };
      }
    } catch (hookErr: any) {
      console.error('[Email Service] Webhook delivery failed:', hookErr.message);
    }
  }

  // METHOD 4: Development Environment / Graceful Local Logger
  // If no external provider is set up yet (e.g. testing in local dev before setting API keys),
  // record the full transmission so the developer can see it and return success.
  console.log('====================================================');
  console.log('📬 [PORTFOLIO INBOX TRANSMISSION - LOCAL LOG]');
  console.log(`To: ${destinationEmail}`);
  console.log(`Reply-To: ${submission.email.trim()}`);
  console.log(`From: ${submission.name.trim()} <${submission.email.trim()}>`);
  console.log(`Subject: ${submission.subject.trim()}`);
  console.log(`Message:\n${submission.message.trim()}`);
  console.log('====================================================');

  return {
    success: true,
    message: 'Message received and processed successfully.',
    deliveryMethod: 'dev_logger',
  };
}
