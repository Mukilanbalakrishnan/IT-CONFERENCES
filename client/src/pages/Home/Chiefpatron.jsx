import React from 'react';
import './Chiefpatron.css'; // Import the stylesheet

// --- Data for the Patrons ---
const patrons = [
    {
        id: 1,
        name: 'Mr. R. Srinivasan, B.B.M.',
        role: 'Chairman',
        tagline: 'KSR Educational Institutions',
        tagline1:'India',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754288/zqoqdnu8hskpabyhylqk.webp',
    },
    {
        id: 2,
        name: 'Mr. S. Sachin',
        role: 'Vice Chairman',
        tagline: 'KSR Educational Institutions',
        tagline1:'India',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755755590/u5rxh0jpmvigqmiennoi.webp',
    },
    {
        id: 3,
        name: 'Dr. Joseph Lee Yu Khang, Ph.D.',
        role: 'Vice Chancellor',
        tagline: 'INTI International University',
        tagline1: 'Malaysia',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1756132702/f5kj5ciravj77we2tz4b.jpg',
    },
];

// --- Main Component ---
const ChiefPatron = () => {
    return (
        <section className="patrons-section">
            <div className="patrons-container">
                <div className="patrons-header">
                    <h2 className="patrons-title">Chief Patrons</h2>
                </div>

                <div className="patrons-grid">
                    {patrons.map((patron, index) => (
                        <div className="patrons-card__wrapper" key={patron.id}>
                            <div className={`patrons-card patrons-card--tilt-${index + 1}`}>
                                {/* The empty header can be used for the role/tagline if you want them inside the card later */}
                                <div className="patrons-card__header"></div>
                                <div className="patrons-card__image-container">
                                    <img
                                        src={patron.imageUrl}
                                        alt={`Portrait of ${patron.name}`}
                                        className="patrons-card__image"
                                    />
                                </div>
                            </div>
                            {/* This div groups the text for correct spacing */}
                            <div className="patrons-card__info">
                                <h3 className="patrons-card__name">{patron.name}</h3>
                                <p className="patrons-card__role">{patron.role}</p>
                                <p className="patrons-card__tagline">{patron.tagline}</p>
                                {patron.tagline1 && <p className="patrons-card__tagline patrons-card__tagline--country">{patron.tagline1}</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChiefPatron;

