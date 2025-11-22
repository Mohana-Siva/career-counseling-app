import { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaGraduationCap,
  FaBullseye,
  FaChevronDown,
  FaSave,
} from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { BsPhone } from "react-icons/bs";
import { MdCake } from "react-icons/md";
import axios from "axios";
import "../components/styles/Profile.css";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    // USER TABLE (Read-only on this form)
    firstName: "",
    lastName: "",
    email: "",
    grade: "",

    // PROFILE TABLE (Editable)
    mobileNumber: "",
    dob: "",
    careerInterest: "",
    skills: "",
  });

  const [age, setAge] = useState("");
  const [collapsedSections, setCollapsedSections] = useState({
    personalInfo: false,
    education: false, // Added education section for completeness in structure, even if no fields are present in the section-content currently.
    careerPreferences: false,
  });

  const refs = {
    personalInfo: useRef(null),
    education: useRef(null),
    careerPreferences: useRef(null),
  };

  // ------------------ FETCH USER + PROFILE DATA ------------------
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem("token");

        const userRes = await axios.get(
          "http://localhost:5000/api/users/me",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const profileRes = await axios.get(
          "http://localhost:5000/api/profile",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const user = userRes.data;
        const profile = profileRes.data;

        // Auto-calc age
        let calculatedAge = "";
        if (profile?.dob) {
          const d = new Date(profile.dob);
          // Fixed a potential issue with date formatting for input type="date"
          // We must ensure the date is in YYYY-MM-DD format for the input field.
          const formattedDob = profile.dob.split('T')[0]; 
          
          calculatedAge = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;

          setProfileData({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            grade: user.grade || "",

            mobileNumber: profile?.mobileNumber || "",
            dob: formattedDob || "", // Use formatted DOB for the input
            careerInterest: profile?.careerInterest || "",
            skills: profile?.skills || "",
          });
        } else {
            setProfileData({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                grade: user.grade || "",
    
                mobileNumber: profile?.mobileNumber || "",
                dob: "",
                careerInterest: profile?.careerInterest || "",
                skills: profile?.skills || "",
            });
        }
        
        setAge(calculatedAge);
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    fetchAll();
  }, []);

  // ------------------ INPUT HANDLER ------------------
  const handleInput = (e) => {
    const { id, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // recalc age
    if (id === "dob") {
      const d = new Date(value);
      if (!isNaN(d)) {
        const a = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970;
        setAge(a);
      } else {
        setAge(""); // Clear age if date is invalid/cleared
      }
    }
  };

  // ------------------ SAVE PROFILE ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/profile",
        {
          mobileNumber: profileData.mobileNumber,
          dob: profileData.dob,
          careerInterest: profileData.careerInterest,
          skills: profileData.skills,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Profile updated successfully! ✅");
    } catch (err) {
      alert("Error updating profile ❌");
      console.log(err);
    }
  };

  // ------------------ COLLAPSE SECTIONS ------------------
  const toggleSection = (key) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // UX Enhancement: Improved height calculation for smoother collapse
  const getHeightStyle = (key) => {
    const ref = refs[key]?.current;
    if (collapsedSections[key] || !ref) {
      return { height: 0, overflow: "hidden", transition: ".3s ease-out" };
    }
    // Set height to 'auto' after the transition for accessibility/flow, but during transition, use scrollHeight
    return {
      height: `${ref.scrollHeight}px`,
      overflow: 'hidden',
      transition: ".3s ease-in-out",
    };
  };

  return (
    <div className="profile-container">
      {/* ------------------ SIDEBAR ------------------ */}
      <div className="profile-sidebar">
        {/* UX Enhancement: Added basic profile picture section for better visual framing */}
        <div className="profile-pic-container">
            {/* Placeholder for a user icon or actual image */}
            <FaUser size={60} color="var(--primary)" /> 
        </div>

        <h2 className="profile-name">
          {profileData.firstName} {profileData.lastName}
        </h2>
        <p className="profile-title">Student</p>

        <div className="profile-info"> {/* Added class for grouping */}
            <div className="info-item">
              <IoMdMail /> <span>{profileData.email}</span>
            </div>

            <div className="info-item">
              <BsPhone /> <span>{profileData.mobileNumber || "Not added"}</span>
            </div>

            <div className="info-item">
              <FaGraduationCap /> <span>Grade {profileData.grade || "Not added"}</span>
            </div>

            <div className="info-item">
              <MdCake /> <span>{age ? `${age} years old` : "DOB not added"}</span>
            </div>
        </div>
      </div>

      {/* ------------------ MAIN CONTENT ------------------ */}
      <div className="profile-content">
        <h1 className="title">Profile Settings ⚙️</h1>

        <form onSubmit={handleSubmit}>
          {/* USER INFO (Read-Only fields from User table) */}
          <div className="profile-section read-only-section"> 
            <div className="section-header">
                <div className="section-title">
                    <FaUser />
                    <span>Account Details (Read-Only)</span>
                </div>
            </div>
            <div className="section-content read-only-content">
                <div className="form-grid">
                    {/* UX Enhancement: Read-only fields get form-control-static class for distinct styling */}
                    <div className="form-group">
                        <label>First Name</label>
                        <input value={profileData.firstName} className="form-control-static" disabled />
                    </div>

                    <div className="form-group">
                        <label>Last Name</label>
                        <input value={profileData.lastName} className="form-control-static" disabled />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input value={profileData.email} className="form-control-static" disabled />
                    </div>

                    <div className="form-group">
                        <label>Grade</label>
                        <input value={profileData.grade} className="form-control-static" disabled />
                    </div>
                </div>
            </div>
          </div>
          {/* END USER INFO */}

          {/* PERSONAL INFO (Editable fields from Profile table) */}
          <div className="profile-section">
            <div className="section-header" onClick={() => toggleSection("personalInfo")}>
              <div className="section-title">
                <FaUser />
                <span>Personal Information (Editable)</span>
              </div>
              <FaChevronDown className={collapsedSections.personalInfo ? "" : "rotated"} />
            </div>

            <div
              ref={refs.personalInfo}
              className="section-content collapsible-content"
              style={getHeightStyle("personalInfo")}
            >
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="mobileNumber">Mobile Number</label> {/* Accessibility: Added htmlFor */}
                  <input
                    id="mobileNumber"
                    className="form-control" // UX Enhancement: Added class for styling
                    value={profileData.mobileNumber}
                    onChange={handleInput}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    id="dob"
                    className="form-control" // UX Enhancement: Added class for styling
                    type="date"
                    value={profileData.dob}
                    onChange={handleInput}
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input value={age ? `${age} years` : "N/A"} className="form-control-static" disabled />
                </div>
              </div>
            </div>
          </div>
          {/* END PERSONAL INFO */}

          {/* CAREER PREFERENCES */}
          <div className="profile-section">
            <div className="section-header" onClick={() => toggleSection("careerPreferences")}>
              <div className="section-title">
                <FaBullseye />
                <span>Career Preferences</span>
              </div>
              <FaChevronDown className={collapsedSections.careerPreferences ? "" : "rotated"} />
            </div>

            <div
              ref={refs.careerPreferences}
              className="section-content collapsible-content"
              style={getHeightStyle("careerPreferences")}
            >
              <div className="form-group">
                <label htmlFor="careerInterest">Career Interest</label>
                <input
                  id="careerInterest"
                  className="form-control" // UX Enhancement: Added class for styling
                  value={profileData.careerInterest}
                  onChange={handleInput}
                />
              </div>

              <div className="form-group">
                <label htmlFor="skills">Skills</label>
                <textarea // UX Enhancement: Switched to textarea for Skills for more space
                  id="skills"
                  className="form-control"
                  rows="3"
                  value={profileData.skills}
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>
          {/* END CAREER PREFERENCES */}
          
          <div className="save-button-container">
            <button type="submit" className="btn btn-primary">
              <FaSave /> Save Profile Updates
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

