import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/**
 * Helper to draw rounded rectangle safely on any canvas context
 */
function drawRoundRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
    return;
  }
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Render the high-resolution profile social card to a canvas element
 */
export function renderProfileCardToCanvas(currentUser, completedTasksCount = 0) {
  const canvas = document.createElement('canvas');
  // Base logical dimensions: 1200 x 675 (16:9 ratio)
  // 2x Retina scale for ultra-crisp output: 2400 x 1350
  const scale = 2;
  const W = 1200;
  const H = 675;
  canvas.width = W * scale;
  canvas.height = H * scale;

  const ctx = canvas.getContext('2d');
  ctx.scale(scale, scale);

  // User details with safe fallbacks
  const fullName = (currentUser?.full_name || currentUser?.name || currentUser?.email?.split('@')[0] || 'LevelUp Hacker').toUpperCase();
  const roleName = currentUser?.role === 'club' ? 'COLLEGE CLUB' : 'UPRISE HACKER';
  const email = currentUser?.email || 'participant@levelupevents.in';
  const org = currentUser?.organization || 'LevelUp Developer Gauntlet Participant';
  const totalXp = (currentUser?.total_xp ?? 0).toLocaleString();
  const rank = currentUser?.rank ? `${currentUser.rank}` : '—';
  const referrals = currentUser?.referral_count ?? 0;
  const coupon = currentUser?.coupon_code || 'UPRISELEVELUP';

  // Extract Initials for Avatar
  let initials = 'LU';
  const parts = fullName.trim().split(/\s+/);
  if (parts.length >= 2) {
    initials = (parts[0][0] + parts[1][0]).toUpperCase();
  } else if (parts.length === 1 && parts[0].length > 0) {
    initials = parts[0].substring(0, 2).toUpperCase();
  }

  // ================= 1. BACKGROUND =================
  ctx.fillStyle = '#07070A';
  ctx.fillRect(0, 0, W, H);

  // Subtle Cyberpunk Grid
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }

  // Radial Gold Ambient Glow (top center)
  const goldGrad = ctx.createRadialGradient(600, 30, 10, 600, 30, 480);
  goldGrad.addColorStop(0, 'rgba(212, 175, 55, 0.22)');
  goldGrad.addColorStop(0.5, 'rgba(212, 175, 55, 0.08)');
  goldGrad.addColorStop(1, 'rgba(212, 175, 55, 0)');
  ctx.fillStyle = goldGrad;
  ctx.fillRect(0, 0, W, H);

  // Radial Blue Cyber Glow (bottom right)
  const blueGrad = ctx.createRadialGradient(1080, 580, 10, 1080, 580, 350);
  blueGrad.addColorStop(0, 'rgba(59, 130, 246, 0.12)');
  blueGrad.addColorStop(1, 'rgba(59, 130, 246, 0)');
  ctx.fillStyle = blueGrad;
  ctx.fillRect(0, 0, W, H);

  // ================= 2. OUTER TECH BORDER & CORNERS =================
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(24, 24, W - 48, H - 48);

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, 30, W - 60, H - 60);

  // Tech Corner Brackets
  const bracketLen = 36;
  const bracketW = 4;
  ctx.fillStyle = '#FFD700';
  // Top-Left
  ctx.fillRect(24, 24, bracketLen, bracketW);
  ctx.fillRect(24, 24, bracketW, bracketLen);
  // Top-Right
  ctx.fillRect(W - 24 - bracketLen, 24, bracketLen, bracketW);
  ctx.fillRect(W - 24 - bracketW, 24, bracketW, bracketLen);
  // Bottom-Left
  ctx.fillRect(24, H - 24 - bracketW, bracketLen, bracketW);
  ctx.fillRect(24, H - 24 - bracketLen, bracketW, bracketLen);
  // Bottom-Right
  ctx.fillRect(W - 24 - bracketLen, H - 24 - bracketW, bracketLen, bracketW);
  ctx.fillRect(W - 24 - bracketW, H - 24 - bracketLen, bracketW, bracketLen);

  // ================= 3. TOP BRAND BAR =================
  ctx.fillStyle = '#D4AF37';
  ctx.font = '700 11px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('UPRISE 2027 // COMMUNITY GAUNTLET', 52, 54);

  // Brand Name
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 24px "Montserrat", "Space Grotesk", sans-serif';
  ctx.fillText('LEVELUP', 52, 82);

  const levelUpWidth = ctx.measureText('LEVELUP').width;
  ctx.fillStyle = '#D4AF37';
  ctx.font = '600 20px "Space Grotesk", "Montserrat", sans-serif';
  ctx.fillText(' • ARENA PARTICIPANT BADGE', 52 + levelUpWidth + 6, 81);

  // Right Side: Verified Pill Badge
  const pillW = 205;
  const pillH = 32;
  const pillX = W - 52 - pillW;
  const pillY = 56;
  ctx.fillStyle = 'rgba(34, 197, 94, 0.12)';
  drawRoundRect(ctx, pillX, pillY, pillW, pillH, 4);
  ctx.fill();
  ctx.strokeStyle = 'rgba(74, 222, 128, 0.6)';
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = '#4ADE80';
  ctx.font = '800 11px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('● VERIFIED PARTICIPANT', pillX + pillW / 2, pillY + 20);

  // Top Divider
  const topDivGrad = ctx.createLinearGradient(50, 104, W - 50, 104);
  topDivGrad.addColorStop(0, 'rgba(212, 175, 55, 0.1)');
  topDivGrad.addColorStop(0.3, 'rgba(212, 175, 55, 0.7)');
  topDivGrad.addColorStop(0.7, 'rgba(212, 175, 55, 0.7)');
  topDivGrad.addColorStop(1, 'rgba(212, 175, 55, 0.1)');
  ctx.strokeStyle = topDivGrad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(50, 104);
  ctx.lineTo(W - 50, 104);
  ctx.stroke();

  // ================= 4. USER IDENTITY BOX =================
  const profX = 50;
  const profY = 118;
  const profW = W - 100;
  const profH = 112;

  ctx.fillStyle = 'rgba(14, 14, 20, 0.9)';
  drawRoundRect(ctx, profX, profY, profW, profH, 2);
  ctx.fill();
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Avatar Circle
  const avX = profX + 56;
  const avY = profY + profH / 2;
  const avR = 40;

  ctx.save();
  ctx.beginPath();
  ctx.arc(avX, avY, avR, 0, Math.PI * 2);
  ctx.fillStyle = '#060609';
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2.5;
  ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.restore();

  ctx.fillStyle = '#FFD700';
  ctx.font = '900 28px "Montserrat", "Space Grotesk", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(initials, avX, avY + 10);

  // User Name
  const textStartX = profX + 116;
  ctx.textAlign = 'left';

  // Dynamic Font Size for Long Names
  let nameSize = 28;
  ctx.font = `900 ${nameSize}px "Montserrat", "Space Grotesk", sans-serif`;
  while (ctx.measureText(fullName).width > 420 && nameSize > 18) {
    nameSize -= 2;
    ctx.font = `900 ${nameSize}px "Montserrat", "Space Grotesk", sans-serif`;
  }

  ctx.fillStyle = '#FFFFFF';
  ctx.fillText(fullName, textStartX, profY + 44);

  const nameWidth = ctx.measureText(fullName).width;

  // Role Badge Next to Name
  const badgeX = textStartX + nameWidth + 14;
  const badgeY = profY + 24;
  const badgeW = 125;
  const badgeH = 26;
  ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.fillRect(badgeX, badgeY, badgeW, badgeH);
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 1;
  ctx.strokeRect(badgeX, badgeY, badgeW, badgeH);

  ctx.fillStyle = '#FFD700';
  ctx.font = '800 10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(roleName, badgeX + badgeW / 2, badgeY + 17);

  // Email
  ctx.textAlign = 'left';
  ctx.fillStyle = '#9CA3AF';
  ctx.font = '400 14px monospace';
  ctx.fillText(email, textStartX, profY + 70);

  // College / Organization
  ctx.fillStyle = '#D4AF37';
  ctx.font = '500 12px monospace';
  const orgText = org.length > 55 ? org.substring(0, 52) + '...' : org;
  ctx.fillText(`🏛️ ${orgText}`, textStartX, profY + 92);

  // LevelUp Watermark Emblem on Right of Profile Box
  ctx.textAlign = 'right';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.3)';
  ctx.font = '800 11px monospace';
  ctx.fillText('UPRISE // S27', profX + profW - 20, profY + 36);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  ctx.font = '500 10px monospace';
  ctx.fillText('GAUNTLET EDITION', profX + profW - 20, profY + 54);

  // ================= 5. FOUR CORE STAT CARDS =================
  const cards = [
    {
      label: 'TOTAL XP',
      icon: '🏆',
      val: `${totalXp} XP`,
      sub: 'Live score on Gauntlet',
      col: '#FFD700',
      borderCol: 'rgba(212, 175, 55, 0.4)'
    },
    {
      label: 'ARENA RANK',
      icon: '⚡',
      val: rank.startsWith('#') ? rank : `#${rank}`,
      sub: 'Global standing',
      col: '#FFFFFF',
      borderCol: 'rgba(212, 175, 55, 0.4)'
    },
    {
      label: 'PEOPLE REFERRED',
      icon: '👥',
      val: `${referrals}`,
      sub: 'Recruited with code',
      col: '#60A5FA',
      borderCol: 'rgba(96, 165, 250, 0.4)'
    },
    {
      label: 'MISSIONS COMPLETED',
      icon: '🎯',
      val: `${completedTasksCount}`,
      sub: 'Verified mission rewards',
      col: '#4ADE80',
      borderCol: 'rgba(74, 222, 128, 0.4)'
    }
  ];

  const statCardW = 260;
  const statCardH = 160;
  const statGap = 20;
  const statStartY = 244;

  cards.forEach((c, i) => {
    const scX = 50 + i * (statCardW + statGap);
    const scY = statStartY;

    // Background
    ctx.fillStyle = 'rgba(12, 12, 18, 0.9)';
    drawRoundRect(ctx, scX, scY, statCardW, statCardH, 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = c.borderCol;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Top Glowing Accent Line
    ctx.fillStyle = c.col;
    ctx.fillRect(scX, scY, statCardW, 3);

    // Card Header Row (Label + Icon)
    ctx.textAlign = 'left';
    ctx.fillStyle = '#A0A0B0';
    ctx.font = '700 11px "Montserrat", "Space Grotesk", sans-serif';
    ctx.fillText(c.label, scX + 16, scY + 28);

    ctx.textAlign = 'right';
    ctx.font = '16px sans-serif';
    ctx.fillText(c.icon, scX + statCardW - 16, scY + 30);

    // Big Value
    ctx.textAlign = 'left';
    ctx.fillStyle = c.col;
    ctx.font = '900 34px "Montserrat", "Space Grotesk", sans-serif';
    ctx.fillText(c.val, scX + 16, scY + 84);

    // Subtitle
    ctx.fillStyle = '#71717A';
    ctx.font = '400 11px monospace';
    ctx.fillText(c.sub, scX + 16, scY + 124);

    // Tech bottom dot
    ctx.fillStyle = c.col;
    ctx.beginPath();
    ctx.arc(scX + statCardW - 18, scY + 122, 3, 0, Math.PI * 2);
    ctx.fill();
  });

  // ================= 6. EXCLUSIVE REFERRAL & CTA BANNER =================
  const bannerX = 50;
  const bannerY = 418;
  const bannerW = W - 100;
  const bannerH = 182;

  ctx.fillStyle = 'rgba(10, 10, 14, 0.95)';
  drawRoundRect(ctx, bannerX, bannerY, bannerW, bannerH, 2);
  ctx.fill();

  ctx.strokeStyle = 'rgba(212, 175, 55, 0.7)';
  ctx.lineWidth = 2;
  ctx.stroke();

  // Left Column: Exclusive Referral Code
  ctx.textAlign = 'left';
  ctx.fillStyle = '#FFD700';
  ctx.font = '800 12px "Montserrat", sans-serif';
  ctx.fillText('✦ YOUR EXCLUSIVE REFERRAL CODE', bannerX + 24, bannerY + 32);

  ctx.fillStyle = '#9CA3AF';
  ctx.font = '400 12px monospace';
  ctx.fillText('Share this code with teammates & clubs. Unlock referral bonuses!', bannerX + 24, bannerY + 54);

  // Big Coupon Box
  const codeBoxX = bannerX + 24;
  const codeBoxY = bannerY + 70;
  const codeBoxW = 420;
  const codeBoxH = 68;

  ctx.fillStyle = '#040406';
  ctx.fillRect(codeBoxX, codeBoxY, codeBoxW, codeBoxH);

  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 2;
  ctx.strokeRect(codeBoxX, codeBoxY, codeBoxW, codeBoxH);

  // Glowing Referral Code Text
  ctx.save();
  ctx.fillStyle = '#FFD700';
  ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
  ctx.shadowBlur = 10;
  ctx.font = '900 28px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(coupon, codeBoxX + codeBoxW / 2, codeBoxY + 44);
  ctx.restore();

  ctx.fillStyle = '#71717A';
  ctx.font = '400 10px monospace';
  ctx.textAlign = 'left';
  ctx.fillText('REGISTRATION DISCOUNT & XP MULTIPLIER ACTIVE', codeBoxX, codeBoxY + codeBoxH + 18);

  // Vertical Divider in Banner
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(bannerX + 480, bannerY + 20);
  ctx.lineTo(bannerX + 480, bannerY + bannerH - 20);
  ctx.stroke();

  // Right Column: Call to Action & Event Destination
  const rightX = bannerX + 510;
  ctx.fillStyle = '#D4AF37';
  ctx.font = '800 12px "Space Grotesk", "Montserrat", sans-serif';
  ctx.fillText('JOIN THE GAUNTLET AT:', rightX, bannerY + 36);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 22px "Montserrat", "Space Grotesk", sans-serif';
  ctx.fillText('LEVELUPEVENTS.IN/PRE-HACKATHON', rightX, bannerY + 68);

  ctx.fillStyle = '#9CA3AF';
  ctx.font = '400 12px monospace';
  ctx.fillText('Solve terminal quizzes • Complete missions • Climb leaderboards', rightX, bannerY + 98);
  ctx.fillText('Compete against top developers and win prizes at UPRISE 2027!', rightX, bannerY + 118);

  // Tech Badge at bottom right of banner
  ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.fillRect(rightX, bannerY + 134, 250, 26);
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.lineWidth = 1;
  ctx.strokeRect(rightX, bannerY + 134, 250, 26);

  ctx.fillStyle = '#FFD700';
  ctx.font = '800 10px monospace';
  ctx.fillText('OFFICIAL SUMMIT REGISTRATION', rightX + 12, bannerY + 151);

  // ================= 7. FOOTER BAR =================
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.5)';
  ctx.font = '600 10px monospace';
  ctx.fillText('LEVELUP EVENTS • UPRISE 2027 SUMMIT • OFFICIAL COMMUNITY GAUNTLET PROFILE', W / 2, H - 38);

  return canvas;
}

