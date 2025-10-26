import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PaperSubmission.css';
import { FaFileUpload, FaCheckCircle, FaTimes, FaClock, FaChartBar } from 'react-icons/fa';

const PaperSubmission = () => {
    const [paperFile, setPaperFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // Fetch user data from local storage
    React.useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file extension
            const fileName = file.name.toLowerCase();
            const allowedExtensions = ['.doc', '.docx'];
            const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
            
            const maxSize = 10 * 1024 * 1024; // 10MB
            
            if (!allowedExtensions.includes(fileExtension)) {
                toast.error("Invalid file type. Please upload a .doc or .docx file.");
                e.target.value = '';
                return;
            }
            
            if (file.size > maxSize) {
                toast.error("File size exceeds 10MB limit. Please upload a smaller file.");
                e.target.value = '';
                return;
            }
            
            setPaperFile(file);
            setShowPreview(true);
        }
    };

    const handleRemoveFile = () => {
        setPaperFile(null);
        setShowPreview(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleUploadAreaClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSubmitPaper = async () => {
        if (!paperFile) {
            toast.error("Please upload your paper before submitting.");
            return;
        }

        if (!user) {
            toast.error("You must be logged in to submit a paper.");
            return;
        }

        setLoading(true);
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('file', paperFile);

        try {
            await axios.post(
                'https://it-con-backend.onrender.com/api/register/paper', 
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            
            toast.success("Paper submitted successfully!");
            setSubmitted(true);

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to submit paper. Please try again.");
            console.error("Paper submission error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCheckStatus = () => {
        navigate('/status');
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
            <ToastContainer position="top-right" />
            <div className="ps-page-container">
                <header className="ps-page-header">
                    <h1>Paper Submission</h1>
                    <p>Upload your final paper for the conference review process</p>
                </header>
                <div className="ps-main-container">
                    <div className="ps-left-panel">
                        <div>
                            <h2 className="ps-left-panel-title">Paper<br/>Submission</h2>
                            <div className="ps-left-panel-info">
                                <p className="ps-info-title">Submission Guidelines:</p>
                                <ul className="ps-info-list">
                                    <li>Your abstract has been approved</li>
                                    <li>Upload final paper in .doc or .docx format</li>
                                    <li>Maximum file size: 10MB</li>
                                    <li>Follow all formatting guidelines</li>
                                    <li>Preview your file before submission</li>
                                    <li>Review process takes 2-3 weeks</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="ps-right-panel">
                        {!submitted ? (
                            <div className="ps-form-body">
                                <h3 className="ps-form-title">Upload Your Full Paper</h3>
                                
                                {!showPreview ? (
                                    <div className="ps-upload-area" onClick={handleUploadAreaClick}>
                                        <FaFileUpload className="ps-upload-icon" />
                                        <p>Drag & drop your file here or</p>
                                        <input 
                                            ref={fileInputRef}
                                            type="file" 
                                            id="paperUpload" 
                                            onChange={handleFileChange} 
                                            style={{ display: 'none' }} 
                                            accept=".doc,.docx"
                                        />
                                        <div className="ps-upload-label">Browse File</div>
                                        <p className="ps-upload-hint">Supported formats: .doc, .docx | Max size: 10MB</p>
                                    </div>
                                ) : (
                                    <div className="ps-preview-container">
                                        <div className="ps-preview-header">
                                            <h4>File Preview</h4>
                                            <button onClick={handleRemoveFile} className="ps-remove-btn" type="button">
                                                <FaTimes />
                                            </button>
                                        </div>
                                        <div className="ps-file-preview">
                                            <div className="ps-file-icon">
                                                <FaFileUpload />
                                            </div>
                                            <div className="ps-file-details">
                                                <h5 className="ps-file-name">{paperFile.name}</h5>
                                                <div className="ps-file-meta">
                                                    <span className="ps-file-size">{formatFileSize(paperFile.size)}</span>
                                                    <span className="ps-file-type">
                                                        {paperFile.name.endsWith('.doc') ? 'DOC' : 'DOCX'}
                                                    </span>
                                                    <span className="ps-file-modified">
                                                        Last modified: {new Date(paperFile.lastModified).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="ps-preview-actions">
                                            <button 
                                                onClick={handleSubmitPaper} 
                                                className="ps-btn ps-btn-primary"
                                                disabled={loading}
                                                type="button"
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="ps-spinner"></div>
                                                        Submitting...
                                                    </>
                                                ) : (
                                                    'Submit Paper'
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="ps-form-body">
                                <div className="ps-success-message">
                                    <div className="ps-success-header">
                                        <FaCheckCircle className="ps-success-icon" />
                                        <h3 className="ps-success-title">Paper Submitted Successfully!</h3>
                                    </div>
                                    <div className="ps-submission-details">
                                        <div className="ps-detail-item">
                                            <span className="ps-detail-label">Paper Title:</span>
                                            <span className="ps-detail-value">{paperFile?.name.replace(/\.[^/.]+$/, "")}</span>
                                        </div>
                                        <div className="ps-detail-item">
                                            <span className="ps-detail-label">Submitted Date:</span>
                                            <span className="ps-detail-value">{new Date().toLocaleDateString()}</span>
                                        </div>
                                        <div className="ps-detail-item">
                                            <span className="ps-detail-label">Current Status:</span>
                                            <span className="ps-status-badge">
                                                <FaClock className="ps-status-icon" />
                                                Under Review
                                            </span>
                                        </div>
                                    </div>
                                    <p className="ps-success-text">
                                        Thank you for submitting your paper. Your submission has been received and is now under review.
                                        You will receive a confirmation email shortly with your submission details.
                                    </p>
                                    <div className="ps-success-actions">
                                        <button 
                                            onClick={handleCheckStatus} 
                                            className="ps-btn ps-btn-primary"
                                            type="button"
                                        >
                                            <FaChartBar className="ps-btn-icon" />
                                            Check Status
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaperSubmission;