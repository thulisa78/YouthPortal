import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Bursaries from './pages/Bursaries';
import Funding from './pages/Funding';
import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import JobTracker from './pages/JobTracker';
import CVBuilder from './pages/CVBuilder';
import Learnerships from './pages/Learnerships';
import SkillsRoadmaps from './pages/SkillsRoadmaps';
import Mentorship from './pages/Mentorship';

function ProtectedRoute({ element, isLoggedIn }) {
  return isLoggedIn ? element : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isLoggedIn } = useAppContext();

  const protect = (el) => (
    <ProtectedRoute isLoggedIn={isLoggedIn} element={<Layout>{el}</Layout>} />
  );

  return (
    <Routes>
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/signup" element={isLoggedIn ? <Navigate to="/" replace /> : <SignUp />} />

      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/bursaries" element={protect(<Bursaries />)} />
      <Route path="/funding" element={protect(<Funding />)} />
      <Route path="/courses" element={protect(<Courses />)} />
      <Route path="/profile" element={protect(<Profile />)} />

      {/* New pages */}
      <Route path="/job-tracker" element={protect(<JobTracker />)} />
      <Route path="/cv-builder" element={protect(<CVBuilder />)} />
      <Route path="/learnerships" element={protect(<Learnerships />)} />
      <Route path="/skills-roadmaps" element={protect(<SkillsRoadmaps />)} />
      <Route path="/mentorship" element={protect(<Mentorship />)} />
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
