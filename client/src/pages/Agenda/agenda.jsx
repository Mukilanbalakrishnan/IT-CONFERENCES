// import React, { useState, useEffect } from 'react';
// import './agenda.css'; // Import the new stylesheet
// import { FaRegCheckCircle, FaClock, FaMapMarkerAlt, FaUsers, FaMugHot, FaAward } from 'react-icons/fa';

// // --- Countdown Timer Component ---
// const Countdown = () => {
//     const calculateTimeLeft = () => {
//         const difference = +new Date('2026-03-26T09:00:00') - +new Date();
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
//         <div className="countdown-container">
//             {Object.keys(timeLeft).length > 0 ? (
//                 Object.entries(timeLeft).map(([unit, value]) => (
//                     <div className="countdown-item" key={unit}>
//                         <span className="countdown-number">{String(value).padStart(2, '0')}</span>
//                         <span className="countdown-label">{unit}</span>
//                     </div>
//                 ))
//             ) : (
//                 <span className="conference-live">The Conference is Live!</span>
//             )}
//         </div>
//     );
// };

// // --- Main Agenda Page Component ---
// const agenda = () => {
//     const [activeTab, setActiveTab] = useState('day1');
//     const [currentTime, setCurrentTime] = useState(new Date());

//     useEffect(() => {
//         // Update the current time every minute to refresh the timeline status
//         const interval = setInterval(() => setCurrentTime(new Date()), 60000);
//         return () => clearInterval(interval);
//     }, []);

//     const scheduleData = {
//         day1: {
//             date: '2026-03-26', // Use YYYY-MM-DD for easier parsing
//             events: [
//                 { startTime: '09:00', endTime: '10:00', title: 'Registration & Welcome Coffee', icon: <FaMugHot /> },
//                 { startTime: '10:00', endTime: '10:30', title: 'Opening Ceremony', icon: <FaUsers />, venue: 'Main Auditorium' },
//                 { startTime: '10:30', endTime: '12:00', title: 'Keynote: The Future of AI', icon: <FaUsers /> },
//                 { startTime: '12:00', endTime: '13:00', title: 'Networking Lunch', icon: <FaMugHot />, venue: 'Banquet Hall' },
//             ],
//         },
//         day2: {
//             date: '2026-03-27',
//             events: [
//                 { startTime: '09:30', endTime: '11:00', title: 'Track Sessions 1 & 2', icon: <FaUsers />, venue: 'Halls A & B' },
//                 { startTime: '11:00', endTime: '11:30', title: 'Coffee Break & Poster Presentations', icon: <FaMugHot /> },
//                 { startTime: '11:30', endTime: '13:00', title: 'Track Session 3', icon: <FaUsers />, venue: 'Hall A' },
//                 { startTime: '13:00', endTime: '14:00', title: 'Lunch', icon: <FaMugHot />, venue: 'Banquet Hall' },
//                 { startTime: '16:00', endTime: '17:00', title: 'Awards Ceremony & Closing Remarks', icon: <FaAward />, venue: 'Main Auditorium' },
//             ],
//         },
//     };

//     const getEventStatus = (eventDate, startTime, endTime) => {
//         const startDateTime = new Date(`${eventDate}T${startTime}`);
//         const endDateTime = new Date(`${eventDate}T${endTime}`);

//         if (currentTime > endDateTime) {
//             return 'completed';
//         }
//         if (currentTime >= startDateTime && currentTime <= endDateTime) {
//             return 'in-progress';
//         }
//         return 'upcoming';
//     };

//     const activeDay = scheduleData[activeTab];

//     return (
//         <main className="agenda-page">
//             <section className="agenda-hero">
//                 <div className="container">
//                     <h1 className="hero-title">Conference Agenda</h1>
//                     <p className="hero-subtitle">Explore our schedule of insightful talks, workshops, and networking events.</p>
//                     <Countdown />
//                 </div>
//             </section>

//             <div className="container schedule-container">
//                 <div className="tabs">
//                     <button className={`tab-btn ${activeTab === 'day1' ? 'active' : ''}`} onClick={() => setActiveTab('day1')}>Day 1</button>
//                     <button className={`tab-btn ${activeTab === 'day2' ? 'active' : ''}`} onClick={() => setActiveTab('day2')}>Day 2</button>
//                 </div>

