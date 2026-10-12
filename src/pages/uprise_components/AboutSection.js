
import React from 'react';

const AboutSection = () => {
  return (
    <>
      <section id="about" className="py-32 px-6 bg-pitchblack relative border-b border-gold/20 z-10 overflow-hidden">
    <div className="max-w-7xl mx-auto relative">
        {/*  Background element  */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-5 pointer-events-none animate-float">
            <span className="text-[20rem] font-black font-heading text-white leading-none">?</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center reveal">
            <div>
                <h2 className="text-4xl md:text-6xl text-white font-black mb-6 tracking-tighter uppercase leading-none">
                    MORE THAN A <span className="text-gold bright">HACKATHON.</span>
                </h2>
                <p className="text-lightgrey font-grotesk text-lg leading-relaxed mb-8">
                    UPRISE 2027 is the epicenter of India's technological revolution. It's a 48-hour crucible where the nation's most elite builders, visionary startups, and top-tier investors collide to forge the future.
                </p>
                <p className="text-lightgrey/70 font-grotesk text-base leading-relaxed mb-10">
                    Forget traditional networking. This is a high-stakes arena designed to push limits. Whether you are building the next generation of AI, securing decentralized networks, or hunting for your next unicorn investment, UPRISE is where the ecosystem levels up.
                </p>
                
                <div className="grid grid-cols-2 gap-8 border-l-2 border-gold pl-6">
                    <div>
                        <h4 className="text-white font-heading font-bold text-xl mb-2">48 HOURS</h4>
                        <p className="text-lightgrey/50 font-grotesk text-sm uppercase tracking-widest">Of Uninterrupted Building</p>
                    </div>
                    <div>
                        <h4 className="text-white font-heading font-bold text-xl mb-2">₹2 LAKHS+</h4>
                        <p className="text-lightgrey/50 font-grotesk text-sm uppercase tracking-widest">Hackathon Prize Pool</p>
                    </div>
                </div>
            </div>
            
            <div className="relative">
                {/*  Futuristic Image/Graphic Mockup  */}
                <div className="glass-card border border-gold/30 p-2 relative sharp z-10 gold-glow">
                    <div className="w-full h-[400px] bg-obsidian relative flex items-center justify-center overflow-hidden border border-gold/10">
                        <div className="absolute inset-0 bg-grid-animated opacity-30"></div>
                        <div className="w-48 h-48 border border-gold/20 rounded-full flex items-center justify-center animate-spin-slow absolute">
                            <div className="w-32 h-32 border border-gold/40 rounded-full flex items-center justify-center animate-reverse-spin">
                                <div className="w-16 h-16 bg-gold/10 rounded-full blur-md"></div>
                            </div>
                        </div>
                        <span className="relative z-10 font-heading text-gold tracking-[0.5em] text-sm uppercase font-bold text-center">SYSTEM_OVERRIDE<br />INITIATED</span>
                    </div>
                </div>
                
                {/*  Decorative accents  */}
                <div className="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-gold z-0"></div>
                <div className="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-gold z-0"></div>
            </div>
        </div>
    </div>
</section>

    </>
  );
};

export default AboutSection;
