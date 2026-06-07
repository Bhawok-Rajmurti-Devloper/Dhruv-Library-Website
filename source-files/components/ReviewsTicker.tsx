import React from 'react';
import { CheckCircle } from 'lucide-react';

type Review = {
  id?: string | number;
  name?: string;
  text: string;
  rating: number; // 0-5
};

type Props = {
  reviews?: Review[];
  speed?: number; // seconds for one full travel (smaller = faster)
};

const defaultReviews: Review[] = [
  { id: 1, name: 'Amit', text: 'Fantastic place to study — quiet, clean and well-managed.', rating: 5 },
  { id: 2, name: 'Pooja', text: 'Good timings and helpful staff. Highly recommended.', rating: 5 },
  { id: 3, name: 'Ravi', text: "My scores improved after joining — great ambience for focus.", rating: 5 },
  { id: 4, name: 'Sakshi', text: 'Facilities are top-notch and the place feels safe.', rating: 4 },
  { id: 5, name: 'Jaideep Singh', text: 'Dhruv Library is one of the best study environments I’ve experienced.', rating: 4.5 },
  { id: 6, name: 'Sanju das', text: 'The environment is peaceful, seats are comfortable, and the owner is very supportive.', rating: 5 },
  { id: 7, name: 'Ankit', text: 'A true ‘Town of Knowledge’! Great atmosphere, disciplined students', rating: 4 },
  { id: 8, name: 'Aanchal', text: 'The owner is very cooperative and friendly in nature.', rating: 5 }
];

const ReviewsTicker: React.FC<Props> = ({ reviews = defaultReviews, speed = 18 }) => {
  // Duplicate reviews so marquee looks continuous
  const items = [...reviews, ...reviews];

  return (
    <div className="mt-8 w-full">
      {/* full-bleed ribbon */}
      <div className="w-full">
        <div className="relative overflow-hidden bg-red-600 text-white w-full py-4">

          {/* Marquee container (take full width) */}
          <div className="px-6 overflow-hidden">
            <div
              className="flex items-center gap-6 whitespace-nowrap will-change-transform"
              style={{
                animation: `moveLTR ${speed}s linear infinite`
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running'; }}
            >
              {items.map((r, i) => (
                <div key={`${r.id ?? i}-${i}`} className="inline-block bg-white rounded-lg shadow-lg px-6 py-4 min-w-[300px] max-w-[420px] min-h-[110px] border border-slate-100 overflow-hidden break-words">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-base">{(r.name || 'U').slice(0,1)}</div>
                    </div>
                    <div className="flex-1">
                      <div className="text-base text-slate-900 font-semibold">{r.name ?? 'Anonymous'}</div>
                      <div className="text-sm text-slate-700 mt-1 whitespace-normal break-words">{r.text}</div>
                      <div className="mt-3 text-orange-500 text-sm">{Array.from({length: 5}).map((_, idx) => (
                        <span key={idx} className={idx < Math.round(r.rating) ? 'opacity-100' : 'opacity-30'}>★</span>
                      ))}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keyframes scoped here */}
          <style>{`
            @keyframes moveLTR {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(0%); }
            }
            /* Slight tweak for very small screens */
            @media (max-width: 640px) {
              .min-w-\\[320px\\] { min-width: 220px; }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ReviewsTicker;
