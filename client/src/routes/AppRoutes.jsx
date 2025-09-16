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


// Import Layout & Auth Components
import Navbar from '../header/Navbar';
import Footer from '../Footer/Footer';
import Modal from '../pages/Login/Modal';
import SignInForm from '../pages/Login/Signin';
import SignUpForm from '../pages/Login/LoginForm'; 

const AppLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [authMode, setAuthMode] = useState('signin');

    useEffect(() => {
        const checkUserSession = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            if (token && userData) {
                try {
                    setUser(JSON.parse(userData));
                } catch (error) {
                    console.error("Failed to parse user data:", error);
                    localStorage.clear();
                }
            }
        };
        checkUserSession();
    }, []);

    useEffect(() => {
        if (location.pathname === '/') {
            document.body.classList.add('is-home-page');
        } else {
            document.body.classList.remove('is-home-page');
        }
    }, [location.pathname]);

    const handleLogin = (userData, token) => {
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        setUser(userData);
        setIsModalOpen(false); // Close modal on successful login
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        navigate('/');
    };

    const openLoginModal = () => {
        setAuthMode('signin');
        setIsModalOpen(true);
    };

    return (
        <>
            <Navbar user={user} onLogout={handleLogout} onLoginRequest={openLoginModal} />
            <main className={location.pathname === '/' ? 'home-main' : ''}>
                <Routes>
                    <Route path="/" element={<Home onLoginRequest={openLoginModal} />} />
                    <Route path="/venue" element={<Venue />} />
                    <Route path="/speaker" element={<Speaker />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/committees/advisory-board" element={<AdvisoryBoard />} />
                    <Route path="/committees/organizing-committee" element={<OrganizingCom />} />
                    <Route path="/committees/research-and-review-committee" element={<ResearchCom />} />
                    <Route path="/register" element={<RegistrationForm />} />
                    <Route path="/status-tracker" element={<SubmissionStatusTracker />} />
                    <Route path="/conferencetrack" element={<ConferenceTracksPage />} />
                    <Route path="/journal" element={<Journal />} />
                    <Route path="/feestructure" element={<FeeStructure />} />
                    <Route path="/teamprofile" element={<TeamProfile />} />
                </Routes>
            </main>
            <Footer />

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    {authMode === 'signin' ? (
                        <SignInForm onSwitch={() => setAuthMode('signup')} onLoginSuccess={handleLogin} onClose={() => setIsModalOpen(false)} />
                    ) : (
                        <SignUpForm onSwitch={() => setAuthMode('signin')} onClose={() => setIsModalOpen(false)} />
                    )}
                </Modal>
            )}
        </>
    );
};

const AppRoutes = () => (
    <Router>
        <AppLayout />
    </Router>
);

export default AppRoutes;

