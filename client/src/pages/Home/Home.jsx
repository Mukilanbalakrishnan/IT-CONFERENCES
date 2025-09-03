import React, { useState, useEffect, useRef } from 'react';
import '/src/App.css';
import './Home.css';
import Tracks from './Tracks';
import Navbar from '/src/header/Navbar';
import Map from './Map';
import Patrons from './Patrons';
import Chair from './Chair';
import ChiefPatron from './Chiefpatron';

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
    const title = "Joint International Conference on";
    return (
        <section className="hero">
            <video autoPlay loop muted className="hero-video-bg">
                <source src="https://res.cloudinary.com/dllbh1v1m/video/upload/v1754979177/vdo1_g6wq8h.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="hero-content">
                <div className="hero-title-decoration">
                    <p className="kicker">S3-ECBE' 2026</p>
                </div>
                <h1 className="animated-title">
                    {title.split(' ').map((word, wordIndex) => (
                        <span key={wordIndex} className="animated-word">
                            {word.split('').map((char, charIndex) => (
                                <span
                                    key={charIndex}
                                    className="animated-char"
                                    style={{ animationDelay: `${(wordIndex * 0.1) + (charIndex * 0.03)}s` }}
                                >
                                    {char}
                                </span>
                            ))}
                            {'\u00A0'}
                        </span>
                    ))}
                </h1>
                <p className="hero-subtitle">
                    Research and Innovation Smart and Sustainable Solutions in Electrical, Communication and Biomedical Engineering
                </p>
                <p className="hero-date">
                    March 26th Thursday & 27th Friday, 2026
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

// --- Collaboration Section Component ---
const Collaboration = () => {
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
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`collaboration-section ${isVisible ? 'is-visible' : ''}`}>
      <div className="container">
        <div className="collaboration-title-wrapper">
            <h3 className="collaboration-title">In Collaboration With</h3>
        </div>
        <div className="collaboration-content-wrapper">
            <div className="logo-item">
                <img src="https://res.cloudinary.com/dllbh1v1m/image/upload/v1755753110/pcytcphmgc1irewg4suw.webp " alt="KSR College of Engineering" />
                <div className="host-details">
                    <h4>Host Institution</h4>
                    <p>Department of Electronics and Communication, Electrical and Electronics & Biomedical Engineering, K.S.R. College of Engineering (Autonomous), Tiruchengode, Namakkal – 637215, Tamilnadu, India</p>
                </div>
            </div>
            <div className="logo-item">
                <img src="https://res.cloudinary.com/dllbh1v1m/image/upload/v1755753114/uhlv9wulx2dexlv6bnz2.png " alt="INTI International University" />
                <div className="host-details">
                    <h4>Co-Host University</h4>
                    <p>INTI International University, Persiaran Perdana BBN, Putra Nilai 71800 Nilai, Negeri Sembilan, Malaysia</p>
                </div>
            </div>
        </div>
      </div>
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
        threshold: 0.1, 
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

  const objectives = [
    "To showcase cutting-edge research in electrical, communication, and biomedical engineering.",
    "To explore smart and sustainable solutions for modern engineering challenges.",
    "To create opportunities for industry-academia collaboration and technology transfer.",
    "To provide a platform for young researchers to present their work and gain expert feedback."
  ];

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
            <h2>Conference Overview</h2>
            <p className="lead-quiet">
              The International Conference on Research and Innovative on Smart and Sustainable Solutions in Electrical, Communication, and Biomedical Engineering serves as a premier platform for researchers, academicians, industry professionals, and students to exchange ideas and advancements in engineering and technology.
            </p>
            <div className="objectives-section">
                <h3>Objectives</h3>
                <ul className="objectives-list">
                    {objectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                    ))}
                </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


// --- Home Page Component ---
const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Collaboration />
        <About />
        <ChiefPatron/>
        <Patrons />
        <Chair />
        <Tracks />
        <Map />
      </main>
    </>
  );
}

export default Home;

