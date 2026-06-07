import React, { useEffect, useState } from 'react';
import './RateUsOverlay.css';

const GOOGLE_MAPS_REVIEW_URL = 'https://www.google.com/maps/place/DHRUV+LIBRARY+%26+COMPUTERS/@28.9844169,77.6711733,17z/data=!4m14!1m7!3m6!1s0x390c65e2dffc30b7:0xc8784b55996a7f4f!2sDHRUV+LIBRARY+%26+COMPUTERS!8m2!3d28.9844169!4d77.6711733!16s%2Fg%2F11k9mzdlwd!3m5!1s0x390c65e2dffc30b7:0xc8784b55996a7f4f!8m2!3d28.9844169!4d77.6711733!16s%2Fg%2F11k9mzdlwd?entry=ttu&g_ep=EgoyMDI2MDQwNS4wIKXMDSoASAFQAw%3D%3D'; // Replace with your actual Google Maps review link

const RateUsOverlay: React.FC = () => {
  const [show, setShow] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    // Only show if not already shown in this browser
    const alreadyShown = localStorage.getItem('dhruv-rateus-shown');
    if (!alreadyShown) {
      const timer = setTimeout(() => {
        setShow(true);
        localStorage.setItem('dhruv-rateus-shown', 'yes');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => setShow(false);

  const handleStarClick = (index: number) => {
    setSelected(index);
    window.open(GOOGLE_MAPS_REVIEW_URL, '_blank');
  };

  if (!show) return null;

  return (
    <div className="rateus-overlay advanced-bg">
      <div className="rateus-bg-anim" aria-hidden="true"></div>
      <div className="rateus-circle">
        <button className="rateus-close" onClick={handleClose} aria-label="Close overlay">×</button>
        <h2>Rate us</h2>
        <div className="rateus-stars">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`star${(hovered || selected) && star <= (hovered ?? selected!) ? ' filled' : ''}`}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleStarClick(star)}
              role="button"
              tabIndex={0}
              aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RateUsOverlay;
