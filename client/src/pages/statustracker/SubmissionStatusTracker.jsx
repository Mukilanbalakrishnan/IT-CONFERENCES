import React, { useState, useEffect } from 'react';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

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
    margin-top: -6rem;
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
}

.st-timeline-item.completed:not(:last-child)::before {
    background-color: var(--brand-blue-primary);
}

.st-timeline-connector {
    flex-shrink: 0;
    margin-right: 1.5rem;
}

.st-status-icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background-color: var(--white);
    position: relative;
    z-index: 1;
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
    color: var(--text-primary);
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

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}
`;

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
const SubmissionStatusTracker = ({ initialStatus = 2, isRejected = false }) => {
    const [currentStatus, setCurrentStatus] = useState(initialStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const stages = [
        { id: 0, title: 'Abstract Submission', description: 'Your abstract has been successfully received by our team.' },
        { id: 1, title: 'Under Review', description: 'Our committee is carefully reviewing your submission.' },
        { id: 2, title: 'Selection Announcement', description: 'Congratulations! Your abstract has been accepted. Please proceed to the next step.' },
        { id: 3, title: 'Full Paper & Payment', description: 'Thank you for submitting your paper and completing the payment.' },
        { id: 4, title: 'Conference Registration Complete', description: 'Your registration is complete. We look forward to seeing you!' }
    ];
    
    if (isRejected) {
        stages[2].description = 'Unfortunately, your abstract was not selected for presentation at this time.';
    }

    const handleModalSubmit = (fileName) => {
        console.log(`Paper submitted: ${fileName}`);
        setCurrentStatus(4); // Move to the final stage after submission
        setIsModalOpen(false);
    };
    
    const getStatusIcon = (index) => {
        if (index < currentStatus) {
            return <FaCheckCircle className="status-icon completed" />;
        }
        if (index === currentStatus) {
            if(isRejected) {
                 return <FaTimesCircle className="status-icon rejected" />;
            }
            return <FaHourglassHalf className="status-icon active" />;
        }
        return <div className="status-icon pending" />;
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
                                className={`st-timeline-item 
                                    ${index < currentStatus ? 'completed' : ''} 
                                    ${index === currentStatus ? 'active' : ''}
                                    ${isRejected && index === currentStatus ? 'rejected' : ''}`
                                }
                            >
                                <div className="st-timeline-connector">
                                    <div className="st-status-icon-wrapper">
                                        {getStatusIcon(index)}
                                    </div>
                                </div>
                                <div className="st-timeline-content">
                                    <h3 className="st-item-title">{stage.title}</h3>
                                    <p className="st-item-description">{stage.description}</p>
                                    {index === 2 && currentStatus === 2 && !isRejected && (
                                        <button 
                                            onClick={() => setIsModalOpen(true)} 
                                            className="st-gateway-btn"
                                        >
                                            Proceed to Gateway
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

