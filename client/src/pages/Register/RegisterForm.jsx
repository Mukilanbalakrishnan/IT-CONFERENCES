import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base_url from '../../config';
import { useNavigate } from 'react-router-dom';

const componentStyles = `
/* --- Main Layout --- */
.main-container {
    width: 100%;
    max-width: 72rem;
    margin: 0 auto 2rem;
    display: grid;
    grid-template-columns: 1fr;
    border-radius: 1.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

@media (min-width: 1024px) {
    .main-container {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

/* --- Left Panel --- */
.left-panel {
    background-image: linear-gradient(rgba(13, 71, 161, 0.85), rgba(13, 71, 161, 0.95)), url('https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=1920&q=80');
    background-size: cover;
    background-position: center;
    color: white;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 400px;
}

@media (min-width: 768px) {
    .left-panel {
        padding: 2rem 3rem;
    }
}

.left-panel-title { 
    font-size: clamp(1.5rem, 4vw, 1.875rem); 
    font-weight: 800; 
    margin-bottom: 0.5rem; 
    color: #dbeafe; 
}
.left-panel-subtitle { 
    font-size: clamp(1rem, 2.5vw, 1.125rem); 
    font-weight: 600; 
    margin-bottom: 1.5rem; 
    color: #bfdbfe; 
}
.left-panel-description { 
    color: #dbeafe; 
    line-height: 1.6; 
    font-size: clamp(0.875rem, 2vw, 0.9rem); 
}
.left-panel-info { 
    margin-top: 2rem; 
    border-top: 1px solid #60a5fa; 
    padding-top: 1.5rem; 
}
.info-title { 
    font-weight: 700; 
    font-size: clamp(0.9rem, 2vw, 1rem);
}
.info-list { 
    list-style-position: inside; 
    list-style-type: disc; 
    margin-top: 0.5rem; 
    font-size: clamp(0.8rem, 1.5vw, 0.875rem); 
    color: #bfdbfe; 
}
.info-list li { 
    margin-bottom: 0.25rem; 
}

/* --- Right Panel (Form) --- */
.right-panel { 
    background-color: white; 
}
@media (min-width: 1024px) { 
    .right-panel { 
        grid-column: span 2 / span 2; 
    } 
}
.form-header { 
    background-color: #F57C00; 
    color: white; 
    text-align: center; 
    padding: 1rem 1.5rem; 
}
@media (min-width: 768px) {
    .form-header {
        padding: 1.5rem;
    }
}
.form-title { 
    font-size: clamp(1.25rem, 3vw, 1.5rem); 
    color: white; 
    font-weight: 700; 
    margin: 0;
}
.form-body { 
    padding: 1.5rem; 
    display: flex; 
    flex-direction: column; 
    gap: 1.5rem; 
}
@media (min-width: 768px) {
    .form-body {
        padding: 2rem 2.5rem;
        gap: 2rem;
    }
}

/* --- Form Elements --- */
.form-fieldset { 
    border: none; 
    padding: 0; 
    margin: 0; 
}
.fieldset-legend { 
    font-size: clamp(1.1rem, 2.5vw, 1.25rem); 
    font-weight: 600; 
    color: #1f2937; 
    margin-bottom: 1rem; 
    padding-bottom: 0.5rem; 
    border-bottom: 1px solid #e5e7eb; 
}
.form-section-spacing { 
    display: flex; 
    flex-direction: column; 
    gap: 1.25rem; 
}
.form-grid-cols-2 { 
    display: grid; 
    grid-template-columns: 1fr; 
    gap: 1rem; 
}
@media (min-width: 640px) { 
    .form-grid-cols-2 { 
        grid-template-columns: repeat(2, minmax(0, 1fr)); 
        gap: 1.5rem;
    } 
}
.form-label { 
    display: block; 
    margin-bottom: 0.5rem; 
    font-weight: 500; 
    color: #1f2937; 
    font-size: clamp(0.85rem, 2vw, 0.9rem); 
}
.form-label-sm { 
    font-size: clamp(0.8rem, 1.5vw, 0.875rem); 
}
.form-input, .form-select, .form-textarea, .form-input-sm { 
    width: 100%; 
    border: 1px solid #d1d5db; 
    border-radius: 0.5rem; 
    transition: all 0.2s ease; 
    box-sizing: border-box; 
    background-color: white; 
    font-size: clamp(0.875rem, 2vw, 1rem);
}
.form-input, .form-select, .form-textarea { 
    padding: 0.75rem; 
}
.form-input-sm { 
    padding: 0.5rem 0.75rem; 
    border-radius: 0.375rem; 
}
.form-input:focus, .form-select:focus, .form-textarea:focus, .form-input-sm:focus { 
    border-color: #1976D2; 
    box-shadow: 0 0 0 2px rgba(25, 118, 210, 0.2); 
    outline: none; 
}
.form-textarea { 
    height: 8rem; 
    resize: vertical; 
    min-height: 8rem;
}
@media (min-width: 768px) {
    .form-textarea {
        height: 10rem;
        min-height: 10rem;
    }
}
.form-select { 
    appearance: none; 
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e"); 
    background-position: right 0.75rem center; 
    background-repeat: no-repeat; 
    background-size: 1.2em; 
    padding-right: 2.5rem; 
}
.word-counter { 
    text-align: right; 
    font-size: clamp(0.8rem, 1.5vw, 0.875rem); 
    color: #6b7280; 
    margin-top: 0.25rem; 
}
.word-counter.error { 
    color: #EF5350; 
    font-weight: 600; 
}

/* --- Participants --- */
.participant-list { 
    display: flex; 
    flex-direction: column; 
    gap: 1.25rem; 
}
.participant-block { 
    padding: 1rem; 
    border: 1px solid #e5e7eb; 
    border-radius: 0.5rem; 
    background-color: #f9fafb; 
}
.participant-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    margin-bottom: 1rem; 
    flex-wrap: wrap;
    gap: 0.5rem;
}
.participant-title { 
    font-weight: 600; 
    color: #374151; 
    font-size: clamp(1rem, 2vw, 1.1rem);
}
.participant-field-full { 
    grid-column: span 1; 
}
@media (min-width: 768px) { 
    .participant-field-full { 
        grid-column: span 2; 
    } 
}

/* --- Confirmation & Buttons --- */
.confirmation-group { 
    display: flex; 
    align-items: flex-start; 
    gap: 0.75rem; 
    padding: 0.5rem 0; 
}
.form-checkbox { 
    height: 1.1rem; 
    width: 1.1rem; 
    flex-shrink: 0; 
    border-radius: 0.25rem; 
    border-color: #d1d5db; 
    margin-top: 0.2rem;
}
.confirmation-group label { 
    cursor: pointer; 
    font-size: clamp(0.8rem, 1.5vw, 0.875rem);
    line-height: 1.4;
}
.terms-link { 
    color: #1976D2; 
    text-decoration: underline; 
    font-weight: 500; 
    cursor: pointer; 
}
.terms-link:hover { 
    color: #0D47A1; 
}
.btn-add { 
    font-size: clamp(0.8rem, 1.5vw, 0.875rem); 
    font-weight: 600; 
    background-color: #1976D2; 
    color: white; 
    padding: 0.5rem 1rem; 
    border-radius: 0.375rem; 
    border: none; 
    width: auto; 
    margin-top: 1rem; 
    cursor: pointer; 
    transition: all 0.2s ease;
}
.btn-add:hover:not(:disabled) { 
    background-color: #1565C0; 
    transform: translateY(-1px);
}
.btn-add:disabled { 
    opacity: 0.5; 
    cursor: not-allowed; 
}
.btn-remove { 
    font-size: clamp(0.8rem, 1.5vw, 0.875rem); 
    font-weight: 600; 
    color: #EF5350; 
    background: none; 
    border: none; 
    cursor: pointer; 
    padding: 0.25rem; 
    white-space: nowrap;
}
.btn-remove:hover { 
    text-decoration: underline; 
}
.submit-btn { 
    width: 100%; 
    padding: 1rem; 
    font-size: clamp(1rem, 2.5vw, 1.1rem); 
    font-weight: 700; 
    background-color: #F57C00; 
    color: white; 
    border: none; 
    border-radius: 0.5rem; 
    cursor: pointer; 
    transition: background-color 0.2s; 
}
.submit-btn:hover:not(:disabled) { 
    background-color: #E65100; 
    transform: translateY(-1px);
}
.submit-btn:disabled { 
    background-color: #FBC02D; 
    cursor: not-allowed; 
}

/* --- Modals --- */
.modal-overlay { 
    position: fixed; 
    inset: 0; 
    background-color: rgba(0, 0, 0, 0.6); 
    backdrop-filter: blur(5px);
    display: flex; 
    align-items: center; 
    justify-content: center; 
    padding: 1rem; 
    z-index: 50; 
}
.modal-content { 
    background-color: white; 
    border-radius: 1rem; 
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); 
    max-width: min(32rem, 90vw); 
    width: 100%; 
    padding: 1.5rem; 
    text-align: center; 
    position: relative; 
    max-height: 90vh;
    overflow-y: auto;
}
@media (min-width: 640px) {
    .modal-content {
        padding: 2rem;
    }
}
.modal-close-btn { 
    position: absolute; 
    top: 0.75rem; 
    right: 0.75rem; 
    color: #9ca3af; 
    background: none; 
    border: none; 
    font-size: 1.5rem; 
    line-height: 1; 
    cursor: pointer; 
    padding: 0.25rem;
}
@media (min-width: 640px) {
    .modal-close-btn {
        top: 1rem;
        right: 1rem;
        font-size: 1.875rem;
    }
}
.modal-icon-wrapper { 
    margin: auto; 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    height: 3rem; 
    width: 3rem; 
    border-radius: 9999px; 
    background-color: #d1fae5; 
    margin-bottom: 1rem; 
}
@media (min-width: 640px) {
    .modal-icon-wrapper {
        height: 4rem;
        width: 4rem;
    }
}
.modal-icon { 
    height: 1.5rem; 
    width: 1.5rem; 
    color: #059669; 
}
@media (min-width: 640px) {
    .modal-icon {
        height: 2rem;
        width: 2rem;
    }
}
.modal-title { 
    font-size: clamp(1.25rem, 3vw, 1.5rem); 
    font-weight: 700; 
    color: #111827; 
    margin-bottom: 0.5rem;
}
.modal-description { 
    color: #4b5563; 
    margin-top: 0.5rem; 
    margin-bottom: 1.5rem; 
    font-size: clamp(0.9rem, 2vw, 1rem);
}
.terms-modal-overlay { 
    position: fixed; 
    inset: 0; 
    background-color: rgba(17, 19, 24, 0.7); 
    backdrop-filter: blur(4px); 
    display: flex; 
    align-items: center; 
    justify-content: center; 
    padding: 1rem; 
    z-index: 100; 
}
.terms-modal-content { 
    background-color: white; 
    border-radius: 1rem; 
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04); 
    max-width: min(48rem, 95vw); 
    width: 100%; 
    max-height: 90vh; 
    display: flex; 
    flex-direction: column; 
    overflow: hidden; 
}
.terms-modal-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 1rem 1.25rem; 
    border-bottom: 1px solid #e5e7eb; 
}
@media (min-width: 640px) {
    .terms-modal-header {
        padding: 1rem 1.5rem;
    }
}
.terms-modal-title { 
    font-size: clamp(1.1rem, 2.5vw, 1.25rem); 
    font-weight: 700; 
    margin: 0; 
}
.terms-modal-close-btn { 
    background: none; 
    border: none; 
    font-size: 1.5rem; 
    line-height: 1; 
    color: #9ca3af; 
    cursor: pointer; 
    padding: 0.25rem;
}
@media (min-width: 640px) {
    .terms-modal-close-btn {
        font-size: 2rem;
    }
}
.terms-modal-body { 
    padding: 0.5rem 1.25rem; 
    overflow-y: auto; 
    line-height: 1.7; 
    font-size: clamp(0.875rem, 2vw, 1rem);
}
@media (min-width: 640px) {
    .terms-modal-body {
        padding: 0.5rem 1.5rem;
    }
}
.terms-modal-body h4 { 
    font-weight: 600; 
    margin-top: 1.5rem; 
    margin-bottom: 0.5rem; 
    font-size: clamp(1rem, 2vw, 1.1rem);
}
.terms-modal-footer { 
    display: flex; 
    justify-content: flex-end; 
    gap: 1rem; 
    padding: 1rem 1.25rem; 
    border-top: 1px solid #e5e7eb; 
    background-color: #f9fafb; 
    flex-wrap: wrap;
}
@media (min-width: 640px) {
    .terms-modal-footer {
        padding: 1rem 1.5rem;
    }
}

/* --- Already Submitted Styles --- */
.already-submitted-container {
    text-align: center;
    padding: 2rem 1rem;
    background: #f8f9fa;
    border-radius: 12px;
    border: 2px solid #e9ecef;
    margin: 1rem 0;
}

@media (min-width: 768px) {
    .already-submitted-container {
        padding: 3rem 2rem;
        margin: 2rem 0;
    }
}

.submission-icon {
    font-size: clamp(3rem, 8vw, 4rem);
    color: #1976D2;
    margin-bottom: 1.5rem;
}

.submission-title {
    font-size: clamp(1.5rem, 4vw, 1.8rem);
    font-weight: 700;
    color: #1976D2;
    margin-bottom: 1rem;
}

.submission-message {
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    color: #6c757d;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.status-btn {
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: none;
    background-color: #F57C00;
    color: white;
    transition: all 0.2s ease;
    margin: 0.25rem;
    width: 100%;
}

@media (min-width: 640px) {
    .status-btn {
        width: auto;
        margin: 0 0.5rem;
    }
}

.status-btn:hover {
    background-color: #E65100;
    transform: translateY(-2px);
}

.back-btn {
    padding: clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    border: 2px solid #1976D2;
    background-color: transparent;
    color: #1976D2;
    transition: all 0.2s ease;
    margin: 0.25rem;
    width: 100%;
}

@media (min-width: 640px) {
    .back-btn {
        width: auto;
        margin: 0 0.5rem;
    }
}

.back-btn:hover {
    background-color: #1976D2;
    color: white;
}

/* --- Loading Styles --- */
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem 1rem;
    min-height: 300px;
}

@media (min-width: 768px) {
    .loading-container {
        padding: 6rem 1rem;
    }
}

.loader {
    display: flex;
    gap: 0.5rem;
}

.loader-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #F57C00;
    animation: loader-bounce 0.6s infinite alternate;
}

.loader-dot:nth-child(2) {
    animation-delay: 0.2s;
}

.loader-dot:nth-child(3) {
    animation-delay: 0.4s;
}

.loading-text {
    margin-top: 1.5rem;
    font-size: clamp(1rem, 2.5vw, 1.1rem);
    font-weight: 500;
    color: #6c757d;
    text-align: center;
}

@keyframes loader-bounce {
    from {
        transform: translateY(0);
    }
    to {
        transform: translateY(-10px);
    }
}

/* --- Image Preview --- */
.image-preview-container {
    margin-top: 0.5rem;
}

.image-preview {
    width: 100%;
    max-width: 8rem;
    height: 8rem;
    object-fit: cover;
    border-radius: 0.25rem;
    border: 1px solid #e5e7eb;
}

/* --- Button Container for Mobile --- */
.button-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;
}

@media (min-width: 640px) {
    .button-container {
        flex-direction: row;
        justify-content: center;
        gap: 1rem;
    }
}

/* --- Error Messages --- */
.error-message {
    color: #EF5350;
    font-size: clamp(0.8rem, 1.5vw, 0.875rem);
    margin-top: 0.25rem;
    font-weight: 500;
}

/* --- File Input --- */
.file-input {
    font-size: clamp(0.8rem, 1.5vw, 0.875rem);
}

/* --- Utility Classes --- */
.text-center {
    text-align: center;
}

.mt-2 {
    margin-top: 0.5rem;
}

.mb-2 {
    margin-bottom: 0.5rem;
}

.p-2 {
    padding: 0.5rem;
}

.w-full {
    width: 100%;
}

/* --- Mobile First Responsive Design --- */
@media (max-width: 639px) {
    .main-container {
        margin: 0 auto 1rem;
        border-radius: 1rem;
    }
    
    .form-body {
        gap: 1.25rem;
    }
    
    .participant-block {
        padding: 0.75rem;
    }
    
    .participant-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
    }
}

@media (max-width: 767px) {
    .left-panel {
        text-align: center;
    }
    
    .info-list {
        text-align: left;
    }
}

/* --- Print Styles --- */
@media print {
    .main-container {
        box-shadow: none;
        border: 1px solid #e5e7eb;
    }
    
    .btn-add, .btn-remove, .submit-btn {
        display: none;
    }
}
`;

