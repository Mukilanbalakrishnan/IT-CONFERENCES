import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Hourglass, Receipt, Building, Lock, Ticket } from 'lucide-react';
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

.st-ticket-btn {
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background-color: var(--brand-blue-primary);
    color: var(--white);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    transition: all 0.2s ease;
}

.st-ticket-btn:hover {
    background-color: var(--brand-blue-dark);
    transform: translateY(-2px);
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
    max-width: 500px;
    width: 100%;
    padding: 1rem;
    max-height: 90vh;
    overflow-y: auto;
    border-top: 4px solid var(--brand-orange);
}
.st-modal-title {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--brand-blue-dark);
    text-align: center;
    padding: 0.5rem 1rem;
}

/* Updated Bill Styles */
.st-bill-container {
    background: var(--surface-light);
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid var(--surface-dark);
}

.st-bill-header {
    text-align: center;
    margin-bottom: 1.5rem;
}

.st-bill-icon {
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
    color: var(--brand-blue-primary);
}

.st-bill-title {
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--brand-blue-dark);
    margin: 0 0 0.25rem 0;
}

.st-bill-subtitle {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin: 0;
    font-weight: 500;
}

.st-bill-section {
    margin-bottom: 1.5rem;
}

.st-bill-section-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 1rem 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--surface-dark);
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

.st-bill-row.discount {
    background: #f0fdf4;
    margin: 0 -0.5rem;
    padding: 0.5rem;
    border-radius: 8px;
}

.st-bill-label {
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.95rem;
}

.st-bill-value {
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1rem;
}

.st-bill-value.discount {
    color: #059669;
}

.st-discount-badge {
    background: #dcfce7;
    color: #166534;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    border: 1px solid #bbf7d0;
}

/* Accommodation Toggle */
.st-accommodation-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    padding: 1rem;
    background: var(--white);
    border-radius: 8px;
    border: 1px solid var(--surface-dark);
}

.st-accommodation-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}
.st-accommodation-info label {
    font-weight: 500;
    color: var(--text-primary);
    font-size: 0.95rem;
    cursor: pointer;
}

.st-accommodation-rate {
    font-weight: 600;
    color: var(--brand-orange-dark);
    font-size: 1rem;
}

.st-accommodation-note {
    font-size: 0.75rem;
    color: var(--text-secondary);
    font-style: italic;
}

.st-toggle-switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 28px;
    flex-shrink: 0;
}

.st-toggle-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.st-toggle-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--surface-dark);
    transition: .4s;
    border-radius: 34px;
}

.st-toggle-slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .st-toggle-slider {
    background-color: var(--brand-orange);
}

input:checked + .st-toggle-slider:before {
    transform: translateX(22px);
}

/* Total Section */
.st-bill-total-section {
    margin-top: 1.5rem;
}

.st-bill-divider {
    border: none;
    border-top: 1px solid var(--surface-dark);
    margin: 1.5rem 0;
}

.st-bill-total-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
}

.st-bill-total-label {
    font-weight: 600;
    font-size: 1.1rem;
    color: var(--text-primary);
}

.st-bill-total-value {
    font-weight: 700;
    font-size: 1.5rem;
    color: var(--brand-blue-dark);
}

/* Footer */
.st-bill-footer {
    margin-top: 1.5rem;
    text-align: center;
}

