import React from 'react';
import './Researchandreview.css';

// --- Main Component ---
const Researchandreview = () => {
    const boardMembers = [
        { name: 'Prof. Ajit Kelkar', affiliation: 'Professor, College of Engineering, North Carolina Agricultural & Technical State University, USA' },
        { name: 'Prof. Anurag Agrawal', affiliation: 'Head, Koria Center for Digital Health at Ashoka University Dean, Biosciences and Health Research, India' },
        { name: 'Prof. Christian Roux', affiliation: 'Professor Emeritus, IMT Atlantique, France' },
        { name: 'Prof. K. N. Ganesh', affiliation: 'SERB National Science Chair, JNCASR, India' },
        { name: 'Prof. K. V. S. Hari', affiliation: 'Senior Professor and Director, Centre for Brain Research, India' },
        { name: 'Mr. NandhaKumar Raju', affiliation: 'Director, Software Engineering, UnitedHealth Group, USA' },
    ];

    return (
        <main>
            <header className="page-header">
                <div className="container">
                    <h1>Research and Review Board</h1>
                </div>
            </header>

            <div className="container">
                <div className="board-grid">
                    {boardMembers.map((member, index) => (
                        <div className="board-member-card" key={index} style={{ animationDelay: `${0.1 * (index + 1)}s` }}>
                            <div className="card-content">
                                <h3 className="name">{member.name}</h3>
                                <p className="affiliation">{member.affiliation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Researchandreview;