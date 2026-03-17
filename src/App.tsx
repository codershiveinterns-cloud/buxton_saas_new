import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Documents from './pages/Documents';
import Tasks from './pages/Tasks';
import Team from './pages/Team';
import Settings from './pages/Settings';
import PrivateNotes from './pages/PrivateNotes';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import Cookies from './pages/Cookies';
import Security from './pages/Security';
import VerifyEmail from './pages/VerifyEmail';
import ForgotPassword from './pages/ForgotPassword';
import ProtectedRoute from './components/ProtectedRoute';
import Projects from './pages/Projects';
import ProjectWorkspace from './pages/ProjectWorkspace';
import { Toaster } from 'react-hot-toast';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id/*" element={<ProjectWorkspace />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/team" element={<Team />} />
          <Route path="/notes" element={<PrivateNotes />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="/terms" element={<Terms />} />
        <Route path="/refund" element={<Refund />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/security" element={<Security />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default App;
