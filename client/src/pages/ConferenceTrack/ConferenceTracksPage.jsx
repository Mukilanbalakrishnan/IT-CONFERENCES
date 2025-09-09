
import React, { useState } from 'react';
import './ConferenceTracksPage.css'; // Make sure to link to the updated CSS file

const ConferenceTracksPage = () => {
    const allTracksData = [
        {
            id: 1,
            title: "Track 1: Electrical Engineering",
            shortSummary: "Focuses on innovative and sustainable smart technologies, covering everything from smart grids and renewable energy to electrical machine drives and electric vehicles.",
            longSummary: 'This track explores the transformation of electrical engineering through sustainable and intelligent technologies. It emphasizes the design and deployment of smart grids and microgrids, enabling more resilient and adaptive energy systems. The track highlights renewable energy integration, from solar and wind to hybrid solutions, supported by advanced energy storage technologies that ensure reliability and efficiency. Power electronics play a pivotal role in enhancing energy conversion and utilization, while smart metering and demand-response strategies enable optimized energy distribution. Sessions also focus on energy-efficient electrical machines and drives, system automation, and the application of IoT and AI for intelligent control. Moreover, sustainable materials, manufacturing practices, and innovations in electric vehicles and charging infrastructure are addressed, positioning this track as a hub for forward-looking discussions on achieving global energy sustainability.',
            speaker: "Dr. Alistair Finch",
            speakerAbout: "Lead Researcher at the Global Institute for Sustainable Energy and a renowned author on smart grid implementation.",
            speakerImage: "https://placehold.co/400x400/E3F2FD/0D47A1?text=Speaker+1",
            date: "March 26, 2026",
            time: "10:00 AM - 11:30 AM",
            styleClass: "track-indigo",
        },
        {
            id: 2,
            title: "Track 2: Communication Engineering",
            shortSummary: "Explores next-generation communication systems, including energy-efficient 5G/6G networks, smart IoT sensors, and the use of AI for network optimization and security.",
            longSummary:"This track addresses the role of communication engineering in driving sustainability and innovation in next-generation networks. Central to the discussions are energy-efficient wireless systems, green networking practices, and sustainable communication protocols designed to reduce the carbon footprint of digital connectivity. Researchers and practitioners explore smart IoT and sensor networks tailored for sustainable applications, as well as advancements in 5G, 6G, and beyond that enable low-latency, high-capacity, and environmentally conscious connectivity. Cognitive radio and spectrum management strategies ensure efficient use of resources, while AI and machine learning empower optimized communication infrastructures. Special attention is given to low-power communication hardware, sustainable network architectures, and communication technologies for smart cities. Security and privacy challenges in sustainable communication systems are also examined, ensuring robust and responsible deployment of future-ready communication solutions.",
            speaker: "Dr. Lena Petrova",
            speakerAbout: "Expert in sustainable communication protocols and green networking at the Tech Innovators Institute.",
            speakerImage: "https://placehold.co/400x400/E0F2F1/004D40?text=Speaker+2",
            date: "March 26, 2026",
            time: "1:30 PM - 3:00 PM",
            styleClass: "track-teal",
        },
        {
            id: 3,
            title: "Track 3: Biomedical Engineering",
            shortSummary: "Presents smart, sustainable solutions for healthcare, from energy-efficient devices and wearable monitors to AI-driven diagnostics. This track bridges the gap between engineering and medicine to create a healthier future. Join us to see how technology is creating a healthier, more sustainable world.",
            longSummary: "This track focuses on the convergence of biomedical engineering with sustainability and smart technologies to revolutionize healthcare delivery and patient well-being. Key discussions revolve around energy-efficient biomedical devices, smart wearable health monitoring systems, and advanced biomedical signal processing methods designed to reduce resource consumption while enhancing diagnostic accuracy. AI and machine learning applications are emphasized for predictive healthcare, precision medicine, and automated diagnostics. The track also explores innovations in low-power implantable and portable devices, sustainable materials and manufacturing for biomedical products, and telemedicine solutions that expand access to healthcare services. Additional themes include smart prosthetics, rehabilitation systems, and biomedical data analytics for improved healthcare outcomes. The integration of IoT in healthcare systems is underscored as a pathway toward smart, connected, and sustainable healthcare ecosystems that prioritize accessibility, efficiency, and environmental responsibility.",
            speaker: "Dr. Kenji Tanaka",
            speakerAbout: "Pioneer in AI-driven diagnostics and sustainable biomaterials from the HealthTech Research Collective.",
            speakerImage: "https://placehold.co/400x400/FFF8E1/8D6E63?text=Speaker+3",
            date: "March 27, 2026",
            time: "9:00 AM - 10:30 AM",
            styleClass: "track-amber",
        },
        {
            id: 4,
            title: "Track 4: Computer Science & Multidisciplinary Applications",
            shortSummary: "Covers sustainable computing, from energy-efficient algorithms and AI for societal impact to green cloud computing and IoT systems for a wide range of smart solutions.",
            longSummary: "This track investigates the transformative role of computer science in fostering sustainable, intelligent, and multidisciplinary innovations. Discussions highlight energy-efficient algorithms, green computing architectures, and the development of sustainable AI and machine learning methods that reduce computational overhead while maximizing impact. Smart data analytics is showcased as a driver for societal and environmental advancements, with applications ranging from healthcare and energy to smart cities. The track also covers sustainable cloud computing and energy-conscious data centers, as well as IoT and cyber-physical systems designed for large-scale sustainability challenges. Research on human-computer interaction emphasizes user-friendly, inclusive, and sustainable digital experiences, while automation, robotics, and blockchain technologies demonstrate their potential in creating secure, efficient, and future-proof industries. The multidisciplinary integration of computer science with biomedical, electrical, and communication technologies underscores this track’s vision of fostering holistic and sustainable solutions for global challenges.",
            speaker: "Dr. Maria Garcia",
            speakerAbout: "Specialist in green computing and AI for social good at the Center for Multidisciplinary Innovation.",
            speakerImage: "https://placehold.co/400x400/ECEFF1/37474F?text=Speaker+4",
            date: "March 27, 2026",
            time: "11:00 AM - 12:30 PM",
            styleClass: "track-slate",
        },
    ];

    const [selectedTrack, setSelectedTrack] = useState(null);

    const handleViewDetails = (track) => {
        setSelectedTrack(track);
    };

    const handleCloseModal = () => {
        setSelectedTrack(null);
    };

    return (
        <div className="page-container">
            <div className="content-wrapper">
                <div className="tracks-grid">
                    {allTracksData.map((track) => (
                        <div key={track.id} className={`track-card ${track.styleClass}`}>
                            <div className="track-content">
                                <h2 className="track-title">{track.title}</h2>
                                <p className="track-summary">{track.shortSummary}</p>
                                <div className="buttons-row">
                                    <a href={"/register"} className="btn btn-primary">
                                        Register Now
                                    </a>
                                    <button onClick={() => handleViewDetails(track)} className="btn btn-secondary">
                                        View Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedTrack && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div
                        className={`track-detail-card ${selectedTrack.styleClass}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="track-header">
                            <h1 className="track-main-title">{selectedTrack.title}</h1>
                            <button className="modal-close-btn" onClick={handleCloseModal}>
                                &times;
                            </button>
                        </div>

                        <div className="modal-scroll-content">
                            <div className="track-meta-section">
                                <div className="speaker-info">
                                    <img
                                        src={selectedTrack.speakerImage}
                                        alt={selectedTrack.speaker}
                                        className="speaker-image"
                                    />
                                    <div className="speaker-details">
                                        <h2 className="speaker-name">{selectedTrack.speaker}</h2>
                                        <p className="speaker-about">{selectedTrack.speakerAbout}</p>
                                    </div>
                                </div>
                                <div
                                    className="session-time"
                                    style={{
                                        borderColor: `var(--${selectedTrack.styleClass.split('-')[1]}-border)`,
                                    }}
                                >
                                    <p><strong>Date:</strong> {selectedTrack.date}</p>
                                    <p><strong>Time:</strong> {selectedTrack.time}</p>
                                </div>
                            </div>

                            <div className="track-summary-content">
                                <h3>Session Overview</h3>
                                <p>{selectedTrack.longSummary}</p>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <a
                                href={`#/register?track=${selectedTrack.id}`}
                                className="btn btn-primary"
                            >
                                Register Now
                            </a>
                            <button className="btn btn-secondary" onClick={handleCloseModal}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ConferenceTracksPage;

