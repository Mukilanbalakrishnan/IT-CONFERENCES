import React, { useState, useEffect } from 'react';
import './TicketPage.css'; // We will create this new CSS file next
import {
    FaQrcode, FaCheckCircle, FaClock, FaTimesCircle, 
    FaDesktop, FaChalkboardTeacher, FaRegBuilding 
} from 'react-icons/fa';
import axios from 'axios';
import base_url from '../../config';

// --- Loader Component (Copied from previous step) ---
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

// --- Main Ticket Page Component ---
const TicketPage = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) throw new Error('Authentication token not found. Please log in.');

                const response = await axios.get(`${base_url}/users/me`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.data) throw new Error('No profile data found in the API response.');
                setProfileData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch profile data.');
            } finally {
                // Added a small delay to make loader visible
                setTimeout(() => setIsLoading(false), 1000);
            }
        };

        fetchProfileData();
    }, []);

    if (isLoading) return <Loader />;
    if (error) return <div className="profile-page-error">Error: {error}</div>;

    // --- Process Data for Ticket ---
    
    // Placeholder for track - add 'track' to your API response
    const track = profileData.track || 'AI & Machine Learning';
    
    // Enhanced payment details
    let paymentInfo;
    if (profileData.paymentStatus === 'approved') {
        paymentInfo = {
            status: 'Approved',
            icon: <FaCheckCircle />,
            className: 'approved',
            // Placeholder - add 'transactionId' to your API
            transactionId: profileData.transactionId || 'PAY-123XYZ456' 
        };
    } else if (profileData.paymentStatus === 'rejected') {
        paymentInfo = {
            status: 'Rejected',
            icon: <FaTimesCircle />,
            className: 'rejected',
            transactionId: 'N/A'
        };
    } else {
        paymentInfo = {
            status: 'Pending',
            icon: <FaClock />,
            className: 'pending',
            transactionId: 'N/A'
        };
    }

    return (
        <main className="ticket-page-container">
            <header className="tp-header">
                <h1>Your Conference Ticket</h1>
                <p>This is your official pass. Please have it ready for scanning.</p>
            </header>

            <div className="ticket-wrapper">
                {/* --- Ticket Header --- */}
                <div className="ticket-header">
                    <div className="ticket-user-info">
                        <h2>{profileData.name}</h2>
                        <p>{profileData.participants[0]?.designation}</p>
                    </div>
                    <div className="ticket-user-id">
                        <span>Unique ID</span>
                        <strong>{profileData.userId}</strong>
                    </div>
                </div>

                {/* --- Ticket Body --- */}
                <div className="ticket-body">
                    <div className="ticket-main-details">
                        <div className="ticket-info-row">
                            <FaChalkboardTeacher />
                            <div>
                                <span>Selected Track</span>
                                <p>{track}</p>
                            </div>
                        </div>
                        <div className="ticket-info-row">
                            <FaDesktop />
                            <div>
                                <span>Presentation Mode</span>
                                <p>{profileData.presentationMode}</p>
                            </div>
                        </div>
                        <div className="ticket-info-row">
                            <FaRegBuilding />
                            <div>
                                <span>Organisation</span>
                                <p>{profileData.participants[0]?.organisation}</p>
                            </div>
                        </div>
                    </div>
                    <div className="ticket-qr-code">
                        <FaQrcode />
                        <p>Scan for Entry</p>
                    </div>
                </div>

                {/* --- Ticket Footer (Payment) --- */}
                <div className="ticket-footer">
                    <div className={`ticket-payment-status ${paymentInfo.className}`}>
                        {paymentInfo.icon}
                        <div>
                            <span>Payment Status</span>
                            <p>{paymentInfo.status}</p>
                        </div>
                    </div>
                    <div className="ticket-transaction">
                        <span>Transaction ID</span>
                        <p>{paymentInfo.transactionId}</p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TicketPage;