import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import heroVideo from "../assets/hero-bg.mp4";
import "../components/styles/LandingPage.css";

export default function LandingPage() {
  const videoRef = useRef(null);

  useEffect(() => {
    // Ensure video loops smoothly
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8;
    }
  }, []);

  return (
    <div className="landing-container">
      {/* Video Background */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="video-tag"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Hero Content ,, animate-float*/}
      <div className="hero-content">
        <h1 className="app-title-head ">
          <span className="gradient-text-head">NextStep</span>
        </h1>
        <p className="app-description animate-fadein">
          Your AI-powered career compass guiding students to future success
        </p>

        {/* CTA Buttons */}
        <div className="cta-buttons animate-slideup">
          <Link to="/login" className="cta-btn login-btn">
            Login
          </Link>
          <Link to="/signup" className="cta-btn signup-btn">
            Get Started
          </Link>
        </div>
      </div>

      {/* Spacer to push footer down */}
      <div className="footer-spacer"></div>

      {/* Animated Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <div className="footer-section animate-slideleft">
            <h3>Features</h3>
            <ul>
              <li><i className="fas fa-robot"></i> AI Career Matching</li>
              <li><i className="fas fa-chart-line"></i> Skill Assessment</li>
              <li><i className="fas fa-graduation-cap"></i> College Roadmaps</li>
            </ul>
          </div>
<div className="footer-section animate-slideup">
            <h3>Contact Us</h3>
            <ul>
              <li><i className="fas fa-envelope"></i> nextstep@gmail.com</li>
            </ul>
          </div>
          <div className="footer-section animate-slideright">
            <h3>Why Choose Us?</h3>
            <ul>
              <li><i className="fas fa-certificate"></i> 92% Accuracy Rate</li>
              <li><i className="fas fa-users"></i> Know Your Skill</li>
              <li><i className="fas fa-headset"></i> 24/7 Advisor Support</li>
            </ul>
          </div>

          
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom animate-fadein">
          <div className="footer-bottom-content">
            <p>© {new Date().getFullYear()} NextStep. All rights reserved.</p>
            <div className="footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Careers</a>
            </div>
            <div className="social-icons">
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
              <a href="#"><i className="fab fa-facebook"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}