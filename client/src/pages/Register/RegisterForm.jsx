import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './RegisterForm.css';

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
  
      {/* Form fields for each participant */}
      <div className="form-grid-cols-2">
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
          <div>
              <label className="form-label form-label-sm">Designation</label>
              <select
                  name="designation"
                  value={participant.designation}
                  onChange={(e) => handleParticipantChange(index, e)}
                  className="form-input-sm form-select"
                  required
              >
                  <option value="" disabled>Select a designation...</option>
                  <option value="Student">Student</option>
                  <option value="Academic/Researcher">Academic/Researcher</option>
                  <option value="Industry/Corporate">Industry/Corporate</option>
                  <option value="Accompanying Person">Accompanying Person</option>
              </select>
          </div>
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
          <div>
              <label className="form-label form-label-sm">Phone</label>
              <input
                  type="text"
                  name="phone"
                  value={participant.phone}
                  onChange={(e) => handleParticipantChange(index, e)}
                  className="form-input-sm"
                  required
              />
          </div>
          <div>
              <label className="form-label form-label-sm">Gender</label>
              <select
                  name="gender"
                  value={participant.gender}
                  onChange={(e) => handleParticipantChange(index, e)}
                  className="form-input-sm form-select"
                  required
              >
                  <option value="" disabled>Select gender...</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
              </select>
          </div>
          <div>
              <label className="form-label form-label-sm">Upload Proof</label>
              <input
                  type="file"
                  accept="image/*"
                  name="proofFile"
                  onChange={(e) => handleParticipantChange(index, e, true)}
                  className="form-input-sm"
                  required
              />
          </div>
      </div>
      {participant.proofUrl && (
          <div className="mt-2">
              <img
              src={participant.proofUrl}
              alt="Proof Preview"
              className="w-32 h-32 object-cover rounded border"
              />
          </div>
      )}
    </div>
  );
  
  const RegistrationForm = () => {
    const [participants, setParticipants] = useState([
      { name: '', designation: '', organisation: '', email: '', phone: '', gender: '', proofUrl: '', proofFile: null, isHostMember: false }
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
  
  
    const token = localStorage.getItem("token");
  
    const handleParticipantChange = (index, event, isFile = false) => {
      const newParticipants = [...participants];
      if(isFile) {
          const file = event.target.files[0];
          newParticipants[index]['proofFile'] = file;
          newParticipants[index]['proofUrl'] = file ? URL.createObjectURL(file) : '';
      } else {
          const { name, value, type, checked } = event.target;
          newParticipants[index][name] = type === 'checkbox' ? checked : value;
      }
      setParticipants(newParticipants);
    };
  
    const addParticipant = () => {
      if (participants.length < 4) {
        setParticipants([...participants, { name: '', designation: '', organisation: '', email: '', phone: '', gender: '', proofUrl: '', proofFile: null, isHostMember: false }]);
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
        // ... more validation for each participant field
      });
  
      if (!formData.address) errors.address = 'Address is required';
      // ... more validation for form fields
      
      if (!genuineSubmission) errors.genuineSubmission = 'Please confirm the submission is genuine';
      if (!termsAccepted) errors.termsAccepted = 'Please accept Terms & Conditions';
  
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (!validateForm()) return;
      setLoading(true);
  
      const finalData = {
        ...formData,
        participants: participants.map(({proofUrl, proofFile, ...p}) => p) // Exclude local URL and file object
      };
  
      try {
        // NOTE: You would typically handle file uploads differently, e.g., with FormData
        const response = await axios.post(
          "https://it-con-backend.onrender.com/api/register",
          finalData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setSubmittedData(response.data);
        setIsModalOpen(true);
        
      } catch (error) {
        console.error(error.response?.data || error.message);
        toast.error("Registration failed. Check console for details.");
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
            <ul>
              <li>Cancellation before <strong>January 31st, 2026</strong>: 75% refund of the registration fee.</li>
              <li>Cancellation before <strong>February 20th, 2026</strong>: 50% refund of the registration fee.</li>
              <li>No refunds will be made after <strong>February 20th, 2026</strong>.</li>
            </ul>
            <p>Bank charges and transaction fees, if any, will not be refunded.</p>
            {/* ... more terms ... */}
          </div>
          <div className="terms-modal-footer">
            <button onClick={onDecline} className="btn btn-secondary">Decline</button>
            <button onClick={onAccept} className="btn btn-primary">Accept</button>
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
      
      return (
          <React.Fragment>
               <ToastContainer />
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
                                      {formErrors.address && <p style={{ color: 'red' }}>{formErrors.address}</p>}
                                  </div>
                                  <div className="form-grid-cols-2">
                                      <div>
                                          <label htmlFor="country" className="form-label">Country</label>
                                          <input type="text" id="country" name="country" value={formData.country} onChange={handleFormChange} className="form-input" required />
                                          {formErrors.country && <p style={{ color: 'red' }}>{formErrors.country}</p>}
                                      </div>
                                      <div>
                                          <label htmlFor="pincode" className="form-label">Pincode / Postal Code</label>
                                          <input type="text" id="pincode" name="pincode" value={formData.pincode} onChange={handleFormChange} className="form-input" required />
                                          {formErrors.pincode && <p style={{ color: 'red' }}>{formErrors.pincode}</p>}
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
                                              <option value="Track 1">Track 1: Electrical Engineering</option>
                                              <option value="Track 2">Track 2: Communication Engineering</option>
                                              <option value="Track 3">Track 3: Biomedical Engineering</option>
                                              <option value="Track 4">Track 4: Computer Science & Multidisciplinary</option>
                                          </select>
                                          {formErrors.track && <p style={{ color: 'red' }}>{formErrors.track}</p>}
                                      </div>
                                      <div>
                                          <label htmlFor="abstractTitle" className="form-label">Abstract Title</label>
                                          <input type="text" id="abstractTitle" name="abstractTitle" value={formData.abstractTitle} onChange={handleFormChange} className="form-input" required />
                                          {formErrors.abstractTitle && <p style={{ color: 'red' }}>{formErrors.abstractTitle}</p>}
                                      </div>
                                  </div>
                                  <div>
                                      <label htmlFor="abstractContent" className="form-label">Abstract Content</label>
                                      <textarea id="abstractContent" name="abstractContent" value={formData.abstractContent} onChange={handleAbstractChange} className="form-textarea" required></textarea>
                                      <p className={`word-counter ${wordCount > 300 ? 'error' : ''}`}>{wordCount} / 300 words</p>
                                      {formErrors.abstractContent && <p style={{ color: 'red' }}>{formErrors.abstractContent}</p>}
                                  </div>
                                  <div>
                                      <label htmlFor="abstractExpression" className="form-label">Keywords</label>
                                      <input type="text" id="abstractExpression" name="abstractExpression" value={formData.abstractExpression} onChange={handleFormChange} className="form-input" required />
                                      {formErrors.abstractExpression && <p style={{ color: 'red' }}>{formErrors.abstractExpression}</p>}
                                  </div>
                                  <div>
                                      <label className="form-label">Presentation Mode</label>
                                      <select name="presentationMode" value={formData.presentationMode} onChange={handleFormChange} className="form-select" required>
                                          <option value="" disabled>Select Presentation Mode...</option>
                                          <option value="Online">Online</option>
                                          <option value="Offline">Offline</option>
                                      </select>
                                      {formErrors.presentationMode && <p style={{ color: 'red' }}>{formErrors.presentationMode}</p>}
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
                                  {formErrors.genuineSubmission && <p style={{ color: 'red' }}>{formErrors.genuineSubmission}</p>}
                              </div>
                              <div className="confirmation-group">
                                  <input
                                      type="checkbox"
                                      id="termsAccepted"
                                      checked={termsAccepted}
                                      readOnly
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
                                  {formErrors.termsAccepted && <p style={{ color: 'red' }}>{formErrors.termsAccepted}</p>}
                              </div>
                          </fieldset> 
                          <button 
                              type="submit" 
                              className="submit-btn" 
                              disabled={loading}
                          >
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
                              <p className="modal-description">Thank you for registering. Review the submitted data:</p>
                              <pre className="modal-data-preview">{JSON.stringify(submittedData, null, 2)}</pre>
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

