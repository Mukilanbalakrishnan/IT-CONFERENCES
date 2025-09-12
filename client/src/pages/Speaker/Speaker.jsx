import React from 'react';
import './Speaker.css';

// --- Main Component ---
const EventSpeaker = () => {
  const eventSpeakers = [
    {
      id: 'spk1',
      name: 'Dr.Malathy Batumalay',
      title: 'Associate Professor',
      title2:'Faculty of Data Science and Information Technology',
      image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755754148/nvbpdwncdrxpekuksahy.webp',
      bio: 'INTI International University, Malaysia'
    },
    {
      id: 'spk2',
      name: 'Dr. Sandeepan Mila',
      title: 'Associate Professor',
      title2:'Department of Electronics and Communication Engineering',
      image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1755757219/sgphhfiniml8lavztk6w.jpg',
      bio: 'NIST University (National Institute of Science and Technology), Odisha, India.'
    },
    {
      id: 'spk3',
      name: 'Dr. Sathish Kumar Selvaperumal',
      title: 'Associate Professor',
      title2:'Department of Electrical and Electronic Engineering',
      image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757413874/wwr3oyysqlzuxeomkobj.webp',
      bio: 'Asia Pacific University of Technology and Innovation (APU), Malaysia.'
    },
    {
      id: 'spk4',
      name: 'Dr N Sivakumaran',
      title: 'Professor',
      title2:'Department of Bio Medical Engineering',
      image: 'https://res.cloudinary.com/dllbh1v1m/image/upload/v1757477854/ooo46qnl2b6qg5zbvdn7.jpg',
      bio: 'ICE, National Institute of Technology, Tiruchy.'
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
                  <p className="event-title2">{spk.title2}</p>
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
