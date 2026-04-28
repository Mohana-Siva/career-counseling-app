import { useState } from "react";
import axios from "axios";
import { Button, Modal, ProgressBar, Card, Row, Col, Badge, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import "../components/styles/QuizStyles.css";
import { API_BASE_URL } from "../config/api";

export default function CareerQuiz11th12th() {
  const navigate = useNavigate();
  
  // Initial stream selection question
  const streamQuestion = {
    question: "Which stream are you currently studying in 11th/12th grade?",
    options: [
      { text: "Science (PCM/PCB)", stream: "Science" },
      { text: "Commerce (With/Without Math)", stream: "Commerce" },
      { text: "Arts/Humanities", stream: "Arts" },
      { text: "Vocational (ITI/Polytechnic)", stream: "Vocational" }
    ]
  };

  // Stream-specific questions
  const streamQuestions = {
    Science: [
      {
        question: "Which science subject interests you the most?",
        options: [
          { text: "Physics and Mathematics", career: "Engineering/Research" },
          { text: "Chemistry and Biology", career: "Medical/Life Sciences" },
          { text: "Computer Science", career: "IT/Tech" },
          { text: "All sciences equally", career: "Interdisciplinary" }
        ]
      },
      {
        question: "What type of scientific work appeals to you?",
        options: [
          { text: "Theoretical research", career: "Research" },
          { text: "Applied technology development", career: "Engineering" },
          { text: "Medical/Healthcare applications", career: "Medical" },
          { text: "Environmental solutions", career: "Environmental Science" }
        ]
      },
      {
        question: "Your preferred post-12th path would be:",
        options: [
          { text: "Engineering degree", career: "Engineering" },
          { text: "Medical studies", career: "Medical" },
          { text: "Pure science research", career: "Research" },
          { text: "Technical diploma", career: "Technical" }
        ]
      },
      {
        question: "Which of these careers excites you most?",
        options: [
          { text: "Space scientist", career: "Research" },
          { text: "Surgeon", career: "Medical" },
          { text: "AI developer", career: "Tech" },
          { text: "Environmental engineer", career: "Engineering" }
        ]
      }
    ],
    Commerce: [
      {
        question: "Which commerce area interests you most?",
        options: [
          { text: "Accounting and Finance", career: "Finance" },
          { text: "Business Management", career: "Management" },
          { text: "Economics", career: "Economics" },
          { text: "Entrepreneurship", career: "Entrepreneurship" }
        ]
      },
      {
        question: "Your ideal work environment would be:",
        options: [
          { text: "Corporate office", career: "Corporate" },
          { text: "Banking/financial institution", career: "Finance" },
          { text: "Startup/own business", career: "Entrepreneurship" },
          { text: "Government economic department", career: "Public Sector" }
        ]
      },
      {
        question: "Which professional role appeals to you?",
        options: [
          { text: "Chartered Accountant", career: "Accounting" },
          { text: "Investment Banker", career: "Finance" },
          { text: "Marketing Manager", career: "Marketing" },
          { text: "Business Consultant", career: "Consulting" }
        ]
      }
    ],
    Arts: [
      {
        question: "Which arts subject is your strength?",
        options: [
          { text: "History/Political Science", career: "Civil Services" },
          { text: "Psychology/Sociology", career: "Social Sciences" },
          { text: "Literature/Languages", career: "Writing/Media" },
          { text: "Fine Arts/Design", career: "Creative Arts" }
        ]
      },
      {
        question: "Your creative skills are strongest in:",
        options: [
          { text: "Writing and communication", career: "Journalism" },
          { text: "Visual arts and design", career: "Design" },
          { text: "Performing arts", career: "Performing Arts" },
          { text: "Critical analysis", career: "Research" }
        ]
      },
      {
        question: "Which career path interests you?",
        options: [
          { text: "Lawyer/Judge", career: "Law" },
          { text: "Psychologist/Therapist", career: "Psychology" },
          { text: "Journalist/Author", career: "Media" },
          { text: "Museum Curator", career: "Arts" }
        ]
      }
    ],
    Vocational: [
      {
        question: "Your vocational training focuses on:",
        options: [
          { text: "Computer/IT skills", career: "IT" },
          { text: "Electronics/Electrical", career: "Electronics" },
          { text: "Mechanical/Automobile", career: "Mechanical" },
          { text: "Hospitality/Tourism", career: "Hospitality" }
        ]
      },
      {
        question: "You enjoy working with:",
        options: [
          { text: "Computers and software", career: "IT" },
          { text: "Machines and tools", career: "Technical" },
          { text: "Hands-on creative projects", career: "Creative" },
          { text: "People and services", career: "Service" }
        ]
      },
      {
        question: "Your ideal job would involve:",
        options: [
          { text: "Technical problem-solving", career: "Technical" },
          { text: "Design and creation", career: "Design" },
          { text: "IT systems management", career: "IT" },
          { text: "Practical service delivery", career: "Service" }
        ]
      }
    ]
  };

  // Career opportunities data
  const careerData = {
    // Science careers
    "Engineering": {
      description: "You have strong analytical and problem-solving skills suited for engineering fields.",
      opportunities: [
        "Software Engineer (₹6-15 LPA starting)",
        "Mechanical Engineer (₹4-10 LPA starting)",
        "Civil Engineer (₹4-12 LPA starting)",
        "AI/ML Specialist (₹8-20 LPA starting)"
      ],
      courses: ["B.Tech", "BE", "Diploma in Engineering"],
      icon: "⚙️"
    },
    "Medical": {
      description: "Your interest in life sciences makes you well-suited for healthcare professions.",
      opportunities: [
        "Doctor/MBBS (₹10-25 LPA after specialization)",
        "Dentist (₹6-15 LPA)",
        "Biotechnologist (₹5-12 LPA)",
        "Medical Researcher (₹6-18 LPA)"
      ],
      courses: ["MBBS", "BDS", "BSc Nursing", "Biotechnology"],
      icon: "🩺"
    },
    // Commerce careers
    "Finance": {
      description: "Your numerical and analytical skills are perfect for financial careers.",
      opportunities: [
        "Chartered Accountant (₹8-25 LPA)",
        "Investment Banker (₹12-30 LPA)",
        "Financial Analyst (₹6-15 LPA)",
        "Actuary (₹10-20 LPA)"
      ],
      courses: ["B.Com", "CA", "CFA", "BBA Finance"],
      icon: "💰"
    },
    // Arts careers
    "Civil Services": {
      description: "Your understanding of society and governance suits public service roles.",
      opportunities: [
        "IAS Officer (₹8-20 LPA plus benefits)",
        "IPS Officer (₹8-20 LPA plus benefits)",
        "IFS Officer (₹8-20 LPA plus benefits)",
        "Government Policy Analyst (₹6-15 LPA)"
      ],
      courses: ["Any Graduation + UPSC", "Public Administration"],
      icon: "🏛️"
    },
    // Vocational careers
    "IT": {
      description: "Your technical skills are valuable in the growing IT sector.",
      opportunities: [
        "Network Administrator (₹4-10 LPA)",
        "IT Support Specialist (₹3-8 LPA)",
        "Cybersecurity Analyst (₹6-15 LPA)",
        "Cloud Engineer (₹8-18 LPA)"
      ],
      courses: ["Diploma in IT", "CCNA", "Cybersecurity Certifications"],
      icon: "💻"
    }
  };

  const [currentStream, setCurrentStream] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState({ 
    career: "", 
    details: null,
    matchPercentage: 0
  });

  const handleStreamSelect = (stream) => {
    setCurrentStream(stream);
    setCurrentQ(0);
    setAnswers([]);
  };

  const handleAnswer = (career) => {
    const newAnswers = [...answers, career];
    setAnswers(newAnswers);

    if (currentQ + 1 < streamQuestions[currentStream].length) {
      setCurrentQ(currentQ + 1);
    } else {
      // Calculate results
      const tally = newAnswers.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});
      
      const total = newAnswers.length;
      const recommended = Object.entries(tally).reduce((a, b) => 
        a[1] > b[1] ? a : b
      );
      
      setResult({
        career: recommended[0],
        details: careerData[recommended[0]] || careerData["Engineering"], // fallback
        matchPercentage: Math.round((recommended[1] / total) * 100)
      });
      setShowModal(true);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentStream(null);
    setCurrentQ(0);
    setAnswers([]);
  };

  const handleAIClick = async () => {
    const quizPayload = {
      quizType: "career_quiz_11th_12th",
      completedAt: new Date().toISOString(),
      summary: {
        stream: currentStream,
        recommendedCareer: result.career,
        matchPercentage: result.matchPercentage,
        opportunities: result.details?.opportunities || [],
        courses: result.details?.courses || [],
      },
      details: result.details || null,
      totalQuestions: currentStream ? streamQuestions[currentStream].length : 0,
      answers,
    };

    localStorage.setItem("latestQuizResult", JSON.stringify(quizPayload));
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          `${API_BASE_URL}/api/profile/quiz-result`,
          { quizResult: quizPayload },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      console.error("Failed to save quiz result to DB", error);
    }
    navigate("/ai-career-advisor", { state: { quizResult: quizPayload } });
  };

  const progress = currentStream 
    ? ((currentQ + 1) / (streamQuestions[currentStream].length + 1)) * 100
    : 0;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Class 11/12 Career Path Finder</h2>
        <p className="subtitle">Discover the best career options based on your stream and interests</p>
      </div>
      
      <ProgressBar now={progress} className="quiz-progress" />
      
      <Card className="quiz-card">
        <Card.Body>
          {!currentStream ? (
            <>
              <h4 className="question-text">{streamQuestion.question}</h4>
              <div className="quiz-options">
                {streamQuestion.options.map((opt, idx) => (
                  <Button
                    key={idx}
                    className="option-btn"
                    onClick={() => handleStreamSelect(opt.stream)}
                  >
                    {opt.text}
                  </Button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="stream-badge">Your Stream: <strong>{currentStream}</strong></p>
              <h4 className="question-text">{streamQuestions[currentStream][currentQ].question}</h4>
              <div className="quiz-options">
                {streamQuestions[currentStream][currentQ].options.map((opt, idx) => (
                  <Button
                    key={idx}
                    className="option-btn"
                    onClick={() => handleAnswer(opt.career)}
                  >
                    {opt.text}
                  </Button>
                ))}
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Results Modal */}
      <Modal show={showModal} onHide={handleClose} centered size="lg" className="result-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>
            <span className="result-icon">{result.details?.icon}</span>
            <span>Your Career Recommendation</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="result-summary">
            <div className="career-header">
              <h3 className="career-name">
                {result.career} 
                <Badge bg="success" className="match-badge">
                  {result.matchPercentage}% Match
                </Badge>
              </h3>
              <p className="career-description">
                {result.details?.description}
              </p>
            </div>

            <Row className="mt-4">
              <Col md={6}>
                <div className="details-card">
                  <h4>Career Opportunities</h4>
                  <ListGroup variant="flush">
                    {result.details?.opportunities.map((opp, idx) => (
                      <ListGroup.Item key={idx} className="opportunity-item">
                        {opp}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </Col>
              <Col md={6}>
                <div className="details-card">
                  <h4>Recommended Courses</h4>
                  <div className="course-tags">
                    {result.details?.courses.map((course, idx) => (
                      <Badge key={idx} bg="info" className="course-badge">
                        {course}
                      </Badge>
                    ))}
                  </div>
                  <div className="chart-container mt-3">
                    <h5>Career Match Breakdown</h5>
                    <div style={{ height: '200px' }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Match', value: result.matchPercentage, color: '#004E98' },
                              { name: 'Other', value: 100 - result.matchPercentage, color: '#EBEBEB' }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          >
                            <Cell fill="#004E98" />
                            <Cell fill="#EBEBEB" />
                          </Pie>
                          <Tooltip 
                            formatter={(value) => [`${value}%`, 'Match']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button variant="outline-primary" onClick={handleClose}>
            Take Quiz Again
          </Button>
          <Button variant="primary" onClick={handleAIClick}>
            <i className="bi bi-robot me-2"></i> Get Personalized AI Advice
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
