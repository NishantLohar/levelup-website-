import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';
import Lenis from 'lenis';
import PartnersCarousel from '../components/PartnersCarousel';
import CommunityStats from '../components/CommunityStats';
import './Home.css';

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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

  const logoY = useTransform(smoothProgress, [0, 0.3], [0, -200]);
  const textY = useTransform(smoothProgress, [0, 0.3], [0, 100]);

  // Contact form handler
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="home-page" ref={containerRef}>
      {/* Hero Section */}
      <section className="hero-section snap-section" id="hero">
        <div className="video-background">
          <video autoPlay loop muted playsInline className="background-video">
            <source src="/videos/hackathon-bg.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="grid-background">
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
          <div className="grid-line"></div>
        </div>

        <div className="hero-container">
          <motion.div className="hero-left" style={{ y: textY }}>
            <motion.h1 
              className="hero-title"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="bold-text gradient-text">Build</span>
              <span className="separator"> • </span>
              <span className="bold-text gradient-text">Learn</span>
              <span className="separator"> • </span>
              <span className="bold-text gradient-text">Launch</span>
            </motion.h1>
            
            <motion.p 
              className="hero-description"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hackathons, workshops, and mentorship programs for students who want to innovate, collaborate, and grow.
            </motion.p>

            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <motion.div
  className="hero-buttons"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.6 }}
>
  <Link to="/events">
    <motion.button
      className="cta-button primary"
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(30, 144, 255, 0.4)" }}
      whileTap={{ scale: 0.95 }}
    >
      Events
    </motion.button>
  </Link>
  
  <Link to="/community">
    <motion.button
      className="cta-button secondary"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
      whileTap={{ scale: 0.95 }}
    >
      Community
    </motion.button>
  </Link>