/**
 * UpriseProfileShareModal Component
 */
const UpriseProfileShareModal = ({
  isOpen,
  onClose,
  currentUser,
  completedTasksCount = 0
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [previewSrc, setPreviewSrc] = useState(null);
  const canvasRef = useRef(null);

  const couponCode = currentUser?.coupon_code || '';
  const fullName = currentUser?.full_name || currentUser?.name || 'Hacker';

  // Base share URL
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://levelupevents.in';
  const shareUrl = `${origin}/pre-hackathon${couponCode ? `?ref=${encodeURIComponent(couponCode)}` : ''}`;

  // Pre-filled social message
  const shareMessage = `🔥 I'm participating in UPRISE 2027 by LevelUp! Check out my participant profile, join the Gauntlet, and use my referral code "${couponCode || 'UPRISE'}" to get started: ${shareUrl}`;

  // Generate card preview on open
  useEffect(() => {
    if (!isOpen) return;

    try {
      const canvas = renderProfileCardToCanvas(currentUser, completedTasksCount);
      canvasRef.current = canvas;
      const dataUrl = canvas.toDataURL('image/png');
      setPreviewSrc(dataUrl);
    } catch (err) {
      console.error('Error generating profile card preview:', err);
    }
  }, [isOpen, currentUser, completedTasksCount]);

  if (!isOpen) return null;

  const handleCopyLink = () => {
    if (navigator.clipboard && shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    }
  };

  const handleDownloadPng = () => {
    setDownloading(true);
    try {
      const canvas = canvasRef.current || renderProfileCardToCanvas(currentUser, completedTasksCount);
      canvas.toBlob((blob) => {
        if (!blob) {
          setDownloading(false);
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const safeName = fullName.toLowerCase().replace(/[^a-z0-9]/g, '_');
        link.download = `${safeName}_uprise_profile_card.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        setDownloading(false);
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      }, 'image/png');
    } catch (err) {
      console.error('Error downloading PNG:', err);
      setDownloading(false);
    }
  };

  const socialLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareMessage)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999999] flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24 pb-8 overflow-y-auto bg-pitchblack/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="glass-card sharp border-2 border-gold my-auto p-5 sm:p-7 max-w-2xl w-full bg-obsidian relative shadow-[0_0_50px_rgba(212,175,55,0.4)] text-white">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-40 w-8 h-8 rounded-full border border-gold/50 hover:border-gold bg-pitchblack/95 text-gold hover:text-white hover:bg-gold/20 flex items-center justify-center transition-all cursor-pointer font-bold text-sm shadow-[0_0_12px_rgba(212,175,55,0.4)]"
          title="Close Modal"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <span className="font-heading font-black text-xs px-3 py-1 bg-gold/15 border border-gold text-gold gold-glow uppercase tracking-wider inline-block mb-2">
            UPRISE 2027 • PROFILE BADGE
          </span>
          <h3 className="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-wider">
            SHARE YOUR HACKER PROFILE
          </h3>
          <p className="text-xs text-lightgrey font-mono mt-1 max-w-lg mx-auto">
            Showcase your Arena Rank, XP & stats on social media, or copy your referral link to earn bonus rewards.
          </p>
        </div>

        {/* Visual PNG Card Preview */}
        <div className="mb-5 relative group">
          {previewSrc ? (
            <div className="relative border border-gold/40 shadow-[0_0_25px_rgba(212,175,55,0.25)] overflow-hidden bg-black">
              <img
                src={previewSrc}
                alt="Uprise Profile Card Preview"
                className="w-full h-auto block"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 border border-gold/50 text-[10px] font-mono text-gold tracking-widest uppercase">
                1200 × 675 HD PNG
              </div>
            </div>
          ) : (
            <div className="h-48 border border-gold/30 bg-pitchblack flex items-center justify-center text-xs font-mono text-gold animate-pulse">
              Generating High-Resolution Profile Card...
            </div>
          )}
        </div>

        {/* Primary Action Buttons: Download PNG & Copy Share Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
          {/* Download PNG Button */}
          <button
            type="button"
            onClick={handleDownloadPng}
            disabled={downloading}
            className="w-full py-3 px-4 bg-gold hover:bg-gold-light text-black font-heading font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(212,175,55,0.5)] cursor-pointer flex items-center justify-center gap-2 sharp disabled:opacity-60"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            <span>
              {downloading ? 'GENERATING PNG...' : downloadSuccess ? 'DOWNLOADED! ✓' : 'DOWNLOAD PNG CARD'}
            </span>
          </button>

          {/* Copy Share Link Button */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full py-3 px-4 bg-black hover:bg-gold/15 text-gold hover:text-white border-2 border-gold font-heading font-black text-xs uppercase tracking-widest transition-all shadow-[0_0_15px_rgba(212,175,55,0.25)] cursor-pointer flex items-center justify-center gap-2 sharp"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
            <span>{copiedLink ? 'COPIED TO CLIPBOARD! ✓' : 'COPY SHARE LINK'}</span>
          </button>
        </div>

        {/* Share Link Input Box */}
        <div className="mb-5">
          <label className="block text-[11px] font-mono text-gold uppercase tracking-wider mb-1.5">
            YOUR UNIQUE REFERRAL URL:
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              onClick={(e) => e.target.select()}
              className="flex-1 bg-pitchblack border border-gold/40 px-3 py-2 text-xs font-mono text-white tracking-wider outline-none focus:border-gold selection:bg-gold/40 select-all"
            />
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 py-2 bg-gold/20 hover:bg-gold text-gold hover:text-black border border-gold text-xs font-heading font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap"
            >
              {copiedLink ? 'COPIED!' : 'COPY'}
            </button>
          </div>
        </div>

        {/* Quick Social Share Buttons */}
        <div>
          <div className="text-[10px] font-mono text-lightgrey uppercase tracking-widest mb-2 text-center">
            OR SHARE DIRECTLY TO YOUR NETWORK:
          </div>
          <div className="grid grid-cols-3 gap-2">
            <a
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#25D366]/15 hover:bg-[#25D366] text-[#25D366] hover:text-black border border-[#25D366]/50 text-xs font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 no-underline text-center cursor-pointer"
            >
              <span>WHATSAPP</span>
            </a>

            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#1DA1F2]/15 hover:bg-[#1DA1F2] text-[#1DA1F2] hover:text-white border border-[#1DA1F2]/50 text-xs font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 no-underline text-center cursor-pointer"
            >
              <span>TWITTER / X</span>
            </a>

            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 bg-[#0A66C2]/15 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border border-[#0A66C2]/50 text-xs font-heading font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 no-underline text-center cursor-pointer"
            >
              <span>LINKEDIN</span>
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default UpriseProfileShareModal;

