import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Hourglass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
/* The line connecting the dots */
.st-timeline-item:not(:last-child)::before {
    content: '';
    position: absolute;
    top: 22px; /* Start below the icon center */
    left: 22px; /* Center with the icon */
    width: 2px;
    height: 100%;
    background-color: var(--surface-dark);
    transform: translateX(-50%);
    transition: background-color 0.4s ease;
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
    transition: border-color 0.4s ease;
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
.status-icon.active { color: var(--brand-orange); animation: pulse 1.5s infinite; }
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
    color: var(--text-secondary); /* Default to gray */
    margin: 0 0 0.25rem;
    transition: color 0.4s ease;
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
.st-error-message {
    text-align: center;
    padding: 4rem 1rem;
    font-size: 1.2rem;
    color: var(--text-secondary);
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
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

// --- Payment Modal Component ---
const PaymentModal = ({ onClose, onSubmit, discount }) => {
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv) {
            alert("Please fill all payment fields.");
            return;
        }

        onSubmit();
    };

    const calculateAmount = () => {
        const baseAmount = 100;
        return discount ? baseAmount * 0.8 : baseAmount;
    };

    return (
        <div className="st-modal-overlay" onClick={onClose}>
            <div className="st-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="st-modal-title">Payment Gateway</h3>
                
                <div style={{ marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                    <strong>Payment Amount: ${calculateAmount()}</strong>
                    {discount && <span style={{ color: 'green', marginLeft: '0.5rem' }}>(20% discount applied!)</span>}
                </div>

                <form onSubmit={handleSubmit} className="st-modal-form">
                    <div>
                        <label htmlFor="cardNumber" className="st-form-label">Card Details</label>
                        <div className="st-payment-grid">
                            <input 
                                type="text" 
                                id="cardNumber" 
                                placeholder="Card Number" 
                                className="st-form-input" 
                                required 
                                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} 
                            />
                            <input 
                                type="text" 
                                id="expiry" 
                                placeholder="MM/YY" 
                                className="st-form-input" 
                                required 
                                onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})} 
                            />
                            <input 
                                type="text" 
                                id="cvv" 
                                placeholder="CVV" 
                                className="st-form-input" 
                                required 
                                onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})} 
                            />
                        </div>
                    </div>

                    <button type="submit" className="st-modal-submit-btn">
                        Pay ${calculateAmount()}
                    </button>
                </form>
            </div>
        </div>
    );
};

