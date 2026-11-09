import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UpriseNavbar from './uprise_components/UpriseNavbar';
import UpriseLoginModal from './uprise_components/UpriseLoginModal';
import UpriseProfileShareModal from './uprise_components/UpriseProfileShareModal';
import './Uprise.css';

// Mapping of task keys to human-friendly titles, categories, and default XP values
export const TASK_INFO_MAP = {
  // Social Follows & Channels
  'instagram': { title: 'Follow @levelupofficial.in on Instagram', xp: 20, category: 'Social Follow' },
  'youtube': { title: 'Subscribe to LevelUp Official on YouTube', xp: 20, category: 'Social Follow' },
  'linkedin': { title: 'Follow LevelUp Events on LinkedIn', xp: 20, category: 'Social Follow' },
  'whatsapp': { title: 'Join Official LevelUp WhatsApp Community', xp: 40, category: 'Community' },
  'uprise_whatsapp': { title: 'Join Uprise Official WhatsApp Group', xp: 40, category: 'Community' },
  'community_whatsapp': { title: 'Join LevelUp Community WhatsApp Group', xp: 40, category: 'Community' },
  'discord': { title: 'Join LevelUp Discord Server', xp: 40, category: 'Community' },
  'instagram_story': { title: 'Share Story & Tag @levelupofficial.in', xp: 20, category: 'Social Share' },
  'linkedin_post': { title: 'Share Banner Post on LinkedIn', xp: 30, category: 'Social Share' },
  
  // Platform & Missions
  'student_profile': { title: 'Complete Student Profile on LevelUp SaaS', xp: 20, category: 'Platform' },
  'hunt_404': { title: '404 Cyber Hunt Mission Discovered', xp: 70, category: 'Easter Egg' },
  'discord_rollcall': { title: 'Discord Rollcall Verified Check-in', xp: 100, category: 'Discord' },
  'bounty_hunter': { title: 'Bounty Hunter Feature / Bug Submission', xp: 500, category: 'Bounty' },
  'the_veteran': { title: 'The Veteran Event Participation', xp: 50, category: 'Milestone' },
  'architects_review': { title: "Architect's System Architecture Review", xp: 50, category: 'Milestone' },
  'github_audit': { title: 'GitHub Repository Audit & Drop', xp: 30, category: 'Dev Mission' },
  'dom_manipulation': { title: 'DOM Manipulation DevTools Mission', xp: 35, category: 'Dev Mission' },
  'skill_test_mission': { title: 'Skill Test Gauntlet Challenge Completed', xp: 40, category: 'Skill' },
  'ai_interview_mission': { title: 'AI Technical Interview Simulation', xp: 50, category: 'Skill' },
  'post_meme_mission': { title: 'Meme War Post On Discord', xp: 20, category: 'Community' },

  // Quizzes
  'package_manager_quiz': { title: 'Package Manager Terminal Quiz Solved', xp: 25, category: 'Terminal Quiz' },
  'terminal_navigator_quiz': { title: 'Terminal Navigator Quiz Solved', xp: 25, category: 'Terminal Quiz' },
  'the_css_center': { title: 'CSS Centering Flexbox Quiz Solved', xp: 25, category: 'CSS Quiz' },

  // Official Club Activities
  'club_spartan_100': { title: '100 Spartan Challenge (100 Registrations)', xp: 10000, category: 'Club Activity' },
  'club_hack_initiation': { title: 'Hack Initiation Campus Hackathon', xp: 15000, category: 'Club Activity' },
  'club_cross_campus': { title: 'Cross-Campus Stage Co-Host on Discord', xp: 2000, category: 'Club Activity' },
  'club_pitch_simulation': { title: 'Pitch Simulation Founders Event', xp: 20000, category: 'Club Activity' },
  'club_golden_ticket': { title: 'Golden Ticket Offline Pass Distribution', xp: 5000, category: 'Club Activity' },
  'club_social_drop': { title: 'Instagram & LinkedIn Campus Broadcast Drop', xp: 800, category: 'Club Activity' },
  'club_guerilla_tag': { title: 'Guerilla Tag Offline Campus Campaign', xp: 1500, category: 'Club Activity' },
  'club_problem_solver': { title: 'Problem Solver Campus Solution Session', xp: 2500, category: 'Club Activity' },
  'club_strength_share': { title: 'Strength Share Network Broadcast', xp: 800, category: 'Club Activity' },
  'club_48h_infiltration': { title: 'The 48-Hour Infiltration Blitz Activation', xp: 250, category: 'Club Activity' },
  'club_startup_teardown': { title: 'Startup Teardown Technical Dissection', xp: 8000, category: 'Club Activity' },
  'club_plan_event': { title: 'Plan An Event Campus Proposal Confirmed', xp: 5000, category: 'Club Activity' },
};

