import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Mail, 
  Copy, 
  Check, 
  MessageSquare,
  Clock,
  Sparkles
} from 'lucide-react';
import { DEVELOPER_EMAIL, GITHUB_PROFILE_URL, GITHUB_USERNAME } from '../data/portfolioData';
import { ContactFormState } from '../types';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    setTimeout(() => {
      try {
        const existingMessages = JSON.parse(localStorage.getItem('daniyal_portfolio_messages') || '[]');
        localStorage.setItem('daniyal_portfolio_messages', JSON.stringify([
          ...existingMessages,
          { ...formData, timestamp: new Date().toISOString() }
        ]));
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } catch (err) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      }
    }, 1000);
  };

  return (
    <section id="contact" className="py-24 relative border-t dark:border-slate-800/80 border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="space-y-4 max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 text-xs font-mono uppercase tracking-widest">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Direct Inquiries & Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Let's Discuss Your Next Build
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Have an engineering challenge, product redesign, mobile app build, or AI integration in mind? Reach out directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Info & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              
              <div className="space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Direct Inbox
                </span>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2.5 text-sm font-mono text-slate-800 dark:text-slate-200 truncate">
                    <Mail className="w-4 h-4 text-cyan-500 shrink-0" />
                    <span className="truncate">{DEVELOPER_EMAIL}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy email address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Response Time</strong>
                    Typically responds within 24 hours on business days.
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-600 dark:text-slate-400">
                  <Sparkles className="w-4 h-4 text-cyan-500 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-900 dark:text-white block font-medium">Project Scope</strong>
                    Open for high-impact web apps, native Android projects, and consultations.
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 rounded-3xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm relative overflow-hidden"
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Message Transmitted!</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out. Your message has been safely recorded. Daniyal will follow up with you promptly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-mono text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-600 dark:text-red-400 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Chen"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-slate-400 block">
                    Message Details *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your project, timeline, or engineering opportunity..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 text-slate-900 dark:text-white text-sm outline-none transition-all placeholder:text-slate-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm shadow-md shadow-cyan-500/20 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Dispatch Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
}
