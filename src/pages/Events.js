

// import React, { useEffect } from "react";
// import { motion } from "framer-motion";
// import Lenis from "lenis";
// import "./Events.css";

// const Events = () => {

//   // Initialize Lenis smooth scrolling
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.2,
//       easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
//       orientation: 'vertical',
//       smoothWheel: true,
//       wheelMultiplier: 1,
//       touchMultiplier: 2,
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy();
//     };
//   }, []);

//   // Load Devfolio SDK script
//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://apply.devfolio.co/v2/sdk.js";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const upcomingEvents = [
//     {
//       id: 1,
//       title: "Hack Space",
//       date: "December 17, 2025",
//       time: "10:00 AM - 4:00 PM",
//       location: "Virtual Event",
//       description: "Learn about Blockchain and trendy topics on GenAI.",
//       category: "Hack Week",
//       image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500",
//       zohoForm: "https://forms.zohopublic.in/infolevelu1/form/CampRegistrationForm/formperma/w27q9dkGqX0Zl17kGqTUisEuH3D2umJIbVSXINVD1z8",
//       brochure: "/Hack Space Brochure.pdf",
//       showDevfolio: true
//     },
//     {
//       id: 2,
//       title: "Hack the Hype 2026",
//       date: "February 20 2026 - February 22 2026",
//       time: "Announcing soon",
//       location: "Mumbai",
//       description: "48-hour coding marathon with exciting prizes and mentorship.",
//       category: "Hackathon",
//       image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500",
//       zohoForm: "YOUR_ZOHO_FORM_LINK_HERE_2",
//       brochure: "/hackthehype-brochure.pdf",
//       showDevfolio: false
//     },
//   ];

//   return (
//     <div className="events-page">
      
//       {/* Hero Section */}
//       <motion.section 
//         className="events-hero"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           Upcoming Events
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}
//         >
//           Join us for hackathons, workshops, and events that inspire innovation.
//         </motion.p>
//       </motion.section>


//       {/* Events Section */}
//       <section className="events-grid-section">
//         <motion.h2 
//           className="section-title"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6 }}
//         >
//           Upcoming Events
//         </motion.h2>

//         <div className="events-grid">

//           {upcomingEvents.map((event, index) => (
//             <motion.div
//               key={event.id}
//               className="event-card"
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               whileHover={{ y: -10, scale: 1.02 }}
//             >

//               {/* Event Image */}
//               <div className="event-image">
//                 <img src={event.image} alt={event.title} />
//                 <span className="event-category">{event.category}</span>
//               </div>


//               {/* Event Content */}
//               <div className="event-content">
//                 <h3>{event.title}</h3>

//                 <div className="event-details">
//                   <p>📅 {event.date}</p>
//                   <p>🕐 {event.time}</p>
//                   <p>📍 {event.location}</p>
//                 </div>

//                 <p className="event-description">{event.description}</p>


//                 {/* Buttons */}
//                 <div className="event-footer-buttons">

//                   <motion.a
//                     href={event.zohoForm}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="register-btn"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     Register Now
//                   </motion.a>

//                   <motion.a
//                     href={event.brochure}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="register-btn"
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                   >
//                     About Event
//                   </motion.a>
//                 </div>

//                 {/* Devfolio Button */}
//                 {event.showDevfolio && (
//   <div className="devfolio-wrapper">
//     <div
//       className="apply-button"
//       data-hackathon-slug="hack-space-1"
//       data-button-theme="light"
//       style={{
//         height: "44px",
//         width: "312px"
//       }}
//     ></div>
//   </div>
// )}

//               </div>
//             </motion.div>
//           ))}

//         </div>
//       </section>



//       {/* Sponsors & Partners Section */}
// <section className="sponsors-section">

//   <h2 className="sponsors-title">Our Sponsors & Partners</h2>

//   <div className="sponsors-logos">

//     <div className="sponsor-card">
//       <img 
//         src="/devfolio.jpeg" 
//         alt="Devfolio" 
//       />
//     </div>

//     <div className="sponsor-card">
//       <img 
//         src="/ethindia.jpeg" 
//         alt="ETHIndia"
//       />
//     </div>

