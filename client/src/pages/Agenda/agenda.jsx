import React, { useState, useEffect } from 'react';
import './agenda.css';

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


// Main component for the conference schedule page
const agenda = () => {
  // State to manage the active tab (day)
  const [activeTab, setActiveTab] = useState('day1');

  // Data for the schedule
  const scheduleData = {
    day1: {
      date: 'Thursday, September 18, 2025',
      events: [
        { time: '1:00 pm - 2:00 pm', title: 'Pre-Conference Workshop Registration', isWorkshop: true },
        { time: '2:00 pm - 6:30 pm', title: 'Workshop 1: Stem Cell Biology', venue: 'SCSCR, SIT Building, 2nd floor' },
        { time: '2:00 pm - 6:30 pm', title: 'Workshop 2: Nanoscience and Nanotechnology', venue: 'SCNN, SIT Building, 6th Floor & Dept. of Radiology' },
      ],
    },
    day2: {
      date: 'Friday, September 19, 2025',
      events: [
        { time: '8:00 am - 9:00 am', title: 'Registration and Breakfast' },
        { time: '9:00 am - 10:30 am', title: 'Plenary Speaker & Oral Presentations', description: 'Tracks: Personalized Medicine, Microbial Research, Biomedical Imaging, Environmental Engineering, AI in Healthcare' },
        { time: '10:30 am - 11:00 am', title: 'Tea Break', venue: 'SMCW Foyer' },
      ],
    },
    day3: {
      date: 'Saturday, September 20, 2025',
      events: [
        { time: '9:00 am - 10:45 am', title: 'Plenary Speaker & Oral Presentations' },
        { time: '10:45 am - 11:15 am', title: 'Tea Break', venue: 'SMCW Foyer' },
        { time: '4:00 pm - 5:00 pm', title: 'Awards Ceremony and Valedictory', venue: 'Moringa Auditorium, SUHRC' },
      ],
    },
  };

  return (
    <div className="schedule-page">
      <section className="hero-section">
        <h1>Conference Schedule</h1>
        <h2>Join us for an inspiring event full of knowledge and networking.</h2>
        <Countdown />
        <button className="register-btn">REGISTER NOW</button>
      </section>

      <div className="schedule-container">
        <div className="tabs">
          <button className={`tab-btn ${activeTab === 'day1' ? 'active' : ''}} onClick={() => setActiveTab('day1')`}>Day 1</button>
          <button className={`tab-btn ${activeTab === 'day2' ? 'active' : ''}} onClick={() => setActiveTab('day2')`}>Day 2</button>
          <button className={`tab-btn ${activeTab === 'day3' ? 'active' : ''}} onClick={() => setActiveTab('day3')`}>Day 3</button>
        </div>

        <div className="tab-content" key={activeTab}>
          <h3>{scheduleData[activeTab].date}</h3>
          <div className="timeline">
            {scheduleData[activeTab].events.map((event, index) => (
              <div key={index} className="timeline-item" style={{animationDelay: `${index * 0.1}s`}}>
                <p className="timeline-time">{event.time}</p>
                <h4 className="timeline-title">{event.title}</h4>
                {event.venue && <p className="timeline-venue">{event.venue}</p>}
                {event.description && <p className="timeline-description">{event.description}</p>}
              </div>
            ))}
          </div>
        </div>
        <p className="tentative-note">* Tentative schedule, subject to change</p>
      </div>
    </div>
  );
};

export default agenda;