.st-bill-note {
    color: var(--text-secondary);
    font-size: 0.8rem;
    margin-top: 0.5rem;
    font-style: italic;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.st-bill-note.accommodation {
    color: #92400e;
    background: #fef3c7;
    padding: 0.75rem;
    border-radius: 8px;
    border: 1px solid #fde68a;
}

.st-secure-badge {
    font-size: 1rem;
}

/* Button Styles */
.st-modal-submit-btn {
    width: 100%;
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    background: var(--brand-orange);
    color: white;
    transition: all 0.3s ease;
}

.st-modal-submit-btn:hover:not(:disabled) {
    background-color: var(--brand-orange-dark);
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.st-modal-submit-btn:disabled {
    background: #9ca3af;
    cursor: not-allowed;
    transform: none;
}

.st-modal-cancel-btn {
    width: 100%;
    padding: 0.75rem 1.5rem;
    margin-top: 0.75rem;
    background: transparent;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    color: var(--text-secondary);
    font-weight: 500;
    transition: all 0.2s;
}

.st-modal-cancel-btn:hover:not(:disabled) {
    background: var(--surface-light);
    color: var(--text-primary);
}

.st-payment-note {
    text-align: center;
    font-size: 0.8rem;
    color: #6c757d;
    margin-top: 1rem;
    padding: 0.75rem;
    background: #f8f9fa;
    border-radius: 8px;
}

/* Success Styles */
.st-success-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    text-align: center;
}

.st-success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: pulse 1.5s infinite;
    color: var(--brand-orange);
}

.st-success-title {
    color: var(--brand-blue-dark);
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.st-success-message {
    color: var(--text-secondary);
    margin-bottom: 2rem;
    line-height: 1.5;
}

.st-success-btn {
    padding: 0.75rem 2rem;
    background-color: var(--brand-orange);
    color: white;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    font-weight: 600;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.st-success-btn:hover {
    transform: translateY(-2px);
    background-color: var(--brand-orange-dark);
}

/* Error Styles */
.st-error-banner {
    background: #fef2f2;
    border: 1px solid #fecaca;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    color: #dc2626;
}

.st-error-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
}

.st-retry-btn {
    padding: 0.5rem 1rem;
    background: #dc2626;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.st-cancel-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    color: #dc2626;
    border: 1px solid #dc2626;
    border-radius: 4px;
    cursor: pointer;
}

.st-payment-fallback {
    text-align: center;
    padding: 2rem;
    background: #f8f9fa;
    border-radius: 12px;
    margin-bottom: 1rem;
}

/* Loader Styles */
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

/* Responsive Design */
@media (max-width: 640px) {
    .st-modal-content {
        padding: 1rem;
        margin: 0.5rem;
    }
    
    .st-bill-container {
        padding: 1rem;
    }
    
    .st-accommodation-toggle {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }
    .st-accommodation-info {
        text-align: center;
    }
    
    .st-bill-total-group {
        padding: 1rem;
        flex-direction: column;
        gap: 0.5rem;
    }
    
    .st-bill-total-value {
        font-size: 1.3rem;
    }
}
`;

// Utility Functions
const fetchWithTimeout = async (url, options, timeout = 15000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    
    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
};

const retryApiCall = async (apiCall, maxRetries = 3, delay = 1000) => {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await apiCall();
        } catch (error) {
            if (attempt === maxRetries) throw error;
            await new Promise(resolve => setTimeout(resolve, delay * attempt));
        }
    }
};

// Format currency with commas
const formatCurrency = (amount, currency = 'INR') => {
    const formattedAmount = new Intl.NumberFormat('en-IN', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2
    }).format(amount);
    
    return currency === 'INR' ? `₹${formattedAmount}` : `$${formattedAmount}`;
};

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

// API Functions
const createOrder = async (payload = {}) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    try {
        const response = await fetchWithTimeout(
            'https://it-con-backend.onrender.com/api/payments/create-payment',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            },
            15000
        );

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                const errorText = await response.text();
                errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please check your internet connection and try again.');
        }
        throw error;
    }
};

const verifyPayment = async (paymentData) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    try {
        const response = await fetchWithTimeout(
            'https://it-con-backend.onrender.com/api/payments/verify-payment',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(paymentData)
            },
            15000
        );

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                const errorText = await response.text();
                errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please check your internet connection and try again.');
        }
        throw error;
    }
};

const completePayment = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    try {
        const response = await fetchWithTimeout(
            'https://it-con-backend.onrender.com/api/payments/complete-payment',
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            },
            10000
        );
        
        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                const errorText = await response.text();
                errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please check your internet connection and try again.');
        }
        throw error;
    }
};

// API function to update accommodation preference
const updateAccommodationPreference = async (needsAccommodation) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Authentication token not found. Please log in again.');
    }

    try {
        const response = await fetchWithTimeout(
            'https://it-con-backend.onrender.com/api/users/accommodation', // <-- UPDATED URL
            {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    needsAccommodation: needsAccommodation
                })
            },
            10000
        );

        if (!response.ok) {
            let errorMessage = `HTTP error! status: ${response.status}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                const errorText = await response.text();
                errorMessage = errorText || errorMessage;
            }
            throw new Error(errorMessage);
        }

        const data = await response.json();
        return { data };
    } catch (error) {
        if (error.name === 'AbortError') {
            throw new Error('Request timeout. Please check your internet connection and try again.');
        }
        throw error;
    }
};