//   </div>

// </section>


//     </div>
//   );
// };

// export default Events;


import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import "./Events.css";

const Events = () => {
  /* ================= LENIS SMOOTH SCROLL ================= */
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

  /* ================= DEVFOLIO SDK ================= */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  /* ================= UPCOMING EVENTS DATA ================= */
  const upcomingEvents = [
    {
      id: 1,
      title: "HacktheHype 2026",
      date: "March 1st week (date yet to announce)",
      time: "Announcing Soon",
      location: "Mumbai",
      description: "48-hour coding marathon with exciting prizes and mentorship.",
      category: "Hackathon",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500",
      zohoForm: "#",
      brochure: "/hackthehype-brochure.pdf",
      showDevfolio: false,
    },
    {
      id: 2,
      title: "Open Tech 2026",
      date: "Jan 25 to Feb 14",
      time: "Announcing Soon",
      location: "Virtual (YouTube)",
      description:
        "Open Tech is an online session empowering students with AI and next-gen technical skills.",
      category: "Session",
      image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500",
      zohoForm: "https://forms.zohopublic.in/infolevelu1/form/OpenTech2026EventRegistration/formperma/9Eg9Dj7CCwUSv2528ajtVFcanyFwG08qROkOiAgYvo4",
      brochure: "/opentech.pdf",
      showDevfolio: false,
    },
  ];

  return (
    <div className="events-page">
      {/* ================= HERO SECTION ================= */}
      <motion.section
        className="events-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Upcoming Events
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Join us for hackathons, workshops, and events that inspire innovation.
        </motion.p>
      </motion.section>

      {/* ================= UPCOMING EVENTS ================= */}
      <section className="events-grid-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Upcoming Events
        </motion.h2>

        <div className="completed-events-wrapper">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="event-card"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Image */}
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <span className="event-category">{event.category}</span>
              </div>

              {/* Content */}
              <div className="event-content">
                <h3>{event.title}</h3>

                <div className="event-details">
                  <p>📅 {event.date}</p>
                  <p>🕐 {event.time}</p>
                  <p>📍 {event.location}</p>
                </div>

                <p className="event-description">{event.description}</p>

                <div className="event-footer-buttons">
                  <motion.a
                    href={event.zohoForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="register-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Register Now
                  </motion.a>

                  <motion.a
                    href={event.brochure}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="register-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    About Event
                  </motion.a>
                </div>

                {event.showDevfolio && (
                  <div className="devfolio-wrapper">
                    <div
                      className="apply-button"
                      data-hackathon-slug="hack-space-1"
                      data-button-theme="light"
                      style={{ height: "44px", width: "312px" }}
                    ></div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= COMPLETED EVENTS ================= */}
      <section className="events-grid-section">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Completed Events
        </motion.h2>

        <div className="completed-events-wrapper">
          <motion.div
            className="event-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -10, scale: 1.02 }}
          >
            <div className="event-image">
              <img
                src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500"
                alt="Hack Space 2025"
              />
              <span className="event-category">Completed</span>
            </div>

            <div className="event-content">
              <h3>Hack Space 2025</h3>

              <div className="event-details">
                <p>📅 December 17, 2025</p>
                <p>🕐 10:00 AM – 4:00 PM</p>
                <p>📍 Virtual Event</p>
              </div>

              <p className="event-description">
                Learn about Blockchain and trendy topics on Generative AI with
                expert-led sessions.
              </p>

              <div className="event-footer-buttons">
                <motion.a
                  href="https://www.youtube.com/@LevelUpOfficial-c7b/streams"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="register-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ▶ Watch Hack Space Session
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= SPONSORS ================= */}
      <section className="sponsors-section">
        <h2 className="sponsors-title">Our Sponsors & Partners</h2>

        <div className="sponsors-logos">
          <div className="sponsor-card">
            <img src="/devfolio.jpeg" alt="Devfolio" />
          </div>

          <div className="sponsor-card">
            <img src="/ethindia.jpeg" alt="ETHIndia" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Events;
