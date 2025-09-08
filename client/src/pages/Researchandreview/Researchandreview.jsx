import React from 'react';
import './Researchandreview.css';

// --- Main Component ---
const Researchandreview = () => {
const boardMembers = [
  { name: 'Dr.R. Poornima', affiliation: 'Assistant Professor, Electronics and Communication Engineering, KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
  { name: 'Mr.R. Veeramani', affiliation: 'Assistant Professor, Electronics and Communication Engineering, KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
  { name: 'Dr.M. Vijayakumar', affiliation: 'Assistant Professor, Electrical and Electronics Engineering, KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
  { name: 'Dr.M. Ramasamy', affiliation: 'Associate Professor, Electrical and Electronics Engineering, KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
  { name: 'Mr.B.B. Sangameswaran', affiliation: 'Assistant Professor, Biomedical Engineering, KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
  { name: 'Dr. Zuraidah Harith', affiliation: 'Associate Professor, Faculty of Engineering and Quantity Surveying, INTI International University, Malaysia' },
  { name: 'Ts. Dr. Siti Sarah Maidin', affiliation: 'Professor, Faculty of Data Science and Information Technology (FDSIT), INTI International University, Malaysia' },
  { name: 'Ts. Dr. Jeya Gopi Raman', affiliation: 'Professor, Faculty of Engineering & Quantity Surveying, INTI International University, Malaysia' },
];



    return (
        <main>
            <header className="page-header">
                <div className="container">
                    <h1>Editorial and Review Board</h1>
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