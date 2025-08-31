import React, { useState } from 'react';
import counselingData from '../data/counselingData';
import CounselingCard from '../components/CounselingCard';
import CounselingModal from '../components/CounselingModal';
import '../components/styles/counseling.css';
const CounselingBooking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCounseling, setSelectedCounseling] = useState(null);

  const filteredCounselings = counselingData.filter(counseling =>
    counseling.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    counseling.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1 className='about-title'>Counseling Registration</h1>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search counseling options (TNEA, JEE, NEET etc.)"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="counseling-grid">
        {filteredCounselings.length > 0 ? (
          filteredCounselings.map(counseling => (
            <CounselingCard 
              key={counseling.id} 
              counseling={counseling}
              onClick={() => setSelectedCounseling(counseling)}
            />
          ))
        ) : (
          <div className="no-results">
            <p>No counseling options found matching your search.</p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="clear-button"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {selectedCounseling && (
        <CounselingModal
          counseling={selectedCounseling}
          onClose={() => setSelectedCounseling(null)}
        />
      )}
    </div>
  );
};

export default CounselingBooking;