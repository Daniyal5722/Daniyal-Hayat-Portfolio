import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, RotateCcw, ExternalLink, ArrowRight, Bot, User } from 'lucide-react';
import { ChatMessage, SuggestedQuestion } from '../types/chat';

const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { label: "👤 About Daniyal", query: "Who is Daniyal Hayat?" },
  { label: "🚀 Projects", query: "Show me Daniyal's projects and live demos" },
  { label: "⚡ Skills", query: "What technologies and skills does Daniyal use?" },
  { label: "🌤️ Hamara Weather", query: "Tell me about the Hamara Weather app" },
  { label: "🎮 Mystic Match", query: "Tell me about the Mystic Match game" },
  { label: "📫 Contact", query: "How can I contact Daniyal?" },
];

// Memoized Chat Message Item to completely eliminate unnecessary render passes
const ChatMessageItem = React.memo(({ msg }: { msg: ChatMessage }) => {
  const isUser = msg.role === 'user';
  return (
    <div
      className={`flex items-start gap-3 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${
          isUser
            ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950'
            : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400'
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
          isUser
            ? 'bg-cyan-500 text-slate-950 rounded-tr-none font-medium'
            : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-800 rounded-tl-none'
        }`}
      >
        <div className="whitespace-pre-wrap break-words">
          {msg.content}
        </div>
      </div>
    </div>
  );
});

ChatMessageItem.displayName = 'ChatMessageItem';

export function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! 👋 I'm **Daniyal AI**, Daniyal's personal portfolio assistant. Ask me anything about Daniyal, his skills, live projects, technologies, or how to get in touch!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const apiMessages = messages.concat(userMessage).map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch response');
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      // Resilient local intelligent fallback using verified portfolio facts
      const q = query.toLowerCase();
      let fallbackText = "Daniyal Hayat is a software engineer & product builder skilled in React, TypeScript, native Kotlin Android development, and AI systems.";

      if (q.includes('who') || q.includes('about')) {
        fallbackText = "Daniyal Hayat is a software engineer specializing in building high-performance web applications, native Android platforms (Kotlin), and AI-integrated products. Check out the About and Projects sections to learn more!";
      } else if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach')) {
        fallbackText = "You can reach Daniyal directly via email at **mdaniyalhayyat@gmail.com** or connect with him on GitHub at **github.com/Daniyal5722**.";
      } else if (q.includes('project') || q.includes('work') || q.includes('demo')) {
        fallbackText = "Daniyal's flagship projects include:\n• **CortexIQ**: Computational intelligence & analytics suite.\n• **Hamara Weather**: Native Kotlin Android weather tracking app.\n• **Darul Ifta**: Public Islamic jurisprudence portal & native Android app.\n• **Mystic Match**: Interactive browser-based game.\n\nAll source code is available on his GitHub (Daniyal5722)!";
      } else if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
        fallbackText = "Daniyal's core technical proficiencies include **React**, **TypeScript**, **Kotlin**, **Android SDK**, **Tailwind CSS**, **Node.js/Express**, **Google Gemini AI**, and **REST APIs**.";
      } else if (q.includes('weather')) {
        fallbackText = "**Hamara Weather** is a responsive weather monitoring app built with native Kotlin Android technologies and OpenWeather API integration, featuring real-time meteorological forecasts.";
      } else if (q.includes('darul') || q.includes('ifta')) {
        fallbackText = "**Darul Ifta Irshad us Saileen** consists of both a production web portal and native Android mobile application for Islamic jurisprudence inquiries with dual language support.";
      }

      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: fallbackText,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Chat cleared! How else can I help you explore Daniyal's portfolio?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 transition-all cursor-pointer"
          aria-label="Open Daniyal AI Assistant"
        >
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700/50">
            Ask Daniyal AI ✨
          </span>
        </motion.button>
      </div>

      {/* Chat Window Modal / Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white dark:bg-[#111422] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-slate-50 dark:bg-[#161a2e] border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Daniyal AI <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Portfolio Concierge & Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Clear conversation"
                  aria-label="Clear conversation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Close chat"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} msg={msg} />
              ))}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white dark:bg-[#161a2e] border border-slate-200/80 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 bg-white dark:bg-[#111422] border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-1.5 scrollbar-hide">
              {SUGGESTED_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.query)}
                  disabled={isLoading}
                  className="shrink-0 min-h-[36px] px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-slate-950 dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2 p-3 bg-white dark:bg-[#111422] border-t border-slate-200 dark:border-slate-800"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Daniyal AI..."
                disabled={isLoading}
                aria-label="Message input"
                className="flex-1 min-h-[44px] px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-base sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-xl bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-50 disabled:hover:bg-cyan-500 transition-colors shrink-0 shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