// Payment Modal Component
const PaymentModal = ({ onClose, discount, onPaymentSuccess, user }) => {
    const [loading, setLoading] = useState(true);
    const [paymentData, setPaymentData] = useState(null);
    const [error, setError] = useState(null);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    
    // Initialize state from the user prop
    const [needsAccommodation, setNeedsAccommodation] = useState(user?.needsAccommodation || false);
    
    const [updatingAccommodation, setUpdatingAccommodation] = useState(false);

    // Pass accommodation state directly to the API
    const fetchPaymentDetails = async (accommodationStatus) => {
        try {
            setLoading(true);
            setError(null);
            const result = await retryApiCall(() => createOrder({ accommodation: accommodationStatus }));
            if (result.data.success) {
                setPaymentData(result.data);
            } else {
                setError(result.data.message || 'Failed to create payment order');
            }
        } catch (err) {
            setError(err.message || 'Network error. Please check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch on mount using the initial accommodation state
    useEffect(() => {
        fetchPaymentDetails(needsAccommodation);
    }, []);

    // Function to handle accommodation toggle change
    const handleAccommodationChange = async (newValue) => {
        try {
            setUpdatingAccommodation(true);
            setNeedsAccommodation(newValue); // Optimistically update UI
            
            // Update the preference in the backend
            await retryApiCall(() => updateAccommodationPreference(newValue));
            
            // Re-fetch payment details with new accommodation preference
            await fetchPaymentDetails(newValue);

        } catch (err) {
            setError(`Failed to update preference: ${err.message}`);
            // Revert the toggle if update fails
            setNeedsAccommodation(!newValue);
        } finally {
            setUpdatingAccommodation(false);
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        try {
            const { keyId, orderId, currency } = paymentData;
            const finalAmount = calculateAmount().finalAmount;

            const options = {
                key: keyId,
                amount: (finalAmount * 100),
                currency,
                name: "IT Conference",
                description: "Conference Registration Payment",
                order_id: orderId,
                handler: async function (response) {
                    try {
                        setLoading(true);
                        const verifyRes = await retryApiCall(() => 
                            verifyPayment({
                                paymentMethod: "razorpay",
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            })
                        );
                        
                        if (verifyRes.data.success) {
                            const completeRes = await retryApiCall(() => completePayment());
                            setPaymentSuccess(true);
                            onPaymentSuccess();
                        } else {
                            const errorMsg = verifyRes.data.message || "Payment verification failed";
                            setError(`❌ ${errorMsg}. Please contact support.`);
                        }
                    } catch (err) {
                        setError(`❌ Payment verification failed: ${err.message}`);
                    } finally {
                        setLoading(false);
                    }
                },
                prefill: {
                    name: user?.name || "",
                    email: user?.email || "",
                    contact: user?.mobileno || "",
                },
                theme: { color: "#1e3a8a" },
                modal: {
                    ondismiss: function() {
                        if (!paymentSuccess) {
                            setLoading(false);
                        }
                    }
                }
            };

            // Load Razorpay if not loaded
            if (!window.Razorpay) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
                    document.body.appendChild(script);
                });
            }

            const rzp = new window.Razorpay(options);
            rzp.open();

            rzp.on("payment.failed", function (response) {
                const errorDescription = response.error?.description || 'Unknown error';
                setError(`❌ Payment failed: ${errorDescription}`);
                setLoading(false);
            });

        } catch (err) {
            setError(err.message || "❌ Order creation failed. Please try again.");
            setLoading(false);
        }
    };

    const calculateAmount = () => {
        if (!paymentData) return { baseAmount: 0, finalAmount: 0 }; 
        
        const baseAmount = paymentData.amount || 0;
        const finalAmount = discount ? baseAmount * 0.8 : baseAmount;
        return { baseAmount, finalAmount };
    };

    const { baseAmount, finalAmount } = calculateAmount();

    // Improved Bill Component
    const BillDetails = () => (
        <div className="st-bill-container">
            {/* Header */}
            <div className="st-bill-header">
                <div className="st-bill-icon"><Receipt size={40} /></div>
                <h4 className="st-bill-title">Payment Invoice</h4>
                <p className="st-bill-subtitle">IT Conference Registration</p>
            </div>
            
            {/* Conference Fee Section */}
            <div className="st-bill-section">
                <h5 className="st-bill-section-title">Conference Registration</h5>
                <div className="st-bill-details">
                    <div className="st-bill-row">
                        <span className="st-bill-label">Conference Fee</span>
                        <span className="st-bill-value">
                            {formatCurrency(baseAmount, paymentData?.currency)}
                        </span>
                    </div>
                    
                    {discount && (
                        <div className="st-bill-row discount">
                            <span className="st-bill-label">
                                <span className="st-discount-badge">Early Bird Discount (20%)</span>
                            </span>
                            <span className="st-bill-value discount">
                                -{formatCurrency(baseAmount * 0.2, paymentData?.currency)}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* Accommodation Section */}
            <div className="st-bill-section">
                <h5 className="st-bill-section-title"><Building size={18} /> Accommodation (Optional)</h5>
                
                <div className="st-accommodation-toggle">
                    <div className="st-accommodation-info">
                        <label htmlFor="accommodation-toggle">Add On-Campus Accommodation</label>
                        <span className="st-accommodation-note">
                            (Payable at Office - ₹350 per day)
                        </span>
                    </div>
                    <label className="st-toggle-switch">
                        <input 
                            type="checkbox" 
                            id="accommodation-toggle"
                            checked={needsAccommodation}
                            onChange={(e) => handleAccommodationChange(e.target.checked)}
                            disabled={updatingAccommodation || loading}
                        />
                        <span className="st-toggle-slider"></span>
                    </label>
                </div>
                {updatingAccommodation && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--brand-orange)', textAlign: 'center', margin: '0.5rem 0' }}>
                        Updating accommodation preference...
                    </p>
                )}
            </div>

            {/* Total Section */}
            <div className="st-bill-total-section">
                <div className="st-bill-divider"></div>
                
                <div className="st-bill-total-row">
                    <div className="st-bill-total-label">Online Payment Total</div>
                    <div className="st-bill-total-value">
                        {formatCurrency(finalAmount, paymentData?.currency)} {paymentData?.currency}
                    </div>
                </div>
            </div>

            {/* Footer Notes */}
            <div className="st-bill-footer">
                <p className="st-bill-note">
                    <Lock size={12} className="st-secure-badge" />
                    Secure payment processed by Razorpay
                </p>
                {needsAccommodation && (
                    <p className="st-bill-note accommodation">
                        💡 Accommodation charges are separate and payable in cash at our office during the Conference.
                    </p>
                )}
            </div>
        </div>
    );

    // Success UI Component
    const SuccessUI = () => (
        <div className="st-success-container">
            <div className="st-success-icon"><CheckCircle size={60} /></div>
            <h3 className="st-success-title">Payment Successful!</h3>
            <p className="st-success-message">
                Your conference registration payment has been processed successfully. 
                {needsAccommodation && (
                    <><br /><strong>Please visit our office to coordinate accommodation details and make payment in cash.</strong></>
                )}
            </p>
            <button 
                onClick={onClose}
                className="st-success-btn"
            >
                Close
            </button>
        </div>
    );

    // Payment Form UI Component
    const PaymentFormUI = () => (
        <>
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
                <div className="st-error-banner">
                    <strong>Payment Error:</strong> {error}
                    <div className="st-error-actions">
                        <button 
                            onClick={() => fetchPaymentDetails(needsAccommodation)}
                            disabled={loading || updatingAccommodation}
                            className="st-retry-btn"
                        >
                            Retry
                        </button>
                        <button 
                            onClick={onClose}
                            className="st-cancel-btn"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {paymentData && <BillDetails />}

            {paymentData && (
                <>
                    <button 
                        onClick={handlePayment}
                        disabled={loading || updatingAccommodation}
                        className="st-modal-submit-btn"
                    >
                        {loading ? 'Processing...' : `Pay ${formatCurrency(finalAmount, paymentData.currency)} Online`}
                    </button>
                </>
            )}

            <button 
                onClick={onClose}
                className="st-modal-cancel-btn"
                disabled={loading || updatingAccommodation}
            >
                Cancel
            </button>
        </>
    );

    return (
        <div className="st-modal-overlay" onClick={onClose}>
            <div className="st-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 className="st-modal-title">
                    {paymentSuccess ? 'Payment Successful!' : 'Conference Registration Payment'}
                </h3>
                
                {paymentSuccess ? <SuccessUI /> : <PaymentFormUI />}
            </div>
        </div>
    );
};

