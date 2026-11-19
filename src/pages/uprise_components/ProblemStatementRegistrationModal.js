import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// --- CURATED PROBLEM STATEMENTS ---
const PROBLEM_STATEMENTS = [
    // Standard Problem Statements (45-Day Enterprise, Deep Tech & Architecture)
    {
        id: 'STD-01',
        category: 'standard',
        categoryLabel: 'Standard Problem Statement',
        title: 'Real-Time Distributed API Fraud & Volumetric Attack Sentinel',
        domain: 'Backend Systems / Cybersecurity / FinTech',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        categoryLabel: 'Standard Problem Statement',
        title: 'Event-Driven Financial Multi-Ledger Reconciliation & Settlement Engine',
        domain: 'FinTech / Distributed Systems / Database',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        categoryLabel: 'Standard Problem Statement',
        title: 'HIPAA-Compliant Unstructured Clinical Record Extraction & Anonymizer',
        domain: 'HealthTech / NLP / Data Privacy',
        difficulty: 'Advanced',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        categoryLabel: 'Standard Problem Statement',
        title: 'Autonomous Multi-Cloud Kubernetes FinOps Sentinel & Cost Shrinker',
        domain: 'DevOps / Cloud Architecture / FinOps',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        categoryLabel: 'Standard Problem Statement',
        title: 'High-Throughput Edge IoT Fleet Diagnostics & Predictive Telemetry Hub',
        domain: 'IoT / Edge Systems / Predictive AI',
        difficulty: 'Advanced',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
        summary: 'Create a resilient telemetry ingestion gateway that aggregates high-frequency vibration, thermal, and voltage telemetry from thousands of simulated hardware sensors over MQTT/WebSocket and predicts mechanical failure 72 hours before breakdown.',
        deliverables: [
            'High-concurrency MQTT broker gateway handling 20k msgs/sec with buffer backpressure',
            'Time-series anomaly detector for continuous wear-and-tear degradation patterns',
            'Emergency threshold circuit breaker triggering physical relay shutoffs / webhooks',
            'Fleet topology map showing live operational health and diagnostic logs'
        ],
        techStack: 'EMQX / Mosquitto MQTT, TimescaleDB / InfluxDB, Node.js / Rust, WebSockets'
    },

    // Trending Problem Statements (Emerging Tech, AI Agents & Web3)
    {
        id: 'TRD-01',
        category: 'trending',
        categoryLabel: 'Trending Problem Statement',
        title: 'Autonomous Multi-Agent PR Reviewer, Sandbox Tester & Zero-Day Patcher',
        domain: 'Autonomous AI Agents / AppSec / DevTools',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        id: 'TRD-02',
        category: 'trending',
        categoryLabel: 'Trending Problem Statement',
        title: 'Real-Time Multimodal Meeting Copilot with Speaker Diarization & Action Hub',
        domain: 'Multimodal AI / Real-Time Audio / Workspace',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        id: 'TRD-03',
        category: 'trending',
        categoryLabel: 'Trending Problem Statement',
        title: 'Decentralized P2P Compute & Bandwidth Sharing Sentinel (DePIN Protocol)',
        domain: 'Web3 / DePIN / Distributed P2P Networks',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        id: 'TRD-04',
        category: 'trending',
        categoryLabel: 'Trending Problem Statement',
        title: 'Spatial Vision-Language Assistant for Hardware Assembly & Repair Guidance',
        domain: 'Computer Vision / Vision-Language / AR Guidance',
        difficulty: 'Hardcore',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
        id: 'TRD-05',
        category: 'trending',
        categoryLabel: 'Trending Problem Statement',
        title: 'Autonomous Self-Healing Microservices Sentinel with Chaos Outage Simulation',
        domain: 'AI SRE / Chaos Engineering / Self-Healing Cloud',
        difficulty: 'Extreme',
        duration: '45 Days',
        blueprintHours: 48,
        blueprintChances: 3,
        productChances: 2,
        maxParticipants: 2,
        reward: 'Direct Final Hackathon Qualification + Corporate Cash-Out Eligible',
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
    // Current Step in the Registration Flow:
    // 'track' -> 'terms' -> 'list' -> 'hud'
    const [currentStep, setCurrentStep] = useState('track');
    const [selectedTrack, setSelectedTrack] = useState('standard'); // 'standard' | 'trending'
    const [expandedProblemId, setExpandedProblemId] = useState(null);

    // Terms & Conditions Checkboxes
    const [termsAgreed, setTermsAgreed] = useState({
        blueprint48h: false,
        blueprintGate: false,
        lifelineChances: false,
        max2Participants: false,
        completion45d: false
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
                'TRD-01': 1,
                'TRD-02': 0,
                'TRD-03': 1,
                'TRD-04': 0,
                'TRD-05': 0
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
                // Update global slot count
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

    // Check if all mandatory terms are accepted
    const allTermsAccepted = Object.values(termsAgreed).every(Boolean);

    const toggleAllTerms = () => {
        const targetState = !allTermsAccepted;
        setTermsAgreed({
            blueprint48h: targetState,
            blueprintGate: targetState,
            lifelineChances: targetState,
            max2Participants: targetState,
            completion45d: targetState
        });
    };

    // Handle Claiming a Problem Statement
    const handleClaimProblem = (problem) => {
        if (!currentUser?.email) {
            onClose();
            if (onOpenLogin) onOpenLogin();
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
            claimedAt: now,
            blueprintDeadline: now + (48 * 60 * 60 * 1000), // exactly 48 hours
            sprintDeadline: now + (45 * 24 * 60 * 60 * 1000), // exactly 45 days
            blueprintChancesTotal: 3,
            blueprintChancesRemaining: 3,
            productChancesTotal: 2,
            productChancesRemaining: 2,
            status: 'blueprint_pending', // 'blueprint_pending' | 'blueprint_submitted' | 'blueprint_approved' | 'building_phase'
            blueprintSubmission: null,
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
                                PRE-HACKATHON GAUNTLET // DIRECT PASS
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

                {/* Flow Stepper Navigation (Only shown if no active claim or switching) */}
                {!activeClaim && (
                    <div className="bg-black/60 border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between text-[11px] sm:text-xs font-heading tracking-wider uppercase overflow-x-auto gap-2">
                        <button
                            type="button"
                            onClick={() => setCurrentStep('track')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer sharp ${currentStep === 'track' ? 'bg-gold text-pitchblack font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'text-lightgrey hover:text-gold'}`}
                        >
                            <span>1.</span> Choose Track
                        </button>
                        <span className="text-gold/40">→</span>
                        <button
                            type="button"
                            onClick={() => setCurrentStep('terms')}
                            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer sharp ${currentStep === 'terms' ? 'bg-gold text-pitchblack font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]' : 'text-lightgrey hover:text-gold'}`}
                        >
                            <span>2.</span> Terms & Conditions
                        </button>
                        <span className="text-gold/40">→</span>
                        <button
                            type="button"
                            onClick={() => {
                                if (allTermsAccepted) setCurrentStep('list');
                                else alert('Please review and agree to all terms & conditions in Step 2 first.');
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 transition-colors cursor-pointer sharp ${currentStep === 'list' ? 'bg-gold text-pitchblack font-bold shadow-[0_0_10px_rgba(212,175,55,0.4)]' : allTermsAccepted ? 'text-lightgrey hover:text-gold' : 'text-white/30 cursor-not-allowed'}`}
                        >
                            <span>3.</span> Browse Statements
                        </button>
                    </div>
                )}

                {/* Modal Scrollable Body */}
                <div className="p-5 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">

                    {/* ========================================================
                        STEP 1: CHOOSE TRACK (Standard vs Trending)
                       ======================================================== */}
                    {currentStep === 'track' && !activeClaim && (
                        <div className="space-y-6">
                            <div className="text-center max-w-2xl mx-auto space-y-2">
                                <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-gold">
                                    STEP 1: SELECT YOUR PROBLEM STATEMENT TRACK
                                </h3>
                                <p className="text-sm text-lightgrey leading-relaxed">
                                    Pick the challenge format that fits your engineering domain. Both tracks qualify directly for the Final Hackathon and corporate cash-out acquisition upon approved completion.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                                {/* Option 1: Standard Problem Statements */}
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
                                            TRACK 01 // DEEP ARCHITECTURE
                                        </span>
                                        <h4 className="text-xl font-black font-heading text-white uppercase mb-3">
                                            STANDARD PROBLEM STATEMENT
                                        </h4>
                                        <p className="text-xs text-lightgrey leading-relaxed mb-4">
                                            High-scale enterprise, distributed systems, resilient financial ledgers, and cloud infrastructure challenges engineered for industrial production standards.
                                        </p>
                                        
                                        <div className="space-y-2 text-xs font-mono text-white/90 border-t border-white/10 pt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">⏱ Duration:</span> 45 Days Total Sprint
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#E63946] font-bold">⚡ First 48 Hours:</span> System Blueprint Required
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">🛡️ Lifelines:</span> 3 Blueprint Chances | 2 Product Chances
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">👥 Team Limit:</span> Max 2 Hackers / Problem Statement
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
                                        SELECT STANDARD TRACK &rarr;
                                    </button>
                                </div>

                                {/* Option 2: Trending Problem Statements */}
                                <div 
                                    onClick={() => setSelectedTrack('trending')}
                                    className={`p-6 border transition-all cursor-pointer sharp relative flex flex-col justify-between ${selectedTrack === 'trending' ? 'border-gold bg-gold/10 shadow-[0_0_25px_rgba(212,175,55,0.25)]' : 'border-white/10 bg-pitchblack/60 hover:border-gold/50'}`}
                                >
                                    {selectedTrack === 'trending' && (
                                        <div className="absolute top-3 right-3 text-[10px] font-heading font-black bg-gold text-pitchblack px-2.5 py-1 tracking-widest uppercase sharp">
                                            SELECTED
                                        </div>
                                    )}

                                    <div>
                                        <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 block mb-2">
                                            TRACK 02 // NEXT-GEN TECH
                                        </span>
                                        <h4 className="text-xl font-black font-heading text-white uppercase mb-3">
                                            TRENDING PROBLEM STATEMENT
                                        </h4>
                                        <p className="text-xs text-lightgrey leading-relaxed mb-4">
                                            Frontier AI technology: Autonomous Multi-Agent networks, Real-Time Multimodal audio copilots, DePIN P2P compute networks, and spatial vision assistants.
                                        </p>
                                        
                                        <div className="space-y-2 text-xs font-mono text-white/90 border-t border-white/10 pt-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-cyan-400 font-bold">⏱ Duration:</span> 45 Days Total Sprint
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[#E63946] font-bold">⚡ First 48 Hours:</span> Architecture Blueprint Required
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">🛡️ Lifelines:</span> 3 Blueprint Chances | 2 Product Chances
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-gold font-bold">👥 Team Limit:</span> Max 2 Hackers / Problem Statement
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedTrack('trending');
                                            setCurrentStep('terms');
                                        }}
                                        className="w-full mt-6 py-3 bg-cyan-400 text-pitchblack font-heading font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors sharp text-center"
                                    >
                                        SELECT TRENDING TRACK &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        STEP 2: TERMS AND CONDITIONS AGREEMENT
                       ======================================================== */}
                    {currentStep === 'terms' && !activeClaim && (
                        <div className="space-y-6">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4 flex-wrap gap-2">
                                <div>
                                    <span className="text-[10px] font-mono tracking-widest uppercase text-gold block">
                                        STEP 2 // BINDING OPERATIONAL PROTOCOL
                                    </span>
                                    <h3 className="text-xl sm:text-2xl font-bold font-heading uppercase text-white">
                                        TERMS & CONDITIONS AGREEMENT
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={toggleAllTerms}
                                    className="text-xs text-gold hover:text-white border border-gold/40 hover:border-gold px-3 py-1 font-mono tracking-wider sharp cursor-pointer transition-colors"
                                >
                                    {allTermsAccepted ? 'DESELECT ALL' : '✓ ACCEPT ALL RULES'}
                                </button>
                            </div>

                            <p className="text-xs text-lightgrey leading-relaxed">
                                To ensure production-grade standards and fair competition, you must formally review and agree to the following mandatory rules set by the Uprise Technical Committee before unlocking the problem statement lists:
                            </p>

                            <div className="space-y-3 font-grotesk text-xs sm:text-sm">
                                {/* Rule 1: 45 Days sprint */}
                                <label className="flex items-start gap-3 p-3.5 bg-pitchblack/70 border border-white/10 hover:border-gold/40 transition-colors cursor-pointer sharp">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.completion45d}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, completion45d: e.target.checked }))}
                                        className="mt-1 w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-bold text-white uppercase block text-xs tracking-wider">
                                            1. 45-Day Total Delivery Window
                                        </span>
                                        <p className="text-lightgrey text-xs mt-0.5">
                                            Standard & Trending problem statements carry exactly <strong>45 days</strong> from registration to deliver fully functional, production-ready code.
                                        </p>
                                    </div>
                                </label>

                                {/* Rule 2: First 48h Blueprint Submit */}
                                <label className="flex items-start gap-3 p-3.5 bg-pitchblack/70 border border-white/10 hover:border-gold/40 transition-colors cursor-pointer sharp">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.blueprint48h}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, blueprint48h: e.target.checked }))}
                                        className="mt-1 w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-bold text-[#E63946] uppercase block text-xs tracking-wider">
                                            2. Mandatory 48-Hour Blueprint Submission
                                        </span>
                                        <p className="text-lightgrey text-xs mt-0.5">
                                            Within the <strong>first 48 hours</strong> of claiming the problem statement, you must submit your system blueprint (system architecture, database schema, and milestone roadmap).
                                        </p>
                                    </div>
                                </label>

                                {/* Rule 3: Only Approved Blueprint to Building Phase */}
                                <label className="flex items-start gap-3 p-3.5 bg-pitchblack/70 border border-white/10 hover:border-gold/40 transition-colors cursor-pointer sharp">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.blueprintGate}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, blueprintGate: e.target.checked }))}
                                        className="mt-1 w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-bold text-white uppercase block text-xs tracking-wider">
                                            3. Building Phase Gatekeeper
                                        </span>
                                        <p className="text-lightgrey text-xs mt-0.5">
                                            <strong>Sirf approved blueprint</strong> ko hi Building Phase mai jaane ki permission hogi. No code submission will be accepted without blueprint approval from technical mentors.
                                        </p>
                                    </div>
                                </label>

                                {/* Rule 4: 3 Blueprint chances, 2 Product chances */}
                                <label className="flex items-start gap-3 p-3.5 bg-pitchblack/70 border border-white/10 hover:border-gold/40 transition-colors cursor-pointer sharp">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.lifelineChances}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, lifelineChances: e.target.checked }))}
                                        className="mt-1 w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-bold text-gold uppercase block text-xs tracking-wider">
                                            4. Strict Lifelines (Attempts)
                                        </span>
                                        <p className="text-lightgrey text-xs mt-0.5">
                                            Blueprint approve karane ke <strong>sirf 3 chance</strong> milenge, aur final product banane / review karwane ke <strong>sirf 2 chance</strong> milenge. Exhausting all chances disqualifies the claim.
                                        </p>
                                    </div>
                                </label>

                                {/* Rule 5: Max 2 People per Problem Statement */}
                                <label className="flex items-start gap-3 p-3.5 bg-pitchblack/70 border border-white/10 hover:border-gold/40 transition-colors cursor-pointer sharp">
                                    <input 
                                        type="checkbox"
                                        checked={termsAgreed.max2Participants}
                                        onChange={(e) => setTermsAgreed(prev => ({ ...prev, max2Participants: e.target.checked }))}
                                        className="mt-1 w-4 h-4 accent-gold cursor-pointer"
                                    />
                                    <div>
                                        <span className="font-heading font-bold text-white uppercase block text-xs tracking-wider">
                                            5. Team Cap: Maximum 2 Hackers Per Statement
                                        </span>
                                        <p className="text-lightgrey text-xs mt-0.5">
                                            Ek problem statement par <strong>maximum sirf 2 log</strong> kaam kar sakte hai (Solo or Duo). Slots are strictly locked once 2 hackers register.
                                        </p>
                                    </div>
                                </label>
                            </div>

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
                                        if (allTermsAccepted) setCurrentStep('list');
                                    }}
                                    className={`py-3.5 px-8 font-heading font-bold text-xs uppercase tracking-widest sharp transition-all ${allTermsAccepted ? 'bg-gold text-pitchblack hover:bg-white cursor-pointer shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-white/10 text-white/30 cursor-not-allowed'}`}
                                >
                                    AGREE & VIEW PROBLEM STATEMENTS &rarr;
                                </button>
                            </div>
                        </div>
                    )}

                    {/* ========================================================
                        STEP 3: LISTS OF PROBLEM STATEMENTS
                       ======================================================== */}
                    {currentStep === 'list' && !activeClaim && (
                        <div className="space-y-6">
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

                                {/* Track Filter Tabs */}
                                <div className="flex items-center gap-1 bg-black p-1 border border-white/15 sharp">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTrack('standard')}
                                        className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider sharp transition-colors ${selectedTrack === 'standard' ? 'bg-gold text-pitchblack font-bold' : 'text-lightgrey hover:text-white'}`}
                                    >
                                        Standard (5)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedTrack('trending')}
                                        className={`px-3 py-1.5 text-xs font-heading uppercase tracking-wider sharp transition-colors ${selectedTrack === 'trending' ? 'bg-cyan-400 text-pitchblack font-bold' : 'text-lightgrey hover:text-white'}`}
                                    >
                                        Trending (5)
                                    </button>
                                </div>
                            </div>

                            {/* Warning Banner */}
                            <div className="p-3 bg-gold/10 border border-gold/30 text-xs text-lightgrey font-mono flex items-center gap-2">
                                <span className="text-gold text-sm font-bold">⚠️</span>
                                <span>Remember: 48-Hour Blueprint submission timer starts immediately upon claiming! Max 2 hackers per problem.</span>
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
                                                <span className="text-red-500">EXPIRED</span>
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
                                        <span className="text-lightgrey block text-[10px] uppercase">Sprint Duration</span>
                                        <strong className="text-white font-bold text-sm">45 Days</strong>
                                    </div>
                                    <div className="p-2.5 bg-black/60 border border-gold/30 sharp text-center">
                                        <span className="text-gold block text-[10px] uppercase">Blueprint Chances</span>
                                        <strong className="text-gold font-bold text-sm">{activeClaim.blueprintChancesRemaining} / {activeClaim.blueprintChancesTotal} Left</strong>
                                    </div>
                                    <div className="p-2.5 bg-black/60 border border-cyan-400/30 sharp text-center">
                                        <span className="text-cyan-400 block text-[10px] uppercase">Product Chances</span>
                                        <strong className="text-cyan-400 font-bold text-sm">{activeClaim.productChancesRemaining} / {activeClaim.productChancesTotal} Left</strong>
                                    </div>
                                    <div className="p-2.5 bg-black/60 border border-white/10 sharp text-center">
                                        <span className="text-lightgrey block text-[10px] uppercase">Team Size</span>
                                        <strong className="text-white font-bold text-sm">Max 2 Members</strong>
                                    </div>
                                </div>

                                {/* Current Status & Gatekeeper Notice */}
                                <div className="p-3.5 bg-gold/10 border border-gold/40 text-xs font-grotesk text-lightgrey space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="font-heading font-bold text-gold uppercase">CURRENT PHASE:</span>
                                        <span className="font-mono bg-pitchblack px-2 py-0.5 border border-gold/40 text-white font-bold">
                                            {activeClaim.status === 'blueprint_pending' && 'PHASE 1: BLUEPRINT DESIGN (AWAITING SUBMISSION)'}
                                            {activeClaim.status === 'blueprint_submitted' && 'PHASE 1: BLUEPRINT SUBMITTED (UNDER MENTOR REVIEW)'}
                                            {activeClaim.status === 'blueprint_approved' && 'PHASE 2: 45-DAY BUILDING PHASE UNLOCKED'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-lightgrey">
                                        ℹ️ Note: <strong>Sirf approved blueprint</strong> ko hi Building Phase mai jaane ki permission hogi. Ensure your architecture document is submitted within the 48-hour deadline.
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
                                        Attempts Allowed: 3 Max
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
                                            placeholder="Outline chosen database, chosen framework, API protocols, and scalability considerations..."
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
                        <span>Uprise Pre-Hackathon 2026 // Operational Protocol</span>
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

