import React, { useState, useEffect, useRef } from 'react';
import '../App.css';
import './Home.css';
import './Tracks.css';
import './Organizers.css';
import Navbar from '../header/Navbar'; 

// --- Countdown Timer Component ---
const Countdown = () => {
  const calculateTimeLeft = () => {
    const difference = +new Date('2026-03-26T00:00:00') - +new Date();
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
            <p className="countdown-date">March 26th & 27th, 2026</p>
            <p className="countdown-title">Conference Countdown</p>
        </div>
        <div className="countdown-timer">
            {timerComponents.length ? timerComponents : <span>The Conference has started!</span>}
        </div>
    </div>
  );
};

// --- Hero Component ---
const Hero = () => {
    const title = "Joint International Conference on Research and Innovation";
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-title-decoration">
                    <p className="kicker">S3-ECBE' 2026</p>
                </div>
                <h1 className="animated-title">
                    {title.split('').map((char, index) => (
                        <span key={index} style={{ animationDelay: `${index * 0.03}s` }}>
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h1>
                <p className="hero-subtitle">
                    Smart and Sustainable Solutions in Electrical, Communication and Biomedical Engineering
                </p>
                <div className="hero-buttons">
                    <button className="btn btn-primary">Submit a Paper</button>
                    <button className="btn btn-secondary">View Tracks</button>
                </div>
            </div>
            <Countdown />
        </section>
    );
};

// --- About Section Component ---
const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`about-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="container">
        <div className="about-grid">
          <div className="about-images">
            <div className="image-grid">
              <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Students collaborating" className="about-image img-1" />
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Speaker at a lecture" className="about-image img-2" />
              <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Team working on a project" className="about-image img-3" />
              <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" alt="Networking at an event" className="about-image img-4" />
            </div>
            <button className="promo-video-btn">
              <div className="play-icon"></div>
              Promo Video
            </button>
          </div>
          <div className="about-content">
            <p className="kicker">// ABOUT THE CONFERENCE</p>
            <h2>An Intelligent Multidisciplinary Approach</h2>
            <p className="lead-quiet">
              The S3-ECBE' 2026 conference provides a vibrant platform for researchers, academics, and industry professionals to present their latest findings and innovations. This year's theme focuses on integrated, sustainable engineering solutions across multiple disciplines.
            </p>
            <p>All accepted papers will be published in the book chapter titled: <strong>“Integrated Sustainable Engineering Solutions: An Intelligent Multidisciplinary Approach”</strong>.</p>
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
};


// --- Tracks Component ---
const Tracks = () => {
    const tracksData = [
      {
        title: "Track 1: Electrical Engineering",
        description: "Innovative and Sustainable Smart Technologies",
        themes: [
          "Smart grids and microgrids", "Renewable energy systems", "Energy storage technologies",
          "Power electronics", "Smart metering", "Energy-efficient machines",
          "Automation and control", "IoT and AI-enabled systems", "Sustainable materials",
          "Electric vehicle technologies"
        ]
      },
      {
        title: "Track 2: Communication Engineering",
        description: "Innovative and Sustainable Smart Technologies",
        themes: [
          "Energy-efficient wireless systems", "Green networking", "Smart IoT and sensor networks",
          "5G/6G technologies", "Cognitive radio", "AI for communication",
          "Low-power hardware", "Sustainable network architectures", "Smart city communication",
          "Security and privacy"
        ]
      },
      {
        title: "Track 3: Biomedical Engineering",
        description: "Innovative and Sustainable Smart Technologies",
        themes: [
          "Energy-efficient biomedical devices", "Smart wearable health systems", "Sustainable signal processing",
          "AI for healthcare", "Low-power implantable devices", "Green manufacturing",
          "Telemedicine technologies", "Smart prosthetics", "Biomedical data analytics",
          "IoT in healthcare"
        ]
      },
      {
        title: "Track 4: Computer Science & Multidisciplinary Applications",
        description: "Innovative and Sustainable Smart Technologies",
        themes: [
          "Energy-efficient algorithms", "Sustainable AI and machine learning", "Smart data analytics",
          "Green cloud computing", "IoT and cyber-physical systems", "Human-computer interaction",
          "Multidisciplinary approaches", "Smart automation and robotics", "Blockchain for sustainability",
          "CS integration with other fields"
        ]
      }
    ];

  return (
    <section className="tracks-section">
      <div className="container">
        <div className="section-header">
          <p className="kicker">// CONFERENCE TRACKS</p>
          <h2>Explore Our Themes</h2>
        </div>
        <div className="tracks-grid">
          {tracksData.map((track, index) => (
            <div className="track-card" key={index}>
              <h3>{track.title}</h3>
              <p className="track-description">{track.description}</p>
              <ul className="themes-list">
                {track.themes.map((theme, i) => (
                  <li key={i}>{theme}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Organizers Component ---
const Organizers = () => {
  return (
    <section className="organizers-section">
      <div className="container">
        <div className="section-header">
          <p className="kicker">// PEOPLE & INFORMATION</p>
          <h2>Key Roles & Details</h2>
        </div>
        <div className="info-grid">
          <div className="info-card">
            <img src="https://placehold.co/150x50/0D47A1/FFFFFF?text=INTI+Logo" alt="INTI International University Logo" className="uni-logo" />
            <h4>Organized By</h4>
            <p>Theme of organiser name from INTI</p>
          </div>
          <div className="info-card">
            <h4>Chief Guest & Keynote Speaker</h4>
            <p>Names to be announced soon.</p>
          </div>
          <div className="info-card">
            <h4>Conference Co-Chair</h4>
            <p>Name to be announced soon.</p>
          </div>
          <div className="info-card">
            <h4>Book Chapter Chief Editor</h4>
            <p>One editor from INTI to be announced.</p>
          </div>
          <div className="info-card">
            <h4>Paper Evaluators</h4>
            <p>A diverse list of experts will be announced.</p>
          </div>
          <div className="info-card">
            <h4>Publication & Indexing</h4>
            <p>Contact Dr. Asokan Vasudevan for ISBN, Scopus Journals, and publisher coordination.</p>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Footer Component ---
const Footer = () => (
  <footer className="footer">
    <div className="container">
      <p>© 2026 KSR Educational Institutions & INTI International University</p>
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
        <Tracks />
        <Organizers />
      </main>
      <Footer />
    </>
  );
}

export default Home;
