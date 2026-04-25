import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/LoginPage.css';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import bg from "../assets/background.mp4";
import { API_BASE_URL } from "../config/api";

export default function SignUpPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload video and play when ready
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        video.play().catch(error => {
          console.log("Autoplay prevented:", error);
          // Fallback to muted autoplay if needed
          video.muted = true;
          video.play().catch(e => console.log("Muted autoplay also prevented"));
        });
      };
      
      video.addEventListener('canplay', handleCanPlay);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
      };
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Registration failed");
        setIsLoading(false);
        return;
      }

      // ✅ Save token and user data in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", `${firstName} ${lastName}`);

      // Redirect to dashboard
      navigate("/select-grade");
    } catch (err) {
      setError("Something went wrong. Try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      {/* Background video */}
      <div className="video-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="background-video"
        >
          <source src={bg} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="video-overlay"></div>
      </div>

      {/* Animated background particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="particle" style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 5}s`
          }} />
        ))}
      </div>

      {/* Main signup card */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="glass-card p-4 p-md-5 rounded-4">
          <div className="text-center mb-4">
            <h2 className="text-white fw-bold mb-2">Create Account</h2>
            <p className="text-light opacity-75">Join us today</p>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3 input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <FiUser className="text-white" />
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-start-0 text-white"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3 input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <FiUser className="text-white" />
              </span>
              <input
                type="text"
                className="form-control bg-transparent border-start-0 text-white"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3 input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <FiMail className="text-white" />
              </span>
              <input
                type="email"
                className="form-control bg-transparent border-start-0 text-white"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-3 input-group">
              <span className="input-group-text bg-transparent border-end-0">
                <FiLock className="text-white" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-transparent border-start-0 text-white pe-5"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button" 
                className="btn btn-link text-white position-absolute end-0 pe-3"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 5 }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary w-100 py-2 mb-3 position-relative overflow-hidden"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="d-flex justify-content-center align-items-center">
                  <div className="spinner-border spinner-border-sm me-2" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  Creating account...
                </div>
              ) : (
                <>
                  Register <FiArrowRight className="ms-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
