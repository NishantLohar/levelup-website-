import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UpriseLoginModal = ({ isOpen, onClose, onLoginSuccess }) => {
    const [email, setEmail] = useState(() => {
        try {
            return localStorage.getItem('uprise_remembered_email') || '';
        } catch (e) {
            return '';
        }
    });
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(() => {
        try {
            const saved = localStorage.getItem('uprise_remember_me');
            return saved !== null ? saved === 'true' : true;
        } catch (e) {
            return true;
        }
    });
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [needsProfileSetup, setNeedsProfileSetup] = useState(false);
    const [profileUrl, setProfileUrl] = useState('https://account.levelupevents.in/accounts/profile/');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg(null);
        setNeedsProfileSetup(false);

        const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';

        try {
            const res = await fetch(`${API_BASE_URL}/api/v1/uprise/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.trim().toLowerCase(),
                    password: password,
                }),
            });

            const data = await res.json();

            if (data.success && data.user) {
                // Save user session in localStorage or sessionStorage based on rememberMe
                if (rememberMe) {
                    localStorage.setItem('uprise_user', JSON.stringify(data.user));
                    localStorage.setItem('uprise_remember_me', 'true');
                    localStorage.setItem('uprise_remembered_email', email.trim().toLowerCase());
                    sessionStorage.removeItem('uprise_user');
                } else {
                    sessionStorage.setItem('uprise_user', JSON.stringify(data.user));
                    localStorage.removeItem('uprise_user');
                    localStorage.setItem('uprise_remember_me', 'false');
                    localStorage.removeItem('uprise_remembered_email');
                }
                onLoginSuccess(data.user);
                onClose();
            } else if (data.needs_profile_completion) {
                setNeedsProfileSetup(true);
                setErrorMsg(data.error);
                if (data.profile_url) setProfileUrl(data.profile_url);
            } else {
                setErrorMsg(data.error || 'Failed to authenticate. Please check your credentials.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setErrorMsg('Unable to connect to LevelUp SaaS. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[999999] bg-pitchblack/85 backdrop-blur-md flex items-center justify-center p-4 font-grotesk">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="glass-card border border-gold/40 p-8 sm:p-10 w-full max-w-md relative sharp gold-glow bg-obsidian text-white"
                >
                    {/* Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#A0A0A0',
                            fontSize: '18px',
                            cursor: 'pointer',
                            padding: '4px 8px',
                            lineHeight: 1,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = '#FFFFFF'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = '#A0A0A0'; }}
                        className="absolute top-5 right-5 font-mono"
                    >
                        ✕
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white font-heading">
                            SIGN IN TO <span className="text-gold bright">UPRISE</span>
                        </h3>
                        <p className="text-xs text-lightgrey mt-2">
                            Use your LevelUp SaaS credentials to track your XP, referrals, and activities.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="text-[11px] uppercase tracking-wider font-heading text-lightgrey block mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="student@college.edu"
                                required
                                className="w-full bg-pitchblack/70 border border-gold/30 focus:border-gold p-3 text-sm text-white font-grotesk outline-none transition-colors"
                            />
                        </div>

                        <div>
                            <label className="text-[11px] uppercase tracking-wider font-heading text-lightgrey block mb-1">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                required
                                className="w-full bg-pitchblack/70 border border-gold/30 focus:border-gold p-3 text-sm text-white font-grotesk outline-none transition-colors"
                            />
                        </div>

                        {/* Remember Me Button / Toggle */}
                        <div className="flex items-center justify-between py-1 px-0.5 select-none">
                            <button
                                type="button"
                                id="uprise-remember-me-btn"
                                onClick={() => setRememberMe(prev => !prev)}
                                className="flex items-center gap-2.5 text-left bg-transparent border-0 p-0 cursor-pointer group outline-none"
                            >
                                <div
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        border: rememberMe ? '1px solid #D4AF37' : '1px solid rgba(212, 175, 55, 0.4)',
                                        backgroundColor: rememberMe ? '#D4AF37' : 'rgba(0, 0, 0, 0.6)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transition: 'all 0.2s ease',
                                        boxShadow: rememberMe ? '0 0 10px rgba(212, 175, 55, 0.35)' : 'none',
                                    }}
                                >
                                    {rememberMe && (
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                    )}
                                </div>
                                <span
                                    style={{
                                        color: rememberMe ? '#FFFFFF' : '#A0A0A0',
                                        fontSize: '11px',
                                        fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                        fontWeight: '700',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        transition: 'color 0.2s ease',
                                    }}
                                    className="group-hover:text-white"
                                >
                                    Remember Me
                                </span>
                            </button>
                            <span
                                style={{
                                    fontSize: '10px',
                                    color: rememberMe ? '#D4AF37' : '#666666',
                                    letterSpacing: '1px',
                                    textTransform: 'uppercase',
                                    fontWeight: '700',
                                    fontFamily: "'Space Grotesk', monospace",
                                }}
                            >
                                {rememberMe ? 'ALWAYS LOGGED IN' : 'SESSION ONLY'}
                            </span>
                        </div>

                        {/* Error Notice */}
                        {errorMsg && (
                            <div className="p-3 bg-red-500/10 border border-red-500/40 text-red-300 text-xs leading-relaxed">
                                <span className="font-bold">Notice:</span> {errorMsg}
                            </div>
                        )}

                        {/* Incomplete Profile / No Password Banner */}
                        {needsProfileSetup && (
                            <div className="p-4 bg-gold/10 border border-gold text-xs text-white flex flex-col gap-3 gold-glow">
                                <div className="flex items-center gap-2 text-gold font-bold">
                                    <span>⚠️</span>
                                    <span>PASSWORD NOT SET</span>
                                </div>
                                <p className="text-lightgrey leading-relaxed">
                                    You registered for the event! To activate sign-in and claim an extra <strong className="text-gold">+50 XP bonus</strong>, complete your profile and set a password on LevelUp SaaS.
                                </p>
                                <a
                                    href={profileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        backgroundColor: '#D4AF37',
                                        color: '#000000',
                                        fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                        fontWeight: '700',
                                        textAlign: 'center',
                                        padding: '10px 14px',
                                        fontSize: '12px',
                                        letterSpacing: '1px',
                                        textTransform: 'uppercase',
                                        textDecoration: 'none',
                                        display: 'block',
                                        transition: 'all 0.2s ease',
                                    }}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#FFFFFF'; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#D4AF37'; }}
                                >
                                    Complete Profile & Set Password &rarr;
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                backgroundColor: loading ? 'rgba(212, 175, 55, 0.5)' : '#D4AF37',
                                color: '#000000',
                                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                fontWeight: '800',
                                padding: '14px',
                                fontSize: '13px',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                border: 'none',
                                outline: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                transition: 'all 0.3s ease',
                                marginTop: '4px',
                            }}
                            onMouseEnter={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                                    e.currentTarget.style.boxShadow = '0 0 20px #FFFFFF';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!loading) {
                                    e.currentTarget.style.backgroundColor = '#D4AF37';
                                    e.currentTarget.style.boxShadow = 'none';
                                }
                            }}
                        >
                            {loading ? 'AUTHENTICATING...' : 'SIGN IN'}
                        </button>
                    </form>

                    {/* Footer register link */}
                    <div className="mt-6 pt-4 border-t border-lightgrey/10 text-center text-xs text-lightgrey">
                        <span>Haven't registered or need to set password? </span>
                        <a
                            href="https://account.levelupevents.in/accounts/profile/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gold font-bold hover:underline"
                        >
                            Register / Complete Profile
                        </a>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default UpriseLoginModal;
