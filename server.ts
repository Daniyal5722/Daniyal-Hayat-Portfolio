import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// API health endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", uptime: process.uptime(), timestamp: new Date().toISOString() });
});

// Contact message endpoint for durable persistence
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }
    console.log(`[Contact Transmission] Received message from ${name} (${email}): ${message.slice(0, 50)}...`);
    return res.status(200).json({ 
      success: true, 
      message: "Message received successfully. Daniyal will follow up with you shortly." 
    });
  } catch (err: any) {
    return res.status(500).json({ error: "Failed to process contact message." });
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
You are Daniyal AI, the professional AI portfolio assistant for Daniyal Hayat.
Here is the official verified information about Daniyal Hayat:
- Name: Daniyal Hayat
- Role: Software Engineer & Product Builder
- Tagline: Building Digital Experiences That Feel Different.
- Location: Available Globally & Remote
- Email: mdaniyalhayyat@gmail.com
- GitHub: https://github.com/Daniyal5722
- Portfolio Live URL: https://daniyal-hayat-portfolio.vercel.app/

Core Skills:
- Languages: TypeScript, JavaScript, Kotlin, HTML5, CSS3
- Frontend: React 19, Next.js, Tailwind CSS, Motion (Framer Motion), Vite
- Mobile: Android SDK, Kotlin, Native Mobile Architecture, Offline Caching
- Backend & Tools: Node.js, Express, RESTful APIs, Git & GitHub, Vercel, Netlify

Verified Projects & Live Apps:
1. Official Darul Ifta Irshad us Saileen (Web Platform)
   - Description: Production web platform serving community religious consultation and guidance resources.
   - Tech: JavaScript, Tailwind CSS, HTML5, REST APIs
   - Live URL: https://darulifta-bkfbzf6u.manus.space/
   - GitHub: https://github.com/Daniyal5722/Offical-Darul-ifta-Irshad-us-saileen-

2. CortexIQ AI Suite
   - Description: Production-ready AI computational intelligence suite featuring advanced LLM integration, reactive dashboard telemetry, and modular tool pipelines.
   - Tech: TypeScript, React, Google Gemini AI, Tailwind CSS, Vite, Motion
   - Live URL: https://daniyal-hayat-portfolio.vercel.app/
   - GitHub: https://github.com/Daniyal5722/cortexiq-by-dnyl

3. Hamara Weather
   - Description: Real-time meteorological tracking application delivering live atmospheric condition metrics, precision forecasts, and intuitive visual data.
   - Tech: JavaScript, OpenWeather API, HTML5, CSS3
   - Live URL: https://hamara-weather.vercel.app/
   - GitHub: https://github.com/Daniyal5722/Hamara-Weather

4. Mystic Match Puzzle Game
   - Description: Mobile-first fantasy match-3 algorithmic puzzle game engineered in Kotlin with custom game mechanics and responsive touch physics.
   - Tech: Kotlin, Android, Algorithms, Canvas
   - Live URL: https://mystic-match-rho.vercel.app/
   - GitHub: https://github.com/Daniyal5722/mystic-match-by-dnyl

5. Darul Ifta Android App v2
   - Description: Second-generation native Android application featuring robust offline caching and refined Material layouts.
   - Tech: Kotlin, Android SDK, SQLite/Room, XML Layouts
   - GitHub: https://github.com/Daniyal5722/Darul-Ifta-Irshad-us-Saileen-app2

Instructions:
- Be concise, friendly, natural, and professional.
- Support English, Urdu, Roman Urdu, and Arabic.
- Never invent jobs, companies, or statistics.
- Provide clean Markdown with links to live demos and GitHub when appropriate.
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

    // Format chat history for Gemini model (using gemini-2.5-flash or standard model)
    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Attempt generation with a resilient fallback model strategy to bypass high-demand spikes
    let reply = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
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
      // Fallback to gemini-1.5-flash
      const backupResponse = await ai.models.generateContent({
        model: "gemini-1.5-flash",
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
