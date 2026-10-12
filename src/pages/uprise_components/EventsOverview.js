
import React from 'react';

const EventsOverview = ({ onOpenModal }) => {
  return (
    <>
      <section id="events" className="py-32 px-6 bg-obsidian relative border-b border-gold/20 z-10">
    <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl text-gold bright font-black mb-6 tracking-tighter uppercase" style={{textShadow: "0 0 30px rgba(212, 175, 55, 0.4)"}}>
                THE THREE PILLARS
            </h2>
            <p className="text-white font-grotesk text-lg tracking-[0.4em] uppercase">What to expect at Uprise 2027</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/*  Hackathon  */}
            <div className="reveal glass-card border border-gold/30 p-10 flex flex-col items-start justify-between h-full min-h-[400px] sharp hover:bg-gold/5 transition-all duration-500 gold-glow group tilt-card cursor-pointer">
                <div className="tilt-content">
                    <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-8 text-gold group-hover:bg-gold group-hover:text-pitchblack transition-colors sharp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-4">THE GAUNTLET<br /><span className="text-gold">HACKATHON</span></h3>
                    <p className="text-lightgrey font-grotesk text-sm leading-relaxed mb-4">
                        A brutal 36-hour coding marathon. 10,000 hackers enter, but only the elite survive. Compete for a massive ₹2 Lakhs+ prize pool.
                    </p>
                    <div className="bg-gold/5 border-l-2 border-gold p-3">
                        <p className="text-gold font-bold font-heading text-xs uppercase tracking-widest mb-1">
                            THE 1,200 GUARANTEE
                        </p>
                        <p className="text-white font-grotesk text-sm leading-snug">
                            Assured hiring or startup investments for every finalist.
                        </p>
                    </div>
                </div>
                <a 
                    href="https://account.levelupevents.in/events/6/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-full mt-8 py-3.5 px-4 bg-gold bright text-pitchblack font-heading text-xs font-bold tracking-[0.2em] uppercase text-center sharp hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_#FFFFFF]"
                >
                    <span>REGISTER FOR HACKATHON</span>
                    <span className="text-sm">&rarr;</span>
                </a>
            </div>

            {/*  Startup Expo  */}
            <div className="reveal glass-card border border-gold/30 p-10 flex flex-col items-start justify-between h-full min-h-[400px] sharp hover:bg-gold/5 transition-all duration-500 gold-glow group tilt-card" style={{transitionDelay: "100ms"}}>
                <div className="tilt-content w-full">
                    <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-8 text-gold group-hover:bg-gold group-hover:text-pitchblack transition-colors sharp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-4">STARTUP<br /><span className="text-gold">EXPO</span></h3>
                    <p className="text-lightgrey font-grotesk text-sm leading-relaxed">
                        Where capital meets code. 200+ startups showcasing their protocols to top-tier investors in our closed-door VIP pitch arenas. 
                    </p>
                </div>
                <button 
                    onClick={() => onOpenModal && onOpenModal('soon')} 
                    className="w-full mt-8 py-3.5 px-4 bg-transparent border border-gold text-gold font-heading text-xs font-bold tracking-[0.2em] uppercase text-center sharp hover:bg-gold hover:text-pitchblack transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_#D4AF37] cursor-pointer"
                >
                    <span>EXPLORE EXHIBITION</span>
                    <span className="text-sm">&rarr;</span>
                </button>
            </div>

            {/*  Award Ceremony  */}
            <div className="reveal glass-card border border-gold/30 p-10 flex flex-col items-start justify-between h-full min-h-[400px] sharp hover:bg-gold/5 transition-all duration-500 gold-glow group tilt-card" style={{transitionDelay: "200ms"}}>
                <div className="tilt-content w-full">
                    <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mb-8 text-gold group-hover:bg-gold group-hover:text-pitchblack transition-colors sharp">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-4">THE UPRISE<br /><span className="text-gold">AWARDS</span></h3>
                    <p className="text-lightgrey font-grotesk text-sm leading-relaxed">
                        The ultimate climax. Honoring the relentless top 50 entrepreneurs, top 25 investors, and the brightest college communities in the nation.
                    </p>
                </div>
                <button 
                    onClick={() => onOpenModal && onOpenModal('soon')} 
                    className="w-full mt-8 py-3.5 px-4 bg-transparent border border-gold text-gold font-heading text-xs font-bold tracking-[0.2em] uppercase text-center sharp hover:bg-gold hover:text-pitchblack transition-all duration-300 flex items-center justify-center gap-2 hover:shadow-[0_0_15px_#D4AF37] cursor-pointer"
                >
                    <span>SEE NOMINATIONS</span>
                    <span className="text-sm">&rarr;</span>
                </button>
            </div>
        </div>
    </div>
</section>

    </>
  );
};

export default EventsOverview;
