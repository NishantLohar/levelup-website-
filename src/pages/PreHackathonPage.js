import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import UpriseNavbar from './uprise_components/UpriseNavbar';
import UpriseLoginModal from './uprise_components/UpriseLoginModal';
import './Uprise.css'; // Reuse the same CSS for consistent animations

const PreHackathonPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isRegisteredParam = new URLSearchParams(location.search).get('registered') === 'true';

    useEffect(() => {
        // Automatically register status in localStorage & cookie
        localStorage.setItem('prehackathon_registered', 'true');
        try {
            document.cookie = "prehackathon_registered=true; path=/; max-age=10368000";
            if (window.location.hostname.includes('levelupevents.in')) {
                document.cookie = "prehackathon_registered=true; path=/; max-age=10368000; domain=.levelupevents.in";
            }
        } catch (e) {}
        // --- Hover effect for interactive elements ---
        const addHover = () => document.body.classList.add('cursor-hover');
        const removeHover = () => document.body.classList.remove('cursor-hover');
        
        document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
            el.addEventListener('mouseenter', addHover);
            el.addEventListener('mouseleave', removeHover);
        });

        // --- Mouse Spotlight Logic ---
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        
        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            document.documentElement.style.setProperty('--mouse-x', mouseX + 'px');
            document.documentElement.style.setProperty('--mouse-y', mouseY + 'px');
        };

        document.addEventListener('mousemove', onMouseMove);

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.querySelectorAll('a, button, .cursor-pointer').forEach(el => {
                el.removeEventListener('mouseenter', addHover);
                el.removeEventListener('mouseleave', removeHover);
            });
        };
    }, []);

    const activities = [
        { date: '01/11/26', day: 'Sunday', title: 'Workshop 1', type: 'Big', completion: 800, win: 1500 },
        { date: '03/11/26', day: 'Tuesday', title: 'LinkedIn Post', type: 'Small', completion: 100, win: 200 },
        { date: '07/11/26', day: 'Saturday', title: 'Weekly Chat 1', type: 'Medium', completion: 500, win: 0 },
        { date: '10/11/26', day: 'Tuesday', title: 'Quiz 1', type: 'Small', completion: 100, win: 200 },
        { date: '14/11/26', day: 'Saturday', title: 'Meme war', type: 'Medium', completion: 500, win: 800 },
        { date: '15/11/26', day: 'Sunday', title: 'Fake product Launch', type: 'Big', completion: 800, win: 1500 },
        { date: '19/11/26', day: 'Thursday', title: 'Drop your playlist', type: 'Small', completion: 100, win: 200 },
        { date: '21/11/26', day: 'Saturday', title: 'Most complex "Hello world"', type: 'Medium', completion: 500, win: 800 },
        { date: '24/11/26', day: 'Tuesday', title: 'The $1000 rock pitch', type: 'Small', completion: 100, win: 200 },
        { date: '28/11/26', day: 'Saturday', title: 'Cold mail for your dream job', type: 'Medium', completion: 500, win: 800 },
        { date: '29/11/26', day: 'Sunday', title: 'Workshop 2', type: 'Big', completion: 800, win: 1500 },
        { date: '01/12/26', day: 'Tuesday', title: 'Drop your first project repo from GitHub', type: 'Small', completion: 100, win: 200 },
        { date: '05/12/26', day: 'Saturday', title: 'Hacker vs Machine', type: 'Medium', completion: 500, win: 800 },
        { date: '09/12/26', day: 'Wednesday', title: 'Push notification trap', type: 'Small', completion: 100, win: 200 },
        { date: '12/12/26', day: 'Saturday', title: 'Explain to me like i am a 80 year old', type: 'Medium', completion: 500, win: 800 },
        { date: '13/12/26', day: 'Sunday', title: 'Cook a recipe', type: 'Medium', completion: 500, win: 800 },
        { date: '16/12/26', day: 'Wednesday', title: '5 word billboard on Time Sqaure', type: 'Small', completion: 100, win: 200 },
        { date: '19/12/26', day: 'Saturday', title: 'Weekly chat 2', type: 'Medium', completion: 500, win: 0 },
        { date: '20/12/26 - 26/12/26', day: 'Sun-Sat', title: 'HackSpace', type: 'Big', completion: 10000, win: 50000 },
        { date: '28/12/26', day: 'Monday', title: 'GIF reaction war', type: 'Small', completion: 100, win: 200 },
        { date: '01/01/27', day: 'Friday', title: '2 Truth, 1 Lie', type: 'Small', completion: 100, win: 200 },
        { date: '02/01/27', day: 'Saturday', title: 'What ifs', type: 'Medium', completion: 500, win: 800 },
        { date: '05/01/27', day: 'Tuesday', title: 'Start, stop, continue', type: 'Small', completion: 100, win: 0 },
        { date: '09/01/27', day: 'Saturday', title: 'Weekly chat 3', type: 'Medium', completion: 500, win: 0 },
        { date: '10/01/27', day: 'Sunday', title: 'Become a tutor', type: 'Big', completion: 800, win: 1500 },
        { date: '14/01/27', day: 'Thursday', title: 'Quiz 2', type: 'Small', completion: 100, win: 200 },
        { date: '16/01/27', day: 'Saturday', title: 'Explain to me like i am a 10 year old', type: 'Medium', completion: 500, win: 800 },
        { date: '19/01/27', day: 'Tuesday', title: 'Quiz 3', type: 'Small', completion: 100, win: 200 },
        { date: '23/01/27', day: 'Saturday', title: 'Crisis PR', type: 'Medium', completion: 500, win: 800 },
        { date: '24/01/27', day: 'Sunday', title: 'Workshop 3', type: 'Big', completion: 800, win: 1500 },
        { date: '26/01/27', day: 'Tuesday', title: 'RST', type: 'Small', completion: 100, win: 200 },
        { date: '30/01/27', day: 'Saturday', title: 'Elevated Pitch', type: 'Medium', completion: 500, win: 800 },
        { date: '02/02/27', day: 'Tuesday', title: 'The missing piece', type: 'Small', completion: 100, win: 200 },
        { date: '06/02/27', day: 'Saturday', title: 'Re-launch', type: 'Medium', completion: 500, win: 800 },
        { date: '07/02/27', day: 'Sunday', title: 'Boss fight', type: 'Big', completion: 800, win: 1500 },
        { date: '10/02/27', day: 'Wednesday', title: 'Quiz 4', type: 'Small', completion: 100, win: 200 },
        { date: '13/02/27', day: 'Saturday', title: 'GTM', type: 'Medium', completion: 500, win: 800 },
        { date: '16/02/27', day: 'Tuesday', title: 'Unpopular opinion', type: 'Small', completion: 100, win: 200 },
        { date: '21/02/27', day: 'Sunday', title: 'Workshop 4', type: 'Big', completion: 800, win: 1500 },
        { date: '27/02/27', day: 'Saturday', title: 'Weekly Chat 4', type: 'Medium', completion: 500, win: 0 }
    ];

    // User Authentication & XP Claim State
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const saved = localStorage.getItem('uprise_user') || sessionStorage.getItem('uprise_user');
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            return null;
        }
    });
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [shareModalData, setShareModalData] = useState(null);
    const [isRevealingSoonOpen, setIsRevealingSoonOpen] = useState(false);
    const [manualClickedTasks, setManualClickedTasks] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('manual_tasks_clicked') || '[]');
        } catch (e) {
            return [];
        }
    });
    const [claimingKey, setClaimingKey] = useState(null);
    const [toastMsg, setToastMsg] = useState(null);

    // Carousel and Quiz Modal State
    const [currentPage, setCurrentPage] = useState(0);
    const [quizModalData, setQuizModalData] = useState(null);
    const [quizAnswer, setQuizAnswer] = useState('');
    const [quizResult, setQuizResult] = useState(null);
    const [touchStartX, setTouchStartX] = useState(null);

    // Sync status from SaaS API on mount if user is logged in
    useEffect(() => {
        if (currentUser?.email) {
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';
            fetch(`${API_BASE_URL}/api/v1/uprise/user-status?email=${encodeURIComponent(currentUser.email)}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success && data.user) {
                        setCurrentUser(prev => {
                            const updated = { ...prev, ...data.user };
                            if (localStorage.getItem('uprise_user') || localStorage.getItem('uprise_remember_me') !== 'false') {
                                localStorage.setItem('uprise_user', JSON.stringify(updated));
                            } else {
                                sessionStorage.setItem('uprise_user', JSON.stringify(updated));
                            }
                            return updated;
                        });
                    }
                })
                .catch(err => console.log('Sync user status error:', err));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('uprise_user');
        sessionStorage.removeItem('uprise_user');
        localStorage.removeItem('uprise_remember_me');
        localStorage.removeItem('uprise_remembered_email');
        setCurrentUser(null);
    };

    const handleDownloadAsset = async (imageSrc, fileName) => {
        try {
            const response = await fetch(imageSrc);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
            setToastMsg('Image downloaded successfully! Post it and share proof on Discord.');
            setTimeout(() => setToastMsg(null), 4000);
        } catch (err) {
            const link = document.createElement('a');
            link.href = imageSrc;
            link.download = fileName;
            link.target = '_blank';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            setToastMsg('Download started! Post it and share proof on Discord.');
            setTimeout(() => setToastMsg(null), 4000);
        }
    };

    const handleQuizSubmit = (e) => {
        e.preventDefault();
        if (!quizModalData) return;
        const cleanInput = quizAnswer.trim().toLowerCase();
        
        let isCorrect = false;
        if (quizModalData.quizAccepted) {
            if (quizModalData.key === 'the_css_center') {
                isCorrect = cleanInput.includes('justify-content') && cleanInput.includes('align-items');
            } else {
                isCorrect = quizModalData.quizAccepted.some(ans => cleanInput.includes(ans.toLowerCase()));
            }
        }
        
        if (isCorrect) {
            setQuizResult({
                success: true,
                msg: `🎉 Correct answer! Share your screenshot or answer on the Discord #showcase channel to claim +${quizModalData.xp}!`
            });
            if (!manualClickedTasks.includes(quizModalData.key)) {
                const updated = [...manualClickedTasks, quizModalData.key];
                setManualClickedTasks(updated);
                try {
                    localStorage.setItem('manual_tasks_clicked', JSON.stringify(updated));
                } catch (err) {}
            }
        } else {
            setQuizResult({
                success: false,
                msg: `❌ Not quite! ${quizModalData.quizHint || 'Try again or ask for clues in the Discord community.'}`
            });
        }
    };

    const handleTaskClick = async (e, task) => {
        // External links (Hirestop, Skill Test, AI Interview)
        if (task.key === 'hirestop' || task.key === 'skill_test_mission' || task.key === 'ai_interview_mission') {
            e.preventDefault();
            window.open(task.link, '_blank');
            return;
        }

        // Referral tasks (Squad Assembly & The Bounty Hunter)
        if (task.key === 'squad_assembly' || task.key === 'bounty_hunter') {
            e.preventDefault();
            if (!currentUser) {
                setIsLoginModalOpen(true);
                setToastMsg('Please sign in to view and copy your custom invite code!');
                setTimeout(() => setToastMsg(null), 4000);
                return;
            }
            const code = currentUser.coupon_code || 'UPRISE2027';
            const inviteUrl = `${window.location.origin}/uprise?ref=${encodeURIComponent(code)}`;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(`Join Uprise 2027 with my invite code: ${code}\nRegister here: ${inviteUrl}`);
            }
            if (task.key === 'bounty_hunter') {
                setToastMsg(`Invite code copied: ${code}! Complete 50 successful referrals to unlock +500 XP Bounty Hunter reward!`);
            } else {
                setToastMsg(`Invite code copied: ${code}! Share with developers to earn 50 XP (70 XP for Builders).`);
            }
            setTimeout(() => setToastMsg(null), 5000);
            return;
        }

        if (task.key === 'club_referral') {
            e.preventDefault();
            navigate('/club-activities');
            return;
        }

        // 404 Hunt mission briefing
        if (task.key === 'hunt_404') {
            e.preventDefault();
            setQuizModalData({
                key: 'hunt_404',
                title: '404 HUNT MISSION',
                badge: '+70 XP MISSION',
                question: '6 Digit code on a broken link.',
                hint: 'Hunt down the hidden 6-digit key across LevelUp pages! Complete details and clues will be announced soon on Discord.',
                isInfoOnly: true,
                actionBtnText: 'JOIN DISCORD FOR ANNOUNCEMENTS',
                actionLink: 'https://discord.gg/BxkRwU6X5'
            });
            return;
        }

        // Interactive Quiz Tasks
        if (task.isQuiz) {
            e.preventDefault();
            setQuizAnswer('');
            setQuizResult(null);
            setQuizModalData(task);
            return;
        }

        // DOM Manipulation briefing
        if (task.key === 'dom_manipulation') {
            e.preventDefault();
            setQuizModalData({
                key: 'dom_manipulation',
                title: 'DOM MANIPULATION MISSION',
                badge: '+35 XP MISSION',
                question: "Open Uprise page and right click -> Inspect (DevTools), edit the DOM HTML to change the main header text to say '{Your name} owns this system', and upload screenshot on showcase channel.",
                hint: "Take a clear screenshot of your modified DOM header showing your name, and upload it in the Discord #showcase channel to claim +35 XP!",
                isInfoOnly: true,
                actionBtnText: 'GO TO DISCORD SHOWCASE',
                actionLink: 'https://discord.gg/BxkRwU6X5'
            });
            return;
        }

        if (!currentUser) {
            e.preventDefault();
            setIsLoginModalOpen(true);
            setToastMsg('Please sign in to earn and credit XP to your account!');
            setTimeout(() => setToastMsg(null), 4000);
            return;
        }

        // Manual verification tasks (Instagram Story & LinkedIn Post) - Show download popup
        if (task.key === 'instagram_story') {
            e.preventDefault();
            setShareModalData({
                type: 'instagram_story',
                title: 'SHARE ON INSTAGRAM STORY',
                badge: '+20 XP MISSION',
                imageSrc: '/Instagram story.png',
                downloadName: 'Instagram-Story-Uprise.png',
                platformUrl: 'https://www.instagram.com/levelupofficial.in/',
                platformName: 'OPEN INSTAGRAM',
                tagText: '@levelupofficial.in',
                taskKey: 'instagram_story'
            });
            return;
        }

        if (task.key === 'linkedin_post') {
            e.preventDefault();
            setShareModalData({
                type: 'linkedin_post',
                title: 'SHARE LINKEDIN POST',
                badge: '+30 XP MISSION',
                imageSrc: '/LinkedIn Banner (1).png',
                downloadName: 'LinkedIn-Banner-Uprise.png',
                platformUrl: 'https://linkedin.com/company/levelupevents',
                platformName: 'OPEN LINKEDIN',
                tagText: 'LevelUp Events',
                taskKey: 'linkedin_post'
            });
            return;
        }

        // Showcase & Discord proof tasks (The Veteran, Architect's Review, GitHub Audit, Post Meme, Discord Roll-call)
        const proofTasks = ['the_veteran', 'architects_review', 'github_audit', 'post_meme_mission', 'discord_rollcall'];
        if (proofTasks.includes(task.key)) {
            if (!manualClickedTasks.includes(task.key)) {
                const updated = [...manualClickedTasks, task.key];
                setManualClickedTasks(updated);
                try {
                    localStorage.setItem('manual_tasks_clicked', JSON.stringify(updated));
                } catch (err) {}
            }
            setToastMsg(`Mission opened! Complete it and share proof on Discord #showcase to claim +${task.xp}!`);
            setTimeout(() => setToastMsg(null), 4500);
            return;
        }

        // Automated tasks (Instagram follow, YouTube, LinkedIn follow, WhatsApp, Discord)
        const isAlreadyClaimed = currentUser.claimed_tasks?.includes(task.key);
        if (!isAlreadyClaimed) {
            setClaimingKey(task.key);
            const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';
            try {
                const res = await fetch(`${API_BASE_URL}/api/v1/uprise/claim-task-xp`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: currentUser.email,
                        task_key: task.key,
                    }),
                });
                const data = await res.json();
                if (data.success) {
                    setCurrentUser(prev => {
                        const updated = {
                            ...prev,
                            total_xp: data.total_xp,
                            claimed_tasks: data.claimed_tasks || [...(prev?.claimed_tasks || []), task.key],
                        };
                        localStorage.setItem('uprise_user', JSON.stringify(updated));
                        return updated;
                    });
                    setToastMsg(`🎉 +${task.xp} CREDITED TO YOUR ACCOUNT!`);
                    setTimeout(() => setToastMsg(null), 4500);
                }
            } catch (err) {
                console.error('Claim XP error:', err);
            } finally {
                setClaimingKey(null);
            }
        }
    };

    const socialTasks = [
        // --- PAGE 1 MISSIONS (1 to 12) ---
        {
            key: "instagram",
            title: "Instagram",
            action: "Follow @levelupofficial.in on Instagram",
            xp: "20 XP",
            link: "https://www.instagram.com/levelupofficial.in/",
            btnText: "Follow",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            )
        },
        {
            key: "youtube",
            title: "YouTube",
            action: "Subscribe to LevelUp Official",
            xp: "20 XP",
            link: "https://www.youtube.com/@LevelUpOfficial-in",
            btnText: "Subscribe",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        },
        {
            key: "linkedin",
            title: "LinkedIn",
            action: "Follow LevelUp Events on LinkedIn",
            xp: "20 XP",
            link: "https://linkedin.com/company/levelupevents",
            btnText: "Follow",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
            )
        },
        {
            key: "whatsapp",
            title: "WhatsApp Group",
            action: "Join LevelUp Official WhatsApp Community",
            xp: "40 XP",
            link: "https://chat.whatsapp.com/HgtgSww0doQFh6Tq0IJf4v?s=cl&p=a&mlu=4&ilr=4",
            btnText: "Join Group",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
            )
        },
        {
            key: "discord",
            title: "Discord",
            action: "Join LevelUp Discord Server & Community",
            xp: "40 XP",
            link: "https://discord.gg/BxkRwU6X5",
            btnText: "Join Discord",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
            )
        },
        {
            key: "instagram_story",
            title: "Instagram Story",
            action: "Share story & tag @levelupofficial.in",
            xp: "20 XP",
            link: "https://www.instagram.com/levelupofficial.in/",
            btnText: "Share Story",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
            )
        },
        {
            key: "linkedin_post",
            title: "LinkedIn Post",
            action: "Post about joining & tag LevelUp Events",
            xp: "30 XP",
            link: "https://linkedin.com/company/levelupevents",
            btnText: "Post & Tag",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
            )
        },
        {
            key: "student_profile",
            title: "Student Profile",
            action: "Complete your student dashboard profile",
            xp: "20 XP",
            link: "https://account.levelupevents.in/accounts/profile/",
            btnText: "Complete Profile",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            )
        },
        {
            key: "hirestop",
            title: "Hirestop Eligibility",
            action: "Give at least 2 AI job interviews & 3 skill tests (avg 70) OR gain 2,000 XP",
            xp: "ELIGIBILITY",
            link: "https://account.levelupevents.in/skill-test/",
            btnText: "Take Skill Test",
            isExternal: true,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
            )
        },
        {
            key: "squad_assembly",
            title: "Squad Assembly",
            action: "Give your custom Uprise invite code to a developer. XP unlocks the moment they register.",
            xp: "50 XP · 70 XP FOR BUILDERS",
            link: "#",
            btnText: "Copy Invite Code",
            isAction: true,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
            )
        },
        {
            key: "club_referral",
            title: "Organisation Referral",
            action: "Refer a college club or partner organisation. Massive XP credited upon verification.",
            xp: "2000 XP · 2200 XP FOR BUILDERS",
            link: "/club-activities",
            btnText: "Refer Organisation",
            isAction: true,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M3 21h18"></path>
                    <path d="M5 21V7l8-4v18"></path>
                    <path d="M19 21V11l-6-4"></path>
                    <path d="M9 9v.01"></path>
                    <path d="M9 12v.01"></path>
                    <path d="M9 15v.01"></path>
                    <path d="M9 18v.01"></path>
                </svg>
            )
        },
        {
            key: "hunt_404",
            title: "404 Hunt",
            action: "6 Digit code on a broken link. Find the hidden key across LevelUp pages.",
            xp: "70 XP",
            link: "#",
            btnText: "Start 404 Hunt",
            isAction: true,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <path d="M9 9l4 4m0-4l-4 4"></path>
                </svg>
            )
        },

        // --- PAGE 2 MISSIONS (13 to 24) ---
        {
            key: "discord_rollcall",
            title: "Discord Roll-Call",
            action: "Introduce yourself on the #introduction channel in the LevelUp Discord server.",
            xp: "100 XP",
            link: "https://discord.gg/BxkRwU6X5",
            btnText: "Introduce Yourself",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
            )
        },
        {
            key: "bounty_hunter",
            title: "The Bounty Hunter",
            action: "Complete 50 referrals successfully to unlock this legendary badge.",
            xp: "500 XP",
            link: "#",
            btnText: "Copy Referral Link",
            isAction: true,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="6"></circle>
                    <circle cx="12" cy="12" r="2"></circle>
                </svg>
            )
        },
        {
            key: "the_veteran",
            title: "The Veteran",
            action: "Post a valid certificate from a recognized national level Hackathon on Showcase channel.",
            xp: "50 XP",
            link: "https://discord.gg/BxkRwU6X5",
            btnText: "Post Certificate",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="8" r="7"></circle>
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
            )
        },
        {
            key: "architects_review",
            title: "The Architect's Review",
            action: "Post 1 page technical architecture proposal on the project you want to build in Uprise Hackathon on LinkedIn.",
            xp: "50 XP",
            link: "https://linkedin.com/company/levelupevents",
            btnText: "Post Proposal",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                    <polyline points="2 17 12 22 22 17"></polyline>
                    <polyline points="2 12 12 17 22 12"></polyline>
                </svg>
            )
        },
        {
            key: "github_audit",
            title: "GitHub Audit",
            action: "Submit Profile URL and ensure you have a profile picture and a bio.",
            xp: "30 XP",
            link: "https://discord.gg/BxkRwU6X5",
            btnText: "Submit Profile",
            icon: (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
            )
        },
        {
            key: "package_manager_quiz",
            title: "Package Manager Quiz",
            action: "What is the exact terminal command to initialize a new node js project?",
            xp: "25 XP",
            link: "#",
            btnText: "Take Quiz",
            isQuiz: true,
            quizQuestion: "What is the exact terminal command to initialize a new node js project?",
            quizAccepted: ["npm init", "npm init -y", "npm init --yes", "yarn init", "pnpm init"],
            quizHint: "Think of the standard Node Package Manager initialization command.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
            )
        },
        {
            key: "terminal_navigator_quiz",
            title: "Terminal Navigator Quiz",
            action: "What is the exact Linux terminal command used to list all files in a directory, including the new ones?",
            xp: "25 XP",
            link: "#",
            btnText: "Take Quiz",
            isQuiz: true,
            quizQuestion: "What is the exact Linux terminal command used to list all files in a directory, including hidden & new ones?",
            quizAccepted: ["ls -la", "ls -a", "ls -al", "ls -lart", "ls -lat", "ls -ltr", "ls -lt"],
            quizHint: "Starts with 'ls' combined with flags for all files and detailed listing.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                    <path d="M6 8l4 4-4 4"></path>
                    <line x1="12" y1="16" x2="18" y2="16"></line>
                </svg>
            )
        },
        {
            key: "the_css_center",
            title: "The CSS Center",
            action: "Using CSS flexbox, what are the two exact properties and values required on a parent container to perfectly center a child DIV both vertically and horizontally?",
            xp: "25 XP",
            link: "#",
            btnText: "Take Quiz",
            isQuiz: true,
            quizQuestion: "Using CSS flexbox, what are the two exact properties and values required on a parent container to perfectly center a child DIV both vertically and horizontally?",
            quizAccepted: ["justify-content: center; align-items: center;", "align-items: center; justify-content: center;", "justify-content: center", "align-items: center"],
            quizHint: "One property centers along the main axis, and the other along the cross axis.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="3" y="3" width="18" height="18" rx="2"></rect>
                    <circle cx="12" cy="12" r="3"></circle>
                    <line x1="12" y1="3" x2="12" y2="9"></line>
                    <line x1="12" y1="15" x2="12" y2="21"></line>
                    <line x1="3" y1="12" x2="9" y2="12"></line>
                    <line x1="15" y1="12" x2="21" y2="12"></line>
                </svg>
            )
        },
        {
            key: "dom_manipulation",
            title: "DOM Manipulation",
            action: "Open Uprise page and right click and select inspect to open DevTools, edit the DOM HTML to change the main header text to say '{Your name} owns this system', upload the screenshot on showcase channel",
            xp: "35 XP",
            link: "https://discord.gg/BxkRwU6X5",
            btnText: "Upload Screenshot",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
            )
        },
        {
            key: "skill_test_mission",
            title: "Skill Test",
            action: "Complete a skill test with 70+ score and upload on showcase channel",
            xp: "40 XP",
            link: "https://account.levelupevents.in/skill-test/",
            btnText: "Take Skill Test",
            isExternal: true,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
            )
        },
        {
            key: "ai_interview_mission",
            title: "AI Job Interview",
            action: "Take an interview and upload the report's screenshot on showcase channel",
            xp: "50 XP",
            link: "https://account.levelupevents.in/ai-interview/",
            btnText: "Take Interview",
            isExternal: true,
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    <circle cx="12" cy="16" r="1"></circle>
                </svg>
            )
        },
        {
            key: "post_meme_mission",
            title: "Post A Meme",
            action: "Create a meme yourself and post on Uprise Discord server",
            xp: "20 XP",
            link: "https://discord.gg/BxkRwU6X5",
            btnText: "Post On Discord",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
            )
        }
    ];

    const renderTaskCard = (task, index) => {
        const isManualTask = task.key === 'instagram_story' || task.key === 'linkedin_post' || task.key === 'the_veteran' || task.key === 'architects_review' || task.key === 'github_audit' || task.key === 'dom_manipulation' || task.key === 'post_meme_mission' || task.key === 'discord_rollcall';
        const isManualClicked = isManualTask && manualClickedTasks.includes(task.key);
        const isClaimed = !isManualTask && currentUser?.claimed_tasks?.includes(task.key);
        const isClaiming = claimingKey === task.key;

        return (
            <motion.div
                key={task.key || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (index % 12) * 0.03 }}
                className={`glass-card border ${
                    isClaimed 
                        ? 'border-green-500/50 bg-green-500/5' 
                        : isManualClicked
                        ? 'border-gold/60 bg-gold/10 shadow-[0_0_20px_rgba(212,175,55,0.15)]'
                        : 'border-gold/25 hover:border-gold bg-obsidian/90 hover:bg-gold/10'
                } p-5 sm:p-6 sharp transition-all duration-300 flex flex-col justify-between group relative overflow-hidden min-h-[225px]`}
            >
                <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 border ${
                        isClaimed 
                            ? 'border-green-400 text-green-400' 
                            : isManualClicked
                            ? 'border-gold text-gold'
                            : 'border-gold/30 text-gold group-hover:text-white group-hover:border-gold'
                    } bg-pitchblack flex items-center justify-center transition-colors flex-shrink-0`}>
                        {task.icon}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        {isClaimed && (
                            <span className="font-heading font-bold text-[10px] px-2 py-0.5 border border-green-500 bg-green-500/20 text-green-400 tracking-wider">
                                CLAIMED ✓
                            </span>
                        )}
                        {isManualClicked && (
                            <span className="font-heading font-bold text-[9px] px-2 py-0.5 border border-gold/60 bg-gold/20 text-gold tracking-wider">
                                DISCORD PROOF
                            </span>
                        )}
                        <span className={`font-heading font-black text-xs px-2.5 py-1 ${
                            isClaimed 
                                ? 'bg-green-500/10 border border-green-500 text-green-400' 
                                : 'bg-gold/15 border border-gold text-gold gold-glow'
                        } tracking-wider uppercase`}>
                            {task.xp.includes('XP') ? `+${task.xp}` : task.xp}
                        </span>
                    </div>
                </div>
                <div className="mb-3">
                    <h4 className={`text-base font-bold uppercase tracking-tight mb-1.5 line-clamp-1 ${
                        isClaimed ? 'text-green-300' : isManualClicked ? 'text-gold' : 'text-white group-hover:text-gold'
                    } transition-colors`} title={task.title}>
                        {task.title}
                    </h4>
                    <p className="text-xs text-lightgrey font-grotesk leading-relaxed line-clamp-2" title={task.action}>
                        {task.action}
                    </p>
                </div>
                <a
                    href={isManualClicked ? 'https://discord.gg/BxkRwU6X5' : task.link}
                    target={task.link?.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    onClick={(e) => handleTaskClick(e, task)}
                    className={`text-xs uppercase font-heading font-bold py-2.5 px-3 border ${
                        isClaimed 
                            ? 'border-green-500/40 text-green-300 hover:bg-green-500/20' 
                            : isManualClicked
                            ? 'border-gold bg-gold/15 text-gold hover:bg-gold hover:text-pitchblack'
                            : 'border-gold/40 hover:border-gold bg-gold/5 hover:bg-gold hover:text-pitchblack text-white'
                    } text-center tracking-wider transition-all duration-200 mt-auto flex items-center justify-center gap-1.5 cursor-pointer leading-tight`}
                >
                    <span className="truncate">
                        {isClaiming 
                            ? 'CREDITING...' 
                            : isClaimed 
                            ? 'VISITED ✓' 
                            : isManualClicked 
                            ? 'DISCORD PROOF' 
                            : task.btnText}
                    </span>
                    <span className="flex-shrink-0">&rarr;</span>
                </a>
            </motion.div>
        );
    };

    return (
        <div className="bg-obsidian min-h-screen text-white font-grotesk overflow-x-hidden relative selection:bg-gold/30 selection:text-gold">
            {/* Glowing background spotlight */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{
                background: `radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.05), transparent 80%)`
            }}></div>

            {/* Uprise Navigation Bar */}
            <UpriseNavbar 
                user={currentUser} 
                onOpenLogin={() => setIsLoginModalOpen(true)} 
                onLogout={handleLogout} 
            />

            {/* Celebratory Notification Toast */}
            <AnimatePresence>
                {toastMsg && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        className="fixed top-24 left-1/2 transform -translate-x-1/2 z-[99999] px-6 py-3 bg-pitchblack border-2 border-gold text-gold font-heading font-black tracking-widest text-xs uppercase gold-glow shadow-2xl flex items-center gap-3 sharp"
                    >
                        <span>⚡</span>
                        <span>{toastMsg}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <section className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-24">
                        {isRegisteredParam && (
                            <motion.div 
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-10 p-5 bg-gold/10 border-2 border-gold text-gold font-heading tracking-widest text-sm uppercase sharp gold-glow inline-flex items-center gap-3"
                            >
                                <span className="text-xl font-bold">✓</span>
                                <span>REGISTRATION CONFIRMED — YOU ARE OFFICIALLY IN THE PRE-HACKATHON</span>
                            </motion.div>
                        )}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-tight text-white">
                                DIRECT <span className="text-gold bright drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">QUALIFICATION</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-lightgrey tracking-[0.2em] font-heading mb-12">
                                SOLVE THE PROBLEM STATEMENT AND GET A CHANCE TO SECURE YOUR SPOT IN TOP 1200
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="glass-card border border-gold p-12 lg:p-16 relative overflow-hidden sharp group gold-glow bg-gold/5 max-w-5xl mx-auto"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-50 pointer-events-none"></div>
                            
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-snug">
                                COMPLETE THE <span className="text-gold">PROBLEM STATEMENT</span><br/> IN <span className="text-[#E63946]">45 DAYS</span>
                            </h2>
                            <p className="text-lg md:text-xl text-lightgrey leading-relaxed max-w-4xl mx-auto mb-10">
                                As part of the Pre-Hackathon, all registered teams will receive an exclusive problem statement. The stakes are massive: The team that successfully completes and submits the most innovative solution within exactly 45 days will bypass the entire gauntlet and 
                                <strong className="text-white block mt-4 text-2xl tracking-wide uppercase border-b border-gold/30 pb-2 inline-block">Directly Qualify for the Final Hackathon.</strong>
                            </p>

                            {/* Don't Just Compete. Cash Out Callout */}
                            <div className="mb-10 p-6 sm:p-8 bg-pitchblack/90 border border-gold/40 relative sharp max-w-3xl mx-auto text-center shadow-[0_0_25px_rgba(212,175,55,0.18)]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"></div>
                                <h3 className="text-2xl sm:text-3xl font-black font-heading tracking-wider uppercase text-gold bright mb-3">
                                    DON'T JUST COMPETE. CASH OUT.
                                </h3>
                                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-grotesk max-w-2xl mx-auto">
                                    No participation trophies. No waiting for the finale. Deliver production-grade solutions during the online Gauntlet, and if our corporate partners acquire your code, you get money.
                                </p>
                            </div>
                            
                            {/* Action Buttons: Register & More About Pre Hackathon */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 flex-wrap">
                                <button 
                                    type="button"
                                    onClick={() => setIsRevealingSoonOpen(true)}
                                    className="magnetic-btn sharp bg-gold bright hover:bg-white text-pitchblack font-heading font-bold py-5 px-10 transition-all duration-300 text-center tracking-widest text-sm hover:shadow-[0_0_20px_#FFFFFF] shimmer-btn animate-pulse-gold cursor-pointer inline-flex items-center justify-center"
                                >
                                    REGISTER TO RECEIVE THE PROBLEM
                                </button>
                                
                                <a 
                                    href={`${process.env.PUBLIC_URL || ''}/Pre Hackathon detail.pdf`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="sharp bg-pitchblack hover:bg-gold/15 text-gold hover:text-white border border-gold/60 hover:border-gold font-heading font-bold py-5 px-10 transition-all duration-300 text-center tracking-widest text-sm shadow-[0_0_15px_rgba(212,175,55,0.2)] hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] cursor-pointer inline-flex items-center justify-center gap-2 no-underline"
                                    title="View Pre-Hackathon Details PDF"
                                >
                                    <span>MORE ABOUT PRE HACKATHON</span>
                                    <span className="text-base leading-none">↗</span>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Pre-Hackathon Schedule & Tasks */}
                    <div className="mt-32">
                        {/* Following Social Media Points Section */}
                        <div className="mb-20">
                            <div className="text-center mb-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <span className="text-xs font-mono uppercase tracking-[0.3em] text-gold px-4 py-1.5 border border-gold/30 bg-gold/5 inline-block mb-4">
                                        COMMUNITY GAUNTLET · INSTANT XP
                                    </span>
                                    <h3 className="text-4xl md:text-5xl text-white font-black mb-4 tracking-tighter uppercase">
                                        COMPLETE TASKS <span className="text-gold bright drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">TO GAIN XP</span>
                                    </h3>
                                    <p className="text-lightgrey tracking-[0.2em] font-heading uppercase text-xs md:text-sm max-w-2xl mx-auto">
                                        COMPLETE MISSIONS, INVITE DEVELOPERS &amp; EXPAND THE SQUAD — CLIMB THE LIVE LEADERBOARD
                                    </p>
                                </motion.div>
                            </div>

                            {/* Carousel Top Navigation Bar */}
                            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono uppercase tracking-[0.2em] text-lightgrey">
                                        MISSIONS: <strong className="text-white">{currentPage === 0 ? '1 – 12' : '13 – 24'}</strong> OF <strong className="text-gold">24</strong>
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(0)}
                                        className={`px-3 sm:px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-wider border transition-all cursor-pointer sharp ${
                                            currentPage === 0
                                                ? 'bg-gold text-pitchblack border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                                : 'bg-pitchblack/60 text-lightgrey border-gold/30 hover:border-gold hover:text-white'
                                        }`}
                                    >
                                        PAGE 1 (MISSIONS 1–12)
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(1)}
                                        className={`px-3 sm:px-4 py-1.5 text-xs font-heading font-bold uppercase tracking-wider border transition-all cursor-pointer sharp flex items-center gap-1.5 ${
                                            currentPage === 1
                                                ? 'bg-gold text-pitchblack border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                                : 'bg-pitchblack/60 text-lightgrey border-gold/30 hover:border-gold hover:text-white'
                                        }`}
                                    >
                                        <span>PAGE 2 (MISSIONS 13–24)</span>
                                        <span className="text-gold font-bold">&gt;</span>
                                    </button>
                                    <div className="flex items-center gap-1.5 ml-1">
                                        <button
                                            type="button"
                                            onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                                            disabled={currentPage === 0}
                                            className="w-8 h-8 border border-gold/40 bg-pitchblack text-gold hover:bg-gold hover:text-pitchblack disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center font-black transition-all cursor-pointer sharp"
                                            title="Previous Missions"
                                        >
                                            &lt;
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setCurrentPage(p => Math.min(1, p + 1))}
                                            disabled={currentPage === 1}
                                            className="w-8 h-8 border border-gold/40 bg-pitchblack text-gold hover:bg-gold hover:text-pitchblack disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center font-black transition-all cursor-pointer sharp"
                                            title="More Missions"
                                        >
                                            &gt;
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Carousel Body with Floating Arrows */}
                            <div 
                                className="relative w-full"
                                onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
                                onTouchEnd={(e) => {
                                    if (touchStartX === null) return;
                                    const diff = touchStartX - e.changedTouches[0].clientX;
                                    if (diff > 50 && currentPage < 1) setCurrentPage(1);
                                    else if (diff < -50 && currentPage > 0) setCurrentPage(0);
                                    setTouchStartX(null);
                                }}
                            >
                                {/* Floating Right Arrow (points to Page 2 where more tasks are) */}
                                {currentPage < 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(1)}
                                        className="absolute -right-3 sm:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 bg-pitchblack/95 border-2 border-gold text-gold hover:bg-gold hover:text-pitchblack rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:shadow-[0_0_40px_rgba(212,175,55,1)] transition-all duration-300 group cursor-pointer animate-pulse-gold"
                                        aria-label="View More Tasks"
                                        title="View More Tasks (Page 2)"
                                    >
                                        <span className="text-xl sm:text-2xl font-black font-heading group-hover:translate-x-0.5 transition-transform">&gt;</span>
                                        <div className="hidden lg:flex items-center gap-1 absolute -bottom-7 right-0 text-[10px] font-mono uppercase tracking-widest text-gold whitespace-nowrap bg-pitchblack/95 px-2 py-0.5 border border-gold/40 pointer-events-none shadow-md">
                                            <span>MORE MISSIONS</span>
                                            <span>&gt;</span>
                                        </div>
                                    </button>
                                )}

                                {/* Floating Left Arrow (points back to Page 1) */}
                                {currentPage > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setCurrentPage(0)}
                                        className="absolute -left-3 sm:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-14 sm:h-14 bg-pitchblack/95 border-2 border-gold text-gold hover:bg-gold hover:text-pitchblack rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:shadow-[0_0_40px_rgba(212,175,55,1)] transition-all duration-300 group cursor-pointer"
                                        aria-label="View Previous Tasks"
                                        title="View Previous Tasks (Page 1)"
                                    >
                                        <span className="text-xl sm:text-2xl font-black font-heading group-hover:-translate-x-0.5 transition-transform">&lt;</span>
                                        <div className="hidden lg:flex items-center gap-1 absolute -bottom-7 left-0 text-[10px] font-mono uppercase tracking-widest text-gold whitespace-nowrap bg-pitchblack/95 px-2 py-0.5 border border-gold/40 pointer-events-none shadow-md">
                                            <span>&lt;</span>
                                            <span>PREV MISSIONS</span>
                                        </div>
                                    </button>
                                )}

                                {/* Sliding Viewport */}
                                <div className="overflow-hidden w-full pb-2">
                                    <div 
                                        className="flex transition-transform duration-500 ease-out w-full"
                                        style={{ transform: `translateX(-${currentPage * 100}%)` }}
                                    >
                                        {/* Page 1 (Tasks 1 to 12 in 4 columns x 3 rows) */}
                                        <div className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {socialTasks.slice(0, 12).map((task, index) => renderTaskCard(task, index))}
                                        </div>

                                        {/* Page 2 (Tasks 13 to 24 in 4 columns x 3 rows) */}
                                        <div className="w-full flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                            {socialTasks.slice(12, 24).map((task, index) => renderTaskCard(task, index + 12))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Activities Table */}
                        <div className="text-center mb-16">
                            <h3 className="text-4xl md:text-5xl text-white font-black mb-4 tracking-tighter uppercase">
                                PRE-HACKATHON <span className="text-gold">ACTIVITIES</span>
                            </h3>
                            <p className="text-lightgrey tracking-[0.2em] font-heading uppercase text-sm">EARN XP. CLIMB THE LEADERBOARD. SURVIVE THE GAUNTLET.</p>
                        </div>

                        <div className="glass-card border border-gold/20 p-2 relative sharp overflow-hidden">
                            <div className="overflow-x-auto custom-scrollbar h-[800px] relative">
                                <table className="w-full text-left border-collapse whitespace-nowrap text-sm lg:text-base">
                                    <thead className="sticky top-0 bg-pitchblack/95 z-20 shadow-md">
                                        <tr className="border-b border-gold/30 text-gold font-heading tracking-widest uppercase">
                                            <th className="p-5 font-bold">Activity Title</th>
                                            <th className="p-5 font-bold text-center">Type</th>
                                            <th className="p-5 font-bold text-center">Completion XP</th>
                                            <th className="p-5 font-bold text-center">Winning XP</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-lightgrey/10 font-grotesk text-lightgrey bg-obsidian">
                                        {activities.map((act, index) => (
                                            <tr key={index} className="hover:bg-gold/5 transition-colors duration-200">
                                                <td className="p-5 font-bold text-white truncate max-w-[200px] lg:max-w-[400px]" title={act.title}>{act.title}</td>
                                                <td className="p-5 text-center">
                                                    <span className={`px-3 py-1 text-xs tracking-wider uppercase font-bold border ${
                                                        act.type === 'Big' ? 'border-[#E63946] text-[#E63946]' :
                                                        act.type === 'Medium' ? 'border-gold text-gold' :
                                                        'border-blue-400 text-blue-400'
                                                    }`}>
                                                        {act.type}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-center text-white font-heading font-bold">{act.completion.toLocaleString()} XP</td>
                                                <td className="p-5 text-center text-gold font-heading font-bold">{act.win > 0 ? `+${act.win.toLocaleString()} XP` : '-'}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

            {/* Revealing Soon Modal Popup */}
            <AnimatePresence>
                {isRevealingSoonOpen && (
                    <div className="fixed inset-0 z-[999999] bg-pitchblack/85 backdrop-blur-md flex items-center justify-center p-4 font-grotesk">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="glass-card border border-gold/40 p-8 sm:p-10 w-full max-w-md relative sharp gold-glow bg-obsidian text-white text-center"
                        >
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-lightgrey hover:text-white text-xl cursor-pointer"
                                onClick={() => setIsRevealingSoonOpen(false)}
                            >
                                ✕
                            </button>

                            <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mx-auto mb-6 text-gold sharp shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>

                            <h3 className="text-gold font-heading font-bold text-2xl mb-3 tracking-wide uppercase">
                                REVEALING SOON
                            </h3>

                            <p className="text-lightgrey text-sm mb-6 font-grotesk leading-relaxed">
                                The exclusive Pre-Hackathon problem statement is currently locked. It will be officially revealed to all registered hackers soon!
                            </p>

                            <button
                                type="button"
                                onClick={() => setIsRevealingSoonOpen(false)}
                                className="bg-transparent border border-gold text-gold font-heading font-bold py-3 px-8 tracking-widest hover:bg-gold hover:text-pitchblack transition-colors sharp text-xs uppercase cursor-pointer shadow-[0_0_15px_rgba(212,175,55,0.2)]"
                            >
                                ACKNOWLEDGE
                            </button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Share Asset Download Modal Popup */}
            <AnimatePresence>
                {shareModalData && (
                    <div className="fixed inset-0 z-[999999] bg-pitchblack/85 backdrop-blur-md flex items-center justify-center p-4 font-grotesk">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="glass-card border border-gold/40 p-6 sm:p-8 w-full max-w-md sm:max-w-lg relative sharp gold-glow bg-obsidian text-white"
                        >
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-lightgrey hover:text-white text-xl cursor-pointer"
                                onClick={() => setShareModalData(null)}
                            >
                                ✕
                            </button>

                            <div className="text-center mb-4">
                                <span className="font-heading font-black text-xs px-3 py-1 bg-gold/15 border border-gold text-gold gold-glow tracking-widest uppercase inline-block mb-2">
                                    {shareModalData.badge}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black font-heading tracking-wide uppercase text-white">
                                    {shareModalData.title}
                                </h3>
                                <p className="text-xs text-lightgrey mt-1">
                                    Download the official promotional asset to share on your feed or story.
                                </p>
                            </div>

                            {/* Image Preview Box */}
                            <div className="p-3 bg-pitchblack/90 border border-gold/30 mb-4 relative sharp flex items-center justify-center overflow-hidden max-h-64 sm:max-h-72">
                                <img
                                    src={shareModalData.imageSrc}
                                    alt={shareModalData.title}
                                    className="max-h-56 sm:max-h-60 w-auto object-contain shadow-md"
                                />
                            </div>

                            {/* Download Button */}
                            <button
                                type="button"
                                onClick={() => {
                                    handleDownloadAsset(shareModalData.imageSrc, shareModalData.downloadName);
                                    if (!manualClickedTasks.includes(shareModalData.taskKey)) {
                                        const updated = [...manualClickedTasks, shareModalData.taskKey];
                                        setManualClickedTasks(updated);
                                        try {
                                            localStorage.setItem('manual_tasks_clicked', JSON.stringify(updated));
                                        } catch (err) {}
                                    }
                                }}
                                className="w-full magnetic-btn sharp bg-gold bright hover:bg-white text-pitchblack font-heading font-bold py-3.5 px-6 transition-all duration-300 text-center tracking-widest text-xs sm:text-sm hover:shadow-[0_0_20px_#FFFFFF] shimmer-btn animate-pulse-gold flex items-center justify-center gap-2 cursor-pointer uppercase mb-4"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                    <polyline points="7 10 12 15 17 10"></polyline>
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                </svg>
                                <span>DOWNLOAD IMAGE TO SHARE</span>
                            </button>

                            {/* Next Step Guidance */}
                            <div className="p-3 bg-gold/5 border border-gold/20 mb-4 text-[11px] text-lightgrey space-y-1 font-grotesk">
                                <div><strong className="text-gold">Step 1:</strong> Click above to download the official graphic.</div>
                                <div><strong className="text-gold">Step 2:</strong> Post it and tag <strong className="text-white">{shareModalData.tagText}</strong>.</div>
                                <div><strong className="text-gold">Step 3:</strong> Share your post link or screenshot on Discord to gain XP!</div>
                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <a
                                    href={shareModalData.platformUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-2.5 px-3 border border-lightgrey/30 hover:border-white text-lightgrey hover:text-white font-heading font-bold text-center text-xs tracking-wider uppercase transition-colors"
                                >
                                    {shareModalData.platformName} &rarr;
                                </a>
                                <a
                                    href="https://discord.gg/BxkRwU6X5"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-2.5 px-3 border border-gold/50 bg-gold/10 hover:bg-gold hover:text-pitchblack text-gold font-heading font-bold text-center text-xs tracking-wider uppercase transition-colors"
                                >
                                    DISCORD &rarr;
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>


            {/* Interactive Quiz / Mission Briefing Modal */}
            <AnimatePresence>
                {quizModalData && (
                    <div className="fixed inset-0 z-[999999] bg-pitchblack/85 backdrop-blur-md flex items-center justify-center p-4 font-grotesk">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="glass-card border border-gold/40 p-6 sm:p-8 w-full max-w-md sm:max-w-lg relative sharp gold-glow bg-obsidian text-white"
                        >
                            <button
                                type="button"
                                className="absolute top-4 right-4 text-lightgrey hover:text-white text-xl cursor-pointer"
                                onClick={() => {
                                    setQuizModalData(null);
                                    setQuizAnswer('');
                                    setQuizResult(null);
                                }}
                            >
                                ✕
                            </button>

                            <div className="text-center mb-5">
                                <span className="font-heading font-black text-xs px-3 py-1 bg-gold/15 border border-gold text-gold gold-glow tracking-widest uppercase inline-block mb-2">
                                    {quizModalData.badge || `+${quizModalData.xp} MISSION`}
                                </span>
                                <h3 className="text-xl sm:text-2xl font-black font-heading tracking-wide uppercase text-white">
                                    {quizModalData.title}
                                </h3>
                            </div>

                            <div className="p-4 bg-pitchblack/90 border border-gold/30 mb-5 text-sm text-lightgrey leading-relaxed">
                                <p className="text-white font-medium mb-1">
                                    {quizModalData.question || quizModalData.quizQuestion || quizModalData.action}
                                </p>
                                {quizModalData.hint && (
                                    <p className="text-xs text-gold/80 mt-2 font-mono">
                                        ⚡ Hint: {quizModalData.hint}
                                    </p>
                                )}
                            </div>

                            {quizModalData.isQuiz ? (
                                <form onSubmit={handleQuizSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-xs uppercase font-heading tracking-wider text-lightgrey mb-2">
                                            Your Command / Code Answer:
                                        </label>
                                        <input
                                            type="text"
                                            value={quizAnswer}
                                            onChange={(e) => setQuizAnswer(e.target.value)}
                                            placeholder="Type exact command or code here..."
                                            className="w-full bg-pitchblack border border-gold/40 focus:border-gold text-white p-3 font-mono text-sm outline-none transition-colors sharp"
                                            required
                                            autoFocus
                                        />
                                    </div>

                                    {quizResult && (
                                        <div className={`p-3 border text-xs leading-relaxed font-mono ${
                                            quizResult.success 
                                                ? 'bg-green-500/10 border-green-500 text-green-400' 
                                                : 'bg-red-500/10 border-red-500 text-red-400'
                                        }`}>
                                            {quizResult.msg}
                                        </div>
                                    )}

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className="flex-1 py-3 px-4 bg-gold text-pitchblack hover:bg-white font-heading font-bold text-xs uppercase tracking-widest transition-all cursor-pointer sharp"
                                        >
                                            SUBMIT ANSWER
                                        </button>
                                        <a
                                            href="https://discord.gg/BxkRwU6X5"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="py-3 px-4 border border-gold/40 hover:border-gold text-gold hover:text-white font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center sharp"
                                        >
                                            DISCORD →
                                        </a>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-4">
                                    <a
                                        href={quizModalData.actionLink || "https://discord.gg/BxkRwU6X5"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-3.5 px-6 bg-gold text-pitchblack hover:bg-white font-heading font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer sharp text-center"
                                    >
                                        <span>{quizModalData.actionBtnText || "GO TO DISCORD SHOWCASE"}</span>
                                        <span>→</span>
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <UpriseLoginModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLoginSuccess={(user) => {
                    setCurrentUser(user);
                    setToastMsg(`Welcome back, ${user.full_name || 'Hacker'}!`);
                    setTimeout(() => setToastMsg(null), 4000);
                }}
            />
        </div>
    );
};

export default PreHackathonPage;
