import React, { useState, useEffect, useRef } from 'react';
import './AnnouncementBanner.css';

const AnnouncementBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const bannerRef = useRef(null);

  useEffect(() => {
    const updateHeight = (visible) => {
      const height = visible && bannerRef.current ? bannerRef.current.offsetHeight : 0;
      document.documentElement.style.setProperty('--banner-height', `${height}px`);
    };

    updateHeight(true);

    const handleScroll = () => {
      const visible = window.scrollY <= 50;
      setIsVisible(visible);
      updateHeight(visible);
    };
    
    const handleResize = () => {
      const visible = window.scrollY <= 50;
      updateHeight(visible);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.documentElement.style.setProperty('--banner-height', '0px');
    };
  }, []);

  const message = "• HackTheHype Hackathon";
  const repeatedMessage = Array(20).fill(message).join(" ");

  return (
    <div ref={bannerRef} className={`announcement-banner ${!isVisible ? 'hidden' : ''}`}>
      <div className="announcement-content">
        <span className="announcement-text">{repeatedMessage}</span>
        <span className="announcement-text">{repeatedMessage}</span>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
