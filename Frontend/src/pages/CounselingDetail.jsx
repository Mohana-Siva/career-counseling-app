import React from 'react';
import { useParams, Link } from 'react-router-dom';
import counselingData from '../data/counselingData';
import '../components/styles/counseling.css';
const CounselingDetail = () => {
  const { id } = useParams();
  const counseling = counselingData.find(item => item.id === id);

  if (!counseling) {
    return (
      <div className="error-container">
        <h2>Counseling information not found</h2>
        <Link to="/counseling-booking" className="back-link">
          Return to Counseling Options
        </Link>
      </div>
    );
  }

  return (
    <div className="counseling-detail-container">
      <div className="header-section">
        <h1 className="counseling-title">{counseling.name}</h1>
        <p className="counseling-description">{counseling.shortDescription}</p>
      </div>

      <div className="detail-grid">
        <div className="detail-section">
          <h2 className="section-title">Eligibility Criteria</h2>
          <ul className="criteria-list">
            {counseling.eligibility.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="detail-section">
          <h2 className="section-title">Important Dates</h2>
          <div className="dates-container">
            {counseling.importantDates.map((date, index) => (
              <div key={index} className="date-item">
                <span className="date-label">{date.label}:</span>
                <span className="date-value">{date.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="detail-section full-width">
          <h2 className="section-title">Registration Procedure</h2>
          <ol className="steps-list">
            {counseling.registrationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div className="official-link-section">
          <a
            href={counseling.officialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="official-link"
          >
            Visit Official Website
            <svg
              className="external-link-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      <Link to="/counseling-booking" className="back-button">
        ← Back to Counseling Options
      </Link>
    </div>
  );
};

export default CounselingDetail;