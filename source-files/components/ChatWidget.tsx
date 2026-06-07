import React, { useEffect, useState } from 'react';
import { Bot, MessageCircle, X } from 'lucide-react';
import AILibrarian from './AILibrarian';

const quickEnquiries = [
  'How can I book a seat?',
  'What are the opening hours?',
  'Do you have lockers available?',
  'Tell me about membership plans'
];

const ChatWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<string | undefined>(undefined);
  // hide the quick-enquiries footer when a quick option is used so the chat takes focus
  const [hideQuickFooter, setHideQuickFooter] = useState(false);
  // request the inner AILibrarian input to focus
  const [requestFocus, setRequestFocus] = useState(false);

  // Auto-open once per session (small delay) to proactively offer help
  useEffect(() => {
    const dismissed = sessionStorage.getItem('chatDismissed');
    if (!dismissed) {
      const t = setTimeout(() => setOpen(true), 4500);
      return () => clearTimeout(t);
    }
  }, []);

  // read persisted quick footer preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem('chat_hide_quick');
      if (stored === 'true') setHideQuickFooter(true);
    } catch (e) {
      // ignore
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    setHideQuickFooter(false);
    setRequestFocus(false);
    sessionStorage.setItem('chatDismissed', '1');
  };

  const openWithQuery = (q: string) => {
    setPrefill(q);
    setHideQuickFooter(true);
    setOpen(true);
    // request focus shortly after opening so user sees the message being composed
    setTimeout(() => setRequestFocus(true), 250);
  };

  // close on Escape when open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <div>
      {/* Floating launcher */}
      <div className="fixed right-6 bottom-6 z-50">
        {!open && (
          <button
            aria-label="Open chat"
            onClick={() => setOpen(true)}
            className="w-14 h-14 rounded-full bg-orange-600 shadow-lg flex items-center justify-center text-white hover:scale-105 transform transition"
          >
            <Bot className="w-6 h-6" />
          </button>
        )}

        {/* Panel */}
        {open && (
          <div className="w-[360px] h-[560px] bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-orange-50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-800">Dhruv Assistant</div>
                  <div className="text-xs text-slate-500">Here to help — ask anything</div>
                  <div className="text-xs text-orange-600 font-serif font-bold tracking-wide mt-1">Dhruv AI Nexus</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={handleClose} className="p-2 rounded-md hover:bg-slate-50">
                  <X />
                </button>
              </div>
            </div>

              <div className="p-3 flex-1 overflow-hidden">
                <AILibrarian initialQuery={prefill} focusInput={requestFocus} hideHeader />
              </div>

            {/* Footer with quick enquiries - hide when a quick option was clicked. Use transition classes for smooth hide/show. */}
            <div className={`p-3 border-t border-slate-100 bg-white transition-all duration-300 overflow-hidden ${hideQuickFooter ? 'max-h-0 opacity-0 -translate-y-2' : 'max-h-40 opacity-100 translate-y-0'}`}>
              <div className="flex items-center justify-between mb-2">
                <div className="text-xs text-slate-500">Quick enquiries</div>
                <button
                  aria-label="Close quick enquiries"
                  onClick={() => {
                    setHideQuickFooter(true);
                    try { localStorage.setItem('chat_hide_quick', 'true'); } catch (e) {}
                  }}
                  className="p-1 rounded hover:bg-slate-100"
                >
                  <X />
                </button>
              </div>

              <div className="flex gap-2 flex-wrap">
                {quickEnquiries.map((q) => (
                  <button
                    key={q}
                    onClick={() => openWithQuery(q)}
                    className="text-xs px-3 py-1 rounded-full bg-slate-100 hover:bg-orange-50 border border-slate-200 text-slate-700"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* When quick footer is hidden, show a compact bar with controls */}
            {hideQuickFooter && (
              <div className="p-3 border-t border-slate-100 bg-white flex items-center justify-between gap-2 transition-opacity duration-300">
                <button
                  onClick={() => {
                    setHideQuickFooter(false);
                    try { localStorage.removeItem('chat_hide_quick'); } catch (e) {}
                  }}
                  className="text-xs px-3 py-2 rounded-full bg-slate-100 hover:bg-orange-50 border border-slate-200 text-slate-700"
                >
                  Show quick enquiries
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      // request focus in child AILibrarian
                      setRequestFocus(true);
                      // clear the request after a short delay to allow repeated focusing later
                      setTimeout(() => setRequestFocus(false), 500);
                    }}
                    className="text-xs px-3 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-500"
                  >
                    Write a message
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatWidget;
