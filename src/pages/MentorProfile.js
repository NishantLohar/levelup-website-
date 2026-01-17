import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import "./MentorProfile.css";

const MentorProfile = () => {
  const [searchTerm, setSearchTerm] = useState("");
    const mentors = [
  {
    id: 1,
    name: "Mithu",
    description: "Project Management & AI Mentor",
    avatar: "M",
    color: "#1E90FF",
    skills: [
      "Project Management",
      "Leadership",
      "AI/ML",
      "Data Analytics",
      "AWS",
      "Python",
      "NLP",
      "Business Intelligence",
      "Apache Superset",
      "Pentaho"
    ],
  },
  {
    id: 2,
    name: "Amit",
    description: "Data & Finance Strategy Mentor",
    avatar: "A",
    color: "#7B61FF",
    skills: [
      "Data Mining",
      "Accounting",
      "Financial Modeling",
      "Financial Forensics",
      "Startup Fundraising",
      "AI",
      "Audit",
      "Cyber Fraud Investigation",
      "Data Forensics"
    ],
  },
  {
    id: 3,
    name: "Siddheshwari",
    description: "Career & Mental Health Mentor",
    avatar: "S",
    color: "#00D9FF",
    skills: [
      "Career Counselling",
      "Mental Health Guidance",
      "Life Balance Coaching"
    ],
  },
  {
    id: 4,
    name: "Loukik",
    description: "AI & Emerging Tech Mentor",
    avatar: "L",
    color: "#00FFFF",
    skills: [
      "IoT",
      "Cloud Computing",
      "Computer Networks",
      "Data Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Educational Reforms"
    ],
  },
  {
    id: 5,
    name: "Vinod",
    description: "Cloud & Systems Mentor",
    avatar: "V",
    color: "#FFA500",
    skills: [
      "Cloud Computing",
      "Operating Systems"
    ],
  },
  {
    id: 6,
    name: "Mahesh",
    description: "Personal & Career Development Mentor",
    avatar: "M",
    color: "#FFD700",
    skills: [
      "Personal Development",
      "Career Guidance",
      "Technical Skill Development"
    ],
  },
  ];

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true });
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mentor-page">
      {/* Hero */}
      <motion.section
        className="mentor-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h1>Meet Our Mentors</h1>
        <p>Industry experts guiding and shaping the next generation of builders</p>
      </motion.section>

      {/* Search */}
      <div className="mentor-search">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search mentors by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Mentor Cards */}
      <div className="mentor-list">
        {filteredMentors.map((mentor) => (
          <motion.div
            key={mentor.id}
            className="mentor-card-m"
            whileHover={{ y: -6 }}
          >
            <div
              className="mentor-avatar"
              style={{
                background: `linear-gradient(135deg, ${mentor.color}, #7B61FF)`,
              }}
            >
              {mentor.avatar}
            </div>

            <div className="mentor-info">
              <h3>{mentor.name}</h3>
              <p>{mentor.description}</p>

              <div className="mentor-skills">
                {mentor.skills.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredMentors.length === 0 && (
        <p className="mentor-empty">No mentors found</p>
      )}
    </div>
  );
};

export default MentorProfile;