const ParticipantInput = ({ index, participant, handleParticipantChange, removeParticipant }) => (
  <div className="participant-block">
    <div className="participant-header">
      <h4 className="participant-title">Participant {index + 1}</h4>
      {index > 0 && (
        <button type="button" onClick={() => removeParticipant(index)} className="btn-remove">
          Remove
        </button>
      )}
    </div>

    <div className="form-grid-cols-2">
      {/* Name */}
      <div>
        <label className="form-label form-label-sm">Name</label>
        <input
          type="text"
          name="name"
          value={participant.name}
          onChange={(e) => handleParticipantChange(index, e)}
          className="form-input-sm"
          required
        />
      </div>

      {/* Designation */}
      <div>
        <label className="form-label form-label-sm">Designation</label>
        <select
          name="designation"
          value={participant.designation}
          onChange={(e) => handleParticipantChange(index, e)}
          className="form-input-sm form-select"
          required
        >
          <option value="" disabled>Select...</option>
          <option value="student">Student</option>
          <option value="academic/researcher">Academic/Researcher</option>
          <option value="industry/corporate">Industry/Corporate</option>
          <option value="accompanying person">Accompanying Person</option>
        </select>
      </div>

      {/* Organisation (full width) */}
      <div className="participant-field-full">
        <label className="form-label form-label-sm">Organisation</label>
        <input
          type="text"
          name="organisation"
          value={participant.organisation}
          onChange={(e) => handleParticipantChange(index, e)}
          className="form-input-sm"
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="form-label form-label-sm">Email</label>
        <input
          type="email"
          name="email"
          value={participant.email}
          onChange={(e) => handleParticipantChange(index, e)}
          className="form-input-sm"
          required
        />
      </div>

      {/* Phone */}
      <div>
        <label className="form-label form-label-sm">Phone</label>
        <input
          type="tel"
          name="phone"
          value={participant.phone}
          onChange={(e) => handleParticipantChange(index, e)}
          className="form-input-sm"
          required
        />
      </div>

      {/* Gender */}
      <div>
        <label className="form-label form-label-sm">Gender</label>
        <select
          name="gender"
          value={participant.gender}
          onChange={(e) => handleParticipantChange(index, e)}
          className="form-input-sm form-select"
          required
        >
          <option value="" disabled>Select...</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Proof Upload */}
      <div>
        <label className="form-label form-label-sm">Upload Proof (Image)</label>
        <input
          type="file"
          accept="image/*"
          name="proofFile"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const previewUrl = URL.createObjectURL(file);
              handleParticipantChange(index, {
                target: { name: "proofUrl", value: previewUrl },
              });
              handleParticipantChange(index, {
                target: { name: "proofFile", value: file },
              });
            }
          }}
          className="form-input-sm file-input"
          required={!participant.proofUrl}
        />

        {participant.proofUrl && (
          <div className="image-preview-container">
            <img
              src={participant.proofUrl}
              alt="Proof Preview"
              className="image-preview"
            />
          </div>
        )}
      </div>
    </div>
  </div>
);

