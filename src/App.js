import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ParticlesBackground from './components/ParticlesBackground';
import ScrollToTop from "./components/ScrollToTop";
import MentorProfile from "./pages/MentorProfile";
import Uprise from "./pages/Uprise";
import PreHackathonPage from "./pages/PreHackathonPage";
import ClubActivities from "./pages/ClubActivities";
import NotFoundWinner from "./pages/NotFoundWinner";

const AppContent = () => {
  const location = useLocation();
  const isUprise = location.pathname === '/uprise' || location.pathname === '/pre-hackathon' || location.pathname === '/club-activities';

  return (
    <>
      <ScrollToTop />
      {!isUprise && <ParticlesBackground />}
      {!isUprise && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/community" element={<Community />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentors" element={<MentorProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/uprise" element={<Uprise />} />
        <Route path="/pre-hackathon" element={<PreHackathonPage />} />
        <Route path="/club-activities" element={<ClubActivities />} />
        <Route path="/404-winner" element={<NotFoundWinner />} />
        <Route path="/404" element={<NotFoundWinner />} />
        <Route path="/team/pratik-linkedin" element={<NotFoundWinner />} />
        <Route path="/social/twitter" element={<NotFoundWinner />} />
        <Route path="/auth/login-404" element={<NotFoundWinner />} />
        <Route path="*" element={<NotFoundWinner />} />
      </Routes>
      
      {!isUprise && <Footer />}
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
