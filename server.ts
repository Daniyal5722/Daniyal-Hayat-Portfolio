import express from "express";
import path from "path";
import { z } from "zod";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory sliding window rate limiter for contact submissions
const contactRateLimits = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Contact validation schema using Zod
const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please provide a valid email address").max(150),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000, "Message must be under 3000 characters"),
  website: z.string().optional(), // Honeypot field
});

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "ok", 
    uptime: Math.floor(process.uptime()), 
    timestamp: new Date().toISOString(),
    service: "daniyal-hayat-portfolio-api" 
  });
});

// Contact message endpoint with Zod validation, rate limiting & honeypot protection
app.post("/api/contact", (req, res) => {
  try {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || req.socket.remoteAddress || "unknown-ip";
    const now = Date.now();

    // Check sliding window rate limit
    const timestamps = (contactRateLimits.get(ip) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
    if (timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return res.status(429).json({ 
        success: false, 
        error: "Too many contact requests from this connection. Please wait a few minutes before trying again or email mdaniyalhayyat@gmail.com directly." 
      });
    }

    // Validate body with Zod
    const parseResult = ContactSchema.safeParse(req.body);
    if (!parseResult.success) {
      const firstError = parseResult.error.issues[0]?.message || "Invalid contact form submission";
      return res.status(400).json({ success: false, error: firstError });
    }

    const { name, email, subject, message, website } = parseResult.data;

    // Honeypot check: If the hidden website input has any value, silently discard bot submission
    if (website && website.trim().length > 0) {
      console.warn(`[Spam Blocked] Honeypot triggered from ${ip}`);
      return res.status(200).json({ 
        success: true, 
        message: "Message received successfully. Thank you for reaching out." 
      });
    }

    // Record request timestamp for rate limiting
    timestamps.push(now);
    contactRateLimits.set(ip, timestamps);

    console.log(`[Contact Transmission] From: ${name} <${email}> | Subject: ${subject || "General Inquiry"}`);
    console.log(`[Message Snippet] ${message.slice(0, 100)}...`);

    return res.status(200).json({ 
      success: true, 
      message: "Thank you for getting in touch. Your message has been received, and Daniyal will follow up with you within 24 hours." 
    });
  } catch (err: any) {
    console.error("Contact API internal error:", err);
    return res.status(500).json({ 
      success: false, 
      error: "Unable to process message at this time. Please contact mdaniyalhayyat@gmail.com directly." 
    });
  }
});

// Initialize Google Gemini AI securely on the server side
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ 
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
}) : null;

// Portfolio knowledge base context
const PORTFOLIO_CONTEXT = `
You are the portfolio assistant for Daniyal Hayat.
Here is the official verified information about Daniyal Hayat:
- Name: Daniyal Hayat
- Role: Software Engineer & Builder
- Location: Available Globally & Remote
- Email: mdaniyalhayyat@gmail.com
- GitHub: https://github.com/Daniyal5722
- Portfolio Live URL: https://daniyal-hayat-portfolio.vercel.app/

Core Skills:
- Languages: TypeScript, JavaScript, Kotlin, SQL, HTML5, CSS3
- Frontend: React 19, Next.js, Tailwind CSS, Vite, Motion
- Mobile: Android SDK, Kotlin, Room/SQLite, Native Mobile Architecture, Offline Caching
- Systems & AI: Node.js, Express, Google Gemini AI SDK, Git, Vercel

Verified Projects:
1. Official Darul Ifta Irshad us Saileen (Web Platform) - https://darulifta-bkfbzf6u.manus.space/
2. CortexIQ AI Suite - https://daniyal-hayat-portfolio.vercel.app/
3. Hamara Weather - https://hamara-weather.vercel.app/
4. Mystic Match Puzzle Game - https://mystic-match-rho.vercel.app/
5. Darul Ifta Android App v2 - Native Android with Room offline caching
6. Daniyal Hayat Portfolio Platform - https://daniyal-hayat-portfolio.vercel.app/

Always be concise, precise, professional, and truthful. Never invent companies, degrees, or clients.
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid messages format" });
    }

    if (!ai) {
      return res.status(503).json({ 
        error: "AI service is currently not configured. Please explore Daniyal's portfolio directly or contact mdaniyalhayyat@gmail.com." 
      });
    }

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: contents,
        config: {
          systemInstruction: PORTFOLIO_CONTEXT,
          temperature: 0.3,
          maxOutputTokens: 600,
        }
      });
      return res.json({ reply: response.text || "I am here to help you explore Daniyal's portfolio and projects." });
    } catch (firstErr: any) {
      const backupResponse = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: contents,
        config: {
          systemInstruction: PORTFOLIO_CONTEXT,
          temperature: 0.3,
          maxOutputTokens: 600,
        }
      });
      return res.json({ reply: backupResponse.text || "I am here to help you explore Daniyal's portfolio." });
    }
  } catch (err: any) {
    console.error("Chat API error:", err);
    return res.status(500).json({ 
      error: "Unable to process chat request right now. Please email mdaniyalhayyat@gmail.com." 
    });
  }
});

// Vite middleware setup for development / production
if (process.env.NODE_ENV !== "production") {
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const distPath = path.join(process.cwd(), 'dist');
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Portfolio server active at http://0.0.0.0:${PORT}`);
});
