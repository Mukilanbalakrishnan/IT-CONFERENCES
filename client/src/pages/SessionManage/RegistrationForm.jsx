import React, { useState } from 'react';
import './RegistrationForm.css'; // This line links the CSS file

const RegistrationForm = () => {
  // State to manage the form data
  const [formData, setFormData] = useState({
    username: '',
    dob: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile: '',
    userAgreement: false,
  });

  // Handler for all input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      // Using a simple alert for demonstration.
      // A more user-friendly UI element is recommended in a real app.
      alert("Passwords don't match!");
      return;
    }
    // Logic for sending data to a server would go here
    console.log('Form submitted:', formData);
    alert('Registration successful!');
  };

  return (
    <div className="registration-container">
      {/* Attractive Header for the Registration Form */}
      <div className="form-header">
        <h2 className="header-title">KSR Conference Registration</h2>
      </div>

      <div className="registration-card">
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>


          {/* Date of Birth Field */}
          <div className="form-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          {/* Mobile Number Field */}
          <div className="form-group">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>


          {/* User Agreement Checkbox */}
          <div className="form-agreement">
            <input
              type="checkbox"
              id="userAgreement"
              name="userAgreement"
              checked={formData.userAgreement}
              onChange={handleChange}
              required
            />
            <label htmlFor="userAgreement">
              I agree to the <a href="#">Terms of Service</a>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
