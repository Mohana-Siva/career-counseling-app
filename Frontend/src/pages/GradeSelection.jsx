import "../components/styles/GradeSelection.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

import { FaGraduationCap } from "react-icons/fa";

const GradeSelection = () => {
  const navigate = useNavigate();
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectGrade = async (grade) => {
    setIsLoading(true);
    setSelectedGrade(grade);
    
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. Please log in again.");
        navigate("/login");
        return;
      }

      // Save grade to backend
await axios.put(
  `${API_BASE_URL}/api/auth/update-grade`,
  { grade },
  { headers: { Authorization: `Bearer ${token}` } }
);

// Save grade in localStorage too
localStorage.setItem("grade", grade);

console.log("Grade saved:", grade);

      // Small delay for better UX
      setTimeout(() => {
        // Redirect based on grade
        if (grade === "10th") {
          navigate("/dashboard-10th");
        } else {
          navigate("/dashboard-11th12th");
        }
      }, 1000);
      
    } catch (err) {
      console.error("Error saving grade:", err.response?.data || err.message);
      setIsLoading(false);
      setSelectedGrade(null);
    }
  };

  return (
    <div className="grade-selection-page">
      <Container className="grade-container">
        <div className="selection-header text-center">
          <div className="icon-container">
            
          </div>
          <h1>Select Your Grade</h1>
          <p className="subtitle">Choose your academic level to continue</p>
        </div>

      <Row className="grade-cards-row justify-content-center">
  <Col md={5} className="grade-card-col mb-4">
            <div 
              className={`grade-card grade-card-10 ${selectedGrade === "10th" ? "selected" : ""} ${isLoading && selectedGrade !== "10th" ? "faded" : ""}`}
              onClick={() => !isLoading && selectGrade("10th")}
            >
              <div className="card-inner">
                
                <h3>10th Grade</h3>
                <div className="card-placeholder"></div>
                {selectedGrade === "10th" && isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <div className="select-text">
                    {selectedGrade === "10th" ? "Selected" : "Select Grade"}
                  </div>
                )}
              </div>
            </div>
          </Col>

          <Col md={5} className="grade-card-col mb-4">
            <div 
              className={`grade-card grade-card-11 ${selectedGrade === "11th12th" ? "selected" : ""} ${isLoading && selectedGrade !== "11th12th" ? "faded" : ""}`}
              onClick={() => !isLoading && selectGrade("11th12th")}
            >
              <div className="card-inner">

                <h3>11th & 12th Grade</h3>
                <div className="card-placeholder"></div>
                {selectedGrade === "11th12th" && isLoading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  <div className="select-text">
                    {selectedGrade === "11th12th" ? "Selected" : "Select Grade"}
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>

        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-content">
              <p>Preparing your {selectedGrade === "10th" ? "10th Grade" : "11th/12th Grade"} experience...</p>
              <div className="progress-container">
                <div className="progress-bar"></div>
              </div>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

export default GradeSelection;
