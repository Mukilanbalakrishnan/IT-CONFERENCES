import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaperSubmission.css';
import { FaFileUpload, FaArrowLeft } from 'react-icons/fa';

const PaperSubmission = () => {
    const [step, setStep] = useState(1); // 1 for upload, 2 for payment
    const [paperFile, setPaperFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
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
        
        const formData = new FormData();
        formData.append('paper', paperFile);
        
        try {
            const token = localStorage.getItem("token");
            await new Promise(resolve => setTimeout(resolve, 2000));
            // Example API call (replace with your actual endpoint)
            // const response = await axios.post('YOUR_API_ENDPOINT/submit-paper', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //         'Authorization': `Bearer ${token}`
            //     }
            // });
            toast.success("Your paper and payment have been submitted successfully!");
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
                            <h1 className="ps-left-panel-title">Submission<br/>Process</h1>
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

                    {/* Right Panel */}
                    <div className="ps-right-panel">
                        {step === 1 && (
                            <div className="ps-form-body">
                                <h2 className="ps-form-title">Step 1: Upload Your Full Paper</h2>
                                <div className="ps-upload-area">
                                    <FaFileUpload className="ps-upload-icon" />
                                     <p>Drag & drop your file here or</p>
                                    <input 
                                        type="file" 
                                        id="paperUpload" 
                                        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        onChange={handleFileChange} 
                                        style={{ display: 'none' }}
                                    />
                                    <label htmlFor="paperUpload" className="ps-upload-label">
                                        Browse File
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
                                <div className="ps-payment-summary">
                                    <h4>Payment Summary</h4>
                                    <div className="ps-summary-item">
                                        <span>Registration Fee:</span>
                                        <span>₹12,000.00</span>
                                    </div>
                                    <div className="ps-summary-item total">
                                        <span>Total Amount:</span>
                                        <span>₹12,000.00</span>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <button type="submit" className="ps-btn ps-btn-primary" disabled={loading}>
                                        {loading ? 'Processing...' : 'Pay Now'}
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

