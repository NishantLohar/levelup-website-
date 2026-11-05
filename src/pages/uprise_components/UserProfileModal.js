import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

// Comprehensive human-readable names and XP badges for all Uprise tasks
const TASK_INFO_MAP = {
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

const UserProfileModal = ({ isOpen, onClose, user, onLogout }) => {
  const [profileData, setProfileData] = useState(user || null);
  const [loading, setLoading] = useState(false);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'tasks' | 'referrals'

  // Sync state whenever user prop updates
  useEffect(() => {
    if (user) {
      setProfileData(prev => ({ ...prev, ...user }));
    }
  }, [user]);

  // Fetch real-time live status from backend whenever modal opens
  useEffect(() => {
    if (!isOpen || !user?.email) return;

    let isMounted = true;
    setLoading(true);

    const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';
    fetch(`${API_BASE_URL}/api/v1/uprise/user-status?email=${encodeURIComponent(user.email)}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && data.success && data.user) {
          setProfileData(prev => ({
            ...prev,
            ...data.user,
            claimed_tasks: data.user.claimed_tasks || prev?.claimed_tasks || [],
            claimed_tasks_details: data.user.claimed_tasks_details || prev?.claimed_tasks_details || [],
            referral_count: data.user.referral_count ?? prev?.referral_count ?? 0,
            referrals_list: data.user.referrals_list || prev?.referrals_list || [],
            rank: data.user.rank || prev?.rank || '—'
          }));

          // Also persist latest sync
          try {
            const updated = { ...(user || {}), ...data.user };
            if (localStorage.getItem('uprise_user')) {
              localStorage.setItem('uprise_user', JSON.stringify(updated));
            } else {
              sessionStorage.setItem('uprise_user', JSON.stringify(updated));
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
  }, [isOpen, user?.email]);

  if (!isOpen) return null;

  const couponCode = profileData?.coupon_code || user?.coupon_code || '';
  const totalXp = profileData?.total_xp ?? user?.total_xp ?? 0;
  const liveRank = profileData?.rank ?? user?.rank ?? '—';
  const referralCount = profileData?.referral_count ?? user?.referral_count ?? 0;
  const referralsList = profileData?.referrals_list || [];
  
  // Combine claimed task keys and detailed claims
  const claimedKeys = profileData?.claimed_tasks || user?.claimed_tasks || [];
  const claimedDetails = profileData?.claimed_tasks_details || [];

  // Build unified tasks list
  const unifiedTasks = claimedKeys.map(key => {
    const detail = claimedDetails.find(d => d.task_key === key);
    const meta = TASK_INFO_MAP[key] || {
      title: key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
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

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://levelupevents.in';
  const referralInviteLink = couponCode 
    ? `${origin}/pre-hackathon?ref=${encodeURIComponent(couponCode)}` 
    : `${origin}/pre-hackathon`;

  const handleCopyCoupon = () => {
    if (couponCode) {
      navigator.clipboard.writeText(couponCode);
      setCopiedCoupon(true);
      setTimeout(() => setCopiedCoupon(false), 2000);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralInviteLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const shareWhatsappText = `🔥 Hey! Join me in the LevelUp Uprise Gauntlet Hackathon & Missions! Use my referral code: *${couponCode}* to get instant access and bonus XP:\n${referralInviteLink}`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[999999] bg-pitchblack/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 font-grotesk">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="glass-card border-2 border-gold/50 w-full max-w-3xl bg-obsidian text-white relative sharp shadow-[0_0_60px_rgba(212,175,55,0.4)] flex flex-col max-h-[90vh] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-gold/30 bg-pitchblack/90 flex items-center justify-between relative z-10 flex-shrink-0">
            <div className="flex items-center gap-3.5">
              {/* Profile Avatar Icon */}
              <div className="w-12 h-12 rounded-full border-2 border-gold bg-pitchblack flex items-center justify-center text-gold shadow-[0_0_20px_rgba(212,175,55,0.35)] flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-heading font-black text-lg sm:text-xl text-white tracking-wider uppercase">
                    {profileData?.full_name || user?.full_name || user?.email?.split('@')[0]}
                  </h3>
                  <span className="text-[10px] font-heading font-bold px-2 py-0.5 border border-gold/60 text-gold bg-gold/10 tracking-widest uppercase sharp flex items-center gap-1.5">
                    {loading && <span className="inline-block animate-spin text-[11px]">⟳</span>}
                    {profileData?.role === 'club' ? 'COLLEGE CLUB' : 'UPRISE HACKER'}
                  </span>
                </div>
                <span className="text-xs text-lightgrey font-mono tracking-wider truncate max-w-[280px] sm:max-w-md">
                  {profileData?.email || user?.email}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="text-lightgrey hover:text-gold text-2xl font-black px-2.5 py-1 transition-colors cursor-pointer focus:outline-none"
              title="Close Profile"
            >
              ✕
            </button>
          </div>

          {/* Navigation Tabs inside Dashboard */}
          <div className="flex border-b border-gold/20 bg-pitchblack/60 px-5 sm:px-6 gap-6 text-xs font-heading font-bold uppercase tracking-widest flex-shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 border-b-2 transition-all cursor-pointer focus:outline-none ${
                activeTab === 'overview' 
                  ? 'border-gold text-gold shadow-[0_2px_10px_rgba(212,175,55,0.3)]' 
                  : 'border-transparent text-lightgrey hover:text-white'
              }`}
            >
              OVERVIEW
            </button>
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 focus:outline-none ${
                activeTab === 'tasks' 
                  ? 'border-gold text-gold shadow-[0_2px_10px_rgba(212,175,55,0.3)]' 
                  : 'border-transparent text-lightgrey hover:text-white'
              }`}
            >
              <span>TASKS & XP</span>
              <span className="px-1.5 py-0.2 bg-gold/20 text-gold text-[10px] font-mono border border-gold/40">
                {unifiedTasks.length}
              </span>
            </button>
            <button
              onClick={() => setActiveTab('referrals')}
              className={`py-3 border-b-2 transition-all cursor-pointer flex items-center gap-2 focus:outline-none ${
                activeTab === 'referrals' 
                  ? 'border-gold text-gold shadow-[0_2px_10px_rgba(212,175,55,0.3)]' 
                  : 'border-transparent text-lightgrey hover:text-white'
              }`}
            >
              <span>REFERRALS</span>
              <span className="px-1.5 py-0.2 bg-gold/20 text-gold text-[10px] font-mono border border-gold/40">
                {referralCount}
              </span>
            </button>
          </div>

          {/* Scrollable Modal Content */}
          <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-grow space-y-6">
            
            {/* 1. Quick Stats Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {/* Card 1: Total XP */}
              <div className="p-4 bg-pitchblack/80 border border-gold/30 sharp flex flex-col justify-between">
                <span className="text-[10px] font-heading uppercase text-lightgrey tracking-widest mb-1">
                  TOTAL VERIFIED XP
                </span>
                <div className="flex items-baseline gap-1 text-gold font-black font-heading text-xl sm:text-2xl tracking-wide">
                  <span>🏆</span>
                  <span>{totalXp.toLocaleString()}</span>
                  <span className="text-xs text-gold/70">XP</span>
                </div>
              </div>

              {/* Card 2: Arena Rank */}
              <div className="p-4 bg-pitchblack/80 border border-gold/30 sharp flex flex-col justify-between">
                <span className="text-[10px] font-heading uppercase text-lightgrey tracking-widest mb-1">
                  ARENA RANK
                </span>
                <div className="text-white font-black font-heading text-xl sm:text-2xl tracking-wide flex items-center gap-1.5">
                  <span className="text-gold">#</span>
                  <span>{liveRank}</span>
                </div>
              </div>

              {/* Card 3: Referrals */}
              <div className="p-4 bg-pitchblack/80 border border-gold/30 sharp flex flex-col justify-between">
                <span className="text-[10px] font-heading uppercase text-lightgrey tracking-widest mb-1">
                  PEOPLE REFERRED
                </span>
                <div className="text-green-400 font-black font-heading text-xl sm:text-2xl tracking-wide flex items-center gap-1.5">
                  <span>👥</span>
                  <span>{referralCount}</span>
                </div>
              </div>

              {/* Card 4: Missions Claimed */}
              <div className="p-4 bg-pitchblack/80 border border-gold/30 sharp flex flex-col justify-between">
                <span className="text-[10px] font-heading uppercase text-lightgrey tracking-widest mb-1">
                  MISSIONS DONE
                </span>
                <div className="text-cyan-400 font-black font-heading text-xl sm:text-2xl tracking-wide flex items-center gap-1.5">
                  <span>⚡</span>
                  <span>{unifiedTasks.length}</span>
                </div>
              </div>
            </div>

            {/* TAB CONTENT: OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Referral Code Showcase Box */}
                <div className="p-5 sm:p-6 bg-gradient-to-r from-pitchblack via-obsidian to-pitchblack border-2 border-gold shadow-[0_0_25px_rgba(212,175,55,0.2)] sharp">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[11px] font-heading font-bold text-gold uppercase tracking-[0.2em] flex items-center gap-2">
                        <span>✨</span>
                        <span>YOUR EXCLUSIVE REFERRAL CODE</span>
                      </span>
                      <p className="text-xs text-lightgrey font-grotesk mt-1">
                        Share your code with friends & campus clubs to earn instant XP bonuses!
                      </p>
                    </div>

                    {/* Big Code Pill with Copy */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <div className="px-4 py-2 bg-pitchblack border border-gold text-gold font-mono font-black text-base sm:text-lg tracking-widest shadow-[inset_0_0_10px_rgba(212,175,55,0.2)] flex-grow text-center">
                        {couponCode || 'UPRISEUSER'}
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyCoupon}
                        className="px-4 py-2.5 bg-gold hover:bg-white text-pitchblack font-heading font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap sharp"
                      >
                        {copiedCoupon ? 'COPIED! ✓' : 'COPY CODE'}
                      </button>
                    </div>
                  </div>

                  {/* Share Link Row */}
                  <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-4 border-t border-gold/20">
                    <input
                      type="text"
                      readOnly
                      value={referralInviteLink}
                      className="w-full bg-pitchblack border border-gold/30 text-lightgrey text-xs font-mono p-2.5 outline-none"
                    />
                    <div className="flex items-center gap-2 w-full sm:w-auto flex-shrink-0">
                      <button
                        type="button"
                        onClick={handleCopyLink}
                        className="flex-1 sm:flex-none px-4 py-2 bg-transparent border border-gold text-gold hover:bg-gold/15 text-xs font-heading font-bold uppercase tracking-wider transition-all cursor-pointer sharp"
                      >
                        {copiedLink ? 'LINK COPIED! ✓' : 'COPY LINK'}
                      </button>
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(shareWhatsappText)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 sm:flex-none px-4 py-2 bg-green-500 hover:bg-green-400 text-pitchblack text-xs font-heading font-bold uppercase tracking-wider transition-all text-center sharp"
                      >
                        WHATSAPP
                      </a>
                    </div>
                  </div>

                  {/* Reward Breakdown Note */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-lightgrey/80 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold">✦ +50 XP</span>
                      <span>for each participant who uses your code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gold font-bold">✦ +2,000 XP</span>
                      <span>when a campus club registers with your code</span>
                    </div>
                  </div>
                </div>

                {/* Recent Task XP Summary */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-black text-sm uppercase text-white tracking-widest flex items-center gap-2">
                      <span>🎯</span>
                      <span>RECENT TASKS COMPLETED</span>
                    </h4>
                    <button
                      onClick={() => setActiveTab('tasks')}
                      className="text-xs text-gold hover:underline font-heading uppercase tracking-wider"
                    >
                      VIEW ALL ({unifiedTasks.length}) →
                    </button>
                  </div>

                  {unifiedTasks.length === 0 ? (
                    <div className="p-6 bg-pitchblack/50 border border-gold/20 text-center text-lightgrey text-xs">
                      No missions completed yet. Visit Pre-Hackathon to claim XP!
                    </div>
                  ) : (
                    <div className="divide-y divide-gold/10 border border-gold/20 bg-pitchblack/60">
                      {unifiedTasks.slice(0, 5).map((t, i) => (
                        <div key={i} className="p-3 sm:p-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 border border-green-400 text-green-400 text-xs flex items-center justify-center font-bold">
                              ✓
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                                {t.title}
                              </span>
                              <span className="text-[10px] text-lightgrey font-mono uppercase tracking-wider">
                                {t.category} {t.claimed_at && `• ${t.claimed_at}`}
                              </span>
                            </div>
                          </div>
                          <span className="text-gold font-heading font-black text-xs sm:text-sm px-2.5 py-1 bg-gold/10 border border-gold/40 flex-shrink-0">
                            +{t.xp} XP
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB CONTENT: ALL TASKS & XP */}
            {activeTab === 'tasks' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-lightgrey uppercase font-heading tracking-widest">
                    ALL CLAIMED GAUNTLET MISSIONS ({unifiedTasks.length})
                  </span>
                  <Link
                    to="/pre-hackathon"
                    onClick={onClose}
                    className="text-xs text-gold hover:underline font-heading font-bold uppercase tracking-wider"
                  >
                    GO TO PRE-HACKATHON →
                  </Link>
                </div>

                {unifiedTasks.length === 0 ? (
                  <div className="p-12 text-center bg-pitchblack/80 border border-gold/20 sharp">
                    <p className="text-sm text-lightgrey mb-4">
                      You haven't completed any missions yet.
                    </p>
                    <Link
                      to="/pre-hackathon"
                      onClick={onClose}
                      className="px-6 py-2.5 bg-gold text-pitchblack font-heading font-bold text-xs uppercase tracking-widest inline-block sharp hover:bg-white transition-colors"
                    >
                      START CLAIMING MISSIONS NOW
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gold/10 border border-gold/30 bg-pitchblack/80 sharp overflow-hidden">
                    {unifiedTasks.map((t, idx) => (
                      <div key={idx} className="p-3.5 sm:p-4 flex items-center justify-between gap-3 hover:bg-gold/5 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 border border-green-500 bg-green-500/10 text-green-400 text-xs flex items-center justify-center font-bold flex-shrink-0">
                            ✓
                          </span>
                          <div className="flex flex-col">
                            <span className="text-xs sm:text-sm font-bold text-white">
                              {t.title}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] text-lightgrey font-mono mt-0.5">
                              <span className="text-gold/80 uppercase">{t.category}</span>
                              {t.claimed_at && <span>• {t.claimed_at}</span>}
                            </div>
                          </div>
                        </div>
                        <span className="text-gold font-heading font-black text-xs sm:text-sm px-2.5 py-1 bg-gold/15 border border-gold text-right flex-shrink-0">
                          +{t.xp} XP
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB CONTENT: REFERRALS */}
            {activeTab === 'referrals' && (
              <div className="space-y-4">
                <div className="p-4 bg-pitchblack border border-gold/30 sharp flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <span className="text-[10px] text-lightgrey font-heading uppercase tracking-widest">
                      TOTAL REFERRED USERS & CLUBS
                    </span>
                    <div className="text-2xl font-black font-heading text-gold">
                      {referralCount} REFERRED
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-gold hover:bg-white text-pitchblack font-heading font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer sharp"
                  >
                    {copiedLink ? 'LINK COPIED! ✓' : 'SHARE REFERRAL LINK'}
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-lightgrey uppercase font-heading tracking-widest block">
                    REFERRAL ROSTER & NETWORK
                  </span>

                  {referralsList.length === 0 ? (
                    <div className="p-8 text-center bg-pitchblack/60 border border-gold/20 sharp">
                      <p className="text-xs sm:text-sm text-lightgrey mb-2">
                        {referralCount > 0 
                          ? `${referralCount} users have registered using your code!`
                          : "No one has registered with your code yet."
                        }
                      </p>
                      <p className="text-xs text-gold/80 font-mono">
                        Share your referral link on WhatsApp, Discord & LinkedIn to climb the leaderboard!
                      </p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gold/10 border border-gold/20 bg-pitchblack/60 sharp">
                      {referralsList.map((r, i) => (
                        <div key={i} className="p-3 sm:p-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="w-7 h-7 rounded-full bg-gold/10 border border-gold/40 text-gold text-xs flex items-center justify-center font-bold">
                              {r.type === 'Club Community' ? '🏛️' : '👤'}
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs sm:text-sm font-bold text-white">
                                {r.name}
                              </span>
                              <span className="text-[10px] text-lightgrey font-mono uppercase">
                                {r.type} {r.date && `• Joined ${r.date}`}
                              </span>
                            </div>
                          </div>
                          <span className="text-green-400 font-heading font-bold text-xs px-2.5 py-1 bg-green-500/10 border border-green-500/40">
                            +{r.type === 'Club Community' ? '2,000' : '50'} XP
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 sm:p-5 border-t border-gold/30 bg-pitchblack/90 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Link
                to="/pre-hackathon"
                onClick={onClose}
                className="px-4 py-2 bg-gold/15 hover:bg-gold text-gold hover:text-pitchblack border border-gold font-heading text-xs font-bold uppercase tracking-wider transition-colors sharp"
              >
                PRE-HACKATHON MISSIONS →
              </Link>
              <Link
                to="/leaderboard"
                onClick={onClose}
                className="px-4 py-2 bg-transparent hover:bg-gold/10 text-lightgrey hover:text-gold border border-lightgrey/30 hover:border-gold font-heading text-xs font-bold uppercase tracking-wider transition-colors sharp"
              >
                LEADERBOARD
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onLogout && onLogout();
              }}
              className="px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 font-heading text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer sharp"
            >
              LOGOUT
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UserProfileModal;

