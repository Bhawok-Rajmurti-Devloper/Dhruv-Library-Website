import React, { useEffect, useRef, useState } from 'react';

type Review = {
  id?: string | number;
  name?: string;
  text: string;
  rating: number;
  profile_photo_url?: string;
};

type Props = {
  reviews: Review[];
  visibleCount?: number; // how many to show at once
  interval?: number; // ms
};

const ReviewsSlider: React.FC<Props> = ({ reviews, visibleCount = 3, interval = 3000 }) => {
  const [index, setIndex] = useState(0);
  const total = Math.max(1, Math.ceil(reviews.length / visibleCount));
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    // autoplay
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIndex(i => (i + 1) % total);
    }, interval) as unknown as number;
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [reviews.length, visibleCount, interval, total]);

  // Build groups of reviews (chunks)
  const chunks: Review[][] = [];
  for (let i = 0; i < reviews.length; i += visibleCount) {
    chunks.push(reviews.slice(i, i + visibleCount));
  }
  // If not enough to fill last chunk, wrap around
  if (chunks.length === 0) chunks.push([]);

  return (
    <div className="w-full">
      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${index * 100}%)`, width: `${chunks.length * 100}%` }} ref={sliderRef}>
          {chunks.map((chunk, ci) => (
            <div key={ci} className="w-full flex-shrink-0 px-2" style={{ width: `${100 / chunks.length}%` }}>
              <div className="flex gap-4 justify-center">
                {chunk.map((r, i) => (
                  <div key={r.id ?? i} className="bg-white rounded-lg shadow-sm p-4 border border-slate-50 w-80">
                    <div className="relative">
                      <div className="flex items-start gap-3">
                        <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-semibold text-base relative overflow-hidden">
                          {r.profile_photo_url ? (
                            <img src={r.profile_photo_url} alt={r.name} loading="lazy" width={48} height={48} className="w-full h-full object-cover" />
                          ) : (
                            <span>{(r.name || 'U').slice(0,1)}</span>
                          )}

                          {/* Google badge bottom-right */}
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs font-bold shadow" title="Google reviewer">
                            <span style={{ color: '#4285F4' }}>G</span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="text-slate-900 font-semibold">{r.name}</div>
                          <div className="text-sm text-slate-700 mt-1">{r.text}</div>
                          <div className="mt-3 text-orange-500 text-sm">{Array.from({ length: 5 }).map((_, idx) => (
                            <span key={idx} className={idx < Math.round(r.rating) ? 'opacity-100' : 'opacity-30'}>★</span>
                          ))}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {chunks.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-orange-600' : 'bg-slate-200'}`} aria-label={`Go to slide ${i+1}`} />
        ))}
      </div>
    </div>
  );
};

export default ReviewsSlider;
