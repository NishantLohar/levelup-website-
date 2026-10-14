import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import UpriseNavbar from './uprise_components/UpriseNavbar';
import UpriseLoginModal from './uprise_components/UpriseLoginModal';
import './Uprise.css';

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

    useEffect(() => {
        window.scrollTo(0, 0);

        if (currentUser?.email) {
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';
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
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('uprise_user');
        setCurrentUser(null);
    };

    const activities = [
        {
            id: 1,
            num: "01",
            title: "100 Spartan Challenge",
            category: "COMMUNITY ONBOARDING",
            icon: "🛡️",
            description: "Colleges to get 100 registrations and complete hirestop profiles.",
            details: "Mobilize your campus builders! Every verified registration with a completed Hirestop profile counts toward your institution's Spartan quota.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 2,
            num: "02",
            title: "Hack Initiation",
            category: "LOCAL HACKATHON",
            icon: "💻",
            description: "Host 2 hours collaborated offline hackathon with Uprise's easy problem statement.",
            details: "Organize an on-campus mini sprint using standard Uprise problem tracks to ignite competitive coding in your institution.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 3,
            num: "03",
            title: "Survival Metric",
            category: "ENGAGEMENT INTEGRITY",
            icon: "🎯",
            description: "Negative marking for inactive users.",
            details: "Keep your registered cohort active. Inactive participants deduct vitality points from the community's overall leaderboard standing.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 4,
            num: "04",
            title: "Cross-Campus Event",
            category: "INTER-COLLEGE NETWORKING",
            icon: "🌐",
            description: "Host a Discord event on Uprise server for networking with co-communities and participants.",
            details: "Co-host an interactive community session, AMA, or workshop on the official Uprise Discord to bridge collegiate networks.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 5,
            num: "05",
            title: "Pitch Simulation",
            category: "STARTUP SIMULATION",
            icon: "🚀",
            description: "Host an inter-college collaborated startup pitch online.",
            details: "Simulate a high-stakes founder showcase with peer institutions. Showcase student prototypes to judges and prospective builders.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 6,
            num: "06",
            title: "Golden Ticket Reveal",
            category: "VIRAL CAMPAIGN",
            icon: "🎫",
            description: "Capture reaction of the members getting golden ticket for uprise and post on all social media handles.",
            details: "Document the celebration! Film high-energy unboxing and reaction clips as members receive their official Uprise Golden Pass.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 7,
            num: "07",
            title: "Instagram & LinkedIn Drop",
            category: "MEDIA BROADCAST",
            icon: "📢",
            description: "Post a banner informing your participation for Uprise.",
            details: "Broadcast your club's official alliance with Uprise across Instagram and LinkedIn with verified tags and alliance banners.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 8,
            num: "08",
            title: "Guerilla Tag",
            category: "CAMPUS TAKEOVER",
            icon: "📌",
            description: "Poster on department's notice board and capture it to post on social media handles.",
            details: "Physical presence meets digital reach. Put up official posters on college noticeboards and tag @levelupofficial.in.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        },
        {
            id: 9,
            num: "09",
            title: "The Problem Solver",
            category: "INDIVIDUAL EXECUTION",
            icon: "🧠",
            description: "High rate XPs on delivering project on individual basis during pre hackathon.",
            details: "Individual members delivering standalone prototypes during the pre-hackathon grant massive multiplier XP to their parent club.",
            xpBadge: "⚡ XP: TO BE ALLOCATED"
        }
    ];

    return (
        <div className="min-h-screen bg-pitchblack text-white relative font-grotesk overflow-x-hidden">
            {/* Ambient Background Elements */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold/10 blur-[150px] rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-[500px] h-[400px] bg-gold/5 blur-[120px] rounded-full"></div>
            </div>

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
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-bold tracking-[0.25em] uppercase"
                    >
                        <span>🏛️</span>
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
                        9 strategic milestones crafted for collegiate clubs, student chapters, and technical societies. 
                        Mobilize your campus, complete challenges, and dominate the <strong>College Communities Leaderboard</strong>.
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
                            <span>🏛️</span>
                            <span>Register Your Club Now</span>
                            <span>→</span>
                        </a>

                        <Link
                            to="/uprise#arena"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-pitchblack hover:bg-gold/10 text-gold border border-gold/40 hover:border-gold font-heading font-bold text-sm tracking-widest uppercase transition-all"
                        >
                            <span>🏆</span>
                            <span>View Club Leaderboard</span>
                        </Link>
                    </motion.div>

                    {/* Notice Banner */}
                    <div className="mt-8 inline-block bg-gold/10 border border-gold/30 rounded-lg px-6 py-3 text-xs sm:text-sm text-gold/90 font-medium">
                        ⚡ <strong>XP Allocation Note:</strong> Official point multipliers and community XP rewards for each activity will be assigned and updated live soon!
                    </div>
                </div>

                {/* Activities Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {activities.map((act, index) => (
                        <motion.div
                            key={act.id}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.06 }}
                            className="group relative bg-[#0D1017]/90 border border-gold/25 hover:border-gold/60 p-6 sm:p-8 rounded-none transition-all duration-300 flex flex-col justify-between hover:shadow-[0_0_30px_rgba(212,175,55,0.18)]"
                            style={{
                                backdropFilter: 'blur(10px)',
                            }}
                        >
                            {/* Card Accent Top Bar */}
                            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div>
                                {/* Header: Icon + Number */}
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-3xl p-3 bg-pitchblack border border-gold/30 shadow-[0_0_12px_rgba(212,175,55,0.15)] inline-block">
                                        {act.icon}
                                    </span>
                                    <span className="font-heading text-3xl font-black text-white/20 group-hover:text-gold/40 transition-colors">
                                        {act.num}
                                    </span>
                                </div>

                                {/* Category Tag */}
                                <div className="text-[11px] font-mono tracking-widest text-gold uppercase mb-2">
                                    {act.category}
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
                                <p className="text-xs text-lightgrey/80 leading-relaxed">
                                    {act.details}
                                </p>
                            </div>

                            {/* Bottom XP Badge */}
                            <div className="mt-6 pt-4 border-t border-gold/20 flex items-center justify-between">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-gold tracking-wider uppercase bg-gold/10 px-3 py-1.5 border border-gold/30">
                                    {act.xpBadge}
                                </span>
                                <span className="text-xs text-lightgrey font-mono group-hover:text-white transition-colors">
                                    PHASE 1
                                </span>
                            </div>
                        </motion.div>
                    ))}
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
                            <span>🏛️</span>
                            <span>Register as Club</span>
                        </a>
                        <Link
                            to="/uprise#arena"
                            className="inline-flex items-center gap-2 px-8 py-3.5 bg-black hover:bg-gold/10 text-gold border border-gold/40 font-heading font-bold text-xs tracking-widest uppercase transition-all"
                        >
                            <span>COLLEGE COMMUNITIES LEADERBOARD →</span>
                        </Link>
                    </div>
                </div>
            </main>

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
