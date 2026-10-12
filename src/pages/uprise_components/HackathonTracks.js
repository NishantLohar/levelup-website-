
import React from 'react';

const HackathonTracks = () => {
  return (
    <>
      <section className="py-32 px-6 bg-pitchblack relative border-b border-gold/20 z-10">
    <div className="max-w-7xl mx-auto relative">
        {/*  Header  */}
        <div className="text-left mb-20 border-l-4 border-gold pl-8">
            <h2 className="text-4xl md:text-6xl text-white font-black mb-4 tracking-tighter uppercase">CHOOSE YOUR PROTOCOL</h2>
            <p className="text-lightgrey font-grotesk text-sm tracking-[0.3em] uppercase">HACKATHON TRACKS</p>
        </div>

        {/*  3-Column Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            
            {/*  Track 1  */}
            <div className="bg-[#111111] border border-gold/20 p-10 flex flex-col justify-between h-[480px] sharp transition-all duration-500 gold-glow group relative overflow-hidden tilt-card cursor-pointer">
                <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none animate-float tilt-content">
                    <span className="text-[12rem] font-black text-gold font-heading leading-none">01</span>
                </div>
                <div className="relative z-10 tilt-content">
                    <div className="w-16 h-16 border border-gold flex justify-center items-center mb-10 text-gold group-hover:bg-gold group-hover:text-pitchblack transition-colors duration-300 sharp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-6 pr-8 group-hover:text-gold transition-colors duration-300">AI / MACHINE LEARNING</h3>
                    <p className="text-lightgrey font-grotesk text-sm leading-relaxed">
                        Predictive models, LLMs, Neural Networks. Build intelligent systems that redefine human-computer interaction and deep automation.
                    </p>
                </div>
            </div>

            {/*  Track 2  */}
            <div className="bg-[#111111] border border-gold/20 p-10 flex flex-col justify-between h-[480px] sharp transition-all duration-500 gold-glow group relative overflow-hidden tilt-card cursor-pointer">
                <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none animate-float tilt-content">
                    <span className="text-[12rem] font-black text-gold font-heading leading-none">02</span>
                </div>
                <div className="relative z-10 tilt-content">
                    <div className="w-16 h-16 border border-gold flex justify-center items-center mb-10 text-gold group-hover:bg-gold group-hover:text-pitchblack transition-colors duration-300 sharp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-6 pr-8 group-hover:text-gold transition-colors duration-300">BLOCKCHAIN & CYBERSECURITY</h3>
                    <p className="text-lightgrey font-grotesk text-sm leading-relaxed">
                        dApps, Smart Contracts, Zero-Trust Architecture. Forge immutable ledgers and impenetrable fortresses for the digital age.
                    </p>
                </div>
            </div>

            {/*  Track 3  */}
            <div className="bg-[#111111] border border-gold/20 p-10 flex flex-col justify-between h-[480px] sharp transition-all duration-500 gold-glow group relative overflow-hidden tilt-card cursor-pointer">
                <div className="absolute -top-10 -right-10 p-4 opacity-5 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none animate-float tilt-content">
                    <span className="text-[12rem] font-black text-gold font-heading leading-none">03</span>
                </div>
                <div className="relative z-10 tilt-content">
                    <div className="w-16 h-16 border border-gold flex justify-center items-center mb-10 text-gold group-hover:bg-gold group-hover:text-pitchblack transition-colors duration-300 sharp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="1.5" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white mb-6 pr-8 group-hover:text-gold transition-colors duration-300">EDGE AI DEVELOPMENT</h3>
                    <p className="text-lightgrey font-grotesk text-sm leading-relaxed">
                        On-device processing, IoT, TinyML. Push the boundaries of intelligence to the absolute edge of hardware constraints.
                    </p>
                </div>
            </div>

        </div>
    </div>
</section>

    </>
  );
};

export default HackathonTracks;
