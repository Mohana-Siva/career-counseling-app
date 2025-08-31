import { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, ListGroup, Form, Tab, Tabs, Accordion, Badge, ProgressBar, Alert, Toast } from "react-bootstrap";

const CourseDetailsModal = ({ course, show, onHide, color }) => {
  // Enhanced descriptions for different degree levels
  const getDetailedDescription = (course) => {
    if (course.name.includes("PhD") || course.name.includes("Doctor")) {
      return `The ${course.name} is the highest academic degree awarded in this field, typically taking 4-6 years to complete.
      This research-intensive program requires original contributions to knowledge through dissertation work.
      Candidates develop expertise in specialized areas while mastering research methodologies.
      Graduates pursue careers in academia, advanced research, or leadership positions in industry.
      The program includes comprehensive exams, dissertation proposal, and defense.
      Funding often comes through research assistantships or fellowships.
      Admission requires a master's degree or exceptional bachelor's performance.
      The degree is internationally recognized and opens doors to prestigious positions.
      Many programs offer teaching opportunities to develop pedagogical skills.
      Networking with faculty and peers is a key component of doctoral education.`;
    } else if (course.name.includes("Master") || course.name.includes("M.")) {
      return `The ${course.name} is a graduate-level program typically completed in 1-2 years.
      It offers advanced study in the field, combining coursework with research or practical applications.
      Students can choose between thesis and non-thesis options in many programs.
      The curriculum builds on undergraduate foundations while introducing specialized topics.
      Graduates qualify for higher-level positions or continued doctoral study.
      Many programs offer internship opportunities with industry partners.
      Evening and online options are often available for working professionals.
      The degree enhances earning potential and career advancement opportunities.
      Some programs offer dual degrees or certificate specializations.
      Alumni networks provide valuable professional connections.`;
    } else if (course.name.includes("Bachelor") || course.name.includes("B.")) {
      return `The ${course.name} is an undergraduate degree typically completed in 3-4 years.
      It provides foundational knowledge and skills for entry-level positions in the field.
      The curriculum combines general education with major-specific coursework.
      Students gain both theoretical understanding and practical applications.
      Many programs include internship or co-op opportunities for real-world experience.
      The degree serves as a gateway to professional careers or graduate study.
      Specializations or minors allow customization of the academic path.
      Campus resources support student success and career preparation.
      Study abroad options may be available for global perspectives.
      Graduates join a strong alumni network in diverse industries.`;
    } else if (course.name.includes("Diploma") || course.name.includes("Certification")) {
      return `The ${course.name} is a focused program providing practical skills and knowledge.
      Typically completed in 6 months to 2 years, these programs emphasize hands-on training.
      Ideal for career changers or professionals seeking specific skill enhancement.
      Curriculum is often designed with industry input to ensure relevance.
      Many programs offer flexible scheduling for working students.
      Some certifications require periodic renewal through continuing education.
      Programs may include portfolio development or capstone projects.
      Credits may be transferable to degree programs in some institutions.
      Career services often help with job placement after completion.
      Affordable option for targeted professional development.`;
    } else {
      return `The ${course.name} provides comprehensive education in this field.
      Students develop both theoretical knowledge and practical skills.
      The program prepares graduates for diverse career opportunities.
      Curriculum balances foundational concepts with contemporary applications.
      Faculty include both academic scholars and industry professionals.
      Learning experiences may include labs, fieldwork, or clinical rotations.
      Student organizations provide networking and leadership opportunities.
      Career services assist with internships and job placement.
      The program maintains strong industry connections for relevance.
      Graduates join a global community of professionals in the field.`;
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
      <Modal.Header closeButton style={{ backgroundColor: color, color: "white" }}>
        <Modal.Title>{course.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>
          {getDetailedDescription(course)}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default function CareerExplorer() {
  const [selectedCareer, setSelectedCareer] = useState(null);
  const [selectedSubdivision, setSelectedSubdivision] = useState(null);
  const [selectedField, setSelectedField] = useState("");
  const [activeTab, setActiveTab] = useState("courses");
  const [expandedAccordion, setExpandedAccordion] = useState("0");
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const careerCards = [
     {
    title: "Science",
    icon: "🧪",
    color: "#004E98",
    overview: "Careers in research, technology, and healthcare.",
    subdivisions: [
      {
        title: "Biology (PCB)",
        icon: "🧬",
        color: "#6A5ACD",
        details: {
          fields: ["Medicine", "Pharmacy", "Biotech", "Research", "Veterinary", "Dental", "Nursing", "Public Health"],
          skills: ["Biology", "Chemistry", "Analytical skills", "Observation", "Patience"],
          avgSalary: "₹6–20 LPA (varies by specialization)",
          courses: {
            Medicine: [
              { name: "MBBS (Bachelor of Medicine)", description: "5.5 year professional degree to become a doctor." },
              { name: "MD (Doctor of Medicine)", description: "3-year postgraduate specialization in various medical fields." },
              { name: "MS (Master of Surgery)", description: "3-year postgraduate surgical specialization." },
              { name: "DM (Doctorate of Medicine)", description: "3-year super-specialty in fields like Cardiology." },
              { name: "MCh (Master of Chirurgiae)", description: "3-year super-specialty surgical degree." },
              { name: "PhD in Medical Sciences", description: "Research doctorate in medical fields." }
            ],
            Pharmacy: [
              { name: "B.Pharm (Bachelor of Pharmacy)", description: "4-year undergraduate pharmacy degree." },
              { name: "D.Pharm (Diploma in Pharmacy)", description: "2-year diploma for pharmacy assistants." },
              { name: "Pharm.D (Doctor of Pharmacy)", description: "6-year advanced pharmacy practice degree." },
              { name: "M.Pharm (Master of Pharmacy)", description: "2-year postgraduate specialization." },
              { name: "PhD in Pharmaceutical Sciences", description: "Research doctorate in drug development." }
            ],
            Biotech: [
              { name: "B.Sc Biotechnology", description: "3-year undergraduate science degree." },
              { name: "B.Tech Biotechnology", description: "4-year engineering degree in biotech." },
              { name: "M.Sc Biotechnology", description: "2-year postgraduate degree." },
              { name: "M.Tech Biotechnology", description: "2-year postgraduate engineering degree." },
              { name: "PhD in Biotechnology", description: "Research doctorate in biotech." }
            ],
            Research: [
              { name: "B.Sc Research", description: "3-year undergraduate research-focused degree." },
              { name: "M.Sc Research", description: "2-year postgraduate research degree." },
              { name: "PhD", description: "3-5 year doctoral research program." },
              { name: "Postdoctoral Fellowship", description: "Advanced research position after PhD." }
            ],
            Veterinary: [
              { name: "BVSc & AH (Bachelor's)", description: "5-year veterinary science degree." },
              { name: "MVSc (Master's)", description: "2-year postgraduate veterinary degree." },
              { name: "PhD in Veterinary Science", description: "Doctoral research in animal health." }
            ],
            Dental: [
              { name: "BDS (Bachelor's)", description: "5-year dental surgery degree." },
              { name: "MDS (Master's)", description: "3-year postgraduate dental specialization." },
              { name: "PhD in Dental Sciences", description: "Research doctorate in dentistry." }
            ],
            Nursing: [
              { name: "B.Sc Nursing", description: "4-year professional nursing degree." },
              { name: "M.Sc Nursing", description: "2-year postgraduate nursing degree." },
              { name: "PhD in Nursing", description: "Research doctorate in nursing science." }
            ],
            "Public Health": [
              { name: "BSPH (Bachelor's)", description: "4-year undergraduate public health degree." },
              { name: "MPH (Master's)", description: "2-year postgraduate public health degree." },
              { name: "DrPH (Doctorate)", description: "3-5 year professional doctorate in public health." }
            ]
          },
          topColleges: ["AIIMS", "CMC Vellore", "JIPMER", "Harvard Medical School", "Johns Hopkins University"]
        }
      },
      {
        title: "Computer Science (PCM + CS)",
        icon: "💻",
        color: "#008B8B",
        details: {
          fields: ["Engineering", "Software", "AI/ML", "Cybersecurity", "Data Science", "Game Development"],
          skills: ["Programming", "Algorithms", "Data Structures", "Problem-solving"],
          avgSalary: "₹8–25 LPA (higher for specialized fields)",
          courses: {
            Engineering: [
              { name: "B.Tech CSE (Bachelor's)", description: "4-year computer science engineering degree." },
              { name: "M.Tech CSE (Master's)", description: "2-year postgraduate engineering degree." },
              { name: "PhD in Computer Engineering", description: "Research doctorate in computer systems." }
            ],
            Software: [
              { name: "BCA (Bachelor's)", description: "3-year computer applications degree." },
              { name: "MCA (Master's)", description: "2-year postgraduate computer applications degree." },
              { name: "PhD in Software Engineering", description: "Research doctorate in software systems." }
            ],
            "AI/ML": [
              { name: "B.Tech AI/ML (Bachelor's)", description: "4-year undergraduate specialization." },
              { name: "M.Tech AI/ML (Master's)", description: "2-year postgraduate specialization." },
              { name: "PhD in Artificial Intelligence", description: "Research doctorate in AI." }
            ],
            Cybersecurity: [
              { name: "B.Tech Cybersecurity (Bachelor's)", description: "4-year undergraduate degree." },
              { name: "M.Tech Cybersecurity (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Cybersecurity", description: "Research doctorate in information security." }
            ],
            "Data Science": [
              { name: "B.Sc Data Science (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Data Science (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Data Science", description: "Research doctorate in data analytics." }
            ],
            "Game Development": [
              { name: "B.Sc Game Design (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Game Technology (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Interactive Media", description: "Research doctorate in game development." }
            ]
          },
          topColleges: ["IITs", "IIITs", "NITs", "MIT", "Stanford", "Carnegie Mellon"]
        }
      },
      {
        title: "Bio-Maths (PCMB)",
        icon: "🔬",
        color: "#FF4500",
        details: {
          fields: ["Both Medical & Engineering", "Biostatistics", "Bioinformatics", "Biophysics", "Environmental Science"],
          skills: ["Maths", "Biology", "Research", "Data Analysis", "Modeling"],
          avgSalary: "₹6–20 LPA (higher for specialized fields)",
          courses: {
            "Both Medical & Engineering": [
              { name: "MBBS (Bachelor's)", description: "5.5-year medical degree." },
              { name: "B.Tech Biomedical (Bachelor's)", description: "4-year engineering degree." },
              { name: "MD-MS (Master's)", description: "3-year dual medical and surgical degree." },
              { name: "M.Tech Biomedical (Master's)", description: "2-year postgraduate engineering degree." },
              { name: "PhD in Biomedical Sciences", description: "Research doctorate combining medicine and engineering." }
            ],
            "Biostatistics": [
              { name: "B.Sc Biostatistics (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Biostatistics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Biostatistics", description: "Research doctorate in biological data analysis." }
            ],
            "Bioinformatics": [
              { name: "B.Tech Bioinformatics (Bachelor's)", description: "4-year engineering degree." },
              { name: "M.Sc Bioinformatics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Bioinformatics", description: "Research doctorate in computational biology." }
            ],
            "Biophysics": [
              { name: "B.Sc Biophysics (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Biophysics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Biophysics", description: "Research doctorate in biological physics." }
            ],
            "Environmental Science": [
              { name: "B.Sc Environmental Science (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Environmental Science (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Environmental Science", description: "Research doctorate in ecological systems." }
            ]
          },
          topColleges: ["IITs", "AIIMS", "BITS Pilani", "UC Berkeley", "Imperial College London"]
        }
      },
      {
        title: "Pure Sciences (PCM)",
        icon: "🔭",
        color: "#8A2BE2",
        details: {
          fields: ["Physics", "Chemistry", "Mathematics", "Astronomy", "Geology"],
          skills: ["Analytical Thinking", "Research", "Problem-solving", "Mathematical Modeling"],
          avgSalary: "₹5–15 LPA (higher in research fields)",
          courses: {
            "Physics": [
              { name: "B.Sc Physics (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Physics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Physics", description: "Research doctorate in physics." }
            ],
            "Chemistry": [
              { name: "B.Sc Chemistry (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Chemistry (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Chemistry", description: "Research doctorate in chemistry." }
            ],
            "Mathematics": [
              { name: "B.Sc Mathematics (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Mathematics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Mathematics", description: "Research doctorate in mathematics." }
            ],
            "Astronomy": [
              { name: "B.Sc Astronomy (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Astronomy (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Astronomy", description: "Research doctorate in space sciences." }
            ],
            "Geology": [
              { name: "B.Sc Geology (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Geology (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Geology", description: "Research doctorate in earth sciences." }
            ]
          },
          topColleges: ["IISc Bangalore", "TIFR", "Caltech", "Princeton", "Cambridge"]
        }
      }
    ]
  },
  {
    title: "Commerce",
    icon: "💹",
    color: "#FF6700",
    overview: "Careers in finance, business, and economics.",
    subdivisions: [
      {
        title: "Commerce with Maths",
        icon: "📊",
        color: "#2E8B57",
        details: {
          fields: ["Chartered Accountant", "Finance", "Economics", "Actuarial Science", "Investment Banking", "Financial Engineering"],
          skills: ["Accounting", "Statistics", "Financial Analysis", "Quantitative Methods"],
          avgSalary: "₹5–15 LPA (higher for specialized fields)",
          courses: {
            "Chartered Accountant": [
              { name: "CA Foundation (Bachelor's equivalent)", description: "Entry-level accounting certification." },
              { name: "CA Intermediate", description: "Intermediate professional accounting certification." },
              { name: "CA Final (Master's equivalent)", description: "Advanced professional accounting certification." },
              { name: "PhD in Accounting", description: "Research doctorate in accounting practices." }
            ],
            "Finance": [
              { name: "B.Com Finance (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Com Finance (Master's)", description: "2-year postgraduate degree." },
              { name: "MBA Finance (Master's)", description: "2-year business administration degree." },
              { name: "PhD in Finance", description: "Research doctorate in financial theories." }
            ],
            "Economics": [
              { name: "BA/BSc Economics (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA/MSc Economics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Economics", description: "Research doctorate in economic theories." }
            ],
            "Actuarial Science": [
              { name: "B.Sc Actuarial Science (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "M.Sc Actuarial Science (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Actuarial Science", description: "Research doctorate in risk assessment." }
            ],
            "Investment Banking": [
              { name: "BBA Finance (Bachelor's)", description: "3-year undergraduate business degree." },
              { name: "MBA Finance (Master's)", description: "2-year postgraduate business degree." },
              { name: "CFA Certification", description: "Chartered Financial Analyst professional certification." },
              { name: "PhD in Financial Economics", description: "Research doctorate in investment theories." }
            ],
            "Financial Engineering": [
              { name: "B.Tech Financial Engineering (Bachelor's)", description: "4-year engineering degree." },
              { name: "M.Sc Financial Engineering (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Financial Engineering", description: "Research doctorate in quantitative finance." }
            ]
          },
          topColleges: ["SRCC", "IIMs", "Christ University", "Wharton", "London School of Economics"]
        }
      },
      {
        title: "Commerce without Maths",
        icon: "📚",
        color: "#9932CC",
        details: {
          fields: ["Management", "Business", "HR", "Marketing", "Entrepreneurship", "International Business"],
          skills: ["Communication", "Decision Making", "Leadership", "Strategic Thinking"],
          avgSalary: "₹4–12 LPA (higher for top management)",
          courses: {
            "Management": [
              { name: "BBA (Bachelor's)", description: "3-year undergraduate business administration degree." },
              { name: "MBA (Master's)", description: "2-year postgraduate business administration degree." },
              { name: "PGDM (Master's equivalent)", description: "Post Graduate Diploma in Management." },
              { name: "PhD in Management", description: "Research doctorate in business management." }
            ],
            "Business": [
              { name: "BMS (Bachelor's)", description: "3-year undergraduate management studies degree." },
              { name: "MBS (Master's)", description: "2-year postgraduate business studies degree." },
              { name: "PhD in Business Administration", description: "Research doctorate in business theories." }
            ],
            "HR": [
              { name: "BBA HR (Bachelor's)", description: "3-year undergraduate degree with HR specialization." },
              { name: "MBA HR (Master's)", description: "2-year postgraduate HR specialization." },
              { name: "PhD in Human Resources", description: "Research doctorate in organizational behavior." }
            ],
            "Marketing": [
              { name: "BBA Marketing (Bachelor's)", description: "3-year undergraduate marketing degree." },
              { name: "MBA Marketing (Master's)", description: "2-year postgraduate marketing degree." },
              { name: "PhD in Marketing", description: "Research doctorate in consumer behavior." }
            ],
            "Entrepreneurship": [
              { name: "BBA Entrepreneurship (Bachelor's)", description: "3-year undergraduate entrepreneurship degree." },
              { name: "MBA Entrepreneurship (Master's)", description: "2-year postgraduate entrepreneurship degree." },
              { name: "PhD in Entrepreneurship", description: "Research doctorate in innovation and startups." }
            ],
            "International Business": [
              { name: "BBA International Business (Bachelor's)", description: "3-year undergraduate international business degree." },
              { name: "MBA International Business (Master's)", description: "2-year postgraduate international business degree." },
              { name: "PhD in International Business", description: "Research doctorate in global trade." }
            ]
          },
          topColleges: ["XLRI", "NMIMS", "IIMs", "Harvard Business School", "INSEAD"]
        }
      },
      {
        title: "Professional Accounting",
        icon: "🧮",
        color: "#4169E1",
        details: {
          fields: ["Chartered Accountancy", "Cost Accounting", "Company Secretary", "Financial Analysis"],
          skills: ["Accounting Standards", "Taxation", "Auditing", "Financial Reporting"],
          avgSalary: "₹6–18 LPA (higher for experienced professionals)",
          courses: {
            "Chartered Accountancy": [
              { name: "CA Foundation (Bachelor's equivalent)", description: "First level of CA certification." },
              { name: "CA Intermediate", description: "Second level of CA certification." },
              { name: "CA Final (Master's equivalent)", description: "Final level of CA certification." },
              { name: "PhD in Accounting", description: "Research doctorate in accounting practices." }
            ],
            "Cost Accounting": [
              { name: "CMA Foundation (Bachelor's equivalent)", description: "First level of Cost Management Accountancy." },
              { name: "CMA Intermediate", description: "Second level of CMA certification." },
              { name: "CMA Final (Master's equivalent)", description: "Final level of CMA certification." },
              { name: "PhD in Cost Accounting", description: "Research doctorate in cost management." }
            ],
            "Company Secretary": [
              { name: "CS Foundation (Bachelor's equivalent)", description: "First level of Company Secretary certification." },
              { name: "CS Executive", description: "Second level of CS certification." },
              { name: "CS Professional (Master's equivalent)", description: "Final level of CS certification." },
              { name: "PhD in Corporate Governance", description: "Research doctorate in company law." }
            ],
            "Financial Analysis": [
              { name: "CFA Level I (Bachelor's equivalent)", description: "First level of Chartered Financial Analyst." },
              { name: "CFA Level II", description: "Second level of CFA certification." },
              { name: "CFA Level III (Master's equivalent)", description: "Final level of CFA certification." },
              { name: "PhD in Financial Analysis", description: "Research doctorate in investment analysis." }
            ]
          },
          topColleges: ["ICAI", "ICMAI", "ICSI", "Bentley University", "University of Texas at Austin"]
        }
      }
    ]
  },
    {
    title: "Arts / Humanities",
    icon: "🎨",
    color: "#3A6EA5",
    overview: "Careers in creativity, law, and governance.",
    subdivisions: [
      {
        title: "General Arts",
        icon: "📖",
        color: "#CD5C5C",
        details: {
          fields: ["Civil Services", "Law", "Journalism", "Psychology", "Sociology", "History", "Political Science", "Languages"],
          skills: ["Critical Thinking", "Research", "Writing", "Communication", "Analysis"],
          avgSalary: "₹4–12 LPA (varies widely by field)",
          courses: {
            "Civil Services": [
              { name: "BA Public Administration (Bachelor's)", description: "3-year undergraduate degree in governance." },
              { name: "MA Public Administration (Master's)", description: "2-year postgraduate degree in public policy." },
              { name: "MPA (Master of Public Admin)", description: "Professional degree for government careers." },
              { name: "PhD in Public Policy", description: "Research doctorate in governance systems." }
            ],
            "Law": [
              { name: "BA LLB (Bachelor's)", description: "5-year integrated law degree." },
              { name: "LLM (Master of Laws)", description: "1-2 year postgraduate law specialization." },
              { name: "PhD in Law", description: "Research doctorate in legal studies." },
              { name: "SJD (Doctor of Juridical Science)", description: "Advanced law research degree." }
            ],
            "Journalism": [
              { name: "BA Journalism (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Journalism (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Mass Communication", description: "Research doctorate in media studies." }
            ],
            "Psychology": [
              { name: "BA/BSc Psychology (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA/MSc Psychology (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Psychology", description: "Research doctorate in psychological sciences." },
              { name: "PsyD (Doctor of Psychology)", description: "Clinical practice doctorate." }
            ],
            "Sociology": [
              { name: "BA Sociology (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Sociology (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Sociology", description: "Research doctorate in social systems." }
            ],
            "History": [
              { name: "BA History (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA History (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in History", description: "Research doctorate in historical studies." }
            ],
            "Political Science": [
              { name: "BA Political Science (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Political Science (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Political Science", description: "Research doctorate in political systems." }
            ],
            "Languages": [
              { name: "BA Linguistics (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Linguistics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Linguistics", description: "Research doctorate in language systems." },
              { name: "PhD in Comparative Literature", description: "Research doctorate in literary studies." }
            ]
          },
          topColleges: ["JNU", "DU", "NLSIU", "Oxford", "Cambridge", "Sorbonne"]
        }
      },
      {
        title: "Performing Arts",
        icon: "🎭",
        color: "#9B59B6",
        details: {
          fields: ["Theater", "Music", "Dance", "Film Studies"],
          skills: ["Creativity", "Performance", "Technical Skills", "Artistic Expression"],
          avgSalary: "₹3–10 LPA (varies by specialization)",
          courses: {
            "Theater": [
              { name: "BA Theater Arts (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Theater Arts (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Performing Arts", description: "Research doctorate in theater studies." },
              { name: "MFA Theater (Master of Fine Arts)", description: "Professional performance degree." }
            ],
            "Music": [
              { name: "BA Music (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Music (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Musicology", description: "Research doctorate in music theory." },
              { name: "MMus (Master of Music)", description: "Professional performance degree." }
            ],
            "Dance": [
              { name: "BA Dance (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Dance (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Dance Studies", description: "Research doctorate in choreography." },
              { name: "MFA Dance (Master of Fine Arts)", description: "Professional performance degree." }
            ],
            "Film Studies": [
              { name: "BA Film Studies (Bachelor's)", description: "3-year undergraduate degree." },
              { name: "MA Film Studies (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Cinema Studies", description: "Research doctorate in film theory." },
              { name: "MFA Filmmaking (Master of Fine Arts)", description: "Professional film production degree." }
            ]
          },
          topColleges: ["FTII", "NSD", "Juilliard", "Royal Academy of Dramatic Art"]
        }
      }
    ]
  },
  {
    title: "Vocational",
    icon: "⚒",
    color: "#F6AE2D",
    overview: "Skill-based practical careers with industry demand.",
    subdivisions: [
      {
        title: "Design & Media",
        icon: "🎥",
        color: "#20B2AA",
        details: {
          fields: ["Animation", "Graphic Design", "Photography", "Fashion Design", "Interior Design"],
          skills: ["Creativity", "Software Tools", "Visualization", "Technical Skills"],
          avgSalary: "₹3–10 LPA (higher for top designers)",
          courses: {
            "Animation": [
              { name: "B.Des Animation (Bachelor's)", description: "4-year undergraduate design degree." },
              { name: "M.Des Animation (Master's)", description: "2-year postgraduate design degree." },
              { name: "PhD in Digital Arts", description: "Research doctorate in animation techniques." },
              { name: "Diploma in Animation", description: "1-2 year professional diploma." }
            ],
            "Graphic Design": [
              { name: "B.Des Graphic Design (Bachelor's)", description: "4-year undergraduate degree." },
              { name: "M.Des Graphic Design (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Visual Communication", description: "Research doctorate in design theory." },
              { name: "Advanced Diploma in Graphic Design", description: "1-year intensive professional program." }
            ],
            "Photography": [
              { name: "BFA Photography (Bachelor's)", description: "4-year fine arts degree." },
              { name: "MFA Photography (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Visual Arts", description: "Research doctorate in photographic arts." },
              { name: "Professional Diploma in Photography", description: "1-year technical program." }
            ],
            "Fashion Design": [
              { name: "B.Des Fashion (Bachelor's)", description: "4-year undergraduate degree." },
              { name: "M.Des Fashion (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Fashion Technology", description: "Research doctorate in textile innovation." },
              { name: "Diploma in Fashion Design", description: "1-2 year professional program." }
            ],
            "Interior Design": [
              { name: "B.Des Interior (Bachelor's)", description: "4-year undergraduate degree." },
              { name: "M.Des Interior (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Spatial Design", description: "Research doctorate in architectural interiors." },
              { name: "Advanced Diploma in Interior Design", description: "1-year professional program." }
            ]
          },
          topColleges: ["NIFT", "Pearl Academy", "RISD", "Parsons School of Design"]
        }
      },
      {
        title: "Technical Skills",
        icon: "🔧",
        color: "#B8860B",
        details: {
          fields: ["Automobile", "Electronics", "Construction", "Robotics", "Culinary Arts"],
          skills: ["Hands-on Training", "Technical Knowledge", "Precision Work", "Safety Awareness"],
          avgSalary: "₹3–8 LPA (higher for specialized technicians)",
          courses: {
            "Automobile": [
              { name: "B.Tech Automotive (Bachelor's)", description: "4-year engineering degree." },
              { name: "M.Tech Automotive (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Automotive Engineering", description: "Research doctorate in vehicle systems." },
              { name: "Diploma in Automobile Engineering", description: "3-year technical program." }
            ],
            "Electronics": [
              { name: "B.Tech Electronics (Bachelor's)", description: "4-year engineering degree." },
              { name: "M.Tech Electronics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Electronics", description: "Research doctorate in circuit design." },
              { name: "Diploma in Electronics", description: "3-year technical program." }
            ],
            "Construction": [
              { name: "B.Tech Civil (Bachelor's)", description: "4-year engineering degree." },
              { name: "M.Tech Construction (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Construction Management", description: "Research doctorate in building technologies." },
              { name: "Diploma in Civil Engineering", description: "3-year technical program." }
            ],
            "Robotics": [
              { name: "B.Tech Robotics (Bachelor's)", description: "4-year engineering degree." },
              { name: "M.Tech Robotics (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Robotics", description: "Research doctorate in automation systems." },
              { name: "Diploma in Robotics", description: "3-year technical program." }
            ],
            "Culinary Arts": [
              { name: "BA Culinary Arts (Bachelor's)", description: "3-year hospitality degree." },
              { name: "MA Gastronomy (Master's)", description: "2-year postgraduate degree." },
              { name: "PhD in Food Technology", description: "Research doctorate in culinary sciences." },
              { name: "Diploma in Culinary Arts", description: "1-2 year professional program." }
            ]
          },
          topColleges: ["Polytechnic Colleges", "ITIs", "Culinary Institute of America", "ETH Zurich"]
        }
      }
    ]
  }
];
   const handleSavePathway = () => {
    setShowSaveToast(true);
    // In a real app, you would save to database/localStorage here
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  return (
    <div style={{ backgroundColor: "#F4F6F9", minHeight: "100vh", padding: "30px 0" }}>
      <Container>
        <h2 style={{ color: "#004E98", fontWeight: "bold", textAlign: "center", marginBottom: "40px" }}>
          Career Explorer 🎓
        </h2>
        <Row>
          {careerCards.map((card, idx) => (
            <Col key={idx} md={3} sm={6} className="mb-4">
              <Card
                className="h-100 shadow-lg"
                style={{
                  border: `2px solid ${card.color}`,
                  borderRadius: "15px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)",
                  background: `linear-gradient(135deg, ${card.color}22, #ffffff55)`
                }}
                onClick={() => {
                  setSelectedCareer(card);
                  setSelectedSubdivision(null);
                  setSelectedField("");
                  setActiveTab("courses");
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <Card.Body style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "3rem", marginBottom: "15px" }}>{card.icon}</div>
                  <Card.Title style={{ color: card.color, fontWeight: "bold" }}>{card.title}</Card.Title>
                  <Card.Text style={{ color: "#555" }}>{card.overview}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Enhanced Subdivision Modal */}
      {selectedCareer && (
        <Modal
          show={true}
          onHide={() => {
            setSelectedCareer(null);
            setSelectedSubdivision(null);
            setSelectedField("");
          }}
          size="xl"
          centered
          scrollable
        >
          <Modal.Header closeButton style={{
            backgroundColor: selectedCareer.color,
            color: "white",
            borderBottom: "none"
          }}>
            <Modal.Title>
              <h4 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "1.5rem" }}>{selectedCareer.icon}</span>
                <span>{selectedCareer.title} Pathways</span>
              </h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "25px" }}>
            {!selectedSubdivision ? (
              <Row>
                {selectedCareer.subdivisions.map((sub, i) => (
                  <Col key={i} md={4} className="mb-4">
                    <Card
                      className="h-100 shadow"
                      style={{
                        borderRadius: "20px",
                        padding: "10px",
                        cursor: "pointer",
                        textAlign: "center",
                        background: `linear-gradient(135deg, ${sub.color}20, #ffffff80)`,
                        backdropFilter: "blur(8px)",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        border: `2px solid ${sub.color}`
                      }}
                      onClick={() => {
                        setSelectedSubdivision(sub);
                        setSelectedField("");
                        setActiveTab("courses");
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                    >
                      <Card.Body>
                        <div style={{ fontSize: "2.5rem", marginBottom: "10px" }}>{sub.icon}</div>
                        <Card.Title style={{ color: sub.color, fontWeight: "bold" }}>{sub.title}</Card.Title>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : null}

            {selectedSubdivision && (
              <>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "20px",
                  paddingBottom: "15px",
                  borderBottom: `2px solid ${selectedSubdivision.color}33`
                }}>
                  <div style={{
                    fontSize: "2rem",
                    background: `${selectedSubdivision.color}20`,
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: `2px solid ${selectedSubdivision.color}`
                  }}>
                    {selectedSubdivision.icon}
                  </div>
                  <div>
                    <h4 style={{
                      color: selectedSubdivision.color,
                      margin: 0
                    }}>
                      {selectedSubdivision.title}
                    </h4>
                    <p style={{ color: "#666", margin: 0 }}>
                      {selectedCareer.title} Pathway
                    </p>
                  </div>
                </div>

                {/* Field Selection with Enhanced UI */}
                <Form.Group className="mb-4">
                  <Form.Label>
                    <h5 style={{ fontWeight: "600" }}>
                      <i className="bi bi-compass" style={{ marginRight: "8px" }}></i>
                      Select Your Specialization Field
                    </h5>
                  </Form.Label>
                  <Form.Select
                    value={selectedField}
                    onChange={(e) => {
                      setSelectedField(e.target.value);
                      setActiveTab("courses");
                    }}
                    style={{
                      borderRadius: "10px",
                      padding: "12px",
                      border: `2px solid ${selectedSubdivision.color}`,
                      fontSize: "1rem"
                    }}
                  >
                    <option value="">-- Choose a field to explore --</option>
                    {selectedSubdivision.details.fields.map((field, i) => (
                      <option key={i} value={field}>{field}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* Enhanced Field Details Section */}
                {selectedField && (
                  <div style={{ marginTop: "25px" }}>
                    <Tabs
                      activeKey={activeTab}
                      onSelect={(k) => setActiveTab(k)}
                      className="mb-4"
                      style={{
                        borderBottom: `2px solid ${selectedSubdivision.color}20`
                      }}
                    >
                      <Tab
                        eventKey="courses"
                        title={
                          <span>
                            <i className="bi bi-journal-bookmark" style={{ marginRight: "6px" }}></i>
                            Courses
                          </span>
                        }
                      >
                        <div style={{ marginTop: "20px" }}>
                          <h5 style={{
                            color: selectedSubdivision.color,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          }}>
                            <i className="bi bi-mortarboard"></i>
                            Educational Pathways for {selectedField}
                          </h5>
                         
                          <Accordion
                            activeKey={expandedAccordion}
                            onSelect={(e) => setExpandedAccordion(e)}
                            className="mt-3"
                          >
                            {Object.entries({
                              "Undergraduate Degrees": selectedSubdivision.details.courses[selectedField]
                                .filter(course => course.name.includes("B.") || course.name.includes("Bachelor")),
                              "Postgraduate Degrees": selectedSubdivision.details.courses[selectedField]
                                .filter(course => course.name.includes("M.") || course.name.includes("Master")),
                              "Doctoral Programs": selectedSubdivision.details.courses[selectedField]
                                .filter(course => course.name.includes("PhD") || course.name.includes("Doctor")),
                              "Diplomas & Certifications": selectedSubdivision.details.courses[selectedField]
                                .filter(course => course.name.includes("Diploma") || course.name.includes("Certification"))
                            }).map(([level, courses], i) => (
                              courses.length > 0 && (
                                <Accordion.Item
                                  key={i}
                                  eventKey={i.toString()}
                                  style={{
                                    border: `1px solid ${selectedSubdivision.color}30`,
                                    marginBottom: "10px",
                                    borderRadius: "10px"
                                  }}
                                >
                                  <Accordion.Header>
                                    <div style={{
                                      display: "flex",
                                      alignItems: "center",
                                      width: "100%"
                                    }}>
                                      <Badge
                                        bg="light"
                                        text="dark"
                                        style={{
                                          background: `${selectedSubdivision.color}20`,
                                          color: selectedSubdivision.color,
                                          marginRight: "15px"
                                        }}
                                      >
                                        {courses.length}
                                      </Badge>
                                      <span style={{ fontWeight: "500" }}>{level}</span>
                                    </div>
                                  </Accordion.Header>
                                  <Accordion.Body>
                                    <ListGroup variant="flush">
                                      {courses.map((course, j) => (
                                        <ListGroup.Item
                                          key={j}
                                          style={{
                                            borderLeft: `3px solid ${selectedSubdivision.color}`,
                                            marginBottom: "8px",
                                            borderRadius: "5px"
                                          }}
                                        >
                                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                                            <div>
                                              <h6 style={{ fontWeight: "600", color: selectedSubdivision.color }}>
                                                {course.name}
                                              </h6>
                                              <p style={{ marginBottom: "0" }}>{course.description}</p>
                                            </div>
                                            <Button
                                              variant="outline-primary"
                                              size="sm"
                                              style={{
                                                borderColor: selectedSubdivision.color,
                                                color: selectedSubdivision.color
                                              }}
                                              onClick={() => {
                                                setSelectedCourse(course);
                                                setShowCourseDetails(true);
                                              }}
                                            >
                                              More Details
                                            </Button>
                                          </div>
                                        </ListGroup.Item>
                                      ))}
                                    </ListGroup>
                                  </Accordion.Body>
                                </Accordion.Item>
                              )
                            ))}
                          </Accordion>
                        </div>
                      </Tab>

                      <Tab
                        eventKey="skills"
                        title={
                          <span>
                            <i className="bi bi-tools" style={{ marginRight: "6px" }}></i>
                            Skills
                          </span>
                        }
                      >
                        <div style={{ marginTop: "20px" }}>
                          <h5 style={{
                            color: selectedSubdivision.color,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          }}>
                            <i className="bi bi-lightning-charge"></i>
                            Required Skills for {selectedField}
                          </h5>
                         
                          <div className="mt-4">
                            {selectedSubdivision.details.skills.map((skill, i) => (
                              <div key={i} className="mb-3">
                                <div style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginBottom: "5px"
                                }}>
                                  <span>{skill}</span>
                                  <span>{(80 + Math.random() * 20).toFixed(0)}%</span>
                                </div>
                                <ProgressBar
                                  now={80 + Math.random() * 20}
                                  variant="info"
                                  style={{
                                    height: "8px",
                                    borderRadius: "5px",
                                    background: `${selectedSubdivision.color}40`
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                         
                          <Alert variant="info" className="mt-4">
                            <i className="bi bi-info-circle" style={{ marginRight: "8px" }}></i>
                            These skills can be developed through coursework, internships, and practical projects.
                          </Alert>
                        </div>
                      </Tab>

                      <Tab
                        eventKey="careers"
                        title={
                          <span>
                            <i className="bi bi-briefcase" style={{ marginRight: "6px" }}></i>
                            Careers
                          </span>
                        }
                      >
                        <div style={{ marginTop: "20px" }}>
                          <h5 style={{
                            color: selectedSubdivision.color,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          }}>
                            <i className="bi bi-graph-up"></i>
                            Career Opportunities in {selectedField}
                          </h5>
                         
                          <Row className="mt-4 g-4">
                            {[
                              { title: "Entry Level", icon: "bi-person", jobs: ["Junior Associate", "Trainee", "Intern"] },
                              { title: "Mid Level", icon: "bi-person-check", jobs: ["Specialist", "Team Lead", "Manager"] },
                              { title: "Senior Level", icon: "bi-person-badge", jobs: ["Director", "Head of Department", "Principal"] }
                            ].map((level, i) => (
                              <Col md={4} key={i}>
                                <Card style={{
                                  border: `1px solid ${selectedSubdivision.color}30`,
                                  height: "100%"
                                }}>
                                  <Card.Body>
                                    <div style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "10px",
                                      marginBottom: "15px"
                                    }}>
                                      <div style={{
                                        width: "40px",
                                        height: "40px",
                                        borderRadius: "50%",
                                        background: `${selectedSubdivision.color}20`,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        color: selectedSubdivision.color
                                      }}>
                                        <i className={`bi ${level.icon}`}></i>
                                      </div>
                                      <h6 style={{
                                        fontWeight: "600",
                                        margin: 0
                                      }}>
                                        {level.title}
                                      </h6>
                                    </div>
                                    <ListGroup variant="flush">
                                      {level.jobs.map((job, j) => (
                                        <ListGroup.Item key={j}>
                                          <div style={{ display: "flex", alignItems: "center" }}>
                                            <i className="bi bi-chevron-right" style={{
                                              marginRight: "10px",
                                              color: selectedSubdivision.color
                                            }}></i>
                                            {job} {selectedField.includes("Engineering") ? "Engineer" :
                                                  selectedField.includes("Medicine") ? "Doctor" :
                                                  selectedField.includes("Design") ? "Designer" : ""}
                                          </div>
                                        </ListGroup.Item>
                                      ))}
                                    </ListGroup>
                                  </Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </div>
                      </Tab>

                      <Tab
                        eventKey="colleges"
                        title={
                          <span>
                            <i className="bi bi-building" style={{ marginRight: "6px" }}></i>
                            Colleges
                          </span>
                        }
                      >
                        <div style={{ marginTop: "20px" }}>
                          <h5 style={{
                            color: selectedSubdivision.color,
                            display: "flex",
                            alignItems: "center",
                            gap: "8px"
                          }}>
                            <i className="bi bi-book"></i>
                            Top Institutions for {selectedField}
                          </h5>
                         
                          <div className="mt-4">
                            <Tabs defaultActiveKey="global" className="mb-3">
                              <Tab eventKey="global" title="Global">
                                <ListGroup className="mt-3">
                                  {selectedSubdivision.details.topColleges.map((college, i) => (
                                    <ListGroup.Item
                                      key={i}
                                      style={{
                                        borderLeft: `3px solid ${selectedSubdivision.color}`,
                                        marginBottom: "8px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                      }}
                                    >
                                      <div>
                                        <h6 style={{ fontWeight: "600" }}>{college}</h6>
                                        <small className="text-muted">World Ranking: Top {(i+1)*100}</small>
                                      </div>
                                      <Badge bg="light" text="dark">
                                        <i className="bi bi-globe" style={{ marginRight: "5px" }}></i>
                                        Global
                                      </Badge>
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              </Tab>
                              <Tab eventKey="india" title="India">
                                <ListGroup className="mt-3">
                                  {selectedSubdivision.details.topColleges.filter(c =>
                                    ["IITs", "AIIMS", "NITs", "IIMs", "DU", "JNU"].includes(c)
                                  ).map((college, i) => (
                                    <ListGroup.Item
                                      key={i}
                                      style={{
                                        borderLeft: `3px solid ${selectedSubdivision.color}`,
                                        marginBottom: "8px",
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center"
                                      }}
                                    >
                                      <div>
                                        <h6 style={{ fontWeight: "600" }}>{college}</h6>
                                        <small className="text-muted">India Ranking: Top {i+1}</small>
                                      </div>
                                      <Badge bg="light" text="dark">
                                        <i className="bi bi-geo-alt" style={{ marginRight: "5px" }}></i>
                                        India
                                      </Badge>
                                    </ListGroup.Item>
                                  ))}
                                </ListGroup>
                              </Tab>
                            </Tabs>
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer style={{
      borderTop: `1px solid ${selectedSubdivision ? selectedSubdivision.color+'20' : selectedCareer.color+'20'}`
    }}>
      {selectedSubdivision ? (
        <Button
          variant="outline-secondary"
          onClick={() => {
            setSelectedSubdivision(null);
            setSelectedField("");
            setActiveTab("courses");
          }}
          style={{
            borderColor: selectedSubdivision.color,
            color: selectedSubdivision.color
          }}
        >
          <i className="bi bi-arrow-left" style={{ marginRight: "5px" }}></i>
          Back to {selectedCareer.title}
        </Button>
      ) : (
        <Button
          variant="outline-secondary"
          onClick={() => {
            setSelectedCareer(null);
            setSelectedSubdivision(null);
            setSelectedField("");
          }}
          style={{
            borderColor: selectedCareer.color,
            color: selectedCareer.color
          }}
        >
          Close
        </Button>
      )}
      {selectedField && (
        <Button
          variant="primary"
          style={{
            backgroundColor: selectedSubdivision.color,
            borderColor: selectedSubdivision.color
          }}
          onClick={handleSavePathway}
        >
          <i className="bi bi-save" style={{ marginRight: "5px" }}></i>
          Save This Pathway
        </Button>
      )}
    </Modal.Footer>
  </Modal>
)}
      {/* Course Details Modal */}
      {selectedCourse && (
        <CourseDetailsModal
          course={selectedCourse}
          show={showCourseDetails}
          onHide={() => setShowCourseDetails(false)}
          color={selectedSubdivision?.color || "#004E98"}
        />
      )}
       {/* Save Confirmation Toast */}
      <Toast
  show={showSaveToast}
  onClose={() => setShowSaveToast(false)}
  style={{
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    minWidth: '250px',
    borderLeft: `5px solid ${selectedSubdivision?.color || "#004E98"}`,
    zIndex: 9999  // This ensures it appears above the modal
  }}
  delay={3000}
  autohide
>
  <Toast.Header>
    <strong className="me-auto">Pathway Saved</strong>
  </Toast.Header>
  <Toast.Body>
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <i
        className="bi bi-check-circle-fill"
        style={{
          color: selectedSubdivision?.color || "#004E98",
          fontSize: '1.5rem'
        }}
      ></i>
      <div>
        <strong>{selectedField} pathway saved!</strong>
        <div style={{ fontSize: '0.9rem' }}>
          You can view saved pathways in your profile.
        </div>
      </div>
    </div>
  </Toast.Body>
</Toast>
    </div>
  );
}

