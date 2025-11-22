import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faSearch,
    faArrowLeft,
    faDownload,
    faBookmark,
    faShareAlt,
    faClock,
    faLightbulb,
    faCertificate,
    faGlobe,
    faBookOpen,
    faChartLine, 
    faGraduationCap, 
    faCalendarDay, 
    faUserTie, // For management/governance
    faGavel, // For Law
    faLaptopCode, // For technology/CBT
    faHospitalUser, // For medical
} from '@fortawesome/free-solid-svg-icons';
import { faBookmark as farBookmark } from '@fortawesome/free-regular-svg-icons';
import "../components/styles/Entrance.css";


// Generic banner image tag for conceptual representation (will be handled by CSS if not a real file)
const BANNER_IMG = "";

const defaultExams = [
  // --- Engineering & Technology ---
  {
    id: "jee-main",
    title: "JEE Main",
    category: "engineering",
    body: "National Testing Agency (NTA)",
    nextDate: "2026-04-03", 
    registerLink: "https://jeemain.nta.ac.in/",
    logo: 'logo-jee-main', // Corrected: Using placeholder string instead of image tag
    short: "Gateway to undergraduate engineering programs (B.Tech/BE) in NITs, IIITs, and GFTIs.",
    difficulty: "Hard",
    syllabus: [
      "Mathematics (Calculus, Algebra, Coordinate Geometry)",
      "Physics (Mechanics, Electromagnetism, Optics)",
      "Chemistry (Physical, Organic, Inorganic)"
    ],
    fees: "₹650 - ₹1300",
    examMode: "Computer Based Test (CBT)",
    frequency: "Twice a year (Jan & Apr)",
    eligibility: "12th pass with PCM, minimum 75% aggregate or top 20 percentile (subject to state rules)",
    bestBooks: ["H.C. Verma (Physics)", "R.D. Sharma (Mathematics)", "M.S. Chauhan (Organic Chemistry)"],
    careers: ["B.Tech / BE in top colleges", "Dual Degree (NITs)", "Research opportunities"],
    prepTimeline: "9-12 months dedicated preparation recommended",
    tips: [
      "Focus on conceptual understanding and application.",
      "Solve past 10 years papers under timed conditions.",
      "Prioritize NCERT textbooks for foundational clarity."
    ]
  },
  {
    id: "jee-advanced",
    title: "JEE Advanced",
    category: "engineering",
    body: "Indian Institutes of Technology (IITs)",
    nextDate: "2026-05-24", 
    registerLink: "https://jeeadv.ac.in/",
    logo: 'logo-jee-advanced',
    short: "Selective exam for admission to the premier Indian Institutes of Technology (IITs).",
    difficulty: "Very Hard",
    syllabus: ["Advanced problem-solving in Physics, Chemistry, and Mathematics"],
    fees: "₹2800 approx",
    examMode: "Computer Based Test (CBT)",
    frequency: "Annual",
    eligibility: "Top 2,50,000 candidates from JEE Main only.",
    bestBooks: ["Resnick Halliday (Advanced Physics)", "Problems in General Physics - I.E. Irodov"],
    careers: ["B.Tech/BE from IITs", "Research positions", "Higher studies abroad"],
    prepTimeline: "12–18 months, focusing on advanced concepts and problem patterns",
    tips: ["Deep conceptual thinking is crucial.", "Practice multi-concept problems.", "Maintain speed and accuracy."]
  },
  // --- Medical ---
  {
    id: "neet",
    title: "NEET (UG)",
    category: "medical",
    body: "National Testing Agency (NTA)",
    nextDate: "2026-05-03", 
    registerLink: "https://neet.nta.ac.in/",
    logo: 'logo-neet',
    short: "Single-window entrance for MBBS, BDS, and AYUSH courses across India.",
    difficulty: "Hard",
    syllabus: ["Biology (Botany & Zoology - Major weight)", "Physics", "Chemistry"],
    fees: "₹800 - ₹1600",
    examMode: "Pen & Paper Based (Offline)",
    frequency: "Annual",
    eligibility: "12th pass with PCB, minimum aggregate marks as per MCI regulations (usually 50%).",
    bestBooks: ["NCERT Biology (Class XI & XII) - Foundation", "M.T.G. Fingertips (Practice)"],
    careers: ["MBBS (Doctor)", "BDS (Dentist)", "BAMS/BHMS (AYUSH)", "Paramedical streams"],
    prepTimeline: "12-15 months, NCERT mastery is mandatory",
    tips: ["Master NCERT thoroughly for Biology.", "Solve objective questions quickly and accurately.", "Regularly revise volatile chemistry topics."]
  },
  // --- Management & Postgraduate ---
  {
    id: "cat",
    title: "CAT",
    category: "management",
    body: "Indian Institutes of Management (IIMs)",
    nextDate: "2026-11-30", 
    registerLink: "https://iimcat.ac.in/",
    logo: 'logo-cat',
    short: "Gateway to premier management institutes (IIMs and non-IIM B-schools) for MBA/PGDM.",
    difficulty: "Medium to Hard",
    syllabus: ["Verbal Ability and Reading Comprehension (VARC)", "Data Interpretation and Logical Reasoning (DILR)", "Quantitative Ability (QA)"],
    fees: "₹2300 - ₹3000",
    examMode: "Computer Based Test (CBT)",
    frequency: "Annual (usually late Nov)",
    eligibility: "Bachelor's degree with minimum 50% marks (45% for reserved categories).",
    bestBooks: ["Arun Sharma Series", "Word Power Made Easy", "Official CAT Guides"],
    careers: ["MBA/PGDM (Finance, Marketing, Consulting)", "Strategy roles", "Entrepreneurship"],
    prepTimeline: "6–9 months, focusing heavily on mock tests and sectional strategy",
    tips: ["Improve reading speed and comprehension through daily reading.", "Analyze mock tests rigorously to find weak areas.", "Practice DILR clusters under timed pressure."]
  },
  {
    id: "gate",
    title: "GATE",
    category: "postgraduate",
    body: "IITs / IISc (rotating)",
    nextDate: "2026-02-15", 
    registerLink: "https://gate.iisc.ac.in/",
    logo: 'logo-gate',
    short: "Graduate Aptitude Test in Engineering. Necessary for M.Tech/Ph.D. and PSU recruitment.",
    difficulty: "Hard",
    syllabus: ["UG-level core engineering topics (branch-specific)", "Engineering Mathematics", "General Aptitude"],
    fees: "₹1500 - ₹2000",
    examMode: "Computer Based Test (CBT)",
    frequency: "Annual",
    eligibility: "B.Tech/B.E./M.Sc./AMIE in relevant disciplines.",
    bestBooks: ["Standard UG textbooks per branch", "GATE-specific previous year question books"],
    careers: ["M.Tech/MS (in India/Abroad)", "PSU Jobs (ONGC, IOCL, BHEL, etc.)", "Research Fellowships"],
    prepTimeline: "6–12 months dedicated revision of core subjects",
    tips: ["Focus on core concepts and numerical accuracy.", "Attempt full-length mock tests regularly.", "Prioritize Engineering Mathematics and General Aptitude (high scoring)."]
  },
  // --- Government & Civil Services ---
  {
    id: "upsc-cse",
    title: "UPSC CSE",
    category: "government",
    body: "Union Public Service Commission (UPSC)",
    nextDate: "2026-05-31", 
    registerLink: "https://upsc.gov.in/",
    logo: 'logo-upsc-cse',
    short: "Civil Services Examination for IAS, IPS, IFS, and other Group 'A' central services.",
    difficulty: "Very Hard",
    syllabus: ["Prelims (GS I & CSAT)", "Mains (9 papers)", "Interview"],
    fees: "₹100 (often waived for specific categories)",
    examMode: "Offline (Pen & Paper) - 3 Stages",
    frequency: "Annual",
    eligibility: "Bachelor's degree from a recognized university.",
    bestBooks: ["Laxmikanth (Polity)", "Spectrum (History)", "G.C. Leong (Geography)"],
    careers: ["IAS (Indian Administrative Service)", "IPS (Indian Police Service)", "IFS (Indian Foreign Service)"],
    prepTimeline: "12–18 months of intensive, holistic preparation",
    tips: ["Daily newspaper reading is essential for Current Affairs.", "Practice answer writing for Mains.", "Keep study materials minimal but revise multiple times."]
  },
  {
    id: "nda",
    title: "NDA & NA",
    category: "government",
    body: "Union Public Service Commission (UPSC)",
    nextDate: "2026-04-20", 
    registerLink: "https://upsc.gov.in/",
    logo: 'logo-nda',
    short: "Entrance exam for admission to the Army, Navy, and Air Force wings of the NDA.",
    difficulty: "Medium",
    syllabus: ["Mathematics (300 Marks)", "General Ability Test (GAT: English & GK - 600 Marks)"],
    fees: "₹100",
    examMode: "Offline (Pen & Paper)",
    frequency: "Twice a year",
    eligibility: "12th pass (or appearing), Age 16.5 to 19.5 years.",
    bestBooks: ["R.S. Aggarwal (Mathematics)", "General Knowledge books specific to Defense"],
    careers: ["Officer in Indian Army, Navy, or Air Force"],
    prepTimeline: "6–9 months, strong focus on 11th & 12th math and physical fitness",
    tips: ["Clear the written exam, then prepare rigorously for the 5-day Service Selection Board (SSB) Interview.", "Focus on speed in Mathematics section.", "Improve physical fitness."]
  },
  // --- Law & Humanities ---
  {
    id: "clat",
    title: "CLAT",
    category: "law",
    body: "Consortium of NLUs",
    nextDate: "2026-12-07", 
    registerLink: "https://consortiumofnlus.ac.in/",
    logo: 'logo-clat',
    short: "Common Law Admission Test for admission to 24 National Law Universities (NLUs).",
    difficulty: "Medium",
    syllabus: ["English Language", "Current Affairs (including GK)", "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques"],
    fees: "₹4000 - ₹5000",
    examMode: "Offline (Pen & Paper)",
    frequency: "Annual",
    eligibility: "12th pass (minimum marks requirements apply).",
    bestBooks: ["Universal's Guide to CLAT", "Legal Aptitude by A.P. Bhardwaj", "Daily editorials"],
    careers: ["LLB/LLM (Lawyer)", "Judicial Services", "Corporate Law"],
    prepTimeline: "6–9 months, focusing on comprehension and critical reasoning",
    tips: ["Read editorials daily to boost English and Current Affairs.", "Practice continuous reading and speed, as the paper is lengthy.", "Master the basics of Legal Reasoning."]
  },
  // --- Undergraduate Multi-stream ---
  {
    id: "cuet-ug",
    title: "CUET (UG)",
    category: "undergraduate",
    body: "National Testing Agency (NTA)",
    nextDate: "2026-05-18", 
    registerLink: "https://cuet.samarth.ac.in/",
    logo: 'logo-cuet-ug',
    short: "Common University Entrance Test for admission to all central universities and participating institutions.",
    difficulty: "Medium",
    syllabus: ["Section IA & IB (Language)", "Section II (Domain Subjects based on Class 12th syllabus)", "Section III (General Test)"],
    fees: "Varies based on number of subjects chosen",
    examMode: "Hybrid (CBT/Offline)",
    frequency: "Annual",
    eligibility: "12th pass (minimum marks vary by university).",
    bestBooks: ["NCERT textbooks (core focus)", "CUET-specific guides for General Test"],
    careers: ["B.A., B.Sc., B.Com (across various Central Universities like DU, BHU, JNU)"],
    prepTimeline: "4–6 months, focusing on 12th standard syllabus revision",
    tips: ["Selection of domain subjects should align with the desired university program.", "Practice mock tests for the General Test section.", "Focus on speed and syllabus coverage."]
  },
  // --- International ---
  {
    id: "toefl-ielts",
    title: "IELTS / TOEFL",
    category: "international",
    body: "IDP / ETS",
    nextDate: "Flexible",
    registerLink: "https://www.ielts.org/", // Using one primary link for simplicity
    logo: 'logo-international',
    short: "English proficiency tests for study, work, or migration abroad.",
    difficulty: "Medium",
    syllabus: ["Listening", "Reading", "Writing", "Speaking"],
    fees: "₹12,000 - ₹18,000 approx",
    examMode: "Computer/Offline depending on center",
    frequency: "Multiple dates available weekly",
    eligibility: "No strict eligibility, required by foreign universities/governments.",
    bestBooks: ["Official Guides, Cambridge IELTS series"],
    careers: ["Study Abroad (US, Canada, UK, Australia)", "Immigration", "Global Work visas"],
    prepTimeline: "2–4 months focused practice",
    tips: ["Practice timed speaking sessions.", "Familiarize yourself with the exam format and scoring criteria.", "Use official practice materials only."]
  },
];

