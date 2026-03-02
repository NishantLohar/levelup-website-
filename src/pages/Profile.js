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
      photo: "/users/vivek.jpg",   // add photo here
      hackathons: 0,
      projects: 2,
      prizes: 0,
      Events: 1,
      color: "#1E90FF",
      skills: ["React", "Node.js", "Python", "Machine Learning", "AI/DS", "MongoDB"]
    },
    {
      id: 2,
      name: "Ripuranjan",
      description: "Software development and R&D in STEM fields, Researcher in Astronomy.",
      avatar: "R",
      photo: "/users/ripu.jpg",
      hackathons: 0,
      projects: 1,
      prizes: 2,
      Events: 1,
      color: "#00D9FF",
      skills: ["Full Stack Developer", "AI/ML", "System Architect"]
    },
    {
      id: 3,
      name: "Pranav",
      description: "Computer Science",
      avatar: "P",
      photo: "/users/pranav.jpeg",
      hackathons: 0,
      projects: 1,
      prizes: 1,
      Events: 1,
      color: "#00D9FF",
      skills: ["React", "Machine Learning", "Flutter", "Backend Development", "UI/UX Design"]
    },
    
    {
      id: 5,
      name: "Sagar",
      description: "Generative AI developer and Deep learning aspirant",
      avatar: "S",
      photo: "/users/sagar.jpeg",
      hackathons: 1,
      projects: 1,
      prizes: 1,
      Events: 1,
      color: "#00D9FF",
      skills: ["Frontend Developer", "GenAI", "Python", "React"]
    },
    {
      id: 6,
      name: "Soham",
      description: "Artificial Intelligence and Data science Student",
      avatar: "S",
      photo: "/users/soham.jpeg",
      hackathons: 1,
      projects: 1,
      prizes: 1,
      Events: 1,
      color: "#00D9FF",
      skills: ["Python", "JavaScript", "Oracle SQL", "Full Stack Developer"]
    },
    {
      id: 4,
      name: "Yeshvi",
      description: "UI/UX Design and Frontend Development",
      avatar: "Y",
      photo: "/users/yeshvi.jpeg",
      hackathons: 1,
      projects: 1,
      prizes: 1,
      Events: 1,
      color: "#00D9FF",
      skills: ["Figma", "Product design"]
    },
    {
      id: 7,
      name: "Tirtha",
      description: "Web development and Programming enthusiast",
      avatar: "T",
      photo: "/users/tritha.jpeg",
      hackathons: 1,
      projects: 1,
      prizes: 1,
      Events: 1,
      color: "#00D9FF",
      skills: ["C++", "Data Structures", "Python", "Mern"]
    },
    {
      id: 8,
      name: "Mrigesh",
      description: "Android Developer",
      avatar: "M",
      photo: "/users/mrigesh.jpeg",
      hackathons: 1,
      projects: 1,
      prizes: 1,
      Events: 1,
      color: "#00D9FF",
      skills: ["Python", "Data Analysis", "Data Structures", "Graphic designer"]
    },
    {
      id: 9,
      name: "Anurag",
      description: "App Developer",
      avatar: "A",
      photo: "/users/anurag.jpg",
      hackathons: 0,
      projects: 1,
      prizes: 0,
      Events: 1,
      color: "#00D9FF",
      skills: ["React", "React-Native", "Gen-AI", "UI/UX", "Javascript", "C++"]
    }
    
  ];

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  // Search & filter
  const filteredProfiles = profiles
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (filter === "Most Hackathons Attended") return b.hackathons - a.hackathons;
      if (filter === "Most Hackathons Won") return b.prizes - a.prizes;
      if (filter === "Most Projects Submitted") return b.projects - a.projects;
      if (filter === "Most Events Attended") return b.Events - a.Events;
      return 0;
    });

  return (
    <div className="profile-page">
      {/* HERO */}
      <motion.section className="profile-hero" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          🏆 Builders Leaderboard
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Celebrating our top innovators, hackers, and creators who are building the future
        </motion.p>
      </motion.section>

      {/* SEARCH */}
      <motion.div className="search-filter" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}>
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

        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>Most Hackathons Attended</option>
          <option>Most Hackathons Won</option>
          <option>Most Projects Submitted</option>
          <option>Most Events Attended</option>
        </select>
      </motion.div>

      {/* CARDS */}
      <div className="profile-list">
        {filteredProfiles.map((user, index) => (
          <motion.div key={user.id} className="profile-card" whileHover={{ y: -5 }}>
            
            {/* LEFT */}
            <div className="profile-left">
              
              {/* PHOTO OR AVATAR */}
              <div className="profile-avatar">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} />
                ) : (
                  <span style={{ background: `linear-gradient(135deg, ${user.color}, #7B61FF)` }}>
                    {user.avatar}
                  </span>
                )}
              </div>

              <div className="profile-details">
                <h3>{user.name}</h3>
                <p className="desc">{user.description}</p>

                <div className="skills-container">
                  {user.skills.map((skill, idx) => (
                    <span key={idx} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="profile-right">
              <div className="stats">
                <div className="stat"><span>🎯</span>{user.hackathons}<p>Hackathons</p></div>
                <div className="stat"><span>💻</span>{user.projects}<p>Projects</p></div>
                <div className="stat"><span>🏅</span>{user.prizes}<p>Prizes</p></div>
                <div className="stat"><span>📅</span>{user.Events}<p>Events</p></div>
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {filteredProfiles.length === 0 && (
        <div className="no-results">
          <p>No builders found matching "{searchTerm}"</p>
        </div>
      )}
    </div>
  );
};

export default Profile;