import React, { useState } from 'react';

const Leaderboard = () => {
  const [activeBoard, setActiveBoard] = useState('hackers');
  const [visibleLimits, setVisibleLimits] = useState({ hackers: 10, levelup: 10, college: 10 });

  const getHackersData = () => {
    let data = [];
    for(let i=1; i<=200; i++) {
        data.push({
            rank: i,
            col2: i === 1 ? 'Karan S.' : i === 2 ? 'Priya M.' : i === 3 ? 'Nexus Team' : `Hacker_${i}`,
            col3: ['Edge AI', 'Blockchain', 'AI / ML', 'Cybersecurity'][i%4],
            col4: Math.max(0, 10000 - (i * 5)).toLocaleString()
        });
    }
    return data;
  };

  const getLevelupData = () => {
    let data = [];
    for(let i=1; i<=100; i++) {
        data.push({
            rank: i,
            col2: i === 1 ? 'DevSquad' : i === 2 ? 'Archangel AI' : i === 3 ? 'TechTitans' : `Builder_${i}`,
            col3: `Level ${Math.max(1, 50 - Math.floor(i/10))}`,
            col4: (120400 - (i * 200)).toLocaleString() + ' XP'
        });
    }
    return data;
  };

  const getCollegeData = () => {
    let data = [];
    for(let i=1; i<=50; i++) {
        data.push({
            rank: i,
            col2: i === 1 ? 'SRM Hack Club' : i === 2 ? 'VIT Open Source' : i === 3 ? 'IIT-B Tech Nexus' : `Community_${i}`,
            col3: ['SRM, Chennai', 'VIT, Vellore', 'IIT Bombay', 'BITS Pilani'][i%4],
            col4: Math.max(0, 850 - (i * 4)).toLocaleString()
        });
    }
    return data;
  };

  const boards = {
    hackers: { data: getHackersData(), cutoff: 1200, cutoffText: "DANGER ZONE CUTOFF" },
    levelup: { data: getLevelupData(), cutoff: 50, cutoffText: "VIP PASS CUTOFF" },
    college: { data: getCollegeData(), cutoff: 10, cutoffText: "INCUBATION CUTOFF" }
  };

  const loadMore = (boardId) => {
    setVisibleLimits(prev => ({ ...prev, [boardId]: prev[boardId] + 50 }));
  };

  const renderGenericRow = (row, cutoff) => {
    let classes = "";
    let rankColor = "";
    let scoreColor = "";
    let isDanger = row.rank > cutoff;

    if (row.rank === 1) {
        classes = "border-b border-gold/20 bg-gradient-to-r from-[#FFD700]/20 to-transparent hover:bg-[#FFD700]/30 transition-colors";
        rankColor = "text-[#FFD700] text-2xl font-black";
        scoreColor = "text-[#FFD700] font-bold";
    } else if (row.rank === 2) {
        classes = "border-b border-gold/20 bg-gradient-to-r from-[#C0C0C0]/10 to-transparent hover:bg-[#C0C0C0]/20 transition-colors";
        rankColor = "text-[#C0C0C0] text-2xl font-black";
        scoreColor = "text-[#C0C0C0] font-bold";
    } else if (row.rank === 3) {
        classes = "border-b border-gold/20 bg-gradient-to-r from-[#CD7F32]/10 to-transparent hover:bg-[#CD7F32]/20 transition-colors";
        rankColor = "text-[#CD7F32] text-2xl font-black";
        scoreColor = "text-[#CD7F32] font-bold";
    } else if (isDanger) {
        classes = "border-b border-danger/20 text-white/30 hover:bg-danger/5 transition-colors bg-pitchblack/60";
        rankColor = "text-danger opacity-70";
        scoreColor = "text-danger/70";
    } else {
        classes = "border-b border-gold/20 bg-gold/5 hover:bg-gold/10 transition-colors";
        rankColor = "text-gold bright";
        scoreColor = "";
        if (row.rank === cutoff) {
            classes = "border-b border-gold/30 bg-gold/10 hover:bg-gold/20 transition-colors shadow-[inset_0_0_15px_rgba(212,175,55,0.2)]";
            scoreColor = "text-gold bright font-bold";
        }
    }

    return (
        <tr key={row.rank} className={classes}>
            <td className={`p-6 font-heading ${rankColor}`}>#{row.rank}</td>
            <td className="p-6 tracking-wide">{row.col2}</td>
            <td className="p-6 text-lightgrey text-sm tracking-widest uppercase">{row.col3}</td>
            <td className={`p-6 text-right ${scoreColor}`}>{row.col4}</td>
        </tr>
    );
  };

  const currentData = boards[activeBoard].data.slice(0, visibleLimits[activeBoard]);

  return (
    <section id="arena" className="py-32 px-6 bg-obsidian relative border-b border-gold/20">
      <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-white font-black mb-6 tracking-wider leading-tight">
                  10,000 ENTER. <span className="text-gold bright">1,200 SURVIVE.</span><br/>
                  WHERE DO YOU STAND?
              </h2>
              <p className="text-lightgrey font-grotesk tracking-[0.3em] text-sm uppercase">THE GAUNTLET LEADERBOARDS (LIVE)</p>
          </div>

          <div className="flex flex-wrap justify-center mb-12 border-b border-lightgrey/20">
              <button onClick={() => setActiveBoard('hackers')} className={`bg-transparent px-4 md:px-8 py-4 font-heading text-xs md:text-sm font-bold border-b-2 transition-colors tracking-widest uppercase ${activeBoard === 'hackers' ? 'border-gold text-gold' : 'border-transparent text-lightgrey hover:text-white'}`}>UPRISE HACKERS</button>
              <button onClick={() => setActiveBoard('levelup')} className={`bg-transparent px-4 md:px-8 py-4 font-heading text-xs md:text-sm font-bold border-b-2 transition-colors tracking-widest uppercase ${activeBoard === 'levelup' ? 'border-gold text-gold' : 'border-transparent text-lightgrey hover:text-white'}`}>LEVELUP BUILDERS</button>
              <button onClick={() => setActiveBoard('college')} className={`bg-transparent px-4 md:px-8 py-4 font-heading text-xs md:text-sm font-bold border-b-2 transition-colors tracking-widest uppercase ${activeBoard === 'college' ? 'border-gold text-gold' : 'border-transparent text-lightgrey hover:text-white'}`}>COLLEGE COMMUNITIES</button>
          </div>

          <div className="glass-card sharp overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] board-content">
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                          <tr className="border-b border-gold/30 bg-pitchblack/80 text-gold font-heading text-xs tracking-widest uppercase">
                              <th className="p-6 w-24">Rank</th>
                              <th className="p-6">Name</th>
                              <th className="p-6">Details</th>
                              <th className="p-6 text-right">Score/XP</th>
                          </tr>
                      </thead>
                      <tbody className="font-grotesk font-semibold text-lg text-white">
                          {currentData.map(row => {
                            let html = [];
                            if (row.rank === boards[activeBoard].cutoff + 1) {
                              html.push(
                                <tr key="cutoff">
                                  <td colSpan="4" className="p-0">
                                      <div className="w-full bg-danger text-pitchblack font-heading font-black text-center py-4 uppercase tracking-[0.2em] text-xs md:text-sm danger-glow relative overflow-hidden">
                                          <div className="absolute inset-0 opacity-20">
                                              <div className="w-[200%] h-full" style={{background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)'}}></div>
                                          </div>
                                          <span className="relative z-10">{boards[activeBoard].cutoffText}</span>
                                      </div>
                                  </td>
                              </tr>
                              );
                            }
                            html.push(renderGenericRow(row, boards[activeBoard].cutoff));
                            return html;
                          })}
                      </tbody>
                  </table>
              </div>
              {visibleLimits[activeBoard] < boards[activeBoard].data.length && (
              <div className="p-6 text-center border-t border-gold/20 bg-pitchblack/50">
                  <button onClick={() => loadMore(activeBoard)} className="px-8 py-3 bg-transparent border border-gold text-gold font-heading text-xs tracking-[0.2em] hover:bg-gold hover:text-pitchblack transition-colors sharp font-bold">SHOW 50 MORE</button>
              </div>
              )}
          </div>
      </div>
    </section>
  );
};

export default Leaderboard;
