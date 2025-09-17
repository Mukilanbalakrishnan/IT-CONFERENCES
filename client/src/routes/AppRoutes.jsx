import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Home from '../pages/Home/Home';
import Venue from '../pages/Venue/Venue';
import Speaker from '../pages/Speaker/Speaker';
import Contact from '../pages/Contact/contact';
import Agenda from '../pages/Agenda/agenda';
import AdvisoryBoard from '../pages/AdvisoryBoard/AdvisoryBoardPage';
import OrganizingCom from '../pages/OrganizingCommittee/OrganizingCommitteePage';
import ResearchCom from '../pages/Researchandreview/Researchandreview';
import RegistrationForm from '../pages/Register/RegisterForm';
import SubmissionStatusTracker from '../pages/statustracker/SubmissionStatusTracker';
import ConferenceTracksPage from '../pages/ConferenceTrack/ConferenceTracksPage';
import Journal from '../pages/Journal/journal';
import FeeStructure from '../pages/FeeStructure/FeeStructure';
import TeamProfile from '../pages/TeamProfile/TeamProfile';
import PaperSubmission from '../pages/PaperSubmission/PaperSubmission';

// Import Layout & Auth Components
import Navbar from '../header/Navbar';
import Footer from '../Footer/Footer';
import Modal from '../pages/Login/Modal';
import SignInForm from '../pages/Login/Signin';
import SignUpForm from '../pages/Login/LoginForm'; 

const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Global state for the entire application
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signin');

    // This effect runs once to check for a logged-in user when the app loads
    useEffect(() => {
        const checkUserSession = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            if (token && userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (error) {
                    console.error("Failed to parse user data from storage", error);
                    localStorage.clear();
                }
            }
        };
        checkUserSession();
    }, []);

    // This effect manages the special body class for the homepage's transparent navbar
    useEffect(() => {
        if (location.pathname === '/') {
            document.body.classList.add('is-home-page');
        } else {
            document.body.classList.remove('is-home-page');
        }
        return () => document.body.classList.remove('is-home-page');
    }, [location.pathname]);

    // --- Global Authentication Handlers ---
    const handleLoginSuccess = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);
        setIsModalOpen(false); // Close modal on successful login
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/'); // Navigate to home to ensure a clean state
    };

    const handleOpenLogin = () => {
        setAuthMode('signin');
        setIsModalOpen(true);
    };
    
    const handleCloseLogin = () => setIsModalOpen(false);

    return (
        <>
            <Navbar user={user} onLogout={handleLogout} onOpenLogin={handleOpenLogin} />
            <main>
                <Routes>
                    <Route path="/" element={<Home onOpenLogin={handleOpenLogin} />} />
                    <Route path="/venue" element={<Venue />} />
                    <Route path="/speaker" element={<Speaker />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/committees/advisory-board" element={<AdvisoryBoard />} />
                    <Route path="/committees/organizing-committee" element={<OrganizingCom />} />
                    <Route path="/committees/research-and-review-committee" element={<ResearchCom />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/status" element={<SubmissionStatusTracker />} />
                    <Route path="/conferencetrack" element={<ConferenceTracksPage />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/feestructure" element={<FeeStructure />} />
                    <Route path="/team" element={<TeamProfile />} />
                    <Route path="/paper-submission" element={<PaperSubmission />} />
                </Routes>
            </main>
            <Footer />

            {/* Login/Signup Modal managed globally */}
            <Modal isOpen={isModalOpen} onClose={handleCloseLogin}>
                {authMode === 'signin' ? (
                    <SignInForm 
                        onSwitch={() => setAuthMode('signup')} 
                        onClose={handleCloseLogin}
                        onLoginSuccess={handleLoginSuccess}
                    />
                ) : (
                    <SignUpForm 
                        onSwitch={() => setAuthMode('signin')} 
                        onClose={handleCloseLogin} 
                    />
                )}
            </Modal>
        </>
    );
};

const AppRoutes = () => {
    return (
        <Router>
            <AppLayout />
        </Router>
    );
};

export default AppRoutes;

