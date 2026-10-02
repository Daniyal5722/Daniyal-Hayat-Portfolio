import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";

import { 
  validateContactSubmission, 
  checkRateLimit, 
  checkDuplicateSubmission, 
  sendContactEmail 
} from "./src/server/emailService";

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Explicit resume PDF endpoints for direct download or browser viewing
app.get(["/resume/Daniyal-Hayat-Resume.pdf", "/Daniyal-Hayat-Resume.pdf", "/resume.pdf", "/cv.pdf"], (req, res) => {
  const filePath1 = path.join(process.cwd(), "public", "resume", "Daniyal-Hayat-Resume.pdf");
  const filePath2 = path.join(process.cwd(), "public", "Daniyal-Hayat-Resume.pdf");
  const targetPath = fs.existsSync(filePath1) ? filePath1 : filePath2;

  if (fs.existsSync(targetPath)) {
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      req.query.download === "true"
        ? 'attachment; filename="Daniyal-Hayat-Resume.pdf"'
        : 'inline; filename="Daniyal-Hayat-Resume.pdf"'
    );
    res.setHeader("Cache-Control", "public, max-age=86400");
    return res.sendFile(targetPath);
  } else {
    return res.status(404).send("Resume PDF not found.");
  }
});

// Contact message endpoint with validation, rate limiting, spam defense, and email dispatch
app.post("/api/contact", async (req, res) => {
  try {
    const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || 
               req.socket?.remoteAddress || 
               "127.0.0.1";
    const userAgent = req.headers["user-agent"] || "unknown";

    // 1. Rate Limiting Check
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ 
        error: "Too many messages sent. Please wait a few minutes before trying again." 
      });
    }

    const { name, email, subject, message, honeypot } = req.body || {};

    // 2. Server-Side Validation
    const validation = validateContactSubmission({ name, email, subject, message, honeypot });
    if (!validation.valid) {
      return res.status(400).json({ error: validation.error || "Invalid form submission." });
    }

    // 3. Duplicate Submission Protection
    if (checkDuplicateSubmission({ name, email, subject, message })) {
      return res.status(200).json({ 
        success: true, 
        message: "Message already received. Thanks for reaching out." 
      });
    }

    // 4. Send Email via configured provider (Resend API, SMTP, or Webhook)
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
        error: "Your message could not be sent. Please try again or reach out directly by email." 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: "Message sent successfully! Your message has been delivered. Thanks for reaching out." 
    });
  } catch (err: any) {
    console.error("[API /contact] Server error:", err);
    return res.status(500).json({ 
      error: "Something went wrong while processing your request. Please try again later." 
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
You are "Ask Daniyal", the official portfolio assistant for Daniyal Hayat.
Here is the official verified information about Daniyal Hayat:
- Name: Daniyal Hayat
- Role: Full-Stack Developer & Creative Builder
- Tagline: I build modern web experiences, interactive applications, AI-powered products, and creative digital experiences.
- Location: Available Globally & Remote
- Email: mdaniyalhayyat@gmail.com
- GitHub: https://github.com/DotDaniyal
- Portfolio Live URL: https://daniyal-hayat-portfolio.vercel.app/

Core Skills:
- Frontend: HTML5, CSS3, JavaScript, TypeScript, React 19, Next.js, Tailwind CSS, Motion (Framer Motion)
- Backend & Data: Node.js, Express, RESTful APIs, JSON, Local Storage, Data Handling
- AI Engineering: Google AI Studio, Gemini API SDK (@google/genai), Prompt Architecture, AI Agent Workflows, AI-powered interfaces
- Tools & Platforms: Git & GitHub, Vercel, Vite, Figma, Canva

Verified Real Projects:
1. Faryal FC (Web Platform)
   - Description: Modern football club digital platform featuring matchday fixture schedules, squad roster management, club highlights, and mobile fan experience.
   - Tech: React, Tailwind CSS, JavaScript, Responsive UI, Vercel.

2. DNYL Eyewear (Boutique Brand Showcase)
   - Description: High-contrast luxury eyewear boutique web experience with curated optical collections, prescription options, and editorial layout aesthetics.
   - Tech: React, TypeScript, Tailwind CSS, Motion.

3. Islamic AI / Mujeeb us Saileen (AI Platform)
   - Description: AI-assisted Islamic consultation platform connecting verified references and fatwa archives with intelligent search and natural language Q&A.
   - Tech: TypeScript, React, Google Gemini AI, REST APIs, Tailwind CSS.

4. SOUTNAQI AI (Audio & Speech Suite)
   - Description: Intelligent audio and voice processing suite providing speech clarity enhancement, transcript generation, and low-latency audio telemetry.
   - Tech: TypeScript, Audio Processing, AI Models, Node.js, Tailwind CSS.

5. Official Darul Ifta Irshad us Saileen (Web Platform & Android App)
   - Description: Production consultation platform serving religious guidance and fatwa archives with responsive layouts and offline-cached Android companion app.
   - Tech: JavaScript, Tailwind CSS, Kotlin, Android SDK, SQLite/Room.
   - Live URL: https://darulifta-bkfbzf6u.manus.space/
   - GitHub: https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-

6. CortexIQ AI Suite
   - Description: Production-ready AI computational intelligence suite featuring advanced LLM integration, reactive dashboard telemetry, and modular tool pipelines.
   - Tech: TypeScript, React, Google Gemini AI, Tailwind CSS, Vite, Motion.
   - GitHub: https://github.com/DotDaniyal/cortexiq-by-dnyl

7. Hamara Weather
   - Description: Real-time meteorological tracking application delivering live atmospheric condition metrics, precision forecasts, and intuitive visual data.
   - Tech: JavaScript, OpenWeather API, HTML5, CSS3.
   - Live URL: https://hamara-weather.vercel.app/
   - GitHub: https://github.com/DotDaniyal/Hamara-Weather

8. Mystic Match Puzzle Game
   - Description: Mobile-first fantasy match-3 algorithmic puzzle game engineered in Kotlin with custom game mechanics and responsive touch physics.
   - Tech: Kotlin, Android, Canvas, Algorithms.
   - Live URL: https://mystic-match-rho.vercel.app/
   - GitHub: https://github.com/DotDaniyal/mystic-match-by-dnyl

9. Motorcycle Sprint 2D
   - Description: High-performance 2D arcade physics racing simulation with responsive touch controls and lightweight canvas loop.
   - Tech: JavaScript, HTML5 Canvas, Physics Engine.

Creative Lab:
- Daniyal explores UI experiments (magnetic buttons, glassmorphic telemetry HUDs), visual branding (DNYL Eyewear branding in Canva), motion experiments, and algorithmic HTML5 canvas particle networks.

Instructions:
- Answer ONLY using the factual portfolio details above.
- Be concise, friendly, authentic, and technically accurate.
- If asked about projects, mention Faryal FC, DNYL Eyewear, CortexIQ, Darul Ifta, Hamara Weather, Mystic Match, Islamic AI, and SOUTNAQI AI.
- Never invent clients, fake companies, or unverified claims.
- Provide clean Markdown formatting with links where available.
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

    // Format chat history for Gemini model
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Attempt generation with a resilient fallback model strategy to bypass high-demand spikes
    let reply = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: contents,
        config: {
          systemInstruction: PORTFOLIO_CONTEXT,
          temperature: 0.4,
          maxOutputTokens: 800,
        }
      });
      reply = response.text || "I am here to help you explore Daniyal's portfolio!";
    } catch (firstErr: any) {
      console.warn("Primary model failed, falling back to backup model...", firstErr.message);
      // Fallback to gemini-3.1-pro-preview
      const backupResponse = await ai.models.generateContent({
        model: "gemini-3.1-pro-preview",
        contents: contents,
        config: {
          systemInstruction: PORTFOLIO_CONTEXT,
          temperature: 0.4,
          maxOutputTokens: 800,
        }
      });
      reply = backupResponse.text || "I am here to help you explore Daniyal's portfolio!";
    }

    return res.json({ reply });
  } catch (err: any) {
    console.error("Chat API error:", err);
    return res.status(500).json({ 
      error: "Sorry, I'm having trouble connecting right now. Please try again in a moment." 
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
  console.log(`Server running on port ${PORT}`);
});
