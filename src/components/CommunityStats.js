import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./CommunityStats.css";

/* Count-up hook (scoped to this component) */
const useCountUp = (end, duration = 1500) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(timer);
      }
      setCount(Math.floor(start));
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return count;
};

const CommunityStats = () => {
  const students = useCountUp(500);
  const mentors = useCountUp(60);
  const partners = useCountUp(7);

  return (
    <section className="community-stats">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Our Community
      </motion.h2>

      <div className="stats-inline-wrapper">
        {/* Students */}
        <motion.div
          className="stat-inline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <svg viewBox="0 0 24 24" className="stat-icon">
            <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
            <path d="M11 12.65L3 8.29v4.71c0 2.76 3.58 5 8 5s8-2.24 8-5V8.29l-8 4.36z" />
          </svg>
          <div className="stat-number">{students}+</div>
          <div className="stat-label">Students</div>
        </motion.div>

        <span className="stat-divider" />

        {/* Mentors */}
        <motion.div
          className="stat-inline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <svg viewBox="0 0 24 24" className="stat-icon">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4z" />
            <path d="M4 20v-1c0-2.76 3.58-5 8-5s8 2.24 8 5v1H4z" />
          </svg>
          <div className="stat-number">{mentors}+</div>
          <div className="stat-label">Mentors</div>
        </motion.div>

        <span className="stat-divider" />

        {/* Partnerships */}
        <motion.div
          className="stat-inline"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <svg viewBox="0 0 24 24" className="stat-icon">
            <path d="M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z" />
            <path d="M8 11c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3z" />
            <path d="M8 13c-2.67 0-8 1.34-8 4v2h10v-2c0-1.34.54-2.53 1.43-3.43C10.35 13.21 9.2 13 8 13z" />
            <path d="M16 13c-.91 0-1.77.13-2.57.37.88.9 1.57 2.09 1.57 3.63v2h9v-2c0-2.66-5.33-4-8-4z" />
          </svg>
          <div className="stat-number">{partners}</div>
          <div className="stat-label">Partnerships & Sponsorship</div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityStats;
