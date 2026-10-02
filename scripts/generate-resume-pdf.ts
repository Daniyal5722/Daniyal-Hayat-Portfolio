import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const resumeDir = path.join(process.cwd(), 'public', 'resume');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const outputPath1 = path.join(resumeDir, 'Daniyal-Hayat-Resume.pdf');
const outputPath2 = path.join(process.cwd(), 'public', 'Daniyal-Hayat-Resume.pdf');

function buildResume(outputPath: string) {
  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 36, bottom: 36, left: 40, right: 40 },
    info: {
      Title: 'Daniyal Hayat - Full-Stack Developer & Creative Builder Resume',
      Author: 'Daniyal Hayat',
      Subject: 'Software Engineer & Full-Stack Developer Curriculum Vitae',
      Keywords: 'Daniyal Hayat, Full-Stack Developer, Software Engineer, React, TypeScript, Kotlin, Android, Next.js, Google Gemini, AI Studio, Portfolio, Resume',
      Creator: 'Daniyal Hayat Portfolio Engine',
    }
  });

  const stream = fs.createWriteStream(outputPath);
  doc.pipe(stream);

  const primaryColor = '#0f172a'; // Slate 900
  const accentColor = '#0891b2'; // Cyan 600
  const secondaryColor = '#475569'; // Slate 600
  const mutedColor = '#64748b'; // Slate 500
  const hairlineColor = '#cbd5e1'; // Slate 300
  const pageWidth = doc.page.width - 80; // 595.28 - 80 = 515.28

  // --- HEADER ---
  doc
    .fontSize(24)
    .font('Helvetica-Bold')
    .fillColor(primaryColor)
    .text('DANIYAL HAYAT', { characterSpacing: 1 });

  doc
    .fontSize(11)
    .font('Helvetica-Bold')
    .fillColor(accentColor)
    .text('FULL-STACK DEVELOPER & CREATIVE BUILDER', { characterSpacing: 0.5 });

  doc.moveDown(0.25);

  // Contact Info Row
  const contactText = 'Email: mdaniyalhayyat@gmail.com  |  GitHub: github.com/DotDaniyal  |  Portfolio: daniyal-hayat-portfolio.vercel.app';
  doc
    .fontSize(8.5)
    .font('Helvetica')
    .fillColor(secondaryColor)
    .text(contactText);

  doc.moveDown(0.5);

  // Hairline Rule
  const currentY = doc.y;
  doc
    .strokeColor(hairlineColor)
    .lineWidth(0.75)
    .moveTo(40, currentY)
    .lineTo(40 + pageWidth, currentY)
    .stroke();

  doc.moveDown(0.5);

  // --- SECTION: PROFESSIONAL SUMMARY ---
  renderSectionHeading(doc, 'EXECUTIVE SUMMARY');
  doc
    .fontSize(9)
    .font('Helvetica')
    .fillColor(secondaryColor)
    .text(
      'Full-Stack Developer and Native Android Engineer specializing in architecting modern, high-performance web applications (React, Next.js, TypeScript), cross-platform native mobile solutions in Kotlin, and intelligent generative AI pipelines with Google AI Studio and Gemini models. Committed to clean architecture, zero-bloat performance, accessible UX/UI craft, and resilient offline capabilities.',
      { lineGap: 2.5 }
    );

  doc.moveDown(0.6);

  // --- SECTION: TECHNICAL CORE PROFICIENCIES ---
  renderSectionHeading(doc, 'TECHNICAL CORE PROFICIENCIES');

  const skillsData = [
    { cat: 'Frontend Engineering', items: 'React 19, Next.js, TypeScript, JavaScript (ES6+), Tailwind CSS v4, HTML5/CSS3, Motion, Responsive Design' },
    { cat: 'Mobile & Backend', items: 'Kotlin, Native Android SDK, Room/SQLite, Offline Caching, Node.js, Express, RESTful APIs, JSON' },
    { cat: 'AI & Intelligence', items: 'Google AI Studio, Google Gemini SDK (@google/genai), Prompt Architecture, Multimodal Grounding, Agent Logic' },
    { cat: 'Tooling & DevOps', items: 'Git, GitHub, Vercel, Vite, Linux/Bash, Figma, Lighthouse Optimization, PWA Standards' },
  ];

  skillsData.forEach(s => {
    doc
      .fontSize(8.5)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text(`• ${s.cat}: `, { continued: true })
      .font('Helvetica')
      .fillColor(secondaryColor)
      .text(s.items, { lineGap: 1.5 });
  });

  doc.moveDown(0.6);

  // --- SECTION: SELECTED PRODUCTION PROJECTS ---
  renderSectionHeading(doc, 'SELECTED PRODUCTION PROJECTS & OPEN SOURCE');

  const projects = [
    {
      title: 'Official Darul Ifta Irshad us Saileen & Islamic AI',
      role: 'Lead Architect & Full-Stack Developer',
      tech: 'JavaScript, Tailwind CSS, Kotlin, REST APIs, Google Gemini AI',
      live: 'darulifta-bkfbzf6u.manus.space',
      github: 'github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-',
      bullets: [
        'Architected high-throughput responsive web platform and native Android mobile apps serving community religious consultation.',
        'Engineered offline-first local caching in Kotlin to ensure reliable guidance access in remote low-connectivity regions.',
        'Integrated Gemini AI intelligence pipeline for cited theology research with strict grounding in authoritative archives.'
      ]
    },
    {
      title: 'CortexIQ AI Suite & AI Prompt Studio',
      role: 'Creator & Full-Stack Engineer',
      tech: 'TypeScript, React 19, Google Gemini SDK, Node.js, Express, Vite',
      live: 'daniyal-hayat-portfolio.vercel.app',
      github: 'github.com/DotDaniyal/cortexiq-by-dnyl',
      bullets: [
        'Built full-stack computational intelligence dashboard pairing natural language queries with real-time reactive telemetry.',
        'Implemented secure Node.js proxy routes to isolate sensitive model credentials from client-side runtime environments.',
        'Achieved sub-100ms UI responsiveness while rendering live asynchronous AI token streams and analytical metrics.'
      ]
    },
    {
      title: 'Hamara Weather — Real-Time Meteorological Tracking',
      role: 'Frontend Engineer',
      tech: 'JavaScript (ES6+), Weather APIs, CSS3 Modern Flex/Grid, Vercel',
      live: 'hamara-weather.vercel.app',
      github: 'github.com/DotDaniyal/Hamara-Weather',
      bullets: [
        'Developed ad-free live atmospheric conditions tracking dashboard with precision humidity, wind, and forecast telemetry.',
        'Designed lightweight async pipeline with defensive error handling for edge cases and location network interruptions.'
      ]
    },
    {
      title: 'Mystic Match — Algorithmic Mobile & Web Puzzle Game',
      role: 'Game Engineer',
      tech: 'Kotlin, Android Canvas, 2D Matrix Algorithms, State Machines',
      live: 'mystic-match-rho.vercel.app',
      github: 'github.com/DotDaniyal/mystic-match-by-dnyl',
      bullets: [
        'Engineered bespoke match-3 algorithmic engine in Kotlin with cascading matrix replenishment and fluid touch ergonomics.',
        'Implemented deterministic state machines to eliminate infinite cascade loops and memory leaks.'
      ]
    },
    {
      title: 'Faryal FC Digital Headquarters & DNYL Eyewear Experience',
      role: 'Product & UI/UX Developer',
      tech: 'React, TypeScript, Tailwind CSS, Motion, Responsive UX',
      live: 'daniyal-hayat-portfolio.vercel.app',
      github: 'github.com/DotDaniyal',
      bullets: [
        'Crafted modern athletic sports hub with interactive rosters, matchday countdowns, and responsive fan drawer.',
        'Created luxury digital showroom featuring 60 FPS motion transitions, fluid typography, and sub-second asset rendering.'
      ]
    }
  ];

  projects.forEach((p, idx) => {
    // Project Title and Tech
    doc
      .fontSize(9.5)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text(p.title, { continued: true })
      .font('Helvetica')
      .fillColor(mutedColor)
      .text(`  |  ${p.role}`);

    doc
      .fontSize(8)
      .font('Helvetica-Bold')
      .fillColor(accentColor)
      .text(`Technologies: `, { continued: true })
      .font('Helvetica')
      .fillColor(secondaryColor)
      .text(`${p.tech}   [Live: ${p.live}  |  GitHub: ${p.github}]`);

    p.bullets.forEach(b => {
      doc
        .fontSize(8.25)
        .font('Helvetica')
        .fillColor(secondaryColor)
        .text(`  •  ${b}`, { lineGap: 1.25, indent: 6 });
    });

    if (idx < projects.length - 1) {
      doc.moveDown(0.35);
    }
  });

  doc.moveDown(0.5);

  // --- SECTION: EXPERIENCE & MILESTONES ---
  renderSectionHeading(doc, 'EXPERIENCE & ENGINEERING MILESTONES');

  const experience = [
    {
      period: '2025 — Present',
      role: 'Full-Stack Web & Native Android Developer',
      company: 'Independent Software Engineer & Product Builder',
      desc: 'Architecting end-to-end production web platforms and native mobile apps with strict emphasis on performance, type safety, accessibility, and modern UI craft.'
    },
    {
      period: '2024 — 2025',
      role: 'Mobile Application Developer',
      company: 'Native Android & Algorithmic Systems Focus',
      desc: 'Mastered Kotlin Android architecture, Room database, offline synchronization routines, and touch-optimized canvas engines.'
    },
    {
      period: '2023 — 2024',
      role: 'Frontend Developer',
      company: 'Modern Web Engineering & React Foundations',
      desc: 'Built responsive web platforms, async REST API integrations, and component-driven design systems with strict Git version control.'
    }
  ];

  experience.forEach(e => {
    doc
      .fontSize(9)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text(`${e.role} — ${e.company}`, { continued: true })
      .font('Helvetica')
      .fillColor(mutedColor)
      .text(` (${e.period})`);

    doc
      .fontSize(8.25)
      .font('Helvetica')
      .fillColor(secondaryColor)
      .text(e.desc, { lineGap: 1.5, indent: 6 });

    doc.moveDown(0.25);
  });

  doc.moveDown(0.3);

  // --- SECTION: EDUCATION & SPECIALIZATIONS ---
  renderSectionHeading(doc, 'EDUCATION & CONTINUOUS LEARNING');

  const education = [
    {
      program: 'Core Computer Science, Algorithms & Software Architecture',
      institution: 'Continuous Academic & Applied Engineering Studies',
      detail: 'Data Structures, Algorithm Complexity, OOP in Kotlin/TypeScript, System Design, and Caching.'
    },
    {
      program: 'Google AI Studio, Gemini SDK & Generative AI Systems Specialization',
      institution: 'Advanced AI Specialization & Applied Verification (Google Developers & DeepMind)',
      detail: 'System instructions, structured JSON schemas, multimodal prompting, function calling, and server-side SDK proxying.'
    }
  ];

  education.forEach(ed => {
    doc
      .fontSize(8.75)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text(`• ${ed.program}`, { continued: true })
      .font('Helvetica')
      .fillColor(mutedColor)
      .text(` — ${ed.institution}`);

    doc
      .fontSize(8)
      .font('Helvetica')
      .fillColor(secondaryColor)
      .text(`   ${ed.detail}`, { lineGap: 1.25 });
  });

  doc.end();

  return new Promise<void>((resolve, reject) => {
    stream.on('finish', () => resolve());
    stream.on('error', (err) => reject(err));
  });
}

function renderSectionHeading(doc: PDFKit.PDFDocument, title: string) {
  const primaryColor = '#0f172a';
  const hairlineColor = '#cbd5e1';
  const pageWidth = doc.page.width - 80;

  doc
    .fontSize(10)
    .font('Helvetica-Bold')
    .fillColor(primaryColor)
    .text(title, { characterSpacing: 0.75 });

  const lineY = doc.y + 1;
  doc
    .strokeColor(hairlineColor)
    .lineWidth(0.5)
    .moveTo(40, lineY)
    .lineTo(40 + pageWidth, lineY)
    .stroke();

  doc.moveDown(0.35);
}

async function main() {
  console.log('Generating Daniyal Hayat Resume PDF...');
  await buildResume(outputPath1);
  console.log(`Generated: ${outputPath1}`);
  await buildResume(outputPath2);
  console.log(`Generated: ${outputPath2}`);
  console.log('Resume PDF generation complete!');
}

main().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
