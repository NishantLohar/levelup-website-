import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import "./Login.css";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/community");
    } catch (err) {
      setError("Invalid credentials or user not found");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/community");
    } catch (err) {
      setError("Google Sign-In failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section */}
        <motion.div 
          className="login-left"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="welcome-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1>Welcome Back!</h1>
            <p>
              Join our growing community of innovators, entrepreneurs, and
              professionals. Let's build something amazing together.
            </p>
            
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>Access exclusive events</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🤝</span>
                <span>Connect with mentors</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💡</span>
                <span>Collaborate on projects</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div 
          className="login-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="login-card">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Sign In
            </motion.h2>

            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && (
                <motion.p 
                  className="error"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  ⚠️ {error}
                </motion.p>
              )}

              <motion.button 
                type="submit" 
                className="login-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Signing In..." : "Sign In"}
              </motion.button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* Google Login Button */}
            <motion.div 
              className="google-login" 
              onClick={handleGoogleLogin}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
              />
              <span>Continue with Google</span>
            </motion.div>

            <p className="signup-text">
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")}>Sign Up</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
