// 

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
      // photo: "/mentors/mithu.jpg",
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
        "Pentaho",
      ],
    },
    {
      id: 2,
      name: "Amit",
      description: "Data & Finance Strategy Mentor",
      avatar: "A",
      photo: "/mentors/mentor4.jpg",
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
        "Data Forensics",
      ],
    },
    {
      id: 3,
      name: "Siddheshwari",
      description: "Career & Mental Health Mentor",
      avatar: "S",
      // photo: "/mentors/siddheshwari.jpg",
      color: "#00D9FF",
      skills: [
        "Career Counselling",
        "Mental Health Guidance",
        "Life Balance Coaching",
      ],
    },
    {
      id: 4,
      name: "Loukik",
      description: "AI & Emerging Tech Mentor",
      avatar: "L",
      photo: "/mentors/mentor3.jpeg",
      color: "#00FFFF",
      skills: [
        "IoT",
        "Cloud Computing",
        "Computer Networks",
        "Data Science",
        "Artificial Intelligence",
        "Machine Learning",
        "Educational Reforms",
      ],
    },
    {
      id: 5,
      name: "Vinod",
      description: "Cloud & Systems Mentor",
      avatar: "V",
      // photo: "/mentors/vinod.jpg",
      color: "#FFA500",
      skills: ["Cloud Computing", "Operating Systems"],
    },
    {
      id: 6,
      name: "Mahesh",
      description: "Personal & Career Development Mentor",
      avatar: "M",
      photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Personal Development",
        "Career Guidance",
        "Technical Skill Development",
      ],
    },
    {
      id: 7,
      name: "Devisha",
      description: "Blockchain Developer",
      avatar: "N",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Blockchain Mentor",
      ],
    },
    {
      id: 8,
      name: "Amaan",
      description: "Blockchain Developer",
      avatar: "A",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Blockchain",
        "Solidity",
        "Developer",
      ],
    },
    {
      id: 9,
      name: "Kanishak",
      description: "Web3 Developer",
      avatar: "K",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Founder of Fluxor",
        "Community Developer",
        "Ex-Blockpen",
        "AIxBlockchain",
      ],
    },
    {
      id: 10,
      name: "Deepak",
      description: "Blockchain Mentor",
      avatar: "D",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Tokenomics",
        "Cybersecurity",
        "Metaverse",
      ],
    },
    {
      id: 11,
      name: "Mohit",
      description: "Blockchain & Golang/Rust Developer/Speaker",
      avatar: "M",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "GSoC Mentor",
        "GSoC'21 @ SCoReLab",
        "Summer of Bitcoin'21",
        "Certified Ethereum Developer",
        "C4GT Mentor@MeitY ",
      ],
    },
    {
      id: 12,
      name: "Prateush",
      description: "Blockchain & AI Mentor/Speaker",
      avatar: "P",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Ex- UmiNetwork",
        "7× Web3 Global Hackathon Winner",
      ],
    },
    {
      id: 13,
      name: "Subham",
      description: "Mentor, Building Agentic AI for Scale, Phd(Reinforcment Learning)",
      avatar: "S",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Generative AI",
        "Software Development",
        "Machine Learning",
        "NLP",
        "DevOps",
      ],
    },
    {
      id: 14,
      name: "Devanshu",
      description: "AI Mentor/Speaker",
      avatar: "D",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Devrel @AGIvant",
        "Community developer",
      ],
    },
    {
      id: 15,
      name: "Shadab",
      description: "AI Mentor/Speaker",
      avatar: "S",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Startup Advisor",
        "TEDx Speaker",
        "Author",
        "Google developer expert for GenAI",
        "AWS Community builder",
      ],
    },
    {
      id: 16,
      name: "Jyoti",
      description: "GenAI and Quantum Computing Mentor/Speaker",
      avatar: "J",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Speaker @ DevFest/Google I/O",
        "Co-Lead FOSS United Kanpur",
        "Tech Writer",
      ],
    },
    {
      id: 17,
      name: "Anmol",
      description: "Software Engineer",
      avatar: "A",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Java",
        "Full Stack Development",
        "AI Agents & GenAI Systems",
      ],
    },
    {
      id: 18,
      name: "Puspanjali",
      description: "Engineering Leader",
      avatar: "P",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Author",
        "Data Scientist",
        "GenAI | Agents & Agentic AI",
      ],
    },
    {
      id: 19,
      name: "Alok",
      description: "Tech Speaker",
      avatar: "A",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Full Stack Developer & Cloud Engineer",
        "AWS | Gitlab | Docker",
      ],
    },
    {
      id: 20,
      name: "Darsh",
      description: "Co-Founder Purry Tails",
      avatar: "D",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Expert in ML",
        "GenAI",
      ],
    },
    {
      id: 21,
      name: "Mahir",
      description: "Entrepreneur & Speaker",
      avatar: "M",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Business | Strategy",
      ],
    },
    {
      id: 22,
      name: "Om Ashish",
      description: "Product Data Analyst & Speaker",
      avatar: "A",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "GenAI Community",
        "MIT Bootcamper",
        "AI Engineer",
        "Open Source Contributor",
      ],
    },
    {
      id: 23,
      name: "Tushar",
      description: "Founder of Business Sathi & Tech Speaker",
      avatar: "T",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Startup Advisor",
        "Ex-Program Manager @ WUE8",
      ],
    },
    {
      id: 24,
      name: "Ashwin",
      description: "CEO @ Speclar | Director of Altus Cybersecurity Pvt. Ltd.",
      avatar: "A",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "2x Tedx Speaker",
        "Ethical Hacker",
        "Blockchain",
        "Cybersecurity Researcher",
      ],
    },
    {
      id: 25,
      name: "Yoshita",
      description: "Technical Program Manager @ Microsoft & Public Speaker",
      avatar: "Y",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "Digital Economist Executive Fellow ",
        "Perplexity AI Business Fellow",
        "AI Generalist",
        "Policy Researcher",
      ],
    },
    {
      id: 26,
      name: "Gayatri",
      description: "Trainer of Communication & Inner Awareness @ TGBS",
      avatar: "Y",
      // photo: "/mentors/mentor1.jpeg",
      color: "#FFD700",
      skills: [
        "PHD Scholar",
        "Certified Trainer",
      ],
    },
  ];

  // Smooth scroll (Lenis)
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
            {/* Avatar */}
            <div className="mentor-avatar">
              {mentor.photo ? (
                <img src={mentor.photo} alt={mentor.name} />
              ) : (
                <span
                  style={{
                    background: `linear-gradient(135deg, ${mentor.color}, #7B61FF)`,
                  }}
                >
                  {mentor.avatar}
                </span>
              )}
            </div>

            {/* Info */}
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