//                 <div className="timeline-content" key={activeTab}>
//                     <div className="timeline">
//                         {activeDay.events.map((event, index) => {
//                             const status = getEventStatus(activeDay.date, event.startTime, event.endTime);
//                             return (
//                                 <div className={`timeline-item ${status}`} key={index}>
//                                     <div className="timeline-icon">
//                                         {status === 'completed' ? <FaRegCheckCircle /> : event.icon}
//                                     </div>
//                                     <div className="timeline-card">
//                                         <p className="event-time"><FaClock /> {event.startTime} - {event.endTime}</p>
//                                         <h4 className="event-title">{event.title}</h4>
//                                         {event.venue && <p className="event-venue"><FaMapMarkerAlt /> {event.venue}</p>}
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

// export default agenda





import React, { useState, useEffect } from 'react';
import './agenda.css'; // Import the new stylesheet
import { FaRegCheckCircle, FaClock, FaMapMarkerAlt, FaUsers, FaMugHot, FaAward } from 'react-icons/fa';

// --- Countdown Timer Component ---
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
const agenda = () => {
    const [activeTab, setActiveTab] = useState('day1');
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(interval);
    }, []);
    
    const scheduleData = {
        day1: {
            date: '2025-09-03',
            events: [
                { startTime: '09:00', endTime: '10:00', title: 'Registration & Welcome Coffee', icon: <FaMugHot /> },
                { startTime: '10:00', endTime: '12:00', title: 'Keynote: The Future of AI', icon: <FaUsers />, venue: 'Main Auditorium' },
                { startTime: '12:00', endTime: '13:00', title: 'Networking Lunch', icon: <FaMugHot />, venue: 'Banquet Hall' },
                { startTime: '18:00', endTime: '20:00', title: 'Panel Discussion: AI in Healthcare', icon: <FaUsers />, venue: 'Hall A' },
                { startTime: '20:30', endTime: '21:30', title: 'Evening Social & Mixer', icon: <FaUsers />, venue: 'Rooftop Lounge' },
            ],
        },
        day2: {
            date: '2025-09-04',
            events: [
                { startTime: '09:30', endTime: '11:00', title: 'Track Sessions 1 & 2', icon: <FaUsers />, venue: 'Halls A & B' },
                { startTime: '11:00', endTime: '11:30', title: 'Coffee Break & Poster Presentations', icon: <FaMugHot /> },
                { startTime: '11:30', endTime: '13:00', title: 'Track Session 3', icon: <FaUsers />, venue: 'Hall A' },
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

    const activeDay = scheduleData[activeTab];

    return (
        <main className="agenda-page">
            <section className="agenda-hero">
                <div className="agenda-container">
                    <h1 className="agenda-hero-title">Conference Agenda</h1>
                    <p className="agenda-hero-subtitle">Explore our schedule of insightful talks, workshops, and networking events.</p>
                    <Countdown targetDate={'2025-08-25T09:00:00'} />
                </div>
            </section>

            <div className="agenda-container agenda-schedule-container">
                <div className="agenda-tabs">
                    <button className={`agenda-tab-btn ${activeTab === 'day1' ? 'active' : ''}`} onClick={() => setActiveTab('day1')}>Day 1</button>
                    <button className={`agenda-tab-btn ${activeTab === 'day2' ? 'active' : ''}`} onClick={() => setActiveTab('day2')}>Day 2</button>
                </div>

                <div className="agenda-timeline-content" key={activeTab}>
                    <div className="agenda-timeline">
                        {activeDay.events.map((event, index) => {
                            const status = getEventStatus(activeDay.date, event.startTime, event.endTime);
                            return (
                                <div className={`agenda-timeline-item ${status}`} key={index}>
                                    <div className="agenda-timeline-icon">
                                        {status === 'completed' ? <FaRegCheckCircle /> : event.icon}
                                    </div>
                                    <div className="agenda-timeline-card">
                                        <p className="agenda-event-time"><FaClock /> {event.startTime} - {event.endTime}</p>
                                        <h4 className="agenda-event-title">{event.title}</h4>
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

export default agenda;