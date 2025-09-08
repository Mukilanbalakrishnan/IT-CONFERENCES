import React, { useState, useEffect } from 'react';

// This component includes its own styles for a self-contained setup.
const componentStyles = `
/* --- Global Styles & Variables --- */
:root {
    --brand-dark-bg: #1C1C1E;
    --brand-light-bg: #FFFFFF; /* Using a clean white background */
    --brand-accent-blue: #0A84FF;
    --brand-green: #34C759;
    --brand-red: #FF3B30; /* Red for rejection status */
    --text-light-primary: #FFFFFF;
    --text-light-secondary: #EBEBF599;
    --text-dark-primary: #000000;
    --text-dark-secondary: #3C3C4399;
    --timeline-line-color: #E5E5EA;
}

/* --- Main Tracker Layout --- */
.tracker-container {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: var(--brand-light-bg);
    width: 100%;
    max-width: 800px;
    margin: 4rem auto 5rem;
    border-radius: 1.5rem;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
    overflow: hidden;
}

.tracker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.5rem;
}
@media (min-width: 640px) {
    .tracker-header {
        padding: 2rem 2.5rem;
    }
}

.header-date .date-main {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-dark-secondary);
}
@media (min-width: 640px) {
    .header-date .date-main {
        font-size: 1.125rem;
    }
}

.header-date .date-day {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-dark-primary);
    line-height: 1.1;
}
@media (min-width: 640px) {
    .header-date .date-day {
        font-size: 2.25rem;
    }
}

.user-profile {
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    background-image: url('https://i.pravatar.cc/100');
    background-size: cover;
}
@media (min-width: 640px) {
    .user-profile {
        width: 50px;
        height: 50px;
    }
}

/* --- Calendar Strip --- */
.calendar-strip {
    display: flex;
    justify-content: space-around;
    padding: 0 1.5rem;
    margin-bottom: 2.5rem;
}
@media (min-width: 640px) {
    .calendar-strip {
        padding: 0 2.5rem;
    }
}

.calendar-day {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
    border-radius: 1rem;
    width: 12%;
    max-width: 50px;
}
.day-abbr {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-dark-secondary);
}
.day-num {
    font-size: 1.125rem;
    font-weight: 700;
    color: var(--text-dark-primary);
}
.calendar-day.active {
    background-color: var(--brand-dark-bg);
}
.calendar-day.active .day-abbr, .calendar-day.active .day-num {
    color: var(--text-light-primary);
}

/* --- Timeline --- */
.timeline {
    position: relative;
    list-style: none;
    padding: 0 1.5rem 1rem;
    margin: 0;
}
@media (min-width: 640px) {
    .timeline {
        padding: 0 2.5rem 1.5rem;
    }
}

.timeline::before {
    content: '';
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 1.5rem;
    transform: translateX(-50%);
    width: 2px;
    background-color: #E5E5EA;
}
@media (min-width: 640px) {
    .timeline::before {
        left: 2.5rem;
    }
}

.timeline-item {
    position: relative;
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
}
.timeline-item:not(:last-child) {
    padding-bottom: 1rem;
}
.timeline-dot {
    position: relative;
    z-index: 1;
    width: 14px;
    height: 14px;
    border-radius: 9999px;
    background-color: var(--brand-light-bg);
    border: 2px solid #E5E5EA;
    flex-shrink: 0;
    margin-top: 4px;
}
.timeline-item.completed .timeline-dot {
    background-color: var(--brand-dark-bg);
    border-color: var(--brand-dark-bg);
}
.timeline-item.rejected .timeline-dot {
    background-color: var(--brand-red);
    border-color: var(--brand-red);
}
.timeline-item.rejected .timeline-dot::after {
    content: '×';
    color: white;
    font-weight: 700;
    font-size: 1.1rem;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.timeline-content {
    width: 100%;
}

.timeline-card {
    border-radius: 1.25rem;
    padding: 1.25rem;
    margin-bottom: 1rem;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.timeline-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);
}
.timeline-card.active {
    background-color: var(--brand-dark-bg);
    color: var(--text-light-primary);
}
.timeline-card .card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.timeline-card .card-title {
    font-size: 1.25rem;
    font-weight: 700;
}
.timeline-card .card-time {
    font-size: 0.875rem;
    font-weight: 600;
}
.timeline-card .card-description {
    font-size: 0.875rem;
    margin: 0.25rem 0 1.25rem 0;
}
.timeline-card.active .card-description {
    color: var(--text-light-secondary);
}
.timeline-card .card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.avatar-group img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 2px solid var(--brand-dark-bg);
    margin-left: -10px;
}
.avatar-group img:first-child {
    margin-left: 0;
}
.card-status-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--brand-green);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 600;
}
.simple-item .item-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-dark-primary);
}
.simple-item.rejected .item-title {
    color: var(--brand-red);
}
.simple-item .item-description {
    font-size: 0.875rem;
    color: var(--text-dark-secondary);
}
.simple-item .item-time {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-dark-secondary);
}
.simple-item-content {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-top: 2px;
}

/* --- Gateway Button --- */
.gateway-button {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.75rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: var(--brand-accent-blue);
    color: white;
}
.gateway-button:disabled {
    background-color: #AEAEB2;
    cursor: not-allowed;
}

/* --- Modal Styles --- */
.modal-overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0,0,0, 0.5);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    z-index: 50;
}
.modal-content {
    background-color: white;
    border-radius: 1.5rem;
    max-width: 28rem;
    width: 100%;
    padding: 2rem;
}
.modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
}
.modal-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}
.form-label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
}
.form-input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #C7C7CC;
    border-radius: 0.5rem;
    box-sizing: border-box;
}
.payment-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 0.75rem;
}
.modal-submit-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    background-color: var(--brand-accent-blue);
    color: white;
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
        <div className="modal-overlay" onClick={onClose}>
             <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="modal-title">Submission Gateway</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div>
                        <label htmlFor="cardNumber" className="form-label">Card Details</label>
                        <div className="payment-grid">
                            <input type="text" id="cardNumber" placeholder="Card Number" className="form-input" required onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})} />
                            <input type="text" id="expiry" placeholder="MM/YY" className="form-input" required onChange={(e) => setPaymentDetails({...paymentDetails, expiry: e.target.value})} />
                            <input type="text" id="cvv" placeholder="CVV" className="form-input" required onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})} />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="paperFile" className="form-label">Upload Full Paper (PDF)</label>
                        <input type="file" id="paperFile" accept=".pdf" className="form-input" required onChange={(e) => setPaperFile(e.target.files[0])} />
                    </div>
                    <button type="submit" className="modal-submit-btn">Submit & Pay</button>
                </form>
            </div>
        </div>
    );
};


// --- Main Status Tracker Component ---
const SubmissionStatusTracker = ({ initialStatus = 2, isRejected = false }) => {
    // This state would be fetched from a backend, but is controlled by props for this demo.
    const [currentStatus, setCurrentStatus] = useState(initialStatus);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const baseStages = [
        { id: 0, title: 'Abstract Submission', time: '9.00 AM' },
        { id: 1, title: 'Abstract Under Review', time: '9.00 AM' },
        { id: 2, title: 'Abstract Selection', time: '9.00 AM' },
        { id: 3, title: 'Paper & Payment', time: '9.00 AM' },
        { id: 4, title: 'Conference', time: '9.00 AM' }
    ];

    const getDynamicStages = (status, rejected) => {
        return baseStages.map((stage, index) => {
            let description = '';
            if (index === 0) {
                description = status < 0 ? 'Your abstract has not yet been submitted.' : 'We have received your abstract.';
            } else if (index === 1) {
                description = status < 1 ? 'Waiting for submission...' : 'Our committee is reviewing your submission.';
            } else if (index === 2) {
                if (status < 2) description = 'Waiting for review...';
                else if (rejected) description = 'Unfortunately, your abstract was not selected for presentation.';
                else description = 'Congratulations! Please proceed to the payment and paper submission gateway.';
            } else if (index === 3) {
                 if (status < 3) description = 'Waiting for selection...';
                 else description = 'Thank you for submitting your paper and completing the payment.';
            } else if (index === 4) {
                description = status < 4 ? 'Waiting for paper submission...' : 'Your registration is complete. We look forward to seeing you!';
            }
            return { ...stage, description };
        });
    };
    
    const stages = getDynamicStages(currentStatus, isRejected);
    
    // --- Live Date & Calendar Logic ---
    const [today] = useState(new Date()); 
    const [week, setWeek] = useState([]);

    useEffect(() => {
        const current = new Date();
        const dayOfWeek = current.getDay();
        const startOfWeek = new Date(current);
        startOfWeek.setDate(current.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
        const weekDates = Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
        setWeek(weekDates);
    }, []);

    const handleModalSubmit = (fileName) => {
        console.log(`Paper submitted: ${fileName}`);
        setCurrentStatus(3); // Update status after successful submission
        setIsModalOpen(false);
    };

    const renderTimelineItem = (stage, index) => {
        const isCompleted = index < currentStatus;
        const isActive = index === currentStatus;
        const isRejectedAndActive = isRejected && isActive;

        if (isActive) {
            return (
                <li key={index} className={`timeline-item ${isRejectedAndActive ? 'rejected' : 'active'}`}>
                    <div className="timeline-dot"></div>
                    <div className="timeline-content">
                        <div className={`timeline-card ${isActive && !isRejectedAndActive ? 'active' : ''}`}>
                            <div className="card-header">
                                <span className="card-title">{stage.title}</span>
                                <span className="card-time">{stage.time}</span>
                            </div>
                            <p className="card-description">{stage.description}</p>
                            {isActive && !isRejectedAndActive && (
                                <div className="card-footer">
                                    <div className="avatar-group">
                                        <img src="https://i.pravatar.cc/50?img=1" alt="avatar" />
                                        <img src="https://i.pravatar.cc/50?img=2" alt="avatar" />
                                        <img src="https://i.pravatar.cc/50?img=3" alt="avatar" />
                                    </div>
                                    <div className="card-status-icon">✓</div>
                                </div>
                            )}
                        </div>
                        {index === 2 && !isRejected && (
                            <button onClick={() => setIsModalOpen(true)} className="gateway-button" disabled={currentStatus > 2}>
                                {currentStatus > 2 ? 'Submission Complete' : 'Proceed to Gateway'}
                            </button>
                        )}
                    </div>
                </li>
            );
        }

        return (
             <li key={index} className={`timeline-item ${isCompleted ? 'completed' : ''}`}>
                <div className="timeline-dot"></div>
                <div className="timeline-content simple-item">
                     <div className="simple-item-content">
                        <div>
                           <h4 className="item-title">{stage.title}</h4>
                           <p className="item-description">{stage.description}</p>
                        </div>
                        <span className="item-time">{stage.time}</span>
                    </div>
                </div>
            </li>
        );
    };

    return (
        <React.Fragment>
            <style>{componentStyles}</style>
            <div className="tracker-container">
                <div className="tracker-header">
                    <div className="header-date">
                        <p className="date-main">{today.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                        <h2 className="date-day">Today</h2>
                    </div>
                    <div className="user-profile"></div>
                </div>

                <div className="calendar-strip">
                    {week.map((date, i) => (
                        <div key={i} className={`calendar-day ${date.toDateString() === today.toDateString() ? 'active' : ''}`}>
                            <span className="day-abbr">{date.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                            <span className="day-num">{date.getDate()}</span>
                        </div>
                    ))}
                </div>

                <ul className="timeline">
                    {stages.map((stage, index) => renderTimelineItem(stage, index))}
                </ul>
            </div>

            {isModalOpen && <PaymentSubmissionModal onClose={() => setIsModalOpen(false)} onSubmit={handleModalSubmit} />}
        </React.Fragment>
    );
};

export default SubmissionStatusTracker;

