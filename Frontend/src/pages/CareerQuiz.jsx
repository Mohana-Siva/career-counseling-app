import { useState } from "react";
import { Button, Modal, ProgressBar, Card, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import "../components/styles/QuizStyles.css";

export default function CareerQuiz() {
  const navigate = useNavigate();
  
  const questions = [
    {
      question: "When solving problems, you prefer to:",
      options: [
        { text: "Analyze data and find logical solutions", stream: "Science" },
        { text: "Develop strategic plans for efficiency", stream: "Commerce" },
        { text: "Explore creative or human-centered approaches", stream: "Arts" },
        { text: "Build or fix things with practical solutions", stream: "Vocational" },
      ],
    },
    {
      question: "Your ideal work environment would be:",
      options: [
        { text: "Research lab or technical facility", stream: "Science" },
        { text: "Corporate office or business setting", stream: "Commerce" },
        { text: "Creative studio or cultural institution", stream: "Arts" },
        { text: "Workshop or hands-on field location", stream: "Vocational" },
      ],
    },
    {
      question: "Which of these achievements would make you proudest?",
      options: [
        { text: "Developing a new scientific theory", stream: "Science" },
        { text: "Launching a successful business", stream: "Commerce" },
        { text: "Creating an impactful artistic work", stream: "Arts" },
        { text: "Mastering a technical skill or craft", stream: "Vocational" },
      ],
    },
    {
      question: "How do you prefer to learn new things?",
      options: [
        { text: "Through experiments and analysis", stream: "Science" },
        { text: "Case studies and real-world applications", stream: "Commerce" },
        { text: "Discussion and creative exploration", stream: "Arts" },
        { text: "Hands-on practice and demonstration", stream: "Vocational" },
      ],
    },
    {
      question: "Which type of challenge excites you most?",
      options: [
        { text: "Solving complex technical problems", stream: "Science" },
        { text: "Optimizing systems for better results", stream: "Commerce" },
        { text: "Expressing ideas in innovative ways", stream: "Arts" },
        { text: "Creating functional, tangible results", stream: "Vocational" },
      ],
    },
    {
      question: "Your friends would describe you as:",
      options: [
        { text: "Analytical and curious", stream: "Science" },
        { text: "Organized and business-minded", stream: "Commerce" },
        { text: "Creative and expressive", stream: "Arts" },
        { text: "Practical and skilled with hands", stream: "Vocational" },
      ],
    },
    {
      question: "Which of these tasks would you enjoy most?",
      options: [
        { text: "Conducting scientific research", stream: "Science" },
        { text: "Developing a business plan", stream: "Commerce" },
        { text: "Writing a story or designing artwork", stream: "Arts" },
        { text: "Building or repairing something physical", stream: "Vocational" },
      ],
    },
    {
      question: "What's your approach to decision making?",
      options: [
        { text: "Logical analysis of facts and data", stream: "Science" },
        { text: "Considering costs, benefits and ROI", stream: "Commerce" },
        { text: "Intuitive and values-based", stream: "Arts" },
        { text: "Practical and results-oriented", stream: "Vocational" },
      ],
    },
    {
      question: "Which type of book would you choose for leisure?",
      options: [
        { text: "Popular science or technical manual", stream: "Science" },
        { text: "Business biography or finance guide", stream: "Commerce" },
        { text: "Novel or art/photography book", stream: "Arts" },
        { text: "DIY guide or technical handbook", stream: "Vocational" },
      ],
    },
    {
      question: "What kind of school projects did you enjoy most?",
      options: [
        { text: "Science fairs or math competitions", stream: "Science" },
        { text: "Business simulations or economics projects", stream: "Commerce" },
        { text: "Creative writing or art exhibitions", stream: "Arts" },
        { text: "Shop class or technical demonstrations", stream: "Vocational" },
      ],
    },
    {
      question: "How do you handle complex information?",
      options: [
        { text: "Break it down into logical components", stream: "Science" },
        { text: "Organize it into structured systems", stream: "Commerce" },
        { text: "Find patterns and make connections", stream: "Arts" },
        { text: "Focus on practical applications", stream: "Vocational" },
      ],
    },
    {
      question: "Which extracurricular activity appeals most?",
      options: [
        { text: "Science Olympiad or robotics club", stream: "Science" },
        { text: "Debate team or investment club", stream: "Commerce" },
        { text: "Drama club or literary magazine", stream: "Arts" },
        { text: "Auto shop or computer repair club", stream: "Vocational" },
      ],
    },
    {
      question: "Your favorite type of TV show/documentary?",
      options: [
        { text: "Science and technology", stream: "Science" },
        { text: "Business and finance", stream: "Commerce" },
        { text: "Arts and culture", stream: "Arts" },
        { text: "How-it's-made or DIY shows", stream: "Vocational" },
      ],
    },
    {
      question: "What motivates you most in a career?",
      options: [
        { text: "Discovery and innovation", stream: "Science" },
        { text: "Success and achievement", stream: "Commerce" },
        { text: "Expression and impact", stream: "Arts" },
        { text: "Practical results and craftsmanship", stream: "Vocational" },
      ],
    },
    {
      question: "Which professional would you most admire?",
      options: [
        { text: "Medical researcher", stream: "Science" },
        { text: "Successful entrepreneur", stream: "Commerce" },
        { text: "Award-winning artist", stream: "Arts" },
        { text: "Master craftsman", stream: "Vocational" },
      ],
    },
  ];

  const streamCareers = {
    Science: [
      "Medical Researcher",
      "Data Scientist",
      "Environmental Engineer",
      "Astrophysicist",
      "Biotechnologist",
      "Chemical Engineer",
      "AI Specialist",
      "Biomedical Engineer",
      "Quantum Physicist"
    ],
    Commerce: [
      "Financial Analyst",
      "Marketing Director",
      "Entrepreneur",
      "Management Consultant",
      "Supply Chain Manager",
      "Investment Banker",
      "Human Resources Director",
      "Economist",
      "Corporate Strategist"
    ],
    Arts: [
      "Creative Director",
      "Museum Curator",
      "Author/Journalist",
      "Film Producer",
      "Cultural Anthropologist",
      "Graphic Designer",
      "Art Therapist",
      "Music Producer",
      "Digital Media Specialist"
    ],
    Vocational: [
      "Cybersecurity Specialist",
      "Industrial Designer",
      "Master Chef",
      "Robotics Technician",
      "Renewable Energy Installer",
      "Construction Manager",
      "Aircraft Mechanic",
      "Network Architect",
      "3D Printing Technician"
    ],
  };

  const streamData = {
    Science: {
      description: "You have an analytical mind that thrives on solving complex problems. Science careers involve research, innovation, and technical expertise with strong growth potential in technology and healthcare sectors.",
      skills: ["Analytical Thinking", "Research", "Mathematics", "Problem Solving", "Technical Writing"],
      growth: "Faster than average (7-12% projected growth)",
      salary: "$70,000 - $150,000 median",
      icon: "🔬",
      color: "#3A6EA5"
    },
    Commerce: {
      description: "You're business-savvy with strong organizational skills. Commerce careers focus on strategy, management, and driving economic value across industries with opportunities for leadership roles.",
      skills: ["Leadership", "Financial Literacy", "Strategic Planning", "Negotiation", "Data Analysis"],
      growth: "Steady (5-10% projected growth)",
      salary: "$60,000 - $180,000+ median",
      icon: "💼",
      color: "#004E98"
    },
    Arts: {
      description: "You're creative and thoughtful with strong communication skills. Arts careers emphasize expression, culture, and human-centered design in evolving digital and traditional media landscapes.",
      skills: ["Creativity", "Communication", "Critical Thinking", "Visualization", "Storytelling"],
      growth: "Varies by field (3-15% projected growth)",
      salary: "$40,000 - $110,000 median",
      icon: "🎨",
      color: "#FF6700"
    },
    Vocational: {
      description: "You're practical and hands-on with technical abilities. Vocational careers involve skilled trades, technology applications, and tangible results with high demand in specialized technical fields.",
      skills: ["Technical Skills", "Problem Solving", "Manual Dexterity", "Precision", "Equipment Maintenance"],
      growth: "High demand (8-15% projected growth)",
      salary: "$50,000 - $120,000 median",
      icon: "🛠️",
      color: "#C0C0C0"
    }
  };

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState({ 
    stream: "", 
    careers: [], 
    breakdown: [],
    matchPercentage: 0
  });

  const calculateResults = (answers) => {
    const tally = answers.reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
    
    const total = answers.length;
    const breakdown = Object.entries(tally).map(([stream, count]) => ({
      stream,
      count,
      percentage: Math.round((count / total) * 100),
      ...streamData[stream]
    }));
    
    const recommended = breakdown.reduce((a, b) => 
      a.percentage > b.percentage ? a : b
    );
    
    return {
      stream: recommended.stream,
      careers: streamCareers[recommended.stream],
      breakdown,
      matchPercentage: recommended.percentage,
      ...streamData[recommended.stream]
    };
  };

  const handleAnswer = (stream) => {
    const newAnswers = [...answers, stream];
    setAnswers(newAnswers);

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      setResult(calculateResults(newAnswers));
      setShowModal(true);
    }
  };

  const prepareChartData = (breakdown) => {
    return breakdown.map(item => ({
      name: item.stream,
      value: item.percentage,
      color: item.color
    }));
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentQ(0);
    setAnswers([]);
  };

  const handleAIClick = () => {
    navigate('/ai-career-advisor');
  };

  const progress = ((currentQ + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2>Discover Your Career Path</h2>
        <p className="subtitle">Answer honestly to find your ideal career stream</p>
      </div>
      
      <ProgressBar now={progress} className="quiz-progress" />
      <p className="progress-text">Question {currentQ + 1} of {questions.length}</p>

      <Card className="quiz-card">
        <Card.Body>
          <h4 className="question-text">{questions[currentQ].question}</h4>
          <div className="quiz-options">
            {questions[currentQ].options.map((opt, idx) => (
              <Button
                key={idx}
                className="option-btn"
                onClick={() => handleAnswer(opt.stream)}
              >
                {opt.text}
              </Button>
            ))}
          </div>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose} centered size="xl" className="result-modal">
        <Modal.Header closeButton className="modal-header">
          <Modal.Title>
            <span className="result-icon">{result.icon}</span>
            <span>Your Career Path Analysis</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          <div className="result-summary">
            <div className="stream-header">
              <div className="d-flex align-items-center gap-3">
                <h3 className="stream-name mb-0">{result.stream} Stream</h3>
                <Badge bg="success" className="match-badge">
                  {result.matchPercentage}% Match
                </Badge>
              </div>
              <p className="stream-description mt-3">
                {result.description}
              </p>
            </div>

            <Row className="stats-row mt-4">
              <Col md={4}>
                <div className="stat-card">
                  <h5>Projected Growth</h5>
                  <p className="stat-value">{result.growth}</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-card">
                  <h5>Median Salary Range</h5>
                  <p className="stat-value">{result.salary}</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="stat-card">
                  <h5>Key Skills</h5>
                  <div className="skill-tags mt-2">
                    {result.skills?.map((skill, i) => (
                      <Badge key={i} bg="info" className="skill-badge me-2 mb-2">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Col>
            </Row>
          </div>

          <Row className="charts-row mt-4">
            <Col lg={6} className="mb-4 mb-lg-0">
              <div className="chart-container">
                <h4>Your Stream Distribution</h4>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={prepareChartData(result.breakdown || [])}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {prepareChartData(result.breakdown || []).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Match']}
                        labelFormatter={(label) => `${label} Stream`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="chart-container">
                <h4>Recommended Career Paths</h4>
                <div className="career-grid">
                  {result.careers?.slice(0, 6).map((career, idx) => (
                    <div key={idx} className="career-card">
                      <div className="career-icon">
                        {idx % 4 === 0 && "🧪"}
                        {idx % 4 === 1 && "📊"}
                        {idx % 4 === 2 && "🖌️"}
                        {idx % 4 === 3 && "🔧"}
                      </div>
                      <div className="career-details">
                        <h5>{career}</h5>
                        <div className="career-meta">
                          <span className="salary">$50k-$120k</span>
                          <span className="growth">↑ 8-15%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
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