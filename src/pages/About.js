// import React from "react";
// import { motion } from "framer-motion";
// import "./About.css";

// const About = () => {
//   return (
//     <div className="about-page">
//       {/* Hero Section */}
//       <motion.section 
//         className="about-hero"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.8 }}
//       >
//         <h1>About LevelUp</h1>
//         <p>
//           At LevelUp, we believe that growth happens through connection. We're
//           building a dynamic community and platform designed to empower
//           entrepreneurs, innovators, and professionals to connect, collaborate,
//           and create impact together.
//         </p>
//       </motion.section>

//       {/* Who We Are */}
//       <motion.section 
//         className="about-content"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2>Who We Are</h2>
//         <p>
//           LevelUp brings people, ideas, and opportunities under one roof —
//           offering everything from networking and incubation support to business
//           collaborations and events that inspire innovation and unlock
//           potential.
//         </p>
//       </motion.section>

//       {/* Vision Section */}
//       <section className="about-activities">
//         <motion.div 
//           className="vision-container"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.div 
//             className="vision-text"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <h2>Our Vision</h2>
//             <p>
//               To build a community that thrives on collaboration and innovation.<br />
//               To empower entrepreneurs, students, and professionals worldwide.<br />
//               To create opportunities that drive collective success.
//             </p>
//           </motion.div>

//           <motion.div 
//             className="vision-image"
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <img src="/Vision2.png" alt="Our Vision" />
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Mission Section */}
//       <section className="about-goals">
//         <motion.div 
//           className="mission-container"
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 0.8 }}
//         >
//           <motion.div 
//             className="mission-image"
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//           >
//             <img src="/Mission1.png" alt="Our Mission" />
//           </motion.div>

//           <motion.div 
//             className="mission-text"
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.8, delay: 0.4 }}
//           >
//             <h2>Our Mission</h2>
//             <p>
//               Whether you're a student looking for mentorship, a professional seeking
//               partnerships, or an organization eager to collaborate — LevelUp is
//               where you'll find your next opportunity. We're here to inspire
//               meaningful connections and turn ideas into impactful actions.
//             </p>
//           </motion.div>
//         </motion.div>
//       </section>

//       {/* Why Us */}
//       <motion.section 
//         className="about-mentors"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2>Why Choose LevelUp</h2>
//         <p>
//           Together, we're shaping a community that thrives on creativity,
//           collaboration, and collective growth. LevelUp is not just a platform —
//           it's a movement for progress and innovation.
//         </p>
//       </motion.section>

//             {/* My Team Section */}
//       <motion.section 
//         className="about-team"
//         initial={{ opacity: 0, y: 50 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, margin: "-100px" }}
//         transition={{ duration: 0.8 }}
//       >
//         <h2>Meet Our Team</h2>

//         <div className="team-container">

//           {/* Team Member 1 */}
//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//           >
//             <img src="/nishant.jpg" alt="Team Member" />
//             <h3>Nishant Lohar</h3>
//             <p>Technical Dynamo</p>
//           </motion.div>

//           {/* Team Member 2 */}
//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.2 }}
//           >
//             <img src="/paresh.jpg" alt="Team Member" />
//             <h3>Paresh Sharma</h3>
//             <p>Chief Gatherer</p>
//           </motion.div>

//           {/* Team Member 3 */}
//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <img src="/varun.jpg" alt="Team Member" />
//             <h3>Varun Thakkar</h3>
//             <p>Growth Captain</p>
//           </motion.div>

//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <img src="/pratik.jpg" alt="Team Member" />
//             <h3>Pratik Palande</h3>
//             <p>Visibility Machine</p>
//           </motion.div>

//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <img src="/himani.jpg" alt="Team Member" />
//             <h3>Himani Sharma</h3>
//             <p>Buzz Boss</p>
//           </motion.div>

//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <img src="/zaid.jpg" alt="Team Member" />
//             <h3>Zaid Siddiqui</h3>
//             <p>Tribe Builder</p>
//           </motion.div>

//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <img src="/atharva.jpg" alt="Team Member" />
//             <h3>Atharva Phad</h3>
//             <p>Message Maestro</p>
//           </motion.div>

