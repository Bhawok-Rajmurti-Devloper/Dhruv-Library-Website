import React, { useEffect, useRef, useState } from 'react';

const images = [
  '/img/1.jpeg',
  '/img/2.jpeg',
  '/img/3.jpeg',
  '/img/4.jpeg',
  '/img/outer.jpeg',
  '/img/trophy.jpg',
];

const GallerySlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef<number | null>(null);

  useEffect(() => {
    // autoplay every 4s
    const start = () => {
      stop();
      autoplayRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length);
      }, 4000) as unknown as number;
    };

    const stop = () => {
      if (autoplayRef.current) {
        window.clearInterval(autoplayRef.current as number);
        autoplayRef.current = null;
      }
    };

    start();
    const onVisibility = () => {
      if (document.hidden) stop(); else start();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  useEffect(() => {
    const el = itemRefs.current[index];
    const container = containerRef.current;
    if (el && container) {
      // Calculate horizontal center position for the element inside the scroll container
      const containerRect = container.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      // current scrollLeft plus difference between element left and container left
      const currentScroll = container.scrollLeft;
      const offset = (elRect.left - containerRect.left) + currentScroll;
      const target = Math.max(0, offset - (containerRect.width / 2) + (elRect.width / 2));
      try {
        container.scrollTo({ left: target, behavior: 'smooth' });
      } catch (e) {
        // fallback for older browsers
        container.scrollLeft = target;
      }
    }
  }, [index]);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <section id="home-gallery" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif font-bold">Dhruv Gallery</h2>
          <button
            onClick={() => { window.location.hash = 'gallery'; }}
            className="text-sm text-orange-600 hover:underline"
          >
            Show more →
          </button>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              ref={containerRef}
              className="flex gap-4 items-stretch scroll-smooth overflow-x-auto no-scrollbar px-2 py-2 snap-x snap-mandatory"
              role="list"
              aria-label="Dhruv gallery slider"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') next();
                if (e.key === 'ArrowLeft') prev();
              }}
            >
              {images.map((src, i) => (
                <div
                  key={src}
                  ref={(el) => { if (el) itemRefs.current[i] = el; }}
                  role="listitem"
                  onClick={() => { window.location.hash = 'gallery'; }}
                  className={`min-w-[100%] md:min-w-[760px] lg:min-w-[900px] snap-center rounded-xl overflow-hidden shadow-md bg-gray-100 transform transition ${index === i ? 'scale-105' : 'scale-100'} hover:cursor-pointer`}
                >
                  <img src={src} alt={`Gallery ${i + 1}`} className="w-full h-60 md:h-96 object-cover block" loading="lazy" />
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button
            aria-label="Previous"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-md hover:bg-white"
          >
            ›
          </button>

          {/* Dots */}
          <div className="mt-4 flex items-center justify-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full ${i === index ? 'bg-orange-600' : 'bg-slate-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySlider;
