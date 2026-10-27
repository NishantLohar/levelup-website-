import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Uprise.css';

import HeroSection from './uprise_components/HeroSection';
import AboutSection from './uprise_components/AboutSection';
import PreHackathon from './uprise_components/PreHackathon';
import EventsOverview from './uprise_components/EventsOverview';
import Leaderboard from './uprise_components/Leaderboard';
import HackathonTracks from './uprise_components/HackathonTracks';
import StartupExpo from './uprise_components/StartupExpo';
import Agenda from './uprise_components/Agenda';
import Awards from './uprise_components/Awards';
import UpriseNavbar from './uprise_components/UpriseNavbar';
import UpriseLoginModal from './uprise_components/UpriseLoginModal';

const Uprise = () => {
  const [activeModal, setActiveModal] = useState(null); // 'club', 'member', 'builder', null
  const [formData, setFormData] = useState({ name: '', email: '', contact: '', organization: '', members: '', coupon: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('uprise_user') || sessionStorage.getItem('uprise_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Preloader state
  const [loading, setLoading] = useState(true);

  // Sync user status on mount if email exists
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
        .catch(err => console.log('Status sync error:', err));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('uprise_user');
    sessionStorage.removeItem('uprise_user');
    localStorage.removeItem('uprise_remember_me');
    localStorage.removeItem('uprise_remembered_email');
    setCurrentUser(null);
  };

  useEffect(() => {
    // --- Preloader Logic ---
    const progressBar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-text');
    const phrases = ["CONNECTING TO NEURAL NET...", "BYPASSING FIREWALLS...", "LOADING PROTOCOLS...", "SYSTEM READY."];
    let progress = 0;
    let phraseIndex = 0;
    
    const interval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) progress = 100;
        if (progressBar) progressBar.style.width = progress + '%';
        
        if (progress > (phraseIndex + 1) * 25 && phraseIndex < phrases.length) {
            if (loadingText) loadingText.innerText = phrases[phraseIndex];
            phraseIndex++;
        }
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                setLoading(false);
            }, 400);
        }
    }, 100);

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

    // --- Counter Animation ---
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const updateCount = () => {
            const targetStr = counter.getAttribute('data-target');
            if(!targetStr) return;
            const target = +targetStr;
            const count = +counter.innerText.replace(/,/g, '');
            const speed = 150;
            const inc = Math.max(1, Math.ceil(target / speed));

            if (count < target) {
                counter.innerText = (count + inc).toLocaleString();
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target.toLocaleString();
            }
        };
        setTimeout(updateCount, 800);
    });

    // --- Hover effect for interactive elements ---
    const addHover = () => document.body.classList.add('cursor-hover');
    const removeHover = () => document.body.classList.remove('cursor-hover');
    
    document.querySelectorAll('a, button, .cursor-pointer, .tilt-card').forEach(el => {
        el.addEventListener('mouseenter', addHover);
        el.addEventListener('mouseleave', removeHover);
    });

    // --- 3D Tilt Effect ---
    document.querySelectorAll('.tilt-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            card.style.transition = 'none';
            card.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            card.style.transition = 'all 0.5s ease';
            card.style.zIndex = '1';
        });
    });

    // --- Magnetic Buttons Physics ---
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = `translate(0px, 0px)`;
        });
    });

    // --- Matrix Scramble Text Decoder ---
    class TextScramble {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\\\/[]{}—=+*^?#_';
            this.update = this.update.bind(this);
        }
        setText(newText) {
            const oldText = this.el.innerText || '';
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise((resolve) => this.resolve = resolve);
            this.queue = [];
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        update() {
            let output = '';
            let complete = 0;
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="text-gold opacity-50">${char}</span>`;
                } else {
                    output += from;
                }
            }
            this.el.innerHTML = output;
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    }

    document.querySelectorAll('.scramble-text').forEach(el => {
        el.setAttribute('data-original', el.innerText);
        el.innerText = ''; 
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                if (entry.target.classList.contains('scramble-text') && !entry.target.scrambled) {
                    entry.target.scrambled = true;
                    const fx = new TextScramble(entry.target);
                    fx.setText(entry.target.getAttribute('data-original'));
                }
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    return () => {
      clearInterval(interval);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitStatus('Submitting...');
    
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://account.levelupevents.in';

      const response = await fetch(`${API_BASE_URL}/api/v1/uprise/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          role: activeModal || 'member',
          organization: formData.organization,
          applied_coupon: formData.coupon,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitStatus('Success! Coupon generated: ' + data.coupon_code);
        setTimeout(() => setActiveModal(null), 3000);
      } else {
        setSubmitStatus('Error: ' + data.error);
      }
    } catch (err) {
      setSubmitStatus('Network Error. Please try again.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setSubmitStatus('Logging in...');
    setTimeout(() => {
      setSubmitStatus('Success! Redirecting...');
      setTimeout(() => setActiveModal(null), 2000);
    }, 1000);
  };

  return (
    <div className="uprise-page bg-pitchblack min-h-screen relative selection:bg-gold selection:text-pitchblack overflow-x-hidden font-grotesk text-lightgrey">
      
      <AnimatePresence>
      {loading && (
        <motion.div 
          id="preloader" 
          className="fixed inset-0 z-[99999] bg-pitchblack flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
            <div className="glitch text-gold font-heading text-4xl md:text-6xl mb-10 tracking-widest font-black" data-text="UPRISE 2027">UPRISE 2027</div>
            <div className="w-64 h-1 bg-white/10 relative overflow-hidden">
                <div id="progress-bar" className="absolute top-0 left-0 h-full bg-gold w-0 shadow-[0_0_15px_#D4AF37]"></div>
            </div>
            <div id="loading-text" className="text-lightgrey font-mono text-xs tracking-[0.5em] mt-6 uppercase">INITIALIZING...</div>
        </motion.div>
      )}
      </AnimatePresence>

      <div className="noise-overlay"></div>



      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="mouse-spotlight"></div>
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-gold/10 rounded-full blur-[100px] animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-white/5 rounded-full blur-[100px] animate-blob" style={{animationDelay: '2s'}}></div>
          <div className="absolute inset-0 bg-grid-animated opacity-40"></div>
          
          <div className="scene float-drift-1" style={{top: '15%', left: '10%'}}>
              <div className="cube">
                  <div className="cube__face cube__face--front"></div>
                  <div className="cube__face cube__face--back"></div>
                  <div className="cube__face cube__face--right"></div>
                  <div className="cube__face cube__face--left"></div>
                  <div className="cube__face cube__face--top"></div>
                  <div className="cube__face cube__face--bottom"></div>
              </div>
          </div>
          
          <div className="scene float-drift-2" style={{top: '60%', right: '10%'}}>
              <div className="pyramid">
                  <div className="pyramid__face pyramid__face--front"></div>
                  <div className="pyramid__face pyramid__face--back"></div>
                  <div className="pyramid__face pyramid__face--right"></div>
                  <div className="pyramid__face pyramid__face--left"></div>
              </div>
          </div>

          <div className="scene float-drift-3" style={{top: '40%', left: '80%'}}>
              <div className="rings">
                  <div className="ring"></div>
                  <div className="ring"></div>
                  <div className="ring"></div>
                  <div className="ring"></div>
                  <div className="ring"></div>
              </div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pitchblack to-pitchblack opacity-80"></div>
      </div>


      <UpriseNavbar 
        user={currentUser} 
        onOpenLogin={() => setIsLoginModalOpen(true)} 
        onLogout={handleLogout} 
      />

      <main className="relative z-10 pt-20">
        <HeroSection onOpenModal={setActiveModal} />
        <AboutSection />
        <EventsOverview onOpenModal={setActiveModal} />
        <PreHackathon />
        <Leaderboard />
        <HackathonTracks />
        <StartupExpo onOpenModal={setActiveModal} />
        <Agenda />
        <Awards onOpenModal={setActiveModal} />

        <footer className="py-16 bg-pitchblack text-center text-lightgrey text-xs font-grotesk tracking-[0.3em] uppercase z-10 relative">
            <p className="mb-4">© 2027 UPRISE SUMMIT. ALL RIGHTS RESERVED.</p>
            <div className="flex justify-center gap-6 mt-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">TWITTER</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">LINKEDIN</a>
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">DISCORD</a>
            </div>
        </footer>
      </main>

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            className="fixed inset-0 z-[999999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-obsidian border border-gold/30 p-8 w-full max-w-md relative sharp gold-glow"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
            >
              <button className="absolute top-4 right-4 text-lightgrey hover:text-white" onClick={() => setActiveModal(null)}>✕</button>
              
              {activeModal === 'soon' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 border-2 border-gold flex items-center justify-center mx-auto mb-6 text-gold sharp">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h3 className="text-gold font-heading font-bold text-2xl mb-4">Registration Starting Soon</h3>
                  <p className="text-lightgrey text-sm mb-6 font-grotesk leading-relaxed">
                    This track is currently locked. For now, only the <span className="text-white font-bold">Hackathon Registration</span> is officially open.
                  </p>
                  <button onClick={() => setActiveModal(null)} className="bg-transparent border border-gold text-gold font-heading font-bold py-3 px-8 tracking-widest mt-4 hover:bg-gold hover:text-pitchblack transition-colors sharp">
                    ACKNOWLEDGE
                  </button>
                </div>
              ) : activeModal === 'builder' ? (
                <>
                  <h3 className="text-gold font-heading font-bold text-2xl mb-2">Builder Login</h3>
                  <p className="text-lightgrey text-sm mb-6">Builders are pre-assigned. Log in using your existing student credentials.</p>
                  <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                    <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="password" name="password" placeholder="Password" required />
                    <button type="submit" className="bg-gold text-pitchblack font-heading font-bold py-3 tracking-widest mt-4 hover:bg-white transition-colors">Login</button>
                  </form>
                </>
              ) : (
                <>
                  <h3 className="text-gold font-heading font-bold text-2xl mb-2">{activeModal === 'club' ? 'Club Registration' : 'Member Registration'}</h3>
                  <p className="text-lightgrey text-sm mb-6">Register to earn XP and climb the leaderboard.</p>
                  <form onSubmit={handleRegister} className="flex flex-col gap-4">
                    <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="text" name="name" placeholder={activeModal === 'club' ? "Club Name" : "Full Name"} value={formData.name} onChange={handleInputChange} required />
                    
                    {activeModal === 'club' && (
                      <>
                        <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="text" name="organization" placeholder="Organization/Institute" value={formData.organization} onChange={handleInputChange} required />
                        <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="number" name="members" placeholder="Total Members" value={formData.members} onChange={handleInputChange} required />
                      </>
                    )}
                    
                    <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                    <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="tel" name="contact" placeholder="Contact Number" value={formData.contact} onChange={handleInputChange} required />
                    <input className="bg-transparent border border-lightgrey/30 text-white p-3 font-grotesk focus:border-gold outline-none" type="text" name="coupon" placeholder="Referral Code (Optional)" value={formData.coupon} onChange={handleInputChange} />
                    
                    <button type="submit" className="bg-gold text-pitchblack font-heading font-bold py-3 tracking-widest mt-4 hover:bg-white transition-colors">Register</button>
                  </form>
                </>
              )}
              
              {submitStatus && <p className="text-gold mt-4 text-center font-heading text-xs tracking-wider">{submitStatus}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <UpriseLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />
    </div>
  );
};

export default Uprise;