const EntranceExam = () => {
  const { examId } = useParams();
  const [isDetailPage, setIsDetailPage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [exams, setExams] = useState([]);
  const [currentExam, setCurrentExam] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setExams(defaultExams);

    if (examId) {
      const found = defaultExams.find((e) => e.id === examId);
      if (found) {
        setCurrentExam(found);
        setIsDetailPage(true);
      } else {
        // fallback mock exam if id unknown
        setCurrentExam({
          ...defaultExams[0],
          id: examId,
          title: "Exam Details",
          description: "Detailed info will load here.",
          registerLink: defaultExams[0].registerLink // Ensure fallback has a link
        });
        setIsDetailPage(true);
      }
    } else {
      setIsDetailPage(false);
      setCurrentExam(null);
    }
  }, [examId]);

  const filteredExams = exams.filter((exam) => {
    const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || exam.category === filter;
    return matchesSearch && matchesFilter;
  });

  const toggleBookmark = () => setIsBookmarked((p) => !p);

  const calculateCountdown = (date) => {
    if (!date || date === "Flexible") return "Flexible Dates";
    const diff = new Date(date) - new Date();
    if (diff <= 0) return "Exam Day!";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return `${days} days left`;
  };

  const difficultyBadge = (level) => {
    switch (level.toLowerCase()) {
      case "very hard":
        return "badge-danger";
      case "hard":
        return "badge-warn";
      case "medium":
      case "medium to hard":
        return "badge-info";
      default:
        return "badge-muted";
    }
  };
  
  // New helper function to dynamically select icon based on category/logo string
  const getLogoIcon = (category) => {
      switch (category) {
          case 'engineering':
              return faLaptopCode;
          case 'medical':
              return faHospitalUser;
          case 'management':
              return faUserTie;
          case 'government':
              return faCertificate;
          case 'law':
              return faGavel;
          case 'postgraduate':
              return faGraduationCap;
          case 'undergraduate':
              return faGraduationCap;
          case 'international':
              return faGlobe;
          default:
              return faGraduationCap;
      }
  };

  if (isDetailPage && currentExam) {
    return (
      <div className="container exam-detail-page">
        <Link to="/entrance-exams" className="back-button">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to All Exams
        </Link>

        <header className="exam-header">
          <div className="exam-header-left">
            {/* Logo Handling: Use a specific icon for the logo placeholder */}
            <div className="exam-logo exam-logo-icon">
                <FontAwesomeIcon icon={getLogoIcon(currentExam.category)} />
            </div>
            <div className="exam-header-content">
              <h1>{currentExam.title}</h1>
              <p className="exam-description">{currentExam.short}</p>
              <div className="exam-meta">
                <span className={`exam-difficulty ${difficultyBadge(currentExam.difficulty)}`}>{currentExam.difficulty}</span>
                <span className="exam-badge"><FontAwesomeIcon icon={faCertificate} /> {currentExam.body}</span>
                <span className="exam-badge"><FontAwesomeIcon icon={faGlobe} /> {currentExam.examMode}</span>
              </div>
              <p className="countdown"><FontAwesomeIcon icon={faClock} /> Next Exam: {calculateCountdown(currentExam.nextDate)}</p>
            </div>
          </div>
        </header>

        <div className="exam-details-container">
            {/* The main content structure for details */}
            <div className="exam-details-main">
                <div className="key-info-table">
                    <h2>Key Information</h2>
                    <div className="info-grid">
                        <div className="info-box"><FontAwesomeIcon icon={faCertificate} /> <strong>Conducting Body</strong> <span>{currentExam.body}</span></div>
                        <div className="info-box"><FontAwesomeIcon icon={faChartLine} /> <strong>Exam Level</strong> <span>{currentExam.category.charAt(0).toUpperCase() + currentExam.category.slice(1)}</span></div>
                        <div className="info-box"><FontAwesomeIcon icon={faClock} /> <strong>Frequency</strong> <span>{currentExam.frequency}</span></div>
                        <div className="info-box"><FontAwesomeIcon icon={faGlobe} /> <strong>Mode</strong> <span>{currentExam.examMode}</span></div>
                        <div className="info-box"><FontAwesomeIcon icon={faBookOpen} /> <strong>Fees</strong> <span>{currentExam.fees}</span></div>
                        <div className="info-box"><FontAwesomeIcon icon={faGraduationCap} /> <strong>Eligibility</strong> <span>{currentExam.eligibility}</span></div>
                    </div>
                </div>

                <div className="detail-section">
                    <h2><FontAwesomeIcon icon={faBookOpen} /> Quick Syllabus Overview</h2>
                    <ul className="syllabus-list">
                    {currentExam.syllabus.map((s, idx) => <li key={idx}><FontAwesomeIcon icon={faChartLine} /> {s}</li>)}
                    </ul>
                </div>

                <div className="detail-section">
                    <h2><FontAwesomeIcon icon={faBookOpen} /> Recommended Books & Resources</h2>
                    <ul className="resource-list">
                    {currentExam.bestBooks.map((b, i) => <li key={i}>{b}</li>)}
                    </ul>
                </div>
            </div>

            <div className="exam-details-sidebar">
                <div className="sidebar-box prep-box">
                    <h3><FontAwesomeIcon icon={faLightbulb} /> Preparation & Strategy</h3>
                    <p><strong>Recommended timeline:</strong> {currentExam.prepTimeline}</p>
                    <ul className="prep-tips">
                    {currentExam.tips.map((t, i) => <li key={i}>{t}</li>)}
                    </ul>
                </div>

                <div className="sidebar-box career-box">
                    <h3><FontAwesomeIcon icon={faGraduationCap} /> Career Pathways</h3>
                    <ul className="career-list">
                    {currentExam.careers.map((c, i) => <li key={i}>{c}</li>)}
                    </ul>
                </div>
            </div>
        </div>

        <div className="action-buttons">
            {/* Real Link Used Here */}
            <a href={currentExam.registerLink} target="_blank" rel="noopener noreferrer" className="register-btn btn btn-primary">Register Now</a>
            <button className="secondary-btn btn btn-outline"><FontAwesomeIcon icon={faDownload} /> Download Syllabus</button>
            <button className="secondary-btn btn btn-outline" onClick={toggleBookmark}>
                <FontAwesomeIcon icon={isBookmarked ? faBookmark : farBookmark} /> {isBookmarked ? "Bookmarked" : "Bookmark"}
            </button>
            <button className="secondary-btn btn btn-outline"><FontAwesomeIcon icon={faShareAlt} /> Share</button>
        </div>

        <div className="related-exams">
          <h2>Similar Exams</h2>
          <div className="exam-grid small-grid">
            {exams.filter(e => e.id !== currentExam.id && e.category === currentExam.category).slice(0, 4).map(exam => (
              <div key={exam.id} className="exam-card small-card">
                <Link to={`/entrance-exams/${exam.id}`}>
                  <h3>{exam.title}</h3>
                  <p className="conducting-body">By {exam.body.split(' ')[0]}</p>
                  <span className={`exam-category ${exam.category}`}>{exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}</span>
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
        <div className="container header-inner">
          <div className="banner-left">
            <h1>Entrance Exams</h1>
            <p className="lead">Authoritative exam guides, preparation timelines, and curated resources for top Indian & international entrance examinations.</p>
          </div>
          <div className="banner-right">
            {/* BANNER_IMG tag remains here for conceptual purpose */}
            <img src={BANNER_IMG} alt="Exams banner" className="banner-img" />
          </div>
        </div>

        <div className="container search-filter">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search exams, subjects, conducting body..."
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
              <option value="law">Law</option>
              <option value="postgraduate">Postgraduate</option>
              <option value="undergraduate">Undergraduate</option>
            </select>
          </div>
        </div>
      </header>

      <main className="container">
        <div className="exam-grid">
          {filteredExams.map((exam) => (
            <div key={exam.id} className="exam-card">
              <Link to={`/entrance-exams/${exam.id}`}>
                <div className="exam-card-header">
                  {/* Using category-based icon here */}
                  <div className="exam-icon">
                    <FontAwesomeIcon icon={getLogoIcon(exam.category)} />
                  </div>
                  <div>
                    <h3 className="exam-title">{exam.title}</h3>
                    <p className="conducting-body">By {exam.body}</p>
                  </div>
                </div>
                <div className="exam-card-body">
                  <p className="short-desc">{exam.short}</p>
                  <div className="meta-row">
                    <p className="exam-date"><FontAwesomeIcon icon={faCalendarDay} /> {calculateCountdown(exam.nextDate)}</p>
                    <p className="prep"><FontAwesomeIcon icon={faClock} /> Prep: {exam.prepTimeline}</p>
                  </div>
                </div>
                <div className="exam-card-footer">
                  <span className={`exam-category ${exam.category}`}>{exam.category.charAt(0).toUpperCase() + exam.category.slice(1)}</span>
                  <div className="card-actions">
                    <button className="btn btn-primary btn-sm">View Details</button>
                  </div>
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