</motion.div>
            </motion.div>
          </motion.div>

          <motion.div className="hero-right" style={{ y: logoY }}>
            <div className="logo-container">
              <motion.div 
                className="floating-icon icon-spider"
                animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🕷️
              </motion.div>

              <motion.div 
                className="floating-icon icon-controller"
                animate={{ y: [10, -10, 10], x: [-5, 5, -5], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              >
                🎮
              </motion.div>

              <motion.div 
                className="floating-icon icon-trophy"
                animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                🏆
              </motion.div>

              <motion.div 
                className="floating-icon icon-medal"
                animate={{ y: [15, -15, 15], x: [5, -5, 5], scale: [1, 1.1, 1] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                🏅
              </motion.div>

              <motion.div 
                className="main-logo"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1.2, delay: 0.3, type: "spring", stiffness: 150 }}
                whileHover={{ scale: 1.05, rotateY: 10, rotateX: 10 }}
              >
                <div className="logo-glow"></div>
                <img src="/logo.png" alt="LevelUp Events" className="logo-image" />
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
        </motion.div>
      </section>

      {/* About Section */}
      <section className="about-section snap-section" id="about">
        <motion.div 
          className="about-container"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1>
              About <span className="highlight">LevelUp</span>
            </h1>
            <p>
              At LevelUp, we bring together ambitious students, developers, and creators 
              to collaborate through hackathons, workshops, and mentorship programs. 
              Our mission is to inspire innovation and empower young minds to build impactful solutions.
            </p>
            <Link to="/about" className="about-btn">Discover More</Link>
          </motion.div>
          <motion.div 
            className="about-image"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src="/ab.gif" alt="About LevelUp" />
          </motion.div>
        </motion.div>
      </section>

      {/* Community Section */}
      <section className="community-section snap-section" id="community">
        <motion.div 
          className="community-container"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="community-image"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img src="/cum.gif" alt="Our Community" />
          </motion.div>
          <motion.div 
            className="community-text"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>Our Community</h3>
            <h2>
              A Place to <span className="highlight">Connect & Grow</span>
            </h2>
            <p>
              A collaborative space where students ask questions, share ideas,
              and discuss projects with peers and mentors — just like Reddit,
              but focused on learning, creativity, and collaboration.
            </p>
            <Link to="/community" className="community-btn">
              Explore
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <PartnersCarousel title="Trusted by Our Partners" />
      <CommunityStats /> 

      {/* Mentor Section */}
<section className="mentor-section snap-section" id="mentors">
  <motion.div 
    className="mentor-header"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2>Meet Our Top<span className="highlight">Mentors</span></h2>
    <p>Learn from industry experts who are passionate about guiding the next generation</p>
  </motion.div>

  <div className="mentors-grid">
    <motion.div 
      className="mentor-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="mentor-image-wrapper">
        <img src="/mentor1.jpeg" alt="Mentor Name" className="mentor-image" />
        <div className="mentor-badge">⭐ Senior Mentor</div>
      </div>
      <div className="mentor-info">
        <h3>Mahesh Ravariya</h3>
        <p className="mentor-role">Mentor @ MLH & Served as Operations and Support Specialist @ Devfolio </p>
        <p className="mentor-bio">
           A community builder, STEM educator,
           and tech enthusiast who has worn multiple hats,
           from community manager and hackathon operations to computer science educator.
        </p>
        <div className="mentor-social">
          <a href="https://www.linkedin.com/in/mravariya/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>

    {/* Add more mentor cards here if needed */}
    <motion.div 
      className="mentor-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="mentor-image-wrapper">
        <img src="/mentor3.jpeg" alt="Mentor Name" className="mentor-image" />
        <div className="mentor-badge">⭐ Senior Mentor</div>
      </div>
      <div className="mentor-info">
        <h3>Loukik Salvi</h3>
        <p className="mentor-role">Professor @ TCET</p>
        <p className="mentor-bio">
          Researcher & Educator in AI, IoT & Digital Trust | Author
          | Keynote Speaker | Driving Secure AI & Sustainable Tech for Smart Cities | Tech Advisor
        </p>
        <div className="mentor-social">
          <a href="https://linkedin.com/in/johndoe" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>

    <motion.div 
      className="mentor-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="mentor-image-wrapper">
        <img src="/mentor4.jpg" alt="Mentor Name" className="mentor-image" />
        <div className="mentor-badge">⭐ Senior Mentor</div>
      </div>
      <div className="mentor-info">
        <h3>Amit Heda</h3>
        <p className="mentor-role">Promoter & Mentor | Financial Forensic Services @ Data Bolta Hi</p>
        <p className="mentor-bio">
          Specializing in Data Analysis Through Various Analysis Tools i.e. ACL, IDEA, R,  Python. 
        </p>  
        <div className="mentor-social">
          <a href="https://www.linkedin.com/in/amit-heda-03014919/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>  

    <motion.div 
      className="mentor-card"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      whileHover={{ y: -10, scale: 1.02 }}
    >
      <div className="mentor-image-wrapper">
        <img src="/amitchandra.png" alt="Mentor Name" className="mentor-image" />
        <div className="mentor-badge">⭐ Senior Mentor</div>
      </div>
      <div className="mentor-info">
        <h3>Amit Chandra</h3>
        <p className="mentor-role">Blockchain and GovtTech Leader</p>
        <p className="mentor-bio">
          Technology Solution Advisor – Blockchain Strategy & Delivery | Led Blockchain Readiness for Indian State Govts | Hyperledger Fabric Expert | Advisor – eGov, Tokenization, CBDC & Web3 | Speaker (IITs & Universities) | EY, IBM, Capgemini, NTT DATA 
        </p>
        {/*  */}
        <div className="mentor-social">
          <a href="https://www.linkedin.com/in/amitchandra13/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
    
  </div>
</section>


      {/* Contact Section */}
      <section className="contact-section-wrapper snap-section" id="contact">
        <motion.div 
          className="contact-card"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          {/* LEFT: Form */}
          <motion.div 
            className="contact-left"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2>Let's Connect</h2>
            <p className="muted">We're excited to hear from you.</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              <input 
                type="text" 
                name="subject" 
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleInputChange}
              />
              <textarea 
                name="message" 
                rows="5" 
                placeholder="Your Message" 
                value={formData.message}
                onChange={handleInputChange}
                required 
              />
              <button type="submit" className="send-btn">Send Message</button>
            </form>
          </motion.div>

          {/* RIGHT: Contact Info */}
          <motion.div 
            className="contact-right"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img src="/com.png" alt="Contact Illustration" className="contact-image" />
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
