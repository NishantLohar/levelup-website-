

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
      title: "HackTheHype 2026",
      date: "date yet to announce",
      time: "Announcing Soon",
      location: "Mumbai",
      description: "48-hour coding marathon with exciting prizes and mentorship.",
      category: "Hackathon",
      image: "./hack-logo.jpeg",
      zohoForm: "#",
      brochure: "/hackthehype-brochure.pdf",
      showDevfolio: false,
      type: "normal"
    },
    {
      id: 2,
      title: "Zero Doubt: zkVerify Mumbai Meetup (LevelUp Community Partner)",
      date: "11th April 2026",
      time: "10:30 AM To 4:30 PM",
      location: "Mumbai",
      description: "zkVerify is the universal verification layer that unlocks privacy and truth for SNARKs, TEEs, and Verifiable AI.",
      category: "Workshop",
      image: "./zk copy.jpeg",
      zohoForm: "https://luma.com/cmxbxlej?tk=PEQpx6",
      brochure: "#",
      showDevfolio: false,
      type: "normal"
    },
    {
      id: 3,
      title: "Campus Therapy",
      date: "TBA",
      time: "TBA",
      location: "Virtual",
      description: "Event details coming soon.",
      category: "Youtube",
      image: "./campus therapy-1.png",
      youtubeLink: "https://www.youtube.com/@LevelUpOfficial-in/featured",
      brochure: "#",
      showDevfolio: false,
      type: "youtube"
    },
    {
      id: 4,
      title: "Oscillation 3.0 (IETE x LevelUp)",
      date: "4th April 2026",
      time: "8:30 AM To 4:00 PM",
      location:"Thakur College of Engineering and Technology, Kandivali (E)",
      description: "Ideathon & Project Presentation. To know more click the button below",
      category: "Event",
      image: "./iete.png",
      zohoForm: "#",
      brochure: "./oscillation.pdf",
      showDevfolio: false,
      type: "normal"
    }
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
              <div className="event-image">
                <img src={event.image} alt={event.title} />
                <span className="event-category">{event.category}</span>
              </div>

              <div className="event-content">
                <h3>{event.title}</h3>

                <div className="event-details">
                  <p>📅 {event.date}</p>
                  <p>🕐 {event.time}</p>
                  <p>📍 {event.location}</p>
                </div>

                <p className="event-description">{event.description}</p>

                <div className="event-footer-buttons">
                {event.type === "youtube" ? (
                  <motion.a
                    href={event.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="register-btn"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ▶ Watch Here
                  </motion.a>
                ) : (
                  <>
                    {event.zohoForm && event.zohoForm !== "#" && (
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
                    )}

                    {event.brochure && event.brochure !== "#" && (
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
                    )}
                  </>
                )}
                </div>
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

  {/* Tech From Zero */}
  <motion.div className="event-card">
    <div className="event-image">
      <img src="./logoo.png" alt="Tech From Zero" />
    </div>

    <div className="event-content">
      <h3>Tech From Zero</h3>

      <div className="event-details">
        <p>📅 2 March 2026 To 27 March 2026</p>
        <p>🕐 10:00 AM</p>
        <p>📍 Virtual</p>
      </div>

      <p className="event-description">
        Tech explained like you're NOT a computer scientist.
      </p>

      <div className="event-footer-buttons">
        <motion.a
          href="https://youtube.com/playlist?list=PLZ6SfI6qnKOG3Q_EJ5gpte61E3-hcytsZ&si=2gHFuAnjUi_SKnFN"
          target="_blank"
          rel="noopener noreferrer"
          className="register-btn"
        >
          ▶ Watch Here
        </motion.a>
      </div>
    </div>
  </motion.div>

  {/* HackSpace FIRST */}
  <motion.div className="event-card">
    <div className="event-image">
      <img src="/hackspace-logo.jpg" alt="Hack Space 2025" />
      {/* <span className="event-category">Completed</span> */}
    </div>

    <div className="event-content">
      <h3>Hack Space 2025</h3>

      <div className="event-details">
        <p>📅 December 17, 2025</p>
        <p>🕐 10:00 AM – 4:00 PM</p>
        <p>📍 Virtual Event</p>
      </div>

      <p className="event-description">
        Learn about Blockchain and trendy topics on Generative AI with expert-led sessions.
      </p>

      <div className="event-footer-buttons">
        <motion.a
          href="https://www.youtube.com/watch?v=POm1ghTTI8E&list=PLZ6SfI6qnKOFYW5MkHoaUbECt18RzojlJ"
          target="_blank"
          rel="noopener noreferrer"
          className="register-btn"
        >
          ▶ Watch Hack Space Session
        </motion.a>
      </div>
    </div>
  </motion.div>


  {/* Open Tech */}
  <motion.div className="event-card">
    <div className="event-image">
      <img src="/opentech-logo.jpeg" alt="Open Tech 2026" />
      {/* <span className="event-category">Completed</span> */}
    </div>

    <div className="event-content">
      <h3>Open Tech 2026</h3>

      <div className="event-details">
        <p>📅 Jan 25 – Feb 14</p>
        <p>📍 Virtual (YouTube)</p>
      </div>

      <p className="event-description">
        Online technical sessions empowering students with AI and next-gen skills.
      </p>

      <div className="event-footer-buttons">
        <motion.a
          href="https://www.youtube.com/watch?v=eci4mhWCHbY&list=PLZ6SfI6qnKOFhXgzLM98XPNsrNuzGsOmR"
          target="_blank"
          rel="noopener noreferrer"
          className="register-btn"
        >
          ▶ Watch Open Tech Sessions
        </motion.a>
      </div>
    </div>
  </motion.div>


  {/* NextGen */}
  <motion.div className="event-card">
    <div className="event-image">
      <img src="/nextgen-logo.png" alt="NextGen Hackathon" />
      {/* <span className="event-category">Completed</span> */}
    </div>

    <div className="event-content">
      <h3>NextGen Hackathon</h3>

      <div className="event-details">
        <p>📅 Feb 22, 2026</p>
        <p>📍 Virtual</p>
      </div>

      <p className="event-description">
        8-hour online hackathon focused on AI/ML and Web Development tracks.
      </p>
    </div>
  </motion.div>

  {/* CEO Talk */}
<motion.div className="event-card">
  <div className="event-image">
    <img src="/ceotalk-logo.png" alt="CEO Talk" />
    {/* <span className="event-category"></span> */}
  </div>

  <div className="event-content">
    <h3>CEO Talk (LevelUp x IIEC.CSMU)</h3>

    <div className="event-details">
      <p>📅 March 13, 2026</p>
      <p>📍 Chhatrapati Shivaji Maharaj University, Navi Mumbai</p>
    </div>

    <p className="event-description">
      Insightful session with industry leaders sharing real-world startup experiences, growth strategies, and career guidance.
    </p>

    {/* <div className="event-footer-buttons">
      <motion.a
        href="YOUR_YOUTUBE_LINK_HERE"
        target="_blank"
        rel="noopener noreferrer"
        className="register-btn"
      >
        ▶ Watch CEO Talk
      </motion.a>
    </div> */}
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