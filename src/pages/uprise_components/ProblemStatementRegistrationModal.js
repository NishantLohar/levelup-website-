import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- CURATED PROBLEM STATEMENTS ---
const PROBLEM_STATEMENTS = [
    // Category A: Standard Problem Statements (Earning Track)
    {
        id: 'STD-01',
        category: 'standard',
        categoryLabel: 'Category A: Standard (Earning Track)',
        title: 'Real-Time Distributed API Fraud & Volumetric Attack Sentinel',
        domain: 'Backend Systems / Cybersecurity / FinTech',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Variable Valuation (Earning Track)',
        reward: 'Direct Final Hackathon Qualification + Discretionary Financial Payout',
        summary: 'Architect a sub-5ms reverse proxy engine that dynamically calculates multi-dimensional risk scores, identifies distributed API scraping bots, and enforces adaptive sliding-window token bucket throttles across millions of concurrent requests.',
        deliverables: [
            'Reverse proxy service with sub-5ms latency overhead under 50k RPS load',
            'In-memory sliding window algorithm with distributed Redis/KeyDB cluster sync',
            'Live telemetry dashboard showing anomaly spikes, CIDR blocklists, and bypass rate',
            'Automated chaos-test script simulating DDoS, credential stuffing, and slowloris'
        ],
        techStack: 'Go / Rust / Node.js, Redis, eBPF / Envoy / NGINX, Grafana / Prometheus'
    },
    {
        id: 'STD-02',
        category: 'standard',
        categoryLabel: 'Category A: Standard (Earning Track)',
        title: 'Event-Driven Financial Multi-Ledger Reconciliation & Settlement Engine',
        domain: 'FinTech / Distributed Systems / Database',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Variable Valuation (Earning Track)',
        reward: 'Direct Final Hackathon Qualification + Discretionary Financial Payout',
        summary: 'Design an idempotent, immutable double-entry ledger that consumes disparate bank webhooks, settlement logs, and gateway payouts, auto-reconciles broken transactions, and guarantees zero-loss cryptographic audit trails.',
        deliverables: [
            'Idempotent transaction ingestion pipeline handling out-of-order and duplicated webhooks',
            'Dual-entry balance integrity verification engine with automated rollback mechanics',
            'Discrepancy alert engine detecting phantom transactions, fee skims, and gateway delay',
            'Auditor-grade CSV/PDF report generator with cryptographic hash chain verification'
        ],
        techStack: 'PostgreSQL / CockroachDB, Kafka / RabbitMQ, Python / Go / Java, Docker'
    },
    {
        id: 'STD-03',
        category: 'standard',
        categoryLabel: 'Category A: Standard (Earning Track)',
        title: 'HIPAA-Compliant Unstructured Clinical Record Extraction & Anonymizer',
        domain: 'HealthTech / NLP / Data Privacy',
        difficulty: 'Advanced',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Variable Valuation (Earning Track)',
        reward: 'Direct Final Hackathon Qualification + Discretionary Financial Payout',
        summary: 'Build an automated pipeline to ingest messy scanned medical prescriptions, clinical pathology charts, and doctor notes; scrub all 18 HIPAA PHI identifiers with >99.5% accuracy; and export structured FHIR JSON health records.',
        deliverables: [
            'High-accuracy OCR pipeline handling skewed, handwritten, and low-res clinical scans',
            'Context-aware Named Entity Recognition (NER) for multi-language PHI anonymization',
            'Interoperable Fast Healthcare Interoperability Resources (FHIR) standard JSON converter',
            'Redaction audit report highlighting confidence bounds and manual review queues'
        ],
        techStack: 'Python (FastAPI), Tesseract / LayoutLM, Spacy / RoBERTa, Docker, FHIR Tools'
    },
    {
        id: 'STD-04',
        category: 'standard',
        categoryLabel: 'Category A: Standard (Earning Track)',
        title: 'Autonomous Multi-Cloud Kubernetes FinOps Sentinel & Cost Shrinker',
        domain: 'DevOps / Cloud Architecture / FinOps',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Variable Valuation (Earning Track)',
        reward: 'Direct Final Hackathon Qualification + Discretionary Financial Payout',
        summary: 'Construct an intelligent cluster agent that continuously inspects multi-cloud workloads, identifies zombie pods, unattached volumes, and over-provisioned CPU requests, and generates automated, zero-downtime downsizing pull requests.',
        deliverables: [
            'Lightweight in-cluster daemonset collecting memory/CPU variance and node saturation',
            'Rule & ML predictive heuristic engine calculating idle waste across AWS/GCP/Azure tiers',
            'Automated GitOps pull request generator for Kubernetes Helm/Terraform manifests',
            'Real-time savings simulator showing projected monthly cost reductions'
        ],
        techStack: 'Go / Python, Kubernetes API, Prometheus, OpenCost, Terraform'
    },
    {
        id: 'STD-05',
        category: 'standard',
        categoryLabel: 'Category A: Standard (Earning Track)',
        title: 'High-Throughput Edge IoT Fleet Diagnostics & Predictive Telemetry Hub',
        domain: 'IoT / Edge Systems / Predictive AI',
        difficulty: 'Advanced',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Variable Valuation (Earning Track)',
        reward: 'Direct Final Hackathon Qualification + Discretionary Financial Payout',
        summary: 'Create a resilient telemetry ingestion gateway that aggregates high-frequency vibration, thermal, and voltage telemetry from thousands of simulated hardware sensors over MQTT/WebSocket and predicts mechanical failure 72 hours before breakdown.',
        deliverables: [
            'High-concurrency MQTT broker gateway handling 20k msgs/sec with buffer backpressure',
            'Time-series anomaly detector for continuous wear-and-tear degradation patterns',
            'Emergency threshold circuit breaker triggering physical relay shutoffs / webhooks',
            'Fleet topology map showing live operational health and diagnostic logs'
        ],
        techStack: 'EMQX / Mosquitto MQTT, TimescaleDB / InfluxDB, Node.js / Rust, WebSockets'
    },

    // Category B: Corporate Partner Problem Statements (Corporate / Trending Track)
    {
        id: 'CORP-01',
        category: 'corporate',
        categoryLabel: 'Category B: Corporate Partner Track',
        title: 'Autonomous Multi-Agent PR Reviewer, Sandbox Tester & Zero-Day Patcher',
        domain: 'Corporate Partner / AI Agents / AppSec / DevTools',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Portfolio Authorization Track (No Assured Payout)',
        reward: 'Direct Final Hackathon Qualification + Official Partner Portfolio Authorization',
        summary: 'Build an orchestration network of specialized AI agents (Security Auditor, Performance Profiler, Architecture Reviewer) that review incoming GitHub PRs, spin up sandboxed environments to verify vulnerabilities, and auto-submit verified code patches.',
        deliverables: [
            'Multi-agent debate & consensus pipeline (Security, Speed, Architecture agents)',
            'Sandboxed test runner (Docker/Firecracker microVM) executing untrusted PR code',
            'GitHub App bot posting diff line comments, risk scores, and ready-to-merge patch branches',
            'False-positive benchmark evaluation against known OWASP CVE vulnerability datasets'
        ],
        techStack: 'LangGraph / CrewAI, Python, Docker SDK, GitHub Webhooks, Anthropic/OpenAI API'
    },
    {
        id: 'CORP-02',
        category: 'corporate',
        categoryLabel: 'Category B: Corporate Partner Track',
        title: 'Real-Time Multimodal Meeting Copilot with Speaker Diarization & Action Hub',
        domain: 'Corporate Partner / Multimodal AI / Real-Time Audio',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Portfolio Authorization Track (No Assured Payout)',
        reward: 'Direct Final Hackathon Qualification + Official Partner Portfolio Authorization',
        summary: 'Develop a low-latency meeting companion that taps into live WebRTC audio streams, separates overlapping speaker voices in real time, extracts technical action items, and generates sync-ready Jira/Linear tickets with assignee tags.',
        deliverables: [
            'WebRTC / WebSocket low-latency audio capture pipeline (<250ms packet chunking)',
            'Speaker diarization model accurately tracking 5+ distinct participants simultaneously',
            'Contextual extraction engine categorizing decisions, blockers, deadlines, and owners',
            'Instant 1-click Linear, Jira, and GitHub Issue sync webhook dispatch'
        ],
        techStack: 'WebRTC, Whisper / Deepgram, PyAnnote Audio, Node.js / Python, React'
    },
    {
        id: 'CORP-03',
        category: 'corporate',
        categoryLabel: 'Category B: Corporate Partner Track',
        title: 'Decentralized P2P Compute & Bandwidth Sharing Sentinel (DePIN Protocol)',
        domain: 'Corporate Partner / Web3 / DePIN / P2P Networks',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Portfolio Authorization Track (No Assured Payout)',
        reward: 'Direct Final Hackathon Qualification + Official Partner Portfolio Authorization',
        summary: 'Build a peer-to-peer compute and bandwidth sharing protocol where users contribute spare GPU compute or bandwidth, receive cryptographic Proof-of-Uptime verification, and earn micro-settlement rewards with zero central intermediaries.',
        deliverables: [
            'Lightweight desktop or CLI client daemon for peer discovery and packet relaying',
            'Cryptographic Proof-of-Bandwidth / Proof-of-Compute validation challenge protocol',
            'Smart contract or escrow module tracking node uptime, slashing, and payout distribution',
            'Live decentralized network explorer visualizing peer nodes, ping latency, and throughput'
        ],
        techStack: 'libp2p / WebRTC, Rust / Go / Node.js, Solidity / EVM, React Canvas/Three.js'
    },
    {
        id: 'CORP-04',
        category: 'corporate',
        categoryLabel: 'Category B: Corporate Partner Track',
        title: 'Spatial Vision-Language Assistant for Hardware Assembly & Repair Guidance',
        domain: 'Corporate Partner / Computer Vision / Vision-Language / AR Guidance',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Portfolio Authorization Track (No Assured Payout)',
        reward: 'Direct Final Hackathon Qualification + Official Partner Portfolio Authorization',
        summary: 'Harness vision-language models to analyze real-time video feeds of complex circuit boards, PC components, or machinery; detect misplaced wires or incorrect screws; and project step-by-step visual bounding cues directly on the technician’s screen.',
        deliverables: [
            'Real-time frame ingestion worker running object detection and spatial tracking',
            'VLM integration identifying missing jumpers, reversed polarity, or unseated RAM modules',
            'Interactive video overlay HUD highlighting exact component coordinates and warning badges',
            'Step-by-step interactive workflow builder with voice-controlled next/previous handsfree navigation'
        ],
        techStack: 'OpenCV, YOLOv10 / Gemini 1.5 Flash Vision, WebSockets, WebRTC, React'
    },
    {
        id: 'CORP-05',
        category: 'corporate',
        categoryLabel: 'Category B: Corporate Partner Track',
        title: 'Autonomous Self-Healing Microservices Sentinel with Chaos Outage Simulation',
        domain: 'Corporate Partner / AI SRE / Chaos Engineering / Cloud Resiliency',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        compensationType: 'Portfolio Authorization Track (No Assured Payout)',
        reward: 'Direct Final Hackathon Qualification + Official Partner Portfolio Authorization',
        summary: 'Design an autonomous site reliability agent that routinely fires chaos engineering probes into Dockerized microservices, pinpoints cascading root causes across distributed OpenTelemetry traces, and automatically applies and validates configuration hotfixes.',
        deliverables: [
            'Chaos injection worker simulating network packet drops, disk stalls, and memory leaks',
            'Distributed OpenTelemetry and Jaeger trace analyzer detecting latency degradation spikes',
            'Automated remediation engine rolling back corrupt deployments or patching nginx/k8s configs',
            'Complete post-mortem incident report synthesizer with root-cause timeline analysis'
        ],
        techStack: 'Docker, OpenTelemetry, Jaeger, Python / Go, LLM Diagnostic Agent, Prometheus'
    }
];

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

    // Blueprint Submission Form state inside HUD
    const [blueprintUrl, setBlueprintUrl] = useState('');
    const [blueprintNotes, setBlueprintNotes] = useState('');
    const [isSubmittingBlueprint, setIsSubmittingBlueprint] = useState(false);
    const [submissionSuccessMsg, setSubmissionSuccessMsg] = useState(null);

    // Active User Claim State
    const userEmail = currentUser?.email || 'guest';
    const storageClaimKey = `uprise_ps_claim_${userEmail}`;
    const [activeClaim, setActiveClaim] = useState(() => {
        try {
            const saved = localStorage.getItem(storageClaimKey);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });

    // Global Slots Mapping: { [problemId]: number of participants (0, 1, or 2) }
    const [slotsData, setSlotsData] = useState(() => {
        try {
            const saved = localStorage.getItem('uprise_ps_global_slots');
            return saved ? JSON.parse(saved) : {
                'STD-01': 1,
                'STD-02': 0,
                'STD-03': 1,
                'STD-04': 0,
                'STD-05': 0,
                'CORP-01': 1,
                'CORP-02': 0,
                'CORP-03': 1,
                'CORP-04': 0,
                'CORP-05': 0
            };
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

    // Handle Claiming a Problem Statement
    const handleClaimProblem = (problem) => {
        if (!currentUser?.email) {
            onClose();
            if (onOpenLogin) onOpenLogin();
            return;
        }

        // Strict server/client guard: Terms must be accepted
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
            blueprintDeadline: now + (48 * 60 * 60 * 1000), // exactly 48 hours
            sprintDeadline: now + (45 * 24 * 60 * 60 * 1000), // exactly 45 days
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
            setSubmissionSuccessMsg('Blueprint submitted for review! Mentors will evaluate within 24 hours.');
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
                            <span>2.</span> Terms & Conditions {!allTermsAccepted && <span className={`${currentStep === 'terms' ? 'text-red-700' : 'text-[#E63946]'} font-bold`}>(!)</span>}
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
                            title={!allTermsAccepted ? 'Click to view (requires accepting terms in Step 2)' : ''}
                        >
                            <span>3.</span> Browse Statements {!allTermsAccepted ? '🔒' : ''}
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
                                    Choose between Category A (Earning Track with variable financial valuation) or Category B (Corporate Partner Track with official portfolio authorization).
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
                                            High-scale enterprise, distributed ledgers, API sentinels, and infrastructure challenges with an opportunity to earn financial compensation upon final build evaluation.
                                        </p>
                                        
                                        <div className="space-y-2 text-xs font-mono text-white/90 border-t border-white/10 pt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">💰 Compensation:</span> Variable Valuation (Evaluation Panel)
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#E63946] font-bold">⏱ 48-Hour Rule:</span> Initial Blueprint Submission Required
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">📅 Dev Cycle:</span> 45 Days post-blueprint approval
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">🛡️ Rejection Limit:</span> Max 3 Blueprint Rejections
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
                                        <div className="absolute top-3 right-3 text-[10px] font-heading font-black bg-cyan-400 text-pitchblack px-2.5 py-1 tracking-widest uppercase sharp">
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
                                            Challenges provided directly by popular tech companies and corporate partners with official authorization to add to your professional developer portfolio.
                                        </p>
                                        
                                        <div className="space-y-2 text-xs font-mono text-white/90 border-t border-white/10 pt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-cyan-400 font-bold">💼 Authorization:</span> Add to Developer Portfolio & Resume
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-lightgrey font-bold">ℹ️ Payout/Jobs:</span> Strictly Circumstantial / Not Guaranteed
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#E63946] font-bold">⏱ 48-Hour Rule:</span> Initial Blueprint Submission Required
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">📅 Dev Cycle:</span> 45 Days post-blueprint approval
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
                                    {allTermsAccepted ? 'DESELECT ALL' : '✓ CHECK ALL BOXES'}
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
                                            I agree that failure to comply with the 48-hour blueprint or 45-day deadline will forfeit my claim, and all IP rights belong exclusively to LevelUp Events Private Limited.
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Warning when disabled */}
                            {!allTermsAccepted && (
                                <div className="p-3 bg-red-500/10 border border-red-500/40 text-[#E63946] text-xs font-mono text-center">
                                    ⚠️ You cannot proceed without ticking the Terms and Conditions agreement checkboxes.
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
                                    {allTermsAccepted ? 'AGREE & PROCEED TO PROBLEM STATEMENTS →' : '🔒 ACCEPT TERMS TO UNLOCK STATEMENTS'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        STEP 3: LISTS OF PROBLEM STATEMENTS
                       ======================================================== */}
                    {currentStep === 'list' && !activeClaim && (
                        <div className="space-y-6">
                            {/* Security Guard: If somehow on Step 3 without terms */}
                            {!allTermsAccepted ? (
                                <div className="p-6 bg-pitchblack/90 border-2 border-red-500/60 text-center space-y-4 sharp">
                                    <div className="text-3xl">🔒</div>
                                    <h4 className="text-lg font-heading uppercase text-white font-bold">
                                        ACCESS RESTRICTED: TERMS NOT ACCEPTED
                                    </h4>
                                    <p className="text-xs text-lightgrey max-w-md mx-auto">
                                        You must review and accept the official Uprise 2027 Terms and Conditions before viewing and claiming problem statements.
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
                                                STEP 3 // BROWSE CHALLENGES (MAX 2 HACKERS / PS)
                                            </span>
                                            <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-white">
                                                SELECT YOUR PROBLEM STATEMENT
                                            </h3>
                                        </div>

                                        {/* Category Filter Tabs */}
                                        <div className="flex items-center gap-1 bg-black p-1 border border-white/15 sharp">
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTrack('standard')}
                                                className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider sharp transition-colors ${selectedTrack === 'standard' ? 'bg-gold text-pitchblack font-bold' : 'text-lightgrey hover:text-white'}`}
                                            >
                                                Category A: Standard (5)
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedTrack('corporate')}
                                                className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider sharp transition-colors ${selectedTrack === 'corporate' ? 'bg-cyan-400 text-pitchblack font-bold' : 'text-lightgrey hover:text-white'}`}
                                            >
                                                Category B: Corporate (5)
                                            </button>
                                        </div>
                                    </div>

                                    {/* Terms Acknowledged Banner */}
                                    <div className="p-3 bg-green-500/10 border border-green-500/30 text-xs text-green-300 font-mono flex items-center justify-between flex-wrap gap-2">
                                        <div className="flex items-center gap-2">
                                            <span>✓</span>
                                            <span>Terms and Conditions officially accepted (48h Blueprint Rule & LevelUp IP Ownership).</span>
                                        </div>
                                        <span className="text-[10px] text-lightgrey">Max 2 coders / problem statement</span>
                                    </div>

                                    {/* List of Problem Statements */}
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
                                                    {/* Card Top Row */}
                                                    <div className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10">
                                                        <div className="space-y-1">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <span className="text-xs font-mono font-bold bg-gold/20 text-gold border border-gold/40 px-2 py-0.5 sharp">
                                                                    {problem.id}
                                                                </span>
                                                                <span className="text-xs font-mono text-lightgrey">
                                                                    {problem.domain}
                                                                </span>
                                                                <span className="text-[10px] font-mono uppercase px-2 py-0.5 bg-white/5 border border-white/10 text-white/80">
                                                                    {problem.difficulty}
                                                                </span>
                                                            </div>
                                                            <h4 className="text-base sm:text-lg font-bold font-heading text-white">
                                                                {problem.title}
                                                            </h4>
                                                            <div className="text-[11px] font-mono text-gold/90">
                                                                {problem.compensationType}
                                                            </div>
                                                        </div>

                                                        {/* Live Slot Status (Max 2 people) */}
                                                        <div className="flex items-center gap-2 self-end sm:self-center">
                                                            <div className={`text-[11px] font-mono px-3 py-1 font-bold sharp border ${isFull ? 'bg-red-500/20 text-red-400 border-red-500/40' : claimedCount === 1 ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-green-500/20 text-green-400 border-green-500/40'}`}>
                                                                {claimedCount}/2 Hackers {isFull ? '(FULL)' : claimedCount === 1 ? '(1 SPOT LEFT)' : '(OPEN)'}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card Middle: Summary & Deliverables */}
                                                    <div className="p-4 sm:p-5 space-y-3">
                                                        <p className="text-xs sm:text-sm text-lightgrey font-grotesk leading-relaxed">
                                                            {problem.summary}
                                                        </p>

                                                        {isExpanded && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: 'auto' }}
                                                                className="space-y-3 pt-3 border-t border-white/10"
                                                            >
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

                                                                <div className="text-xs font-mono text-lightgrey">
                                                                    <span className="text-gold font-bold">Suggested Stack:</span> {problem.techStack}
                                                                </div>
                                                            </motion.div>
                                                        )}

                                                        {/* Action Bar */}
                                                        <div className="flex items-center justify-between pt-2 gap-3 flex-wrap">
                                                            <button
                                                                type="button"
                                                                onClick={() => setExpandedProblemId(isExpanded ? null : problem.id)}
                                                                className="text-xs text-gold/80 hover:text-white font-mono tracking-wider underline cursor-pointer"
                                                            >
                                                                {isExpanded ? '▲ Hide Full Specifications' : '▼ View Full Deliverables & Tech Stack'}
                                                            </button>

                                                            <button
                                                                type="button"
                                                                disabled={isFull}
                                                                onClick={() => handleClaimProblem(problem)}
                                                                className={`py-2.5 px-6 font-heading font-bold text-xs uppercase tracking-widest sharp transition-all ${isFull ? 'bg-white/10 text-white/30 cursor-not-allowed border border-white/10' : 'bg-gold text-pitchblack hover:bg-white cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.3)]'}`}
                                                            >
                                                                {isFull ? 'LOCKED (MAX 2 MEMBERS REACHED)' : 'CLAIM & LOCK PROBLEM STATEMENT →'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

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
                                            ⚡ 48-HOUR BLUEPRINT DEADLINE
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
                                        ℹ️ Reminder: Per the agreed Terms and Conditions, your blueprint must be approved by the LevelUp team before the 45-day building cycle commences. Max 3 blueprint rejections allowed.
                                    </p>
                                </div>
                            </div>

                            {/* Blueprint Submission Form */}
                            <div className="p-6 bg-pitchblack/80 border border-white/15 sharp space-y-4">
                                <div className="flex items-center justify-between border-b border-white/10 pb-3 flex-wrap gap-2">
                                    <h4 className="text-base sm:text-lg font-bold font-heading uppercase text-white flex items-center gap-2">
                                        <span>📝</span> SUBMIT SYSTEM BLUEPRINT FOR APPROVAL
                                    </h4>
                                    <span className="text-xs font-mono text-gold">
                                        Max 3 Rejections Permitted
                                    </span>
                                </div>

                                {submissionSuccessMsg && (
                                    <div className="p-3 bg-green-500/20 border border-green-500 text-green-300 text-xs font-mono">
                                        ✓ {submissionSuccessMsg}
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
                                            className="py-3 px-5 border border-[#5865F2]/50 bg-[#5865F2]/10 hover:bg-[#5865F2] text-[#5865F2] hover:text-white font-heading font-bold text-xs uppercase tracking-wider sharp transition-all flex items-center gap-2 no-underline"
                                        >
                                            💬 DISCORD #BLUEPRINT-HELP
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
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
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
