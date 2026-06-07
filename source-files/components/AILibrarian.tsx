import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, BookOpen } from 'lucide-react';
import { generateLibrarianResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

type AILibrarianProps = {
  initialQuery?: string;
  focusInput?: boolean;
  hideHeader?: boolean;
};

const AILibrarian: React.FC<AILibrarianProps> = ({ initialQuery, focusInput, hideHeader }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Greetings. I am Dhruv, your self-learning cognitive guide. I evolve with every interaction. How may I accelerate your knowledge acquisition today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);
  const [permanentlyDismissed, setPermanentlyDismissed] = useState(false);
  const autoShowTimerRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const lastAutoSentRef = useRef<string | null>(null);
  const AUTO_SHOW_SECONDS = 12; // configurable delay to re-show suggestions

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // focus input when parent requests it
  useEffect(() => {
    if (focusInput) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [focusInput]);

  // read persisted dismissal on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('dhruv_quick_dismissed');
      if (stored === 'true') setPermanentlyDismissed(true);
      if (stored === 'true') setShowQuick(false);
    } catch (e) {
      // ignore
    }
  }, []);

  // manage auto-show timer when quick suggestions are hidden
  useEffect(() => {
    // clear previous timer
    if (autoShowTimerRef.current) {
      window.clearTimeout(autoShowTimerRef.current);
      autoShowTimerRef.current = null;
    }

    if (!showQuick && !permanentlyDismissed) {
      // schedule auto-show
      autoShowTimerRef.current = window.setTimeout(() => {
        setShowQuick(true);
        autoShowTimerRef.current = null;
      }, AUTO_SHOW_SECONDS * 1000);
    }

    return () => {
      if (autoShowTimerRef.current) {
        window.clearTimeout(autoShowTimerRef.current);
        autoShowTimerRef.current = null;
      }
    };
  }, [showQuick, permanentlyDismissed]);

  // set query and auto-send when external initialQuery prop changes (e.g. quick-enquiry from ChatWidget)
  useEffect(() => {
    if (!initialQuery || !initialQuery.trim()) return;
    if (lastAutoSentRef.current === initialQuery) return; // avoid duplicates
    setQuery(initialQuery);
    setShowQuick(false);
    const t = setTimeout(() => {
      lastAutoSentRef.current = initialQuery;
      void handleSendWithText(initialQuery);
      setQuery('');
    }, 300);

    return () => clearTimeout(t);
  }, [initialQuery]);

  // send a message programmatically (used for auto-send from ChatWidget quick enquiries)
  const handleSendWithText = async (text: string) => {
    if (!text || !text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const responseText = await generateLibrarianResponse(text);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "My neural pathways are currently congested. Please verify your API Key or try again later.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // original handler for manual send (uses the current query state)
  const handleSend = () => {
    if (!query.trim()) return;
    const text = query;
    setQuery('');
    void handleSendWithText(text);
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-[600px] flex flex-col bg-white/70 backdrop-blur-xl border border-orange-500/20 rounded-2xl shadow-2xl overflow-hidden relative">
      {/* Header (can be hidden when embedded in a parent panel) */}
  {!hideHeader && (
        <div className="p-4 border-b border-orange-100 flex items-center space-x-3 bg-gradient-to-r from-orange-50 to-white">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-orange-600 font-serif font-bold tracking-wide">Dhruv AI Nexus</h3>
            <p className="text-xs text-slate-500">Gemini 3.0 • Self-Learning Matrix</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50" role="log" aria-live="polite" aria-atomic="false">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div className={`flex max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start gap-3`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-orange-100 border border-orange-200'}`}>
                {msg.role === 'user' ? <User size={14} className="text-slate-600" /> : <Sparkles size={14} className="text-orange-600" />}
              </div>
              
              <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-orange-600 text-white rounded-tr-none' 
                  : msg.isError 
                    ? 'bg-red-50 border border-red-200 text-red-800 rounded-tl-none' 
                    : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="flex flex-row items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center">
                <Loader2 size={14} className="text-orange-500 animate-spin" />
              </div>
              <div className="text-xs text-slate-500 animate-pulse">Accessing Dhruv Knowledge Base...</div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white/80 border-t border-slate-100">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputRef}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question to evolve the library..."
            className="w-full bg-slate-50 text-slate-800 pl-4 pr-12 py-4 rounded-xl border border-slate-200 focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 focus:outline-none transition-all placeholder:text-slate-400"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading || !query.trim()}
            className="absolute right-2 p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3">
          {/* suggestions container with show/hide animation */}
          <div className={`overflow-hidden transition-all duration-300 ${showQuick ? 'max-h-40 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'}`}>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {['Explain Quantum Mechanics', 'Summary of "Atomic Habits"', 'History of Meerut', 'Self-learning algorithms'].map(suggestion => (
                <button 
                  key={suggestion}
                  onClick={() => { setQuery(suggestion); setShowQuick(false); void handleSendWithText(suggestion); }}
                  className="whitespace-nowrap px-3 py-1 bg-slate-100 hover:bg-orange-50 border border-slate-200 rounded-full text-xs text-slate-600 hover:text-orange-600 transition-colors flex items-center gap-1"
                >
                  <BookOpen size={10} /> {suggestion}
                </button>
              ))}
              {/* permanent dismiss button */}
              <button
                onClick={() => {
                  setPermanentlyDismissed(true);
                  setShowQuick(false);
                  try { localStorage.setItem('dhruv_quick_dismissed', 'true'); } catch (e) {}
                }}
                className="ml-2 whitespace-nowrap px-3 py-1 bg-white/60 border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-white text-center"
                title="Don't show suggestions again"
              >
                Don't show again
              </button>
            </div>
          </div>

          {/* show suggestions button when hidden and not permanently dismissed */}
          {!showQuick && !permanentlyDismissed && (
            <div className="mt-2">
              <button onClick={() => setShowQuick(true)} className="px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs text-slate-600 hover:bg-orange-50 transition">Show suggestions</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AILibrarian;