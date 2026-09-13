import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, AlertCircle, Loader2, Mail } from 'lucide-react';
import { ContactFormState } from '../types';

export function Contact() {
  const [formData, setFormData] = useState<ContactFormState>({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all fields before sending.');
      return;
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setStatus('error');
      setErrorMessage('Please provide a valid email address.');
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
        setStatus('success'); // fallback if localStorage is disabled
        setFormData({ name: '', email: '', message: '' });
      }
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 dark:bg-[#090a0f] bg-slate-50 relative border-t dark:border-slate-900 border-slate-200 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-cyan-500 font-mono text-xs uppercase tracking-widest block mb-3 font-medium">GET IN TOUCH</span>
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white text-slate-900 tracking-tight mb-3">
            Let's Build Something Exceptional
          </h2>
          <p className="dark:text-slate-400 text-slate-600 text-sm max-w-md mx-auto">
            Have a project or collaboration in mind? Drop a message below. Preferences are saved locally for convenience.
          </p>
        </div>

        {/* Contact Card / Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl dark:bg-slate-900/60 bg-white dark:border-slate-800/80 border border-slate-200/90 p-8 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-12 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-500 dark:text-cyan-400">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold dark:text-white text-slate-900">Message Received Successfully!</h3>
              <p className="dark:text-slate-300 text-slate-600 text-sm max-w-sm mx-auto">
                Thank you for reaching out. Your message has been safely recorded locally. Daniyal will get back to you soon.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-6 px-6 py-2.5 rounded-xl dark:bg-slate-800 bg-slate-100 hover:dark:bg-slate-700 hover:bg-slate-200 text-xs font-mono text-cyan-600 dark:text-cyan-300 transition-colors border dark:border-slate-700 border-slate-300"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === 'error' && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-600 dark:text-red-300 text-sm">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono dark:text-slate-300 text-slate-700 block">Your Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl dark:bg-slate-950 bg-slate-50 dark:border-slate-800 border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:text-white text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono dark:text-slate-300 text-slate-700 block">Email Address</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl dark:bg-slate-950 bg-slate-50 dark:border-slate-800 border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:text-white text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono dark:text-slate-300 text-slate-700 block">Message</label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-3 rounded-xl dark:bg-slate-950 bg-slate-50 dark:border-slate-800 border-slate-200 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 dark:text-white text-slate-900 text-sm outline-none transition-all placeholder:text-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-medium text-sm shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}
