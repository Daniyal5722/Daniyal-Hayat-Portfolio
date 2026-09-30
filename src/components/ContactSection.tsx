import React, { useState } from 'react';
import { DEVELOPER_EMAIL, GITHUB_PROFILE_URL } from '../data/portfolioData';
import { Mail, Github, Send, CheckCircle2, AlertCircle, Copy, Check, Clock } from 'lucide-react';
import { z } from 'zod';

const ClientContactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().max(150).optional(),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(3000),
  website: z.string().optional(), // Honeypot
});

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // honeypot
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_EMAIL);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for that field
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});

    // Client-side Zod validation
    const validation = ClientContactSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.issues.forEach(err => {
        const fieldName = err.path[0] as string;
        if (!errors[fieldName]) {
          errors[fieldName] = err.message;
        }
      });
      setFieldErrors(errors);
      setStatus('error');
      setStatusMessage('Please correct the highlighted fields before submitting.');
      return;
    }

    setStatus('loading');
    setStatusMessage('Transmitting message...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit contact transmission.');
      }

      setStatus('success');
      setStatusMessage(data.message || 'Message transmitted successfully. Daniyal will follow up with you shortly.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        website: '',
      });
    } catch (err: any) {
      setStatus('error');
      setStatusMessage(err.message || 'An unexpected error occurred. Please contact me directly via email.');
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 relative border-t border-slate-800/60" aria-label="Contact Daniyal Hayat">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase tracking-wider">
            <span>06 // TRANSMISSION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Initiate Contact
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Interested in collaboration, architecture review, or custom engineering? Submit a direct transmission below.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Inquiries & Expectations */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6">
              
              {/* Response Expectation */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/[0.05] border border-cyan-500/20">
                <Clock className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">
                    Response Expectation
                  </span>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    I typically review and reply to all legitimate inquiries within <strong className="text-slate-800 dark:text-slate-200">24 business hours</strong>.
                  </p>
                </div>
              </div>

              {/* Direct Email with Copy */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                  Direct Email
                </span>
                <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <a
                    href={`mailto:${DEVELOPER_EMAIL}`}
                    className="text-sm font-mono text-cyan-600 dark:text-cyan-400 hover:underline truncate"
                  >
                    {DEVELOPER_EMAIL}
                  </a>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-cyan-400 min-h-[40px] min-w-[40px] flex items-center justify-center"
                    aria-label={emailCopied ? "Email copied to clipboard" : "Copy email address to clipboard"}
                  >
                    {emailCopied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                {/* Live screen reader announcement for copied email */}
                <div aria-live="polite" className="sr-only">
                  {emailCopied ? "Email address copied to clipboard" : ""}
                </div>
              </div>

              {/* GitHub Profile */}
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 block font-semibold">
                  Code Repositories
                </span>
                <a
                  href={GITHUB_PROFILE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-all text-xs font-mono"
                >
                  <span className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-cyan-500" />
                    <span>github.com/Daniyal5722</span>
                  </span>
                  <span className="text-slate-500">Public · Verified</span>
                </a>
              </div>

            </div>

          </div>

          {/* Right Column: Server-Side Validated Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xl">
              
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Honeypot field (hidden from sighted users and screen readers via tabIndex -1) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website-honeypot">Website</label>
                  <input
                    id="website-honeypot"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      value={formData.name}
                      onChange={handleChange}
                      aria-invalid={!!fieldErrors.name}
                      aria-describedby={fieldErrors.name ? "name-error" : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        fieldErrors.name ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                      }`}
                    />
                    {fieldErrors.name && (
                      <p id="name-error" className="text-xs text-rose-500 font-mono">
                        {fieldErrors.name}
                      </p>
                    )}
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      aria-invalid={!!fieldErrors.email}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        fieldErrors.email ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                      }`}
                    />
                    {fieldErrors.email && (
                      <p id="email-error" className="text-xs text-rose-500 font-mono">
                        {fieldErrors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-subject" className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Subject / Project Context
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="e.g. Contract Engineering Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-slate-900 dark:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  />
                </div>

                {/* Message Textarea */}
                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Describe your requirements, scope, or timeline..."
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? "message-error" : undefined}
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border text-slate-900 dark:text-white text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 resize-y min-h-[120px] ${
                      fieldErrors.message ? 'border-rose-500' : 'border-slate-300 dark:border-slate-800'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="text-xs text-rose-500 font-mono">
                      {fieldErrors.message}
                    </p>
                  )}
                </div>

                {/* Live Form Status Alert Region */}
                <div aria-live="polite" className="space-y-2">
                  {status === 'success' && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center gap-2.5 text-xs text-rose-600 dark:text-rose-400">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{statusMessage}</span>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed min-h-[44px]"
                >
                  {status === 'loading' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <span>Transmit Message</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
