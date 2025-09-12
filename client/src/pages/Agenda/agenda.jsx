// import React, { useState, useEffect } from 'react';
// import './agenda.css'; // Import the new stylesheet
// import { FaRegCheckCircle, FaClock, FaMapMarkerAlt, FaUsers, FaMugHot, FaAward } from 'react-icons/fa';

// // --- Countdown Timer Component (No changes needed here) ---
// const Countdown = ({ targetDate }) => {
//     const calculateTimeLeft = () => {
//         const difference = +new Date(targetDate) - +new Date();
//         let timeLeft = {};

//         if (difference > 0) {
//             timeLeft = {
//                 Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
//                 Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//                 Minutes: Math.floor((difference / 1000 / 60) % 60),
//                 Seconds: Math.floor((difference / 1000) % 60),
//             };
//         }
//         return timeLeft;
//     };

//     const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

//     useEffect(() => {
//         const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
//         return () => clearTimeout(timer);
//     });

//     return (
//         <div className="agenda-countdown-container">
//             {Object.keys(timeLeft).length > 0 ? (
//                 Object.entries(timeLeft).map(([unit, value]) => (
//                     <div className="agenda-countdown-item" key={unit}>
//                         <span className="agenda-countdown-number">{String(value).padStart(2, '0')}</span>
//                         <span className="agenda-countdown-label">{unit}</span>
//                     </div>
//                 ))
//             ) : (
//                 <span className="agenda-conference-live">The Conference is Live!</span>
//             )}
//         </div>
//     );
// };

// // --- Main Agenda Page Component ---
// const Agenda = () => {
//     const [activeTab, setActiveTab] = useState('day1');
//     const [currentTime, setCurrentTime] = useState(new Date());

//     useEffect(() => {
//         const interval = setInterval(() => setCurrentTime(new Date()), 60000);
//         return () => clearInterval(interval);
//     }, []);
    
//     const scheduleData = {
//         day1: {
//             date: '2025-09-13',
//             events: [
//                 { startTime: '09:00', endTime: '10:00', title: 'Registration & Welcome Coffee', icon: <FaMugHot /> },
//                 { startTime: '10:00', endTime: '12:00', title: 'Keynote: The Future of AI', icon: <FaUsers />, venue: 'Main Auditorium' },
//                 { startTime: '12:00', endTime: '14:00', title: 'Networking Lunch', icon: <FaMugHot />, venue: 'Banquet Hall' },
//                 { startTime: '18:00', endTime: '20:00', title: 'Panel Discussion: AI in Healthcare', icon: <FaUsers />, venue: 'Hall A' },
//                 { startTime: '20:30', endTime: '21:30', title: 'Evening Social & Mixer', icon: <FaUsers />, venue: 'Rooftop Lounge' },
//             ],
//         },
//         day2: {
//             date: '2025-09-14',
//             events: [
//                 { startTime: '09:30', endTime: '11:00', title: 'Track Sessions 1 & 2', icon: <FaUsers />, venue: 'Halls A & B' },
//                 { startTime: '11:00', endTime: '11:30', title: 'Coffee Break & Poster Presentations', icon: <FaMugHot /> },
//                 { startTime: '11:30', endTime: '13:00', title: 'Track Session 3', icon: <FaUsers />, venue: 'Hall A' },
//                 { startTime: '16:00', endTime: '17:00', title: 'Awards Ceremony & Closing Remarks', icon: <FaAward />, venue: 'Main Auditorium' },
//             ],
//         },
//     };

//     const getEventStatus = (eventDate, startTime, endTime) => {
//         const startDateTime = new Date(`${eventDate}T${startTime}:00`);
//         const endDateTime = new Date(`${eventDate}T${endTime}:00`);

//         if (currentTime > endDateTime) return 'completed';
//         if (currentTime >= startDateTime && currentTime <= endDateTime) return 'in-progress';
//         return 'upcoming';
//     };

//     const activeDay = scheduleData[activeTab];

