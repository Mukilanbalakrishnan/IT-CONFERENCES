import React, { useState, useEffect } from 'react';
import '../App.css';
import './Home.css';

import Navbar from '../header/Navbar'; // Assuming Navbar is in the same directory for simplicity

// --- Countdown Timer Component ---
const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2025-10-20T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        weeks: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
        days: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval] && timeLeft[interval] !== 0) {
      return null;
    }
    return (
      <div className="countdown-item" key={interval}>
        <span className="countdown-number">
          {String(timeLeft[interval]).padStart(2, '0')}
        </span>
        <span className="countdown-label">{interval}</span>
      </div>
    );
  });

  return (
    <div className="countdown-container">
        <div className="countdown-info">
            <p className="countdown-date">Conference Date</p>
            <p className="countdown-title">Counting Time...</p>
        </div>
        <div className="countdown-timer">
            {timerComponents.length ? timerComponents : <span>Time's up!</span>}
        </div>
    </div>
  );
};

// --- Hero Component ---
const Hero = () => (
  <section className="hero">
    <div className="hero-content">
      <div className="hero-title-decoration">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6L5 11.1962V0.803848L0 6ZM55 6L50 0.803848V11.1962L55 6ZM4.5 7H50.5V5H4.5V7Z" fill="var(--brand-orange)"/>
          <path d="M5 6L10 11.1962V0.803848L5 6ZM50 6L45 0.803848V11.1962L50 6ZM9.5 7H45.5V5H9.5V7Z" fill="var(--brand-orange)"/>
          <path d="M10 6L15 11.1962V0.803848L10 6ZM45 6L40 0.803848V11.1962L45 6ZM14.5 7H40.5V5H14.5V7Z" fill="var(--brand-orange)"/>
          <path d="M15 6L20 11.1962V0.803848L15 6ZM40 6L35 0.803848V11.1962L40 6ZM19.5 7H35.5V5H19.5V7Z" fill="var(--brand-orange)"/>
          <path d="M20 6L25 11.1962V0.803848L20 6ZM35 6L30 0.803848V11.1962L35 6ZM24.5 7H30.5V5H24.5V7Z" fill="var(--brand-orange)"/>
        </svg>
      </div>
      <h1>Igniting the Future of Education</h1>
      <p className="hero-subtitle">20-22 October 2025 with over 100 sessions - Coimbatore, TN</p>
      <div className="hero-buttons">
        <button className="btn btn-primary">Registration</button>
        <button className="btn btn-secondary">View Details</button>
      </div>
    </div>
    <Countdown />
  </section>
);

// --- About Section Component ---
const About = () => (
  <section className="about-section">
    <div className="container">
      <div className="about-grid">
        <div className="about-images">
          <div className="image-grid">
            <img src="https://images.unsplash.com/photo-1588392382834-a891154bca4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Microphone at a conference" className="about-image img-1" />
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Speaker on stage" className="about-image img-2" />
            <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Audience in a conference hall" className="about-image img-3" />
            <img src="https://images.unsplash.com/photo-1560439514-4e9484803b84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Man in a suit at an event" className="about-image img-4" />
          </div>
          <button className="promo-video-btn">
            <div className="play-icon"></div>
            Promo Video
          </button>
        </div>
        <div className="about-content">
          <p className="kicker">// ABOUT THE CONFERENCE</p>
          <h2>Welcome to the Foremost Educational Conference</h2>
          <p className="lead-quiet">
            Join us for a landmark event dedicated to the future of learning. Our conference brings together the brightest minds in education—from pioneering researchers to innovative classroom teachers—to explore the transformative power of modern pedagogy and technology.
          </p>
          <div className="about-features">
            <div className="feature-item">
              <span className="feature-icon">🎓</span>
              <p>100+ Expert Speakers</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💡</span>
              <p>Innovative Workshops</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌐</span>
              <p>Global Networking</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🚀</span>
              <p>Future-Ready Skills</p>
            </div>
          </div>
          <button className="btn btn-secondary">
            View Our Schedule 
            <span className="arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
);

// --- Footer Component ---
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>© 2025 KSR Educational Institutions – Conference Website</p>
      <div className="links">
        <a href="#">Privacy Policy</a>
        <a href="#">Contact</a>
      </div>
    </div>
  </footer>
);

// --- Home Page Component ---
const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}

export default Home;
