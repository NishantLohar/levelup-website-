import React, { useState, useEffect } from 'react';
import './AnnouncementBanner.css';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const handleScroll = () => {
      // Hide banner when scrolled down more than 50px
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const message = "• HackTheHype Hackathon🏆 NextGen";
  const repeatedMessage = Array(20).fill(message).join(" ");

  return (
    <div className={`announcement-banner ${!isVisible ? 'hidden' : ''}`}>
      <div className="announcement-content">
        <span className="announcement-text">{repeatedMessage}</span>
        <span className="announcement-text">{repeatedMessage}</span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