// Loader Component
const Loader = () => (
  <div className="loading-container">
    <div className="loader">
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
      <div className="loader-dot"></div>
    </div>
    <p className="loading-text">Checking your submission status...</p>
  </div>
);

// Already Submitted Component
const AlreadySubmitted = ({ onViewStatus, onGoBack }) => (
  <div className="already-submitted-container">
    <div className="submission-icon">✓</div>
    <h2 className="submission-title">Abstract Already Submitted!</h2>
    <p className="submission-message">
      Your abstract has been successfully submitted and is currently under review. 
      You can track the status of your submission using the button below.
    </p>
    <div className="button-container">
      <button onClick={onViewStatus} className="status-btn">
        Check Submission Status
      </button>
      <button onClick={onGoBack} className="back-btn">
        Go Back
      </button>
    </div>
  </div>
);

const RegistrationForm = () => {
  const [participants, setParticipants] = useState([
    { name: '', designation: '', organisation: '', email: '', phone: '', gender: '', proofUrl: '', isHostMember: false }
  ]);
  const [formData, setFormData] = useState({
    address: '', country: '', pincode: '', track: '', presentationMode: '', abstractTitle: '', abstractContent: '', abstractExpression: ''
  });
  const [wordCount, setWordCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [genuineSubmission, setGenuineSubmission] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Check if abstract is already submitted
  useEffect(() => {
    const checkSubmissionStatus = async () => {
      if (!token) {
        setCheckingStatus(false);
        return;
      }

      try {
        const response = await axios.get(`${base_url}/users/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = response.data;
        console.log('User data:', userData);

        // Check if abstract is already submitted (not "no abstract")
        if (userData.abstractStatus && userData.abstractStatus !== "no abstract" && userData.abstractStatus !== "No Abstract") {
          setAlreadySubmitted(true);
        }
      } catch (error) {
        console.error('Error checking submission status:', error);
        // If there's an error, we'll still show the form
      } finally {
        setCheckingStatus(false);
      }
    };

    checkSubmissionStatus();
  }, [token]);

  const handleParticipantChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newParticipants = [...participants];
    newParticipants[index][name] = type === 'checkbox' ? checked : value;
    setParticipants(newParticipants);
  };

  const addParticipant = () => {
    if (participants.length < 4) {
      setParticipants([...participants, { name: '', designation: '', organisation: '', email: '', phone: '', gender: '', proofUrl: '', isHostMember: false }]);
    }
  };

  const removeParticipant = (index) => {
    const newParticipants = participants.filter((_, i) => i !== index);
    setParticipants(newParticipants);
  };

  const handleFormChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAbstractChange = (event) => {
    const content = event.target.value;
    setFormData({ ...formData, abstractContent: content });
    const words = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
    setWordCount(words);
  };

  const validateForm = () => {
    const errors = {};
    participants.forEach((p, i) => {
      if (!p.name) errors[`participant${i}-name`] = 'Full Name is required';
      if (!p.designation) errors[`participant${i}-designation`] = 'Designation is required';
      if (!p.organisation) errors[`participant${i}-organisation`] = 'Organisation is required';
      if (!p.email) errors[`participant${i}-email`] = 'Email is required';
      if (!p.phone) errors[`participant${i}-phone`] = 'Phone number is required';
      if (!p.gender) errors[`participant${i}-gender`] = 'Gender is required';
      if (!p.proofUrl) errors[`participant${i}-proofUrl`] = 'Proof URL is required';
    });

    if (!formData.address) errors.address = 'Address is required';
    if (!formData.country) errors.country = 'Country is required';
    if (!formData.pincode) errors.pincode = 'Pincode is required';
    if (!formData.track) errors.track = 'Conference Track is required';
    if (!formData.presentationMode) errors.presentationMode = 'Presentation Mode is required';
    if (!formData.abstractTitle) errors.abstractTitle = 'Abstract Title is required';
    if (!formData.abstractContent) errors.abstractContent = 'Abstract Content is required';
    if (wordCount > 300) errors.abstractContent = 'Abstract exceeds 300 words';
    if (!formData.abstractExpression) errors.abstractExpression = 'Keywords are required';
    if (!genuineSubmission) errors.genuineSubmission = 'Please confirm the submission is genuine';
    if (!termsAccepted) errors.termsAccepted = 'Please accept Terms & Conditions';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    // Convert presentationMode to lowercase for backend compatibility
    const presentationModeValue = formData.presentationMode.toLowerCase();

    const finalData = {
      participants: participants.map(p => ({
        name: p.name,
        designation: p.designation.toLowerCase(),
        organisation: p.organisation,
        email: p.email,
        phone: p.phone,
        gender: p.gender,
        proofUrl: p.proofUrl,
        isHostMember: p.isHostMember || false
      })),
      address: formData.address || null,
      country: formData.country || null,
      pincode: formData.pincode || null,
      track: formData.track || null,
      presentationMode: presentationModeValue, // Use lowercase value
      abstractTitle: formData.abstractTitle || null,
      abstractContent: formData.abstractContent || null,
      abstractExpression: formData.abstractExpression || null,
    };

    // Print values to console before submission for debugging
    console.log('=== FORM DATA TO BE SUBMITTED ===');
    console.log('Participants:', finalData.participants);
    console.log('Contact Information:', {
      address: finalData.address,
      country: finalData.country,
      pincode: finalData.pincode
    });
    console.log('Abstract Submission:', {
      track: finalData.track,
      presentationMode: finalData.presentationMode,
      abstractTitle: finalData.abstractTitle,
      abstractContent: finalData.abstractContent,
      abstractExpression: finalData.abstractExpression,
      wordCount: wordCount
    });
    console.log('Confirmation:', {
      genuineSubmission,
      termsAccepted
    });
    console.log('=== END FORM DATA ===');

    try {
      setLoading(true);
      const response = await axios.post(
        `${base_url}/register`,
        finalData,
        { headers: { Authorization: `Bearer ${token}`} }
      );
      setSubmittedData(response.data);
      setIsModalOpen(true);

      // Reset form
      setParticipants([{ name: '', designation: '', organisation: '', email: '', phone: '', gender: '', proofUrl: '', isHostMember: false }]);
      setFormData({ address: '', country: '', pincode: '', track: '', presentationMode: '', abstractTitle: '', abstractContent: '', abstractExpression: '' });
      setWordCount(0);
      setGenuineSubmission(false);
      setTermsAccepted(false);
      setFormErrors({});
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      alert("Registration failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const TermsModal = ({ onAccept, onDecline, onClose }) => (
    <div className="terms-modal-overlay">
      <div className="terms-modal-content">
        <div className="terms-modal-header">
          <h3 className="terms-modal-title">Conference Terms & Conditions</h3>
          <button onClick={onClose} className="terms-modal-close-btn">&times;</button>
        </div>
        <div className="terms-modal-body">
          <h4>1. Registration Confirmation</h4>
          <p>Registration will be confirmed only after full payment of the applicable conference fees.</p>
          <h4>2. Payment Methods</h4>
          <p>Payments can be made via bank transfer, online payment gateway, or as specified on the conference website.</p>
          <h4>3. Cancellation and Refunds</h4>
          <p>Cancellation requests must be submitted in writing via email to the conference secretariat. Refunds, if applicable, will be processed as follows:</p>
          <ul>
            <li>Cancellation before <strong>January 31st, 2026</strong>: 75% refund of the registration fee.</li>
            <li>Cancellation before <strong>February 20th, 2026</strong>: 50% refund of the registration fee.</li>
            <li>No refunds will be made after <strong>February 20th, 2026</strong>.</li>
          </ul>
          <p>Bank charges and transaction fees, if any, will not be refunded.</p>
          <h4>4. Substitution</h4>
          <p>Registrants unable to attend may transfer their registration to another person by informing the conference secretariat in writing prior to the event.</p>
          <h4>5. Certificate of Participation</h4>
          <p>Certificates will be issued only to participants who have registered and attended the conference.</p>
          <h4>6. Conference Program Changes</h4>
          <p>The organizers reserve the right to modify the conference program, venue, speakers, and dates without prior notice.</p>
          <h4>7. Intellectual Property</h4>
          <p>All presentations and materials shared during the conference are for personal use only and should not be reproduced or distributed without permission.</p>
          <h4>8. Liability & Force Majeure</h4>
          <p>The organizers are not responsible for any loss, injury, or damage incurred during the conference. In case of unforeseen circumstances such as natural disasters or other force majeure events, the conference may be postponed or canceled.</p>
        </div>
        <div className="terms-modal-footer">
          <button onClick={onDecline} className="back-btn">Decline</button>
          <button onClick={onAccept} className="status-btn">Accept</button>
        </div>
      </div>
    </div>
  );

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
    setIsTermsModalOpen(false);
  };

  const handleDeclineTerms = () => {
    setTermsAccepted(false);
    setIsTermsModalOpen(false);
  };

  const handleViewStatus = () => {
    navigate('/status');
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  // Show loader while checking status
  if (checkingStatus) {
    return (
      <React.Fragment>
        <style>{componentStyles}</style>
        <div className="main-container">
          <Loader />
        </div>
      </React.Fragment>
    );
  }

  // Show already submitted message if abstract is already submitted
  if (alreadySubmitted) {
    return (
      <React.Fragment>
        <style>{componentStyles}</style>
        <div className="main-container">
          <div className="left-panel">
            <div>
              <h1 className="left-panel-title">S3-ECBE' 2026</h1>
              <p className="left-panel-subtitle">Joint International Conference</p>
              <p className="left-panel-description">
                Welcome to the registration portal. Track your submission status and progress.
              </p>
            </div>
          </div>
          <div className="right-panel">
            <div className="form-header">
              <h2 className="form-title">Submission Status</h2>
            </div>
            <AlreadySubmitted 
              onViewStatus={handleViewStatus}
              onGoBack={handleGoBack}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  // Show the registration form if no abstract is submitted
  return (
    <React.Fragment>
      <style>{componentStyles}</style>
      <div className="main-container">
        {/* Left Panel */}
        <div className="left-panel">
          <div>
            <h1 className="left-panel-title">S3-ECBE' 2026</h1>
            <p className="left-panel-subtitle">Joint International Conference</p>
            <p className="left-panel-description">
              Welcome to the registration portal. Please fill out the form to secure your spot and submit your abstract for the conference.
            </p>
            <div className="left-panel-info">
              <p className="info-title">Key Information:</p>
              <ul className="info-list">
                <li>You can register 1 to 4 participants.</li>
                <li>An abstract submission is required.</li>
                <li>Ensure all details are accurate before submitting.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="right-panel">
          <div className="form-header">
            <h2 className="form-title">Conference Registration Form</h2>
          </div>
          <form onSubmit={handleSubmit} className="form-body">
            {/* Participant Details */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Participant Details (1-4)</legend>
              <div className="participant-list">
                {participants.map((p, index) => (
                  <ParticipantInput
                    key={index}
                    index={index}
                    participant={p}
                    handleParticipantChange={handleParticipantChange}
                    removeParticipant={removeParticipant}
                  />
                ))}
              </div>
              <button type="button" onClick={addParticipant} className="btn-add" disabled={participants.length >= 4}>
                + Add Another Participant
              </button>
            </fieldset>

            {/* Contact Information */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Contact Information</legend>
              <div className="form-section-spacing">
                <div>
                  <label htmlFor="address" className="form-label">Mailing Address</label>
                  <textarea id="address" name="address" value={formData.address} onChange={handleFormChange} className="form-textarea" required></textarea>
                  {formErrors.address && <p className="error-message">{formErrors.address}</p>}
                </div>
                <div className="form-grid-cols-2">
                  <div>
                    <label htmlFor="country" className="form-label">Country</label>
                    <input type="text" id="country" name="country" value={formData.country} onChange={handleFormChange} className="form-input" required />
                    {formErrors.country && <p className="error-message">{formErrors.country}</p>}
                  </div>
                  <div>
                    <label htmlFor="pincode" className="form-label">Pincode / Postal Code</label>
                    <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleFormChange} className="form-input" required />
                    {formErrors.pincode && <p className="error-message">{formErrors.pincode}</p>}
                  </div>
                </div>
              </div>
            </fieldset>

            {/* Abstract Submission */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Abstract Submission</legend>
              <div className="form-section-spacing">
                <div className="form-grid-cols-2">
                  <div>
                    <label htmlFor="track" className="form-label">Conference Track</label>
                    <select id="track" name="track" value={formData.track} onChange={handleFormChange} className="form-select" required>
                      <option value="" disabled>Select a Conference Track...</option>
                      <option value="electrical engineering">Track 1: Electrical Engineering</option>
                      <option value="communication engineering">Track 2: Communication Engineering</option>
                      <option value="biomedical engineering">Track 3: Biomedical Engineering</option>
                      <option value="computer science & multidisciplinary">Track 4: Computer Science & Multidisciplinary</option>
                    </select>
                    {formErrors.track && <p className="error-message">{formErrors.track}</p>}
                  </div>
                  <div>
                    <label htmlFor="abstractTitle" className="form-label">Abstract Title</label>
                    <input type="text" id="abstractTitle" name="abstractTitle" value={formData.abstractTitle} onChange={handleFormChange} className="form-input" required />
                    {formErrors.abstractTitle && <p className="error-message">{formErrors.abstractTitle}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="abstractContent" className="form-label">Abstract Content</label>
                  <textarea id="abstractContent" name="abstractContent" value={formData.abstractContent} onChange={handleAbstractChange} className="form-textarea" required></textarea>
                  <p className={`word-counter ${wordCount > 300 ? 'error' : ''}`}>{wordCount} / 300 words</p>
                  {formErrors.abstractContent && <p className="error-message">{formErrors.abstractContent}</p>}
                </div>
                <div>
                  <label htmlFor="abstractExpression" className="form-label">Keywords</label>
                  <input type="text" id="abstractExpression" name="abstractExpression" value={formData.abstractExpression} onChange={handleFormChange} className="form-input" required />
                  {formErrors.abstractExpression && <p className="error-message">{formErrors.abstractExpression}</p>}
                </div>
                <div>
                  <label className="form-label">Presentation Mode</label>
                  <select name="presentationMode" value={formData.presentationMode} onChange={handleFormChange} className="form-select" required>
                    <option value="" disabled>Select Presentation Mode...</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>
                  {formErrors.presentationMode && <p className="error-message">{formErrors.presentationMode}</p>}
                </div>
              </div>
            </fieldset>

            {/* Confirmation */}
            <fieldset className="form-fieldset">
              <legend className="fieldset-legend">Final Confirmation</legend>
              <div className="confirmation-group">
                <input
                  type="checkbox"
                  id="genuineSubmission"
                  checked={genuineSubmission}
                  onChange={(e) => setGenuineSubmission(e.target.checked)}
                  className="form-checkbox"
                />
                <label htmlFor="genuineSubmission" className="form-label-sm">
                  I declare that the information submitted is genuine.
                </label>
                {formErrors.genuineSubmission && <p className="error-message">{formErrors.genuineSubmission}</p>}
              </div>
              <div className="confirmation-group">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  checked={termsAccepted}
                  readOnly
                  onClick={() => setIsTermsModalOpen(true)}
                  className="form-checkbox"
                />
                <label htmlFor="termsAccepted" className="form-label-sm">
                  I agree to the{" "}
                  <span
                    onClick={() => setIsTermsModalOpen(true)}
                    className="terms-link"
                  >
                    Terms and Conditions
                  </span>.
                </label>
                {formErrors.termsAccepted && <p className="error-message">{formErrors.termsAccepted}</p>}
              </div>
            </fieldset> 
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit Registration"}
            </button>
          </form>
        </div>

        {/* Submission Modal */}
        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={() => setIsModalOpen(false)} className="modal-close-btn">&times;</button>
              <div className="modal-icon-wrapper">
                <svg className="modal-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="modal-title">Registration Submitted!</h3>
              <p className="modal-description">Thank you for registering. Your abstract has been successfully submitted for review.</p>
            </div>
          </div>
        )}

        {/* Terms Modal */}
        {isTermsModalOpen && (
          <TermsModal 
            onAccept={handleAcceptTerms} 
            onDecline={handleDeclineTerms}
            onClose={handleDeclineTerms}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default RegistrationForm;