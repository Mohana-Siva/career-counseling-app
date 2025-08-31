import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, faArrowLeft, faDownload, 
  faBookmark, faShareAlt, faClock, faLightbulb 
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import "../components/styles/Entrance.css";

const EntranceExam = () => {
  const { examId } = useParams();
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Mock data - replace with API
  useEffect(() => {
    if (examId) {
      setIsDetailPage(true);
      const mockExam = {
        id: examId,
        title: "JEE Advanced",
        category: "engineering",
        description: "Joint Entrance Examination for IITs (Top Engineering Colleges in India).",
        logo: "https://example.com/jee-logo.png",
        eligibility: "<p>Minimum 75% in 12th or be in top 20 percentile.</p>",
        examPattern: "<p>Two papers of 3 hours each.</p>",
        importantDates: "<p>Registration: Oct–Nov, Exam: May</p>",
        registration: "<p>Online through official website.</p>",
        preparation: "<p>NCERT books, mock tests, previous year papers.</p>",
        conductingBody: "IITs",
        examLevel: "National",
        examMode: "Computer Based",
        examFrequency: "Annual",
        nextExamDate: "2025-05-20"
      };
      setCurrentExam(mockExam);
    } else {
      setIsDetailPage(false);
      const mockExams = [
        { id: '1', title: 'JEE Main', category: 'engineering', body: 'NTA', nextDate: '2025-04-05' },
        { id: '2', title: 'NEET', category: 'medical', body: 'NTA', nextDate: '2025-05-07' },
        { id: '3', title: 'CAT', category: 'management', body: 'IIMs', nextDate: '2025-11-26' },
        { id: '4', title: 'GRE', category: 'international', body: 'ETS', nextDate: 'Flexible' },
        { id: '5', title: 'UPSC', category: 'government', body: 'UPSC', nextDate: '2025-06-02' }
      ];
      setExams(mockExams);
    }
  }, [examId]);

  const filteredExams = exams.filter(exam => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || exam.category === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleBookmark = () => setIsBookmarked(!isBookmarked);

  // Countdown logic
  const calculateCountdown = (date) => {
    if (!date || date === "Flexible") return "Flexible Dates";
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "Exam Day!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  if (isDetailPage && currentExam) {
    return (
      <div className="container">
        <Link to="/entrance-exams" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Exams
        </Link>
        
        <header className="exam-header">
          <img src={currentExam.logo} alt={currentExam.title} className="exam-logo" />
          <div>
            <h1>{currentExam.title}</h1>
            <p className="exam-description">{currentExam.description}</p>
            <p className="countdown">
              <FontAwesomeIcon icon={faClock} /> {calculateCountdown(currentExam.nextExamDate)}
            </p>
          </div>
        </header>

        <div className="exam-details-container">
          <div className="key-info-table">
            <h2>Key Information</h2>
            <table>
              <tbody>
                <tr><th>Conducting Body</th><td>{currentExam.conductingBody}</td></tr>
                <tr><th>Exam Level</th><td>{currentExam.examLevel}</td></tr>
                <tr><th>Exam Frequency</th><td>{currentExam.examFrequency}</td></tr>
                <tr><th>Exam Mode</th><td>{currentExam.examMode}</td></tr>
              </tbody>
            </table>
          </div>

          <div className="detail-section">
            <h2>Eligibility Criteria</h2>
            <div dangerouslySetInnerHTML={{ __html: currentExam.eligibility }} />
          </div>

          <div className="detail-section">
            <h2>Exam Pattern</h2>
            <div dangerouslySetInnerHTML={{ __html: currentExam.examPattern }} />
          </div>

          <div className="detail-section">
            <h2>Important Dates</h2>
            <div dangerouslySetInnerHTML={{ __html: currentExam.importantDates }} />
          </div>

          <div className="detail-section">
            <h2>Registration Process</h2>
            <div dangerouslySetInnerHTML={{ __html: currentExam.registration }} />
          </div>

          <div className="detail-section">
            <h2>Preparation Resources</h2>
            <div dangerouslySetInnerHTML={{ __html: currentExam.preparation }} />
          </div>

          <div className="detail-section tips-section">
            <h2><FontAwesomeIcon icon={faLightbulb} /> Expert Tips</h2>
            <ul>
              <li>Focus on NCERT fundamentals before advanced books.</li>
              <li>Practice mock tests weekly.</li>
              <li>Revise formula sheets daily.</li>
              <li>Take care of health before exam day.</li>
            </ul>
          </div>
        </div>

        <div className="action-buttons">
          <a href="#" className="register-btn">Register Now</a>
          <button className="secondary-btn">
            <FontAwesomeIcon icon={faDownload} /> Download Syllabus
          </button>
          <button className="secondary-btn" onClick={toggleBookmark}>
            <FontAwesomeIcon icon={isBookmarked ? faBookmark : farBookmark} /> Bookmark
          </button>
          <button className="secondary-btn">
            <FontAwesomeIcon icon={faShareAlt} /> Share
          </button>
        </div>

        <div className="related-exams">
          <h2>Related Exams</h2>
          <div className="exam-grid">
            {exams.slice(0,3).map(exam => (
              <div key={exam.id} className="exam-card small">
                <Link to={`/entrance-exams/${exam.id}`}>
                  <h3>{exam.title}</h3>
                  <span className={`exam-category ${exam.category}`}>
                    {exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}
                  </span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <header>
        <div className="container">
          <h1>Entrance Exams</h1>
          <div className="search-filter">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Search exams..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon icon={faSearch} />
            </div>
            <div className="filter-dropdown">
              <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                <option value="all">All Exams</option>
                <option value="engineering">Engineering</option>
                <option value="medical">Medical</option>
                <option value="management">Management</option>
                <option value="international">International</option>
                <option value="government">Government Jobs</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="exam-grid">
          {filteredExams.map(exam => (
            <div key={exam.id} className="exam-card">
              <Link to={`/entrance-exams/${exam.id}`}>
                <div className="exam-card-content">
                  <h3>{exam.title}</h3>
                  <p className="conducting-body">By {exam.body}</p>
                  <p className="exam-date">
                    <FontAwesomeIcon icon={faClock} /> {calculateCountdown(exam.nextDate)}
                  </p>
                  <span className={`exam-category ${exam.category}`}>
                    {exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default EntranceExam;
