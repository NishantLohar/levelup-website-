import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [activeBoard, setActiveBoard] = useState('hackers');
  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);

  const cutoffs = {
    hackers: { cutoff: 1200, cutoffText: "DANGER ZONE CUTOFF" },
    levelup: { cutoff: 50, cutoffText: "VIP PASS CUTOFF" },
    college: { cutoff: 10, cutoffText: "INCUBATION CUTOFF" }
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';

    fetch(`${API_BASE_URL}/api/v1/uprise/leaderboard?role=${activeBoard}&limit=100`)
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          if (data.status === 'success' && Array.isArray(data.leaderboard)) {
            setBoardData(data.leaderboard);
          } else {
            setBoardData([]);
          }
          setLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          console.error("Leaderboard fetch error:", err);
          setBoardData([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [activeBoard]);

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
            <td className="p-6 tracking-wide font-bold">{row.name}</td>
            <td className="p-6 text-lightgrey text-sm tracking-widest uppercase">{row.organization || row.role || 'Participant'}</td>
            <td className={`p-6 text-right ${scoreColor}`}>{row.total_xp ? `${row.total_xp.toLocaleString()} XP` : '0 XP'}</td>
        </tr>
    );
  };

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
                          {loading ? (
                            <tr>
                              <td colSpan="4" className="py-24 px-6 text-center whitespace-normal">
                                <div className="flex items-center justify-center gap-3 text-gold font-heading tracking-widest uppercase text-sm">
                                  <span className="inline-block animate-pulse text-lg">✦</span>
                                  <span>SYNCHRONIZING LIVE ARENA SCORES...</span>
                                </div>
                              </td>
                            </tr>
                          ) : boardData.length === 0 ? (
                            <tr>
                              <td colSpan="4" className="py-24 px-6 text-center whitespace-normal">
                                <div className="max-w-xl mx-auto flex flex-col items-center justify-center text-center">
                                  <div className="text-gold font-heading text-xl md:text-2xl font-bold mb-3 tracking-widest uppercase">
                                    AWAITING ARENA ACTIVITY
                                  </div>
                                  <p className="text-xs md:text-sm text-lightgrey/70 uppercase tracking-wider leading-relaxed text-center">
                                    Live rankings and XP scores will be displayed here in real time as participants complete challenges and earn points.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            boardData.map(row => {
                              let html = [];
                              if (row.rank === cutoffs[activeBoard].cutoff + 1) {
                                html.push(
                                  <tr key="cutoff">
                                    <td colSpan="4" className="p-0">
                                        <div className="w-full bg-danger text-pitchblack font-heading font-black text-center py-4 uppercase tracking-[0.2em] text-xs md:text-sm danger-glow relative overflow-hidden">
                                            <div className="absolute inset-0 opacity-20">
                                                <div className="w-[200%] h-full" style={{background: 'repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 20px)'}}></div>
                                            </div>
                                            <span className="relative z-10">{cutoffs[activeBoard].cutoffText}</span>
                                        </div>
                                    </td>
                                </tr>
                                );
                              }
                              html.push(renderGenericRow(row, cutoffs[activeBoard].cutoff));
                              return html;
                            })
                          )}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
    </section>
  );
};

export default Leaderboard;
