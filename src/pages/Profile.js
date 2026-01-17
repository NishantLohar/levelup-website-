import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import "./Profile.css";

const Profile = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Most Hackathons Attended");

  const profiles = [
    {
      id: 1,
      name: "Vivek",
      description: "Web development and AI&DS.",
      avatar: "V",
      hackathons: 0,
      projects: 0,
      prizes: 0,
      Events: 0,
      color: "#1E90FF",
      skills: ["React", "Node.js", "Python", "Machine Learning", "AI/DS", "MongoDB"]
    },
    {
      id: 2,
      name: "Anjana",
      description: "AI/ML enthusiast and full-stack developer.",
      avatar: "A",
      hackathons: 0,
      projects: 0,
      prizes: 0,
      Events: 0,
      color: "#7B61FF",
      skills: ["TensorFlow", "PyTorch", "React", "Django", "Data Science", "Deep Learning"]
    },
    {
      id: 3,
      name: "Hinal",
      description: "Tech, ai, full stack development, software Development",
      avatar: "H",
      hackathons: 0,
      projects: 0,
      prizes: 0,
      Events: 0,
      color: "#00D9FF",
      skills: ["JavaScript", "TypeScript", "Next.js", "Docker", "AWS", "PostgreSQL"]
    },
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

  // Search & filter logic
  const filteredProfiles = profiles
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (filter === "Most Hackathons Attended") return b.hackathons - a.hackathons;
      if (filter === "Most Hackathons Won") return b.prizes - a.prizes;
      if (filter === "Most Projects Submitted") return b.projects - a.projects;
      if (filter === "Most Events Attended") return b.Events - a.Events;
      return 0;
    });

  const getMedalEmoji = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <div className="profile-page">
      {/* Hero Section */}
      <motion.section 
        className="profile-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          🏆 Builders Leaderboard
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Celebrating our top innovators, hackers, and creators who are building the future
        </motion.p>
      </motion.section>

      {/* Search & Filter Section */}
      <motion.div 
        className="search-filter"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search builders by name..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Most Hackathons Attended</option>
          <option>Most Hackathons Won</option>
          <option>Most Projects Submitted</option>
          <option>Most Events Attended</option>
        </select>
      </motion.div>

      {/* Profile Cards */}
      <div className="profile-list">
        {filteredProfiles.map((user, index) => (
          <motion.div
            key={user.id}
            className={`profile-card ${index < 3 ? 'top-three' : ''}`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Rank Badge */}
            <div className="rank-badge" style={{ background: user.color }}>
              {getMedalEmoji(index)}
            </div>

            {/* Left Section: Avatar + Info */}
            <div className="profile-left">
              <div className="profile-avatar" style={{ background: `linear-gradient(135deg, ${user.color}, #7B61FF)` }}>
                {user.avatar}
              </div>
              
              <div className="profile-details">
                <h3>{user.name}</h3>
                <p className="desc">{user.description}</p>
                
                {/* Skills */}
                <div className="skills-container">
                  {user.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Section: Stats */}
            <div className="profile-right">
              <div className="stats">
                <motion.div 
                  className="stat"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-icon">🎯</span>
                  <span className="stat-value">{user.hackathons}</span>
                  <span className="stat-label">Hackathons</span>
                </motion.div>
                
                <motion.div 
                  className="stat"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-icon">💻</span>
                  <span className="stat-value">{user.projects}</span>
                  <span className="stat-label">Projects</span>
                </motion.div>
                
                <motion.div 
                  className="stat"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-icon">🏅</span>
                  <span className="stat-value">{user.prizes}</span>
                  <span className="stat-label">Prizes</span>
                </motion.div>
                
                <motion.div 
                  className="stat"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-icon">📅</span>
                  <span className="stat-value">{user.Events}</span>
                  <span className="stat-label">Events</span>
                </motion.div>
              </div>

              {index < 3 && (
                <div className="spotlight-badge">
                  ⭐ Top Performer
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <motion.div 
          className="no-results"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>No builders found matching "{searchTerm}"</p>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