// --- Main Status Tracker Component ---
const SubmissionStatusTracker = () => {
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStatusData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                setError("Please log in to view your submission status.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch("https://it-con-backend.onrender.com/api/users/me", {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) {
                    throw new Error("Could not fetch submission status. Please try again.");
                }

                const data = await response.json();
                console.log('Fetched data:', data);
                setStatusData({
                    abstractStatus: data.abstractStatus,
                    paperStatus: data.paperStatus,
                    paymentStatus: data.paymentStatus,
                    discount: data.discount
                });

            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStatusData();
    }, []);
    
    const stages = [
        { id: 0, title: 'Abstract Submission' },
        { id: 1, title: 'Abstract Review' },
        { id: 2, title: 'Paper Submission' },
        { id: 3, title: 'Paper Review' },
        { id: 4, title: 'Payment' },
        { id: 5, title: 'Registration Complete' }
    ];

    const getStatusStep = () => {
        if (!statusData) return 0;
        
        const { abstractStatus, paperStatus, paymentStatus } = statusData;

        console.log('Calculating status step:', { abstractStatus, paperStatus, paymentStatus });

        // Stage 0: No abstract submitted
        if (abstractStatus === "No Abstract") return 0;

        // Stage 1: Abstract submitted and under review
        if (abstractStatus === "Under Review") return 1;

        // Stage 1 (Rejected): Abstract rejected - stop here
        if (abstractStatus === "Rejected") return 1;

        // Stage 2: Abstract approved, no paper submitted
        if (abstractStatus === "Approved" && (paperStatus === "No Paper" || !paperStatus)) return 2;

        // Stage 3: Paper submitted and under various statuses
        if (paperStatus === "Submitted" || paperStatus === "Under Review" || paperStatus === "Correction") return 3;

        // Stage 3 (Rejected): Paper rejected - stop here
        if (paperStatus === "Rejected") return 3;

        // Stage 4: Paper approved, payment pending
        if (paperStatus === "Approved" && paymentStatus === "unpaid") return 4;

        // Stage 5: Paper approved, payment completed - FINAL STAGE
        if (paperStatus === "Approved" && paymentStatus === "paid") return 5;

        // Fallback: if abstract is approved but paper status is unexpected, assume stage 2
        if (abstractStatus === "Approved") return 2;

        return 0;
    };
    
    const currentStatusIndex = getStatusStep();
    const isAbstractRejected = statusData?.abstractStatus === 'Rejected';
    const isPaperRejected = statusData?.paperStatus === 'Rejected';

    console.log('Current status index:', currentStatusIndex);

    const getStatusDescription = (index) => {
        if (!statusData) {
             if (index === 0) return "Submit your abstract to begin the review process.";
             return "";
        }

        const { abstractStatus, paperStatus, paymentStatus } = statusData;

        switch(index) {
            case 0: 
                return abstractStatus === "No Abstract" 
                    ? "Submit your abstract to begin the review process."
                    : "Your abstract has been successfully submitted.";
                    
            case 1: 
                if (isAbstractRejected) {
                    return "Unfortunately, your abstract was not accepted. Please check your email for feedback.";
                }
                if (abstractStatus === "Under Review") {
                    return "Our committee is currently reviewing your abstract submission.";
                }
                return "Abstract review completed.";
                
            case 2: 
                if (isAbstractRejected) {
                    return "This step is unavailable as your abstract was not accepted.";
                }
                if (paperStatus === "No Paper" || !paperStatus) {
                    return "Congratulations! Your abstract has been accepted. Please submit your full paper.";
                }
                return "Ready for paper submission.";
                
            case 3: 
                if (isAbstractRejected) {
                    return "This step is unavailable as your abstract was not accepted.";
                }
                if (isPaperRejected) {
                    return "Unfortunately, your paper was not accepted. Please check your email for feedback.";
                }
                if (paperStatus === "Submitted" || paperStatus === "Under Review") {
                    return "Your paper has been submitted and is under review by our committee.";
                }
                if (paperStatus === "Correction") {
                    return "Corrections are required for your paper. Please check your email for details.";
                }
                if (paperStatus === "Approved") {
                    return "Your paper has been approved! Please proceed to payment.";
                }
                return "Paper review in progress.";
                
            case 4: 
                if (isAbstractRejected || isPaperRejected) {
                    return "This step is unavailable as your submission was not accepted.";
                }
                if (paymentStatus === "unpaid") {
                    return "Your paper has been approved! Please complete the payment to finalize your registration.";
                }
                return "Payment processing...";
                
            case 5: 
                return "Congratulations! Your registration is complete! We look forward to seeing you at the conference!";
                
            default: 
                return "";
        }
    };

    const getStatusIcon = (index) => {
        if (index < currentStatusIndex) return <CheckCircle className="status-icon completed" />;
        if (index === currentStatusIndex) {
            if ((isAbstractRejected && index === 1) || (isPaperRejected && index === 3)) {
                return <XCircle className="status-icon rejected" />;
            }
            return <Hourglass className="status-icon active" />;
        }
        return <div className="status-icon pending" />;
    };

    const showActionButton = (index) => {
        if (!statusData) return false;
        
        const { abstractStatus, paperStatus, paymentStatus } = statusData;

        // Show paper submission button at stage 2 - redirects to /paper-submission
        if (index === 2 && abstractStatus === "Approved" && (paperStatus === "No Paper" || !paperStatus)) {
            return true;
        }

        // Show payment button at stage 4 - opens payment modal
        if (index === 4 && paperStatus === "Approved" && paymentStatus === "unpaid") {
            return true;
        }

        return false;
    };

    const getButtonText = (index) => {
        if (index === 2) return 'Submit Paper';
        if (index === 4) return 'Complete Payment';
        return 'Continue';
    };

    const handleActionButtonClick = (stageIndex) => {
        if (stageIndex === 2) {
            // Redirect to paper submission page
            navigate('/paper-submission');
        } else if (stageIndex === 4) {
            // Open payment modal
            setIsPaymentModalOpen(true);
        }
    };

    const handlePaymentSubmit = async () => {
        console.log('Payment submitted');
        
        // Update local state
        setStatusData(prev => ({ 
            ...prev, 
            paymentStatus: 'paid'
        }));
        
        setIsPaymentModalOpen(false);
        
        // Here you would make actual API call for payment
        // await fetch('/api/process-payment', { method: 'POST', body: paymentData });
    };

    if (loading) {
        return (
            <React.Fragment>
                <style>{componentStyles}</style>
                <main className="st-page"><Loader /></main>
            </React.Fragment>
        );
    }
    if (error) {
        return (
            <React.Fragment>
                <style>{componentStyles}</style>
                <div className="st-error-message">{error}</div>
            </React.Fragment>
        );
    }
    
    return (
        <React.Fragment>
            <style>{componentStyles}</style>
            <main className="st-page">
                <div className="st-container">
                    <header className="st-header">
                        <h1>Submission Status</h1>
                        <p>Track the progress of your paper submission from abstract review to final acceptance.</p>
                    </header>

                    <div className="st-timeline">
                        {stages.map((stage, index) => (
                            <div 
                                key={stage.id} 
                                className={`st-timeline-item 
                                    ${index < currentStatusIndex ? 'completed' : ''} 
                                    ${index === currentStatusIndex ? 'active' : ''}
                                    ${(isAbstractRejected && index === 1) ? 'rejected' : ''}
                                    ${(isPaperRejected && index === 3) ? 'rejected' : ''}`
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
                                    
                                    {showActionButton(index) && (
                                        <button 
                                            onClick={() => handleActionButtonClick(index)}
                                            className="st-gateway-btn"
                                        >
                                            {getButtonText(index)}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {isPaymentModalOpen && (
                    <PaymentModal 
                        onClose={() => setIsPaymentModalOpen(false)}
                        onSubmit={handlePaymentSubmit}
                        discount={statusData?.discount}
                    />
                )}
            </main>
        </React.Fragment>
    );
};

export default SubmissionStatusTracker;