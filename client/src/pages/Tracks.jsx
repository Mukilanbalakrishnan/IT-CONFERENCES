import React from 'react';
import './Tracks.css';

// --- Data for the Schedule Section ---
const scheduleData = [
    {
        dayLabel: { day: 'Sun', date: 'Aug 2022' },
        events: [{
            time: '11:00 - 12:00',
            title: 'Track 1 - Innovative and Sustainable Smart Technologies in Electrical Engineering',
            description: 'Focuses on smart grids, renewable energy integration, and energy-efficient electrical systems. Highlights automation, electric vehicles, and AI-enabled power infrastructure for a sustainable future.',
        },{
            time: '09:30 - 10:30',
            title: 'Track 2 - : Innovative and Sustainable Smart Technologies in Communication Engineering',
            description: 'Covers energy-efficient wireless systems, 5G/6G connectivity, and smart IoT networks. Emphasizes AI-driven optimization, secure communication, and technologies for smart cities and green networking.',
        }],
    },
    {
        dayLabel: { day: 'Mon', date: 'Aug 2022' },
        events: [
            {
                time: '14:00 - 15:00',
                 title: 'Track 3 - Innovative and Sustainable Smart Technologies in Biomedical Engineering',
                 description: 'Explores smart biomedical devices, AI-powered diagnostics, and IoT-enabled healthcare. Promotes wearable monitoring, telemedicine, and sustainable materials for medical innovation and accessibility.',
       },
            {
                time: '17:00 - 18:00',
                title: 'Track 4 - Innovative and Sustainable Smart Technologies in Computer Science and Multidisciplinary Applications',
                description: 'Highlights green computing, sustainable AI, and smart data analytics for societal impact. Encourages cross-domain innovation in healthcare, energy, and automation through secure, intelligent systems.',
       },
        ],
    },
];

// --- Schedule Section Component ---
const Schedule = () => (
    <section className="schedule-section-wrapper">
        <div className="container">
            <div className="section-header">
                <p className="kicker">// SCHEDULE DATES</p>
                <h2>Digital Business Conference</h2>
            </div>
            <div className="schedule-layout">
                {scheduleData.map((dayGroup, index) => (
                    <div className="day-schedule-group" key={index}>
                        <div className="date-tab">
                            <span className="tab-text">{dayGroup.dayLabel.day} {dayGroup.dayLabel.date}</span>
                        </div>
                        <div className="events-list">
                            {dayGroup.events.map((event, eventIndex) => (
                                <div className="event-card" key={eventIndex}>
                                    <div className="event-details">
                                        <div className="event-time">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/><path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0"/></svg>
                                            <span>{event.time}</span>
                                        </div>
                                        <h3>{event.title}</h3>
                                        <p>{event.description}</p>
                                    </div>
                                    <button className="expand-button" aria-label="More details">+</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);



// --- Main Page Component ---
const ConferencePage = () => {
    return (
        // A simple wrapper for the main content
        <div className="main-content-wrapper">
            <Schedule />
        </div>
    );
};

export default ConferencePage;