import '../Uprise.css';
import React, { useState, useEffect } from 'react';

const Leaderboard = ({ initialBoard, isStandalone = false }) => {
  const [activeBoard, setActiveBoard] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const b = params.get('board') || params.get('tab') || params.get('role');
      if (b && ['hackers', 'levelup', 'college'].includes(b.toLowerCase())) {
        return b.toLowerCase();
      }
    }
    return initialBoard || 'hackers';
  });

  const [boardData, setBoardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const cutoffs = {
    hackers: { cutoff: 1200, cutoffText: "DANGER ZONE CUTOFF" },
    levelup: { cutoff: 50, cutoffText: "VIP PASS CUTOFF" },
    college: { cutoff: 10, cutoffText: "INCUBATION CUTOFF" }
  };

  // Sync if initialBoard changes
  useEffect(() => {
    if (initialBoard && ['hackers', 'levelup', 'college'].includes(initialBoard.toLowerCase())) {
      setActiveBoard(initialBoard.toLowerCase());
    }
  }, [initialBoard]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setShowAll(false);

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

  const handleBoardChange = (board) => {
    if (board !== activeBoard) {
      setActiveBoard(board);
      setShowAll(false);
      if (typeof window !== 'undefined' && window.location.pathname.includes('leaderboard')) {
        const url = new URL(window.location);
        url.searchParams.set('board', board);
        window.history.replaceState({}, '', url);
      }
    }
  };

  const handleShare = async () => {
    const origin = window.location.origin;
    const shareUrl = `${origin}/leaderboard?board=${activeBoard}`;
    const boardTitle = activeBoard === 'hackers' 
      ? 'Uprise Hackers' 
      : activeBoard === 'levelup' 
      ? 'LevelUp Builders' 
      : 'College Communities';
    const shareTitle = `LevelUp Uprise Leaderboard - ${boardTitle}`;
    const shareText = `Check out the live Gauntlet Leaderboard rankings for ${boardTitle} on LevelUp Uprise!`;

    // Try Web Share API (mobile native sharing)
    if (navigator.share && window.isSecureContext) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.log('Share fallback to clipboard:', err);
        } else {
          return; // User canceled share sheet
        }
      }
    }

    // Fallback: Copy to clipboard
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    } catch (e) {
      console.error("Clipboard copy failed:", e);
    }
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
            <td className="p-6 tracking-wide font-bold">{row.name}</td>
            <td className="p-6 text-lightgrey text-sm tracking-widest uppercase">{row.organization || row.role || 'Participant'}</td>
            <td className={`p-6 text-right ${scoreColor}`}>{row.total_xp ? `${row.total_xp.toLocaleString()} XP` : '0 XP'}</td>
        </tr>
    );
  };

  const displayedData = showAll ? boardData : boardData.slice(0, 10);

  return (
    <section id="arena" className="py-24 md:py-32 px-6 bg-obsidian relative border-b border-gold/20">
      {/* Toast Notification for Share Link Copy */}
      {copiedToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[99999] px-6 py-3.5 bg-pitchblack border-2 border-gold text-gold font-heading font-black tracking-widest text-xs uppercase gold-glow shadow-[0_0_30px_rgba(212,175,55,0.6)] flex items-center gap-3">
          <span className="text-base">📋</span>
          <span>LEADERBOARD LINK COPIED TO CLIPBOARD!</span>
        </div>
      )}

      <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl text-white font-black mb-6 tracking-wider leading-tight">
                  10,000 ENTER. <span className="text-gold bright">1,200 SURVIVE.</span><br/>
                  WHERE DO YOU STAND?
              </h2>
              <p className="text-lightgrey font-grotesk tracking-[0.3em] text-sm uppercase">THE GAUNTLET LEADERBOARDS (LIVE)</p>
          </div>

          {/* Category Tabs and Share Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 border-b border-lightgrey/20 pb-4">
              <div className="flex flex-wrap justify-center sm:justify-start">
                  <button onClick={() => handleBoardChange('hackers')} className={`bg-transparent px-4 md:px-8 py-4 font-heading text-xs md:text-sm font-bold border-b-2 transition-colors tracking-widest uppercase ${activeBoard === 'hackers' ? 'border-gold text-gold' : 'border-transparent text-lightgrey hover:text-white'}`}>UPRISE HACKERS</button>
                  <button onClick={() => handleBoardChange('levelup')} className={`bg-transparent px-4 md:px-8 py-4 font-heading text-xs md:text-sm font-bold border-b-2 transition-colors tracking-widest uppercase ${activeBoard === 'levelup' ? 'border-gold text-gold' : 'border-transparent text-lightgrey hover:text-white'}`}>LEVELUP BUILDERS</button>
                  <button onClick={() => handleBoardChange('college')} className={`bg-transparent px-4 md:px-8 py-4 font-heading text-xs md:text-sm font-bold border-b-2 transition-colors tracking-widest uppercase ${activeBoard === 'college' ? 'border-gold text-gold' : 'border-transparent text-lightgrey hover:text-white'}`}>COLLEGE COMMUNITIES</button>
              </div>

              {/* Share Leaderboard Button */}
              <button
                  onClick={handleShare}
                  className="cursor-pointer px-5 py-3 bg-gold/10 hover:bg-gold text-gold hover:text-pitchblack border border-gold font-heading text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] flex items-center gap-2 group whitespace-nowrap self-center sm:self-auto"
                  title="Share Live Leaderboard Link"
              >
                  <svg 
                      className="w-4 h-4 transition-transform group-hover:scale-110" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                  >
                      <circle cx="18" cy="5" r="3"></circle>
                      <circle cx="6" cy="12" r="3"></circle>
                      <circle cx="18" cy="19" r="3"></circle>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>{copiedToast ? 'LINK COPIED! ✓' : 'SHARE LEADERBOARD'}</span>
              </button>
          </div>

          <div className="glass-card sharp overflow-hidden border border-gold/30 shadow-[0_0_30px_rgba(0,0,0,0.8)] board-content">
              <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse whitespace-nowrap">
                      <thead>
                          <tr className="border-b border-gold/30 bg-pitchblack/80 text-gold font-heading text-xs tracking-widest uppercase">
                              <th className="p-6 w-24">Rank</th>
                              <th className="p-6">Name</th>
                              <th className="p-6">Organisation</th>
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
                            displayedData.map(row => {
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

              {!loading && boardData.length > 10 && (
                  <div className="p-6 text-center border-t border-gold/20 bg-pitchblack/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-lightgrey font-grotesk text-xs tracking-widest uppercase">
                          {showAll 
                              ? `SHOWING ALL ${boardData.length} CONTENDERS` 
                              : `SHOWING TOP 10 OF ${boardData.length} CONTENDERS`
                          }
                      </span>
                      <div className="flex items-center gap-3 flex-wrap justify-center">
                          <button 
                              onClick={handleShare}
                              className="cursor-pointer px-5 py-3 bg-transparent border border-gold/40 text-gold hover:bg-gold hover:text-pitchblack font-heading text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2"
                              title="Share this Leaderboard"
                          >
                              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <circle cx="18" cy="5" r="3"></circle>
                                  <circle cx="6" cy="12" r="3"></circle>
                                  <circle cx="18" cy="19" r="3"></circle>
                                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                              </svg>
                              <span>{copiedToast ? 'COPIED! ✓' : 'SHARE'}</span>
                          </button>
                          <button 
                              onClick={() => setShowAll(prev => !prev)}
                              className="cursor-pointer px-8 py-3 bg-transparent border border-gold text-gold hover:bg-gold hover:text-pitchblack font-heading text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.15)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] flex items-center gap-2"
                          >
                              {showAll ? (
                                  <>
                                      <span>SHOW LESS</span>
                                      <span className="text-xs">▲</span>
                                  </>
                              ) : (
                                  <>
                                      <span>SEE MORE</span>
                                      <span className="text-xs">▼</span>
                                  </>
                              )}
                          </button>
                      </div>
                  </div>
              )}
          </div>
      </div>
    </section>
  );
};

export default Leaderboard;
