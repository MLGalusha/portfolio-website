import { useState, type FormEvent } from "react";
import "./App.css";

const projects = [
  {
    name: "Voices That Remain",
    tag: "Shipped Product",
    description:
      "A live digital archive for historical personal letters. AI vision transcribes handwritten images, extracts metadata, identifies senders and recipients, resolves entities across letters, and generates bios and collection descriptions. Every step goes through human review before publishing.",
    detail:
      "Solo built, full stack TypeScript. Multi stage AI pipeline (transcription, metadata extraction, entity resolution, bio generation) with human in the loop gates at each step. 20 DB tables, deployed on GCP.",
    links: [
      { label: "Live Site", href: "https://voicesthatremain.com" },
      { label: "GitHub", href: "https://github.com/MLGalusha/VoicesThatRemain" },
    ],
  },
  {
    name: "PianoTranscriber",
    tag: "ML / Deep Learning",
    description:
      "CNN based pipeline that turns solo piano performances into MIDI and sheet music. Trained on the MAESTRO dataset (~200 hours, ~100GB preprocessed) using GCP GPU instances.",
    detail:
      "PyTorch 2.5, Keras, TensorFlow. End to end: audio to spectrogram to CNN to MIDI to sheet music. UNC Chapel Hill AI bootcamp capstone.",
    links: [
      { label: "GitHub", href: "https://github.com/MLGalusha/PianoTranscriber" },
    ],
  },
  {
    name: "JobTracker",
    tag: "Systems / Agent Orchestration",
    description:
      "Event sourced, agent native system that turns a job search into a structured workflow with sourcing, tracking, and tailored application generation.",
    detail:
      "Append only JSONL pipeline, parallel agent orchestration (10 agents, 36 application packages simultaneously), modular Claude Code skills.",
    links: [
      { label: "GitHub", href: "https://github.com/MLGalusha/job-tracker" },
    ],
  },
  {
    name: "SonicGen",
    tag: "Audio DSP / Hand Written",
    description:
      "Shazam style audio fingerprinting engine for duplicate detection and source matching. Written entirely by hand, no coding agents.",
    detail:
      "Constellation hash peak detection on log power spectrograms. Alignment offset matching. Built to learn fundamentals from scratch.",
    links: [
      { label: "GitHub", href: "https://github.com/MLGalusha/SonicGen" },
    ],
  },
  {
    name: "Staffclaw",
    tag: "Full Stack / Reverse Engineering",
    description:
      "Drop in replacement for employer scheduling software, built on 92 reverse engineered API endpoints mapped in a single agent session.",
    detail:
      "Transparent proxy architecture with zero migration cost. Dashboard with Gantt view, multi source data fusion, demand prediction. Express 5 + React 19 + Drizzle + Postgres.",
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
    items: ["React 19", "Vite", "React Router", "Playwright"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Drizzle ORM", "PostgreSQL"],
  },
  {
    category: "AI / ML",
    items: [
      "OpenAI API",
      "PyTorch",
      "Structured Outputs",
      "Vision Prompting",
      "Audio ML Pipelines",
    ],
  },
  {
    category: "Infrastructure",
    items: ["Google Cloud Platform", "Cloud Run", "Cloud SQL", "Docker", "CI/CD"],
  },
  {
    category: "Tools",
    items: ["Claude Code", "Codex", "Git/GitHub", "Docker"],
  },
];

const EMAIL = "masonlgalusha.careers@gmail.com";

// TODO: Replace with your Formspree form ID from https://formspree.io
const FORM_ENDPOINT = "https://formspree.io/f/xojpgjpe";

function App() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [emailCopied, setEmailCopied] = useState(false);

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
  return (
    <div className="site">
      {/* Header */}
      <header className="header">
        <a href="/" className="logo">Mason Galusha</a>
        <nav className="nav">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
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

      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <p className="hero-greeting">Hi, I'm Mason Galusha</p>
            <h1>
              Software Engineer<br />
              <span className="hero-accent">building with AI</span>
            </h1>
            <p className="hero-bio">
              Self taught engineer who ships production software with real AI
              pipelines. I build systems to solve problems I actually
              experience: a live historical archive with AI transcription, a
              deep learning piano transcription model, an event sourced job
              tracking system with agent orchestration, and tools built on
              reverse engineered APIs. Based in Raleigh, NC.
            </p>
            <div className="hero-cta">
              <a href="https://voicesthatremain.com" target="_blank" rel="noreferrer" className="btn-primary">
                View Flagship Project
              </a>
              <a href="#projects" className="btn-secondary">
                See Work
              </a>
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
                <span className="stat-value">1</span>
                <span className="stat-label">Shipped product</span>
              </div>
              <div className="stat">
                <span className="stat-value">5</span>
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
            <article className="project-card" key={project.name}>
              <div className="project-card-header">
                <span className="project-tag">{project.tag}</span>
              </div>
              <h3>{project.name}</h3>
              <p className="project-desc">{project.description}</p>
              <p className="project-detail">{project.detail}</p>
              <div className="project-links">
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-link${link.label === "Live Site" ? " project-link-live" : ""}`}
                  >
                    {link.label}
                    <span className="arrow">&#8599;</span>
                  </a>
                ))}
              </div>
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
              Started programming in late 2023 with Harvard's CS50, then
              completed UNC Chapel Hill's 6 month AI bootcamp in 2024 where
              I built PianoTranscriber. I spent 2025 coding by hand to build
              real fundamentals, writing SonicGen from scratch without agents.
              Now I use agent directed development daily, but I can review,
              debug, and understand what the agents produce.
            </p>
            <p>
              Every project in this portfolio started with a real problem I
              wanted to solve. I think in systems, not disconnected features.
            </p>
          </div>
          <div className="about-sidebar">
            <div className="about-card">

              <h4>Looking For</h4>
              <p>
                Full stack or applied AI roles at early stage startups and
                AI native companies. Based in Raleigh, open to remote.
              </p>
            </div>
            <div className="about-card">

              <h4>Approach</h4>
              <p>
                I design the architecture, make the technical decisions,
                and use AI tools to accelerate what I already understand.
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
              recruiter, hiring manager, or fellow engineer — I'd like to
              hear from you.
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
