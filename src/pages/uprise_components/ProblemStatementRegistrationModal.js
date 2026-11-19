import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- OFFICIAL PROBLEM STATEMENTS ---
// Sample problem statements removed per client directive. Real statements will be populated upon official release.
const PROBLEM_STATEMENTS = [];

const ProblemStatementRegistrationModal = ({
    isOpen,
    onClose,
    currentUser,
    onOpenLogin
}) => {
    // Current Step: 'track' -> 'terms' -> 'list' -> 'hud'
    const [currentStep, setCurrentStep] = useState('track');
    const [selectedTrack, setSelectedTrack] = useState('standard'); // 'standard' | 'corporate'
    const [expandedProblemId, setExpandedProblemId] = useState(null);

    // Terms & Conditions Mandatory Checkboxes
    const [termsAgreed, setTermsAgreed] = useState({
        section1_timelines: false,
        section2_categories: false,
        section3_ipOwnership: false,
        master_agreement: false
    });

    // Registered for Release State
    const userEmail = currentUser?.email || 'guest';
    const storageRegistrationKey = `uprise_ps_registered_${userEmail}`;
    const [isRegisteredForRelease, setIsRegisteredForRelease] = useState(() => {
        try {
            return localStorage.getItem(storageRegistrationKey) === 'true';
        } catch (e) {
            return false;
        }
    });

    // Blueprint Submission Form state inside HUD
    const [blueprintUrl, setBlueprintUrl] = useState('');
    const [blueprintNotes, setBlueprintNotes] = useState('');
    const [isSubmittingBlueprint, setIsSubmittingBlueprint] = useState(false);
    const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState(null);

    // Active User Claim State
    const storageClaimKey = `uprise_ps_claim_${userEmail}`;
    const [activeClaim, setActiveClaim] = useState(() => {
        try {
            const saved = localStorage.getItem(storageClaimKey);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    // Global Slots Mapping
    const [slotsData, setSlotsData] = useState(() => {
        try {
            const saved = localStorage.getItem('uprise_ps_global_slots');
            return saved ? JSON.parse(saved) : {};
        } catch (e) {
            return {};
        }
    });

    // Sync active claim when user logs in or switches
    useEffect(() => {
        if (currentUser?.email) {
            try {
                const saved = localStorage.getItem(`uprise_ps_claim_${currentUser.email}`);
                if (saved) {
                    const parsed = JSON.parse(saved);
                    setActiveClaim(parsed);
                    setCurrentStep('hud');
                } else {
                    setActiveClaim(null);
                    setCurrentStep('track');
                }
                const reg = localStorage.getItem(`uprise_ps_registered_${currentUser.email}`) === 'true';
                setIsRegisteredForRelease(reg);
            } catch (e) {}
        }
    }, [currentUser?.email]);

    // Save active claim to localStorage
    const saveClaim = (claimObj) => {
        setActiveClaim(claimObj);
        try {
            localStorage.setItem(storageClaimKey, JSON.stringify(claimObj));
            if (claimObj?.problemId) {
                const currentCount = slotsData[claimObj.problemId] || 0;
                const updatedSlots = {
                    ...slotsData,
                    [claimObj.problemId]: Math.min(2, currentCount + 1)
                };
                setSlotsData(updatedSlots);
                localStorage.setItem('uprise_ps_global_slots', JSON.stringify(updatedSlots));
            }
        } catch (e) {}
    };

    // Calculate Remaining Time for 48-Hour Blueprint Submission
    const [timeRemaining, setTimeRemaining] = useState({ hours: 48, minutes: 0, seconds: 0, isExpired: false });

    useEffect(() => {
        if (!activeClaim?.blueprintDeadline) return;

        const updateTimer = () => {
            const now = Date.now();
            const diff = activeClaim.blueprintDeadline - now;

            if (diff <= 0) {
                setTimeRemaining({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
            } else {
                const totalSeconds = Math.floor(diff / 1000);
                const hours = Math.floor(totalSeconds / 3600);
                const minutes = Math.floor((totalSeconds % 3600) / 60);
                const seconds = totalSeconds % 60;
                setTimeRemaining({ hours, minutes, seconds, isExpired: false });
            }
        };

        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, [activeClaim]);

    // Check if ALL mandatory terms checkboxes are strictly accepted
    const allTermsAccepted = termsAgreed.section1_timelines && 
                             termsAgreed.section2_categories && 
                             termsAgreed.section3_ipOwnership && 
                             termsAgreed.master_agreement;

    const toggleAllTerms = () => {
        const targetState = !allTermsAccepted;
        setTermsAgreed({
            section1_timelines: targetState,
            section2_categories: targetState,
            section3_ipOwnership: targetState,
            master_agreement: targetState
        });
    };

    // Handle Confirming Registration for Statement Release
    const handleRegisterForRelease = () => {
        if (!currentUser?.email) {
            onClose();
            if (onOpenLogin) onOpenLogin();
            return;
        }

        if (!allTermsAccepted) {
            alert('Security Alert: You must review and agree to the Terms and Conditions before registering.');
            setCurrentStep('terms');
            return;
        }

        try {
            localStorage.setItem(storageRegistrationKey, 'true');
            localStorage.setItem(`uprise_ps_registered_track_${userEmail}`, selectedTrack);
            localStorage.setItem(`uprise_ps_registered_date_${userEmail}`, new Date().toISOString());
            setIsRegisteredForRelease(true);
        } catch (e) {}
    };

    // Handle Claiming a Problem Statement (for when real statements are active)
    const handleClaimProblem = (problem) => {
        if (!currentUser?.email) {
            onClose();
            if (onOpenLogin) onOpenLogin();
            return;
        }

        if (!allTermsAccepted) {
            alert('Security Alert: You cannot claim a problem statement without accepting the official Terms and Conditions.');
            setCurrentStep('terms');
            return;
        }

        const currentSlots = slotsData[problem.id] || 0;
        if (currentSlots >= 2) {
            alert(`Problem statement ${problem.id} has reached its maximum team capacity of 2 participants! Please select an available statement.`);
            return;
        }

        const now = Date.now();
        const newClaim = {
            problemId: problem.id,
            problemTitle: problem.title,
            category: problem.category,
            categoryLabel: problem.categoryLabel,
            domain: problem.domain,
            difficulty: problem.difficulty,
            summary: problem.summary,
            deliverables: problem.deliverables,
            techStack: problem.techStack,
            compensationType: problem.compensationType,
            claimedAt: now,
            blueprintDeadline: now + (48 * 60 * 60 * 1000),
            sprintDeadline: now + (45 * 24 * 60 * 60 * 1000),
            blueprintChancesTotal: 3,
            blueprintChancesRemaining: 3,
            productChancesTotal: 2,
            productChancesRemaining: 2,
            status: 'blueprint_pending',
            blueprintSubmission: null,
            termsAgreedAt: now,
            teamUser: currentUser.email
        };

        saveClaim(newClaim);
        setCurrentStep('hud');
    };

    // Handle Blueprint Submission
    const handleSubmitBlueprint = (e) => {
        e.preventDefault();
        if (!blueprintUrl.trim()) return;

        setIsSubmittingBlueprint(true);
        setTimeout(() => {
            const updated = {
                ...activeClaim,
                status: 'blueprint_submitted',
                blueprintSubmission: {
                    url: blueprintUrl.trim(),
                    notes: blueprintNotes.trim(),
                    submittedAt: Date.now()
                }
            };
            saveClaim(updated);
            setIsSubmittingBlueprint(false);
            setSubmissionSuccessMsg('Blueprint submitted for review. The LevelUp Technical Committee will evaluate within 24 hours.');
            setTimeout(() => setSubmissionSuccessMsg(null), 5000);
        }, 1200);
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-[9999999] flex items-center justify-center p-3 sm:p-4 pt-20 sm:pt-24 pb-8 overflow-y-auto bg-pitchblack/90 backdrop-blur-md font-grotesk"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass-card border border-gold/40 w-full max-w-4xl relative sharp gold-glow bg-obsidian text-white my-auto flex flex-col max-h-[92vh] shadow-[0_0_50px_rgba(212,175,55,0.25)]"
            >
                {/* Modal Header */}
                <div className="p-5 sm:p-6 border-b border-gold/30 bg-pitchblack/80 flex items-center justify-between relative">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 border border-gold bg-gold/10 text-gold flex items-center justify-center sharp shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                <polyline points="2 17 12 22 22 17" />
                                <polyline points="2 12 12 17 22 12" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-[10px] tracking-[0.25em] font-heading uppercase text-gold/80 block">
                                UPRISE 2027 // PROBLEM STATEMENT WORKFLOW
                            </span>
                            <h2 className="text-lg sm:text-2xl font-black font-heading tracking-wide uppercase text-white">
                                RECEIVE PROBLEM STATEMENT
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full border border-gold/50 hover:border-gold bg-pitchblack/95 text-gold hover:text-white hover:bg-gold/20 flex items-center justify-center transition-all cursor-pointer font-bold text-sm shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                        title="Close"
                    >
                        ✕
                    </button>
                </div>

                {/* Flow Stepper Navigation (Only shown if no active claim) */}
                {!activeClaim && (
                    <div className="bg-black/80 border-b border-gold/30 px-4 sm:px-6 py-3 flex items-center justify-between text-[11px] sm:text-xs font-heading tracking-wider uppercase overflow-x-auto gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentStep('track')}
                            className={`flex items-center gap-1.5 px-3.5 py-2 transition-all cursor-pointer sharp font-heading text-xs uppercase tracking-wider ${
                                currentStep === 'track'
                                    ? 'bg-gold text-pitchblack font-black border border-gold shadow-[0_0_14px_rgba(212,175,55,0.45)]'
                                    : 'bg-pitchblack border border-gold/50 text-gold hover:bg-gold hover:text-pitchblack font-bold shadow-[0_0_8px_rgba(212,175,55,0.15)]'
                            }`}
                        >
                            <span>1.</span> Choose Track
                        </button>
                        <span className="text-gold/50 font-bold">→</span>
                        <button
                            type="button"
                            onClick={() => setCurrentStep('terms')}
                            className={`flex items-center gap-1.5 px-3.5 py-2 transition-all cursor-pointer sharp font-heading text-xs uppercase tracking-wider ${
                                currentStep === 'terms'
                                    ? 'bg-gold text-pitchblack font-black border border-gold shadow-[0_0_14px_rgba(212,175,55,0.45)]'
                                    : 'bg-pitchblack border border-gold/50 text-gold hover:bg-gold hover:text-pitchblack font-bold shadow-[0_0_8px_rgba(212,175,55,0.15)]'
                            }`}
                        >
                            <span>2.</span> Terms & Conditions {!allTermsAccepted && <span className={`${currentStep === 'terms' ? 'text-red-700' : 'text-[#E63946]'} font-bold`}>[REQUIRED]</span>}
                        </button>
                        <span className="text-gold/50 font-bold">→</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (allTermsAccepted) setCurrentStep('list');
                                else alert('Access Denied: You must review and tick all Terms & Conditions checkboxes in Step 2 before viewing problem statements.');
                            }}
                            className={`flex items-center gap-1.5 px-3.5 py-2 transition-all cursor-pointer sharp font-heading text-xs uppercase tracking-wider ${
                                currentStep === 'list'
                                    ? 'bg-gold text-pitchblack font-black border border-gold shadow-[0_0_14px_rgba(212,175,55,0.45)]'
                                    : allTermsAccepted
                                    ? 'bg-pitchblack border border-gold/50 text-gold hover:bg-gold hover:text-pitchblack font-bold shadow-[0_0_8px_rgba(212,175,55,0.15)]'
                                    : 'bg-pitchblack/90 border border-gold/40 text-gold/60 hover:bg-gold/15 hover:text-gold hover:border-gold'
                            }`}
                            title={!allTermsAccepted ? 'Requires accepting terms in Step 2' : ''}
                        >
                            <span>3.</span> Statements Allocation
                        </button>
                    </div>
                )}

                {/* Modal Scrollable Body */}
                <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">

                    {/* ========================================================
                        STEP 1: CHOOSE TRACK (Category A vs Category B)
                       ======================================================== */}
                    {currentStep === 'track' && !activeClaim && (
                        <div className="space-y-6">
                            <div className="text-center max-w-2xl mx-auto space-y-2">
                                <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-gold">
                                    STEP 1: SELECT YOUR PROBLEM STATEMENT CATEGORY
                                </h3>
                                <p className="text-sm text-lightgrey leading-relaxed">
                                    Choose between Category A (Earning Track with variable financial valuation) or Category B (Corporate Partner Track with official developer portfolio authorization).
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                {/* Option 1: Category A - Standard Problem Statements */}
                                <div 
                                    onClick={() => setSelectedTrack('standard')}
                                    className={`p-6 border transition-all cursor-pointer sharp relative flex flex-col justify-between ${selectedTrack === 'standard' ? 'border-gold bg-gold/10 shadow-[0_0_25px_rgba(212,175,55,0.25)]' : 'border-white/10 bg-pitchblack/60 hover:border-gold/50'}`}
                                >
                                    {selectedTrack === 'standard' && (
                                        <div className="absolute top-3 right-3 text-[10px] font-heading font-black bg-gold text-pitchblack px-2.5 py-1 tracking-widest uppercase sharp">
                                            SELECTED
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-[10px] font-mono tracking-widest uppercase text-gold block mb-2">
                                            CATEGORY A // EARNING TRACK
                                        </span>
                                        <h4 className="text-xl font-black font-heading text-white uppercase mb-3">
                                            STANDARD PROBLEM STATEMENTS
                                        </h4>
                                        <p className="text-xs text-lightgrey leading-relaxed mb-4">
                                            High-scale enterprise, distributed systems, resilient financial ledgers, and cloud infrastructure challenges with an opportunity to earn financial compensation upon final build evaluation.
                                        </p>
                                        
                                        <div className="space-y-2 text-xs font-mono text-white/90 border-t border-white/10 pt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">Compensation:</span> Variable Valuation (Evaluation Panel Discretion)
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#E63946] font-bold">48-Hour Rule:</span> Mandatory Initial Blueprint Submission
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">Development Cycle:</span> 45 Days post-blueprint approval
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">Rejection Limit:</span> Maximum 3 Blueprint Rejections
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">Team Capacity:</span> Maximum 2 Coders Per Statement
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedTrack('standard');
                                            setCurrentStep('terms');
                                        }}
                                        className="w-full mt-6 py-3 bg-gold text-pitchblack font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors sharp text-center"
                                    >
                                        SELECT CATEGORY A &rarr;
                                    </button>
                                </div>

                                {/* Option 2: Category B - Corporate Partner Problem Statements */}
                                <div 
                                    onClick={() => setSelectedTrack('corporate')}
                                    className={`p-6 border transition-all cursor-pointer sharp relative flex flex-col justify-between ${selectedTrack === 'corporate' ? 'border-gold bg-gold/10 shadow-[0_0_25px_rgba(212,175,55,0.25)]' : 'border-white/10 bg-pitchblack/60 hover:border-gold/50'}`}
                                >
                                    {selectedTrack === 'corporate' && (
                                        <div className="absolute top-3 right-3 text-[10px] font-heading font-black bg-gold text-pitchblack px-2.5 py-1 tracking-widest uppercase sharp">
                                            SELECTED
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 block mb-2">
                                            CATEGORY B // CORPORATE PARTNER TRACK
                                        </span>
                                        <h4 className="text-xl font-black font-heading text-white uppercase mb-3">
                                            CORPORATE PARTNER STATEMENTS
                                        </h4>
                                        <p className="text-xs text-lightgrey leading-relaxed mb-4">
                                            Problem statements provided directly by popular tech companies and corporate partners with official authorization to add the completed project to your developer portfolio.
                                        </p>
                                        
                                        <div className="space-y-2 text-xs font-mono text-white/90 border-t border-white/10 pt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-cyan-400 font-bold">Portfolio Authorization:</span> Explicit Partner Project Attribution
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lightgrey font-bold">Compensation & Hiring:</span> Strictly Circumstantial / Not Guaranteed
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#E63946] font-bold">48-Hour Rule:</span> Mandatory Initial Blueprint Submission
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">Development Cycle:</span> 45 Days post-blueprint approval
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">Team Capacity:</span> Maximum 2 Coders Per Statement
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedTrack('corporate');
                                            setCurrentStep('terms');
                                        }}
                                        className="w-full mt-6 py-3 bg-gold text-pitchblack font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors sharp text-center"
                                    >
                                        SELECT CATEGORY B &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        STEP 2: OFFICIAL TERMS AND CONDITIONS AGREEMENT
                       ======================================================== */}
                    {currentStep === 'terms' && !activeClaim && (
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gold/40 pb-4 gap-3">
                                <div>
                                    <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-gold block">
                                        LEVELUP EVENTS // LEGAL AGREEMENT
                                    </span>
                                    <h3 className="text-lg sm:text-2xl font-black font-heading uppercase text-white">
                                        UPRISE 2027: PROBLEM STATEMENT WORKFLOW – TERMS AND CONDITIONS
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleAllTerms}
                                    className="text-xs text-gold hover:text-white border border-gold/40 hover:border-gold px-3.5 py-1.5 font-mono tracking-wider sharp cursor-pointer transition-colors whitespace-nowrap"
                                >
                                    {allTermsAccepted ? '[ DESELECT ALL ]' : '[ SELECT ALL ]'}
                                </button>
                            </div>

                            {/* Preamble */}
                            <div className="p-4 bg-pitchblack/90 border-l-4 border-gold text-xs sm:text-sm text-lightgrey leading-relaxed font-grotesk">
                                <p className="text-white font-medium">
                                    By selecting a Problem Statement within the LevelUp ecosystem, you agree to the following terms regarding timelines, submissions, compensation, and Intellectual Property (IP) ownership.
                                </p>
                            </div>

                            {/* Section 1: Timelines and Blueprint Submissions */}
                            <div className="p-5 bg-pitchblack/80 border border-white/15 sharp space-y-3">
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <h4 className="text-sm sm:text-base font-black font-heading uppercase text-gold tracking-wide">
                                        1. TIMELINES AND BLUEPRINT SUBMISSIONS
                                    </h4>
                                    <span className="text-[10px] font-mono text-lightgrey uppercase">MANDATORY PROTOCOL</span>
                                </div>

                                <div className="space-y-3 text-xs sm:text-sm text-lightgrey font-grotesk leading-relaxed pl-1">
                                    <p>
                                        <strong className="text-white block font-heading uppercase text-xs tracking-wider mb-0.5">The 48-Hour Blueprint Rule:</strong>
                                        Upon selecting a problem statement, you have exactly <strong>48 hours</strong> to submit your initial project blueprint. Failure to submit within this window will automatically forfeit your claim to the problem statement, and you will be required to re-apply.
                                    </p>

                                    <p>
                                        <strong className="text-white block font-heading uppercase text-xs tracking-wider mb-0.5">Blueprint Approvals and Rejections:</strong>
                                        Your blueprint is subject to review by the LevelUp team. If rejected, you may rebuild and resubmit the blueprint. You are allowed a <strong>maximum of 3 blueprint rejections</strong> per problem statement. If the third submission is rejected, you will be disqualified from that specific problem statement.
                                    </p>

                                    <p>
                                        <strong className="text-white block font-heading uppercase text-xs tracking-wider mb-0.5">The 45-Day Development Cycle:</strong>
                                        Once your blueprint is officially approved, you have <strong>45 days</strong> to complete and submit the final product.
                                    </p>

                                    <p>
                                        <strong className="text-white block font-heading uppercase text-xs tracking-wider mb-0.5">Failure to Deliver:</strong>
                                        If you fail to submit the completed project within the 45-day window, your access to that specific problem statement will be revoked, and you will not be allowed to choose it again in the future.
                                    </p>
                                </div>

                                <label className="flex items-center gap-3 pt-3 mt-2 border-t border-white/10 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.section1_timelines}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, section1_timelines: e.target.checked }))}
                                        className="w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <span className="text-xs font-heading uppercase tracking-wider text-white font-bold">
                                        I accept Section 1: Timelines & Blueprint Submissions (48h Rule, Max 3 Rejections, 45d Cycle) *
                                    </span>
                                </label>
                            </div>

                            {/* Section 2: Problem Statement Categories and Compensation */}
                            <div className="p-5 bg-pitchblack/80 border border-white/15 sharp space-y-3">
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <h4 className="text-sm sm:text-base font-black font-heading uppercase text-gold tracking-wide">
                                        2. PROBLEM STATEMENT CATEGORIES AND COMPENSATION
                                    </h4>
                                    <span className="text-[10px] font-mono text-lightgrey uppercase">COMPENSATION DISCLOSURE</span>
                                </div>

                                <p className="text-xs text-lightgrey leading-relaxed">
                                    The financial and career outcomes vary based on the specific track of the problem statement you select:
                                </p>

                                <div className="space-y-3 text-xs sm:text-sm text-lightgrey font-grotesk leading-relaxed pl-1">
                                    <div className="p-3 bg-black/60 border border-gold/30 sharp">
                                        <strong className="text-gold block font-heading uppercase text-xs tracking-wider mb-1">
                                            Category A: Standard Problem Statements (Earning Track)
                                        </strong>
                                        <p className="mb-2">These problem statements offer an opportunity to earn financial compensation based on the quality of your final build.</p>
                                        <p>
                                            <strong className="text-white">Variable Valuation:</strong> The exact monetary worth or payout for the product is not fixed. Compensation is determined entirely at the discretion of the evaluation panel upon final submission, based on the product's functionality, market readiness, and execution of the approved blueprint.
                                        </p>
                                    </div>

                                    <div className="p-3 bg-black/60 border border-cyan-400/30 sharp">
                                        <strong className="text-cyan-400 block font-heading uppercase text-xs tracking-wider mb-1">
                                            Category B: Corporate Partner Problem Statements
                                        </strong>
                                        <p className="mb-2">These problem statements are provided directly by popular tech companies and corporate partners.</p>
                                        <p className="mb-2">
                                            <strong className="text-white">No Assured Compensation or Employment:</strong> LevelUp and the partner companies provide no guarantee of financial payout, internships, or hiring offers upon completion. While standout builds may attract recruitment opportunities, they are strictly circumstantial and not guaranteed.
                                        </p>
                                        <p>
                                            <strong className="text-white">Portfolio Authorization:</strong> Regardless of hiring outcomes, you are officially authorized to add the completed project to your professional developer portfolio, explicitly stating that you developed a product addressing a specific problem statement provided by the respective partner company.
                                        </p>
                                    </div>
                                </div>

                                <label className="flex items-center gap-3 pt-3 mt-2 border-t border-white/10 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.section2_categories}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, section2_categories: e.target.checked }))}
                                        className="w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <span className="text-xs font-heading uppercase tracking-wider text-white font-bold">
                                        I accept Section 2: Categories and Compensation (Variable Valuation & Portfolio Terms) *
                                    </span>
                                </label>
                            </div>

                            {/* Section 3: Intellectual Property (IP) and Ownership */}
                            <div className="p-5 bg-pitchblack/80 border border-white/15 sharp space-y-3">
                                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                                    <h4 className="text-sm sm:text-base font-black font-heading uppercase text-gold tracking-wide">
                                        3. INTELLECTUAL PROPERTY (IP) AND OWNERSHIP
                                    </h4>
                                    <span className="text-[10px] font-mono text-[#E63946] uppercase font-bold">LEGAL ASSIGNMENT</span>
                                </div>

                                <div className="space-y-3 text-xs sm:text-sm text-lightgrey font-grotesk leading-relaxed pl-1">
                                    <p>
                                        <strong className="text-white block font-heading uppercase text-xs tracking-wider mb-0.5">Absolute Ownership by LevelUp:</strong>
                                        All Intellectual Property (IP) rights, from start to finish, belong solely to <strong>LevelUp Events Private Limited</strong>. This includes, but is not limited to, the initial blueprint, the written codebase, the architecture, and the final submitted product.
                                    </p>

                                    <p>
                                        <strong className="text-white block font-heading uppercase text-xs tracking-wider mb-0.5">Assignment of Rights:</strong>
                                        By selecting a problem statement and submitting a blueprint, you agree to irrevocably assign all rights, title, and interest in the developed project to LevelUp. You may not sell, commercialize, patent, or distribute the product or its underlying code to any third party.
                                    </p>

                                    <p>
                                        <strong className="text-white block font-heading uppercase text-xs tracking-wider mb-0.5">Portfolio Usage:</strong>
                                        While LevelUp retains full ownership of the IP, you are granted permission to showcase the functionality, architecture, and your specific contributions to the product in your personal portfolio and resume strictly for career, educational, and recruitment purposes.
                                    </p>
                                </div>

                                <label className="flex items-center gap-3 pt-3 mt-2 border-t border-white/10 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.section3_ipOwnership}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, section3_ipOwnership: e.target.checked }))}
                                        className="w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <span className="text-xs font-heading uppercase tracking-wider text-white font-bold">
                                        I accept Section 3: Intellectual Property (IP) and Ownership (Assigned to LevelUp Events Private Limited) *
                                    </span>
                                </label>
                            </div>

                            {/* MASTER BINDING CHECKBOX */}
                            <div className="p-4 sm:p-5 bg-gold/10 border-2 border-gold sharp space-y-2">
                                <label className="flex items-start sm:items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.master_agreement}
                                        onChange={(e) => {
                                            const checked = e.target.checked;
                                            setTermsAgreed({
                                                section1_timelines: checked,
                                                section2_categories: checked,
                                                section3_ipOwnership: checked,
                                                master_agreement: checked
                                            });
                                        }}
                                        className="mt-0.5 sm:mt-0 w-5 h-5 accent-gold cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-black text-white uppercase text-xs sm:text-sm tracking-wider block">
                                            I HAVE READ, UNDERSTOOD, AND IRREVOCABLY AGREE TO ALL TERMS AND CONDITIONS *
                                        </span>
                                        <p className="text-[11px] text-lightgrey mt-0.5">
                                            I acknowledge that failure to submit the blueprint within 48 hours forfeits the claim, and all IP rights belong exclusively to LevelUp Events Private Limited.
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Warning when disabled */}
                            {!allTermsAccepted && (
                                <div className="p-3 bg-red-500/10 border border-red-500/40 text-[#E63946] text-xs font-mono text-center">
                                    Notice: You must tick the Terms and Conditions agreement checkboxes above to proceed.
                                </div>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
                                <button
                                    type="button"
                                    onClick={() => setCurrentStep('track')}
                                    className="py-3 px-5 border border-white/20 text-lightgrey hover:text-white font-heading font-bold text-xs uppercase tracking-wider sharp transition-colors"
                                >
                                    &larr; Back to Tracks
                                </button>

                                <button
                                    type="button"
                                    disabled={!allTermsAccepted}
                                    onClick={() => {
                                        if (allTermsAccepted) {
                                            setCurrentStep('list');
                                        } else {
                                            alert('Please tick all Terms and Conditions checkboxes to continue.');
                                        }
                                    }}
                                    className={`py-3.5 px-8 font-heading font-bold text-xs uppercase tracking-widest sharp transition-all ${allTermsAccepted ? 'bg-gold text-pitchblack hover:bg-white cursor-pointer shadow-[0_0_25px_rgba(212,175,55,0.5)]' : 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10'}`}
                                >
                                    {allTermsAccepted ? 'AGREE & PROCEED TO STATEMENTS →' : 'ACCEPT TERMS TO UNLOCK STATEMENTS'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        STEP 3: PROBLEM STATEMENTS ALLOCATION (Sample PS Removed)
                       ======================================================== */}
                    {currentStep === 'list' && !activeClaim && (
                        <div className="space-y-6">
                            {!allTermsAccepted ? (
                                <div className="p-6 bg-pitchblack/90 border-2 border-red-500/60 text-center space-y-4 sharp">
                                    <div className="text-xs font-mono font-bold text-red-400 uppercase tracking-widest">[ ACCESS RESTRICTED ]</div>
                                    <h4 className="text-lg font-heading uppercase text-white font-bold">
                                        TERMS AND CONDITIONS NOT ACCEPTED
                                    </h4>
                                    <p className="text-xs text-lightgrey max-w-md mx-auto">
                                        You must review and accept the official Uprise 2027 Terms and Conditions before viewing problem statements.
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentStep('terms')}
                                        className="py-2.5 px-6 bg-gold text-pitchblack font-heading font-bold text-xs uppercase tracking-wider sharp"
                                    >
                                        RETURN TO STEP 2: TERMS AND CONDITIONS &rarr;
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {/* Track Switcher & Header */}
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                                        <div>
                                            <span className="text-[10px] font-mono tracking-widest uppercase text-gold block">
                                                STEP 3 // ALLOCATION STATUS (MAX 2 HACKERS / PS)
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-white">
                                                PROBLEM STATEMENTS ALLOCATION
                                            </h3>
                                        </div>

                                        {/* Category Filter Tabs */}
                                        <div className="flex items-center gap-1 bg-black p-1 border border-white/15 sharp">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTrack('standard')}
                                                className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider sharp transition-colors ${selectedTrack === 'standard' ? 'bg-gold text-pitchblack font-bold' : 'text-lightgrey hover:text-white'}`}
                                            >
                                                Category A: Standard
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTrack('corporate')}
                                                className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider sharp transition-colors ${selectedTrack === 'corporate' ? 'bg-gold text-pitchblack font-bold' : 'text-lightgrey hover:text-white'}`}
                                            >
                                                Category B: Corporate
                                            </button>
                                        </div>
                                    </div>

                                    {/* Terms Acknowledged Confirmation */}
                                    <div className="p-3 bg-green-500/10 border border-green-500/30 text-xs text-green-300 font-mono flex items-center justify-between flex-wrap gap-2">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">[VERIFIED]</span>
                                            <span>Terms and Conditions accepted by {userEmail}.</span>
                                        </div>
                                        <span className="text-[10px] text-lightgrey">Cap: Maximum 2 coders per problem statement</span>
                                    </div>

                                    {/* If Real Problem Statements array has items, display them. Otherwise show official preparation notice */}
                                    {PROBLEM_STATEMENTS.filter(p => p.category === selectedTrack).length > 0 ? (
                                        <div className="space-y-4">
                                            {PROBLEM_STATEMENTS.filter(p => p.category === selectedTrack).map((problem) => {
                                                const claimedCount = slotsData[problem.id] || 0;
                                                const isFull = claimedCount >= 2;
                                                const isExpanded = expandedProblemId === problem.id;

                                                return (
                                                    <div
                                                        key={problem.id}
                                                        className={`border transition-all sharp ${isFull ? 'border-white/10 bg-black/40 opacity-70' : 'border-gold/40 bg-pitchblack/80 hover:border-gold shadow-[0_0_15px_rgba(212,175,55,0.08)]'}`}
                                                    >
                                                        <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10">
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2 flex-wrap">
                                                                    <span className="text-xs font-mono font-bold bg-gold/20 text-gold border border-gold/40 px-2 py-0.5 sharp">
                                                                        {problem.id}
                                                                    </span>
                                                                    <span className="text-xs font-mono text-lightgrey">
                                                                        {problem.domain}
                                                                    </span>
                                                                </div>
                                                                <h4 className="text-base sm:text-lg font-bold font-heading text-white">
                                                                    {problem.title}
                                                                </h4>
                                                            </div>

                                                            <div className="flex items-center gap-2 self-end sm:self-center">
                                                                <div className={`text-[11px] font-mono px-3 py-1 font-bold sharp border ${isFull ? 'bg-red-500/20 text-red-400 border-red-500/40' : claimedCount === 1 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-green-500/20 text-green-400 border-green-500/40'}`}>
                                                                    {claimedCount}/2 Hackers {isFull ? '(FULL)' : claimedCount === 1 ? '(1 SPOT LEFT)' : '(OPEN)'}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="p-4 sm:p-5 space-y-3">
                                                            <p className="text-xs sm:text-sm text-lightgrey font-grotesk leading-relaxed">
                                                                {problem.summary}
                                                            </p>

                                                            {isExpanded && (
                                                                <div className="space-y-3 pt-3 border-t border-white/10">
                                                                    <div>
                                                                        <span className="text-[11px] font-heading uppercase text-gold block mb-1">
                                                                            Key Deliverables Required:
                                                                        </span>
                                                                        <ul className="list-disc list-inside text-xs text-lightgrey space-y-1 pl-1">
                                                                            {problem.deliverables.map((item, idx) => (
                                                                                <li key={idx}>{item}</li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div className="flex items-center justify-between pt-2 gap-3 flex-wrap">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setExpandedProblemId(isExpanded ? null : problem.id)}
                                                                    className="text-xs text-gold/80 hover:text-white font-mono tracking-wider underline cursor-pointer"
                                                                >
                                                                    {isExpanded ? '[-] Hide Specifications' : '[+] View Deliverables'}
                                                                </button>

                                                                <button
                                                                    type="button"
                                                                    disabled={isFull}
                                                                    onClick={() => handleClaimProblem(problem)}
                                                                    className={`py-2.5 px-6 font-heading font-bold text-xs uppercase tracking-widest sharp transition-all ${isFull ? 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10' : 'bg-gold text-pitchblack hover:bg-white cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]'}`}
                                                                >
                                                                    {isFull ? 'LOCKED (MAX CAPACITY REACHED)' : 'CLAIM & LOCK PROBLEM STATEMENT →'}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        /* Official Release Notice Card (Sample statements removed) */
                                        <div className="p-8 bg-pitchblack/90 border-2 border-gold/40 sharp space-y-6 text-center">
                                            <div className="w-14 h-14 border border-gold/50 bg-gold/10 text-gold mx-auto flex items-center justify-center sharp shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                                                    <circle cx="12" cy="12" r="10"></circle>
                                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                                </svg>
                                            </div>

                                            <div className="space-y-2 max-w-xl mx-auto">
                                                <div className="text-[11px] font-mono font-bold text-gold uppercase tracking-widest">
                                                    OFFICIAL STATEMENTS RELEASE // PRE-HACKATHON
                                                </div>
                                                <h4 className="text-xl sm:text-2xl font-black font-heading uppercase text-white">
                                                    PROBLEM STATEMENTS PREPARING FOR RELEASE
                                                </h4>
                                                <p className="text-xs sm:text-sm text-lightgrey font-grotesk leading-relaxed">
                                                    The official problem statements for <strong>{selectedTrack === 'standard' ? 'Category A: Standard Problem Statements (Earning Track)' : 'Category B: Corporate Partner Statements'}</strong> are currently being curated by the Technical Committee and partner engineering teams.
                                                </p>
                                            </div>

                                            {/* Key Rules Snapshot */}
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto text-left text-xs font-mono">
                                                <div className="p-3 bg-black/60 border border-white/10 sharp">
                                                    <span className="text-gold block font-bold mb-1">48-Hour Timer:</span>
                                                    <span className="text-lightgrey text-[11px]">Will commence automatically as soon as your problem statement is revealed and locked.</span>
                                                </div>
                                                <div className="p-3 bg-black/60 border border-white/10 sharp">
                                                    <span className="text-gold block font-bold mb-1">Rejection Limits:</span>
                                                    <span className="text-lightgrey text-[11px]">Maximum 3 blueprint reviews and 2 final product evaluation attempts.</span>
                                                </div>
                                                <div className="p-3 bg-black/60 border border-white/10 sharp">
                                                    <span className="text-gold block font-bold mb-1">Team Restrictions:</span>
                                                    <span className="text-lightgrey text-[11px]">Strictly maximum 2 hackers permitted per problem statement.</span>
                                                </div>
                                            </div>

                                            {/* Registration Confirmation Button */}
                                            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                                                {isRegisteredForRelease ? (
                                                    <div className="py-3 px-6 bg-green-500/20 border border-green-500 text-green-300 font-heading font-bold text-xs uppercase tracking-wider sharp">
                                                        [CONFIRMED] REGISTERED FOR {selectedTrack === 'standard' ? 'CATEGORY A' : 'CATEGORY B'} RELEASE
                                                    </div>
                                                ) : (
                                                    <button
                                                        type="button"
                                                        onClick={handleRegisterForRelease}
                                                        className="py-3 px-8 bg-gold hover:bg-white text-pitchblack font-heading font-bold text-xs uppercase tracking-widest sharp transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                                    >
                                                        CONFIRM REGISTRATION FOR STATEMENT RELEASE &rarr;
                                                    </button>
                                                )}

                                                <a
                                                    href="https://discord.gg/5Jxbas2Rkv"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="py-3 px-6 border border-gold/40 hover:border-gold text-gold hover:text-white font-heading font-bold text-xs uppercase tracking-wider sharp transition-all no-underline"
                                                >
                                                    DISCORD: #ANNOUNCEMENTS
                                                </a>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentStep('terms')}
                                            className="py-2.5 px-4 border border-white/20 text-lightgrey hover:text-white font-heading text-xs uppercase tracking-wider sharp transition-colors"
                                        >
                                            &larr; Back to Terms
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}

                    {/* ========================================================
                        STEP 4 / HUD: ACTIVE PROBLEM STATEMENT TRACKER
                       ======================================================== */}
                    {(currentStep === 'hud' || activeClaim) && (
                        <div className="space-y-6">
                            {/* Top HUD Status Card */}
                            <div className="p-6 bg-pitchblack/90 border-2 border-gold/60 sharp gold-glow relative space-y-4">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gold/30 pb-4">
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap mb-1">
                                            <span className="text-[10px] font-mono tracking-widest font-black bg-gold text-pitchblack px-2 py-0.5 uppercase sharp">
                                                ACTIVE ASSIGNED STATEMENT
                                            </span>
                                            <span className="text-xs font-mono text-gold border border-gold/40 px-2 py-0.5 sharp">
                                                {activeClaim.problemId}
                                            </span>
                                            <span className="text-xs font-mono text-lightgrey uppercase">
                                                {activeClaim.categoryLabel}
                                            </span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-black font-heading text-white">
                                            {activeClaim.problemTitle}
                                        </h3>
                                    </div>

                                    {/* 48-Hour Countdown Display */}
                                    <div className="p-3 bg-black/90 border border-[#E63946] text-center sharp min-w-[200px]">
                                        <span className="text-[10px] font-mono text-[#E63946] uppercase font-bold tracking-widest block mb-1">
                                            48-HOUR BLUEPRINT DEADLINE
                                        </span>
                                        <div className="text-lg sm:text-xl font-heading font-bold text-white tracking-widest">
                                            {timeRemaining.isExpired ? (
                                                <span className="text-red-500">EXPIRED (FORFEITED)</span>
                                            ) : (
                                                <span>
                                                    {String(timeRemaining.hours).padStart(2, '0')}h : {String(timeRemaining.minutes).padStart(2, '0')}m : {String(timeRemaining.seconds).padStart(2, '0')}s
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Rule Badges & Lifelines Remaining */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                                    <div className="p-2.5 bg-black/60 border border-white/10 sharp text-center">
                                        <span className="text-lightgrey block text-[10px] uppercase">Dev Cycle</span>
                                        <strong className="text-white font-bold text-sm">45 Days</strong>
                                    </div>
                                    <div className="p-2.5 bg-black/60 border border-gold/30 sharp text-center">
                                        <span className="text-gold block text-[10px] uppercase">Blueprint Rejections</span>
                                        <strong className="text-gold font-bold text-sm">{activeClaim.blueprintChancesRemaining} / {activeClaim.blueprintChancesTotal} Left</strong>
                                    </div>
                                    <div className="p-2.5 bg-black/60 border border-cyan-400/30 sharp text-center">
                                        <span className="text-cyan-400 block text-[10px] uppercase">Product Review</span>
                                        <strong className="text-cyan-400 font-bold text-sm">{activeClaim.productChancesRemaining} / {activeClaim.productChancesTotal} Left</strong>
                                    </div>
                                    <div className="p-2.5 bg-black/60 border border-white/10 sharp text-center">
                                        <span className="text-lightgrey block text-[10px] uppercase">IP Ownership</span>
                                        <strong className="text-white font-bold text-xs">LevelUp Events</strong>
                                    </div>
                                </div>

                                {/* Current Status & Gatekeeper Notice */}
                                <div className="p-3.5 bg-gold/10 border border-gold/40 text-xs font-grotesk text-lightgrey space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-heading font-bold text-gold uppercase">CURRENT PHASE:</span>
                                        <span className="font-mono bg-pitchblack px-2 py-0.5 border border-gold/40 text-white font-bold">
                                            {activeClaim.status === 'blueprint_pending' && 'PHASE 1: BLUEPRINT DESIGN (AWAITING INITIAL SUBMISSION)'}
                                            {activeClaim.status === 'blueprint_submitted' && 'PHASE 1: BLUEPRINT SUBMITTED (UNDER LEVELUP REVIEW)'}
                                            {activeClaim.status === 'blueprint_approved' && 'PHASE 2: 45-DAY DEVELOPMENT CYCLE UNLOCKED'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-lightgrey">
                                        Notice: Per the agreed Terms and Conditions, your blueprint must be approved by the LevelUp team before the 45-day building cycle commences. Maximum 3 blueprint rejections allowed.
                                    </p>
                                </div>
                            </div>

                            {/* Blueprint Submission Form */}
                            <div className="p-6 bg-pitchblack/80 border border-white/15 sharp space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                                    <h4 className="text-base sm:text-lg font-bold font-heading uppercase text-white flex items-center gap-2">
                                        SUBMIT SYSTEM BLUEPRINT FOR APPROVAL
                                    </h4>
                                    <span className="text-xs font-mono text-gold">
                                        Max 3 Rejections Permitted
                                    </span>
                                </div>

                                {submissionSuccessMsg && (
                                    <div className="p-3 bg-green-500/20 border border-green-500 text-green-300 text-xs font-mono">
                                        Status: {submissionSuccessMsg}
                                    </div>
                                )}

                                {activeClaim.status === 'blueprint_submitted' && activeClaim.blueprintSubmission && (
                                    <div className="p-4 bg-black/60 border border-gold/40 sharp space-y-2 text-xs font-mono">
                                        <div className="text-gold font-bold">CURRENT SUBMISSION ON RECORD:</div>
                                        <div><span className="text-lightgrey">URL:</span> <a href={activeClaim.blueprintSubmission.url} target="_blank" rel="noopener noreferrer" className="text-white underline">{activeClaim.blueprintSubmission.url}</a></div>
                                        {activeClaim.blueprintSubmission.notes && (
                                            <div><span className="text-lightgrey">Notes:</span> {activeClaim.blueprintSubmission.notes}</div>
                                        )}
                                        <div className="text-[10px] text-lightgrey">
                                            Submitted At: {new Date(activeClaim.blueprintSubmission.submittedAt).toLocaleString()}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmitBlueprint} className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-heading uppercase text-gold mb-1 tracking-wider">
                                            Blueprint / System Architecture Document URL *
                                        </label>
                                        <input
                                            type="url"
                                            required
                                            value={blueprintUrl}
                                            onChange={(e) => setBlueprintUrl(e.target.value)}
                                            placeholder="https://drive.google.com/... or https://github.com/... or https://notion.so/..."
                                            className="w-full p-3 bg-black/90 border border-white/20 focus:border-gold text-white text-xs font-mono sharp outline-none transition-colors"
                                        />
                                        <span className="text-[10px] text-lightgrey font-mono mt-1 block">
                                            Shareable Google Drive PDF, Notion Doc, Figma Architecture Diagram, or GitHub Markdown repository.
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-heading uppercase text-lightgrey mb-1 tracking-wider">
                                            Architecture Notes & Key Decisions (Optional)
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={blueprintNotes}
                                            onChange={(e) => setBlueprintNotes(e.target.value)}
                                            placeholder="Outline chosen database, framework, API protocols, and scalability considerations..."
                                            className="w-full p-3 bg-black/90 border border-white/20 focus:border-gold text-white text-xs font-mono sharp outline-none transition-colors"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-4 pt-2 flex-wrap">
                                        <a
                                            href="https://discord.gg/5Jxbas2Rkv"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-3 px-5 border border-gold/40 bg-black hover:bg-gold/15 text-gold hover:text-white font-heading font-bold text-xs uppercase tracking-wider sharp transition-all flex items-center gap-2 no-underline"
                                        >
                                            DISCORD: #BLUEPRINT-HELP
                                        </a>

                                        <button
                                            type="submit"
                                            disabled={isSubmittingBlueprint}
                                            className="py-3 px-8 bg-gold hover:bg-white text-pitchblack font-heading font-bold text-xs uppercase tracking-widest sharp transition-all cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]"
                                        >
                                            {isSubmittingBlueprint ? 'SUBMITTING BLUEPRINT...' : activeClaim.status === 'blueprint_submitted' ? 'SUBMIT REVISED BLUEPRINT' : 'SUBMIT BLUEPRINT FOR APPROVAL →'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className="p-4 sm:p-5 border-t border-gold/30 bg-pitchblack/90 flex items-center justify-between text-xs text-lightgrey font-mono">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-gold"></span>
                        <span>Uprise 2027 // LevelUp Events Private Limited</span>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gold hover:text-white uppercase font-bold tracking-wider cursor-pointer"
                    >
                        Close
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProblemStatementRegistrationModal;
