
import React from 'react';

const Awards = ({ onOpenModal }) => {
  return (
    <>
      <section className="py-32 px-6 bg-obsidian relative z-10 border-b border-gold/20">
    <div className="max-w-7xl mx-auto">
        {/*  Header  */}
        <div className="text-center mb-24">
            <h2 className="text-5xl md:text-[4.5rem] text-gold bright font-black mb-6 tracking-tighter uppercase" style={{textShadow: "0 0 30px rgba(212, 175, 55, 0.4)"}}>
                HONORING THE RELENTLESS
            </h2>
            <p className="text-white font-grotesk text-lg tracking-[0.4em] uppercase">THE UPRISE 2027 AWARDS</p>
        </div>

        {/*  4-Column Grid  */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/*  Card 1  */}
            <div className="glass-card border border-gold/30 p-10 flex flex-col items-center justify-between h-[450px] sharp hover:bg-gold/5 transition-all duration-500 gold-glow text-center group">
                <div className="text-gold mb-8 mt-6 transform group-hover:scale-125 group-hover:text-[#FFD700] transition-all duration-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    {/*  SVG Laurel/Trophy  */}
                    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">TOP 50<br />ENTREPRENEURS</h3>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('soon')} className="w-full py-4 bg-transparent border border-white text-white font-heading text-xs tracking-[0.2em] hover:bg-white hover:text-pitchblack transition-colors duration-300 sharp mt-8 font-bold">
                    SUBMIT NOMINATION
                </button>
            </div>

            {/*  Card 2  */}
            <div className="glass-card border border-gold/30 p-10 flex flex-col items-center justify-between h-[450px] sharp hover:bg-gold/5 transition-all duration-500 gold-glow text-center group">
                <div className="text-gold mb-8 mt-6 transform group-hover:scale-125 group-hover:text-[#FFD700] transition-all duration-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">TOP 25<br />INVESTORS</h3>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('soon')} className="w-full py-4 bg-transparent border border-white text-white font-heading text-xs tracking-[0.2em] hover:bg-white hover:text-pitchblack transition-colors duration-300 sharp mt-8 font-bold">
                    SUBMIT NOMINATION
                </button>
            </div>

            {/*  Card 3  */}
            <div className="glass-card border border-gold/30 p-10 flex flex-col items-center justify-between h-[450px] sharp hover:bg-gold/5 transition-all duration-500 gold-glow text-center group">
                <div className="text-gold mb-8 mt-6 transform group-hover:scale-125 group-hover:text-[#FFD700] transition-all duration-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">TOP 10<br />COMMUNITIES</h3>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('soon')} className="w-full py-4 bg-transparent border border-white text-white font-heading text-xs tracking-[0.2em] hover:bg-white hover:text-pitchblack transition-colors duration-300 sharp mt-8 font-bold">
                    SUBMIT NOMINATION
                </button>
            </div>

            {/*  Card 4  */}
            <div className="glass-card border border-gold/30 p-10 flex flex-col items-center justify-between h-[450px] sharp hover:bg-gold/5 transition-all duration-500 gold-glow text-center group">
                <div className="text-gold mb-8 mt-6 transform group-hover:scale-125 group-hover:text-[#FFD700] transition-all duration-500 drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">
                    <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-heading font-bold text-white mb-2 leading-tight">TOP 10<br />LEVELUP BUILDERS</h3>
                </div>
                <button onClick={() => onOpenModal && onOpenModal('soon')} className="w-full py-4 bg-transparent border border-white text-white font-heading text-xs tracking-[0.2em] hover:bg-white hover:text-pitchblack transition-colors duration-300 sharp mt-8 font-bold">
                    SUBMIT NOMINATION
                </button>
            </div>

        </div>
    </div>
</section>

    </>
  );
};

export default Awards;
