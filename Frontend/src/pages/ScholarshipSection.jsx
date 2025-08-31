import React, { useState, useEffect } from 'react';
import '../components/styles/Scholarship.css';


const ScholarshipSection = () => {
  const [scholarships, setScholarships] = useState([]);
  const [filteredScholarships, setFilteredScholarships] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCard, setExpandedCard] = useState(null);

  // Tamil Nadu specific scholarship data
  const scholarshipData = [
    {
      id: 1,
      title: "Pragathi Scholarship for Girl Students",
      provider: "Tamil Nadu Higher Education Department",
      amount: "Up to ₹50,000 per year",
      deadline: "2023-10-31",
      category: "girls",
      eligibility: "Girl students from Tamil Nadu, family income less than ₹8 lakh, enrolled in technical education",
      website: "https://www.tn.gov.in/scholarship",
      details: "Pragathi Scholarship aims to support girl students from Tamil Nadu pursuing technical education. This scheme provides financial assistance for tuition fees and other educational expenses.",
      benefits: "Full tuition fee waiver and additional maintenance allowance",
      applicationProcess: "Online application through Tamil Nadu Scholarship Portal with necessary documents",
      coverage: "Tuition fees, maintenance allowance"
    },
    {
      id: 2,
      title: "7.5% Reservation Scholarship",
      provider: "Tamil Nadu Government",
      amount: "Varies based on course",
      deadline: "2023-11-15",
      category: "government",
      eligibility: "Students from government schools in Tamil Nadu, cleared NEET exam",
      website: "https://www.tnhealth.tn.gov.in",
      details: "This scholarship is part of the 7.5% horizontal reservation in medical admissions for government school students. It provides financial support for medical education.",
      benefits: "Full tuition fee coverage and stipend",
      applicationProcess: "Automatic consideration through medical admission process",
      coverage: "Tuition fees, hostel fees, stipend"
    },
    {
      id: 3,
      title: "First Graduate Scholarship",
      provider: "Tamil Nadu Adi Dravidar Welfare Department",
      amount: "₹25,000 to ₹50,000 per year",
      deadline: "2023-10-25",
      category: "firstgraduate",
      eligibility: "First graduate in family, family income less than ₹2.5 lakh, Tamil Nadu natives",
      website: "https://adw.tn.gov.in",
      details: "Supports students who are the first in their family to pursue higher education. This scholarship aims to promote education among underprivileged communities.",
      benefits: "Financial assistance for complete duration of course",
      applicationProcess: "Online application with income certificate and first graduate certificate",
      coverage: "Tuition fees, exam fees, maintenance allowance"
    },
    {
      id: 4,
      title: "Post Matric Scholarship for SC/ST Students",
      provider: "Tamil Nadu Adi Dravidar & Tribal Welfare Department",
      amount: "Full tuition fees + maintenance allowance",
      deadline: "2023-11-05",
      category: "scst",
      eligibility: "SC/ST students of Tamil Nadu, family income less than ₹2.5 lakh",
      website: "https://adw.tn.gov.in",
      details: "This scholarship provides comprehensive financial support for SC/ST students pursuing higher education after 12th standard.",
      benefits: "Full tuition fee waiver, maintenance allowance, and other benefits",
      applicationProcess: "Online application through respective welfare department portal",
      coverage: "Tuition fees, maintenance allowance, book allowance"
    },
    {
      id: 5,
      title: "Naan Mudhalvan Scheme",
      provider: "Tamil Nadu Skill Development Corporation",
      amount: "Skill training + stipend",
      deadline: "Rolling admissions",
      category: "skill",
      eligibility: "12th passed students from Tamil Nadu, age between 18-25 years",
      website: "https://www.naanmudhalvan.tn.gov.in",
      details: "Naan Mudhalvan scheme provides skill training and placement assistance to students. It focuses on industry-relevant skills and employability.",
      benefits: "Free skill training, certification, placement assistance, and stipend during training",
      applicationProcess: "Registration through Naan Mudhalvan portal or designated centers",
      coverage: "Training fees, certification costs, stipend"
    },
    {
      id: 6,
      title: "Puthumai Penn Scheme",
      provider: "Tamil Nadu Higher Education Department",
      amount: "₹1,000 per month + laptop",
      deadline: "2023-11-20",
      category: "girls",
      eligibility: "Girl students from Tamil Nadu pursuing higher education, family income less than ₹2.5 lakh",
      website: "https://www.tn.gov.in/scholarship",
      details: "Puthumai Penn scheme provides financial assistance and a laptop to girl students from economically weaker sections to promote higher education among women.",
      benefits: "Monthly financial assistance and free laptop",
      applicationProcess: "Online application through Tamil Nadu Scholarship Portal",
      coverage: "Monthly stipend, laptop provision"
    },
    {
      id: 7,
      title: "Chief Minister's Fellowship Scheme",
      provider: "Tamil Nadu Planning Commission",
      amount: "₹40,000 per month",
      deadline: "2023-12-10",
      category: "merit",
      eligibility: "Young graduates from Tamil Nadu with outstanding academic record",
      website: "https://www.tn.gov.in",
      details: "This fellowship aims to attract young talent to work on policy projects with the Tamil Nadu government. It provides hands-on experience in governance.",
      benefits: "Monthly stipend and certificate of experience",
      applicationProcess: "Detailed application with project proposal and interviews",
      coverage: "Stipend during fellowship period"
    },
    {
      id: 8,
      title: "Tamil Nadu Agricultural University Scholarship",
      provider: "TNAU, Coimbatore",
      amount: "₹3,000 per month",
      deadline: "2023-10-30",
      category: "merit",
      eligibility: "Students admitted to TNAU with excellent academic record in 12th standard",
      website: "https://www.tnau.ac.in",
      details: "Merit scholarship for students pursuing agricultural sciences at Tamil Nadu Agricultural University.",
      benefits: "Monthly stipend for duration of course",
      applicationProcess: "Application through TNAU student portal after admission",
      coverage: "Monthly maintenance allowance"
    },
    {
      id: 9,
      title: "Sports Scholarship Tamil Nadu",
      provider: "Tamil Nadu Sports Development Authority",
      amount: "₹5,000 to ₹10,000 per month",
      deadline: "2023-11-30",
      category: "sports",
      eligibility: "State/national level players from Tamil Nadu pursuing higher education",
      website: "https://www.sports.tn.gov.in",
      details: "Scholarship for talented sportspersons to support their education and sports career simultaneously.",
      benefits: "Monthly financial assistance and sports kit allowance",
      applicationProcess: "Application with sports achievement certificates",
      coverage: "Monthly stipend, sports equipment allowance"
    },
    {
      id: 10,
      title: "Minority Scholarship Tamil Nadu",
      provider: "Tamil Nadu Minorities Welfare Department",
      amount: "Tuition fees + maintenance",
      deadline: "2023-11-12",
      category: "minority",
      eligibility: "Students from minority communities, family income less than ₹2 lakh",
      website: "https://www.tn.gov.in/minorities",
      details: "Financial assistance for students from minority communities to pursue higher education.",
      benefits: "Full tuition fee waiver and maintenance allowance",
      applicationProcess: "Online application through Minority Welfare portal",
      coverage: "Tuition fees, maintenance allowance"
    },
    {
      id: 11,
      title: "Fisheries Department Scholarship",
      provider: "Tamil Nadu Fisheries Department",
      amount: "₹4,000 per month",
      deadline: "2023-10-28",
      category: "fisheries",
      eligibility: "Children of traditional fishermen from Tamil Nadu coastal areas",
      website: "https://www.fisheries.tn.gov.in",
      details: "Scholarship for higher education specifically designed for children of traditional fishermen communities.",
      benefits: "Monthly stipend for duration of course",
      applicationProcess: "Application through Fisheries Department with community certificate",
      coverage: "Monthly maintenance allowance"
    },
    {
      id: 12,
      title: "Tamil Nadu Labour Welfare Scholarship",
      provider: "Tamil Nadu Labour Welfare Board",
      amount: "₹10,000 to ₹20,000 per year",
      deadline: "2023-11-08",
      category: "labour",
      eligibility: "Children of registered labourers in Tamil Nadu",
      website: "https://www.labour.tn.gov.in",
      details: "Financial assistance for higher education of children of registered labourers in Tamil Nadu.",
      benefits: "Annual financial assistance",
      applicationProcess: "Application through Labour Welfare Board with parent's registration proof",
      coverage: "Tuition fees and other educational expenses"
    }
  ];

  useEffect(() => {
    setScholarships(scholarshipData);
    setFilteredScholarships(scholarshipData);
  }, []);

  useEffect(() => {
    let result = scholarships;
    
    if (selectedCategory !== 'all') {
      result = result.filter(scholarship => scholarship.category === selectedCategory);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(scholarship => 
        scholarship.title.toLowerCase().includes(term) || 
        scholarship.provider.toLowerCase().includes(term) ||
        scholarship.eligibility.toLowerCase().includes(term) ||
        scholarship.category.toLowerCase().includes(term)
      );
    }
    
    setFilteredScholarships(result);
  }, [selectedCategory, searchTerm, scholarships]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleCardExpansion = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  return (
    <div className="scholarship-section">
      <div className="scholarship-hero">
        <div className="hero-content">
          <h1> Tamil Nadu Scholarship Programs for 12th Passed Students</h1>
        </div>
        <div className="hero-graphic">
          <div className="floating-icon">🎓</div>
          <div className="floating-icon">💰</div>
          <div className="floating-icon">📚</div>
        </div>
      </div>
      
      <div className="scholarship-filters-container">
        <div className="filter-section">
          <h3> Filter by Category</h3>
          <div className="filter-options">
            <div 
              className={`filter-option ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('all')}
            >
              <span className="option-icon"></span>
              <span>All</span>
            </div>
            <div 
              className={`filter-option ${selectedCategory === 'girls' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('girls')}
            >
              <span className="option-icon"></span>
              <span>Girls</span>
            </div>
            <div 
              className={`filter-option ${selectedCategory === 'scst' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('scst')}
            >
              <span className="option-icon"></span>
              <span>SC/ST</span>
            </div>
            <div 
              className={`filter-option ${selectedCategory === 'firstgraduate' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('firstgraduate')}
            >
              <span className="option-icon"></span>
              <span>First Graduate</span>
            </div>
            <div 
              className={`filter-option ${selectedCategory === 'merit' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('merit')}
            >
              <span className="option-icon"></span>
              <span>Merit</span>
            </div>
            <div 
              className={`filter-option ${selectedCategory === 'government' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('government')}
            >
              <span className="option-icon"></span>
              <span>Government</span>
            </div>
          </div>
        </div>
        
        <div className="search-section">
          <h3>Search Scholarships</h3>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by name, provider, or category..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="results-header">
        <h2>{filteredScholarships.length} Scholarships Available in Tamil Nadu</h2>
        <div className="result-stats">
          <span className="stat-tag">
            <span className="stat-icon"></span>
            {scholarships.filter(s => s.category === 'girls').length} For Girls
          </span>
          <span className="stat-tag">
            <span className="stat-icon"></span>
            {scholarships.filter(s => s.category === 'scst').length} For SC/ST
          </span>
          <span className="stat-tag">
            <span className="stat-icon"></span>
            {scholarships.filter(s => s.category === 'firstgraduate').length} First Graduate
          </span>
        </div>
      </div>
      
      <div className="scholarship-grid">
        {filteredScholarships.length > 0 ? (
          filteredScholarships.map(scholarship => (
            <ScholarshipCard 
              key={scholarship.id} 
              scholarship={scholarship} 
              isExpanded={expandedCard === scholarship.id}
              onToggle={() => toggleCardExpansion(scholarship.id)}
            />
          ))
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h3>No scholarships found matching your criteria</h3>
            <p>Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ScholarshipCard = ({ scholarship, isExpanded, onToggle }) => {
  const daysUntilDeadline = () => {
    const today = new Date();
    const deadline = new Date(scholarship.deadline);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  
  const deadlineClass = daysUntilDeadline() < 30 ? 'deadline-soon' : 'deadline-normal';
  
  return (
    <div className={`scholarship-card ${isExpanded ? 'expanded' : ''}`}>
      <div className="card-badge">{scholarship.category}</div>
      
      <div className="card-header">
        <h3>{scholarship.title}</h3>
        <span className={`type-indicator ${scholarship.category}`}>
          {scholarship.category === 'girls' ? 'For Girl Students' : 
           scholarship.category === 'scst' ? 'For SC/ST Students' :
           scholarship.category === 'firstgraduate' ? 'First Graduate' :
           scholarship.category === 'merit' ? 'Merit-based' :
           scholarship.category === 'government' ? 'Government Scheme' : 'Tamil Nadu Scholarship'}
        </span>
      </div>
      
      <div className="card-provider">
        <span className="provider-icon"></span>
        {scholarship.provider}
      </div>
      
      <div className="card-details">
        <div className="detail-item">
          <span className="detail-icon"></span>
          <span className="detail-value">{scholarship.amount}</span>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon"></span>
          <span className={`detail-value ${deadlineClass}`}>
            {scholarship.deadline} ({daysUntilDeadline()} days left)
          </span>
        </div>
        
        <div className="detail-item">
          <span className="detail-icon"></span>
          <span className="detail-value">{scholarship.coverage}</span>
        </div>
      </div>
      
      <div className="card-actions">
        <button className="action-btn primary" onClick={onToggle}>
          {isExpanded ? 'Less Details' : 'View Details'}
        </button>
        <a 
          href={scholarship.website} 
          target="_blank" 
          rel="noopener noreferrer"
          className="action-btn secondary"
        >
          Apply Now
        </a>
      </div>
      
      {isExpanded && (
        <div className="card-expanded">
          <div className="expanded-section">
            <h4>Eligibility Criteria</h4>
            <p>{scholarship.eligibility}</p>
          </div>
          
          <div className="expanded-section">
            <h4>Scholarship Details</h4>
            <p>{scholarship.details}</p>
          </div>
          
          <div className="expanded-section">
            <h4>Benefits</h4>
            <p>{scholarship.benefits}</p>
          </div>
          
          <div className="expanded-section">
            <h4>Application Process</h4>
            <p>{scholarship.applicationProcess}</p>
          </div>
          
          <div className="website-link-container">
            <a 
              href={scholarship.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="website-link"
            >
              <span>Visit Official Website</span>
              <span className="link-icon">↗</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScholarshipSection;
