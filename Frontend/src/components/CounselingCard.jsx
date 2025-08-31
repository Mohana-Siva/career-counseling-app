import React from 'react';
import '../components/styles/counseling.css';
const CounselingCard = ({ counseling, onClick }) => {
  return (
    <div className="counseling-card" onClick={onClick}>
      <div className="card-content">
        <h3>{counseling.name}</h3>
        <p>{counseling.shortDescription}</p>
      </div>
      <div className="card-footer">
        <span className="category">{counseling.category}</span>
        <button className="details-button">View Details</button>
      </div>
    </div>
  );
};

export default CounselingCard;