import React from 'react';
import './ChiefPatron.css'; // Import the stylesheet

// --- Data for the Patrons ---
const patrons = [
    {
        id: 1,
        name: 'Mr.R.Srinivasan BBM',
        role: 'Chairman',
        tagline: 'KSREI',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754288/zqoqdnu8hskpabyhylqk.webp',
    },
    {
        id: 2,
        name: 'S.Sachin',
        role: 'Vice Chairman',
        tagline: 'KSREI',
        imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755755590/u5rxh0jpmvigqmiennoi.webp',
    },
    {
        id: 3,
        name: 'Dr.Joseph Lee Yu Khang , Phd',
        role: 'Vice Chancellor',
        tagline: 'INIT',
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
                                <div className="patrons-card__header">
                                    <span className="patrons-card__role">{patron.role}</span>
                                    <div className="patrons-card__topic">
                                        <p>{patron.tagline}</p>
                                    </div>
                                </div>
                                <div className="patrons-card__image-container">
                                    <img
                                        src={patron.imageUrl}
                                        alt={`Portrait of ${patron.name}`}
                                        className="patrons-card__image"
                                    />
                                </div>
                            </div>
                            <h3 className="patrons-card__name">{patron.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ChiefPatron;