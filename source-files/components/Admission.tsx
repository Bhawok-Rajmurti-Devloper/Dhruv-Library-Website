import React, { useState } from 'react';
import styled from 'styled-components';
import AdvancedSelect from './AdvancedSelect';

const Admission: React.FC = () => {
  const [form, setForm] = useState({ name: '', fatherName: '', gender: 'Male', qualification: '', address: '', email: '', phone: '', course: 'Computer', startDate: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Try to dynamically import EmailJS so the app doesn't fail to compile if the package isn't installed.
      const emailjsModule = await import(/* webpackChunkName: "emailjs" */ '@emailjs/browser').catch(() => null as any);

      const templateParams = {
        name: form.name,
        fatherName: form.fatherName,
        gender: form.gender,
        qualification: form.qualification,
        address: form.address,
        from_name: form.name,
        email: form.email,
        from_email: form.email,
        phone: form.phone,
        course: form.course,
        start_date: form.startDate,
        message: form.message,
      };

      // Provided by you
  const SERVICE_ID = 'dhruv-2022';
  // use the admission-specific template provided by the user
  const TEMPLATE_ID = 'template_wyblu8h';
      const PUBLIC_KEY = 'ZRXOGX-AoqcmmWPeQ';

      if (emailjsModule && typeof emailjsModule.send === 'function') {
        // send with EmailJS
        await emailjsModule.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        // Scroll to top instantly
        window.scrollTo({ top: 0, behavior: 'auto' });
        // mark done on success
        setDone(true);
      } else {
        // EmailJS not available at runtime (package not installed) — fall back to simulated submission
        // Scroll to top instantly
        window.scrollTo({ top: 0, behavior: 'auto' });
        setDone(true);
      }
    } catch (err) {
      // If send failed, show an error and keep the form so user can retry
      console.error('Send error', err);
      alert('Submission failed. Please try again or contact us directly.');
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center py-24 bg-white">
        <div className="max-w-2xl w-full bg-emerald-50 border border-emerald-100 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-semibold text-emerald-800 mb-2">Application received</h2>
          <p className="text-slate-700">Thanks — we've received your admission request for the <strong>Computer</strong> course. Our team will contact you shortly.</p>
          <div className="mt-6 flex gap-4 justify-center">
            <a href="#home" className="px-4 py-2 bg-orange-600 text-white rounded-md">Back to home</a>
            <StyledApplyAgainButton>
              <button onClick={() => { setDone(false); setForm({ name: '', fatherName: '', gender: 'Male', qualification: '', address: '', email: '', phone: '', course: 'Computer', startDate: '', message: '' }); }}>Apply Again</button>
            </StyledApplyAgainButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl font-serif font-bold text-slate-900 mb-3">Admission — Computer Course</h1>
        <p className="text-slate-600 mb-6">Fill out this short form and our admissions team will reach out to help you get started.</p>

        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 bg-white border border-slate-100 p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Full name</label>
              <input name="name" value={form.name} onChange={onChange} required placeholder="Full name" className="px-4 py-3 border rounded-md w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Email address</label>
              <input name="email" type="email" value={form.email} onChange={onChange} required placeholder="Email address" className="px-4 py-3 border rounded-md w-full" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Father's name</label>
              <input name="fatherName" value={form.fatherName} onChange={onChange} placeholder="Father's name" className="px-4 py-3 border rounded-md w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Gender</label>
              <AdvancedSelect
                options={["Male", "Female", "Other"]}
                value={form.gender}
                onChange={(v) => setForm({ ...form, gender: v })}
                placeholder="Select gender"
                searchable={false}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Phone</label>
              <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone (optional)" className="px-4 py-3 border rounded-md w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Course</label>
              <AdvancedSelect
                options={["Computer", "Basics of Computer", "Advanced Digital Skills"]}
                value={form.course}
                onChange={(v) => setForm({ ...form, course: v })}
                placeholder="Choose course"
                searchable={false}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Qualification</label>
              <input name="qualification" value={form.qualification} onChange={onChange} placeholder="Qualification (e.g., 10th, 12th, Graduate)" className="px-4 py-3 border rounded-md w-full" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Address</label>
            <textarea name="address" value={form.address} onChange={onChange} placeholder="Full postal address" rows={3} className="mt-1 px-4 py-3 border rounded-md w-full" />
          </div>

          <div>
            <label className="text-sm text-slate-600">Preferred start date (optional)</label>
            <input name="startDate" type="date" value={form.startDate} onChange={onChange} className="mt-1 px-4 py-3 border rounded-md w-full" />
          </div>

          <div>
            <textarea name="message" value={form.message} onChange={onChange} placeholder="Anything you'd like us to know" rows={4} className="px-4 py-3 border rounded-md w-full" />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600">We will contact you to confirm your admission.</div>
            <StyledButtonWrapper>
              <button type="submit" disabled={submitting}>
                {submitting ? 'Submitting...' : 'Apply Now'}
              </button>
            </StyledButtonWrapper>
          </div>
        </form>
      </div>
    </div>
  );
};

const StyledButtonWrapper = styled.div`
  button {
    --color: #ea580c;
    font-family: inherit;
    display: inline-block;
    width: 8em;
    height: 2.6em;
    line-height: 2.5em;
    margin: 0;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color 0.5s;
    z-index: 1;
    font-size: 16px;
    border-radius: 6px;
    font-weight: 600;
    color: var(--color);
    padding: 0;
  }

  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }

  button:hover {
    color: #fff;
  }

  button:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  button:hover:before {
    top: -30px;
    left: -30px;
  }

  button:active:before {
    background: #c73f0e;
    transition: background 0s;
  }

  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const StyledApplyAgainButton = styled.div`
  button {
    --color: #2563eb;
    font-family: inherit;
    display: inline-block;
    width: 8em;
    height: 2.6em;
    line-height: 2.5em;
    margin: 0;
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border: 2px solid var(--color);
    transition: color 0.5s;
    z-index: 1;
    font-size: 16px;
    border-radius: 6px;
    font-weight: 600;
    color: var(--color);
    padding: 0;
  }

  button:before {
    content: "";
    position: absolute;
    z-index: -1;
    background: var(--color);
    height: 150px;
    width: 200px;
    border-radius: 50%;
  }

  button:hover {
    color: #fff;
  }

  button:before {
    top: 100%;
    left: 100%;
    transition: all 0.7s;
  }

  button:hover:before {
    top: -30px;
    left: -30px;
  }

  button:active:before {
    background: #1d4ed8;
    transition: background 0s;
  }
`;

export default Admission;
