import React from 'react';
import './AdvancedCTA.css';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const AdvancedCTA: React.FC = () => {
  const whatsappNumber = '919999999999'; // TODO: replace with real number (country code incl.)
  const mailTo = 'hello@example.com'; // TODO: replace with real email

  return (
    <div className="advanced-cta pointer-events-auto" role="navigation" aria-label="Call to actions">
      <a className="cta-button cta-contact" href="#contact" aria-label="Contact">
        <span className="cta-icon"><Phone /></span>
        <span className="cta-text">Contact</span>
        <span className="cta-effect" aria-hidden />
      </a>

      <a
        className="cta-button cta-whatsapp"
        href={`https://wa.me/${whatsappNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <span className="cta-icon"><MessageSquare /></span>
        <span className="cta-text">WhatsApp</span>
        <span className="cta-effect" aria-hidden />
      </a>

      <a className="cta-button cta-mail" href={`mailto:${mailTo}`} aria-label="Mail">
        <span className="cta-icon"><Mail /></span>
        <span className="cta-text">Mail</span>
        <span className="cta-effect" aria-hidden />
      </a>
    </div>
  );
};

export default AdvancedCTA;
