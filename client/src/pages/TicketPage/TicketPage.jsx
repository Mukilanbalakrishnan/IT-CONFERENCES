import React, { useState, useEffect, useRef } from 'react';
import './TicketPage.css';
import {
    FaTicketAlt, FaIdCard, FaCalendarAlt,
    FaBuilding, FaEnvelope, FaDownload
} from 'react-icons/fa';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import base_url from "../../config";

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
                crossOrigin="anonymous" 
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

// Function to extract numeric part from userId like "IC6850" -> "6850"
const extractNumericUserId = (userid) => {
    if (!userid) return '';
    // Remove non-numeric characters and return
    return userid.replace(/\D/g, '');
};

// Main Ticket Page Component
const TicketPage = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // State for download button
    const [isDownloading, setIsDownloading] = useState(false);
    
    // Ref for the ticket element
    const ticketRef = useRef(null);

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
                setTimeout(() => setIsLoading(false), 1000);
            }
        };

        fetchProfileData();
    }, []);

    // PDF Download Function
    const handleDownloadPdf = async () => {
        const element = ticketRef.current;
        if (!element) return;

        setIsDownloading(true);

        try {
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('conference-ticket.pdf');

        } catch (err) {
            console.error("Error generating PDF:", err);
            setError("Could not download ticket. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    if (isLoading) return <Loader />;
    if (error) return <div className="profile-page-error">Error: {error}</div>;

    // Get the actual user ID from profile data
    const actualUserId = profileData?.userid || '';

    // Create simple QR code data
    const qrData = JSON.stringify({
        id: profileData.userid,
        numericUserId: actualUserId,
        event: "IT Conference 2024",
        type: "attendee"
    });

    return (
        <main className="ticket-page-container">
            <header className="tp-header">
                <h1>Your Conference Ticket</h1>
                <p>This is your official pass. Please have it ready for scanning.</p>
                
                {/* Download Button */}
                <button 
                    className="download-btn"
                    onClick={handleDownloadPdf} 
                    disabled={isDownloading}
                >
                    {isDownloading ? 'Downloading...' : (
                        <>
                            <FaDownload /> Download Ticket (PDF)
                        </>
                    )}
                </button>
            </header>

            {/* Ticket wrapper with ref for PDF generation */}
            <div className="ticket-wrapper" ref={ticketRef}>
                {/* Ticket Body */}
                <div className="ticket-body">
                    <div className="ticket-body-header">
                        <div className="ticket-brand">
                            <FaTicketAlt />
                            <h3>IT CONFERENCE PASS</h3>
                        </div>
                        <h1 className="ticket-title">DIGITAL ACCESS PASS</h1>
                    </div>

                    <div className="ticket-main-content">
                        <div className="primary-info">
                            {/* Display the actual User ID prominently */}
                            <div className="primary-info-item user-id-highlight">
                                <span className="ticket-label">
                                    <FaIdCard />
                                    USER ID
                                </span>
                                <p className="ticket-value-large user-id-number">{actualUserId}</p>
                             
                            </div>

                            <div className="primary-info-item">
                                <span className="ticket-label">
                                    SELECTED TRACK
                                </span>
                                <p className="ticket-value-large">{profileData.track || 'Track 1'}</p>
                            </div>

                            {/* <div className="primary-info-item">
                                <span className="ticket-label">
                                    <FaIdCard />
                                    UNIQUE ID
                                </span>
                                <p className="ticket-value-mono">{profileData._id}</p>
                            </div> */}

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
                                <p className="ticket-value-mono">IT Conference 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TicketPage;