import React from 'react';
import './AdvancedCTA.css';
import { Mail, Phone, MessageSquare, Plus } from 'lucide-react';

interface Props {
  whatsapp?: string;
  mail?: string;
  phone?: string;
  visible?: boolean;
  whatsappMessage?: string;
  mailSubject?: string;
  mailBody?: string;
}

const AdvancedCTA: React.FC<Props> = ({
  whatsapp = '919999999999',
  mail = 'hello@example.com',
  phone = '919999999999',
  visible = true,
  whatsappMessage = "Hi, I'm interested in Dhruv Library. Could you share more details?",
  mailSubject = 'Enquiry from website',
  mailBody = `Hello,

I’m interested in Dhruv Library and would like more information about membership and timings.

Thanks,
[Your Name]`
}) => {
  if (!visible) return null;

  const handleMailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const subject = encodeURIComponent(mailSubject);
    const body = encodeURIComponent(mailBody);
    const mailtoHref = `mailto:${mail}?subject=${subject}&body=${body}`;
    const gmailHref = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      mail
    )}&su=${subject}&body=${body}`;

    let becameHidden = false;
    const onVisibility = () => {
      if (document.hidden) becameHidden = true;
    };
    document.addEventListener('visibilitychange', onVisibility);

    // Try opening the mailto. If the browser/OS handles it and the page is hidden/unloaded,
    // the timeout won't run. If not handled, fallback to Gmail compose after 900ms.
    try {
      window.location.href = mailtoHref;
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      document.removeEventListener('visibilitychange', onVisibility);
      if (!becameHidden) {
        // open Gmail compose as a fallback
        try {
          window.open(gmailHref, '_blank');
        } catch (err) {
          // ignore
        }
      }
    }, 900);
  };

  return (
    <div className="advanced-cta" role="navigation" aria-label="Call to actions">
      <div className="cta-shell" tabIndex={-1}>
        <button className="cta-trigger" aria-label="Call" title="Call">
          <Phone />
        </button>

  {/* invisible buffer keeps hover state when moving between trigger and buttons */}
  <div className="cta-buffer" aria-hidden="true" />

  <div className="cta-group" aria-hidden={false}>
          <a className="cta-button cta-contact" href={`tel:${phone}`} aria-label={`Call ${phone}`}>
            <span className="cta-icon"><Phone /></span>
            <span className="cta-text">Contact</span>
            <span className="cta-effect" aria-hidden />
            <span className="cta-tooltip" role="status">{phone}</span>
          </a>

          <a
            className="cta-button cta-whatsapp"
            href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
          >
            <span className="cta-icon" aria-hidden>
              {/* inline WhatsApp logo SVG (white fill) */}
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden>
                <path fillRule="evenodd" clipRule="evenodd" fill="#fff" d="M20.52 3.48A11.81 11.81 0 0 0 12.01.5 11.8 11.8 0 0 0 1.5 11.99c0 2.09.54 4.15 1.57 5.96L.5 23.5l6.09-2.08A11.8 11.8 0 0 0 12.01 23c6.52 0 11.8-5.28 11.8-11.8 0-3.15-1.23-6.11-3.29-8.22zM12 21.5a9.49 9.49 0 0 1-4.86-1.36l-.35-.22-3.61 1.23 1.25-3.52-.23-.36A9.47 9.47 0 1 1 21.5 11.99 9.47 9.47 0 0 1 12 21.5zm5.16-7.15c-.28-.14-1.65-.79-1.9-.88-.25-.09-.43-.14-.61.14-.18.28-.7.88-.86 1.06-.16.18-.32.21-.6.07-.28-.14-1.18-.43-2.24-1.38-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.43.12-.57.12-.12.28-.31.42-.47.14-.16.19-.28.28-.46.09-.18.04-.34-.02-.48-.06-.14-.61-1.48-.84-2.05-.22-.53-.45-.46-.62-.47-.16-.01-.35-.01-.54-.01-.18 0-.48.07-.73.35-.25.28-.96.95-.96 2.32s.98 2.69 1.12 2.88c.14.18 1.93 2.98 4.67 4.19 1.41.61 2.1.82 2.83.84.73.02 1.69-.29 1.93-1.14.24-.84.24-1.56.17-1.71-.07-.14-.25-.23-.53-.37z" />
              </svg>
            </span>
            <span className="cta-text">WhatsApp</span>
            <span className="cta-effect" aria-hidden />
            <span className="cta-tooltip" role="status">{phone}</span>
          </a>

          <a
            className="cta-button cta-mail"
            href={`mailto:${mail}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`}
            onClick={handleMailClick}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Email ${mail}`}
          >
            <span className="cta-icon"><Mail /></span>
            <span className="cta-text">Mail</span>
            <span className="cta-effect" aria-hidden />
            <span className="cta-tooltip" role="status">{mail}</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdvancedCTA;
