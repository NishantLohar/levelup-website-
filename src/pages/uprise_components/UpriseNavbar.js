import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const UpriseNavbar = ({ user, onOpenLogin, onLogout }) => {
    const [copied, setCopied] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleCopyCoupon = () => {
        if (user?.coupon_code) {
            navigator.clipboard.writeText(user.coupon_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <header 
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300 uprise-header-bar"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
                
                {/* ======================================================== */}
                {/* 1. DESKTOP VIEW (Visible on md and up: >= 768px)          */}
                {/* ======================================================== */}
                <div className="hidden md:flex items-center justify-between w-full">
                    {/* Left: Back Button to Home & About */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        <Link
                            to="/"
                            className="uprise-back-button"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '8px 16px',
                                backgroundColor: '#000000',
                                border: '1px solid #D4AF37',
                                color: '#D4AF37',
                                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                fontWeight: '700',
                                fontSize: '11px',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 12px rgba(212, 175, 55, 0.2)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#D4AF37';
                                e.currentTarget.style.color = '#000000';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#000000';
                                e.currentTarget.style.color = '#D4AF37';
                                e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.2)';
                            }}
                        >
                            <span style={{ fontSize: '14px', lineHeight: 1 }}>←</span>
                            <span>Back</span>
                        </Link>
                    
                        {/* About Button - Opens UPRISE Master Deck */}
                        <a
                            href={`${process.env.PUBLIC_URL || ''}/UPRISE Master deck.pdf`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="uprise-about-button"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px 16px',
                                backgroundColor: '#000000',
                                border: '1px solid #D4AF37',
                                color: '#D4AF37',
                                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                fontWeight: '700',
                                fontSize: '11px',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 12px rgba(212, 175, 55, 0.2)',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#D4AF37';
                                e.currentTarget.style.color = '#000000';
                                e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = '#000000';
                                e.currentTarget.style.color = '#D4AF37';
                                e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.2)';
                            }}
                            title="Open Uprise Master Deck PDF"
                        >
                            <span>About</span>
                        </a>
                    </div>

                    {/* Right: Club Actions & User State */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* Register as Club Button */}
                        <a
                            href="https://account.levelupevents.in/join-as-club/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="uprise-club-btn"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px 14px',
                                backgroundColor: 'rgba(212, 175, 55, 0.12)',
                                border: '1px solid #D4AF37',
                                color: '#D4AF37',
                                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                fontWeight: '700',
                                fontSize: '11px',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = '#D4AF37';
                                e.currentTarget.style.color = '#000000';
                                e.currentTarget.style.boxShadow = '0 0 18px rgba(212, 175, 55, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.12)';
                                e.currentTarget.style.color = '#D4AF37';
                                e.currentTarget.style.boxShadow = '0 0 10px rgba(212, 175, 55, 0.2)';
                            }}
                            title="Register your college club on LevelUp SaaS"
                        >
                            <span>Register as Club</span>
                        </a>

                        {/* See Club Activities Button */}
                        <Link
                            to="/club-activities"
                            className="uprise-activities-btn"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '8px 14px',
                                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.25)',
                                color: '#FFFFFF',
                                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                fontWeight: '700',
                                fontSize: '11px',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                whiteSpace: 'nowrap',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                                e.currentTarget.style.borderColor = '#FFFFFF';
                                e.currentTarget.style.color = '#FFFFFF';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                                e.currentTarget.style.color = '#FFFFFF';
                            }}
                            title="View all verified club activities & challenges"
                        >
                            <span>See Club Activities</span>
                        </Link>

                        {/* User / Authentication State */}
                        {user ? (
                            <div className="flex items-center gap-2">
                                {/* Coupon Pill with Copy */}
                                {user.coupon_code && (
                                    <button
                                        type="button"
                                        onClick={handleCopyCoupon}
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '8px',
                                            padding: '6px 12px',
                                            backgroundColor: '#050505',
                                            border: '1px solid #D4AF37',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            outline: 'none',
                                            boxShadow: '0 0 12px rgba(212, 175, 55, 0.25)',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.borderColor = '#FFFFFF';
                                            e.currentTarget.style.boxShadow = '0 0 18px rgba(212, 175, 55, 0.45)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = '#D4AF37';
                                            e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.25)';
                                        }}
                                        title="Click to copy your handy Uprise referral coupon code"
                                    >
                                        <span style={{ color: '#888888', fontSize: '10px', fontWeight: '700', letterSpacing: '1px' }}>
                                            COUPON:
                                        </span>
                                        <strong style={{ color: '#D4AF37', fontFamily: 'monospace', fontSize: '12px', letterSpacing: '1.5px' }}>
                                            {user.coupon_code}
                                        </strong>
                                        <span 
                                            style={{ 
                                                color: copied ? '#4ADE80' : '#D4AF37', 
                                                fontSize: '9px', 
                                                fontWeight: '800',
                                                padding: '2px 5px', 
                                                backgroundColor: copied ? 'rgba(74, 222, 128, 0.15)' : 'rgba(212, 175, 55, 0.15)', 
                                                border: copied ? '1px solid rgba(74, 222, 128, 0.5)' : '1px solid rgba(212, 175, 55, 0.4)',
                                                letterSpacing: '1px',
                                                textTransform: 'uppercase'
                                            }}
                                        >
                                            {copied ? 'COPIED!' : 'COPY'}
                                        </span>
                                    </button>
                                )}

                                {/* XP Pill */}
                                <div 
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '7px 12px',
                                        backgroundColor: '#0A0A0A',
                                        border: '1px solid rgba(212, 175, 55, 0.5)',
                                        color: '#D4AF37',
                                        fontWeight: '700',
                                        fontSize: '11px',
                                        letterSpacing: '1px',
                                        boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)',
                                    }}
                                >
                                    <span style={{ fontSize: '12px' }}>🏆</span>
                                    <span>{user.total_xp || 0} XP</span>
                                </div>

                                {/* User Name & Logout */}
                                <div className="flex items-center gap-2 pl-2" style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                    <span 
                                        className="inline-block"
                                        style={{
                                            color: '#FFFFFF',
                                            fontSize: '12px',
                                            fontWeight: '600',
                                            maxWidth: '120px',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                                        title={user.email}
                                    >
                                        {user.full_name || user.email?.split('@')[0]}
                                    </span>
                                    <button 
                                        type="button"
                                        onClick={onLogout}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                            border: '1px solid rgba(239, 68, 68, 0.5)',
                                            color: '#F87171',
                                            fontWeight: '700',
                                            fontSize: '10px',
                                            letterSpacing: '1.5px',
                                            textTransform: 'uppercase',
                                            cursor: 'pointer',
                                            outline: 'none',
                                            transition: 'all 0.2s ease',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor = '#EF4444';
                                            e.currentTarget.style.color = '#FFFFFF';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                                            e.currentTarget.style.color = '#F87171';
                                        }}
                                        title="Sign Out"
                                    >
                                        LOGOUT
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button
                                type="button"
                                onClick={onOpenLogin}
                                className="uprise-signin-button"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '8px 18px',
                                    backgroundColor: '#000000',
                                    border: '1px solid #D4AF37',
                                    color: '#D4AF37',
                                    fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                    fontWeight: '700',
                                    fontSize: '11px',
                                    letterSpacing: '1.5px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    outline: 'none',
                                    transition: 'all 0.3s ease',
                                    boxShadow: '0 0 12px rgba(212, 175, 55, 0.2)',
                                    whiteSpace: 'nowrap',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = '#D4AF37';
                                    e.currentTarget.style.color = '#000000';
                                    e.currentTarget.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.6)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = '#000000';
                                    e.currentTarget.style.color = '#D4AF37';
                                    e.currentTarget.style.boxShadow = '0 0 12px rgba(212, 175, 55, 0.2)';
                                }}
                            >
                                SIGN IN TO REDEEM YOUR REFERRAL CODE
                            </button>
                        )}
                    </div>
                </div>

                {/* ======================================================== */}
                {/* 2. MOBILE TOP BAR (Visible on screens < 768px)           */}
                {/* ======================================================== */}
                <div className="flex md:hidden items-center justify-between w-full">
                    {/* Left: Back & XP Badge */}
                    <div className="flex items-center gap-2">
                        <Link
                            to="/"
                            className="uprise-back-button"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '6px 12px',
                                backgroundColor: '#000000',
                                border: '1px solid #D4AF37',
                                color: '#D4AF37',
                                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                fontWeight: '700',
                                fontSize: '11px',
                                letterSpacing: '1px',
                                textTransform: 'uppercase',
                                textDecoration: 'none',
                                boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)',
                            }}
                        >
                            <span style={{ fontSize: '13px', lineHeight: 1 }}>←</span>
                            <span>Back</span>
                        </Link>

                        {user && (
                            <div 
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    padding: '5px 9px',
                                    backgroundColor: '#0A0A0A',
                                    border: '1px solid rgba(212, 175, 55, 0.5)',
                                    color: '#D4AF37',
                                    fontWeight: '700',
                                    fontSize: '11px',
                                    letterSpacing: '0.5px',
                                    boxShadow: '0 0 8px rgba(212, 175, 55, 0.2)',
                                }}
                            >
                                <span style={{ fontSize: '11px' }}>🏆</span>
                                <span>{user.total_xp || 0} XP</span>
                            </div>
                        )}
                    </div>

                    {/* Right: Sign In Quick Button & Menu Button */}
                    <div className="flex items-center gap-2">
                        {!user && (
                            <button
                                type="button"
                                onClick={onOpenLogin}
                                style={{
                                    padding: '6px 12px',
                                    backgroundColor: 'rgba(212, 175, 55, 0.15)',
                                    border: '1px solid #D4AF37',
                                    color: '#D4AF37',
                                    fontWeight: '800',
                                    fontSize: '10px',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    cursor: 'pointer',
                                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)',
                                }}
                            >
                                Sign In
                            </button>
                        )}

                        {/* Hamburger / Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(prev => !prev)}
                            aria-label="Toggle navigation menu"
                            style={{
                                width: '38px',
                                height: '38px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isMobileMenuOpen ? '#D4AF37' : '#000000',
                                border: '1px solid #D4AF37',
                                color: isMobileMenuOpen ? '#000000' : '#D4AF37',
                                cursor: 'pointer',
                                outline: 'none',
                                transition: 'all 0.25s ease',
                                boxShadow: isMobileMenuOpen 
                                    ? '0 0 16px rgba(212, 175, 55, 0.6)' 
                                    : '0 0 10px rgba(212, 175, 55, 0.2)',
                            }}
                        >
                            {isMobileMenuOpen ? (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px' }}>
                                    <line x1="4" y1="7" x2="20" y2="7"></line>
                                    <line x1="4" y1="12" x2="20" y2="12"></line>
                                    <line x1="4" y1="17" x2="20" y2="17"></line>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

            </div>

            {/* ======================================================== */}
            {/* 3. MOBILE DROPDOWN MENU (Smooth Animated Accordion)      */}
            {/* ======================================================== */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        style={{
                            overflow: 'hidden',
                            backgroundColor: 'rgba(5, 5, 5, 0.98)',
                            backdropFilter: 'blur(20px)',
                            WebkitBackdropFilter: 'blur(20px)',
                            borderBottom: '2px solid rgba(212, 175, 55, 0.4)',
                            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.95)',
                        }}
                        className="md:hidden"
                    >
                        <div className="px-4 py-5 flex flex-col gap-3.5 max-h-[calc(100vh-75px)] overflow-y-auto">
                            
                            {/* User Profile Card in Dropdown */}
                            {user ? (
                                <div className="p-3.5 bg-black/80 border border-[#D4AF37]/50 flex flex-col gap-3 shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase font-mono tracking-wider text-gray-400">
                                                Active Participant
                                            </span>
                                            <span className="text-white text-xs font-bold truncate max-w-[190px]">
                                                {user.full_name || user.email}
                                            </span>
                                        </div>
                                        <div className="px-2.5 py-1 bg-[#D4AF37]/15 border border-[#D4AF37] text-[#D4AF37] text-[11px] font-bold">
                                            🏆 {user.total_xp || 0} XP
                                        </div>
                                    </div>

                                    {/* Coupon Card with Copy */}
                                    {user.coupon_code && (
                                        <div className="flex items-center justify-between p-2.5 bg-[#050505] border border-[#D4AF37]/40">
                                            <div className="flex flex-col">
                                                <span className="text-[9px] uppercase font-mono tracking-wider text-gray-400">
                                                    Referral Code
                                                </span>
                                                <strong className="text-[#D4AF37] font-mono text-xs tracking-wider">
                                                    {user.coupon_code}
                                                </strong>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleCopyCoupon}
                                                className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                                                style={{
                                                    backgroundColor: copied ? 'rgba(74, 222, 128, 0.2)' : 'rgba(212, 175, 55, 0.2)',
                                                    border: copied ? '1px solid #4ADE80' : '1px solid #D4AF37',
                                                    color: copied ? '#4ADE80' : '#D4AF37',
                                                }}
                                            >
                                                {copied ? 'COPIED!' : 'COPY'}
                                            </button>
                                        </div>
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            onLogout();
                                        }}
                                        className="w-full py-2 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/40 text-[10px] font-bold uppercase tracking-widest transition-all text-center cursor-pointer"
                                    >
                                        LOGOUT / SIGN OUT
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        onOpenLogin();
                                    }}
                                    className="w-full py-3.5 px-4 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#D4AF37] text-black font-heading font-black text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)] text-center transition-all cursor-pointer"
                                >
                                    SIGN IN TO REDEEM YOUR REFERRAL CODE →
                                </button>
                            )}

                            {/* Navigation Links */}
                            <div className="flex flex-col gap-2">
                                {/* Register as Club */}
                                <a
                                    href="https://account.levelupevents.in/join-as-club/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3.5 bg-black/70 hover:bg-[#D4AF37]/15 border border-[#D4AF37]/50 hover:border-[#D4AF37] text-[#D4AF37] transition-all no-underline"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-base">🏛️</span>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                Register as Club
                                            </span>
                                            <span className="text-[10px] text-gray-400">
                                                Join LevelUp SaaS as official college club
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold">↗</span>
                                </a>

                                {/* See Club Activities */}
                                <Link
                                    to="/club-activities"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3.5 bg-black/70 hover:bg-white/10 border border-white/20 hover:border-white text-white transition-all no-underline"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-base">⚡</span>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                See Club Activities
                                            </span>
                                            <span className="text-[10px] text-gray-400">
                                                Explore participating campus clubs & tasks
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold">→</span>
                                </Link>

                                {/* About (Master Deck) */}
                                <a
                                    href={`${process.env.PUBLIC_URL || ''}/UPRISE Master deck.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-3.5 bg-black/70 hover:bg-white/10 border border-white/20 hover:border-[#D4AF37] text-gray-200 hover:text-white transition-all no-underline"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-base">📄</span>
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold uppercase tracking-wider">
                                                About Uprise (Deck)
                                            </span>
                                            <span className="text-[10px] text-gray-400">
                                                View official UPRISE master deck PDF
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-sm font-bold">↗</span>
                                </a>
                            </div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default UpriseNavbar;
