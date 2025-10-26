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
    text-align: center;
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
.st-modal-submit-btn:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
}

/* Bill Styles */
.st-bill-container {
    background: #f8f9fa;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 2px solid #e9ecef;
}
.st-bill-header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 2px dashed #dee2e6;
}
.st-bill-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #2c5530;
    margin: 0 0 0.5rem 0;
}
.st-bill-subtitle {
    color: #6c757d;
    font-size: 0.9rem;
    margin: 0;
}
.st-bill-details {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}
.st-bill-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
}
.st-bill-label {
    color: #495057;
    font-weight: 500;
}
.st-bill-value {
    color: #212529;
    font-weight: 600;
}
.st-bill-divider {
    border: none;
    border-top: 2px dashed #dee2e6;
    margin: 1rem 0;
}
.st-bill-total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 0 0 0;
    border-top: 2px solid #dee2e6;
    margin-top: 0.5rem;
}
.st-bill-total-label {
    color: #2c5530;
    font-weight: 700;
    font-size: 1.1rem;
}
.st-bill-total-value {
    color: #2c5530;
    font-weight: 700;
    font-size: 1.3rem;
}
.st-bill-note {
    text-align: center;
    color: #6c757d;
    font-size: 0.8rem;
    margin-top: 1rem;
    font-style: italic;
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

// Loader Component
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

// Payment Modal Component
const PaymentModal = ({ onClose, discount }) => {
    const [loading, setLoading] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPaymentDetails();
    }, []);

    const fetchPaymentDetails = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem('token');
            
            if (!token) {
                setError('Authentication token not found. Please log in again.');
                return;
            }

            console.log('Fetching payment details...');
            
            // CORRECT ENDPOINT - with /api/payment prefix
            const response = await fetch('https://it-con-backend.onrender.com/api/payments/create-payment', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response status:', response.status);
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response error:', errorText);
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Payment data received:', data);
            
            if (data.success) {
                setPaymentData(data);
            } else {
                setError(data.message || 'Failed to create payment order');
            }
        } catch (err) {
            console.error('Payment details fetch error:', err);
            setError(err.message || 'Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        if (!paymentData) return;

        try {
            setLoading(true);
            setError(null);

            // Check if Razorpay is already loaded
            if (window.Razorpay) {
                initializeRazorpay();
                return;
            }

            // Load Razorpay script
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            
            script.onload = () => {
                console.log('Razorpay script loaded successfully');
                initializeRazorpay();
            };
            
            script.onerror = () => {
                setError('Failed to load payment gateway. Please try again.');
                setLoading(false);
            };
            
            document.body.appendChild(script);
        } catch (err) {
            console.error('Razorpay initialization error:', err);
            setError('Failed to initialize payment gateway');
            setLoading(false);
        }
    };

    const initializeRazorpay = () => {
        try {
            if (!window.Razorpay) {
                throw new Error('Razorpay not loaded');
            }

            const options = {
                key: paymentData.keyId,
                amount: paymentData.amount, // Already in paise from backend (10000 = ₹100)
                currency: paymentData.currency,
                name: 'IT Conference',
                description: 'Conference Registration Payment',
                order_id: paymentData.orderId,
                handler: async function (response) {
                    console.log('Payment response:', response);
                    await verifyPayment(response);
                },
                prefill: {
                    name: paymentData.name,
                    email: paymentData.email,
                    contact: paymentData.contact
                },
                theme: {
                    color: '#F97316'
                },
                modal: {
                    ondismiss: function() {
                        console.log('Payment modal closed');
                        setLoading(false);
                    }
                }
            };

            console.log('Razorpay options:', options);
            
            const rzp = new window.Razorpay(options);
            rzp.open();
            setLoading(false);
        } catch (err) {
            console.error('Razorpay instance creation error:', err);
            setError('Failed to create payment instance: ' + err.message);
            setLoading(false);
        }
    };

    const verifyPayment = async (response) => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            
            console.log('Verifying payment...', response);

            // CORRECT VERIFICATION ENDPOINT
            const verifyResponse = await fetch('https://it-con-backend.onrender.com/api/payments/verify-payment', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                })
            });

            const verifyData = await verifyResponse.json();
            console.log('Verification response:', verifyData);
            
            if (verifyData.success) {
                alert('🎉 Payment successful! Your registration is now complete.');
                onClose();
                // Refresh the page to update status
                setTimeout(() => window.location.reload(), 1000);
            } else {
                alert('❌ Payment verification failed: ' + (verifyData.message || 'Unknown error'));
                setLoading(false);
            }
        } catch (err) {
            console.error('Payment verification error:', err);
            alert('❌ Payment verification failed. Please contact support.');
            setLoading(false);
        }
    };

    const calculateAmount = () => {
        if (!paymentData) return { baseAmount: 100, finalAmount: discount ? 80 : 100 };
        
        // Use convertedAmount from backend which is in actual currency units
        const baseAmount = paymentData.convertedAmount || 100;
        const finalAmount = discount ? baseAmount * 0.8 : baseAmount;
        return { baseAmount, finalAmount };
    };

    const { baseAmount, finalAmount } = calculateAmount();

    return (
        <div className="st-modal-overlay" onClick={onClose}>
            <div className="st-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="st-modal-title">Payment Gateway</h3>
                
                {loading && !paymentData && (
                    <div className="st-loading-container" style={{ minHeight: '200px', padding: '2rem' }}>
                        <div className="st-loader">
                            <div className="st-loader-dot"></div>
                            <div className="st-loader-dot"></div>
                            <div className="st-loader-dot"></div>
                        </div>
                        <p className="st-loading-text">Loading payment details...</p>
                    </div>
                )}

                {error && (
                    <div style={{ 
                        background: '#fee2e2', 
                        border: '1px solid #fecaca', 
                        borderRadius: '8px', 
                        padding: '1rem', 
                        marginBottom: '1rem',
                        color: '#dc2626'
                    }}>
                        <strong>Error:</strong> {error}
                        <div style={{ marginTop: '0.5rem' }}>
                            <button 
                                onClick={fetchPaymentDetails}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: '#dc2626',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    marginRight: '0.5rem'
                                }}
                            >
                                Retry
                            </button>
                            <button 
                                onClick={onClose}
                                style={{
                                    padding: '0.5rem 1rem',
                                    background: 'transparent',
                                    color: '#dc2626',
                                    border: '1px solid #dc2626',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {paymentData && (
                    <>
                        <div className="st-bill-container">
                            <div className="st-bill-header">
                                <h4 className="st-bill-title">Payment Invoice</h4>
                                <p className="st-bill-subtitle">IT Conference Registration</p>
                            </div>
                            
                            <div className="st-bill-details">
                                <div className="st-bill-row">
                                    <span className="st-bill-label">Conference Fee:</span>
                                    <span className="st-bill-value">
                                        {paymentData.currency === 'INR' ? '₹' : '$'}{baseAmount.toFixed(2)}
                                    </span>
                                </div>
                                
                                {discount && (
                                    <div className="st-bill-row">
                                        <span className="st-bill-label">Discount (20%):</span>
                                        <span className="st-bill-value" style={{ color: 'green' }}>
                                            -{paymentData.currency === 'INR' ? '₹' : '$'}{(baseAmount * 0.2).toFixed(2)}
                                        </span>
                                    </div>
                                )}
                                
                                <hr className="st-bill-divider" />
                                
                                <div className="st-bill-total">
                                    <span className="st-bill-total-label">Total Amount:</span>
                                    <span className="st-bill-total-value">
                                        {paymentData.currency === 'INR' ? '₹' : '$'}{finalAmount.toFixed(2)} {paymentData.currency}
                                    </span>
                                </div>
                            </div>
                            
                            <p className="st-bill-note">
                                Secure payment processed by Razorpay
                            </p>
                        </div>

                        <button 
                            onClick={handlePayment}
                            disabled={loading}
                            className="st-modal-submit-btn"
                            style={{ marginTop: '1rem' }}
                        >
                            {loading ? 'Processing...' : `Pay ${paymentData.currency === 'INR' ? '₹' : '$'}${finalAmount.toFixed(2)}`}
                        </button>

                        <p style={{ 
                            textAlign: 'center', 
                            fontSize: '0.8rem', 
                            color: '#6c757d', 
                            marginTop: '1rem' 
                        }}>
                            You will be redirected to Razorpay for secure payment
                        </p>
                    </>
                )}

                {!loading && !error && !paymentData && (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Unable to load payment details.</p>
                        <button 
                            onClick={fetchPaymentDetails}
                            className="st-modal-submit-btn"
                            style={{ marginTop: '1rem' }}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                <button 
                    onClick={onClose}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        marginTop: '1rem',
                        background: 'transparent',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        color: '#6b7280'
                    }}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

// Main Status Tracker Component (keep the same as before)
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
            navigate('/paper-submission');
        } else if (stageIndex === 4) {
            setIsPaymentModalOpen(true);
        }
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
                        discount={statusData?.discount}
                    />
                )}
            </main>
        </React.Fragment>
    );
};

export default SubmissionStatusTracker;