//     // **CORRECTION: Dynamically set the countdown target**
//     const conferenceStartDate = scheduleData.day1.date;
//     const conferenceStartTime = scheduleData.day1.events[0].startTime;
//     const countdownTarget = `${conferenceStartDate}T${conferenceStartTime}:00`;


//     return (
//         <main className="agenda-page">
//             <section className="agenda-hero">
//                 <div className="agenda-container">
                    
//                     {/* **CORRECTION: Use the dynamic countdownTarget variable** */}
//                     <Countdown targetDate={countdownTarget} />
//                 </div>
//             </section>

//             <div className="agenda-container agenda-schedule-container">
//                 <div className="agenda-tabs">
//                     <button className={`agenda-tab-btn ${activeTab === 'day1' ? 'active' : ''}`} onClick={() => setActiveTab('day1')}>Day 1</button>
//                     <button className={`agenda-tab-btn ${activeTab === 'day2' ? 'active' : ''}`} onClick={() => setActiveTab('day2')}>Day 2</button>
//                 </div>

//                 <div className="agenda-timeline-content" key={activeTab}>
//                     <div className="agenda-timeline">
//                         {activeDay.events.map((event, index) => {
//                             const status = getEventStatus(activeDay.date, event.startTime, event.endTime);
//                             return (
//                                 <div className={`agenda-timeline-item ${status}`} key={index}>
//                                     <div className="agenda-timeline-icon">
//                                         {status === 'completed' ? <FaRegCheckCircle /> : event.icon}
//                                     </div>
//                                     <div className="agenda-timeline-card">
//                                         <p className="agenda-event-time"><FaClock /> {event.startTime} - {event.endTime}</p>
//                                         <h4 className="agenda-event-title">{event.title}</h4>
//                                         {event.venue && <p className="agenda-event-venue"><FaMapMarkerAlt /> {event.venue}</p>}
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                     </div>
//                 </div>
//             </div>
//         </main>
//     );
// };

// export default Agenda;



import React, { useState, useEffect } from 'react';
import './agenda.css'; // Your new stylesheet
import { FaRegCheckCircle, FaClock, FaMapMarkerAlt, FaUsers, FaMugHot, FaAward, FaBroadcastTower } from 'react-icons/fa';

