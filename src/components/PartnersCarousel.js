import React from "react";
import "./PartnersCarousel.css";

const logos = [
  "/logos/devfolio.jpeg",
  "/logos/ethindia.jpeg",
  "/logos/logo11.png",
  "/logos/logo22.png",
  "/logos/logo3.jpeg",
];

const PartnersCarousel = ({ title = "Our Partners & Sponsors" }) => {
  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="partners-section">
      <h2>{title}</h2>

      <div className="partners-wrapper">
        <div className="fade fade-left" />
        <div className="fade fade-right" />

        <div className="partners-carousel">
          <div className="partners-track">
            {allLogos.map((logo, index) => (
              <div className="partner-logo" key={index}>
                <img src={logo} alt="Partner logo" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersCarousel;
