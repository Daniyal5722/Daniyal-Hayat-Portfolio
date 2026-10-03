import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const resumeDir = path.join(process.cwd(), 'public', 'resume');
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir, { recursive: true });
}

const outputPath1 = path.join(resumeDir, 'Daniyal-Hayat-Resume.pdf');
const outputPath2 = path.join(process.cwd(), 'public', 'Daniyal-Hayat-Resume.pdf');

function buildResume(outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // A4 size: 595.28 x 841.89 points
    const doc = new PDFDocument({
      size: 'A4',
      margins: { top: 32, bottom: 32, left: 36, right: 36 },
      info: {
        Title: 'Resume',
        Author: 'Daniyal Hayat',
        Subject: 'Professional Curriculum Vitae & Resume of Daniyal Hayat',
        Keywords: 'Resume, Daniyal Hayat, Full-Stack Developer, Software Engineer, Kotlin, React, TypeScript, Android SDK, Gemini AI',
        Creator: 'Daniyal Hayat',
        Producer: 'Daniyal Hayat Resume Engine',
      },
      bufferPages: true,
      autoFirstPage: true,
    });

    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    // Minimalist Luxury & Professional Palette
    const primaryColor = '#090d16'; // Deep charcoal black
    const secondaryColor = '#334155'; // Slate 700
    const mutedColor = '#64748b'; // Slate 500
    const accentColor = '#0284c7'; // Cyan / Sky 600
    const ruleColor = '#e2e8f0'; // Subtle slate 200
    const tagBgColor = '#f1f5f9'; // Slate 100

    const contentWidth = doc.page.width - 72; // 595.28 - 72 = 523.28

    // --- HEADER SECTION ---
    doc
      .fontSize(22)
      .font('Helvetica-Bold')
      .fillColor(primaryColor)
      .text('DANIYAL HAYAT', { characterSpacing: 1.2 });

    doc.moveDown(0.15);

    doc
      .fontSize(10)
      .font('Helvetica-Bold')
      .fillColor(accentColor)
      .text('FULL-STACK DEVELOPER & SOFTWARE SYSTEMS ENGINEER', { characterSpacing: 0.6 });

    doc.moveDown(0.3);

    // Contact & Social Links Bar (Active Clickable Hyperlinks)
    const leftMargin = 36;
    let contactY = doc.y;

    doc.fontSize(8.5).font('Helvetica');

    // Email
    doc
      .fillColor(secondaryColor)
      .text('Email: ', leftMargin, contactY, { continued: true })
      .fillColor(accentColor)
      .text('mdaniyalhayyat@gmail.com', { link: 'mailto:mdaniyalhayyat@gmail.com', underline: false, continued: true })
      .fillColor(mutedColor)
      .text('   •   ', { continued: true })
      .fillColor(secondaryColor)
      .text('GitHub: ', { continued: true })
      .fillColor(accentColor)
      .text('github.com/DotDaniyal', { link: 'https://github.com/DotDaniyal', underline: false, continued: true })
      .fillColor(mutedColor)
      .text('   •   ', { continued: true })
      .fillColor(secondaryColor)
      .text('Portfolio: ', { continued: true })
      .fillColor(accentColor)
      .text('daniyal-hayat-portfolio.vercel.app', { link: 'https://daniyal-hayat-portfolio.vercel.app/', underline: false, continued: true })
      .fillColor(mutedColor)
      .text('   •   ', { continued: true })
      .fillColor(mutedColor)
      .text('Remote / Global');

    doc.moveDown(0.5);

    // Clean Subtle Header Separator Rule
    renderHairline(doc, ruleColor, contentWidth);
    doc.moveDown(0.4);

    // --- SECTION 1: EXECUTIVE SUMMARY ---
    renderSectionHeading(doc, 'EXECUTIVE SUMMARY', primaryColor, ruleColor, contentWidth);
    doc
      .fontSize(8.75)
      .font('Helvetica')
      .fillColor(secondaryColor)
      .text(
        'Full-Stack Developer and Native Android Engineer specializing in architecting modern, high-throughput web applications (React 19, Next.js, TypeScript), cross-platform mobile solutions in Kotlin, and intelligent generative AI systems with Google AI Studio and Gemini models. Dedicated to clean modular architecture, zero-bloat performance, accessible UX craft, and resilient offline capabilities.',
        { lineGap: 2.5 }
      );

    doc.moveDown(0.55);

    // --- SECTION 2: TECHNICAL CORE PROFICIENCIES ---
    renderSectionHeading(doc, 'TECHNICAL CORE PROFICIENCIES', primaryColor, ruleColor, contentWidth);

    const skillsData = [
      { cat: 'Languages & Runtimes', items: 'TypeScript, JavaScript (ES6+), Kotlin, Node.js, SQL, HTML5, CSS3' },
      { cat: 'Frontend & UI Craft', items: 'React 19, Next.js, Tailwind CSS v4, Motion (Framer), Vite, Responsive Design, Design Systems' },
      { cat: 'Mobile & Storage', items: 'Native Android SDK, Room/SQLite, Offline Caching, RESTful APIs, JSON Data Handling' },
      { cat: 'AI Engineering & Cloud', items: 'Google AI Studio, Google Gemini SDK (@google/genai), Prompt Architecture, Multimodal Grounding, Vercel' },
      { cat: 'Tooling & DevOps', items: 'Git, GitHub, Linux/Bash, Figma, Lighthouse Optimization, PWA Standards, Type-Safe Architecture' },
    ];

    skillsData.forEach(s => {
      doc
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .fillColor(primaryColor)
        .text(`•  ${s.cat}: `, { continued: true })
        .font('Helvetica')
        .fillColor(secondaryColor)
        .text(s.items, { lineGap: 1.5 });
    });

    doc.moveDown(0.55);

    // --- SECTION 3: SELECTED PRODUCTION PROJECTS ---
    renderSectionHeading(doc, 'SELECTED PRODUCTION PROJECTS & OPEN SOURCE', primaryColor, ruleColor, contentWidth);

    const projects = [
      {
        title: 'Official Darul Ifta Irshad us Saileen & Islamic AI',
        role: 'Lead Architect & Full-Stack Developer',
        tech: 'JavaScript, Tailwind CSS, Kotlin, REST APIs, Google Gemini AI',
        liveUrl: 'https://darulifta-bkfbzf6u.manus.space/',
        liveLabel: 'darulifta-bkfbzf6u.manus.space',
        githubUrl: 'https://github.com/DotDaniyal/Offical-Darul-ifta-Irshad-us-saileen-',
        githubLabel: 'github.com/DotDaniyal/Offical-Darul-ifta...',
        bullets: [
          'Architected high-throughput responsive web platform and native Android mobile apps serving community religious consultation and theological guidance.',
          'Engineered offline-first local caching in Kotlin to ensure uninterrupted, reliable guidance access in remote, low-connectivity environments.',
          'Integrated Google Gemini AI intelligence pipeline for cited theological research grounded in authoritative archives.'
        ]
      },
      {
        title: 'CortexIQ AI Suite & AI Prompt Studio',
        role: 'Creator & Full-Stack Engineer',
        tech: 'TypeScript, React 19, Google Gemini SDK, Node.js, Express, Vite, Motion',
        liveUrl: 'https://daniyal-hayat-portfolio.vercel.app/',
        liveLabel: 'daniyal-hayat-portfolio.vercel.app',
        githubUrl: 'https://github.com/DotDaniyal/cortexiq-by-dnyl',
        githubLabel: 'github.com/DotDaniyal/cortexiq-by-dnyl',
        bullets: [
          'Built full-stack computational intelligence dashboard pairing natural language queries with real-time reactive telemetry and token streaming.',
          'Implemented secure server-side Node.js proxy routes to isolate sensitive model credentials from client-side runtime environments.',
          'Achieved sub-100ms UI responsiveness while rendering live asynchronous token streams and analytical metrics.'
        ]
      },
      {
        title: 'Hamara Weather — Real-Time Meteorological Tracking',
        role: 'Frontend Engineer',
        tech: 'JavaScript (ES6+), OpenWeather API, Modern Flex/Grid, Vercel',
        liveUrl: 'https://hamara-weather.vercel.app/',
        liveLabel: 'hamara-weather.vercel.app',
        githubUrl: 'https://github.com/DotDaniyal/Hamara-Weather',
        githubLabel: 'github.com/DotDaniyal/Hamara-Weather',
        bullets: [
          'Developed ad-free live atmospheric conditions tracking dashboard with precision humidity, wind speed, and meteorological telemetry.',
          'Designed lightweight asynchronous pipeline with defensive error handling for edge cases and location network interruptions.'
        ]
      },
      {
        title: 'Mystic Match — Algorithmic Mobile & Web Puzzle Game',
        role: 'Game & Mobile Engineer',
        tech: 'Kotlin, Android Canvas, 2D Matrix Algorithms, State Machines',
        liveUrl: 'https://mystic-match-rho.vercel.app/',
        liveLabel: 'mystic-match-rho.vercel.app',
        githubUrl: 'https://github.com/DotDaniyal/mystic-match-by-dnyl',
        githubLabel: 'github.com/DotDaniyal/mystic-match-by-dnyl',
        bullets: [
          'Engineered bespoke match-3 algorithmic engine in Kotlin with cascading matrix replenishment and fluid touch ergonomics.',
          'Implemented deterministic state machines to eliminate infinite cascade loops and memory leaks on mobile viewports.'
        ]
      },
      {
        title: 'Faryal FC Digital Headquarters & DNYL Eyewear Showcase',
        role: 'Product & UI/UX Developer',
        tech: 'React, TypeScript, Tailwind CSS, Motion, Responsive Design',
        liveUrl: 'https://daniyal-hayat-portfolio.vercel.app/',
        liveLabel: 'daniyal-hayat-portfolio.vercel.app',
        githubUrl: 'https://github.com/DotDaniyal',
        githubLabel: 'github.com/DotDaniyal',
        bullets: [
          'Crafted modern athletic sports platform with interactive rosters, matchday fixture schedules, and responsive fan drawer.',
          'Created luxury digital boutique showroom featuring 60 FPS motion transitions, fluid typography, and sub-second asset rendering.'
        ]
      }
    ];

    projects.forEach((p, idx) => {
      // Project Title and Role
      doc
        .fontSize(9.25)
        .font('Helvetica-Bold')
        .fillColor(primaryColor)
        .text(p.title, { continued: true })
        .font('Helvetica')
        .fillColor(mutedColor)
        .text(`  |  ${p.role}`);

      // Tech and Clickable Links Line
      doc
        .fontSize(8)
        .font('Helvetica-Bold')
        .fillColor(accentColor)
        .text(`Stack: `, { continued: true })
        .font('Helvetica')
        .fillColor(secondaryColor)
        .text(`${p.tech}   [`, { continued: true })
        .fillColor(accentColor)
        .text(`Live`, { link: p.liveUrl, continued: true })
        .fillColor(secondaryColor)
        .text(`  |  `, { continued: true })
        .fillColor(accentColor)
        .text(`GitHub`, { link: p.githubUrl, continued: true })
        .fillColor(secondaryColor)
        .text(`]`);

      p.bullets.forEach(b => {
        doc
          .fontSize(8.2)
          .font('Helvetica')
          .fillColor(secondaryColor)
          .text(`  •  ${b}`, { lineGap: 1.2, indent: 4 });
      });

      if (idx < projects.length - 1) {
        doc.moveDown(0.35);
      }
    });

    doc.moveDown(0.5);

    // --- SECTION 4: EXPERIENCE & ENGINEERING MILESTONES ---
    renderSectionHeading(doc, 'EXPERIENCE & ENGINEERING MILESTONES', primaryColor, ruleColor, contentWidth);

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
        .fontSize(8.75)
        .font('Helvetica-Bold')
        .fillColor(primaryColor)
        .text(`${e.role} — ${e.company}`, { continued: true })
        .font('Helvetica')
        .fillColor(mutedColor)
        .text(`  (${e.period})`);

      doc
        .fontSize(8.15)
        .font('Helvetica')
        .fillColor(secondaryColor)
        .text(e.desc, { lineGap: 1.25, indent: 4 });

      doc.moveDown(0.22);
    });

    doc.moveDown(0.35);

    // --- SECTION 5: EDUCATION & SPECIALIZATIONS ---
    renderSectionHeading(doc, 'EDUCATION & CONTINUOUS SPECIALIZATION', primaryColor, ruleColor, contentWidth);

    const education = [
      {
        program: 'Core Computer Science, Algorithms & Software Architecture',
        institution: 'Continuous Academic & Applied Engineering Studies',
        detail: 'Data Structures, Algorithm Complexity, OOP in Kotlin/TypeScript, System Design, and Caching.'
      },
      {
        program: 'Google AI Studio & Gemini API SDK Specialization',
        institution: 'Advanced AI Systems & Applied Verification (Google Developers & DeepMind)',
        detail: 'System instructions, structured JSON schemas, multimodal prompting, function calling, and server-side SDK proxying.'
      }
    ];

    education.forEach(ed => {
      doc
        .fontSize(8.5)
        .font('Helvetica-Bold')
        .fillColor(primaryColor)
        .text(`•  ${ed.program}`, { continued: true })
        .font('Helvetica')
        .fillColor(mutedColor)
        .text(` — ${ed.institution}`);

      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor(secondaryColor)
        .text(`   ${ed.detail}`, { lineGap: 1.15 });
    });

    // Finalize the document
    doc.end();

    stream.on('finish', () => resolve());
    stream.on('error', (err) => reject(err));
  });
}

function renderSectionHeading(doc: PDFKit.PDFDocument, title: string, primaryColor: string, ruleColor: string, contentWidth: number) {
  doc
    .fontSize(9.5)
    .font('Helvetica-Bold')
    .fillColor(primaryColor)
    .text(title, { characterSpacing: 0.75 });

  renderHairline(doc, ruleColor, contentWidth);
  doc.moveDown(0.35);
}

function renderHairline(doc: PDFKit.PDFDocument, ruleColor: string, contentWidth: number) {
  const lineY = doc.y + 1;
  doc
    .strokeColor(ruleColor)
    .lineWidth(0.5)
    .moveTo(36, lineY)
    .lineTo(36 + contentWidth, lineY)
    .stroke();
}

async function main() {
  console.log('Generating Daniyal Hayat Professional Aesthetic Resume PDF...');
  await buildResume(outputPath1);
  console.log(`Generated: ${outputPath1}`);
  await buildResume(outputPath2);
  console.log(`Generated: ${outputPath2}`);
  console.log('Resume PDF generation successfully complete!');
}

main().catch(err => {
  console.error('Error generating PDF:', err);
  process.exit(1);
});
