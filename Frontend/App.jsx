import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import LandingPage from "./src/pages/LandingPage";
import LoginPage from "./src/pages/LoginPage";
import SignUpPage from "./src/pages/SignUpPage";
import GradeSelection from "./src/pages/GradeSelection";
import Dashboard10th from "./src/pages/Dashboard10th";
import Dashboard11th12th from "./src/pages/Dashboard11th12th";
import CareerExplorer from "./src/pages/CareerExplorer";
import AICareerAdvisor from "./src/pages/AICareerAdvisor";
import ProfilePage from "./src/pages/ProfilePage";
import ProtectedRoute from "./src/components/ProtectedRoute";
import Navbar from "./src/components/navbar";
import AboutPage from './src/pages/AboutPage';
import CareerQuiz from './src/pages/CareerQuiz';
import CounselingBooking from "./src/pages/CounselingBooking";
import CounselingDetail from "./src/pages/CounselingDetail";
import "./App.css";
import CareerQuiz11th12th from "./src/pages/CareerQuiz11th12th";
import EntranceExam from "./src/pages/EntranceExam";
import ScholarshipSection from "./src/pages/ScholarshipSection";
// Layout that includes Navbar
function LayoutWithNavbar() {
  return (
    <>
      <Navbar />
      <div className="main-content-wrapper">
        <Outlet />
      </div>
     
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Authenticated Routes with Navbar */}
        <Route element={<LayoutWithNavbar />}>
          <Route path="/select-grade" element={<ProtectedRoute><GradeSelection /></ProtectedRoute>} />
          <Route path="/dashboard-10th" element={<ProtectedRoute><Dashboard10th /></ProtectedRoute>} />
          <Route path="/dashboard-11th12th" element={<ProtectedRoute><Dashboard11th12th /></ProtectedRoute>} />
          <Route path="/career-explorer" element={<ProtectedRoute><CareerExplorer /></ProtectedRoute>} />
          <Route path="/ai-career-advisor" element={<ProtectedRoute><AICareerAdvisor /></ProtectedRoute>} />
          <Route path="/counseling-booking" element={<ProtectedRoute><CounselingBooking /></ProtectedRoute>} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path="/career-quiz" element={<ProtectedRoute><CareerQuiz /></ProtectedRoute>} />
          <Route path="/counseling-booking" element={<ProtectedRoute><CounselingBooking /></ProtectedRoute>}/>
          <Route path="/counseling/:id" element={<ProtectedRoute><CounselingDetail /></ProtectedRoute>}/>
          <Route path="/career-quiz11th12th" element={<ProtectedRoute><CareerQuiz11th12th /></ProtectedRoute>} />
          <Route path="/entrance-exam" element={<ProtectedRoute><EntranceExam /></ProtectedRoute>} />
          <Route path="/scholarship" element={<ProtectedRoute><ScholarshipSection /></ProtectedRoute>} />
          <Route path="/entrance-exams/:examId?" element={<EntranceExam />} />
        </Route>
        
      </Routes>
    </Router>
  );
}

export default App;
