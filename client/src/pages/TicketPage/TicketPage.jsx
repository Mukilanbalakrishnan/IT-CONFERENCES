import React, { useState, useEffect } from 'react';
import './TicketPage.css';
import {
    FaTicketAlt, FaUser, FaIdCard, FaCalendarAlt,
    FaBuilding, FaEnvelope
} from 'react-icons/fa';
import axios from 'axios';

// Simple Online QR Code with black color
const OnlineQRCode = ({ value, size = 160 }) => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}&format=png&margin=10&color=000000&bgcolor=ffffff`;
    
    return (
        <div className="online-qr-code">
            <img 
                src={qrUrl} 
                alt="QR Code" 
                className="qr-image"
                width={size}
                height={size}
                onError={(e) => {
                    e.target.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(value)}&format=png&color=000000`;
                }}
            />
            <p className="qr-scan-text">SCAN FOR ENTRY</p>
        </div>
    );
};

// Loader Component
const Loader = () => (
    <div className="loader-container">
        <div className="loader-dots">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
        </div>
        <p className="loader-text">Loading Your Ticket...</p>
    </div>
);

// Main Ticket Page Component
const TicketPage = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Authentication token not found. Please log in.');

                const response = await axios.get('https://it-con-backend.onrender.com/api/users/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.data) throw new Error('No profile data found in the API response.');
                setProfileData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch profile data.');
            } finally {
                setTimeout(() => setIsLoading(false), 1000);
            }
        };

        fetchProfileData();
    }, []);

    if (isLoading) return <Loader />;
    if (error) return <div className="profile-page-error">Error: {error}</div>;

    // --- NEW LOGIC START ---
    // Based on your status cases, the ticket should only show after payment is complete (case 5)
    // We assume 'paid' is the status after case 4 is resolved.
    const isRegistrationComplete = profileData.paymentStatus === 'paid';

    if (!isRegistrationComplete) {
        return (
            <main className="ticket-page-container">
                <header className="tp-header">
                    <h1>Ticket Not Ready</h1>
                    <p style={{ color: '#6b7280', fontSize: '1rem', maxWidth: '450px', margin: '0 auto' }}>
                        Your registration is not yet complete. 
                        Please finish all submission steps and payment to view your ticket.
                    </p>
                </header>
            </main>
        );
    }
    // --- NEW LOGIC END ---

    // If registration IS complete, create QR data and render the ticket:
    const qrData = JSON.stringify({
        id: profileData.userId || profileData._id,
        name: profileData.name,
        event: "IT Conference 2024",
        type: "attendee"
    });

    return (
        <main className="ticket-page-container">
            <header className="tp-header">
                <h1>Your Conference Ticket</h1>
                <p>This is your official pass. Please have it ready for scanning.</p>
            </header>

            <div className="ticket-wrapper">
                {/* Ticket Body */}
                <div className="ticket-body">
                    <div className="ticket-body-header">
                        <div className="ticket-brand">
                            <FaTicketAlt />
                            <h3>CONFERENCE PASS</h3>
                        </div>
                        <h1 className="ticket-title">DIGITAL ACCESS PASS</h1>
                    </div>

                    <div className="ticket-main-content">
                        <div className="primary-info">
                            
                            <div className="primary-info-item">
                                <span className="ticket-label">
                                    <FaUser />
                                    PARTICIPANT ID
                                </span>
                                <p className="ticket-value-large">IC6850</p>
                            </div>

                            <div className="primary-info-item">
                                <span className="ticket-label">
                                    SELECTED TRACK
                                </span>
                                <p className="ticket-value-large">{profileData.track || 'Track 1'}</p>
                            </div>

                            <div className="primary-info-item">
                                <span className="ticket-label">
                                    <FaIdCard />
                                    UNIQUE ID 
                                </span>
                                <p className="ticket-value-mono">{profileData.userId || profileData._id}</p>
                            </div>

                            <div className="primary-info-item">
                                <span className="ticket-label">
                                    <FaEnvelope />
                                    EMAIL ADDRESS
                                </span>
                                <p className="ticket-value">{profileData.email}</p>
                            </div>
                        </div>

                        <div className="detail-grid-section">
                            <div className="detail-grid">
                                <div className="detail-item">
                                    <span className="ticket-label">
                                        <FaCalendarAlt />
                                        PRESENTATION MODE
                                    </span>
                                    <p className="ticket-value">{profileData.presentationMode || 'offline'}</p>
                                </div>
                                <div className="detail-item">
                                    <span className="ticket-label">
                                        <FaBuilding />
                                        ORGANISATION
                                    </span>
                                    <p className="ticket-value">{profileData.participants?.[0]?.organisation || 'KSR'}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ticket-body-footer">
                        <div className="transaction-info">
                            <span className="ticket-label">TRANSACTION ID</span>
                            <p className="ticket-value-mono">N/A</p>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="ticket-divider">
                    <div className="divider-notch top-notch"></div>
                    <div className="divider-notch bottom-notch"></div>
                </div>

                {/* Ticket Stub with Online QR Code */}
                <div className="ticket-stub">
                    <div className="stub-content">
                        <div className="stub-header">
                            <div className="stub-status">
                                VALID ENTRY PASS
                            </div>
                        </div>

                        {/* Online QR Code */}
                        <OnlineQRCode 
                            value={qrData}
                            size={160}
                        />
                        
                        <div className="conference-info">
                            <div className="stub-detail">
                                <span className="ticket-label">CONFERENCE</span>
                                <p className="ticket-value-mono">s3conference 2026</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TicketPage;