const UpriseProfilePage = () => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem('uprise_user') || sessionStorage.getItem('uprise_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [activeTab, setActiveTab] = useState('missions'); // 'missions' | 'referrals' | 'overview'

  const handleLogout = () => {
    localStorage.removeItem('uprise_user');
    sessionStorage.removeItem('uprise_user');
    localStorage.removeItem('uprise_remember_me');
    localStorage.removeItem('uprise_remembered_email');
    setCurrentUser(null);
  };

  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    setIsLoginModalOpen(false);
  };

  // Live Sync with Backend
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!currentUser?.email) return;

    let isMounted = true;
    setLoading(true);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';
    fetch(`${API_BASE_URL}/api/v1/uprise/user-status?email=${encodeURIComponent(currentUser.email)}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && data.user) {
          const merged = {
            ...currentUser,
            ...data.user,
            claimed_tasks: data.user.claimed_tasks || currentUser.claimed_tasks || [],
            claimed_tasks_details: data.user.claimed_tasks_details || currentUser.claimed_tasks_details || [],
            referral_count: data.user.referral_count ?? currentUser.referral_count ?? 0,
            referrals_list: data.user.referrals_list || currentUser.referrals_list || [],
            rank: data.user.rank || currentUser.rank || '—'
          };
          setCurrentUser(merged);

          try {
            if (localStorage.getItem('uprise_user')) {
              localStorage.setItem('uprise_user', JSON.stringify(merged));
            } else {
              sessionStorage.setItem('uprise_user', JSON.stringify(merged));
            }
          } catch (e) {}
        }
      })
      .catch(err => console.error('Profile fetch error:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.email]);

  const couponCode = currentUser?.coupon_code || '';
  const totalXp = currentUser?.total_xp ?? 0;
  const liveRank = currentUser?.rank ?? '—';
  const referralCount = currentUser?.referral_count ?? 0;
  const referralsList = currentUser?.referrals_list || [];

  // Parse claimed tasks
  const rawClaimed = currentUser?.claimed_tasks || [];
  const detailedClaims = currentUser?.claimed_tasks_details || [];
  const detailedMap = new Map();
  detailedClaims.forEach(item => {
    if (item && item.task_key) detailedMap.set(item.task_key, item);
  });

  const completedTaskList = rawClaimed.map(key => {
    const detail = detailedMap.get(key);
    const meta = TASK_INFO_MAP[key] || {
      title: key.replace(/_/g, ' ').toUpperCase(),
      xp: detail?.xp_awarded || 20,
      category: 'Mission'
    };
    return {
      key,
      title: meta.title,
      xp: detail?.xp_awarded || meta.xp,
      category: meta.category,
      claimed_at: detail?.claimed_at || null
    };
  });

  const handleCopyCoupon = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    }
  };

  return (
    <div className="bg-obsidian min-h-screen text-white font-grotesk overflow-x-hidden relative selection:bg-gold/30 selection:text-gold flex flex-col justify-between">
      {/* Background Spotlight Effect */}
      <div 
        className="fixed inset-0 pointer-events-none z-0" 
        style={{
          background: 'radial-gradient(circle 900px at 50% 15%, rgba(212, 175, 55, 0.09), transparent 85%)'
        }}
      ></div>

      {/* Top Navbar */}
      <UpriseNavbar 
        user={currentUser} 
        onOpenLogin={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout} 
      />

      {/* Main Full Page Content */}
      <main className="relative z-10 pt-24 pb-20 flex-grow max-w-6xl mx-auto px-4 sm:px-6 w-full">
        {/* Navigation Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <Link 
            to="/uprise" 
            className="inline-flex items-center gap-2 text-xs font-heading font-bold text-gold hover:text-white uppercase tracking-widest transition-colors py-2 px-4 border border-gold/40 hover:border-gold bg-black shadow-[0_0_10px_rgba(212,175,55,0.2)]"
          >
            <span>←</span>
            <span>BACK TO UPRISE SUMMIT</span>
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <button 
              type="button"
              onClick={() => {
                if (!currentUser) {
                  setIsLoginModalOpen(true);
                } else {
                  setIsShareModalOpen(true);
                }
              }}
              className="inline-flex items-center gap-2 text-xs font-heading font-black text-black hover:text-black uppercase tracking-widest transition-all py-2 px-4 bg-gold hover:bg-gold-light border border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              <span>SHARE PROFILE</span>
            </button>
            <Link 
              to="/pre-hackathon" 
              className="inline-flex items-center gap-2 text-xs font-heading font-bold text-lightgrey hover:text-gold uppercase tracking-widest transition-colors py-2 px-4 border border-gold/30 hover:border-gold bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              <span>MISSIONS & TASKS</span>
              <span>→</span>
            </Link>
            <Link 
              to="/leaderboard" 
              className="inline-flex items-center gap-2 text-xs font-heading font-bold text-lightgrey hover:text-gold uppercase tracking-widest transition-colors py-2 px-4 border border-gold/30 hover:border-gold bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]"
            >
              <span>LEADERBOARD</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* User Not Logged In State */}
        {!currentUser ? (
          <div className="p-10 sm:p-14 border border-gold/30 bg-pitchblack/80 text-center max-w-xl mx-auto shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <div className="w-16 h-16 rounded-full border-2 border-gold/50 bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6 text-2xl shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              🔒
            </div>
            <h2 className="text-2xl font-heading font-black text-white uppercase tracking-wider mb-3">
              Participant Profile Locked
            </h2>
            <p className="text-sm text-lightgrey leading-relaxed mb-8 font-mono">
              Please sign in with your registered email to view your personal dashboard, track who used your referral code, and review all XP claimed from your missions.
            </p>
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="py-3.5 px-8 bg-gold hover:bg-gold-light text-black font-heading font-black text-sm uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(212,175,55,0.5)] cursor-pointer"
            >
              SIGN IN TO ACCESS DASHBOARD →
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* 1. Header Profile Banner */}
            <div className="p-6 sm:p-8 bg-pitchblack/80 border border-gold/40 shadow-[0_0_40px_rgba(212,175,55,0.15)] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-gold bg-[#050505] flex items-center justify-center text-gold shadow-[0_0_25px_rgba(212,175,55,0.35)] flex-shrink-0">
                  <svg className="w-8 h-8 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h1 className="text-2xl sm:text-3xl font-heading font-black text-white uppercase tracking-wider">
                      {currentUser.full_name || currentUser.email?.split('@')[0]}
                    </h1>
                    <span className="text-[10px] font-heading font-bold px-2.5 py-1 border border-gold text-gold bg-gold/10 tracking-widest uppercase">
                      {currentUser.role === 'club' ? 'COLLEGE CLUB' : 'UPRISE HACKER'}
                    </span>
                    {loading && (
                      <span className="text-xs text-gold/80 font-mono animate-pulse flex items-center gap-1">
                        <span className="animate-spin text-sm">⟳</span> Syncing stats...
                      </span>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-lightgrey font-mono tracking-wider mt-1">
                    {currentUser.email}
                  </span>
                  {currentUser.organization && (
                    <span className="text-xs text-gold/80 font-mono tracking-wide mt-1">
                      🏛️ {currentUser.organization}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-3 self-start md:self-auto flex-wrap">
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(true)}
                  className="py-2.5 px-4 bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 shadow-[0_0_12px_rgba(212,175,55,0.25)]"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                  <span>SHARE CARD</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="py-2.5 px-4 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  SIGN OUT
                </button>
              </div>
            </div>

            {/* 2. Top Stats Overview Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Total XP Card */}
              <div className="p-5 sm:p-6 bg-pitchblack/70 border border-gold/30 flex flex-col justify-between shadow-[0_0_20px_rgba(212,175,55,0.08)]">
                <div className="flex items-center justify-between text-lightgrey mb-2">
                  <span className="text-[11px] font-heading font-bold tracking-widest uppercase">TOTAL XP</span>
                  <span className="text-base text-gold">🏆</span>
                </div>
                <div className="text-2xl sm:text-4xl font-heading font-black text-gold tracking-wider">
                  {totalXp.toLocaleString()} <span className="text-xs sm:text-sm font-bold text-gold/80">XP</span>
                </div>
                <div className="mt-2 text-[10px] font-mono text-lightgrey">
                  Live score on the Gauntlet
                </div>
              </div>

              {/* Leaderboard Rank Card */}
              <div className="p-5 sm:p-6 bg-pitchblack/70 border border-gold/30 flex flex-col justify-between shadow-[0_0_20px_rgba(212,175,55,0.08)]">
                <div className="flex items-center justify-between text-lightgrey mb-2">
                  <span className="text-[11px] font-heading font-bold tracking-widest uppercase">ARENA RANK</span>
                  <span className="text-base text-gold">⚡</span>
                </div>
                <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wider">
                  #{liveRank}
                </div>
                <div className="mt-2 text-[10px] font-mono text-lightgrey">
                  Global participant standing
                </div>
              </div>

              {/* Referrals Count Card */}
              <div className="p-5 sm:p-6 bg-pitchblack/70 border border-gold/30 flex flex-col justify-between shadow-[0_0_20px_rgba(212,175,55,0.08)]">
                <div className="flex items-center justify-between text-lightgrey mb-2">
                  <span className="text-[11px] font-heading font-bold tracking-widest uppercase">PEOPLE REFERRED</span>
                  <span className="text-base text-gold">👥</span>
                </div>
                <div className="text-2xl sm:text-4xl font-heading font-black text-[#60A5FA] tracking-wider">
                  {referralCount}
                </div>
                <div className="mt-2 text-[10px] font-mono text-lightgrey">
                  Users registered with your code
                </div>
              </div>

              {/* Missions Completed Card */}
              <div className="p-5 sm:p-6 bg-pitchblack/70 border border-gold/30 flex flex-col justify-between shadow-[0_0_20px_rgba(212,175,55,0.08)]">
                <div className="flex items-center justify-between text-lightgrey mb-2">
                  <span className="text-[11px] font-heading font-bold tracking-widest uppercase">MISSIONS COMPLETED</span>
                  <span className="text-base text-gold">🎯</span>
                </div>
                <div className="text-2xl sm:text-4xl font-heading font-black text-green-400 tracking-wider">
                  {completedTaskList.length}
                </div>
                <div className="mt-2 text-[10px] font-mono text-lightgrey">
                  Verified mission rewards claimed
                </div>
              </div>
            </div>

            {/* 3. Exclusive Referral Hub */}
            <div className="p-6 sm:p-8 bg-pitchblack border-2 border-gold/60 shadow-[0_0_35px_rgba(212,175,55,0.2)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-gold text-lg">✨</span>
                    <h2 className="text-lg sm:text-xl font-heading font-black text-white uppercase tracking-wider">
                      YOUR EXCLUSIVE REFERRAL CODE
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-lightgrey font-mono mt-1">
                    Share your unique referral code with developers, classmates, and clubs. Climb the leaderboard together!
                  </p>
                </div>

                {/* Big Coupon Display & Copy */}
                <div className="flex items-center gap-3">
                  <div className="px-5 py-2.5 bg-black border-2 border-gold text-gold font-mono font-bold text-lg sm:text-xl tracking-widest shadow-[0_0_15px_rgba(212,175,55,0.3)] select-all">
                    {couponCode || 'N/A'}
                  </div>
                  <button
                    onClick={handleCopyCoupon}
                    className="py-2.5 px-5 bg-gold hover:bg-gold-light text-black font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                  >
                    {copiedCoupon ? 'COPIED!' : 'COPY CODE'}
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Tab Navigation for Detailed Data */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap border-b border-gold/30 pb-3 text-xs sm:text-sm font-heading font-bold uppercase tracking-widest">
              <button
                onClick={() => setActiveTab('missions')}
                className={`px-4 py-2 sm:py-2.5 border transition-all cursor-pointer focus:outline-none flex items-center gap-2 ${
                  activeTab === 'missions'
                    ? 'bg-black border-2 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                    : 'bg-black border border-gold/30 text-lightgrey hover:text-white hover:border-gold'
                }`}
              >
                <span>TASKS & XP GAINED</span>
                <span className="px-2 py-0.5 text-[10px] bg-gold/15 border border-gold/40 text-gold rounded-full">
                  {completedTaskList.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('referrals')}
                className={`px-4 py-2 sm:py-2.5 border transition-all cursor-pointer focus:outline-none flex items-center gap-2 ${
                  activeTab === 'referrals'
                    ? 'bg-black border-2 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                    : 'bg-black border border-gold/30 text-lightgrey hover:text-white hover:border-gold'
                }`}
              >
                <span>PEOPLE REFERRED</span>
                <span className="px-2 py-0.5 text-[10px] bg-blue-500/15 border border-blue-400/40 text-blue-400 rounded-full">
                  {referralCount}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('overview')}
                className={`px-4 py-2 sm:py-2.5 border transition-all cursor-pointer focus:outline-none ${
                  activeTab === 'overview'
                    ? 'bg-black border-2 border-gold text-gold shadow-[0_0_15px_rgba(212,175,55,0.35)]'
                    : 'bg-black border border-gold/30 text-lightgrey hover:text-white hover:border-gold'
                }`}
              >
                SUMMARY & DIRECT LINKS
              </button>
            </div>

            {/* Tab 1: Tasks & XP Gained */}
            {activeTab === 'missions' && (
              <div className="flex flex-col gap-3">
                {completedTaskList.length === 0 ? (
                  <div className="p-12 bg-pitchblack/60 border border-gold/20 text-center flex flex-col items-center">
                    <span className="text-4xl mb-3">🎯</span>
                    <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider mb-2">
                      No Missions Completed Yet
                    </h3>
                    <p className="text-xs text-lightgrey font-mono max-w-md mb-6">
                      You haven't claimed XP for any missions yet. Head over to the Pre-Hackathon mission hub to solve terminal quizzes, follow social channels, and start racking up XP!
                    </p>
                    <Link
                      to="/pre-hackathon"
                      className="py-3 px-6 bg-gold hover:bg-gold-light text-black font-heading font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] no-underline"
                    >
                      EXPLORE MISSIONS →
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="text-xs font-mono text-lightgrey flex items-center justify-between pb-1">
                      <span>Showing {completedTaskList.length} verified completed mission{completedTaskList.length > 1 ? 's' : ''}</span>
                      <span className="text-gold font-bold">TOTAL XP EARNED: +{totalXp} XP</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      {completedTaskList.map((task, idx) => (
                        <div
                          key={task.key || idx}
                          className="p-4 sm:p-5 bg-pitchblack/80 border border-gold/30 hover:border-gold transition-all flex items-center justify-between gap-4 shadow-[0_0_15px_rgba(212,175,55,0.06)]"
                        >
                          <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-full border border-green-500/60 bg-green-500/10 text-green-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                              ✓
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs text-gold font-mono tracking-wider font-bold">
                                {task.category}
                              </span>
                              <h4 className="text-sm font-bold text-white tracking-wide">
                                {task.title}
                              </h4>
                              {task.claimed_at && (
                                <span className="text-[10px] text-lightgrey font-mono mt-0.5">
                                  Claimed on: {new Date(task.claimed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="px-3 py-1.5 bg-gold/15 border border-gold text-gold font-heading font-black text-xs tracking-wider whitespace-nowrap shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                            +{task.xp} XP
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Referrals */}
            {activeTab === 'referrals' && (
              <div className="flex flex-col gap-4">
                {referralsList.length === 0 && referralCount === 0 ? (
                  <div className="p-12 bg-pitchblack/60 border border-gold/20 text-center flex flex-col items-center">
                    <span className="text-4xl mb-3">👥</span>
                    <h3 className="text-lg font-heading font-bold text-white uppercase tracking-wider mb-2">
                      No Referrals Yet
                    </h3>
                    <p className="text-xs text-lightgrey font-mono max-w-md mb-6">
                      Share your referral code <strong className="text-gold font-mono">{couponCode}</strong> with friends. When they register for the hackathon, their registrations will appear here!
                    </p>
                    <button
                      onClick={handleCopyCoupon}
                      className="py-3 px-6 bg-gold hover:bg-gold-light text-black font-heading font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer"
                    >
                      {copiedCoupon ? 'COPIED!' : 'COPY REFERRAL CODE →'}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="text-xs font-mono text-lightgrey flex items-center justify-between pb-1">
                      <span>Total registered using your code: <strong className="text-white">{referralCount}</strong></span>
                      <span className="text-blue-400 font-mono">Referral Roster Live</span>
                    </div>

                    <div className="bg-pitchblack border border-gold/30 divide-y divide-gold/10">
                      {(referralsList.length > 0 ? referralsList : Array.from({ length: referralCount })).map((ref, idx) => (
                        <div key={idx} className="p-4 sm:p-5 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3.5">
                            <div className="w-9 h-9 rounded-full border border-blue-400/50 bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm font-bold">
                              {idx + 1}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white">
                                {ref?.name || `Participant #${idx + 1}`}
                              </span>
                              <span className="text-[11px] text-lightgrey font-mono">
                                {ref?.organization || (ref?.type === 'club' ? 'College Club' : 'Participant')}
                              </span>
                            </div>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="text-[10px] uppercase font-mono tracking-wider px-2 py-0.5 border border-green-500/50 bg-green-500/10 text-green-400 font-bold">
                              REGISTERED ✓
                            </span>
                            {ref?.date && (
                              <span className="text-[10px] text-lightgrey font-mono mt-1">
                                {ref.date}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Summary & Direct Links */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link
                  to="/pre-hackathon"
                  className="p-6 bg-pitchblack/80 border border-gold/30 hover:border-gold transition-all flex flex-col justify-between shadow-[0_0_15px_rgba(212,175,55,0.06)] no-underline group"
                >
                  <div>
                    <span className="text-3xl mb-3 block">⚡</span>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-gold uppercase tracking-wider transition-colors mb-2">
                      Pre-Hackathon Missions
                    </h3>
                    <p className="text-xs text-lightgrey font-mono leading-relaxed">
                      Complete terminal quizzes, DOM manipulation, social quests, and boost your personal XP.
                    </p>
                  </div>
                  <span className="text-xs font-heading font-bold text-gold uppercase tracking-wider mt-6">
                    GO TO MISSIONS →
                  </span>
                </Link>

                <Link
                  to="/club-activities"
                  className="p-6 bg-pitchblack/80 border border-gold/30 hover:border-gold transition-all flex flex-col justify-between shadow-[0_0_15px_rgba(212,175,55,0.06)] no-underline group"
                >
                  <div>
                    <span className="text-3xl mb-3 block">🏛️</span>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-gold uppercase tracking-wider transition-colors mb-2">
                      Campus Club Activities
                    </h3>
                    <p className="text-xs text-lightgrey font-mono leading-relaxed">
                      View participating college clubs, Spartan challenges, hack initiation, and club XP leaderboards.
                    </p>
                  </div>
                  <span className="text-xs font-heading font-bold text-gold uppercase tracking-wider mt-6">
                    SEE CLUB ACTIVITIES →
                  </span>
                </Link>

                <Link
                  to="/leaderboard"
                  className="p-6 bg-pitchblack/80 border border-gold/30 hover:border-gold transition-all flex flex-col justify-between shadow-[0_0_15px_rgba(212,175,55,0.06)] no-underline group"
                >
                  <div>
                    <span className="text-3xl mb-3 block">🏆</span>
                    <h3 className="text-base font-heading font-black text-white group-hover:text-gold uppercase tracking-wider transition-colors mb-2">
                      The Gauntlet Leaderboard
                    </h3>
                    <p className="text-xs text-lightgrey font-mono leading-relaxed">
                      Track the live top 10 hackers, LevelUp builders, and student communities competing across India.
                    </p>
                  </div>
                  <span className="text-xs font-heading font-bold text-gold uppercase tracking-wider mt-6">
                    CHECK LEADERBOARDS →
                  </span>
                </Link>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Login Modal */}
      <UpriseLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Share Profile & Download PNG Modal */}
      <UpriseProfileShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        currentUser={currentUser}
        completedTasksCount={completedTaskList.length}
      />
    </div>
  );
};

export default UpriseProfilePage;

