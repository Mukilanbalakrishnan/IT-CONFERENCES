import React from 'react';
import './Speaker.css';

// --- Main Component ---
const EventSpeaker = () => {
    const eventSpeakers = [
        {
            id: 'spk1',
            name: 'Dr.Malathy Batumalay',
            title: 'Professor at INTI International University',
            image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754148/nvbpdwncdrxpekuksahy.webp',
            bio: 'Ir. Dr. Malathy Batumalay, Associate Professor at INTI International University.Expert in photonics, fiber optics, and laser technology. Develops fiber optic sensors for environmental and biosensing applications'
        },
        {
            id: 'spk2',
            name: 'Melisa Rock',
            title: 'Lead Designer, Psylol',
            image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755757219/sgphhfiniml8lavztk6w.jpg',
            bio: 'Melisa’s award-winning work focuses on human-centered design and creating intuitive, beautiful user experiences.'
        },
        {
            id: 'spk3',
            name: 'Dr. Sathish Kumar Selvaperumal',
            title: 'Developer Expert',
            image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755757219/ranhkwbfv4ghrqlyg4ma.jpg ',
            bio: 'Ronald is a full-stack developer specializing in modern JavaScript frameworks and building robust, scalable web applications.'
        }
    ];

    return (
        <main>
            <header className="event-page-header">
                <div className="event-container">
                    <h1>Event Speakers</h1>
                    <p>Listen to the insights from our distinguished speakers.</p>
                </div>
            </header>

            <section className="event-speakers-section">
                <div className="event-container">
                    <div className="event-speakers-grid">
                        {eventSpeakers.map((spk, index) => (
                            <div 
                                className="event-speaker-profile" 
                                key={spk.id} 
                                style={{ animationDelay: `${0.15 * (index + 1)}s` }}
                            >
                                <div className="event-speaker-image-wrapper">
                                    <svg width="100%" height="100%" viewBox="0 0 160 160" className="event-speaker-svg-border">
                                        <defs>
                                            <clipPath id={`speaker-clip-${spk.id}`}>
                                                <circle cx="80" cy="80" r="70" />
                                            </clipPath>
                                        </defs>
                                        <image
                                            clipPath={`url(#speaker-clip-${spk.id})`}
                                            href={spk.image}
                                            x="10" y="10" height="140" width="140"
                                            preserveAspectRatio="xMidYMid slice"
                                        />
                                        {/* Animated Border Paths */}
                                        <path className="event-border-path-1" d="M 5,80 a 75,75 0 0 1 150,0" />
                                        <path className="event-border-path-2" d="M 155,80 a 75,75 0 0 1 -150,0" />
                                    </svg>
                                </div>
                                <div className="event-speaker-info">
                                    <h3 className="event-name">{spk.name}</h3>
                                    <p className="event-title">{spk.title}</p>
                                    <p className="event-bio">{spk.bio}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EventSpeaker;
