import "../components/styles/DashboardStyles.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


export default function Dashboard10th() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Student");
  const [isLoading, setIsLoading] = useState(true);
  const [timeOfDay, setTimeOfDay] = useState("");


  useEffect(() => {
const storedName = localStorage.getItem("userName");
if (storedName) setUserName(storedName);

    // Set time-based greeting
    const hour = new Date().getHours();
    if (hour < 12) setTimeOfDay("morning");
    else if (hour < 17) setTimeOfDay("afternoon");
    else setTimeOfDay("evening");
    
    setIsLoading(false);
  }, []);

  const cards = [
    {
      title: "Career Quiz",
      text: "Take a fun quiz to discover your strengths and suitable careers.",
      link: "/career-quiz",
      color: "#33A1E0", // Light blue from palette
      image: "/images/quiz.jpg"
    },
    {
      title: "Career Explorer",
      
      text: "Discover careers that match your interests and skills.",
      link: "/career-explorer",
      color: "#1C6EA4", // Medium blue from palette
      image: "/images/explorer.jpg"
    },
    {
      title: "NALA ",
     
      text: "Get personalized advice from our AI-powered assistant.",
      link: "/ai-career-advisor",
      color: "#154D71", // Dark blue from palette
      image: "/images/ai-advisor.jpg"
    },
    {
      title: "Counseling Registration",
     
      text: "Schedule a one-on-one session with our experts.",
      link: "/counseling-booking",
      color: "#f79a28ff", // Yellow from palette
      textColor: "#333", // Dark text for light background
      image: "/images/counseling.jpg"
    }
  ];

  return (
    <div className="dashboard-container">
      <Container>
        {isLoading ? (
          <div className="loading-animation"></div>
        ) : (
          <>
            <div className="welcome-section">
              <h1 className="welcome-message">
                Good {timeOfDay}, <span className="user-name">{userName}</span>!
              </h1>
              <h3 className="grade-badge">10th-Grade</h3>
              <p className="welcome-subtext">Ready to explore your career options today?</p>
              
            </div>
            
            <Row className="g-4 card-row">
              {cards.map((card, idx) => (
                <Col key={idx} xl={3} lg={6} md={6} sm={12}>
                  <Card 
                    className="dashboard-card"
                    style={{ 
                      '--card-accent': card.color,
                      '--text-color': card.textColor || '#fff'
                    }}
                    onClick={() => navigate(card.link)}
                  >
                    <div 
                      className="card-image"
                      style={{ backgroundImage: `url(${card.image})` }}
                    >
                      <div className="card-image-overlay"></div>
                      <div className="card-icon">{card.icon}</div>
                    </div>
                    <Card.Body className="text-center">
                      <Card.Title className="card-title">{card.title}</Card.Title>
                      <Card.Text className="card-text">{card.text}</Card.Text>
                      <Button 
                        variant="primary" 
                        className="card-button"
                        style={{ backgroundColor: card.color, border: 'none' }}
                      >
                        Explore
                      </Button>
                    </Card.Body>
                    <div className="card-accent"></div>
                    <div className="card-hover-effect"></div>
                  </Card>
                </Col>
              ))}
            </Row>
          </>
        )}
      </Container>
    </div>
  );
}