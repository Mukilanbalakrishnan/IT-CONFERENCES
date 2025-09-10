import React from 'react';
import './Researchandreview.model.css';


// --- Main Component ---
const Researchandreview = () => {
  const boardMembers = [
      { 
      name: 'Dr.R. Poornima', 
      role: 'Assistant Professor', 
      affiliation: 'Electronics and Communication Engineering, KSR College of Engineering Tiruchengode, Tamilnadu India' 
    },
    { 
      name: 'Mr.R. Veeramani', 
      role: 'Assistant Professor', 
      affiliation: 'Electronics and Communication Engineering, KSR College of Engineering Tiruchengode, Tamilnadu India' 
    },
    { 
      name: 'Dr.M. Vijayakumar', 
      role: 'Assistant Professor', 
      affiliation: 'Electrical and Electronics Engineering, KSR College of Engineering Tiruchengode, Tamilnadu India' 
    },
    { 
      name: 'Dr.M. Ramasamy', 
      role: 'Associate Professor', 
      affiliation: 'Electrical and Electronics Engineering, KSR College of Engineering Tiruchengode, Tamilnadu India' 
    },
    { 
      name: 'Dr. Zuraidah Harith', 
      role: 'Associate Professor', 
      affiliation: 'Faculty of Engineering and Quantity Surveying, INTI International University, Malaysia' 
    },
    { 
      name: 'Ts. Dr. Siti Sarah Maidin', 
      role: 'Professor', 
      affiliation: 'Faculty of Data Science and Information Technology (FDSIT), INTI International University, Malaysia' 
    },
    { 
      name: 'Ts. Dr. Jeya Gopi Raman', 
      role: 'Professor', 
      affiliation: 'Faculty of Engineering & Quantity Surveying, INTI International University, Malaysia' 
    },
     { 
      name: 'Mr.B.B. Sangameswaran', 
      role: 'Assistant Professor', 
      affiliation: 'Biomedical Engineering, KSR College of Engineering Tiruchengode, Tamilnadu India' 
    }
  ];

  // Helper function to format institution text
  const formatInstitution = (text) => {
    if (!text) return null; // safety check
    const parts = text.split(',');
    return parts.map((line, index) => {
      const trimmed = line.trim();
      const isDepartment = index === 0;
      return (
        <div className="institution-line" key={index}>
          <span className="bullet">•</span>
          <span className={isDepartment ? 'institution-department' : 'institution-text'}>
            {trimmed}
          </span>
        </div>
      );
    });
  };

  return (
    <main className="researchandreview">
      <header className="page-header">
        <div className="container">
          <h1>Editorial and Review Board</h1>
        </div>
      </header>

      <div className="container">
        <div className="board-grid">
          {boardMembers.map((member, index) => (
            <div
              className="board-member-card"
              key={index}
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              <h3 className="member-name">{member.name}</h3>
              {/* Only render role if it exists */}
              {member.role && <p className="member-role">{member.role}</p>}
              <div className="member-institution">{formatInstitution(member.affiliation)}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Researchandreview;
