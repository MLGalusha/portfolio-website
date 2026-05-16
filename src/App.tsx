import { useState, useEffect, type FormEvent } from "react";
import "./App.css";

const projects = [
  {
    name: "SpecFinder",
    tag: "Document RAG / Hosted Demo",
    featured: true,
    description:
      "Construction PDF search and cited-answer tool for long technical documents where exact evidence matters. Ask a question, inspect the retrieved evidence, jump to cited pages, and see how the answer was grounded.",
    detail:
      "Built around section and page aware chunking, lexical/vector/hybrid retrieval, routed query planning, table aware context packing, abstention behavior, and citation quality checks. Hosted as a live demo through Cloud Run and masongalusha.com.",
    links: [
      { label: "Live Demo", href: "/specfinder" },
    ],
  },
  {
    name: "Voices That Remain",
    tag: "Shipped Product",
    description:
      "Public historical letter archive built to make scanned family letters searchable, readable, and publishable as the collection grows. The public site handles browsing, search, collections, people, places, and letter pages.",
    detail:
      "The admin side includes upload, review, transcription, structured metadata extraction, entity resolution, usage tracking, notifications, and content tools. AI handles the slow parts, but a human verifies each step before anything goes public. Deployed on GCP.",
    links: [
      { label: "Live Site", href: "https://voicesthatremain.com" },
    ],
  },
  {
    name: "Second Braincell",
    tag: "Agent Tooling / CLI",
    description:
      "Private local Node.js CLI that gives coding agents direct access to ChatGPT for document review, multi turn reasoning, file/PDF retrieval, image generation, and Deep Research jobs.",
    detail:
      "Replaces browser automation heavy workflows with direct request/response paths, local job artifacts, model fallback logic, Project instruction management, and auth/session security checks. Built for agent workflows where the implementation happens in a repo but useful context lives in ChatGPT.",
    links: [],
  },
  {
    name: "SonicGen",
    tag: "Audio DSP / Hand Written",
    description:
      "Audio ingestion and dedup pipeline written by hand in Python before I started using coding agents as daily tools. Built to trace clips back to their source and avoid wasting transcription work on duplicates.",
    detail:
      "The core matcher uses spectral peak detection, constellation hashing, and alignment offset matching instead of semantic similarity. The larger pipeline pulls YouTube audio, transcribes with speaker diarization, labels speakers, and stores voice embeddings for future identification.",
    links: [
      { label: "GitHub", href: "https://github.com/MLGalusha/SonicGen" },
    ],
  },
  {
    name: "PianoTranscriber",
    tag: "ML / Deep Learning",
    description:
      "PyTorch model that transcribes piano audio into MIDI. Built for the UNC Chapel Hill AI Bootcamp final project using the MAESTRO dataset and GCP GPU VMs.",
    detail:
      "Audio goes through spectrogram preprocessing, CNN inference, piano roll generation, MIDI output, and sheet music rendering. The project taught me the full training loop: dataset prep, batching, model training, inference, and evaluation.",
    links: [
      { label: "GitHub", href: "https://github.com/MLGalusha/PianoTranscriber" },
    ],
  },
  {
    name: "JobTracker",
    tag: "Systems / Agent Orchestration",
    description:
      "Agent native job search pipeline that turns profile docs, role intake, company research, resume tailoring, cover letters, and interview prep into a repeatable workflow.",
    detail:
      "Built around source of truth profile files, role queues, modular skills, templates, and agent orchestration. It is the system I use to make applications consistent instead of rewriting everything from scratch.",
    links: [
      { label: "GitHub", href: "https://github.com/MLGalusha/job-tracker" },
    ],
  },
  {
    name: "Staffclaw",
    tag: "Full Stack / Reverse Engineering",
    description:
      "Full stack scheduling and operations dashboard built from a reverse engineered workplace scheduling API. Started as a daily shift briefing tool and turned into a replacement interface for the app itself.",
    detail:
      "Mapped undocumented endpoints, pulled schedule and ticketing data, and built a transparent proxy so users could log in with existing credentials while every read and write still went through the real backend. Express, React, Drizzle, Postgres.",
    links: [
      { label: "GitHub", href: "https://github.com/MLGalusha/staffclaw" },
    ],
  },
];

