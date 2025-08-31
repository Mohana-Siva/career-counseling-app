import React from 'react';
import { FiExternalLink, FiCalendar, FiCheckCircle, FiList, FiArrowRight } from 'react-icons/fi';
import './styles/counseling.css';
const CounselingModal = ({ counseling, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
<div className="popup-header">
  <h2>{counseling.name}</h2>
</div>
        
        <div className="popup-body">
          <div className="popup-section">
            <div className="section-icon">
              <FiCheckCircle />
            </div>
            <div>
              <h3>Description</h3>
              <p>{counseling.longDescription || counseling.shortDescription}</p>
            </div>
          </div>

          <div className="popup-section">
            <div className="section-icon">
              <FiList />
            </div>
            <div>
              <h3>Eligibility Criteria</h3>
              <ul className="criteria-list">
                {counseling.eligibility.map((item, index) => (
                  <li key={index}>
                    <FiArrowRight className="list-icon" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="popup-section">
            <div className="section-icon">
              <FiCalendar />
            </div>
            <div>
              <h3>Important Dates</h3>
              <div className="dates-grid">
                {counseling.importantDates.map((date, index) => (
                  <div key={index} className="date-item">
                    <span className="date-label">{date.label}</span>
                    <span className="date-value">{date.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {counseling.registrationSteps && (
            <div className="popup-section">
              <div className="section-icon">
                <FiList />
              </div>
              <div>
                <h3>Registration Steps</h3>
                <ol className="steps-list">
                  {counseling.registrationSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}

          <div className="official-link-container">
            <a
              href={counseling.officialLink}
              target="_blank"
              rel="noopener noreferrer"
              className="official-link"
            >
              <FiExternalLink className="link-icon" />
              Visit Official Website
            </a>
          </div>
          <br></br>
            <button onClick={onClose} className="close-button-top">
    Close
  </button>
        </div>
      </div>
    </div>
  );
};

export default CounselingModal;