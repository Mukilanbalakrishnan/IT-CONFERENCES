import React from 'react';
import './TeamProfile.css';
import { FaUser, FaFileAlt, FaCreditCard, FaEnvelope, FaPhone, FaUsers, FaGlobe } from 'react-icons/fa';
import axios from 'axios';
import { useState, useEffect } from 'react';

// --- ✅ New Loader Component ---
const Loader = () => (
    <div className="loader-container">
        <div className="loader-dots">
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
            <div className="loader-dot"></div>
        </div>
        <p className="loader-text">Loading Profile...</p>
    </div>
);

// --- Main Component ---
const TeamProfile = () => {
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => { // Using a timer to make loader visible
            const fetchProfileData = async () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Authentication token not found. Please log in.');

        const response = await axios.get('https://it-con-backend.onrender.com/api/users/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        console.log("Profile Data from API:", response.data);
        const data = response.data.user || response.data; // ✅ handles nested object
        if (!data) throw new Error('No profile data found in the API response.');
        
        setProfileData(data);
    } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch profile data.');
    } finally {
        setIsLoading(false);
    }
};

            fetchProfileData();
        }, 1500); // 1.5-second delay to demonstrate loader

        return () => clearTimeout(timer);
    }, []);

    // --- Use the new Loader component ---
    if (isLoading) return <Loader />;
    if (error) return <div className="profile-page-error">Error: {error}</div>;

    const statusSteps = [
        { name: 'Abstract', status: profileData.abstractStatus === 'approved' ? 'completed' : (profileData.abstractStatus === 'rejected' ? 'rejected' : 'upcoming'), details: `Status: ${profileData.abstractStatus || 'Pending'}`, icon: <FaFileAlt /> },
        { name: 'Final Paper', status: profileData.finalPaperStatus === 'approved' ? 'completed' : (profileData.finalPaperStatus === 'rejected' ? 'rejected' : 'upcoming'), details: `Status: ${profileData.finalPaperStatus || 'Pending'}`, icon: <FaFileAlt /> },
        { name: 'Payment', status: profileData.paymentStatus === 'approved' ? 'completed' : (profileData.paymentStatus === 'rejected' ? 'rejected' : 'upcoming'), details: `Status: ${profileData.paymentStatus || 'Pending'}`, icon: <FaCreditCard /> },
    ];

    const UserDetail = ({ icon, label, value }) => (
        <div className="user-detail-item"><div className="user-detail-icon">{icon}</div><div className="user-detail-text"><span>{label}</span><p>{value}</p></div></div>
    );

    return (
        <main className="profile-page-container">
            <header className="tp-header">
                <h1>Team Profile</h1>
                <p>An overview of your registration and participant details.</p>
            </header>
            
            <div className="profile-grid">
                {/* --- User Profile Card --- */}
                <section className="card user-profile-card">
                    <div className="user-profile-header">
                        <div className="user-avatar"><FaUser /></div>
                        <div className="user-header-info">
                            <h2>{profileData.name}</h2>
                            <p>{profileData.participants[0]?.designation || 'Lead Participant'}</p>
                            <span className="user-id-badge">{profileData.userId}</span>

                        </div>
                    </div>
                    <div className="user-profile-details">
                        <UserDetail icon={<FaEnvelope />} label="Email Address" value={profileData.email} />
                        <UserDetail icon={<FaPhone />} label="Mobile Number" value={profileData.mobileno} />
                        <UserDetail icon={<FaGlobe />} label="Presentation Mode" value={profileData.presentationMode} />
                    </div>
                </section>
                
                {/* --- Status Tracker --- */}
                <section className="card status-tracker-card">
                    <h3 className="card-title">Registration Status</h3>
                    <div className="status-tracker-grid">
                        {statusSteps.map((step, index) => (
                            <div className={`status-item ${step.status}`} key={index}>
                                <div className="status-item-icon">{step.icon}</div>
                                <div className="status-item-info"><h4>{step.name}</h4><p>{step.details}</p></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* --- Participants Table --- */}
                <section className="card participants-card">
                    <h3 className="card-title"><FaUsers /> Participants</h3>
                    <div className="table-responsive">
                        <table className="participants-table">
                            <thead>
                                <tr>
                                    <th>Name</th><th>Designation</th><th>Organisation</th><th>Email</th><th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {profileData.participants.map((participant, index) => (
                                    <tr key={index}>
                                        <td data-label="Name">{participant.name}</td>
                                        <td data-label="Designation">{participant.designation}</td>
                                        <td data-label="Organisation">{participant.organisation}</td>
                                        <td data-label="Email">{participant.email}</td>
                                        <td data-label="Phone">{participant.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default TeamProfile;