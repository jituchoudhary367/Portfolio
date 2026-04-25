"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Clipboard, Mail, MapPin, Plane } from "lucide-react";
import { IconGithub, IconLinkedin } from "@/components/icons/BrandIcons";
import MagneticButton from "@/components/ui/MagneticButton";
import { initEmailJs, sendEmail } from "@/lib/emailjs";
import {
  contactEmail,
  githubProfileUrl,
  linkedinUrl,
} from "@/lib/site";
import NoiseBg from "@/components/ui/NoiseBg";

type FormStatus = "idle" | "sending" | "success" | "error";

const rows = [
  {
    icon: Mail,
    label: "EMAIL",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  {
    icon: IconLinkedin,
    label: "LINKEDIN",
    value: linkedinUrl.replace("https://", ""),
    href: linkedinUrl,
  },
  {
    icon: IconGithub,
    label: "GITHUB",
    value: githubProfileUrl.replace("https://", ""),
    href: githubProfileUrl,
  },
  {
    icon: MapPin,
    label: "LOCATION",
    value: "India (Remote)",
    href: "#",
  },
];

function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  rows = 1,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  error?: boolean;
  rows?: number;
}) {
  const fieldClass = `w-full border-2 bg-white px-3 py-3 font-mono-label text-xs text-[var(--text-primary)] outline-none transition-colors ${
    error
      ? "animate-pulse border-red-500"
      : "border-[var(--border)] focus:border-[var(--accent)]"
  } ${rows > 1 ? "min-h-[120px] resize-y" : ""}`;

  return (
    <label htmlFor={id} className="block">
      <span className="mb-1.5 block font-mono-label text-[10px] font-medium tracking-wide text-[var(--text-secondary)]">
        {label}
      </span>
      {rows > 1 ? (
        <textarea
          id={id}
          name={id}
          value={value}
          rows={rows}
          onChange={(e) => onChange(e.target.value)}
          className={fieldClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={fieldClass}
        />
      )}
    </label>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    initEmailJs();
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const t = window.setTimeout(() => setStatus("idle"), 4000);
    return () => window.clearTimeout(t);
  }, [status]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await sendEmail({ name, email, subject, message });
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactEmail);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-b-2 border-[var(--border)] py-20 md:py-24"
    >
      <NoiseBg className="pointer-events-none absolute inset-0 -z-10 opacity-30" />
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 md:grid-cols-2 md:px-8">
        <div>
          <p className="font-mono-label mb-2 text-xs text-[var(--accent)]">
            GET IN TOUCH ■
          </p>
          <h2 className="font-display text-[clamp(3rem,8vw,6rem)] leading-[0.95]">
            LET&apos;S BUILD
            <br />
            SOMETHING
            <br />
            GREAT.■
          </h2>
          <p className="mt-6 max-w-md text-sm text-[var(--text-secondary)]">
            I&apos;m currently open to new opportunities—full-time, contract, or
            freelance—where I can own outcomes end to end.
          </p>
          <div className="mt-8 space-y-3">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <a
                  key={row.label}
                  href={row.href}
                  className="group flex items-center justify-between border-2 border-transparent border-b-[var(--border-light)] py-3 transition hover:border-[var(--border)] hover:px-3"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-[var(--accent)] transition group-hover:scale-110" />
                    <span>
                      <span className="block font-mono-label text-[10px] text-[var(--text-muted)] group-hover:text-[var(--accent)]">
                        {row.label}
                      </span>
                      <span className="text-sm">{row.value}</span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative brutal-card bg-white p-6 md:p-8">
          <Plane className="absolute right-6 top-6 h-5 w-5 text-[var(--accent)]" />
          <p className="font-mono-label mb-6 text-xs text-[var(--accent)]">
            SEND A MESSAGE ■
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                id="name"
                label="YOUR NAME"
                value={name}
                onChange={setName}
                error={status === "error" && !name}
              />
              <FormField
                id="email"
                label="YOUR EMAIL"
                type="email"
                value={email}
                onChange={setEmail}
                error={status === "error" && !email}
              />
            </div>
            <FormField
              id="subject"
              label="SUBJECT"
              value={subject}
              onChange={setSubject}
              error={status === "error" && !subject}
            />
            <FormField
              id="message"
              label="MESSAGE"
              value={message}
              onChange={setMessage}
              rows={4}
              error={status === "error" && !message}
            />
            <MagneticButton
              type="submit"
              disabled={status === "sending"}
              className="mt-2 flex w-full items-center justify-center gap-2 border-2 border-[var(--border)] bg-[var(--bg-dark)] px-4 py-3 font-mono-label text-xs text-white shadow-[4px_4px_0_#0d0d0d] disabled:opacity-60"
            >
              {status === "sending" ? (
                "SENDING…"
              ) : (
                <>
                  SEND MESSAGE ↗
                  <AnimatePresence>
                    {status === "success" && (
                      <motion.span
                        key="ok"
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1.2, 1] }}
                        exit={{ scale: 0 }}
                        transition={{ duration: 0.45 }}
                      >
                        <Check className="h-4 w-4 text-[var(--accent)]" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </MagneticButton>
            {status === "success" && (
              <p className="font-mono-label text-center text-xs text-[var(--accent)]">
                Message sent! 🎉
              </p>
            )}
            {status === "error" && (
              <p className="font-mono-label text-center text-xs text-red-600">
                Something went wrong. Check EmailJS keys and try again.
              </p>
            )}
          </form>
          <p className="mt-4 font-mono-label text-[10px] text-[var(--text-muted)]">
            🔒 Your information is safe with me. No spam, ever.
          </p>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-[1280px] px-4 md:px-8">
        <div className="grid gap-6 border-2 border-[var(--border)] bg-[var(--bg-dark)] p-6 text-white md:grid-cols-3 md:items-center md:p-8">
          <div className="flex items-start gap-3">
            <span className="mt-1 h-3 w-3 rounded-full bg-[var(--accent)]" />
            <div>
              <p className="font-mono-label text-[10px] text-[var(--accent)]">
                AVAILABLE FOR WORK
              </p>
              <p className="font-display text-xl">Full-time / Contract / Freelance</p>
            </div>
          </div>
          <p className="text-sm text-white/80">
            Great ideas need great execution. Let&apos;s create something that
            matters.
          </p>
          <div className="flex flex-col gap-3 md:items-end">
            <p className="font-mono-label text-[10px] text-white/60">
              PREFER DIRECT CONTACT?
            </p>
            <p className="font-display text-lg text-[var(--accent)]">{contactEmail}</p>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 border border-white/30 px-3 py-2 font-mono-label text-[10px] hover:border-[var(--accent)]"
            >
              <Clipboard className="h-4 w-4" />
              {copied ? "✓ Copied!" : "COPY EMAIL 📋"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
