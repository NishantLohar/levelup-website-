import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import PartnersCarousel from "../components/PartnersCarousel";
import "./Community.css";

const Community = () => {
  const studentFormLink = "https://forms.zohopublic.in/infolevelu1/form/MembershipForm/formperma/k48n2-2-Tw7ydPoj4X1_JNX1ytvOVjdW3OedEyi3LT4";
  const mentorFormLink = "https://forms.zohopublic.in/infolevelu1/form/MembershipForm1/formperma/8Zukjc7mmM1GHE-6CnUK1SBj19oig8SAiIPGGKL5mms";

  // Social media links with SVG icons
  const socialLinks = [
    {
      name: "Instagram",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="60" height="60">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: "https://www.instagram.com/levelupofficial.in/",
      color: "#E4405F",
      handle: "@levelupevents"
    },
    {
      name: "LinkedIn",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="60" height="60">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      url: "https://linkedin.com/company/levelupevents",
      color: "#0077B5",
      handle: "LevelUp Events"
    },
    {
      name: "Discord",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="60" height="60">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      ),
      url: "https://discord.gg/BxkRwU6X5",
      color: "#5865F2",
      handle: "LevelUp Community"
    },
    {
      name: "YouTube",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" >
    <path d="M23.5 6.2s-.2-1.7-.9-2.5c-.9-1-1.9-1-2.4-1.1C16.7 2.3 12 2.3 12 2.3h0s-4.7 0-8.2.3c-.5.1-1.5.1-2.4 1.1-.7.8-.9 2.5-.9 2.5S0 8.1 0 10v1.9c0 1.9.5 3.8.5 3.8s.2 1.7.9 2.5c.9 1 2.1 1 2.7 1.1 2 .2 7.9.3 7.9.3s4.7 0 8.2-.3c.5-.1 1.5-.1 2.4-1.1.7-.8.9-2.5.9-2.5s.5-1.9.5-3.8V10c0-1.9-.5-3.8-.5-3.8zM9.6 14.6V7.9l6.4 3.4-6.4 3.3z"/>
        </svg>
      ),
      url: "https://www.youtube.com/@LevelUpOfficial-in",
      color: "#ff0033",
      handle: "@LevelUpOfficial-in"
    }
  ];

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="community-page">
      {/* Hero Section */}
      <motion.section 
        className="community-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Welcome to the LevelUp Community
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          A vibrant network of <strong>Entrepreneurs, Professionals, Investors, Companies,
          Students, Mentors, and Innovators</strong> — all coming together to grow,
          collaborate, and make an impact. Join our mission to empower talent and
          create real-world opportunities.
        </motion.p>
      </motion.section>

      {/* Join Section */}
      <div className="registration-container">
        {/* Mentor Card */}
        <motion.div 
          className="registration-card mentor-card"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="card-icon">👨‍🏫</div>
          <h2>Join as a Mentor</h2>
          <p>
            Are you an experienced professional or expert passionate about guiding others?
            Become a <strong>LevelUp Mentor</strong> and inspire the next generation of innovators.
          </p>
          <motion.button
            onClick={() => window.open(mentorFormLink, "_blank")}
            className="join-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fill Mentor Form
          </motion.button>
        </motion.div>

        {/* Student Card */}
        <motion.div 
          className="registration-card student-card"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="card-icon">🎓</div>
          <h2>Join as a Student</h2>
          <p>
            Looking to learn, connect, and grow with industry experts? Join the
            <strong> LevelUp aCommunity</strong> as a student and get access to mentors,
            learning sessions, and opportunities to boost your career.
          </p>
          <motion.button
            onClick={() => window.open(studentFormLink, "_blank")}
            className="join-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Fill Student Form
          </motion.button>
        </motion.div>
      </div>

      {/* Social Media Section */}
      <motion.section 
        className="social-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Join the LevelUp Family
        </motion.h2>
        <motion.p 
          className="social-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Connect with us on social media and stay updated with the latest events, opportunities, and community highlights
        </motion.p>

        <div className="social-grid">
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
              style={{ '--social-color': social.color }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="social-icon">{social.icon}</div>
              <h3>{social.name}</h3>
              <p className="social-handle">{social.handle}</p>
              <div className="social-arrow">→</div>
            </motion.a>
          ))}
        </div>

        <motion.div 
          className="cta-box"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <p>Follow us for updates, tips, and exclusive content!</p>
        </motion.div>
      </motion.section>
      <PartnersCarousel />
    </div>
  );
};

export default Community;
