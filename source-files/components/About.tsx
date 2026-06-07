import React, { useState, useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import BookVisitButton from './BookVisitButton';
// ReviewsTicker animation removed — reviews will be rendered as a static full-width card below

type AboutProps = {
  full?: boolean;
};

const About: React.FC<AboutProps> = ({ full = true }) => {
  const [ownerVisible, setOwnerVisible] = useState(false);
  const [visionVisible, setVisionVisible] = useState(false);
  const visionRef = React.useRef<HTMLDivElement | null>(null);
  const parallaxImgRef = React.useRef<HTMLImageElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [meetingForm, setMeetingForm] = useState({ name: '', email: '', date: '', time: '', message: '' });

  useEffect(() => {
    const t = setTimeout(() => setOwnerVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Load Elfsight platform script once to render the Google Reviews widget
  useEffect(() => {
    const src = 'https://elfsightcdn.com/platform.js';
    if (!document.querySelector(`script[src="${src}"]`)) {
      const s = document.createElement('script');
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  // (reviews are no longer fetched here — an external Elfsight widget will render reviews)

  // Intersection observer to trigger vision section fade-in
  useEffect(() => {
    if (!visionRef.current) return;
    const el = visionRef.current;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setVisionVisible(true);
        }
      });
    }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Parallax effect for the vision background image on scroll (desktop only)
  useEffect(() => {
    const handleScroll = () => {
      if (!visionRef.current || !parallaxImgRef.current) return;
      if (window.innerWidth < 768) return; // disable on small screens
      const rect = visionRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      // calculate progress of element within viewport
      const progress = Math.min(Math.max((windowH - rect.top) / (windowH + rect.height), 0), 1);
      const translate = (progress - 0.5) * 20; // -10 to 10px subtle
      parallaxImgRef.current.style.transform = `translate3d(0, ${translate}px, 0) scale(1.03)`;
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const openModal = () => {
    setMeetingForm({ name: '', email: '', date: '', time: '', message: '' });
    setShowModal(true);
    setSubmitted(false);
  };

  const closeModal = () => setShowModal(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMeetingForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form to your backend or email service.
    console.log('Meeting request', meetingForm);
    setSubmitted(true);
    // close modal after short delay
    setTimeout(() => {
      setShowModal(false);
    }, 900);
  };

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-orange-100 rounded-[2.5rem] transform rotate-2 transition-transform group-hover:rotate-1"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <img
                src="/img/1.jpeg"
                alt="Dhruv Library Interior"
                loading="lazy"
                className="w-full h-[500px] object-cover object-center md:object-left"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1000&auto=format&fit=crop";
                }}
              />
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-lg border border-white">
                <p className="text-orange-600 font-bold text-lg">Since 2022</p>
                <p className="text-slate-600 text-sm">Empowering Students</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-serif font-bold text-slate-900">
              More Than Just A <br /><span className="text-orange-600">Reading Room</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              At Dhruv Library, we believe that your environment dictates your growth. That's why we've meticulously designed a space that blends comfort with discipline.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                "Peaceful Ambience",
                "Personal Lockers",
                "CCTV Surveillance",
                "Daily Newspapers",
                "Mineral Water",
                "Open 7 Days"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle className="text-orange-500 w-5 h-5 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-orange-600 font-bold text-xl">
                  4.9
                </div>
                <div>
                  <div className="flex text-orange-500 mb-1">★★★★★</div>
                  <p className="text-sm text-slate-600 font-medium">Rated by 500+ Students in Meerut</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  {/* Reviews ticker ribbon (news-headline style) */}
  {/* Rating + Reviews - placed close together */}
  <div className="w-full bg-white py-6">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Elfsight Google Reviews widget (replaces rating + reviews cards) */}
      <div className="w-full py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-slate-100 shadow-md p-4 w-full">
            {/* Load Elfsight platform script and render the widget container */}
            <div id="elfsight-reviews-root">
              <div className="elfsight-app-8c3a751c-447c-45ab-bf8d-2df3b58a9881" data-elfsight-app-lazy></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
      {/* Owner / Founder section (inserted above the dynamic sections) */}
      {full && (
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-all duration-700 ${ownerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:flex md:items-center md:gap-6">
            <div className="md:w-1/3 flex items-center justify-center">
              <div className="flex items-center justify-center">
                <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg border-4 border-orange-500 ring-4 ring-orange-50">
                  <img
                    src="/img/owner.jpeg"
                    alt="Owner - Dhruv"
                    loading="lazy"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => { e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1200&auto=format&fit=crop'; }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0 md:w-2/3">
              <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">Dhruv Library — Founder & Visionary</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                Mr.T.P Singh ji founded this learning space in 2022 with a simple belief: the right environment accelerates learning. A former competitive student and lifelong reader, he designed the library to blend discipline with comfort — friendly staff, a focused ambience, and modern facilities to support students across all grades.
              </p>
              <p className="mt-3 text-slate-600">He is available to help with memberships and community initiatives — you can book a meeting with him:</p>
              <div className="mt-3 flex items-center gap-3">
                <BookVisitButton onClick={() => { window.location.hash = '#contact'; }} className="text-orange-600 font-semibold">Book a meeting</BookVisitButton>
                <span className="text-sm text-slate-400">•</span>
                <span className="text-sm text-slate-500">Owner since 2022</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dhruv Computer Center Section */}
      {full && (
        <section className="relative w-full overflow-hidden py-20 px-2 md:px-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-orange-50 to-pink-100 animate-gradient-move z-0" style={{ filter: 'blur(2px)', opacity: 0.7 }} />
          <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 z-10">
            {/* Animated left image - larger */}
            <div className="flex-1 flex items-center justify-center">
                <img
                  src="/img/dhruv-computer-logo.png"
                  alt="Dhruv Computer Center Logo"
                  className="w-80 h-80 md:w-[420px] md:h-[420px] object-contain rounded-3xl shadow-2xl animate-float bg-white border border-slate-200"
                  loading="lazy"
                />
            </div>
            {/* Heading and description on the left */}
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4 animate-fade-in-up">Dhruv Computer Center</h2>
              <p className="text-lg text-slate-700 mb-6 animate-fade-in-up delay-100">
                Dhruv Computer Center offers a range of practical, career-boosting computer courses for all ages. Our expert instructors and hands-on approach ensure you gain real skills for today’s digital world.
              </p>
              <div className="flex gap-4 mt-6">
                <a href="/dhruv-computer-center-verification/#admission" className="px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg font-semibold text-lg hover:bg-blue-700 transition animate-bounce-in">Enquire Now</a>
              </div>
            </div>
          </div>
          {/* Course cards below */}
          <div className="relative max-w-5xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 z-10">
            {/* Each course as a card */}
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 flex flex-col items-start animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <span className="text-3xl mb-3">💻</span>
              <h3 className="font-bold text-lg mb-2">Basics of Computer</h3>
              <p className="text-slate-600 text-base mb-2">Learn the fundamentals of computers, including Windows, MS Office (Word, Excel, PowerPoint), internet basics, email, file management, and safe browsing. Perfect for beginners and seniors.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 flex flex-col items-start animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <span className="text-3xl mb-3">⌨️</span>
              <h3 className="font-bold text-lg mb-2">Typing (English & Hindi)</h3>
              <p className="text-slate-600 text-base mb-2">Master touch typing in both English and Hindi. Includes speed-building exercises, accuracy improvement, and practice with government exam patterns. Hindi typing covers Krutidev and Mangal fonts.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 flex flex-col items-start animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <span className="text-3xl mb-3">🎨</span>
              <h3 className="font-bold text-lg mb-2">Canva Graphics Design</h3>
              <p className="text-slate-600 text-base mb-2">Get creative with Canva! Learn to design posters, social media graphics, certificates, invitations, and more. Covers templates, branding, and exporting for print or web.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 flex flex-col items-start animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <span className="text-3xl mb-3">🖥️</span>
              <h3 className="font-bold text-lg mb-2">Basics of Hardware</h3>
              <p className="text-slate-600 text-base mb-2">Understand the essential parts of a computer, assembling/disassembling, troubleshooting common issues, and basic maintenance. Great for anyone curious about how computers work inside.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-xl border border-orange-100 p-6 flex flex-col items-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <span className="text-3xl mb-3">📜</span>
              <h3 className="font-bold text-lg mb-2">CCC Course</h3>
              <p className="text-slate-600 text-base mb-2">Prepare for the NIELIT CCC (Course on Computer Concepts) exam. Covers the full syllabus: computer basics, internet, email, digital payments, and online services. Includes mock tests and certification guidance.</p>
            </div>
          </div>
          {/* Animations */}
          <style>{`
            @keyframes gradient-move {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient-move {
              background-size: 200% 200%;
              animation: gradient-move 8s ease-in-out infinite;
            }
            @keyframes float {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-18px) scale(1.04); }
            }
            .animate-float { animation: float 3.5s ease-in-out infinite; }
            @keyframes fade-in-up {
              0% { opacity: 0; transform: translateY(32px); }
              100% { opacity: 1; transform: translateY(0); }
            }
            .animate-fade-in-up { animation: fade-in-up 1s cubic-bezier(.4,2,.3,1) both; }
            .animate-fade-in-up.delay-100 { animation-delay: 0.1s; }
            .animate-fade-in-up.delay-150 { animation-delay: 0.15s; }
            @keyframes bounce-in {
              0% { opacity: 0; transform: scale(0.8); }
              60% { opacity: 1; transform: scale(1.08); }
              100% { opacity: 1; transform: scale(1); }
            }
            .animate-bounce-in { animation: bounce-in 0.7s cubic-bezier(.4,2,.3,1) both; }
            .animate-bounce-in.delay-150 { animation-delay: 0.15s; }
          `}</style>
        </section>
      )}
      {/* Our Vision - full width background section with eye.jpg */}
      {full && (
        <section aria-label="Our vision" className="relative w-full overflow-hidden">
          {/* Background picture with responsive sources */}
          <div ref={visionRef} className={`relative w-full transition-all duration-700 ${visionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="absolute inset-0 -z-10">
              <picture className="block w-full h-full">
                <source media="(min-width: 1024px)" srcSet="/img/eye.jpg" />
                <source media="(min-width: 640px)" srcSet="/img/eye.jpg" />
                {/* smaller/cropped image for small screens */}
                <img ref={parallaxImgRef} src="/img/inner.jpeg" alt="Decorative background" className="w-full h-full object-cover min-h-[320px]" style={{ willChange: 'transform' }} />
              </picture>
              {/* overlay */}
              <div className="absolute inset-0 bg-black/60" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
              <div className="bg-transparent text-white max-w-3xl">
                <h3 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Vision</h3>
                <p className="text-lg leading-relaxed mb-4">
                  Our vision is to create a trusted and inspiring self-learning environment where students, professionals, and lifelong learners can study with full concentration and confidence. We aim to support individuals who believe in the power of self-discipline, consistency, and independent learning.
                </p>
                <p className="text-lg leading-relaxed">
                  We envision our library as more than just a study space—it should be a place where focus replaces distraction, habits turn into discipline, and dreams transform into achievements. By maintaining a peaceful atmosphere, modern facilities, and a learner-friendly culture, we strive to help every individual unlock their true potential and move closer to their academic and career goals.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
  {/* Dynamic alternating sections (skewed ribbon headings, overlapping images, CTAs) */}
      {full && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {[
            { title: 'Peaceful Environment', desc: 'A calm, well-ventilated study area with comfortable seating and minimal distractions—ideal for deep work and revision.', img: '/img/1.jpeg', alt: 'Library environment' },
            { title: 'Roadside View', desc: 'Easily accessible from the main road with clear signage and safe drop-off points — convenient for students and visitors.', img: '/img/outer.jpeg', alt: 'Roadside view' },
            { title: 'Office & Staff', desc: 'Our friendly staff are available to help with membership, bookings, and any inquiries—ensuring a smooth experience.', img: '/img/office.png', alt: 'Office and staff' }
          ].map((s, idx) => {
            const isRoad = s.title === 'Roadside View';
            return (
              <section key={s.title} className={`group relative grid grid-cols-1 md:flex md:items-center md:gap-8 md:py-6`}>
                {/* TEXT BLOCK */}
                <div className={`${idx % 2 === 1 ? 'md:order-2 md:pl-8' : 'md:order-1 md:pr-8'} md:w-1/2`}>
                  <div className="relative inline-block">
                    {/* skewed ribbon background */}
                    <div className="absolute -left-6 -top-3 w-48 h-12 bg-gradient-to-r from-orange-200 to-orange-100 rounded-xl transform -skew-x-6 shadow-sm -z-10"></div>
                    <h3 className="text-3xl font-bold text-slate-900 transform skew-x-6 -ml-2">{s.title}</h3>
                  </div>
                  <p className="mt-4 text-slate-600 leading-relaxed">{s.desc}</p>

                  <div className="mt-6 flex items-center gap-3">
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-full shadow hover:scale-105 transition">Learn more</button>
                    <BookVisitButton onClick={() => { window.location.hash = '#contact'; }}>Book visit</BookVisitButton>
                  </div>

                  {/* extra headings / quick info for Office & Staff */}
                  {s.title === 'Office & Staff' && (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        'Membership Support',
                        'Booking Desk',
                        'Study Material Assistance',
                        'Feedback & Help'
                      ].map((h) => (
                        <div key={h} className="flex items-center gap-2 text-sm text-slate-700">
                          <CheckCircle className="text-orange-500 w-4 h-4 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* IMAGE BLOCK */}
                <div className={`${idx % 2 === 1 ? 'md:order-1 md:pr-8' : 'md:order-2 md:pl-8'} md:w-1/2 mt-6 md:mt-0`}>
                  <div className="relative overflow-visible md:-translate-y-4">
                    <div className={`relative group-hover:scale-105 transform transition duration-500 shadow-2xl rounded-3xl overflow-hidden ${isRoad ? 'flex items-center justify-center bg-slate-50 p-6' : ''}`}>
                      <img
                        src={s.img}
                        alt={s.alt}
                        loading="lazy"
                        className={`w-full ${isRoad ? 'h-auto max-h-96 object-contain' : 'h-72 md:h-80 object-cover'} transform transition duration-500 ${isRoad ? '' : 'group-hover:scale-110'}`}
                        onError={(e) => { if (s.img === '/img/roadside.jpg' || s.img === '/img/outer.jpeg') e.currentTarget.src = 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1200&auto=format&fit=crop'; }}
                      />
                    </div>
                    {/* decorative floating badge */}
                    <div className="absolute -top-4 right-4 bg-white/90 border border-slate-100 rounded-full px-3 py-1 text-xs font-semibold shadow">Meerut Pick</div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
      {/* Booking modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 transform transition-all">
            <div className="flex items-start justify-between">
              <h4 className="text-lg font-semibold">Book a meeting with Dhruv</h4>
              <button onClick={closeModal} className="text-slate-500 hover:text-slate-700">✕</button>
            </div>

            {!submitted ? (
              <form onSubmit={handleFormSubmit} className="mt-4 space-y-3">
                <div>
                  <label className="text-sm text-slate-600">Name</label>
                  <input name="name" value={meetingForm.name} onChange={handleFormChange} required className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>
                <div>
                  <label className="text-sm text-slate-600">Email</label>
                  <input type="email" name="email" value={meetingForm.email} onChange={handleFormChange} required className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-slate-600">Date</label>
                    <input type="date" name="date" value={meetingForm.date} onChange={handleFormChange} required className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="text-sm text-slate-600">Time</label>
                    <input type="time" name="time" value={meetingForm.time} onChange={handleFormChange} required className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2" />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-slate-600">Message (optional)</label>
                  <textarea name="message" value={meetingForm.message} onChange={handleFormChange} rows={3} className="mt-1 w-full border border-slate-200 rounded-md px-3 py-2" />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button type="button" onClick={closeModal} className="px-4 py-2 rounded-md border border-slate-200 text-slate-700">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-md bg-orange-600 text-white shadow">Send request</button>
                </div>
              </form>
            ) : (
              <div className="mt-6 py-6 text-center">
                <p className="text-green-600 font-semibold">Request sent!</p>
                <p className="text-slate-600 mt-2">Dhruv will get back to you soon. This window will close automatically.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
