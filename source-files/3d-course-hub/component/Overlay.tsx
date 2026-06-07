import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight } from 'lucide-react';
import { COURSES } from '../constants';

interface OverlayProps {
  selectedId: string | null;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ selectedId, onClose }) => {
  const selectedCourse = COURSES.find(c => c.id === selectedId);

  const AUTO_CLOSE_MS = 10000; // keep in sync with auto-close timer

  // auto-close the overlay 10s after a selection is made
  useEffect(() => {
    if (!selectedId) return;
    const t = window.setTimeout(() => {
      try { onClose(); } catch (e) { /* ignore */ }
    }, 10000);
    return () => window.clearTimeout(t);
  }, [selectedId, onClose]);

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-8">

      {/* Details Modal */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, x: -8, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.2, 0.9, 0.2, 1] }}
            className="absolute top-12 left-3 md:left-6 bg-white rounded-2xl shadow-2xl p-5 w-[92%] md:w-80 max-w-sm pointer-events-auto border border-white/50 max-h-[86vh] overflow-hidden flex flex-col"
            style={{ willChange: 'transform, opacity' }}
          >
            {/* content area that can scroll; button remains visible below */}
            <style>{`@keyframes overlay-countdown { from { width: 100%; } to { width: 0%; } }`}</style>
            <div className="flex-1 overflow-auto pr-1">
              <div className="mb-3">
                <div className="w-full bg-slate-100 rounded-full h-1 overflow-hidden">
                  {selectedId && (
                    <div
                      key={selectedId}
                      className="h-1 rounded-full"
                      style={{
                        background: 'linear-gradient(90deg,#fb923c,#ef4444)',
                        animation: `overlay-countdown ${AUTO_CLOSE_MS / 1000}s linear forwards`
                      }}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end mb-2">
                <button 
                  onClick={onClose}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close details"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <h2 className="text-lg font-semibold text-gray-1000 mb-2">{selectedCourse.title.replace('\n', ' ')}</h2>
              <p className="text-gray-800 mb-4 text-sm leading-snug">{
                `Explore the fundamentals and advanced concepts of ${selectedCourse.title.replace('\n',' ').toLowerCase()}. This interactive module gives you a quick overview and a guided path to get started with the course.`}
              </p>
            </div>

            <div className="mt-2">
              <button
                onClick={() => {
                  try { onClose(); } catch (e) {}
                  // navigate to admission section
                  try { window.location.hash = 'admission'; } catch (e) {}
                }}
                className="w-full py-2 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-500 transition-colors flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

  {/* Footer */}
      <footer className="pointer-events-auto text-center md:text-right">
        <p className="text-sm text-gray-400 font-medium">
          Interactive 3D Menu &bull; React Three Fiber
        </p>
      </footer>
    </div>
  );
};

export default Overlay;
