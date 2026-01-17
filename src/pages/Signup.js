import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "lenis";
import "./Signup.css";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("student");
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

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data in Firestore
      await setDoc(doc(db, "communityUsers", user.uid), {
        email,
        role,
        createdAt: new Date(),
      });

      navigate("/login");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("Email already exists. Please login.");
      } else {
        setError("Error creating account. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Google signup handler
  const handleGoogleSignup = async () => {
    setError("");
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Save user data to Firestore
      await setDoc(doc(db, "communityUsers", user.uid), {
        email: user.email,
        role,
        createdAt: new Date(),
      });

      navigate("/community");
    } catch (err) {
      setError("Google Sign-Up failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Section */}
        <motion.div 
          className="signup-left"
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
            <h1>Join LevelUp</h1>
            <p>
              Become part of a growing community of innovators, entrepreneurs, and
              professionals. Let's shape the future together!
            </p>
            
            <div className="feature-list">
              <div className="feature-item">
                <span className="feature-icon">🎓</span>
                <span>Learn from industry experts</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🚀</span>
                <span>Participate in hackathons</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🌟</span>
                <span>Build your portfolio</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div 
          className="signup-right"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="signup-card">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Create Account
            </motion.h2>

            <form onSubmit={handleSignup}>
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
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>I want to join as</label>
                <div className="role-options">
                  <label className={`role-card ${role === "student" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="role"
                      value="student"
                      checked={role === "student"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="role-icon">🎓</span>
                    <span className="role-label">Student</span>
                  </label>
                  
                  <label className={`role-card ${role === "mentor" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="role"
                      value="mentor"
                      checked={role === "mentor"}
                      onChange={(e) => setRole(e.target.value)}
                    />
                    <span className="role-icon">👨‍🏫</span>
                    <span className="role-label">Mentor</span>
                  </label>
                </div>
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
                className="signup-btn"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {loading ? "Creating Account..." : "Create Account"}
              </motion.button>
            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* Google Sign-Up Button */}
            <motion.div 
              className="google-login" 
              onClick={handleGoogleSignup}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="https://developers.google.com/identity/images/g-logo.png"
                alt="Google"
              />
              <span>Continue with Google</span>
            </motion.div>

            <p className="login-text">
              Already have an account?{" "}
              <span onClick={() => navigate("/login")}>Sign In</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
