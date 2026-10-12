import React from 'react';

const PreHackathon = () => {
  const activities = [
    { title: 'Workshop 1', type: 'Big', xp: '800 XP' },
    { title: 'LinkedIn Post', type: 'Small', xp: '100 XP' },
    { title: 'Weekly Chat 1', type: 'Medium', xp: '500 XP' },
    { title: 'Quiz 1', type: 'Small', xp: '100 XP' },
    { title: 'Meme war', type: 'Medium', xp: '500 XP' },
    { title: 'Fake product Launch', type: 'Big', xp: '800 XP' },
    { title: 'Drop your playlist', type: 'Small', xp: '100 XP' },
    { title: 'Most complex "Hello world"', type: 'Medium', xp: '500 XP' },
    { title: 'The $1000 rock pitch', type: 'Small', xp: '100 XP' },
    { title: 'Cold mail for your dream job', type: 'Medium', xp: '500 XP' },
    { title: 'Workshop 2', type: 'Big', xp: '800 XP' },
    { title: 'Drop your first project repo from GitHub', type: 'Small', xp: '100 XP' },
    { title: 'Hacker vs Machine', type: 'Medium', xp: '500 XP' },
    { title: 'Push notification trap', type: 'Small', xp: '100 XP' },
    { title: 'Explain to me like i am a 80 year old', type: 'Medium', xp: '500 XP' },
    { title: 'Cook a recipe', type: 'Medium', xp: '500 XP' },
    { title: '5 word billboard on Time Sqaure', type: 'Small', xp: '100 XP' },
    { title: 'Weekly chat 2', type: 'Medium', xp: '500 XP' },
    { title: 'HackSpace', type: 'Big', xp: '10,000 XP' },
    { title: 'GIF reaction war', type: 'Small', xp: '100 XP' },
    { title: '2 Truth, 1 Lie', type: 'Small', xp: '100 XP' },
    { title: 'What ifs', type: 'Medium', xp: '500 XP' },
    { title: 'Start, stop, continue', type: 'Small', xp: '100 XP' },
    { title: 'Weekly chat 3', type: 'Medium', xp: '500 XP' },
    { title: 'Become a tutor', type: 'Big', xp: '800 XP' },
    { title: 'Quiz 2', type: 'Small', xp: '100 XP' },
    { title: 'Explain to me like i am a 10 year old', type: 'Medium', xp: '500 XP' },
    { title: 'Quiz 3', type: 'Small', xp: '100 XP' },
    { title: 'Crisis PR', type: 'Medium', xp: '500 XP' },
    { title: 'Workshop 3', type: 'Big', xp: '800 XP' },
    { title: 'RST', type: 'Small', xp: '100 XP' },
    { title: 'Elevated Pitch', type: 'Medium', xp: '500 XP' },
    { title: 'The missing piece', type: 'Small', xp: '100 XP' },
    { title: 'Re-launch', type: 'Medium', xp: '500 XP' },
    { title: 'Boss fight', type: 'Big', xp: '800 XP' },
    { title: 'Quiz 4', type: 'Small', xp: '100 XP' },
    { title: 'GTM', type: 'Medium', xp: '500 XP' },
    { title: 'Unpopular opinion', type: 'Small', xp: '100 XP' },
    { title: 'Workshop 4', type: 'Big', xp: '800 XP' },
    { title: 'Weekly Chat 4', type: 'Medium', xp: '500 XP' }
  ];

  return (
    <section id="pre-hackathon" className="py-32 px-6 bg-pitchblack relative border-b border-gold/20 z-10">
      <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
              
              <div className="sticky top-32">
                  <div className="inline-block px-4 py-1 border border-gold text-gold font-heading text-xs tracking-[0.2em] mb-6">MANDATORY GAUNTLET PHASE</div>
                  <h2 className="text-4xl md:text-5xl text-white font-black mb-6 tracking-tighter uppercase leading-tight">
                      THE PRE-HACKATHON <span className="text-gold bright">GRIND.</span>
                  </h2>
                  
                  <p className="text-lightgrey font-grotesk text-lg leading-relaxed mb-6">
                      10,000 hackers enter. <span className="text-white font-bold">Only the Top 1,200 qualify for the final 36-hour Hackathon.</span><br/>
                      <span className="text-gold font-bold mt-3 block border-l-4 border-gold pl-4 py-2 bg-gold/5 text-sm uppercase tracking-wider">The Final 1,200 get an absolute guarantee:<br/>Assured Hiring or Investments.</span>
                  </p>
                  
                  <p className="text-lightgrey/80 font-grotesk text-base leading-relaxed mb-8">
                      To earn your spot in the arena, you must survive the 4-month Pre-Hackathon Activity Calendar. This isn't just a filter—it's a launchpad. By participating, all 10,000 hackers stand a chance to win prizes, earn real money, and level up their skills through high-stakes challenges.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-6 mb-8">
                      <div className="glass-card border border-gold/20 p-6 sharp relative overflow-hidden group hover:border-gold/50 transition-colors">
                          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                          <div className="text-gold font-heading text-3xl md:text-4xl font-black mb-2 relative z-10">10K</div>
                          <div className="text-lightgrey text-[10px] md:text-xs tracking-widest uppercase relative z-10">Start the Journey</div>
                      </div>
                      <div className="glass-card border border-[#E63946] p-6 sharp bg-[#E63946]/5 relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#E63946]/10 opacity-100 transition-opacity"></div>
                          <div className="text-[#E63946] font-heading text-3xl md:text-4xl font-black mb-2 relative z-10">1.2K</div>
                          <div className="text-lightgrey text-[10px] md:text-xs tracking-widest uppercase relative z-10">Survive to Finals</div>
                      </div>
                  </div>

                  <a href="#arena" className="sharp bg-gold bright hover:bg-white text-pitchblack font-heading font-bold py-4 px-8 inline-block transition-all duration-300 tracking-widest text-sm hover:shadow-[0_0_20px_#FFFFFF]">
                      VIEW LIVE LEADERBOARD
                  </a>
              </div>
              
              <div className="glass-card border border-gold/30 p-2 relative sharp z-10 gold-glow mt-12 lg:mt-0">
                  <div className="bg-obsidian w-full relative overflow-hidden border border-gold/10">
                      <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-pitchblack/50">
                          <h3 className="text-white font-heading font-bold text-lg tracking-widest">ACTIVITY CALENDAR</h3>
                          <span className="text-gold text-[10px] sm:text-xs font-heading tracking-[0.2em] border border-gold/50 px-2 py-1">4 MONTHS</span>
                      </div>
                      
                      <div className="overflow-x-auto h-[600px] overflow-y-auto custom-scrollbar">
                          <table className="w-full text-left border-collapse whitespace-nowrap">
                              <thead className="sticky top-0 bg-pitchblack/95 z-10">
                                  <tr className="border-b border-gold/30 text-gold font-heading text-xs tracking-widest uppercase">
                                      <th className="p-4">Activity</th>
                                      <th className="p-4 text-center">Type</th>
                                      <th className="p-4 text-right">Base XP</th>
                                  </tr>
                              </thead>
                              <tbody className="font-grotesk text-sm text-white">
                                  {activities.map((item, idx) => (
                                    <tr key={idx} className="border-b border-lightgrey/10 hover:bg-gold/5 transition-colors group">
                                        <td className="p-4 font-bold group-hover:text-gold transition-colors">{item.title}</td>
                                        <td className="p-4 text-center text-lightgrey/70 text-xs tracking-widest uppercase">{item.type}</td>
                                        <td className="p-4 text-right text-gold font-bold">{item.xp}</td>
                                    </tr>
                                  ))}
                              </tbody>
                          </table>
                      </div>
                      <div className="p-4 border-t border-gold/20 text-center bg-pitchblack/50">
                          <p className="text-lightgrey/50 text-[10px] font-heading tracking-widest uppercase">SCROLL TO VIEW ALL ACTIVITIES</p>
                      </div>
                  </div>
              </div>

          </div>
      </div>
    </section>
  );
};

export default PreHackathon;