// Main Status Tracker Component
const SubmissionStatusTracker = () => {
    const [statusData, setStatusData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchStatusData = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Please log in to view your submission status.");
            setLoading(false);
            return;
        }

        try {
            const response = await fetchWithTimeout(
                "https://it-con-backend.onrender.com/api/users/me",
                {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json'
                    }
                },
                10000
            );

            if (!response.ok) {
                throw new Error(`Could not fetch submission status. Server returned ${response.status}`);
            }

            const data = await response.json();
            setStatusData({
                abstractStatus: data.abstractStatus,
                paperStatus: data.paperStatus,
                paymentStatus: data.paymentStatus,
                discount: data.discount,
                needsAccommodation: data.needsAccommodation || false
            });
            setUser(data);

        } catch (err) {
            if (err.name === 'AbortError') {
                setError('Request timeout. Please check your internet connection and try again.');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchStatusData();
    }, [refreshTrigger]);

    const handlePaymentSuccess = () => {
        setIsPaymentModalOpen(false);
        // Trigger a re-fetch of the status data to show the "Registration Complete" state
        setRefreshTrigger(prev => prev + 1); 
    };

    const handleTicketClick = () => {
        navigate('/ticket');
    };
    
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

        if (abstractStatus === "no abstract") return 0;
        if (abstractStatus === "submitted") return 1;
        if (abstractStatus === "rejected") return 1;
        if (abstractStatus === "approved" && (paperStatus === "no paper" || !paperStatus)) return 2;
        if (paperStatus === "submitted" || paperStatus === "correction required") return 3;
        if (paperStatus === "rejected") return 3;
        if (paperStatus === "approved" && paymentStatus === "unpaid") return 4;
        if (paperStatus === "approved" && paymentStatus === "paid") return 5; // Handle case where paper is approved and paid
        if (paperStatus === "submitted" && paymentStatus === "paid") return 5; // Handle case where paper is still "submitted" but payment is "paid" (e.g., admin override)


        return 0;
    };
    
    const currentStatusIndex = getStatusStep();
    const isAbstractRejected = statusData?.abstractStatus === 'rejected';
    const isPaperRejected = statusData?.paperStatus === 'rejected';
    const isRegistrationComplete = currentStatusIndex === 5;

    const getStatusDescription = (index) => {
        if (!statusData) {
            if (index === 0) return "Submit your abstract to begin the review process.";
            return "";
        }

        const { abstractStatus, paperStatus, paymentStatus } = statusData;

        switch(index) {
            case 0: 
                return abstractStatus === "no abstract" 
                    ? "Submit your abstract to begin the review process."
                    : "Your abstract has been successfully submitted.";
            case 1: 
                if (isAbstractRejected) return "Unfortunately, your abstract was not accepted. Please check your email for feedback.";
                if (abstractStatus === "submitted") return "Our committee is currently reviewing your abstract submission.";
                return "Abstract review completed.";
            case 2: 
                if (isAbstractRejected) return "This step is unavailable as your abstract was not accepted.";
                if (paperStatus === "no paper" || !paperStatus) return "Congratulations! Your abstract has been accepted. Please submit your full paper.";
                return "Your paper has been submitted."; // Fallback if paper is submitted
            case 3: 
                if (isAbstractRejected) return "This step is unavailable as your abstract was not accepted.";
                if (isPaperRejected) return "Unfortunately, your paper was not accepted. Please check your email for feedback.";
                if (paperStatus === "submitted") return "Your paper has been submitted and is under review by our committee.";
                if (paperStatus === "correction required") return "Corrections are required for your paper. Please check your email for details.";
                if (paperStatus === "approved") return "Your paper has been approved! Please proceed to payment.";
                return "Paper review in progress.";
            case 4: 
                if (isAbstractRejected || isPaperRejected) return "This step is unavailable as your submission was not accepted.";
                if (paymentStatus === "unpaid") return "Your paper has been approved! Please complete the payment to finalize your registration.";
                if (paymentStatus === "paid") return "Payment has been received.";
                return "Awaiting paper approval to proceed to payment.";
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
            if (isRegistrationComplete && index === 5) {
                return <CheckCircle className="status-icon completed" />;
            }
            return <Hourglass className="status-icon active" />;
        }
        return <div className="status-icon pending" />;
    };

    const showActionButton = (index) => {
        if (!statusData) return false;
        const { abstractStatus, paperStatus, paymentStatus } = statusData;
        
        // Show "Submit Paper" button
        if (index === 2 && abstractStatus === "approved" && (paperStatus === "no paper" || !paperStatus)) return true;
        
        // Show "Complete Payment" button
        if (index === 4 && paperStatus === "approved" && paymentStatus === "unpaid") return true;
        
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

    if (loading) return <React.Fragment><style>{componentStyles}</style><main className="st-page"><Loader /></main></React.Fragment>;
    if (error) return <React.Fragment><style>{componentStyles}</style><div className="st-error-message">{error}</div></React.Fragment>;
    
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
                                    ${(isPaperRejected && index === 3) ? 'rejected' : ''}
                                    ${(isRegistrationComplete && index === 5) ? 'completed' : ''}`
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
                                    
                                    {showActionButton(index) && !isAbstractRejected && !isPaperRejected && (
                                        <button 
                                            onClick={() => handleActionButtonClick(index)}
                                            className="st-gateway-btn"
                                        >
                                            {getButtonText(index)}
                                        </button>
                                    )}

                                    {isRegistrationComplete && index === 5 && (
                                        <button 
                                            onClick={handleTicketClick}
                                            className="st-ticket-btn"
                                        >
                                            <Ticket size={18} />
                                            View Your Ticket
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
                        onPaymentSuccess={handlePaymentSuccess}
                        user={user} // Pass the full user object
                    />
                )}
            </main>
        </React.Fragment>
    );
};

export default SubmissionStatusTracker;