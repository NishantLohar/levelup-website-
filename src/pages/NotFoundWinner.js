import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundWinner = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  // Assign distinct unique codes based on origin / path
  let uniqueCode = "404826"; // Default / Pratik's LinkedIn
  let clueSource = "Team Member Pratik's Link";

  if (location.pathname.includes("twitter")) {
    uniqueCode = "404917";
    clueSource = "Footer Twitter Link";
  } else if (location.pathname.includes("login")) {
    uniqueCode = "404538";
    clueSource = "Footer Quick Login Link";
  }

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(uniqueCode);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden font-grotesk selection:bg-[#D4AF37]/30 selection:text-[#D4AF37]">
      {/* Background glow & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.12),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-xl w-full bg-[#0d0d0d]/90 border-2 border-[#D4AF37] p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(212,175,55,0.3)] backdrop-blur-xl"
        style={{ borderRadius: "0px" }}
      >
        {/* Badge */}
        <div className="inline-block px-4 py-1 border border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] font-mono text-xs uppercase tracking-[0.3em] font-bold mb-6">
          EASTER EGG UNLOCKED · {clueSource}
        </div>

        {/* Header */}
        <h1 className="text-4xl sm:text-6xl font-black font-heading tracking-tight uppercase text-white mb-3">
          404 <span className="text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]">WINNER</span>
        </h1>

        <p className="text-sm sm:text-base text-gray-300 font-grotesk leading-relaxed max-w-md mx-auto mb-8">
          You stumbled upon a hidden broken link in the <strong className="text-white">404 Hunt</strong>! 
          Here is your official 6-digit mission key:
        </p>

        {/* The 6-Digit Number Box */}
        <div className="my-6 p-6 bg-black/90 border border-[#D4AF37]/60 relative group">
          <div className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4AF37] mb-2">
            SECRET 6-DIGIT CODE
          </div>
          <div className="text-5xl sm:text-6xl font-mono font-black tracking-[0.25em] text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.7)] select-all">
            {uniqueCode}
          </div>
          <div className="mt-3 flex justify-center">
            <button
              type="button"
              onClick={handleCopy}
              className="px-4 py-1.5 bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {copied ? "COPIED TO CLIPBOARD ✓" : "COPY CODE 📋"}
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-400 mb-8 font-grotesk">
          Now head back to the <strong className="text-white">Pre-Hackathon</strong> page, click <strong className="text-[#D4AF37]">Write The Number</strong> on the 404 Hunt task, and claim your <strong className="text-white">+70 XP</strong>!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to={`/pre-hackathon?code=${uniqueCode}`}
            className="w-full sm:w-auto px-8 py-4 bg-[#D4AF37] hover:bg-white text-black font-heading font-black text-xs sm:text-sm tracking-widest uppercase transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_#FFFFFF] text-center no-underline"
          >
            CLAIM +70 XP ON PRE-HACKATHON →
          </Link>
          <Link
            to="/about"
            className="w-full sm:w-auto px-6 py-4 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white border border-gray-700 hover:border-white font-heading font-bold text-xs sm:text-sm tracking-wider uppercase transition-all text-center no-underline"
          >
            ← BACK TO ABOUT
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundWinner;
