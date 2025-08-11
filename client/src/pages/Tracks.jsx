import React from 'react';
import './Tracks.css';

const tracksData = [
  {
    title: "Track 1: Electrical Engineering",
    description: "Innovative and Sustainable Smart Technologies",
    themes: [
      "Smart grids and microgrids", "Renewable energy systems", "Energy storage technologies",
      "Power electronics", "Smart metering", "Energy-efficient machines",
      "Automation and control", "IoT and AI-enabled systems", "Sustainable materials",
      "Electric vehicle technologies"
    ]
  },
  {
    title: "Track 2: Communication Engineering",
    description: "Innovative and Sustainable Smart Technologies",
    themes: [
      "Energy-efficient wireless systems", "Green networking", "Smart IoT and sensor networks",
      "5G/6G technologies", "Cognitive radio", "AI for communication",
      "Low-power hardware", "Sustainable network architectures", "Smart city communication",
      "Security and privacy"
    ]
  },
  {
    title: "Track 3: Biomedical Engineering",
    description: "Innovative and Sustainable Smart Technologies",
    themes: [
      "Energy-efficient biomedical devices", "Smart wearable health systems", "Sustainable signal processing",
      "AI for healthcare", "Low-power implantable devices", "Green manufacturing",
      "Telemedicine technologies", "Smart prosthetics", "Biomedical data analytics",
      "IoT in healthcare"
    ]
  },
  {
    title: "Track 4: Computer Science & Multidisciplinary Applications",
    description: "Innovative and Sustainable Smart Technologies",
    themes: [
      "Energy-efficient algorithms", "Sustainable AI and machine learning", "Smart data analytics",
      "Green cloud computing", "IoT and cyber-physical systems", "Human-computer interaction",
      "Multidisciplinary approaches", "Smart automation and robotics", "Blockchain for sustainability",
      "CS integration with other fields"
    ]
  }
];

const Tracks = () => {
  return (
    <section className="tracks-section">
      <div className="container">
        <div className="section-header">
          <p className="kicker">// CONFERENCE TRACKS</p>
          <h2>Explore Our Themes</h2>
        </div>
        <div className="tracks-grid">
          {tracksData.map((track, index) => (
            <div className="track-card" key={index}>
              <h3>{track.title}</h3>
              <p className="track-description">{track.description}</p>
              <ul className="themes-list">
                {track.themes.map((theme, i) => (
                  <li key={i}>{theme}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tracks;
