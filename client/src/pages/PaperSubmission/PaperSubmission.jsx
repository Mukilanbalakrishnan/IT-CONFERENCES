import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaperSubmission.css';
import { FaFileUpload, FaCreditCard, FaArrowLeft } from 'react-icons/fa';

const PaperSubmission = () => {
    const [step, setStep] = useState(1); // 1 for upload, 2 for payment
    const [paperFile, setPaperFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file type
            const allowedTypes = ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(file.type)) {
                toast.error("Invalid file type. Please upload a .doc or .docx file.");
                e.target.value = null; // Reset the input
                return;
            }
            setPaperFile(file);
            setFormErrors({}); // Clear previous file error
        }
    };

    const handleProceedToPayment = () => {
        if (!paperFile) {
            setFormErrors({ file: "Please upload your paper before proceeding." });
            toast.error("Please upload your paper before proceeding.");
            return;
        }
        setStep(2);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // In a real application, you would handle payment processing here
        
        const formData = new FormData();
        formData.append('paper', paperFile);
        // You would also append payment details or a payment token

        try {
            const token = localStorage.getItem("token");
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            // const response = await axios.post('YOUR_API_ENDPOINT/submit-paper', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${token}`
            //     }
            // });

            toast.success("Your paper and payment have been submitted successfully!");
            // Redirect or update UI after success
        } catch (error) {
            toast.error("Submission failed. Please try again.");
            console.error("Submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="ps-page-container">
                <div className="ps-main-container">
                    {/* Left Panel */}
                    <div className="ps-left-panel">
                        <div>
                            <h1 className="ps-left-panel-title">Final Submission</h1>
                            <p className="ps-left-panel-subtitle">Paper Upload & Payment</p>
                            <p className="ps-left-panel-description">
                                Complete the final step by uploading your full paper and processing the registration fee.
                            </p>
                            <div className="ps-left-panel-info">
                                <p className="ps-info-title">Process:</p>
                                <ul className="ps-info-list">
                                    <li>Step 1: Upload your paper in .doc or .docx format.</li>
                                    <li>Step 2: Complete the payment to finalize your registration.</li>
                                    <li>Ensure all details are correct before submission.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel */}
                    <div className="ps-right-panel">
                        {step === 1 && (
                            <div className="ps-form-body">
                                <h2 className="ps-form-title">Step 1: Upload Your Full Paper</h2>
                                <div className="ps-upload-area">
                                    <FaFileUpload className="ps-upload-icon" />
                                    <input 
                                        type="file" 
                                        id="paperUpload" 
                                        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={handleFileChange} 
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="paperUpload" className="ps-upload-label">
                                        Choose File
                                    </label>
                                    {paperFile && <p className="ps-file-name">Selected: {paperFile.name}</p>}
                                    {formErrors.file && <p className="ps-error-text">{formErrors.file}</p>}
                                </div>
                                <button onClick={handleProceedToPayment} className="ps-btn ps-btn-primary">
                                    Proceed to Payment
                                </button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="ps-form-body">
                                <button onClick={() => setStep(1)} className="ps-back-btn"><FaArrowLeft /> Back to Upload</button>
                                <h2 className="ps-form-title">Step 2: Complete Payment</h2>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="ps-form-fieldset">
                                        <legend className="ps-fieldset-legend">Payment Details</legend>
                                        <div className="ps-form-section-spacing">
                                            <div>
                                                <label htmlFor="cardName" className="ps-form-label">Name on Card</label>
                                                <input type="text" id="cardName" className="ps-form-input" required />
                                            </div>
                                            <div>
                                                <label htmlFor="cardNumber" className="ps-form-label">Card Number</label>
                                                <input type="text" id="cardNumber" placeholder="xxxx xxxx xxxx xxxx" className="ps-form-input" required />
                                            </div>
                                            <div className="ps-form-grid-2">
                                                <div>
                                                    <label htmlFor="expiryDate" className="ps-form-label">Expiry Date</label>
                                                    <input type="text" id="expiryDate" placeholder="MM/YY" className="ps-form-input" required />
                                                </div>
                                                <div>
                                                    <label htmlFor="cvv" className="ps-form-label">CVV</label>
                                                    <input type="text" id="cvv" placeholder="123" className="ps-form-input" required />
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                    <button type="submit" className="ps-btn ps-btn-primary" disabled={loading}>
                                        {loading ? 'Processing...' : 'Pay & Complete Submission'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaperSubmission;
