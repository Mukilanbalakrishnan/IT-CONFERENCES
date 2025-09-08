import React from 'react';
import './Chair.css';

// Data for Conference Chairs and Co-Chairs
const chairsData = [
{
  id: 1,
  name: 'Dr.C. Gowri Shankar',
  role: 'Professor and Head, Electronics and Communication Engineering, KSR College of Engineering',
  imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757312482/u9f6suylf9n6bwuyjzkn.webp', // Placeholder image
  blobColor: '#0d47a1',
  type: 'convenor',
},
{
  id: 2,
  name: 'Dr.S. Ramesh',
  role: 'Professor and Head, Electrical and Electronics Engineering, KSR College of Engineering',
  imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757312857/rqwklwozt9ie8nvh8sia.webp', // Placeholder image
  blobColor: '#F57C00',
  type: 'convenor',
},
{
  id: 3,
  name: 'Dr.R. Prabu',
  role: 'Associate Professor and Head, Biomedical Engineering, KSR College of Engineering',
  imageUrl: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757314953/jtjvt8ytoflnqhku8ntq.jpg', // Placeholder image
  blobColor: '#388E3C',
  type: 'convenor',
},

];

// Reusable card component
const ConvenorCard = ({ name, role, imageUrl, blobColor }) => (
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
const Convenor = () => {
  // Filter data into separate arrays
  const chairs = chairsData.filter((p) => p.type === 'convenor');
//   const coChairs = chairsData.filter((p) => p.type === 'convenor');

  return (
    <section className="chair-section">
      <div className="container">
        <div className="chair-section__header">
          <h2 className="chair-section__title">Department Convenor</h2>
          <p className="chair-section__subtitle">
            Meet the dedicated leaders organizing this event.
          </p>
        </div>
        
        <div className="chair-groups-wrapper">
          {/* Group 1: Conference Chair */}
          <div className="chair-group">
            {/* <h3 className="chair-group__title">Convenor</h3> */}
            <div className="chair-group__cards">
              {chairs.map((person) => (
                <ConvenorCard key={person.id} {...person} />
              ))}
            </div>
          </div>

          {/* Group 2: Conference Co-Chair
          <div className="chair-group">
            <h3 className="chair-group__title">Conference Co-Chair</h3>
            <div className="chair-group__cards">
              {coChairs.map((person) => (
                <ConvenorCard key={person.id} {...person} />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Convenor;