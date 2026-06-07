import React, { useState, useRef, useEffect } from 'react';
import './card-amenity.css';
import { Wind, Wifi, Armchair, Newspaper, Camera, VolumeX, Droplets, Car, Zap } from 'lucide-react';

type Facility = {
  id: string;
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  category: 'Comfort' | 'Security' | 'Services' | 'Power';
  img?: string;
};

const Facilities: React.FC = () => {
  const facilities: Facility[] = [
  { id: 'ac', icon: Wind, title: 'Fully Air-Conditioned', desc: 'Centralized cooling system maintaining an optimal temperature for focused study.', category: 'Comfort', img: '/img/ac.png' },
    { id: 'wifi', icon: Wifi, title: 'High-Speed WiFi', desc: 'Reliable fiber optic connectivity for seamless research and online lectures.', category: 'Services' ,img: '/img/wifi.png' },
    { id: 'seating', icon: Armchair, title: 'Individual Seating', desc: 'Private, spacious cubicles with ergonomic chairs and dedicated charging points.', category: 'Comfort' },
    { id: 'news', icon: Newspaper, title: 'Newspapers & Magazines', desc: 'Daily access to national dailies and monthly current affairs magazines.', category: 'Services' , img: '/img/news.png' },
    { id: 'cctv', icon: Camera, title: 'CCTV Surveillance', desc: '24/7 security monitoring throughout the premises ensuring a safe environment.', category: 'Security', img: '/img/office.png' },
  { id: 'silence', icon: VolumeX, title: 'Noise-Free Zone', desc: 'Strict silence policy and acoustic treatments to ensure deep concentration.', category: 'Comfort', img: '/img/nosound.png' },
    { id: 'water', icon: Droplets, title: 'RO Drinking Water', desc: 'Access to fresh, hygienic, and chilled drinking water at all times.', category: 'Services',img: '/img/water.jpg' },
    { id: 'parking', icon: Car, title: 'Parking Available', desc: 'Secure and sufficient parking space for bicycles and two-wheelers.', category: 'Services', img: '/img/parking.jpg' },
    { id: 'backup', icon: Zap, title: 'Power Backup', desc: 'Uninterrupted power supply to ensure your study momentum never breaks.', category: 'Power', img: '/img/power.jpeg' },
  ];

  const categories = ['All', 'Comfort', 'Services', 'Security', 'Power'] as const;
  const [active, setActive] = useState<typeof categories[number]>('All');
  const [selected, setSelected] = useState<Facility | null>(null);
  const expandedRef = useRef<HTMLDivElement | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const [happyCount, setHappyCount] = useState<number>(0);
  const [seatsCount, setSeatsCount] = useState<number>(0);
  const [satisfactionCount, setSatisfactionCount] = useState<number>(0);
  const [successCount, setSuccessCount] = useState<number>(0);
  const animatedRef = useRef(false);
  const cancelFnsRef = useRef<Array<() => void>>([]);

  const visible = active === 'All' ? facilities : facilities.filter(f => f.category === active);

  useEffect(() => {
    // when selection changes and we're on facilities, scroll to the expanded panel smoothly
    const current = window.location.hash.replace('#', '') || 'home';
    if (selected && current === 'facilities') {
      // small timeout to allow layout to update before showing + scrolling
      setPanelVisible(false);
      setTimeout(() => {
        setPanelVisible(true);
        expandedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    }
    if (!selected) setPanelVisible(false);
  }, [selected]);

  useEffect(() => {
    // animate numbers when stats area scrolls into view
    const el = statsRef.current;
    if (!el) return;

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateValue = (setter: (v: number) => void, from: number, to: number, duration: number, delay = 0) => {
      let raf = 0;
      let start: number | null = null;
      const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const elapsed = timestamp - start - delay;
        if (elapsed < 0) {
          raf = requestAnimationFrame(step);
          return;
        }
        const t = Math.min(1, elapsed / duration);
        const v = Math.round(from + (to - from) * easeOutCubic(t));
        setter(v);
        if (t < 1) {
          raf = requestAnimationFrame(step);
        }
      };
      raf = requestAnimationFrame(step);
      const cancel = () => cancelAnimationFrame(raf);
      cancelFnsRef.current.push(cancel);
      return cancel;
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          // clear any previous cancel functions
          cancelFnsRef.current.forEach(fn => fn());
          cancelFnsRef.current = [];
          // stagger animations slightly
          animateValue(setHappyCount, 0, 800, 1400, 0);
          animateValue(setSeatsCount, 0, 112, 1200, 100);
          animateValue(setSatisfactionCount, 0, 99, 1200, 180);
          animateValue(setSuccessCount, 0, 85, 1200, 260);
        }

        if (!entry.isIntersecting && animatedRef.current) {
          // section left view -> reset counters and allow re-animation
          cancelFnsRef.current.forEach(fn => fn());
          cancelFnsRef.current = [];
          setHappyCount(0);
          setSeatsCount(0);
          setSatisfactionCount(0);
          setSuccessCount(0);
          animatedRef.current = false;
        }
      });
    }, { threshold: 0.4 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="facilities" className="py-24 bg-orange-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">World-Class Amenities</h2>
          <p className="text-slate-600 text-lg">Everything you need to stay productive and comfortable during your study hours.</p>
          <p className="text-sm text-orange-600 font-semibold tracking-wider uppercase mb-2">Facilities</p>
          <p className="mt-4 text-slate-600">
            We provide well-maintained study spaces, reliable high-speed connectivity, clean and safe amenities, and helpful staff — all designed to create a distraction-free environment where learners can focus, build discipline, and achieve their goals.
          </p>
        </div>

        {/* Quick stats */}
        <div ref={statsRef} className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{happyCount}{happyCount > 0 ? '+' : ''}</div>
            <div className="text-sm text-slate-600">Happy Students</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{seatsCount}</div>
            <div className="text-sm text-slate-600">Comfortable Seats</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{satisfactionCount}%</div>
            <div className="text-sm text-slate-600">Satisfaction Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{successCount}%</div>
            <div className="text-sm text-slate-600">Success Rate</div>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${active === cat ? 'bg-orange-600 text-white' : 'bg-white text-slate-700 border border-slate-100'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        { /* Facilities grid / expanded panel */ }
        {(window.location.hash.replace('#', '') || 'home') === 'facilities' && selected ? (
          <div>
            <div
              ref={expandedRef}
              className={`bg-white rounded-2xl shadow-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-6 transform transition-all duration-400 ease-out ${panelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              aria-hidden={!panelVisible}
            >
              <div className="md:col-span-1">
                {selected.img ? (
                  <img src={selected.img} alt={selected.title} loading="lazy" className="w-full h-64 object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-64 bg-slate-100 rounded-lg flex items-center justify-center text-orange-600"><selected.icon size={48} /></div>
                )}
              </div>
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold text-slate-900">{selected.title}</h3>
                <p className="mt-4 text-slate-700 leading-relaxed line-clamp-5">{selected.desc}</p>
                <div className="mt-6 flex items-center gap-3">
                  <button onClick={() => { window.location.hash = '#contact'; setSelected(null); }} className="px-4 py-2 bg-orange-600 text-white rounded-md">Reserve / Enquire</button>
                  <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded-md">Close</button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visible.filter(f => f.id !== selected.id).map((facility) => (
                <div
                  key={facility.id}
                  tabIndex={0}
                  role="button"
                  onClick={() => setSelected(facility)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setSelected(facility); }}
                  className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-orange-200 transition-all hover:-translate-y-1 group card-tilt cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-200"
                  aria-label={`Open details for ${facility.title}`}>
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <facility.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{facility.title}</h3>
                  <p className="text-slate-600 leading-relaxed line-clamp-3">{facility.desc}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <button
                      className="text-sm text-orange-600 font-semibold"
                      onClick={(e) => { e.stopPropagation(); setSelected(facility); }}
                    >
                      Learn more →
                    </button>
                    <img
                      src="/img/LOGO.png"
                      alt="Dhruv Library Logo"
                      className="card-logo-amenity ml-3 w-8 h-8 object-contain transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((facility) => (
              <div
                key={facility.id}
                tabIndex={0}
                role="button"
                onClick={() => {
                  const current = window.location.hash.replace('#', '') || 'home';
                  // if we're not on the dedicated facilities route, navigate there
                  if (current !== 'facilities') {
                    window.location.hash = '#facilities';
                    return;
                  }
                  // otherwise open the details modal
                  setSelected(facility);
                }}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {
                  const current = window.location.hash.replace('#', '') || 'home';
                  if (current !== 'facilities') { window.location.hash = '#facilities'; return; }
                  setSelected(facility);
                } }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-2xl hover:border-orange-400 transition-all hover:-translate-y-2 group card-tilt cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-200 card-amenity"
                aria-label={`Open details for ${facility.title}`}>
                <div className="w-full h-32 rounded-xl overflow-hidden mb-6 bg-orange-50 flex items-center justify-center card-img-amenity">
                  {facility.img ? (
                    <img
                      src={facility.img}
                      alt={facility.title}
                      loading="lazy"
                      className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${['Noise-Free Zone', 'Parking Available'].includes(facility.title) ? 'object-contain' : 'object-cover'}`}
                    />
                  ) : (
                    <facility.icon size={40} className="text-orange-600 group-hover:text-white transition-colors" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{facility.title}</h3>
                <p className="text-slate-600 leading-relaxed line-clamp-3">{facility.desc}</p>
                <div className="mt-4">
                  <button
                    className="text-sm text-orange-600 font-semibold"
                    onClick={(e) => {
                      e.stopPropagation();
                      const current = window.location.hash.replace('#', '') || 'home';
                      if (current !== 'facilities') { window.location.hash = '#facilities'; return; }
                      setSelected(facility);
                    }}
                  >
                    Learn more →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for details */}
        {selected && ((window.location.hash.replace('#', '') || 'home') !== 'facilities') && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSelected(null)} />
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 p-6">
              <div className="flex items-start justify-between">
                <h4 className="text-xl font-bold">{selected.title}</h4>
                <button onClick={() => setSelected(null)} className="text-slate-500 hover:text-slate-700">✕</button>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1">
                  {selected.img ? <img src={selected.img} alt={selected.title} loading="lazy" className="w-full h-40 object-cover rounded-lg" /> : (
                    <div className="w-full h-40 bg-slate-100 rounded-lg flex items-center justify-center text-orange-600"><selected.icon size={36} /></div>
                  )}
                </div>
                <div className="md:col-span-2">
                  <p className="text-slate-700 leading-relaxed">{selected.desc}</p>
                  <div className="mt-4 flex items-center gap-3">
                    <button onClick={() => { window.location.hash = '#contact'; setSelected(null); }} className="px-4 py-2 bg-orange-600 text-white rounded-md">Reserve / Enquire</button>
                    <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded-md">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Facilities;
