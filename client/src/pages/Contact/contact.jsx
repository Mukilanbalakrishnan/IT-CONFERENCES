import React, { useState } from 'react';
import Map from '../Home/Map';
import './contact.css'; 

const ContactUsPreview = () => {
    // Form state
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        message: '',
    });
    const [touched, setTouched] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validation logic
    const validate = () => {
        const errors = {};
        if (!form.firstName) errors.firstName = 'First name is required';
        if (!form.lastName) errors.lastName = 'Last name is required';
        if (!form.email) errors.email = 'Email is required';
        else if (!/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(form.email))
            errors.email = 'Invalid email';
        if (!form.contact) errors.contact = 'Contact number is required';
        return errors;
    };

    const errors = validate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleBlur = (e) => {
        setTouched((t) => ({ ...t, [e.target.name]: true }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length === 0) {
            setIsSubmitting(true);
            // Simulate API call
            setTimeout(() => {
                alert('Message sent! (mock)');
                setForm({ firstName: '', lastName: '', email: '', contact: '', message: '' });
                setTouched({});
                setIsSubmitting(false);
            }, 1500);
        } else {
            setTouched({ firstName: true, lastName: true, email: true, contact: true });
        }
    };

    return (
        <>  
            <div className="contact-page-root">
                <div className="decorative-circle circle-1"></div>
                <div className="decorative-circle circle-2"></div>
                
                <main className="main-content">
                    <div className="page-header">
                        <h1 className="page-title">Get In Touch</h1>
                        <p className="page-subtitle">
                            Have questions about the KSR Conference? We're here to help! Reach out to our team for 
                            assistance with registration, event details, or any other inquiries.
                        </p>
                    </div>
                    
                    <div className="contact-grid-container">
                        <section className="form-section">
                            <h3>Send us a message</h3>
                            <form onSubmit={onSubmit} noValidate>
                                <div className="form-grid">
                                    <div className="form-field">
                                        <label htmlFor="firstName">First Name</label>
                                        <input 
                                            id="firstName" 
                                            name="firstName" 
                                            value={form.firstName} 
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            placeholder="Enter your first name" 
                                        />
                                        {touched.firstName && errors.firstName && <span className="error-message">{errors.firstName}</span>}
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="lastName">Last Name</label>
                                        <input 
                                            id="lastName" 
                                            name="lastName" 
                                            value={form.lastName} 
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            placeholder="Enter your last name" 
                                        />
                                        {touched.lastName && errors.lastName && <span className="error-message">{errors.lastName}</span>}
                                    </div>
                                    <div className="form-field full-width">
                                        <label htmlFor="email">Email</label>
                                        <input 
                                            id="email" 
                                            name="email" 
                                            type="email" 
                                            value={form.email} 
                                            onChange={handleChange} 
                                            onBlur={handleBlur} 
                                            placeholder="Enter your email address" 
                                        />
                                        {touched.email && errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>
                                    <div className="form-field full-width">
                                        <label htmlFor="contact">Contact Details</label>
                                        <div className="contact-input-group">
                                            <select>
                                                <option>+91</option>
                                                <option>+1</option>
                                                <option>+44</option>
                                                <option>+61</option>
                                            </select>
                                            <input 
                                                id="contact" 
                                                name="contact" 
                                                type="tel" 
                                                value={form.contact} 
                                                onChange={handleChange} 
                                                onBlur={handleBlur} 
                                                placeholder="Enter your contact number" 
                                            />
                                        </div>
                                        {touched.contact && errors.contact && <span className="error-message">{errors.contact}</span>}
                                    </div>
                                    <div className="form-field full-width optional">
                                        <label htmlFor="message">Message</label>
                                        <textarea 
                                            id="message" 
                                            name="message" 
                                            value={form.message} 
                                            onChange={handleChange} 
                                            placeholder="Tell us how we can help you..." 
                                        />
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <i className="fas fa-spinner fa-spin" style={{marginRight: '6px'}}></i>
                                            Sending...
                                        </>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        </section>
                        
                        <aside className="info-card-container">
                            <h3>Contact Information</h3>
                            <div className="info-item">
                                <i className="fas fa-phone-alt"></i>
                                <div>
                                    <strong>Hotline:</strong>
                                    <span>+91 427 409 9999</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="far fa-envelope"></i>
                                <div>
                                    <strong>Email:</strong>
                                    <span>info@ksrconference.com</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="fas fa-map-marker-alt"></i>
                                <div>
                                    <strong>Venue:</strong>
                                    <span>KSR College of Engineering, Tiruchengode</span>
                                </div>
                            </div>
                            <div className="info-item">
                                <i className="far fa-clock"></i>
                                <div>
                                    <strong>Response Time:</strong>
                                    <span>Within 24 hours</span>
                                </div>
                            </div>
                            
                            <div className="social-connect">
                                <p>Follow us on social media</p>
                                <div className="social-icons">
                                    <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                                    <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                                    <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                                </div>
                            </div>
                        </aside>
                    </div>
                    
                    <section className="faq-section">
                        <h2 className="faq-title">Frequently Asked Questions</h2>
                        <div className="faq-grid">
                            <div className="faq-item">
                                <h4><i className="far fa-question-circle"></i>Registration Process</h4>
                                <p>Learn about our simple registration process, payment options, and how to confirm your participation in the conference.</p>
                            </div>
                            <div className="faq-item">
                                <h4><i className="far fa-question-circle"></i>Accommodation</h4>
                                <p>Information about recommended hotels, special conference rates, and transportation options to the venue.</p>
                            </div>
                            <div className="faq-item">
                                <h4><i className="far fa-question-circle"></i>Presentation Guidelines</h4>
                                <p>Details on presentation formats, time allocations, and technical requirements for speakers.</p>
                            </div>
                        </div>
                    </section>
                    
                    <Map/>
                    
                </main>
            </div>
        </>
    );
};

export default ContactUsPreview;
