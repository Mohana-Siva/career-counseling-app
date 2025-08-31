import { useState, useRef, useEffect } from 'react';
import { 
  FaUser, FaGraduationCap, FaBullseye, FaSave, FaCamera, 
  FaChevronDown, FaLinkedin, FaGithub, FaTwitter 
} from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';
import { BsPhone } from 'react-icons/bs';
import { MdLocationOn, MdCake } from 'react-icons/md';
import axios from "axios";
import '../components/styles/Profile.css';


export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    age: '',
    mobile: '',
    gender: '',
    address: '',
    grade: '',
    interests: '',
    skills: '',
    careerPath: '',
    careerGoal: '',
    profilePic: '',
 
  });

  const [collapsedSections, setCollapsedSections] = useState({
    personalInfo: false,
    education: false,
    careerPreferences: false,
    socialLinks: false
  });

  const contentRefs = {
    personalInfo: useRef(null),
    education: useRef(null),
    careerPreferences: useRef(null),
    socialLinks: useRef(null)
  };
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

const { data } = await axios.get("http://localhost:5000/api/users/profile", {
  headers: { Authorization: `Bearer ${token}` },
});


      setProfileData((prev) => ({ ...prev, ...data }));
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  fetchProfile();
}, []);
  const toggleSection = (section) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({ ...prev, profilePic: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setProfileData(prev => ({ ...prev, [id]: value }));

    if (id === 'dob' && value) {
      const dob = new Date(value);
      if (!isNaN(dob.getTime())) {
        const diff = Date.now() - dob.getTime();
        const ageDate = new Date(diff);
        const age = Math.abs(ageDate.getUTCFullYear() - 1970);
        setProfileData(prev => ({ ...prev, age: age.toString() }));
      }
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in again.");
      return;
    }

const { data } = await axios.put(
  "http://localhost:5000/api/users/profile",
  profileData,
  { headers: { Authorization: `Bearer ${token}` } }
);


    setProfileData((prev) => ({ ...prev, ...data }));
    alert("Profile saved successfully!");
  } catch (error) {
    console.error("Error saving profile:", error);
    alert("Error saving profile. Please try again.");
  }
};


  const getHeightStyle = (section) => {
    if (collapsedSections[section]) {
      return { height: 0, overflow: 'hidden', transition: 'height 0.4s ease' };
    } else if (contentRefs[section].current) {
      return { height: contentRefs[section].current.scrollHeight + 'px', transition: 'height 0.4s ease' };
    } else {
      return {};
    }
  };

  return (
    <>


      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="profile-pic-container">
            {profileData.profilePic ? (
              <img 
                src={profileData.profilePic} 
                alt="Profile" 
                className="profile-pic"
              />
            ) : (
              <div style={{ color: '#999', fontSize: '3rem' }}>👤</div>
            )}
            <label htmlFor="profilePic" className="profile-pic-upload">
              <FaCamera size={14} />
              <input 
                type="file" 
                id="profilePic" 
                accept="image/*" 
                onChange={handleProfilePicChange} 
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <h2 className="profile-name">
            {profileData.firstName || 'Your Name'} {profileData.lastName}
          </h2>
          <p className="profile-title">Career Guidance Platform</p>

          <div className="profile-info">
            <div className="info-item">
              <IoMdMail />
              <span>{profileData.email || 'your.email@example.com'}</span>
            </div>
            <div className="info-item">
              <BsPhone />
              <span>{profileData.mobile || '+91 1234567890'}</span>
            </div>
            <div className="info-item">
              <MdLocationOn />
              <span>{profileData.address || 'Your address'}</span>
            </div>
            <div className="info-item">
              <MdCake />
              <span>{profileData.age ? `${profileData.age} years` : 'Your age'}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="profile-header">
            <h1>Profile Settings</h1>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Personal Information */}
            <div className="profile-section">
              <div 
                className="section-header" 
                onClick={() => toggleSection('personalInfo')}
              >
                <div className="section-title">
                  <FaUser />
                  <span>Personal Information</span>
                </div>
                <FaChevronDown 
                  className={`section-chevron ${collapsedSections.personalInfo ? '' : 'rotated'}`} 
                  size={14} 
                />
              </div>
              <div
                ref={contentRefs.personalInfo}
                className="section-content"
                style={getHeightStyle('personalInfo')}
              >
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={profileData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                      type="tel"
                      id="mobile"
                      className="form-control"
                      value={profileData.mobile}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                      type="date"
                      id="dob"
                      className="form-control"
                      value={profileData.dob}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input
                      type="number"
                      id="age"
                      className="form-control"
                      value={profileData.age}
                      readOnly
                      placeholder="Auto-calculated"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      className="form-control"
                      value={profileData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      className="form-control"
                      value={profileData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="profile-section">
              <div 
                className="section-header" 
                onClick={() => toggleSection('education')}
              >
                <div className="section-title">
                  <FaGraduationCap />
                  <span>Education</span>
                </div>
                <FaChevronDown 
                  className={`section-chevron ${collapsedSections.education ? '' : 'rotated'}`} 
                  size={14} 
                />
              </div>
              <div
                ref={contentRefs.education}
                className="section-content"
                style={getHeightStyle('education')}
              >
                <div className="form-group">
                  <label htmlFor="educationLevel">Current Education Level</label>
                  <select
                    id="grade"
                    className="form-control"
                    value={profileData.grade}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Education Level</option>
                    <option value="10th Grade">10th Grade</option>
                    <option value="11th Grade">11th Grade</option>
                    <option value="12th Grade">12th Grade</option>
                    <option value="Undergraduate">Undergraduate</option>
                    <option value="Graduate">Graduate</option>
                    <option value="Postgraduate">Postgraduate</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Career Preferences Section */}
<div className="profile-section">
  <div 
    className="section-header" 
    onClick={() => toggleSection('careerPreferences')}
  >
    <div className="section-title">
      <FaBullseye />
      <span>Career Preferences</span>
    </div>
    <FaChevronDown 
      className={`section-chevron ${collapsedSections.careerPreferences ? '' : 'rotated'}`} 
      size={14} 
    />
  </div>
  <div
    ref={contentRefs.careerPreferences}
    className="section-content"
    style={getHeightStyle('careerPreferences')}
  >
    <div className="form-grid">
      <div className="form-group">
        <label htmlFor="interests">Career Interests</label>
        <input
          type="text"
          id="interests"
          className="form-control"
          value={profileData.interests}
          onChange={handleInputChange}
          placeholder="e.g. Healthcare, Finance, Creative Arts, Technology"
        />
      </div>
      <div className="form-group">
        <label htmlFor="skills">Skills</label>
        <input
          type="text"
          id="skills"
          className="form-control"
          value={profileData.skills}
          onChange={handleInputChange}
          placeholder="e.g. Communication, Data Analysis, Graphic Design"
        />
      </div>
      <div className="form-group">
        <label htmlFor="careerPath">Preferred Career Path</label>
        <input
          type="text"
          id="careerPath"
          className="form-control"
          value={profileData.careerPath}
          onChange={handleInputChange}
          placeholder="e.g. Digital Marketing, Nursing, Financial Analyst"
        />
      </div>
      <div className="form-group">
        <label htmlFor="careerGoal">Career Goal</label>
        <input
          type="text"
          id="careerGoal"
          className="form-control"
          value={profileData.careerGoal}
          onChange={handleInputChange}
          placeholder="e.g. Become a Marketing Director in 5 years"
        />
      </div>
    </div>
  </div>
</div>



            <button type="submit" className="btn btn-primary">
              <FaSave />
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}