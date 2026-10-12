import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './Uprise.css'; // Reuse the same CSS for consistent animations

const PreHackathonPage = () => {
    useEffect(() => {
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

    return (
        <div className="bg-obsidian min-h-screen text-white font-grotesk overflow-x-hidden relative selection:bg-gold/30 selection:text-gold">
            {/* Glowing background spotlight */}
            <div className="fixed inset-0 pointer-events-none z-0" style={{
                background: `radial-gradient(circle 600px at var(--mouse-x) var(--mouse-y), rgba(212, 175, 55, 0.05), transparent 80%)`
            }}></div>

            {/*  Navigation (Minimal)  */}
            <nav className="fixed w-full z-50 top-0 p-6 flex justify-between items-center bg-gradient-to-b from-pitchblack to-transparent pointer-events-auto">
                <Link to="/uprise" className="text-white text-3xl font-black tracking-tighter cursor-pointer group uppercase flex items-center gap-4">
                    <div className="w-10 h-10 border-2 border-white flex items-center justify-center group-hover:border-gold transition-colors duration-300">
                        <span className="text-gold font-heading leading-none -mt-1 group-hover:text-white transition-colors duration-300">&larr;</span>
                    </div>
                </Link>
            </nav>

            {/* Main Content */}
            <section className="pt-32 pb-20 px-6 relative z-10">
                <div className="max-w-6xl mx-auto">
                    {/* Header Section */}
                    <div className="text-center mb-24">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1 }}
                        >
                            <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase leading-tight text-white">
                                DIRECT <span className="text-gold bright drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]">QUALIFICATION</span>
                            </h1>
                            <p className="text-xl md:text-3xl text-lightgrey tracking-[0.2em] font-heading mb-12">
                                SOLVE THE PROBLEM STATEMENT. SECURE YOUR SPOT.
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            className="glass-card border border-gold p-12 lg:p-16 relative overflow-hidden sharp group gold-glow bg-gold/5"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-50 pointer-events-none"></div>
                            
                            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-8 leading-snug">
                                COMPLETE THE <span className="text-gold">PROBLEM STATEMENT</span><br/> IN <span className="text-[#E63946]">15 DAYS</span>
                            </h2>
                            <p className="text-lg md:text-xl text-lightgrey leading-relaxed max-w-4xl mx-auto mb-10">
                                As part of the Pre-Hackathon, all registered teams will receive an exclusive problem statement. The stakes are massive: The team that successfully completes and submits the most innovative solution within exactly 15 days will bypass the entire gauntlet and 
                                <strong className="text-white block mt-4 text-2xl tracking-wide uppercase border-b border-gold/30 pb-2 inline-block">Directly Qualify for the Final Hackathon.</strong>
                            </p>
                            
                            <a href="https://account.levelupevents.in/events/6/" target="_blank" rel="noopener noreferrer" className="magnetic-btn sharp bg-gold bright hover:bg-white text-pitchblack font-heading font-bold py-5 px-12 transition-all duration-300 text-center tracking-widest text-sm hover:shadow-[0_0_20px_#FFFFFF] shimmer-btn animate-pulse-gold inline-block">
                                REGISTER TO RECEIVE THE PROBLEM
                            </a>
                        </motion.div>
                    </div>

                    {/* Pre-Hackathon Schedule */}
                    <div className="mt-32">
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
        </div>
    );
};

export default PreHackathonPage;
