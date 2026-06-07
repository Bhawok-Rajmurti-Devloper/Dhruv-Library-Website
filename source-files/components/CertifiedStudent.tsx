import React, { useRef, useState, useEffect } from 'react';
import Scene from '../3d-course-hub/components/Scene';
import Overlay from '../3d-course-hub/components/Overlay';
import { CERTIFICATES } from '../data/certificates';

// Small, best-effort protected image component. It prevents context menu, drag, copy,
// middle-click and ctrl/meta-click opening. Note: cannot prevent screenshots or devtools.
const ProtectedImage: React.FC<{
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}> = ({ src, alt = '', className, style }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Prevent drag at DOM level
    const onDragStart = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener('dragstart', onDragStart);
    return () => el.removeEventListener('dragstart', onDragStart);
  }, []);

  const onContext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const onMouseDown = (e: React.MouseEvent) => {
    // prevent middle-click (button===1) and ctrl/cmd clicks which may open in new tab
    if (e.button === 1 || e.ctrlKey || e.metaKey) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const onCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      ref={ref}
      role="img"
      aria-label={alt}
      tabIndex={-1}
      onContextMenu={onContext}
      onDragStart={(e) => e.preventDefault()}
      onMouseDown={onMouseDown}
      onAuxClick={(e) => {
        // auxiliary clicks (middle-click) — block
        e.preventDefault();
        e.stopPropagation();
      }}
      onCopy={onCopy}
      className={className}
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        MozUserSelect: 'none',
        ...style,
      }}
    />
  );
};
const CertifiedStudent: React.FC = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  const handleCourseSelect = (id: string | null) => setSelectedCourseId(id);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-3">Certified Students — Dhruv Library Computer Center</h1>
          <p className="text-lg text-slate-600">certificates issued to learners. Each certificate includes a unique ID and a QR code for verification.</p>
        </div>

        <div className="mb-12">
          <div className="center-card">
            <div className="card-inner">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-slate-900 fancy-heading">Dhruv Computer Center</h2>
                <button
                  onClick={() => { window.location.hash = 'admission'; }}
                  aria-label="Apply now — go to admission section"
                  title="Apply now"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-200"
                >
                  Apply now
                </button>
              </div>

              <p className="text-slate-600 leading-relaxed">Dhruv Computer Center provides practical, career-focused computer training designed for learners of all levels. Our hands-on courses cover essential skills—MS Office, basic IT troubleshooting, internet safety and practical computer applications—and conclude with an assessment that awards an official certificate. Flexible timings, experienced instructors, and small batch sizes help learners gain confidence and real-world skills they can use immediately.</p>
            </div>
          </div>
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-semibold text-slate-900">Dhruv Computer Center — Offered Courses</h2>
            <div className="text-sm text-slate-500">Explore interactive 3D course previews below</div>
          </div>

          <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden relative bg-white shadow-inner">
            <Scene onSelect={handleCourseSelect} selectedId={selectedCourseId} />
            <Overlay selectedId={selectedCourseId} onClose={() => setSelectedCourseId(null)} />
          </div>
        </section>

        {/* Certificates intro section */}
        <section className="mb-8">
          <h3 className="text-xl font-semibold text-slate-900">Certificates & Verification</h3>
          <p className="text-slate-600 mt-2">All our courses include a practical assessment and an official certificate upon successful completion. Each certificate carries a unique ID and a QR code for quick online verification — ideal for sharing with employers or adding to your academic portfolio.</p>
        </section>

        <style>{`
          /* Import an attractive display font for the Dhruv Computer Center heading */
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap');

          /* CTA card enhancements */
          .cta-card{ transition: transform 220ms cubic-bezier(.2,.9,.3,1), box-shadow 220ms, background-color 220ms; }
          .cta-card:hover{ transform: translateY(-6px) scale(1.01); box-shadow: 0 18px 40px rgba(15,23,42,0.12); background-color: #fff7ef; }
          .cta-plus{ transition: transform 260ms cubic-bezier(.2,.9,.3,1), box-shadow 260ms; will-change: transform; }
          .cta-plus:hover{ transform: scale(1.08) rotate(10deg); box-shadow: 0 10px 30px rgba(255,138,0,0.18); }
          .cta-plus:active{ transform: scale(0.98) rotate(6deg); }
          .cta-plus:focus{ outline: none; box-shadow: 0 0 0 6px rgba(255,138,0,0.12); }
          @keyframes cta-pulse { 0%{ transform: scale(1); } 50%{ transform: scale(1.04); } 100%{ transform: scale(1); } }
          .cta-card.pulse .cta-plus{ animation: cta-pulse 2200ms ease-in-out infinite 800ms; }

          /* Fancy heading style using Playfair Display */
          .fancy-heading{ font-family: 'Playfair Display', serif; letter-spacing: 0.4px; font-weight: 700; }

          /* (Overlay buttons removed from student cards) */

          /* Animated border card for Dhruv Computer Center */
          .center-card{ position: relative; border-radius: 14px; padding: 2px; background: linear-gradient(90deg,#fb923c,#ef4444,#f97316,#fb923c); background-size: 300% 300%; animation: border-anim 5.5s linear infinite; }
          .center-card .card-inner{ background: white; border-radius: 12px; padding: 1rem; position: relative; z-index: 2; }
          /* subtle glowing aura to make the moving border more visible */
          .center-card::after{
            content: '';
            position: absolute;
            left: -6px;
            top: -6px;
            right: -6px;
            bottom: -6px;
            border-radius: 18px;
            pointer-events: none;
            background: linear-gradient(90deg, rgba(255, 115,0, 1), rgba(255, 115, 0, 1), rgba(255, 115, 0, 1));
            filter: blur(8px);
            opacity: 0.9;
            z-index: 1;
            mix-blend-mode: screen;
            animation: glow-amp 4s ease-in-out infinite;
          }
          @keyframes glow-amp {
            0% { transform: scale(0.98); opacity: 0.85; }
            50% { transform: scale(1.02); opacity: 1; }
            100% { transform: scale(0.98); opacity: 0.85; }
          }
          @keyframes border-anim { 0%{ background-position: 0% 50%; } 50%{ background-position: 100% 50%; } 100%{ background-position: 0% 50%; } }
        `}</style>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATES.map((s) => (
            <article key={s.id} className="w-full bg-white shadow-lg border border-slate-100 rounded-2xl overflow-hidden p-6 flex flex-col md:flex-row gap-4 items-center">
              <div className="w-36 h-36 md:w-40 md:h-40 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                <ProtectedImage src={s.img} alt={s.name} className="w-full h-full block" />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-emerald-600">{s.name}</h3>
                <p className="text-sm text-slate-600">{s.course} • <span className="font-mono">{s.id}</span></p>
                <p className="mt-2 text-slate-700">{s.desc}</p>
              </div>

              <div className="flex flex-col gap-2 items-end">
                {/* Show percentage and typing speed when available (both can appear) */}
                <div className="text-right">
                  {typeof s.percentage === 'number' ? (
                    <div>
                      <div className="text-2xl font-bold text-slate-800">{s.percentage}%</div>
                      {s.grade ? (
                        <div className="text-xs text-slate-500 mt-0.5">{s.grade}</div>
                      ) : (
                        <div className="text-xs text-slate-400 mt-0.5">Grade not set</div>
                      )}
                    </div>
                  ) : null}

                  {s.speed ? (
                    <div className="mt-2">
                      <div className="text-lg font-semibold text-slate-800">{s.speed}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Typing Speed</div>
                    </div>
                  ) : null}
                </div>

                <button onClick={() => { window.location.hash = `verify/${s.id}`; }} className="px-4 py-2 bg-slate-900 text-white rounded-md">View Certificate</button>
              </div>
            </article>
          ))}
          {/* CTA card: next is your turn */}
          <article className="w-full bg-white dashed-border border-slate-100 rounded-2xl overflow-hidden p-6 flex flex-col md:flex-row gap-4 items-center cta-card pulse">
            <div className="w-36 h-36 md:w-40 md:h-40 rounded-full bg-orange-50 flex-shrink-0 flex items-center justify-center border border-orange-100">
              <button onClick={() => { window.location.hash = 'admission'; }} aria-label="Apply for admission" className="w-14 h-14 rounded-full bg-orange-600 text-white flex items-center justify-center text-2xl font-bold shadow-md cta-plus">+</button>
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900">Next — your turn to get certified</h3>
              <p className="text-sm text-slate-600">Ready to start? Apply for the Computer course and take the next step toward certification.</p>
            </div>

            <div className="flex flex-col gap-2">
              <a onClick={(e) => { e.preventDefault(); window.location.hash = 'admission'; }} href="#admission" className="text-sm text-orange-600 hover:underline">Learn more</a>
            </div>
          </article>
        </div>

        {/* Certificate preview modal removed — now redirecting to the verification page */}
      </div>
    </section>
  );
};

export default CertifiedStudent;
