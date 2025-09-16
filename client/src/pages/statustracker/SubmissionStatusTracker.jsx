import React, { useState, useEffect, useRef } from 'react';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

// This component includes its own styles for a self-contained setup.
const componentStyles = `
/* --- Base Page Styles --- */
.st-page {
    background-color: var(--surface-light);
    padding: clamp(2rem, 5vw, 4rem) 1rem;
    min-height: 100vh;
    font-family: 'Poppins', sans-serif;
}

.st-container {
    max-width: 800px;
    margin: 0 auto;
    background-color: var(--white);
    border-radius: var(--radius);
    box-shadow: var(--shadow-soft);
    padding: clamp(1.5rem, 4vw, 3rem);
    margin-top: -6rem; /* Overlap with header */
}

/* --- Header --- */
.st-header {
    text-align: center;
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--surface-dark);
    padding-bottom: 2rem;
}

.st-header h1 {
    font-size: clamp(2rem, 5vw, 2.5rem);
    color: var(--brand-blue-dark);
    margin: 0 0 0.5rem 0;
}

.st-header p {
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    color: var(--text-secondary);
    max-width: 500px;
    margin: 0 auto;
}

/* --- Timeline --- */
.st-timeline {
    position: relative;
}

.st-timeline-item {
    display: flex;
    position: relative;
}

.st-timeline-item:not(:last-child)::before {
    content: '';
    position: absolute;
    top: 22px; 
    left: 22px; 
    width: 2px;
    height: 100%;
    background-color: var(--surface-dark);
    transform: translateX(-50%);
}

.st-timeline-item.completed:not(:last-child)::before {
    background-color: var(--brand-blue-primary);
}

.st-timeline-connector {
    flex-shrink: 0;
    margin-right: 1.5rem;
    position: relative;
    z-index: 1;
}

.st-status-icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background-color: var(--white);
    border: 2px solid var(--surface-dark);
}

.st-timeline-item.completed .st-status-icon-wrapper {
    border-color: var(--brand-blue-primary);
}
.st-timeline-item.active .st-status-icon-wrapper {
    border-color: var(--brand-orange);
}
.st-timeline-item.rejected .st-status-icon-wrapper {
    border-color: var(--brand-red);
}


.status-icon {
    font-size: 1.5rem;
}

.status-icon.completed { color: var(--brand-blue-primary); }
.status-icon.active { color: var(--brand-orange); }
.status-icon.rejected { color: var(--brand-red); }
.status-icon.pending {
    width: 14px;
    height: 14px;
    background-color: var(--surface-dark);
    border-radius: 50%;
}


.st-timeline-content {
    padding-bottom: 2.5rem;
    width: 100%;
}

.st-item-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-secondary);
    margin: 0 0 0.25rem;
}

.st-timeline-item.completed .st-item-title,
.st-timeline-item.active .st-item-title {
    color: var(--brand-blue-dark);
}
.st-timeline-item.rejected.active .st-item-title {
    color: var(--brand-red);
}

.st-item-description {
    color: var(--text-secondary);
    margin: 0;
}

.st-gateway-btn {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background-color: var(--brand-orange);
    color: var(--white);
    transition: all 0.2s ease;
}

.st-gateway-btn:hover {
    background-color: var(--brand-orange-dark);
    transform: translateY(-2px);
}
.st-gateway-btn:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
}

/* --- Modal Styles --- */
.st-modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0, 0.6);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 50;
}
.st-modal-content {
    background-color: white;
    border-radius: 1rem;
    max-width: 28rem;
    width: 100%;
    padding: 2rem;
}
.st-modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--brand-blue-dark);
}
.st-modal-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}
.st-form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-primary);
}
.st-form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--surface-dark);
    border-radius: 0.5rem;
    box-sizing: border-box;
}
.st-payment-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 0.75rem;
}
.st-modal-submit-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background-color: var(--brand-orange);
    color: white;
    transition: background-color 0.2s;
}
.st-modal-submit-btn:hover {
    background-color: var(--brand-orange-dark);
}

.st-loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem 1rem;
    min-height: 300px;
}
.st-loader {
    display: flex;
    gap: 0.5rem;
}
.st-loader-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: var(--brand-orange);
    animation: st-loader-bounce 0.6s infinite alternate;
}
.st-loader-dot:nth-child(2) {
    animation-delay: 0.2s;
}
.st-loader-dot:nth-child(3) {
    animation-delay: 0.4s;
}
.st-loading-text {
    margin-top: 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: var(--text-secondary);
}

@keyframes st-loader-bounce {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-10px);
    }
}
`;

// --- Loader Component ---
const Loader = () => (
    <div className="st-loading-container">
        <div className="st-loader">
            <div className="st-loader-dot"></div>
            <div className="st-loader-dot"></div>
            <div className="st-loader-dot"></div>
        </div>
        <p className="st-loading-text">Loading your status...</p>
    </div>
);


