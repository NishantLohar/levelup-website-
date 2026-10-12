
import React from 'react';

const StartupExpo = ({ onOpenModal }) => {
  return (
    <>
      <section id="expo" className="py-32 px-6 bg-obsidian relative border-b border-gold/20 z-10">
    <div className="max-w-7xl mx-auto">
        {/*  Header  */}
        <div className="text-center mb-24">
            <h2 className="text-4xl md:text-[4rem] text-white font-black mb-6 tracking-tighter leading-none">
                STARTUP EXPO &<br />
                <span className="text-gold bright">INVESTOR LOUNGE</span>
            </h2>
            <p className="text-lightgrey font-grotesk text-sm uppercase tracking-[0.4em]">Where Capital Meets Code</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/*  Block 1: Startup Booths (Architectural Layout Feel)  */}
            <div className="flex flex-col justify-center">
                <h3 className="text-2xl text-white font-heading border-b border-gold/30 pb-6 mb-8 tracking-widest">EXHIBITION TIERS</h3>
                
                <div className="space-y-6">
                    {/*  Alpha Booth  */}
                    <div className="glass-card p-8 border border-lightgrey/20 hover:border-gold/50 transition-all duration-300 sharp group flex justify-between items-center cursor-pointer hover:bg-white/5 tilt-card">
                        <div className="tilt-content">
                            <h4 className="text-white text-xl font-bold mb-2 font-heading group-hover:text-gold transition-colors">ALPHA BOOTH</h4>
                            <p className="text-lightgrey text-sm font-grotesk tracking-wide">Standard 10x10 Space • Basic Listing</p>
                        </div>
                    </div>

                    {/*  Beta Booth  */}
                    <div className="glass-card p-8 border border-lightgrey/20 hover:border-gold/50 transition-all duration-300 sharp group flex justify-between items-center cursor-pointer hover:bg-white/5 tilt-card">
                        <div className="tilt-content">
                            <h4 className="text-white text-xl font-bold mb-2 font-heading group-hover:text-gold transition-colors">BETA BOOTH</h4>
                            <p className="text-lightgrey text-sm font-grotesk tracking-wide">Premium 20x10 Space • Stage Shoutout</p>
                        </div>
                    </div>

                    {/*  Prime Showcase  */}
                    <div className="glass-card p-8 border border-gold bg-gold/5 hover:bg-gold/10 transition-all duration-300 sharp group flex justify-between items-center cursor-pointer gold-glow relative overflow-hidden tilt-card">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/5 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 tilt-content">
                            <h4 className="text-gold bright text-xl font-bold mb-2 font-heading">PRIME SHOWCASE</h4>
                            <p className="text-lightgrey text-sm font-grotesk tracking-wide">Center Arena • Main Stage Logo • VIP Access</p>
                        </div>
                    </div>
                </div>

                <button onClick={() => onOpenModal && onOpenModal('soon')} className="w-full mt-10 bg-transparent border-2 border-white text-white font-heading font-bold py-5 hover:bg-white hover:text-pitchblack transition-all duration-300 sharp tracking-[0.2em] text-sm">
                    BOOK EXHIBITION SPACE
                </button>
            </div>

            {/*  Block 2: VIP Investor Pitch Arena  */}
            <div className="relative bg-pitchblack border border-gold/40 p-12 lg:p-16 flex flex-col justify-center sharp overflow-hidden group hover:border-gold/80 transition-colors duration-500">
                {/*  Gold Laurel Wreath Watermark  */}
                <div className="absolute -right-24 -bottom-24 opacity-10 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none">
                    <svg width="500" height="500" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="0.3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <h3 className="text-3xl lg:text-4xl font-heading text-gold bright mb-10 leading-tight">VIP INVESTOR<br />PITCH ARENA</h3>
                        <div className="space-y-8 text-white font-grotesk text-lg">
                            <div className="flex items-start">
                                <span className="text-gold mr-6 text-xl mt-1">▪</span>
                                <p><strong className="font-heading tracking-wider block mb-1 text-gold">CLOSED-DOOR NETWORKING</strong> Exclusive access to top-tier founders without the floor noise.</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-gold mr-6 text-xl mt-1">▪</span>
                                <p><strong className="font-heading tracking-wider block mb-1 text-gold">GUARANTEED DEAL FLOW</strong> Pre-vetted startups tailored to your thesis.</p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-gold mr-6 text-xl mt-1">▪</span>
                                <p><strong className="font-heading tracking-wider block mb-1 text-gold">THE 1,200</strong> Direct access to the top 1,200 surviving builders from the Gauntlet.</p>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => onOpenModal && onOpenModal('soon')} className="w-full mt-14 bg-gold bright text-pitchblack font-heading font-bold py-5 hover:bg-white transition-all duration-300 sharp tracking-[0.2em] text-sm hover:shadow-[0_0_25px_#D4AF37]">
                        APPLY FOR VIP PASS
                    </button>
                </div>
            </div>

        </div>
    </div>
</section>

    </>
  );
};

export default StartupExpo;
