import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Clock, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SendButton from './SendButton';
import AdvancedSelect from './AdvancedSelect';

const Contact: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [shift, setShift] = useState('Full Day (8:00 AM - 8:00 PM)');
  const [branch, setBranch] = useState('Rohta Road');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<null | boolean>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  // Determine enquiry endpoint:
  // - local dev: talk to local backend at http://localhost:4000/api/enquiry
  // - production on Netlify: use Netlify Function at /.netlify/functions/enquiry
  const ENQUIRY_ENDPOINT = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
    ? 'http://localhost:4000/api/enquiry'
    : '/.netlify/functions/enquiry';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    try {
      // Try sending via EmailJS first (client-side). Replace service/template/key below with yours.
      const SERVICE_ID = 'dhruv-2022';
  // Use the enquiry-specific EmailJS template ID (provided by you)
  const TEMPLATE_ID = 'template_9qsoqvp';
      const PUBLIC_KEY = 'ZRXOGX-AoqcmmWPeQ';

      const templateParams = {
        firstName,
        lastName,
        phone,
        shift,
        branch,
        // include a subject field so EmailJS template can use it for the email subject
        subject: `New seat enquiry: ${branch} - ${firstName} ${lastName}`,
      };

      try {
        // Send using the enquiry-specific EmailJS template
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        setSuccess(true);
        setFirstName(''); setLastName(''); setPhone(''); setShift('Full Day (8:00 AM - 8:00 PM)'); setBranch('Rohta Road');
      } catch (emailErr) {
        console.warn('EmailJS send failed for enquiry template, falling back to server API', emailErr);
        // fallback to server-side endpoint
        const res = await fetch(ENQUIRY_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, phone, shift, branch, duration: '' })
        });
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          console.error('Enquiry failed', json);
          setSuccess(false);
        } else {
          setSuccess(true);
          setFirstName(''); setLastName(''); setPhone(''); setShift('Full Day (8:00 AM - 8:00 PM)'); setBranch('Rohta Road');
        }
      }
    } catch (err) {
      console.error('Enquiry network error', err);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  // when success becomes true, show the fullscreen overlay briefly then clear success
  useEffect(() => {
    if (success === true) {
      setShowOverlay(true);
      const t = setTimeout(() => {
        setShowOverlay(false);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [success]);

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-serif font-bold mb-6">Start Your Journey Today</h2>
            <p className="text-slate-400 mb-10 text-lg">
              Seats are filling up fast. Reserve your spot at Dhruv Library and take the first step towards your success.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Visit Us</h4>
                  <p className="text-slate-400">5-Saraswati Vihar, Phase-1, Near Main Gate,<br/>Rohta Road, Meerut, Uttar Pradesh, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Call Us</h4>
                    <p className="text-slate-400">+91 94564 46015</p>
                    <p className="text-slate-400">+91 93588 06051</p>
                    <p className="text-slate-400">+91 94566 67124</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 mt-4">
                  <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Email</h4>
                    <a href="mailto:Dhruvlibrary2022@gmail.com" className="text-slate-400">Dhruvlibrary2022@gmail.com</a>
                  </div>
                </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center text-orange-500 shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">Opening Hours</h4>
                  <p className="text-slate-400">Monday - Sunday: 8:00 AM - 8:00 PM</p>
                  <p className="text-slate-500 text-sm italic mt-1">Closed on 2nd and Last Sunday of the month</p>
                </div>
              </div>
            </div>
          </div>

            <div className="bg-white rounded-2xl p-8 text-slate-900">
            <h3 className="text-2xl font-bold mb-6">Book A Seat Enquiry</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">First Name</label>
                  <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">Last Name</label>
                  <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Phone Number</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} required type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors" placeholder="+91 94564 46015" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Shift Timing</label>
                <AdvancedSelect
                  options={["Full Day (8:00 AM - 8:00 PM)", "Morning (8:00 AM - 2:00 PM)", "Evening (2:00 PM - 8:00 PM)"]}
                  value={shift}
                  onChange={(v) => setShift(v)}
                  placeholder="Choose shift"
                  searchable={false}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">Select Branch</label>
                <AdvancedSelect
                  options={["Rohta Road", "Kanker Khera"]}
                  value={branch}
                  onChange={(v) => setBranch(v)}
                  placeholder="Choose branch"
                  searchable={false}
                />
              </div>
              
              {/* replaced default button with animated SendButton component */}
                      <div className="mt-4">
                        <SendButton animate={loading} disabled={loading} type="submit" label={loading ? 'Sending…' : 'Send Enquiry'} />
                      </div>
              {success === true && <p className="text-sm text-center text-green-600 mt-4">Thank you — we will contact you within 24 hours.</p>}
              {success === false && <p className="text-sm text-center text-red-500 mt-4">Failed to send enquiry. Please try again or call us.</p>}
              <p className="text-xs text-center text-slate-500 mt-4">
                We will contact you within 24 hours to confirm availability.
              </p>
            </form>
          </div>
        </div>
      </div>
      {/* Fullscreen success overlay (appears briefly after successful send) */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="max-w-md w-full bg-white rounded-xl p-8 text-center shadow-xl">
            <div className="text-emerald-600 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-2">Submission received</h3>
            <p className="text-slate-600">Thanks — we will contact you within 24 hours to confirm availability.</p>
          </div>
        </div>
      )}
    </section>
  );
};

// (overlay handled inside component)

export default Contact;
