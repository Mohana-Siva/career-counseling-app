import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../components/styles/LoginPage.css';
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi';
import heroVideo from "../assets/hero-bg.mp4"; // ✅ Import video
import bg from "../assets/background.mp4";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Preload video and play when ready
    if (videoRef.current) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setVideoLoaded(true);
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
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setIsLoading(false);
        return;
      }

      // ✅ Save token & user name
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", `${data.firstName} ${data.lastName}`);

      const savedGrade = localStorage.getItem("grade");

if (savedGrade === "10th") {
  navigate("/dashboard-10th");
} else if (savedGrade === "11th12th") {
  navigate("/dashboard-11th12th");
}  } catch (err) {
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
          className="video-tag"
        >
          <source src={bg} type="video/mp4" /> {/* ✅ Use imported file */}
        </video>
        <div className="video-overlay"></div>
      </div>



      {/* Main login card */}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="glass-card p-4 p-md-5 rounded-4">
          <div className="text-center mb-4">
            <h2 className="text-white fw-bold mb-2">Welcome Back</h2>
            <p className="text-light opacity-75">Sign in to continue</p>
            {error && <div className="alert alert-danger">{error}</div>}
          </div>
          
          <form onSubmit={handleSubmit}>
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
            
            <div className="d-flex justify-content-between mb-4">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label className="form-check-label text-white" htmlFor="rememberMe">
                  Remember me
                </label>
              </div>
              <a href="#forgot" className="text-white text-decoration-none">
                Forgot password?
              </a>
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
                  Signing in...
                </div>
              ) : (
                <>
                  Sign In <FiArrowRight className="ms-2" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}