const skills = [
  {
    category: "Languages",
    items: ["TypeScript", "Python", "JavaScript", "SQL", "HTML/CSS"],
  },
  {
    category: "Frontend",
    items: ["React 19", "Vite", "React Router", "TipTap", "Playwright E2E testing", "Vitest"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Drizzle ORM", "PostgreSQL", "Pino logging", "Session auth", "REST API design"],
  },
  {
    category: "AI / ML",
    items: [
      "OpenAI API (structured outputs, tool calling, vision)",
      "Vector search (Pinecone)",
      "Speaker identification (SpeechBrain)",
      "PyTorch (CNN training)",
      "Prompt engineering",
    ],
  },
  {
    category: "Infrastructure",
    items: ["Google Cloud Platform", "Cloud Run", "Cloud SQL", "Cloud Build CI/CD", "Cloud Storage"],
  },
  {
    category: "Tools",
    items: ["Claude Code", "Codex", "Cursor", "Git/GitHub"],
  },
];

const EMAIL = "masonlgalusha.careers@gmail.com";

// TODO: Replace with your Formspree form ID from https://formspree.io
const FORM_ENDPOINT = "https://formspree.io/f/xojpgjpe";

function PortfolioHeader({
  activeSection = "",
  sectionPrefix = "",
}: {
  activeSection?: string;
  sectionPrefix?: string;
}) {
  const sectionHref = (section: string) => `${sectionPrefix}#${section}`;
  const sectionClass = (section: string) => activeSection === section ? "active" : "";

  return (
    <header className="header">
      <a href="/" className="logo">Mason Galusha</a>
      <nav className="nav">
        <a href={sectionHref("projects")} className={sectionClass("projects")}>Projects</a>
        <a href={sectionHref("skills")} className={sectionClass("skills")}>Skills</a>
        <a href={sectionHref("about")} className={sectionClass("about")}>About</a>
        <a href={sectionHref("contact")} className={sectionClass("contact")}>Contact</a>
      </nav>
      <div className="header-links">
        <a href="https://github.com/MLGalusha" target="_blank" rel="noreferrer" className="header-link-text">GitHub</a>
        <a href="https://www.linkedin.com/in/masonlgalusha" target="_blank" rel="noreferrer" className="header-link-text">LinkedIn</a>
      </div>
      <div className="header-icons">
        <a href="https://github.com/MLGalusha" target="_blank" rel="noreferrer" aria-label="GitHub">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        <a href="https://www.linkedin.com/in/masonlgalusha" target="_blank" rel="noreferrer" aria-label="LinkedIn">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
        </a>
      </div>
    </header>
  );
}

function App() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailCopied, setEmailCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [resumeOpen, setResumeOpen] = useState(false);
  const [specFinderLoading, setSpecFinderLoading] = useState(true);

  useEffect(() => {
    function onScroll() {
      const sections = document.querySelectorAll(".section");
      const scrollY = window.scrollY;
      const offset = 100;

      // At bottom of page → activate last section
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50) {
        const last = sections[sections.length - 1];
        if (last) { setActiveSection(last.id); return; }
      }

      let current = "";
      for (const section of sections) {
        const el = section as HTMLElement;
        if (scrollY >= el.offsetTop - offset) {
          current = el.id;
        }
      }
      setActiveSection(current);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function copyEmail() {
    navigator.clipboard.writeText(EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 1500);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setFormStatus("sent");
        form.reset();
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  }

  if (window.location.pathname === "/specfinder") {
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    const specFinderFrameSrc = isLocalhost
      ? "https://specfinder-api-pt4d3xglpa-ue.a.run.app/specfinder"
      : "/specfinder/app";

    return (
      <div className="specfinder-page">
        <div className="site specfinder-header-shell">
          <PortfolioHeader sectionPrefix="/" />
        </div>
        <main className="specfinder-frame-wrap">
          {specFinderLoading && (
            <div className="specfinder-loading" role="status" aria-live="polite">
              <div className="specfinder-loading-spinner" aria-hidden="true" />
              <p>Preparing demo</p>
            </div>
          )}
          <iframe
            className="specfinder-frame"
            src={specFinderFrameSrc}
            title="SpecFinder interactive demo"
            onLoad={() => setSpecFinderLoading(false)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="site">
      {/* Header */}
      <PortfolioHeader activeSection={activeSection} />

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hi, I'm Mason Galusha</p>
            <h1>
              Applied AI Engineer<br />
              <span className="hero-accent">building with AI</span>
            </h1>
            <p className="hero-bio">
              I build products around LLMs, retrieval, structured extraction,
              and coding agents. My recent work includes SpecFinder, a cited
              RAG tool for long construction PDFs; Voices That Remain, a
              public historical letter archive with an AI pipeline inside it;
              and Second Braincell, a private local tool that lets coding agents
              use ChatGPT for document review and long running AI jobs.
            </p>
            <div className="hero-cta">
              <a href="/specfinder" className="btn-primary">
                Try SpecFinder
              </a>
              <button type="button" className="btn-secondary" onClick={() => {
                if (window.innerWidth <= 768) {
                  window.open("/Mason_Galusha_Applied_AI_Resume.pdf", "_blank");
                } else {
                  setResumeOpen(true);
                }
              }}>
                View Resume
              </button>
            </div>
          </div>
          <div className="hero-aside">
            <div className="hero-photo">
              <img src="/profile.jpeg" alt="Mason Galusha" />
            </div>
            <div className="hero-stats">
              <div className="stat stat-location">
                <span className="stat-value">Raleigh, NC</span>
                <span className="stat-label"><span className="stat-label-desktop">Based / </span>Open to remote</span>
              </div>
              <div className="stat">
                <span className="stat-value">AI</span>
                <span className="stat-label">Applied systems</span>
              </div>
              <div className="stat">
                <span className="stat-value">7</span>
                <span className="stat-label">Portfolio projects</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="section" id="projects">
        <div className="section-header">
          <h2>Projects</h2>
          <p className="section-subtitle">
            Real products and systems, not tutorials and toy apps.
          </p>
        </div>
        <div className="projects-grid">
          {projects.map((project) => (
            <article className={`project-card${project.featured ? " project-card-featured" : ""}`} key={project.name}>
              <div className="project-card-header">
                <span className="project-tag">{project.tag}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              <p className="project-detail">{project.detail}</p>
              {project.links.length > 0 && (
                <div className="project-links">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className={`project-link${link.label === "Live Site" || link.label === "Live Demo" ? " project-link-live" : ""}`}
                    >
                      {link.label}
                      <span className="arrow">&#8599;</span>
                    </a>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="section" id="skills">
        <div className="section-header">
          <h2>Skills</h2>
          <p className="section-subtitle">
            Production validated through shipped projects.
          </p>
        </div>
        <div className="skills-grid">
          {skills.map((group) => (
            <div className="skill-group" key={group.category}>
              <h4>{group.category}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section className="section" id="about">
        <div className="section-header">
          <h2>About</h2>
        </div>
        <div className="about-layout">
          <div className="about-main">
            <p>
              I started programming in late 2023 and spent 2025 coding by hand
              to build real fundamentals. SonicGen was the turning point: a
              Python audio fingerprinting engine I wrote without coding agents.
              In 2026 I moved into agent directed development because I could
              finally review and debug the output with enough judgment to trust
              the workflow.
            </p>
            <p>
              Most of what I build starts with a real workflow problem: finding
              evidence in long PDFs, reviewing scanned letters, connecting a
              coding agent to ChatGPT, or replacing a bad scheduling app. I care
              about the system around the model: data, retrieval, evals, review
              loops, deployment, and the UI someone actually uses.
            </p>
          </div>
          <div className="about-sidebar">
            <div className="about-card">

              <h4>Looking For</h4>
              <p>
                Applied AI, AI backend, RAG, agent tooling, and full stack roles
                at AI native teams. Based in Raleigh, open to remote.
              </p>
            </div>
            <div className="about-card">

              <h4>Approach</h4>
              <p>
                I design the architecture, make the technical decisions, and use
                coding agents to accelerate implementation without handing off
                judgment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact-section" id="contact">
        <div className="contact-layout">
          <div className="contact-left">
            <h2>Contact</h2>
            <p className="contact-blurb">
              Open to full stack and applied AI roles. Whether you're a
              recruiter, hiring manager, or fellow engineer, I'd like to hear
              from you.
            </p>
            <div className="contact-direct">
              <div className="contact-direct-item">
                <span className="contact-direct-label">Email</span>
                <div className="email-interactive">
                  <a href={`mailto:${EMAIL}`} className="email-link">{EMAIL}</a>
                  <button
                    className="email-copy-btn"
                    onClick={copyEmail}
                    title="Copy email"
                  >
                    {emailCopied ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    )}
                  </button>
                  {emailCopied && <span className="email-copied-toast">Copied!</span>}
                </div>
              </div>
              <div className="contact-direct-item">
                <span className="contact-direct-label">LinkedIn</span>
                <a href="https://www.linkedin.com/in/masonlgalusha" target="_blank" rel="noreferrer">
                  linkedin.com/in/masonlgalusha
                </a>
              </div>
              <div className="contact-direct-item">
                <span className="contact-direct-label">GitHub</span>
                <a href="https://github.com/MLGalusha" target="_blank" rel="noreferrer">
                  github.com/MLGalusha
                </a>
              </div>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" name="firstName" required placeholder="Your first name" />
              </div>
              <div className="form-field">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" name="lastName" placeholder="Your last name" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required placeholder="Your email" />
              </div>
              <div className="form-field">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" placeholder="Your company" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What would you like to discuss?"
                onInput={(e) => {
                  const el = e.currentTarget;
                  el.style.height = "auto";
                  el.style.height = el.scrollHeight + "px";
                }}
              />
            </div>
            <button
              type="submit"
              className="btn-submit"
              disabled={formStatus === "sending"}
            >
              {formStatus === "sending" ? "Sending..." : "Submit"}
              {formStatus === "idle" && <span className="arrow">&rarr;</span>}
            </button>
            {formStatus === "sent" && (
              <p className="form-success">Message sent. I'll get back to you soon.</p>
            )}
            {formStatus === "error" && (
              <p className="form-error">Something went wrong. Try emailing me directly.</p>
            )}
          </form>
        </div>
      </section>

      {/* Resume Modal */}
      {resumeOpen && (
        <div className="resume-overlay" onClick={() => setResumeOpen(false)}>
          <div className="resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="resume-modal-header">
              <span className="resume-modal-title">Resume</span>
              <div className="resume-modal-actions">
                <a
                  href="/Mason_Galusha_Applied_AI_Resume.pdf"
                  download
                  className="resume-download-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download
                </a>
                <button className="resume-close-btn" onClick={() => setResumeOpen(false)} aria-label="Close resume">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>
            <iframe
              src="/Mason_Galusha_Applied_AI_Resume.pdf"
              className="resume-iframe"
              title="Mason Galusha Resume"
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-inner">
          <p>&copy; 2026 Mason Galusha</p>
          <div className="footer-links">
            <a href="https://github.com/MLGalusha" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/masonlgalusha" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="mailto:masonlgalusha.careers@gmail.com">Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
