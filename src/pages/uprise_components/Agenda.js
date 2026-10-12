import React, { useState } from 'react';

const Agenda = () => {
  const [activeDay, setActiveDay] = useState(1);

  return (
    <section className="py-32 px-6 bg-pitchblack relative border-b border-gold/20 z-10">
      <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-20">
              <h2 className="text-4xl md:text-[3.5rem] text-white font-black mb-6 tracking-wider uppercase scramble-text">THE 36-HOUR TIMELINE</h2>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-20 border-b border-lightgrey/20">
              <button 
                onClick={() => setActiveDay(1)} 
                className={`bg-transparent px-10 py-5 font-heading text-xl font-bold border-b-2 tracking-widest ${activeDay === 1 ? 'border-gold text-gold transition-colors' : 'border-transparent text-lightgrey hover:text-white transition-colors'}`}>DAY 1: INITIATION</button>
              <button 
                onClick={() => setActiveDay(2)} 
                className={`bg-transparent px-10 py-5 font-heading text-xl font-bold border-b-2 tracking-widest ${activeDay === 2 ? 'border-gold text-gold transition-colors' : 'border-transparent text-lightgrey hover:text-white transition-colors'}`}>DAY 2: CLIMAX</button>
          </div>

          {/* Timeline Container */}
          <div className="relative py-10">
              {/* Glowing Gold Line */}
              <div className="absolute left-[20px] md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gold/50 shadow-[0_0_15px_#D4AF37]"></div>

              {/* Day 1 Content */}
              {activeDay === 1 && (
              <div id="day1-content" className="space-y-16">
                  {/* Node Left */}
                  <div className="flex flex-col md:flex-row justify-between items-center w-full relative reveal">
                      <div className="hidden md:block md:w-5/12"></div>
                      <div className="absolute left-[13px] md:left-1/2 transform md:-translate-x-1/2 z-20 w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_#D4AF37]"></div>
                      <div className="w-full md:w-5/12 pl-12 md:pl-0">
                          <div className="glass-card p-8 sharp border border-gold/30 text-left hover:bg-white/5 transition-colors">
                              <div className="flex items-center gap-3 mb-4">
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-white text-pitchblack tracking-wider">09:00 AM</span>
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-[#333333] text-white tracking-wider">[HACKATHON]</span>
                              </div>
                              <h4 className="text-white text-2xl font-bold mb-3 font-heading">GATES OPEN</h4>
                              <p className="text-lightgrey text-base font-grotesk leading-relaxed">The top 1,200 hackers check into the arena. Workspace allocation.</p>
                          </div>
                      </div>
                  </div>

                  {/* Node Right */}
                  <div className="flex flex-col md:flex-row-reverse justify-between items-center w-full relative reveal">
                      <div className="hidden md:block md:w-5/12"></div>
                      <div className="absolute left-[13px] md:left-1/2 transform md:-translate-x-1/2 z-20 w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_#D4AF37]"></div>
                      <div className="w-full md:w-5/12 pl-12 md:pl-0 text-left md:text-right">
                          <div className="glass-card p-8 sharp border border-gold/30 hover:bg-white/5 transition-colors">
                              <div className="flex flex-row md:flex-row-reverse items-center gap-3 mb-4">
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-white text-pitchblack tracking-wider">11:00 AM</span>
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-gold text-pitchblack tracking-wider">[STARTUP EXPO]</span>
                              </div>
                              <h4 className="text-white text-2xl font-bold mb-3 font-heading">EXPO INAUGURATION</h4>
                              <p className="text-lightgrey text-base font-grotesk leading-relaxed">Booths go live. Investor lounges open for closed-door meetings.</p>
                          </div>
                      </div>
                  </div>

                  {/* Node Left */}
                  <div className="flex flex-col md:flex-row justify-between items-center w-full relative reveal">
                      <div className="hidden md:block md:w-5/12"></div>
                      <div className="absolute left-[13px] md:left-1/2 transform md:-translate-x-1/2 z-20 w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_#D4AF37]"></div>
                      <div className="w-full md:w-5/12 pl-12 md:pl-0">
                          <div className="glass-card p-8 sharp border border-gold/30 text-left hover:bg-white/5 transition-colors">
                              <div className="flex items-center gap-3 mb-4">
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-white text-pitchblack tracking-wider">12:00 PM</span>
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-[#333333] text-white tracking-wider">[HACKATHON]</span>
                              </div>
                              <h4 className="text-white text-2xl font-bold mb-3 font-heading">HACKING COMMENCES</h4>
                              <p className="text-lightgrey text-base font-grotesk leading-relaxed">The 36-hour timer begins. No sleep. Pure code.</p>
                          </div>
                      </div>
                  </div>
              </div>
              )}

              {/* Day 2 Content */}
              {activeDay === 2 && (
              <div id="day2-content" className="space-y-16">
                  {/* Node Right */}
                  <div className="flex flex-col md:flex-row-reverse justify-between items-center w-full relative reveal">
                      <div className="hidden md:block md:w-5/12"></div>
                      <div className="absolute left-[13px] md:left-1/2 transform md:-translate-x-1/2 z-20 w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_#D4AF37]"></div>
                      <div className="w-full md:w-5/12 pl-12 md:pl-0 text-left md:text-right">
                          <div className="glass-card p-8 sharp border border-gold/30 hover:bg-white/5 transition-colors">
                              <div className="flex flex-row md:flex-row-reverse items-center gap-3 mb-4">
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-white text-pitchblack tracking-wider">12:00 AM</span>
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-[#333333] text-white tracking-wider">[HACKATHON]</span>
                              </div>
                              <h4 className="text-white text-2xl font-bold mb-3 font-heading">MIDNIGHT SURVIVAL</h4>
                              <p className="text-lightgrey text-base font-grotesk leading-relaxed">Surprise technical challenges drop. Double points for completion.</p>
                          </div>
                      </div>
                  </div>

                  {/* Node Left */}
                  <div className="flex flex-col md:flex-row justify-between items-center w-full relative reveal">
                      <div className="hidden md:block md:w-5/12"></div>
                      <div className="absolute left-[13px] md:left-1/2 transform md:-translate-x-1/2 z-20 w-4 h-4 bg-gold rounded-full shadow-[0_0_20px_#D4AF37]"></div>
                      <div className="w-full md:w-5/12 pl-12 md:pl-0">
                          <div className="glass-card p-8 sharp border border-gold/30 text-left hover:bg-white/5 transition-colors">
                              <div className="flex items-center gap-3 mb-4">
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold bg-white text-pitchblack tracking-wider">04:00 PM</span>
                                  <span className="inline-block px-3 py-1 text-[10px] font-heading font-bold border border-white text-white tracking-wider">[AWARDS]</span>
                              </div>
                              <h4 className="text-white text-2xl font-bold mb-3 font-heading">THE UPRISE AWARDS</h4>
                              <p className="text-lightgrey text-base font-grotesk leading-relaxed">Main stage event. Honoring the relentless builders and visionaries.</p>
                          </div>
                      </div>
                  </div>
              </div>
              )}
          </div>
      </div>
    </section>
  );
};

export default Agenda;
