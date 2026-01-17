import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <motion.nav 
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="LevelUp Events Logo" className="logo-image" />
        </Link>
        
        <div 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={location.pathname === '/about' ? 'active' : ''}
            >
              About
            </Link>
          </li>
          <li>
            <Link 
              to="/events"
              className={location.pathname === '/events' ? 'active' : ''}
            >
              Events
            </Link>
          </li>
          <li>
            <Link 
              to="/Community" 
              className={location.pathname === '/community' ? 'active' : ''}
            >
              Community
            </Link>
          </li>
          <li className="nav-dropdown">
  <span
    className={
      location.pathname === "/profile" || location.pathname === "/mentors"
        ? "nav-link active"
        : "nav-link"
    }
  >
    Profile ▾
  </span>

  <ul className="dropdown-menu">
    <li>
      <Link
        to="/profile"
        className={location.pathname === "/profile" ? "active" : ""}
      >
        Students
      </Link>
    </li>

    <li>
      <Link
        to="/mentors"
        className={location.pathname === "/mentors" ? "active" : ""}
      >
        Mentors
      </Link>
    </li>
  </ul>
</li>

          <li>
            <Link 
              to="/login" 
              className={location.pathname === '/login' ? 'active' : ''}
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </motion.nav>
  );
};

export default Navbar;
