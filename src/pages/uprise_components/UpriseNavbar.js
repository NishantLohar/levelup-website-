import React from 'react';
import { Link } from 'react-router-dom';

const UpriseNavbar = ({ user, onOpenLogin, onLogout }) => {
    return (
        <header 
            className="fixed top-0 left-0 w-full z-50 transition-all duration-300 uprise-header-bar"
            style={{
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                {/* Left: Back Button to Home */}
                <div className="flex items-center">
                    <Link
                        to="/"
                        className="uprise-back-button"
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '9px 20px',
                            backgroundColor: '#000000',
                            border: '1px solid #D4AF37',
                            color: '#D4AF37',
                            fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                            fontWeight: '700',
                            fontSize: '12px',
                            letterSpacing: '2px',
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
                        <span style={{ fontSize: '15px', lineHeight: 1 }}>←</span>
                        <span>Back</span>
                    </Link>
                </div>

                {/* Right: Authentication / User State */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {user ? (
                        <div className="flex items-center gap-3">
                            {/* XP Pill */}
                            <div 
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '7px 14px',
                                    backgroundColor: '#0A0A0A',
                                    border: '1px solid rgba(212, 175, 55, 0.5)',
                                    color: '#D4AF37',
                                    fontWeight: '700',
                                    fontSize: '12px',
                                    letterSpacing: '1px',
                                    boxShadow: '0 0 10px rgba(212, 175, 55, 0.2)',
                                }}
                            >
                                <span style={{ fontSize: '13px' }}>🏆</span>
                                <span>{user.total_xp || 0} XP</span>
                            </div>

                            {/* Referral Code Pill */}
                            {user.coupon_code && (
                                <div 
                                    className="hidden md:flex"
                                    style={{
                                        alignItems: 'center',
                                        gap: '6px',
                                        padding: '7px 12px',
                                        backgroundColor: '#0A0A0A',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        color: '#FFFFFF',
                                        fontFamily: 'monospace',
                                        fontSize: '11px',
                                    }}
                                    title="Your Uprise Referral Code"
                                >
                                    <span style={{ color: '#888888', fontSize: '10px' }}>REF:</span>
                                    <strong style={{ color: '#D4AF37', letterSpacing: '1px' }}>
                                        {user.coupon_code}
                                    </strong>
                                </div>
                            )}

                            {/* User Name & Logout */}
                            <div className="flex items-center gap-2 pl-2" style={{ borderLeft: '1px solid rgba(255, 255, 255, 0.15)' }}>
                                <span 
                                    className="hidden sm:inline-block"
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
                                        padding: '6px 14px',
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
                                padding: '9px 24px',
                                backgroundColor: '#000000',
                                border: '1px solid #D4AF37',
                                color: '#D4AF37',
                                fontFamily: "'Space Grotesk', 'Montserrat', sans-serif",
                                fontWeight: '700',
                                fontSize: '12px',
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                cursor: 'pointer',
                                outline: 'none',
                                transition: 'all 0.3s ease',
                                boxShadow: '0 0 12px rgba(212, 175, 55, 0.2)',
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
                            SIGN IN
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default UpriseNavbar;
