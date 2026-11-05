import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import UpriseNavbar from './uprise_components/UpriseNavbar';
import UpriseLoginModal from './uprise_components/UpriseLoginModal';
import './Uprise.css';

// Sleek, clean SVG icons for each challenge
const ActivityIcon = ({ id }) => {
    switch (id) {
        case 1: // 100 Spartan Challenge (Shield / Defense)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                </svg>
            );
        case 2: // Hack Initiation (Terminal / Code)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                    <line x1="10" y1="19" x2="14" y2="5" />
                </svg>
            );
        case 3: // Cross-Campus Event (Network / Global Hub)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
            );
        case 4: // Pitch Simulation (Rocket / Founder Velocity)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                    <path d="M9 12H4s.55-3.03 2-4.5c1.45-1.47 4.5-2 4.5-2" />
                    <path d="M12 15v5s3.03-.55 4.5-2c1.47-1.45 2-4.5 2-4.5" />
                </svg>
            );
        case 5: // Golden Ticket Reveal (Perforated Pass / Gold Access)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <circle cx="2" cy="12" r="2" />
                    <circle cx="22" cy="12" r="2" />
                    <line x1="12" y1="7" x2="12" y2="17" strokeDasharray="2 2" />
                </svg>
            );
        case 6: // Instagram & LinkedIn Drop (Broadcast / Announce)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 11V9a2 2 0 0 1 2-2h4l6-4v18l-6-4H5a2 2 0 0 1-2-2v-2z" />
                    <path d="M19 8c1.5 2 1.5 6 0 8" />
                    <path d="M22 6c3 3.5 3 8.5 0 12" />
                </svg>
            );
        case 7: // Guerilla Tag (Flag / Campus Claim)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
            );
        case 8: // The Problem Solver (Chip / Processor / Architecture)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <line x1="9" y1="1" x2="9" y2="4" />
                    <line x1="15" y1="1" x2="15" y2="4" />
                    <line x1="9" y1="20" x2="9" y2="23" />
                    <line x1="15" y1="20" x2="15" y2="23" />
                    <line x1="20" y1="9" x2="23" y2="9" />
                    <line x1="20" y1="14" x2="23" y2="14" />
                    <line x1="1" y1="9" x2="4" y2="9" />
                    <line x1="1" y1="14" x2="4" y2="14" />
                </svg>
            );
        case 9: // Strength Share (Community Message / Share Network)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                </svg>
            );
        case 10: // The 48 Hour Infiltration (Clock / Fast Blitz)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                </svg>
            );
        case 11: // The Startup Teardown (Dissection / Solution)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="9" y1="15" x2="15" y2="15" />
                    <line x1="12" y1="12" x2="12" y2="18" />
                </svg>
            );
        case 12: // Plan an Event (Calendar / Community Collaboration)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
            );
        case 13: // Survival Metric (Target / Crosshair / Precision)
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="22" y1="12" x2="18" y2="12" />
                    <line x1="6" y1="12" x2="2" y2="12" />
                    <line x1="12" y1="6" x2="12" y2="2" />
                    <line x1="12" y1="22" x2="12" y2="18" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            );
        default:
            return (
                <svg className="w-6 h-6 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                </svg>
            );
    }
};

