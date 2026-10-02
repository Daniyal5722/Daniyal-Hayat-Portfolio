import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Bot, 
  User, 
  PlusCircle, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { ChatMessage, SuggestedQuestion } from '../types/chat';
import { soundManager } from '../utils/sound';

const SUGGESTED_QUESTIONS: SuggestedQuestion[] = [
  { label: "🚀 Projects", query: "What projects has Daniyal built?" },
  { label: "⚡ Tech Stack", query: "What technologies does Daniyal use?" },
  { label: "⚽ Faryal FC", query: "Tell me about Faryal FC." },
  { label: "🧠 AI Work", query: "What AI projects has Daniyal created?" },
  { label: "📫 Contact", query: "How can I contact Daniyal?" },
];

const STORAGE_KEY = 'daniyal_ask_daniyal_history_v2';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'init-1',
  role: 'assistant',
  content: "Hi! 👋 I'm **Ask Daniyal**, the portfolio assistant for Daniyal Hayat. Ask me about his full-stack web platforms, Faryal FC, CortexIQ, Hamara Weather, native mobile apps, AI engineering, or how to get in touch!",
  timestamp: new Date()
};

// Memoized message item
const ChatMessageItem = React.memo(({ msg }: { msg: ChatMessage }) => {
  const isUser = msg.role === 'user';
  return (
    <div
      className={`flex items-start gap-2.5 sm:gap-3 ${
        isUser ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      <div
        className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 ${
          isUser
            ? 'bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-950 shadow-xs'
            : 'bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400'
        }`}
      >
        {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
      </div>

      <div
        className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
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
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
        }
      }
    } catch (e) {
      console.warn("Failed to load chat history from localStorage", e);
    }
    return [INITIAL_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Save messages to Local Storage safely
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn("Failed to save chat history to localStorage", e);
    }
  }, [messages]);

  // Scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isLoading]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    soundManager.playClick();
    setErrorMessage(null);

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
      const apiMessages = messages.concat(userMessage).map((m) => ({
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
      let fallbackText = "Daniyal Hayat is a Full-Stack Developer & Creative Builder skilled in React, TypeScript, native Kotlin Android development, Google AI Studio, and modern digital systems.";

      if (q.includes('faryal')) {
        fallbackText = "**Faryal FC** is a modern football club web platform engineered by Daniyal featuring matchday fixture schedules, squad roster management, club match highlights, and mobile fan experience.";
      } else if (q.includes('eyewear') || q.includes('dnyl')) {
        fallbackText = "**DNYL Eyewear** is a high-contrast luxury eyewear boutique showcase engineered with React, TypeScript, and refined editorial typography.";
      } else if (q.includes('islamic') || q.includes('mujeeb') || q.includes('saileen') || q.includes('darul')) {
        fallbackText = "**Official Darul Ifta Irshad us Saileen & Islamic AI (Mujeeb us Saileen)** are platforms providing community religious guidance and searchable fatwa archives across web and native Android apps.";
      } else if (q.includes('cortex') || q.includes('cortexiq')) {
        fallbackText = "**CortexIQ AI Suite** is a computational intelligence platform bridging natural language prompts with real-time reactive telemetry dashboards.";
      } else if (q.includes('weather')) {
        fallbackText = "**Hamara Weather** is a real-time meteorological tracking app engineered by Daniyal with OpenWeather API integration.";
      } else if (q.includes('mystic') || q.includes('game') || q.includes('motorcycle')) {
        fallbackText = "Daniyal has built interactive games including **Mystic Match** (a mobile-first match-3 puzzle game in Kotlin) and **Motorcycle Sprint 2D** (an arcade physics canvas runner).";
      } else if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) {
        fallbackText = "You can contact Daniyal directly via email at **mdaniyalhayyat@gmail.com** or connect with him on GitHub at **github.com/DotDaniyal**.";
      } else if (q.includes('skill') || q.includes('tech') || q.includes('stack')) {
        fallbackText = "Daniyal's verified technical skills include **React**, **Next.js**, **TypeScript**, **Tailwind CSS**, **Node.js/Express**, **Kotlin/Android SDK**, and **Google AI Studio / Gemini API**.";
      } else if (q.includes('project') || q.includes('work') || q.includes('built')) {
        fallbackText = "Daniyal's real verified projects include:\n• **Faryal FC**: Modern football club digital platform\n• **DNYL Eyewear**: Luxury optical boutique showcase\n• **CortexIQ AI Suite**: Computational intelligence telemetry dashboard\n• **Darul Ifta Irshad us Saileen**: Web platform & native Android app\n• **Hamara Weather**: Live meteorological tracking application\n• **Mystic Match**: Algorithmic puzzle game in Kotlin";
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

  const handleNewConversation = () => {
    soundManager.playClick();
    setMessages([
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: "Started a fresh conversation! Ask me anything about Daniyal's work, projects, or skills.",
        timestamp: new Date()
      }
    ]);
    setErrorMessage(null);
  };

  const handleClearHistory = () => {
    soundManager.playClick();
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      // ignore
    }
    setMessages([INITIAL_MESSAGE]);
    setErrorMessage(null);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.button
          onClick={() => {
            soundManager.playClick();
            setIsOpen(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500 text-slate-950 shadow-xl shadow-cyan-500/25 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-slate-950 transition-all cursor-pointer"
          aria-label="Open Ask Daniyal Portfolio Assistant"
        >
          <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
          <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white text-xs font-medium rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-slate-700/50">
            Ask Daniyal ✨
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
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] h-[590px] max-h-[85vh] bg-white dark:bg-[#101322] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3.5 bg-slate-50 dark:bg-[#15192d] border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-600 dark:text-cyan-400">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Ask Daniyal <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Verified Portfolio Assistant
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleNewConversation}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="New conversation"
                  aria-label="New conversation"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Clear history"
                  aria-label="Clear history"
                >
                  <Trash2 className="w-4 h-4" />
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

            {/* Error Banner if any */}
            {errorMessage && (
              <div className="px-3 py-2 bg-rose-500/10 border-b border-rose-500/20 text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
              {messages.map((msg) => (
                <ChatMessageItem key={msg.id} msg={msg} />
              ))}

              {isLoading && (
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 shrink-0">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                  <div className="bg-white dark:bg-[#15192d] border border-slate-200/80 dark:border-slate-800 px-4 py-3 rounded-2xl rounded-tl-none shadow-xs flex items-center gap-1.5">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Question Chips */}
            <div className="px-3 py-2 bg-white dark:bg-[#101322] border-t border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar flex items-center gap-1.5 scrollbar-hide">
              {SUGGESTED_QUESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(item.query)}
                  disabled={isLoading}
                  className="shrink-0 min-h-[34px] px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-cyan-500 hover:text-slate-950 dark:hover:bg-cyan-500 dark:hover:text-slate-950 transition-colors disabled:opacity-50 cursor-pointer whitespace-nowrap"
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
              className="flex items-center gap-2 p-3 bg-white dark:bg-[#101322] border-t border-slate-200 dark:border-slate-800"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Daniyal's work & skills..."
                disabled={isLoading}
                aria-label="Message Ask Daniyal"
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
