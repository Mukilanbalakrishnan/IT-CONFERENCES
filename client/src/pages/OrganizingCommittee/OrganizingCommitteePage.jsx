import React, { useState } from 'react';
import './OrganizingCommitteePage.css';

const OrganizingCommitteePage = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const committeeData = [
        { srNo: 1, name: 'Academic & Rapporteur Committee', mentor: 'Track 1 (Personalized Medicine): Prof. Atul Kulkarni\nTrack 2 (Microbial Research): Prof. Sunil Saroj\nTrack 3 (Biomedical Imaging): Dr. Bhushan Borotikar\nTrack 4 (Environmental Engineering): Dr Prakash Rao\nTrack 5 (Applied AI): Prof. Ketan Kotecha' },
        { srNo: 2, name: 'Research & Publication Committee', mentor: 'Prof. Yogesh Patil' },
        { srNo: 3, name: 'Stage Committee', mentor: 'Dr. Sammita Jadhav' },
        { srNo: 4, name: 'AV Aid and IT Committee', mentor: 'Dr. Prasad Bhanap' },
        { srNo: 5, name: 'Finance Committee', mentor: 'Dr. Alaka Chandak' },
        { srNo: 6, name: 'Sponsorship committee', mentor: 'Dr. Shubhada Sharma' },
        { srNo: 7, name: 'Invitation & Reception Committee', mentor: 'Dr. Parimala Veluvali' },
        { srNo: 8, name: 'Catering and Banquet Committee', mentor: 'Prof. Atul Gokhale' },
        { srNo: 9, name: 'Accommodation Committee', mentor: 'Dr. Itayana Nimkar' },
        { srNo: 10, name: 'Branding, Press & Media Committee', mentor: 'Dr. Girija Mahale' },
    ];

    const handleItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <main>
            <header className="page-header">
                <div className="container">
                    <h1>Organizing Committee</h1>
                </div>
            </header>

            <div className="container committee-container">
                {committeeData.map((item, index) => (
                    <div
                        className={`accordion-item ${activeIndex === index ? 'active' : ''}`}
                        key={item.srNo}
                        style={{ animationDelay: `${0.05 * index}s` }}
                    >
                        <div className="accordion-header" onClick={() => handleItemClick(index)}>
                            <span className="committee-name">{item.srNo}. {item.name}</span>
                            <span className="accordion-icon">+</span>
                        </div>
                        <div className="accordion-content">
                            <div className="accordion-body">
                                {item.mentor.split('\n').map((track, i) => (
                                    <span key={i} className="mentor-track">{track}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default OrganizingCommitteePage;