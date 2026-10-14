
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroSection = ({ onOpenModal }) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const registered = 
      localStorage.getItem('prehackathon_registered') === 'true' || 
      document.cookie.includes('prehackathon_registered=true');
    setIsRegistered(registered);
  }, []);

  const handlePreHackathonClick = (e) => {
    const registered = 
      localStorage.getItem('prehackathon_registered') === 'true' || 
      document.cookie.includes('prehackathon_registered=true');
    if (registered) {
      e.preventDefault();
      navigate('/pre-hackathon');
    }
  };
  return (
    <>
      <section className="min-h-screen flex flex-col justify-center items-center relative px-6 pt-20 pb-12 overflow-hidden border-b border-gold/20">
    {/*  Abstract Particle Network (CSS representation)  */}
    <div className="absolute inset-0 flex justify-center items-center opacity-30 z-0 pointer-events-none">
        <div className="w-[800px] h-[800px] rounded-full border border-gold/30 animate-spin-slow" style={{animationDuration: "40s"}}></div>
        <div className="w-[600px] h-[600px] rounded-full border border-gold/20 absolute animate-reverse-spin" style={{animationDuration: "30s"}}></div>
        <div className="w-[400px] h-[400px] rounded-full border border-gold/10 absolute animate-spin-slow" style={{animationDuration: "20s"}}></div>
    </div>

    <div className="w-full max-w-7xl mx-auto z-10 flex flex-col items-center mt-10">
        {/*  Stats Counter  */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center w-full mb-16 uppercase font-heading tracking-widest text-xs md:text-sm">
            <div className="flex flex-col">
                <span className="text-gold bright text-3xl md:text-4xl mb-2 counter font-bold" data-target="10000">0</span>
                <span className="text-lightgrey">Hackers</span>
            </div>
            <div className="flex flex-col">
                <span className="text-gold bright text-3xl md:text-4xl mb-2 counter font-bold" data-target="200">0</span>
                <span className="text-lightgrey">Startups</span>
            </div>
            <div className="flex flex-col">
                <span className="text-gold bright text-3xl md:text-4xl mb-2 counter font-bold" data-target="50">0</span>
                <span className="text-lightgrey">Top Entrepreneurs</span>
            </div>
            <div className="flex flex-col">
                <span className="text-gold bright text-3xl md:text-4xl mb-2 counter font-bold" data-target="25">0</span>
                <span className="text-lightgrey">Top Investors</span>
            </div>
            <div className="flex flex-col md:col-span-1 col-span-2">
                <span className="text-gold bright text-3xl md:text-4xl mb-2 counter font-bold" data-target="10">0</span>
                <span className="text-lightgrey">Top College Communities</span>
            </div>
        </div>

        {/*  Main Title  */}
        <h1 className="text-6xl md:text-[8rem] text-gold bright font-black text-center mb-6 tracking-tighter w-full leading-none text-gradient-mask" data-text="UPRISE 2027" style={{textShadow: "0 0 40px rgba(212, 175, 55, 0.4)"}}>
            UPRISE 2027
        </h1>
        
        <h2 className="text-lg md:text-2xl text-white text-center tracking-[0.3em] mb-16 max-w-4xl leading-relaxed">
            A COLLISION OF <br className="md:hidden" />INDIA'S NEXT GENERATION
        </h2>

        {/*  CTA Buttons  */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 reveal delay-200">
            <button 
                type="button"
                onClick={() => onOpenModal && onOpenModal('soon')} 
                className="magnetic-btn sharp bg-gold bright hover:bg-white text-pitchblack font-heading font-bold py-5 px-12 transition-all duration-300 text-center tracking-widest text-sm hover:shadow-[0_0_20px_#FFFFFF] shimmer-btn animate-pulse-gold cursor-pointer"
            >
                REGISTER FOR STARTUP EXPO
            </button>
            <a 
                href={isRegistered ? "/pre-hackathon" : "https://account.levelupevents.in/events/register/1/"} 
                target={isRegistered ? "_self" : "_blank"} 
                rel="noopener noreferrer" 
                onClick={handlePreHackathonClick}
                className="magnetic-btn sharp bg-transparent border border-gold text-gold font-heading font-bold py-5 px-12 transition-all duration-300 text-center tracking-widest text-sm hover:bg-gold/10 hover:shadow-[0_0_15px_#D4AF37]"
            >
                {isRegistered ? "PRE-HACKATHON DETAILS" : "PARTICIPATE IN PRE-HACKATHON"}
            </a>
            <button onClick={() => onOpenModal && onOpenModal('soon')} className="magnetic-btn sharp bg-transparent border border-lightgrey text-white font-heading font-bold py-5 px-12 transition-all duration-300 text-center tracking-widest text-sm hover:border-white hover:bg-white/10">
                SUBMIT NOMINATION
            </button>
        </div>
    </div>
</section>

{/*  Marquee Banner  */}
<div className="w-full bg-transparent border-y border-gold/20 overflow-hidden py-6 z-20 relative flex items-center bg-gold/5 backdrop-blur-md">
    <div className="animate-marquee flex whitespace-nowrap items-center">
        <span className="outline-text font-heading font-black text-6xl mx-12">BUILD THE FUTURE</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
        <span className="outline-text font-heading font-black text-6xl mx-12">SECURE FUNDING</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
        <span className="outline-text font-heading font-black text-6xl mx-12">CONNECT WITH ELITES</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
        <span className="outline-text font-heading font-black text-6xl mx-12">WIN ₹2 LAKHS+</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
    </div>
    {/*  Duplicate for seamless loop  */}
    <div className="animate-marquee flex whitespace-nowrap items-center" aria-hidden="true">
        <span className="outline-text font-heading font-black text-6xl mx-12">BUILD THE FUTURE</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
        <span className="outline-text font-heading font-black text-6xl mx-12">SECURE FUNDING</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
        <span className="outline-text font-heading font-black text-6xl mx-12">CONNECT WITH ELITES</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
        <span className="outline-text font-heading font-black text-6xl mx-12">WIN ₹2 LAKHS+</span>
        <span className="text-gold bright font-heading font-black text-4xl mx-12">✦</span>
    </div>
</div>



    </>
  );
};

export default HeroSection;
