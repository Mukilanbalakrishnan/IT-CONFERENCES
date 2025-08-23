import React from 'react';
import './Chair.css';

// Data for Conference Chairs and Co-Chairs
const chairsData = [
  {
    id: 1,
    name: 'Dr. G. Singaravel',
    role: 'Conference Chair',
    imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755927904/t5tivhg7kx10mgurtnjx.webp', // Placeholder image
    blobColor: '#0d47a1',
    type: 'Chair',
  },
  {
    id: 2,
    name: 'Dr. Veena',
    role: 'Conference Chair',
    imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755927599/d04cng0plsplt36g1dzl.webp', // Placeholder image
    blobColor: '#F57C00',
    type: 'Chair',
  },
  {
    id: 3,
    name: 'Dr. Malathy Batumalay',
    role: 'Conference Co-Chair',
    imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754148/nvbpdwncdrxpekuksahy.webp', // Placeholder image
    blobColor: '#0d47a1',
    type: 'Co-Chair',
  },
];

// Reusable card component
const ChairCard = ({ name, role, imageUrl, blobColor }) => (
  <div className="chair-card">
    <div className="chair-card__image-wrapper">
      <div className="chair-card__blob" style={{ backgroundColor: blobColor }}></div>
      <img
        src={imageUrl}
        alt={`Portrait of ${name}`}
        className="chair-card__image"
        loading="lazy"
      />
    </div>
    <div className="chair-card__details">
      <h3 className="chair-card__name">{name}</h3>
      <p className="chair-card__role">{role}</p>
    </div>
  </div>
);

// The main Chair component
const Chair = () => {
  // Filter data into separate arrays
  const chairs = chairsData.filter((p) => p.type === 'Chair');
  const coChairs = chairsData.filter((p) => p.type === 'Co-Chair');

  return (
    <section className="chair-section">
      <div className="container">
        <div className="chair-section__header">
          <h2 className="chair-section__title">Conference Leadership</h2>
          <p className="chair-section__subtitle">
            Meet the dedicated leaders organizing this event.
          </p>
        </div>
        
        <div className="chair-groups-wrapper">
          {/* Group 1: Conference Chair */}
          <div className="chair-group">
            <h3 className="chair-group__title">Conference Chair</h3>
            <div className="chair-group__cards">
              {chairs.map((person) => (
                <ChairCard key={person.id} {...person} />
              ))}
            </div>
          </div>

          {/* Group 2: Conference Co-Chair */}
          <div className="chair-group">
            <h3 className="chair-group__title">Conference Co-Chair</h3>
            <div className="chair-group__cards">
              {coChairs.map((person) => (
                <ChairCard key={person.id} {...person} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chair;