// --- Payment & Submission Modal Component ---
const PaymentSubmissionModal = ({ onClose, onSubmit }) => {
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
    const [paperFile, setPaperFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentDetails.cardNumber && paymentDetails.expiry && paymentDetails.cvv && paperFile) {
            onSubmit(paperFile.name);
        } else {
            alert("Please fill all fields and upload your paper.");
        }
    };

    return (
        <div className="st-modal-overlay" onClick={onClose}>
            <div className="st-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="st-modal-title">Submission Gateway</h3>
                <form onSubmit={handleSubmit} className="st-modal-form">
                    <div>
                        <label htmlFor="cardNumber" className="st-form-label">Card Details</label>
                        <div className="st-payment-grid">
                            <input type="text" id="cardNumber" placeholder="Card Number" className="st-form-input" required onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} />
                            <input type="text" id="expiry" placeholder="MM/YY" className="st-form-input" required onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})} />
                            <input type="text" id="cvv" placeholder="CVV" className="st-form-input" required onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="paperFile" className="st-form-label">Upload Full Paper (PDF)</label>
                        <input type="file" id="paperFile" accept=".pdf" className="st-form-input" required onChange={(e) => setPaperFile(e.target.files[0])} />
                    </div>
                    <button type="submit" className="st-modal-submit-btn">Submit & Pay</button>
                </form>
            </div>
        </div>
    );
};


// --- Main Status Tracker Component ---
const SubmissionStatusTracker = () => {
    const [submissionData, setSubmissionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch data effect
    useEffect(() => {
        const fetchStatus = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Please log in to view your submission status.");
                setLoading(false);
                return;
            }

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                const response = await fetch("https://it-con-backend.onrender.com/api/users/me", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error("Could not fetch submission status. Please try again.");
                }

                const data = await response.json();
                setSubmissionData(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);
    

    const handleModalSubmit = async (fileName) => {
        console.log(`Paper submitted: ${fileName}`);
        setSubmissionData(prev => ({ ...prev, paymentStatus: 'approved', finalPaperStatus: 'approved' }));
        setIsModalOpen(false);
    };
    
    const stages = [
        { id: 0, title: 'Abstract Submission' },
        { id: 1, title: 'Under Review' },
        { id: 2, title: 'Selection Announcement' },
        { id: 3, title: 'Full Paper & Payment' },
        { id: 4, title: 'Conference Registration Complete' }
    ];

    const statusMap = { 'pending': 1, 'under review': 2, 'approved': 3, 'rejected': 3 };
    
    let currentStatusIndex = 0;
    if (submissionData) {
      currentStatusIndex = statusMap[submissionData.abstractStatus] || 1;
      if (submissionData.abstractStatus === 'approved') {
        currentStatusIndex = 3;
        if (submissionData.finalPaperStatus === 'approved') {
          currentStatusIndex = 4;
          if (submissionData.paymentStatus === 'approved') {
            currentStatusIndex = 5;
          }
        }
      }
    }
    
    const isRejected = submissionData?.abstractStatus === 'rejected' || submissionData?.finalPaperStatus === 'rejected';

    const getStatusDescription = (index) => {
        if (!submissionData) return "Please submit your abstract to begin.";
        switch(index) {
            case 0: return "Your abstract has been successfully received by our team.";
            case 1: return "Our committee is carefully reviewing your submission.";
            case 2: return isRejected ? `Unfortunately, your submission was not accepted. Reason: ${submissionData.rejectedReason || 'Not provided.'}` : "Congratulations! Your abstract has been accepted.";
            case 3: return "Thank you for submitting your paper and completing payment.";
            case 4: return "Your registration is complete. We look forward to seeing you!";
            default: return "";
        }
    };
    
    const getStatusIcon = (index) => {
        if (index < currentStatusIndex - 1) return <FaCheckCircle className="status-icon completed" />;
        if (index === currentStatusIndex - 1) {
             if (isRejected) return <FaTimesCircle className="status-icon rejected" />;
            return <FaHourglassHalf className="status-icon active" />;
        }
        return <div className="status-icon pending" />;
    }

    if (loading) {
        return (
            <React.Fragment>
                <style>{componentStyles}</style>
                <main className="st-page"><Loader /></main>
            </React.Fragment>
        );
    }
    if (error) {
        return <div className="st-error-message">{error}</div>;
    }
    if (!submissionData) {
        return <div className="st-error-message">You have not submitted an abstract yet.</div>
    }

    return (
        <React.Fragment>
            <style>{componentStyles}</style>
            <main className="st-page">
                <div className="st-container">
                    <header className="st-header">
                        <h1>Submission Status</h1>
                        <p>Track the progress of your paper submission from review to final acceptance.</p>
                    </header>

                    <div className="st-timeline">
                        {stages.map((stage, index) => (
                            <div 
                                key={stage.id} 
                                className={`st-timeline-item completed
                                    ${index < currentStatusIndex -1 ? 'completed' : ''} 
                                    ${index === currentStatusIndex - 1 ? 'active' : ''}
                                    ${isRejected && index === 2 ? 'rejected' : ''}`
                                }
                            >
                                <div className="st-timeline-connector">
                                    <div className="st-status-icon-wrapper">
                                        {getStatusIcon(index)}
                                    </div>
                                </div>
                                <div className="st-timeline-content">
                                    <h3 className="st-item-title">{stage.title}</h3>
                                    <p className="st-item-description">{getStatusDescription(index)}</p>
                                    {index === 2 && currentStatusIndex === 3 && !isRejected && (
                                        <button 
                                            onClick={() => setIsModalOpen(true)} 
                                            className="st-gateway-btn"
                                            disabled={currentStatusIndex > 3}
                                        >
                                            {currentStatusIndex > 3 ? 'Submission Complete' : 'Proceed to Gateway'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {isModalOpen && <PaymentSubmissionModal onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} />}
            </main>
        </React.Fragment>
    );
};

export default SubmissionStatusTracker;

