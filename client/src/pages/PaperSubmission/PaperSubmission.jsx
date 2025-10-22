import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaperSubmission.css';
import { FaFileUpload, FaArrowLeft } from 'react-icons/fa';

const PaperSubmission = () => {
    const [step, setStep] = useState(1);
    const [paperFile, setPaperFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({ amount: 0, currency: 'INR' });
    const [user, setUser] = useState(null);

    // Load the Razorpay script when the component mounts
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        // Fetch user data from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Invalid file type. Please upload a .doc or .docx file.");
                e.target.value = null;
                return;
            }
            setPaperFile(file);
        }
    };
    
    // This function will now also handle the paper upload
    const handleProceedToPayment = async () => {
        if (!paperFile) {
            toast.error("Please upload your paper before proceeding.");
            return;
        }
        setLoading(true);
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('file', paperFile);

        try {
            // This call now uploads the paper and gets the calculated payment amount
            const response = await axios.post(
                'https://it-con-backend.onrender.com/api/register/paper', 
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setPaymentDetails({
                amount: response.data.amount,
                currency: response.data.currency,
            });
            setStep(2);

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to upload paper. Please try again.");
            console.error("File upload error:", error);
        } finally {
            setLoading(false);
        }
    };
    
    const handlePayment = async () => {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!user) {
            toast.error("You must be logged in to proceed.");
            setLoading(false);
            return;
        }

        try {
            // 1. Create Order on Your Backend
            const { data: orderData } = await axios.post(
                'https://it-con-backend.onrender.com/api/payments/create-order',
                { userId: user._id },
                { headers: { 'Authorization': `Bearer ${token}` } }
            );

            if (orderData.method !== 'razorpay') {
                throw new Error("Razorpay is not the configured payment method.");
            }

            const { keyId, orderId } = orderData;

            const options = {
                key: keyId,
                amount: paymentDetails.amount * 100, // Amount in paise
                currency: paymentDetails.currency,
                name: "S3-ECBE' 2026 Conference",
                description: "Registration & Paper Submission Fee",
                order_id: orderId,
                handler: async function (response) {
                    // 2. Verify Payment on Your Backend
                    try {
                        await axios.post('https://it-con-backend.onrender.com/api/payments/verify', 
                        {
                            paymentMethod: "razorpay",
                            data: {
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            }
                        },
                        { headers: { 'Authorization': `Bearer ${token}` } });

                        toast.success("Payment successful!");
                        // Optionally redirect to a success page or status page
                        // navigate('/status');

                    } catch (err) {
                         toast.error("Payment verification failed. Please contact support.");
                         console.error("Verification error:", err);
                    }
                },
                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.mobileno,
                },
                theme: {
                    color: "#0D47A1"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.on('payment.failed', function (response){
                toast.error("Payment failed. Please try again.");
                console.error(response.error);
            });
            rzp.open();

        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
            console.error("Payment initiation error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="ps-page-container">
                 <header className="ps-page-header">
                    <h1>Final Submission</h1>
                    <p>Complete your registration by uploading your paper and processing the fee.</p>
                </header>
                <div className="ps-main-container">
                    <div className="ps-left-panel">
                         <div>
                            <h2 className="ps-left-panel-title">Submission<br/>Process</h2>
                             <div className="ps-step-indicator">
                                <div className={`ps-step ${step === 1 ? 'active' : ''}`}>
                                    <div className="ps-step-number">1</div>
                                    <div className="ps-step-label">
                                        <span>Upload</span>
                                        <span>Paper</span>
                                    </div>
                                </div>
                                <div className={`ps-step ${step === 2 ? 'active' : ''}`}>
                                    <div className="ps-step-number">2</div>
                                    <div className="ps-step-label">
                                        <span>Process</span>
                                        <span>Payment</span>
                                    </div>
                                </div>
                            </div>
                            <div className="ps-left-panel-info">
                                <p className="ps-info-title">Key Information:</p>
                                <ul className="ps-info-list">
                                    <li>Your abstract has been approved.</li>
                                    <li>Upload your final paper in .doc or .docx format.</li>
                                    <li>Complete the payment to finalize your registration.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="ps-right-panel">
                        {step === 1 && (
                            <div className="ps-form-body">
                                <h3 className="ps-form-title">Step 1: Upload Your Full Paper</h3>
                                <div className="ps-upload-area">
                                    <FaFileUpload className="ps-upload-icon" />
                                    <p>Drag & drop your file here or</p>
                                    <input type="file" id="paperUpload" onChange={handleFileChange} style={{ display: 'none' }} />
                                    <label htmlFor="paperUpload" className="ps-upload-label">Browse File</label>
                                    {paperFile && <p className="ps-file-name">Selected: {paperFile.name}</p>}
                                </div>
                                <button onClick={handleProceedToPayment} className="ps-btn ps-btn-primary" disabled={loading}>
                                    {loading ? 'Uploading...' : 'Proceed to Payment'}
                                </button>
                            </div>
                        )}
                        {step === 2 && (
                            <div className="ps-form-body">
                                <button onClick={() => setStep(1)} className="ps-back-btn"><FaArrowLeft /> Back to Upload</button>
                                <h3 className="ps-form-title">Step 2: Complete Payment</h3>
                                <div className="ps-payment-summary">
                                    <h4>Payment Summary</h4>
                                    <div className="ps-summary-item">
                                        <span>Registration Fee:</span>
                                        <span>{paymentDetails.currency} {paymentDetails.amount.toLocaleString()}</span>
                                    </div>
                                    <div className="ps-summary-item total">
                                        <span>Total Amount:</span>
                                        <span>{paymentDetails.currency} {paymentDetails.amount.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button onClick={handlePayment} className="ps-btn ps-btn-primary" disabled={loading}>
                                    {loading ? 'Processing...' : 'Pay Now'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaperSubmission;