const ClubActivities = () => {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const saved = localStorage.getItem('uprise_user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [toastMsg, setToastMsg] = useState(null);
    const [claimModalData, setClaimModalData] = useState(null);
    const [problemCount, setProblemCount] = useState(1);
    const [manualEmail, setManualEmail] = useState('');
    const [proofUrl, setProofUrl] = useState('');
    const [proofDetails, setProofDetails] = useState('');
    const [claimSubmitting, setClaimSubmitting] = useState(false);
    const [copiedMessage, setCopiedMessage] = useState(false);
    const [registeredClubs, setRegisteredClubs] = useState([]);
    const [quickClubInput, setQuickClubInput] = useState('');
    const [quickClubLoading, setQuickClubLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);

        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';

        // Sync active user status
        if (currentUser?.email) {
            fetch(`${API_BASE_URL}/api/v1/uprise/user-status?email=${encodeURIComponent(currentUser.email)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.user) {
                        setCurrentUser(prev => {
                            const updated = { ...prev, ...data.user };
                            localStorage.setItem('uprise_user', JSON.stringify(updated));
                            return updated;
                        });
                    }
                })
                .catch(err => console.log('Sync user status error:', err));
        }

        // Fetch registered clubs for quick dropdown
        fetch(`${API_BASE_URL}/api/v1/uprise/leaderboard?role=college&limit=100`)
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success' && Array.isArray(data.leaderboard)) {
                    setRegisteredClubs(data.leaderboard);
                }
            })
            .catch(err => console.log('Fetch clubs list error:', err));
    }, [currentUser?.email]);

    const handleLogout = () => {
        localStorage.removeItem('uprise_user');
        setCurrentUser(null);
        setToastMsg('Active club session cleared. Select or enter another club anytime!');
        setTimeout(() => setToastMsg(null), 3000);
    };

    const activities = [
        {
            id: 1,
            num: "01",
            key: "club_spartan_100",
            title: "100 Spartan Challenge",
            category: "COMMUNITY ONBOARDING",
            xp: 10000,
            xpBadge: "10,000 XP",
            isSpartan100: true,
            description: "Colleges to get 100 registrations and complete hirestop profiles.",
            details: "Mobilize your campus builders! Every verified registration with a completed Hirestop profile counts toward your Spartan quota. Reaching 100 member registrations unlocks +10,000 XP for your club.",
            actionText: "View 100 Referrals Progress & Claim",
            instructions: "Share your club referral code with students. Once your club achieves 100 verified member registrations, +10,000 XP is unlocked and awarded!"
        },
        {
            id: 2,
            num: "02",
            key: "club_hack_initiation",
            title: "Hack Initiation",
            category: "LOCAL HACKATHON",
            xp: 15000,
            xpBadge: "15,000 XP",
            proofLabel: "Campus Hackathon Drive Link / Photos URL / Event Report",
            proofPlaceholder: "https://drive.google.com/drive/folders/... or https://linkedin.com/posts/...",
            detailsLabel: "Event Date & Attendance Summary",
            detailsPlaceholder: "e.g. Held on Nov 2nd with 45 participating coders across 12 teams.",
            description: "Host 2 hours collaborated offline hackathon with Uprise's easy problem statement.",
            details: "Organize an on-campus mini sprint using standard Uprise problem tracks to ignite competitive coding in your institution.",
            actionText: "Submit Proof & Claim +15,000 XP",
            instructions: "Host an on-campus 2-hour mini-sprint using Uprise problem statements. Submit your event photos or drive folder URL below to verify completion."
        },
        {
            id: 3,
            num: "03",
            key: "club_cross_campus",
            title: "Cross Campus Event",
            category: "INTER-COLLEGE NETWORKING",
            xp: 2000,
            xpBadge: "2,000 XP",
            proofLabel: "Discord Event Link / Stage Recording URL",
            proofPlaceholder: "https://discord.com/events/... or Drive recording link",
            detailsLabel: "Partner Club & Topic Title",
            detailsPlaceholder: "e.g. Co-hosted AMA with GDSC VESIT, 110 attendees.",
            description: "Host a Discord event on Uprise server for networking with co-communities and participants.",
            details: "Co-host an interactive community session, AMA, or workshop on the official Uprise Discord to bridge collegiate networks.",
            actionText: "Submit Proof & Claim +2,000 XP",
            instructions: "Schedule and co-host a live voice/stage session on the official Uprise Discord server. Provide the event or recording URL to verify completion."
        },
        {
            id: 4,
            num: "04",
            key: "club_pitch_simulation",
            title: "Pitch Simulation",
            category: "STARTUP SIMULATION",
            xp: 20000,
            xpBadge: "20,000 XP",
            proofLabel: "Founder Pitch Deck / Recording / Demo Drive URL",
            proofPlaceholder: "https://drive.google.com/... or pitch recording link",
            detailsLabel: "Participating Teams & Winning Pitch",
            detailsPlaceholder: "e.g. 8 student startup prototypes reviewed by industry mentors.",
            description: "Host an inter-college collaborated startup pitch online.",
            details: "Simulate a high-stakes founder showcase with peer institutions. Showcase student prototypes to judges and prospective builders.",
            actionText: "Submit Proof & Claim +20,000 XP",
            instructions: "Conduct an online inter-college startup pitch showcase. Submit your pitch decks or session recording URL below to verify completion."
        },
        {
            id: 5,
            num: "05",
            key: "club_golden_ticket",
            title: "Golden Ticket Reveal",
            category: "VIRAL CAMPAIGN",
            xp: 5000,
            xpBadge: "5,000 XP",
            proofLabel: "Live Public Video Post URL (Instagram Reel / YouTube / LinkedIn)",
            proofPlaceholder: "https://www.instagram.com/reel/... or https://youtube.com/shorts/...",
            detailsLabel: "Club Handle & Tag Status",
            detailsPlaceholder: "e.g. Published on @our_club tagging @levelupofficial.in",
            description: "Capture reaction of the members getting golden ticket for uprise and post on all social media handles.",
            details: "Document the celebration! Film high-energy unboxing and reaction clips as members receive their official Uprise Golden Pass.",
            actionText: "Submit Video Proof & Claim +5,000 XP",
            instructions: "Record your team's golden ticket reaction video and share across Instagram / LinkedIn tagging @levelupofficial.in. Provide the live post URL to verify completion."
        },
        {
            id: 6,
            num: "06",
            key: "club_social_drop",
            title: "Instagram & LinkedIn Drop",
            category: "MEDIA BROADCAST",
            xp: 800,
            xpBadge: "800 XP",
            proofLabel: "Public Instagram / LinkedIn Alliance Post URL",
            proofPlaceholder: "https://www.instagram.com/p/... or https://www.linkedin.com/posts/...",
            detailsLabel: "Club Social Handle",
            detailsPlaceholder: "e.g. @levelup_club_xyz on Instagram",
            description: "Post a banner informing your participation for Uprise.",
            details: "Broadcast your club's official alliance with Uprise across Instagram and LinkedIn with verified tags and alliance banners.",
            actionText: "Submit Post URL & Claim +800 XP",
            instructions: "Post the official Uprise partnership announcement banner on your club's Instagram or LinkedIn handle. Provide the live post URL to verify completion."
        },
        {
            id: 7,
            num: "07",
            key: "club_guerilla_tag",
            title: "Guerilla Tag",
            category: "CAMPUS TAKEOVER",
            xp: 1500,
            xpBadge: "1,500 XP",
            proofLabel: "Notice Board Photo Proof Link (Drive or Social Post URL)",
            proofPlaceholder: "https://drive.google.com/... or https://instagram.com/p/...",
            detailsLabel: "Notice Board Location & Campus Department",
            detailsPlaceholder: "e.g. Main block CS department bulletin board",
            description: "Poster on department's notice board and capture it to post on social media handles.",
            details: "Physical presence meets digital reach. Put up official posters on college noticeboards and tag @levelupofficial.in.",
            actionText: "Submit Photo Proof & Claim +1,500 XP",
            instructions: "Place official Uprise posters on departmental noticeboards and capture a snapshot. Submit the photo link to verify completion."
        },
        {
            id: 8,
            num: "08",
            key: "club_problem_solver",
            title: "The Problem Solver",
            category: "INDIVIDUAL EXECUTION",
            xp: 2500,
            xpBadge: "2,500 XP per problem",
            isRepeatable: true,
            proofLabel: "GitHub Repo or Delivered Project Live URL",
            proofPlaceholder: "https://github.com/campus-team/project-repo",
            detailsLabel: "Problem Statement Solved",
            detailsPlaceholder: "e.g. Built decentralized student verification prototype",
            description: "High rate XPs on delivering project on individual basis during pre hackathon.",
            details: "Individual members delivering standalone prototypes during the pre-hackathon grant massive multiplier XP (+2,500 XP per problem solved) to their parent club.",
            actionText: "Submit Project & Claim +2,500 XP",
            instructions: "Submit standalone project solution repositories or prototypes delivered by your campus developers during the pre-hackathon. Each delivered problem grants +2,500 XP!"
        },
        {
            id: 9,
            num: "09",
            key: "club_strength_share",
            title: "Strength Share",
            category: "COMMUNITY BROADCAST",
            xp: 800,
            xpBadge: "800 XP",
            isDraftShare: true,
            proofLabel: "Broadcast Screenshot Proof Link (Drive or Image URL)",
            proofPlaceholder: "https://drive.google.com/... or screenshot image link",
            detailsLabel: "Community Channels Posted To",
            detailsPlaceholder: "e.g. Sent to 4 batch WhatsApp groups (600+ students)",
            description: "Share the drafted message on all your community channels and share its screenshot with your POC.",
            details: "Broadcast our official partnership message across your college WhatsApp groups, Discord servers, and Telegram channels. Provide screenshot proof to claim +800 XP.",
            actionText: "View Message & Submit Proof (+800 XP)",
            instructions: "Copy the official announcement message below, broadcast it across your college channels, and paste your screenshot proof link below to verify completion."
        },
        {
            id: 10,
            num: "10",
            key: "club_48h_infiltration",
            title: "The 48 Hour Infiltration",
            category: "VELOCITY BOOST MULTIPLIER",
            xp: 250,
            xpBadge: "250 XP vs 50 XP (5x Boost)",
            isReferralBoost: true,
            description: "For new clubs: Active for your first 48 hours after registering. For existing clubs: 48-Hour Blitz goes LIVE at 7:00 PM today!",
            details: "Sprint window unlocked! Every student registration with your club's referral code awards +250 XP (5x standard rate) instead of 50 XP. For all existing clubs, your 48-Hour Blitz starts today at 7:00 PM IST and runs until Nov 4, 7:00 PM IST!",
            actionText: "Copy Referral Code & View 5x Boost",
            instructions: "Share your exclusive club invite code! Every student who registers during this sprint automatically adds +250 XP directly to your club's live leaderboard ranking."
        },
        {
            id: 11,
            num: "11",
            key: "club_startup_teardown",
            title: "The Startup Teardown",
            category: "CASE STUDY & TEARDOWN",
            xp: 8000,
            xpBadge: "8,000 XP",
            proofLabel: "1-Page Solution Document / Teardown Drive Link",
            proofPlaceholder: "https://docs.google.com/document/d/... or PDF link",
            detailsLabel: "Startup Analyzed & Structural Flaws Addressed",
            detailsPlaceholder: "e.g. Quibi unit economics and content distribution breakdown",
            description: "Host an event with listing famous but flawed startups and your members propose 1 page solution to its 3 major flaws.",
            details: "Host a teardown session reviewing iconic but flawed tech startups (e.g. Quibi, Theranos, WeWork, Fast). Student teams propose a 1-page solution tackling its 3 major structural flaws.",
            actionText: "Submit Teardown Proof & Claim +8,000 XP",
            instructions: "Conduct the startup teardown workshop. Document student 1-page solutions and provide the document/drive link below to verify completion."
        },
        {
            id: 12,
            num: "12",
            key: "club_plan_event",
            title: "Plan an Event",
            category: "CAMPUS COLLABORATION",
            xp: 5000,
            xpBadge: "SPONSORED • BESPOKE XP",
            isContactAdmin: true,
            description: "Want to plan a custom campus hackathon or workshop? Contact admin to get sponsored prizes, mentors, and custom XP allocations.",
            details: "Collaborate directly with the LevelUp / Uprise team to organize bespoke campus hackathons, technical bootcamps, or AI meetups on your premises with co-branding and exclusive sponsorship.",
            actionText: "Contact Admin / Pitch Event",
            instructions: "Get in touch with the core Uprise organising committee to co-host an official collegiate event. Direct Discord / Email lines available. XP is credited upon event proposal confirmation."
        },
        {
            id: 13,
            num: "13",
            key: "club_survival_metric",
            title: "Survival Metric",
            category: "ENGAGEMENT INTEGRITY",
            xp: 0,
            xpBadge: "INTEGRITY RULE",
            isInfoOnly: true,
            description: "Negative marking for inactive users.",
            details: "Keep your registered cohort active. Inactive participants deduct vitality points from the community's overall leaderboard standing.",
            actionText: "View Vitality Guidelines",
            instructions: "Ensure all participants registered with your code remain active in pre-hackathon challenges to protect your vitality rating!"
        }
    ];

    const isTaskCompleted = (actKey) => {
        if (!currentUser?.claimed_tasks) return false;
        if (actKey === 'club_problem_solver') {
            return currentUser.claimed_tasks.some(k => k.startsWith('club_problem_solver'));
        }
        return currentUser.claimed_tasks.includes(actKey);
    };

    const handleQuickClubActivate = async (customVal) => {
        const val = (customVal || quickClubInput || '').trim();
        if (!val) {
            setToastMsg('❌ Please enter your club email or referral code.');
            setTimeout(() => setToastMsg(null), 3000);
            return;
        }

        setQuickClubLoading(true);
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';

        try {
            const isEmail = val.includes('@');
            const param = isEmail ? `email=${encodeURIComponent(val.toLowerCase())}` : `coupon=${encodeURIComponent(val.toUpperCase())}`;
            const res = await fetch(`${API_BASE_URL}/api/v1/uprise/user-status?${param}`);
            const data = await res.json();

            if (data.success && data.user) {
                setCurrentUser(data.user);
                localStorage.setItem('uprise_user', JSON.stringify(data.user));
                setToastMsg(`✓ Active Club: ${data.user.club_name || data.user.full_name} (${(data.user.total_xp || 0).toLocaleString()} XP)`);
                setQuickClubInput('');
                setTimeout(() => setToastMsg(null), 4000);
            } else {
                setToastMsg('❌ Club not found with this email or code. Please check spelling or register.');
                setTimeout(() => setToastMsg(null), 4000);
            }
        } catch (err) {
            console.error('Quick club activate error:', err);
            setToastMsg('❌ Connection error while activating club.');
            setTimeout(() => setToastMsg(null), 4000);
        } finally {
            setQuickClubLoading(false);
        }
    };

    const handleActionClick = (act) => {
        if (act.isInfoOnly) {
            setToastMsg('ℹ️ Keep your registered members active across challenges to maintain vitality!');
            setTimeout(() => setToastMsg(null), 4000);
            return;
        }

        // Reset proof inputs
        setProofUrl('');
        setProofDetails('');
        setProblemCount(1);
        if (!currentUser?.email) {
            setManualEmail('');
        }
        setClaimModalData(act);
    };

    const copyDraftedMessage = () => {
        const code = currentUser?.coupon_code || 'YOUR_CLUB_CODE';
        const msg = `🚀 Big announcement! Our campus club has officially partnered with Uprise 2027 — the ultimate pan-India hackathon and builder gauntlet! 🏆 Compete for cash prizes, developer bounties, and startup access.\n\nRegister your team now with our exclusive campus invite code: ${code}\nRegister here: https://levelupevents.in/pre-hackathon`;
        if (navigator.clipboard) {
            navigator.clipboard.writeText(msg);
            setCopiedMessage(true);
            setTimeout(() => setCopiedMessage(false), 2500);
        }
    };

    const executeClaim = async (e) => {
        if (e && e.preventDefault) e.preventDefault();
        if (!claimModalData) return;

        const emailToUse = (currentUser?.email || manualEmail || '').trim().toLowerCase();
        if (!emailToUse) {
            setToastMsg('❌ Please enter your registered Club email to claim XP!');
            setTimeout(() => setToastMsg(null), 4000);
            return;
        }

        // 1. Client-side Spartan 100 validation
        if (claimModalData.isSpartan100) {
            const currentRefs = currentUser?.referral_count || 0;
            if (currentRefs < 100) {
                setToastMsg(`❌ 100 Spartan Challenge requires 100 verified member registrations. Your club currently has ${currentRefs}/100.`);
                setTimeout(() => setToastMsg(null), 5000);
                return;
            }
        }

        // 2. Client-side proof URL validation
        if (claimModalData.proofLabel) {
            const cleanUrl = proofUrl.trim();
            if (!cleanUrl || (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://'))) {
                setToastMsg('❌ Valid submission proof URL (https://...) is required to verify task completion.');
                setTimeout(() => setToastMsg(null), 5000);
                return;
            }
        }

        setClaimSubmitting(true);
        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';

        try {
            const bodyPayload = {
                email: emailToUse,
                task_key: claimModalData.key,
                proof_url: proofUrl.trim(),
                proof_details: proofDetails.trim(),
            };
            if (claimModalData.isRepeatable) {
                bodyPayload.count = problemCount;
            }

            const res = await fetch(`${API_BASE_URL}/api/v1/uprise/claim-task-xp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyPayload),
            });

            const data = await res.json();
            if (data.success) {
                const awarded = data.xp_awarded ?? (claimModalData.isRepeatable ? (problemCount * 2500) : claimModalData.xp);
                const updatedUser = {
                    ...(currentUser || {}),
                    email: emailToUse,
                    full_name: data.club_name || currentUser?.full_name || emailToUse,
                    club_name: data.club_name || currentUser?.club_name || emailToUse,
                    role: 'club',
                    total_xp: data.total_xp,
                    claimed_tasks: data.claimed_tasks || [...(currentUser?.claimed_tasks || []), claimModalData.key],
                };
                setCurrentUser(updatedUser);
                localStorage.setItem('uprise_user', JSON.stringify(updatedUser));

                setToastMsg(`🎉 VERIFIED & COMPLETED! +${awarded.toLocaleString()} XP CREDITED TO ${data.club_name || 'YOUR CLUB'}!`);
                setClaimModalData(null);
                setProofUrl('');
                setProofDetails('');
                setTimeout(() => setToastMsg(null), 5000);
            } else {
                setToastMsg(`❌ ${data.message || data.error || 'Failed to claim activity XP. Please complete task and provide proof.'}`);
                setTimeout(() => setToastMsg(null), 6000);
            }
        } catch (err) {
            console.error('Claim activity error:', err);
            setToastMsg('❌ Network error while verifying task. Please try again.');
            setTimeout(() => setToastMsg(null), 4000);
        } finally {
            setClaimSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-pitchblack text-white relative font-grotesk overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-gold/5 blur-[120px] rounded-full"></div>
            </div>

            {/* Floating Toast Notification */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div 
                        initial={{ opacity: 0, y: -30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-[#0c121e]/95 border border-gold/60 text-white px-6 py-3.5 rounded-xl shadow-[0_0_35px_rgba(212,175,55,0.45)] text-sm sm:text-base font-bold tracking-wide flex items-center gap-3 backdrop-blur-md max-w-lg text-center"
                    >
                        <span>{toastMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navbar */}
            <UpriseNavbar 
                user={currentUser} 
                onOpenLogin={() => setIsLoginModalOpen(true)} 
                onLogout={handleLogout} 
            />

            {/* Main Content */}
            <main className="relative z-10 pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Hero Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 pt-6">
                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center px-4 py-2 mb-6 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-[0.25em] uppercase"
                    >
                        <span>UPRISE 2027 • CAMPUS & COMMUNITY ALLIANCE</span>
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-3xl sm:text-5xl lg:text-6xl font-black font-heading tracking-wider leading-tight text-white mb-6 uppercase"
                    >
                        COLLEGE CLUB & COMMUNITY <br className="hidden sm:inline" />
                        <span className="text-gold bright">ACTIVITIES</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-lightgrey text-base sm:text-lg max-w-3xl mx-auto leading-relaxed mb-8"
                    >
                        High-impact strategic milestones crafted for collegiate clubs, student chapters, and technical societies. 
                        Mobilize your campus, complete activities, and watch your club earn verified XP automatically on the <strong>Student Communities Leaderboard</strong>.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-wrap items-center justify-center gap-4"
                    >
                        <a
                            href="https://account.levelupevents.in/join-as-club/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gold hover:bg-gold/90 text-black font-heading font-black text-sm tracking-widest uppercase transition-all shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:shadow-[0_0_35px_rgba(212,175,55,0.7)]"
                        >
                            <span>Register Your Club Now</span>
                            <span>→</span>
                        </a>

                        <Link
                            to="/uprise#arena"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-pitchblack hover:bg-gold/10 text-gold border border-gold/40 hover:border-gold font-heading font-bold text-sm tracking-widest uppercase transition-all"
                        >
                            <span>View Club Leaderboard</span>
                        </Link>
                    </motion.div>

                    {/* Notice Banner */}
                    <div className="mt-8 inline-block bg-emerald-500/10 border border-emerald-500/40 rounded-lg px-6 py-3 text-xs sm:text-sm text-emerald-300 font-medium">
                        <strong>⚡ Automatic XP System:</strong> Complete the activities below to automatically credit verified XP directly to your registered club profile and live leaderboard standing!
                    </div>
                </div>

                {/* Active Participating Club Banner / Quick Club Activation Bar */}
                {currentUser?.email ? (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-5 sm:p-6 bg-gradient-to-r from-gold/20 via-[#0D1017] to-gold/20 border-2 border-gold/60 shadow-[0_0_30px_rgba(212,175,55,0.25)] flex flex-wrap items-center justify-between gap-5 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-black border-2 border-gold flex items-center justify-center text-3xl shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                                🏛️
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[11px] font-mono tracking-widest text-gold uppercase font-bold bg-gold/15 px-2 py-0.5 border border-gold/30">
                                        ACTIVE PARTICIPATING CLUB
                                    </span>
                                    <span className="text-[11px] font-mono text-emerald-400 font-bold">
                                        ● VERIFIED FOR XP
                                    </span>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-black font-heading text-white tracking-wide">
                                    {currentUser.club_name || currentUser.full_name || currentUser.email}
                                </h2>
                                <p className="text-xs text-lightgrey font-mono mt-1">
                                    Registered Email: <span className="text-white font-bold">{currentUser.email}</span> • Club Invite Code: <span className="text-gold font-bold">{currentUser.coupon_code || 'UPRISE'}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-5">
                            <div className="text-right">
                                <div className="text-[10px] font-mono tracking-widest text-gold uppercase">CURRENT CLUB XP</div>
                                <div className="text-2xl sm:text-3xl font-black font-heading text-gold">
                                    {(currentUser.total_xp || 0).toLocaleString()} XP
                                </div>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="px-4 py-2 bg-black/80 border border-gold/40 hover:border-gold text-gold hover:text-white text-xs font-mono uppercase tracking-wider transition-all"
                            >
                                Switch Club ↻
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 p-5 sm:p-6 bg-black/80 border border-gold/40 shadow-[0_0_20px_rgba(212,175,55,0.15)] flex flex-wrap items-center justify-between gap-4 backdrop-blur-md"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-3xl">🏛️</span>
                            <div>
                                <h4 className="text-sm sm:text-base font-bold font-heading text-white uppercase tracking-wider">
                                    Identify Your Club To Gain Live XP & Complete Activities
                                </h4>
                                <p className="text-xs text-lightgrey">
                                    Enter your registered club email to attribute XP directly to your college community standing.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="club@college.edu or referral code"
                                value={quickClubInput}
                                onChange={(e) => setQuickClubInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleQuickClubActivate()}
                                className="px-4 py-2.5 bg-black border border-gold/40 focus:border-gold text-white text-xs font-mono flex-1 sm:w-72 outline-none"
                            />
                            <button
                                type="button"
                                disabled={quickClubLoading}
                                onClick={() => handleQuickClubActivate()}
                                className="px-5 py-2.5 bg-gold hover:bg-gold/90 text-black font-heading font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all disabled:opacity-50"
                            >
                                {quickClubLoading ? 'Checking...' : 'Activate Club ⚡'}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {activities.map((act, index) => {
                        const completed = isTaskCompleted(act.key);
                        return (
                            <motion.div
                                key={act.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.04 }}
                                className="group relative bg-[#0D1017]/90 border border-gold/25 hover:border-gold/60 p-6 sm:p-8 rounded-none transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(212,175,55,0.18)]"
                                style={{
                                    backdropFilter: 'blur(10px)',
                                }}
                            >
                                {/* Card Accent Top Bar */}
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                <div>
                                    {/* Header: Clean SVG Icon + Number */}
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-12 h-12 flex items-center justify-center bg-black border border-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.15)] group-hover:border-gold group-hover:shadow-[0_0_18px_rgba(212,175,55,0.4)] transition-all">
                                            <ActivityIcon id={act.id} />
                                        </div>
                                        <span className="font-heading text-3xl font-black text-white/20 group-hover:text-gold/40 transition-colors">
                                            {act.num}
                                        </span>
                                    </div>

                                    {/* Category Tag */}
                                    <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-gold uppercase mb-2">
                                        <span>{act.category}</span>
                                        {act.id === 10 && (
                                            <span className="text-[10px] font-bold px-2 py-0.5 border border-amber-500/60 bg-amber-500/15 text-amber-300 tracking-wider">
                                                🔥 48H BLITZ (7PM TODAY → NOV 4)
                                            </span>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-gold transition-colors tracking-wide mb-3">
                                        {act.title}
                                    </h3>

                                    {/* Core Requirement */}
                                    <div className="text-sm font-semibold text-white/90 mb-3 pb-3 border-b border-white/10">
                                        {act.description}
                                    </div>

                                    {/* Detailed Explanation */}
                                    <p className="text-xs text-lightgrey/80 leading-relaxed mb-4">
                                        {act.details}
                                    </p>
                                </div>

                                <div>
                                    {/* Action Button */}
                                    <div className="mt-4">
                                        {completed && !act.isRepeatable ? (
                                            <button
                                                type="button"
                                                disabled
                                                className="w-full py-2.5 px-4 bg-emerald-500/15 border border-emerald-500/50 text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-default shadow-[0_0_12px_rgba(16,185,129,0.25)]"
                                            >
                                                <span>✓ COMPLETED (+{act.xpBadge})</span>
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => handleActionClick(act)}
                                                className="w-full py-2.5 px-4 bg-black hover:bg-gold/15 text-gold border border-gold font-heading font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_20px_rgba(212,175,55,0.45)] cursor-pointer"
                                            >
                                                <span>⚡ {act.actionText}</span>
                                            </button>
                                        )}
                                    </div>

                                    {/* Bottom XP Badge */}
                                    <div className="mt-5 pt-3 border-t border-gold/20 flex items-center justify-between">
                                        <span className="inline-flex items-center text-xs font-black text-gold tracking-wider uppercase bg-gold/10 px-3 py-1.5 border border-gold/30">
                                            {act.xpBadge}
                                        </span>
                                        <span className="text-xs text-lightgrey font-mono group-hover:text-white transition-colors">
                                            UPRISE 2027
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Bottom Callout Banner */}
                <div className="mt-16 bg-gradient-to-r from-gold/15 via-pitchblack to-gold/15 border border-gold/30 p-8 sm:p-12 text-center max-w-4xl mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-wider uppercase text-white mb-4">
                        READY TO PUT YOUR CAMPUS ON THE MAP?
                    </h3>
                    <p className="text-lightgrey text-sm sm:text-base max-w-2xl mx-auto mb-8">
                        Register your college technical club or society today. When your campus community members register using your referral, you earn <strong>1,000 XP</strong> instantly!
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="https://account.levelupevents.in/join-as-club/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-gold hover:bg-gold/90 text-black font-heading font-black text-xs tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                        >
                            <span>Register as Club</span>
                        </a>
                        <Link
                            to="/uprise#arena"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-gold/10 text-gold border border-gold/40 font-heading font-bold text-xs tracking-widest uppercase transition-all"
                        >
                            <span>STUDENT COMMUNITIES LEADERBOARD →</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Custom Interactive Activity Claim Modal */}
            <AnimatePresence>
                {claimModalData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            className="relative w-full max-w-lg bg-[#0c121e] border border-gold/40 p-6 sm:p-8 rounded-none shadow-[0_0_50px_rgba(212,175,55,0.3)]"
                        >
                            {/* Close Button */}
                            <button
                                type="button"
                                onClick={() => setClaimModalData(null)}
                                className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl font-bold transition-colors"
                            >
                                &times;
                            </button>

                            <div className="inline-block px-3 py-1 bg-gold/10 border border-gold/30 text-gold text-xs font-mono tracking-widest uppercase mb-3">
                                {claimModalData.category} • {claimModalData.xpBadge}
                            </div>

                            <h3 className="text-2xl font-black font-heading text-white mb-2 uppercase tracking-wide">
                                {claimModalData.title}
                            </h3>

                            <p className="text-xs sm:text-sm text-lightgrey mb-6 leading-relaxed">
                                {claimModalData.instructions}
                            </p>

                            {/* 1. 100 Spartan Challenge View */}
                            {claimModalData.isSpartan100 ? (
                                <div className="space-y-4">
                                    <div className="p-4 bg-black/90 border border-gold/40">
                                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                                            <span className="text-lightgrey uppercase">Verified Spartan Registrations:</span>
                                            <strong className="text-gold text-sm font-bold">
                                                {currentUser?.referral_count || 0} / 100
                                            </strong>
                                        </div>
                                        <div className="w-full bg-white/10 h-3 border border-gold/30 overflow-hidden mb-3">
                                            <div
                                                className="bg-gold h-full transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                                                style={{ width: `${Math.min(100, ((currentUser?.referral_count || 0) / 100) * 100)}%` }}
                                            />
                                        </div>
                                        {(currentUser?.referral_count || 0) < 100 ? (
                                            <div className="text-xs text-amber-300 font-mono space-y-2">
                                                <p>
                                                    ⚠️ Milestone locked: Your club currently has <strong>{currentUser?.referral_count || 0}</strong> registrations. You need <strong>{100 - (currentUser?.referral_count || 0)}</strong> more student registrations using your club referral code to unlock +10,000 XP!
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        const code = currentUser?.coupon_code || '';
                                                        navigator.clipboard.writeText(`Join Uprise 2027 with code ${code}: https://levelupevents.in/pre-hackathon?ref=${code}`);
                                                        setToastMsg('📋 Club referral link copied to clipboard!');
                                                        setTimeout(() => setToastMsg(null), 3000);
                                                    }}
                                                    className="w-full py-2.5 px-3 bg-gold/15 hover:bg-gold text-gold hover:text-black border border-gold font-heading font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                                                >
                                                    📋 COPY CLUB INVITE LINK TO SHARE WITH STUDENTS
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-xs text-emerald-400 font-bold font-mono">
                                                ✓ 100 Student registrations verified! Click below to claim your +10,000 XP reward.
                                            </div>
                                        )}
                                    </div>

                                    {(currentUser?.referral_count || 0) >= 100 ? (
                                        <button
                                            type="button"
                                            disabled={claimSubmitting}
                                            onClick={executeClaim}
                                            className="w-full py-3 bg-gold hover:bg-gold/90 text-black font-heading font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] cursor-pointer disabled:opacity-50"
                                        >
                                            {claimSubmitting ? 'VERIFYING...' : '✓ CLAIM 100 SPARTAN REWARD (+10,000 XP)'}
                                        </button>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setClaimModalData(null)}
                                            className="w-full py-2.5 bg-black border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider hover:border-gold cursor-pointer"
                                        >
                                            CLOSE
                                        </button>
                                    )}
                                </div>
                            ) : claimModalData.isReferralBoost ? (
                                /* 2. 48-Hour Infiltration Boost View */
                                <div className="space-y-4">
                                    <div className="p-4 bg-black/90 border border-gold/40">
                                        <div className="text-xs text-gold font-mono uppercase tracking-wider mb-2 font-bold">
                                            🔥 5X SPRINT MULTIPLIER ACTIVE
                                        </div>
                                        <p className="text-xs text-lightgrey leading-relaxed mb-4 font-mono">
                                            This activity is an active referral boost multiplier: every student who registers for Uprise using your club's code awards <strong>+250 XP</strong> directly to your club standing on the live leaderboard! (Standard rate is 50 XP).
                                        </p>
                                        <div className="p-3 bg-black border border-gold/30 flex items-center justify-between gap-3 mb-4">
                                            <div className="flex flex-col">
                                                <span className="text-[10px] text-gray-400 uppercase font-mono">Your Club Code:</span>
                                                <strong className="text-gold font-mono text-sm tracking-wider">{currentUser?.coupon_code || 'REGISTERED_CODE'}</strong>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const code = currentUser?.coupon_code || '';
                                                    navigator.clipboard.writeText(`Join Uprise 2027 with our club referral code: ${code}\nRegister at https://levelupevents.in/pre-hackathon?ref=${code}`);
                                                    setToastMsg('📋 Club code & invite link copied!');
                                                    setTimeout(() => setToastMsg(null), 3000);
                                                }}
                                                className="px-3 py-1.5 bg-gold text-black font-heading font-bold text-xs uppercase tracking-wider cursor-pointer"
                                            >
                                                COPY INVITE
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setClaimModalData(null)}
                                        className="w-full py-2.5 bg-black border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider hover:border-gold cursor-pointer"
                                    >
                                        CLOSE
                                    </button>
                                </div>
                            ) : claimModalData.isContactAdmin ? (
                                /* 3. Plan an Event Admin Contact Actions */
                                <div className="space-y-4">
                                    <p className="text-xs text-lightgrey leading-relaxed">
                                        Connect directly with the core Uprise organising committee to pitch your bespoke campus hackathon or AI workshop. XP (+5,000 XP) and sponsored prizes are credited once your event dates are confirmed:
                                    </p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                                        <a
                                            href="mailto:support@levelupevents.in?subject=Uprise%202027%20-%20Campus%20Event%20Collaboration%20Pitch"
                                            className="py-3 px-4 bg-black hover:bg-gold/15 text-gold border border-gold/40 hover:border-gold text-center font-bold text-xs uppercase tracking-wider transition-all no-underline"
                                        >
                                            ✉️ Email Committee
                                        </a>
                                        <a
                                            href="https://discord.gg/BxkRwU6X5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-3 px-4 bg-black hover:bg-[#5865F2]/20 text-[#5865F2] hover:text-white border border-[#5865F2]/40 text-center font-bold text-xs uppercase tracking-wider transition-all no-underline"
                                        >
                                            💬 Discord Admin POC
                                        </a>
                                    </div>
                                    <div className="p-3 bg-black/60 border border-white/10 text-[11px] text-lightgrey font-mono mt-2">
                                        ℹ️ Note: This challenge requires formal admin approval. No XP is granted without verified event scheduling.
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setClaimModalData(null)}
                                        className="w-full mt-2 py-2.5 bg-black border border-white/20 text-white font-heading font-bold text-xs uppercase tracking-wider hover:border-gold cursor-pointer"
                                    >
                                        CLOSE
                                    </button>
                                </div>
                            ) : (
                                /* 4. All Other Proof-Required Activities */
                                <form onSubmit={executeClaim} className="space-y-4">
                                    {/* Strength Share Draft Box */}
                                    {claimModalData.isDraftShare && (
                                        <div className="p-3.5 bg-black/90 border border-gold/30">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[11px] font-mono text-gold uppercase tracking-wider">
                                                    Drafted Announcement Message:
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={copyDraftedMessage}
                                                    className="px-2.5 py-1 bg-gold/20 hover:bg-gold text-gold hover:text-black font-mono text-[10px] font-bold uppercase transition-all cursor-pointer"
                                                >
                                                    {copiedMessage ? '✓ COPIED!' : '📋 COPY MESSAGE'}
                                                </button>
                                            </div>
                                            <p className="text-xs text-white/80 font-mono leading-relaxed bg-black/60 p-2 border border-white/10 select-all">
                                                🚀 Big announcement! Our campus club has officially partnered with Uprise 2027 — the ultimate pan-India hackathon and builder gauntlet! 🏆 Compete for cash prizes, developer bounties, and startup access.<br /><br />
                                                Register your team now with our exclusive campus invite code: <strong className="text-gold">{currentUser?.coupon_code || 'YOUR_CLUB_CODE'}</strong><br />
                                                Register here: https://levelupevents.in/pre-hackathon
                                            </p>
                                        </div>
                                    )}

                                    {/* Club Dropdown / Email */}
                                    {!currentUser?.email && registeredClubs.length > 0 && (
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5">
                                                Select Registered Club
                                            </label>
                                            <select
                                                onChange={(e) => {
                                                    const selCode = e.target.value;
                                                    if (selCode) {
                                                        const match = registeredClubs.find(c => c.coupon_code === selCode || c.name === selCode);
                                                        if (match) {
                                                            setManualEmail(match.coupon_code || match.name);
                                                        }
                                                    }
                                                }}
                                                className="w-full px-3 py-2.5 bg-black border border-gold/30 text-gold text-xs outline-none font-mono"
                                            >
                                                <option value="">-- Choose from registered college clubs --</option>
                                                {registeredClubs.map((c, i) => (
                                                    <option key={i} value={c.coupon_code}>
                                                        {c.name} {c.organization ? `(${c.organization})` : ''} • Code: {c.coupon_code}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    {/* Club Identifier */}
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5">
                                            {currentUser?.email ? 'Active Club' : 'Registered Club Email or Referral Code'}
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={currentUser?.email ? `${currentUser.club_name || currentUser.full_name} (${currentUser.email})` : manualEmail}
                                            disabled={!!currentUser?.email}
                                            onChange={(e) => setManualEmail(e.target.value)}
                                            placeholder="e.g. acm@college.edu or UPRISEGDSC"
                                            className="w-full px-4 py-2.5 bg-black border border-gold/30 focus:border-gold text-white text-xs outline-none transition-colors font-mono disabled:opacity-75 disabled:border-emerald-500/50"
                                        />
                                    </div>

                                    {/* Problem Solver Count Field */}
                                    {claimModalData.isRepeatable && (
                                        <div>
                                            <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5">
                                                Number of Delivered Problems (2,500 XP each)
                                            </label>
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="100"
                                                    value={problemCount}
                                                    onChange={(e) => setProblemCount(Math.max(1, parseInt(e.target.value) || 1))}
                                                    className="w-24 px-4 py-2 bg-black border border-gold/30 focus:border-gold text-white text-sm outline-none font-mono font-bold"
                                                />
                                                <span className="text-sm font-bold text-emerald-400">
                                                    = +{(problemCount * 2500).toLocaleString()} XP Total
                                                </span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Mandatory Proof URL */}
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-gold mb-1.5">
                                            {claimModalData.proofLabel || "Submission Proof URL (Drive / Post / Repo Link)"} <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            value={proofUrl}
                                            onChange={(e) => setProofUrl(e.target.value)}
                                            placeholder={claimModalData.proofPlaceholder || "https://..."}
                                            className="w-full px-4 py-2.5 bg-black border border-gold/40 focus:border-gold text-white text-xs outline-none transition-colors font-mono"
                                        />
                                        <p className="text-[11px] text-white/50 mt-1 font-mono">
                                            Evidence link is required to verify that the task has been completed before XP is credited.
                                        </p>
                                    </div>

                                    {/* Optional Details / Summary */}
                                    <div>
                                        <label className="block text-xs font-mono uppercase tracking-wider text-lightgrey mb-1.5">
                                            {claimModalData.detailsLabel || "Additional Details / Summary"} (Optional)
                                        </label>
                                        <textarea
                                            rows={2}
                                            value={proofDetails}
                                            onChange={(e) => setProofDetails(e.target.value)}
                                            placeholder={claimModalData.detailsPlaceholder || "e.g. Brief summary of completion, date, or members involved"}
                                            className="w-full px-4 py-2 bg-black border border-white/20 focus:border-gold text-white text-xs outline-none transition-colors font-mono resize-none"
                                        />
                                    </div>

                                    <div className="pt-3 flex items-center justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setClaimModalData(null)}
                                            className="px-4 py-2.5 bg-black border border-white/20 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={claimSubmitting}
                                            className="px-6 py-2.5 bg-gold hover:bg-gold/90 text-black font-heading font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] disabled:opacity-50 cursor-pointer"
                                        >
                                            {claimSubmitting ? 'VERIFYING...' : `✓ SUBMIT PROOF & CLAIM XP`}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Login Modal */}
            <UpriseLoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={(userData) => {
                    setCurrentUser(userData);
                    setIsLoginModalOpen(false);
                }}
            />
        </div>
    );
};

export default ClubActivities;