// --- Countdown Timer Component (No changes needed here) ---
const Countdown = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft = {};
        if (difference > 0) {
            timeLeft = {
                Days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                Hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                Minutes: Math.floor((difference / 1000 / 60) % 60),
                Seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    useEffect(() => {
        const timer = setTimeout(() => setTimeLeft(calculateTimeLeft()), 1000);
        return () => clearTimeout(timer);
    });
    return (
        <div className="agenda-countdown-container">
            {Object.keys(timeLeft).length > 0 ? (
                Object.entries(timeLeft).map(([unit, value]) => (
                    <div className="agenda-countdown-item" key={unit}>
                        <span className="agenda-countdown-number">{String(value).padStart(2, '0')}</span>
                        <span className="agenda-countdown-label">{unit}</span>
                    </div>
                ))
            ) : (
                <span className="agenda-conference-live">The Conference is Live!</span>
            )}
        </div>
    );
};

// --- Main Agenda Page Component ---
const Agenda = () => {
    const [activeTab, setActiveTab] = useState('day1');
    const [isFading, setIsFading] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    const scheduleData = {
        day1: {
            date: '2025-09-15',
            events: [
                { startTime: '09:00', endTime: '10:00', title: 'Registration & Welcome Coffee', icon: <FaMugHot /> },
                { startTime: '10:00', endTime: '12:00', title: 'Keynote: The Future of AI', icon: <FaUsers />, venue: 'Main Auditorium' },
                { startTime: '12:00', endTime: '14:00', title: 'Networking Lunch', icon: <FaMugHot />, venue: 'Banquet Hall' },
                { startTime: '14:00', endTime: '18:00', title: 'Technical Sessions & Paper Presentations', icon: <FaUsers />, venue: 'Conference Halls 1-3' },
                { startTime: '18:00', endTime: '20:00', title: 'Panel Discussion: AI in Healthcare', icon: <FaUsers />, venue: 'Hall A' },
                { startTime: '20:30', endTime: '21:30', title: 'Evening Social & Mixer', icon: <FaUsers />, venue: 'Rooftop Lounge' },
            ],
        },
        day2: {
            date: '2026-03-27',
            events: [
                { startTime: '09:30', endTime: '11:00', title: 'Track Sessions 1 & 2', icon: <FaUsers />, venue: 'Halls A & B' },
                { startTime: '11:00', endTime: '11:30', title: 'Coffee Break & Poster Presentations', icon: <FaMugHot /> },
                { startTime: '11:30', endTime: '13:00', title: 'Track Session 3', icon: <FaUsers />, venue: 'Hall A' },
                { startTime: '13:00', endTime: '14:00', title: 'Lunch Break', icon: <FaMugHot />, venue: 'Banquet Hall' },
                { startTime: '14:00', endTime: '16:00', title: 'Workshops & Hands-on Sessions', icon: <FaUsers />, venue: 'Labs 1 & 2' },
                { startTime: '16:00', endTime: '17:00', title: 'Awards Ceremony & Closing Remarks', icon: <FaAward />, venue: 'Main Auditorium' },
            ],
        },
    };

    const getEventStatus = (eventDate, startTime, endTime) => {
        const startDateTime = new Date(`${eventDate}T${startTime}:00`);
        const endDateTime = new Date(`${eventDate}T${endTime}:00`);
        if (currentTime > endDateTime) return 'completed';
        if (currentTime >= startDateTime && currentTime <= endDateTime) return 'in-progress';
        return 'upcoming';
    };

    const handleTabClick = (tab) => {
        if (tab === activeTab) return;
        setIsFading(true);
        setTimeout(() => {
            setActiveTab(tab);
            setIsFading(false);
        }, 300);
    };

    const activeDay = scheduleData[activeTab];
    const countdownTarget = `${scheduleData.day1.date}T${scheduleData.day1.events[0].startTime}:00`;

    return (
        <main className="agenda-page">
            <section className="agenda-hero">
                <div className="agenda-container">
                    <h1 className="agenda-hero-title">Conference Agenda</h1>
                    <p className="agenda-hero-subtitle">Explore our detailed schedule and plan your days. The future awaits!</p>
                    <Countdown targetDate={countdownTarget} />
                </div>
            </section>

            <div className="agenda-container agenda-schedule-container">
                <div className="agenda-tabs">
                    <button className={`agenda-tab-btn ${activeTab === 'day1' ? 'active' : ''}`} onClick={() => handleTabClick('day1')}>Day 1: March 26, 2026</button>
                    <button className={`agenda-tab-btn ${activeTab === 'day2' ? 'active' : ''}`} onClick={() => handleTabClick('day2')}>Day 2: March 27, 2026</button>
                </div>

                <div className={`agenda-grid-content ${isFading ? 'fading' : ''}`}>
                    <div className="agenda-grid" key={activeTab}>
                        {activeDay.events.map((event, index) => {
                            const status = getEventStatus(activeDay.date, event.startTime, event.endTime);
                            return (
                                <div
                                    className={`agenda-grid-item ${status}`}
                                    key={index}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="agenda-time-slot">
                                        <div className="agenda-time">{event.startTime}</div>
                                        <div className="agenda-time-connector"></div>
                                    </div>
                                    <div className="agenda-card">
                                        <div className="agenda-card-header">
                                            <div className="agenda-icon">{event.icon}</div>
                                            <div className="agenda-title-group">
                                                <h4 className="agenda-event-title">{event.title}</h4>
                                                <p className="agenda-event-duration"><FaClock /> {event.startTime} - {event.endTime}</p>
                                            </div>
                                            {status === 'in-progress' && <span className="agenda-live-badge"><FaBroadcastTower /> LIVE</span>}
                                            {status === 'completed' && <span className="agenda-completed-badge"><FaRegCheckCircle /> Done</span>}
                                        </div>
                                        {event.venue && <p className="agenda-event-venue"><FaMapMarkerAlt /> {event.venue}</p>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Agenda;