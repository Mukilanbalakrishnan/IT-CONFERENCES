import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FaLinkedin, FaFacebook, FaXTwitter, FaInstagram, FaArrowUp } from "react-icons/fa6";
import './Footer.css'; // Import the stylesheet

export const Footer = () => {
    // Function to scroll to the top of the page
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="footer-container">
            <div className="container footer-main">
                <div className="footer-layout">

                    {/* Left Side: Brand Info */}
                    <div className="footer-brand-section">
                        <Link to="/" className="footer-brand">
                            <span className="brand-main-text">KSR</span>
                            <span className="brand-sub-text">Educational Institutions</span>
                        </Link>
                        <p className="brand-tagline">
                            Empowering students with advanced tools to improve their skills and career outcomes.
                        </p>
                        <div className="social-icons">
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X" className="footer-link">
                                <FaXTwitter />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-link">
                                <FaLinkedin />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-link">
                                <FaInstagram />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-link">
                                <FaFacebook />
                            </a>
                        </div>
                        <button className="back-to-top-btn" onClick={handleBackToTop}>
                            <FaArrowUp />
                            <span>Back to Top</span>
                        </button>
                    </div>

                    {/* Right Side: Links */}
                    <div className="footer-links-section">
                        <div className="footer-column">
                            <h3 className="footer-heading">Site Map</h3>
                            <ul className="footer-list">
                                <li><NavLink to="/" className="footer-link">Homepage</NavLink></li>
                                <li><NavLink to="/agenda" className="footer-link">Agenda</NavLink></li>
                                <li><NavLink to="/speaker" className="footer-link">Speakers</NavLink></li>
                                <li><NavLink to="/committees" className="footer-link">Committees</NavLink></li>
                                <li><NavLink to="/contact" className="footer-link">Contact Us</NavLink></li>
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3 className="footer-heading">Tracks</h3>
                            <ul className="footer-list">
                                <li><NavLink to="/conferencetrack" className="footer-link">Track</NavLink></li>
                                {/* <li><NavLink to="/tracks/2" className="footer-link">Track 2</NavLink></li>
                                <li><NavLink to="/tracks/3" className="footer-link">Track 3</NavLink></li>
                                <li><NavLink to="/tracks/4" className="footer-link">Track 4</NavLink></li> */}
                            </ul>
                        </div>
                        <div className="footer-column">
                            <h3 className="footer-heading">Legal</h3>
                            <ul className="footer-list">
                                <li><NavLink to="/privacy" className="footer-link">Privacy Policy</NavLink></li>
                                <li><NavLink to="/terms" className="footer-link">Terms of Services</NavLink></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>
            {/* Bottom Copyright Bar */}
            <div className="footer-copyright-bar">
                <p>© {new Date().getFullYear()} KSR Educational Institutions. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer; 