//           <motion.div 
//             className="team-card"
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6, delay: 0.4 }}
//           >
//             <img src="/namrata.jpg" alt="Team Member" />
//             <h3>Namrata yadav</h3>
//             <p>Director of flow</p>
//           </motion.div>

          

          


        

          

//         </div>
//       </motion.section>

//     </div>
//   );
// };

// export default About;


import React from "react";
import { motion } from "framer-motion";
import "./About.css";

const About = () => {
  return (
    <div className="about-page">

      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>About LevelUp</h1>
        <p>
          At LevelUp, we believe that growth happens through connection. We're
          building a dynamic community and platform designed to empower
          entrepreneurs, innovators, and professionals to connect, collaborate,
          and create impact together.
        </p>
      </motion.section>

      {/* Who We Are */}
      <motion.section 
        className="about-content"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Who We Are</h2>
        <p>
          LevelUp brings people, ideas, and opportunities under one roof —
          offering everything from networking and incubation support to business
          collaborations and events that inspire innovation and unlock
          potential.
        </p>
      </motion.section>

      {/* Vision */}
      <section className="about-activities">
        <motion.div className="vision-container">
          <motion.div className="vision-text">
            <h2>Our Vision</h2>
            <p>
              To build a community that thrives on collaboration and innovation.<br />
              To empower entrepreneurs, students, and professionals worldwide.<br />
              To create opportunities that drive collective success.
            </p>
          </motion.div>

          <motion.div className="vision-image">
            <img src="/Vision2.png" alt="Our Vision" />
          </motion.div>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="about-goals">
        <motion.div className="mission-container">
          <motion.div className="mission-image">
            <img src="/Mission1.png" alt="Our Mission" />
          </motion.div>

          <motion.div className="mission-text">
            <h2>Our Mission</h2>
            <p>
              Whether you're a student looking for mentorship, a professional seeking
              partnerships, or an organization eager to collaborate — LevelUp is
              where you'll find your next opportunity.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ✅ WHY CHOOSE LEVELUP (RESTORED) */}
      <motion.section 
        className="about-mentors"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <h2>Why Choose LevelUp</h2>
        <p>
          Together, we're shaping a community that thrives on creativity,
          collaboration, and collective growth. LevelUp is not just a platform —
          it's a movement for progress and innovation.
        </p>
      </motion.section>

      {/* Team */}
      <motion.section className="about-team">
        <h2>Meet Our Team</h2>

        <div className="team-container">

          <motion.a
            href="https://www.linkedin.com/in/nishant-lohar-233779253/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/nishant.jpeg" alt="Nishant Lohar" />
            <h3>Nishant Lohar</h3>
            
            <p>CTO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/paresh-sharma-40377a253/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/paresh.jpg" alt="Paresh Sharma" />
            <h3>Paresh Sharma</h3>
            
            <p>CEO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/varun-thakkar-178969326/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/varun.jpg" alt="Varun Thakkar" />
            <h3>Varun Thakkar</h3>
            
            <p>CFO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/pratik-palande-48553b253/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/pratik.jpg" alt="Pratik Palande" />
            <h3>Pratik Palande</h3>
            
            <p>CMO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/himani-sharma-ba4a73271/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/himani.jpg" alt="Himani Sharma" />
            <h3>Himani Sharma</h3>
            
            <p>CBO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/zaid-siddiqui-393092247/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/zaid.jpg" alt="Zaid Siddiqui" />
            <h3>Zaid Siddiqui</h3>
            
            <p>COO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/atharva-phad/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/atharva.jpg" alt="Atharva Phad" />
            <h3>Atharva Phad</h3>
            
            <p>CCO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/namrataydv/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/namrata.jpg" alt="Namrata Yadav" />
            <h3>Namrata Yadav</h3>
            <p>CPO</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

          <motion.a
            href="https://www.linkedin.com/in/dr-loukik-salvi-589510164/"
            target="_blank"
            rel="noopener noreferrer"
            className="team-card"
          >
            <img src="/loukik.jpg" alt="Loukik Salvi" />
            <h3>Dr. Loukik Salvi</h3>
            <p>Senior Adviser</p>
            <span className="team-linkedin">
              <i className="fab fa-linkedin-in"></i>
            </span>
          </motion.a>

        </div>
      </motion.section>

    </div>
  );
};

export default About;
