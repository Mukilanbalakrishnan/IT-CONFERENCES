import React from 'react';
import './AdvisoryBoardPage.css';

const AdvisoryBoardPage = () => {
             const NationalAdvisory = [
    { 
        name: 'Prof. P. Somasundaram', 
        role: 'Professor', 
        institution: 'Electrical and Electronics Engineering, Anna University Chennai, Tamil Nadu India' 
    },
    ,
    { 
        name: 'Prof. A. Kirubakaran', 
        role: 'Associate Professor', 
        institution: 'Electrical and Electronics  Engineering, National Institute of Technology Warangal Warangal, Telangana India' 
    },
    { 
        name: 'Dr. N.P. Subramanian', 
        role: 'Associate Professor', 
        institution: 'Electrical and Electronics Engineering, Puducherry Technological University Puducherry, India' 
    },
    { 
        name: 'Dr. Bharatiraja C', 
        role: 'Professor', 
        institution: 'Faculty of Engineering and Technology, SRM Institute of Science and Technology Kattankulathur, Tamil Nadu India' 
    },
    { 
        name: 'Dr. Rijo Jackson Tom',
        role: 'Principal Data Scientist',
        institution: 'INFORMATION TECHNOLOGY, Augusta Hitech Soft Solutions Coimbatore, Tamil Nadu India',
        email: 'rijo.tomjackson@augustahitech.com',
        mobile: '9500191494'
    },
    { 
        name: 'Dr. S. Moorthi',
        role: 'Associate Professor',
        institution: 'Electrical and Electronics Engineering, National Institute of Technology Tiruchirappalli, Tamil Nadu India',
        email: 'srimoorthi@nitt.edu',
        mobile: '9443210281, 0431-2503267'
    },
    { 
        name: 'Dr. W. Wilfred Godfrey',
        role: 'Associate Professor',
        institution: 'Electronics and Communication Engineering, Indian Institute of Technology and Management Gwalior, Madhya Pradesh India',
        email: 'godfrey@iiitm.ac.in',
        mobile: '9425726219'
    },
    { 
        name: 'Dr. S. Janakiraman',
        role: 'Associate Professor',
        institution: 'Banking Technology, School of Management, Pondicherry University Puducherry, India',
        email: 'jana3376@yahoo.co.in, sj.dbt@pondiuni.edu.in',
        mobile: '94433 76328'
    },
    { 
        name: 'Dr. P. Damodharan',
        role: 'Associate Professor',
        institution: 'Electronics and Communication Engineering, Indian Institute of Information Technology Design & Manufacturing (IIITD&M) Kancheepuram, Tamil Nadu India',
        email: 'damodharan@iiitdm.ac.in',
        mobile: '9444467897'
    },
    { 
        name: 'Dr. Vijayakumar Krishnasamy', 
        role: 'Associate Professor', 
        institution: 'Electronics and Communication Engineering, IIITDM Kancheepuram Chennai, Tamil Nadu India' 
    }
];

const InternationalAdvisory = [
    { 
        name: 'Dr. Muhammad H Rashid', 
        role: 'Professor', 
        institution: 'Electrical and Computer Engineering, University of West Florida Pensacola, Florida USA' 
    },
    { 
        name: 'Dr. H.J. Ahmad Rashidy Razali',
        role: 'Professor',
        institution: 'Electronics and Communication Engineering, Universiti Teknologi MARA (UiTM) Shah Alam, Selangor Malaysia',
        email: 'ahmad073@uitm.edu.my',
        mobile: '60194400511'
    },
    
    { 
        name: 'Dr. Jens Bo Holm Nielsen', 
        role: 'Emeritus Associate Professor', 
        institution: 'Faculty of Engineering and Science, Aalborg University Aalborg, Denmark' 
    },
    { 
        name: 'Dr. Atsuo Kawamura', 
        role: 'Professor', 
        institution: 'Electrical and Computer Engineering, Yokohama National University Yokohama, Kanagawa Japan' 
    },
    { 
        name: 'Dr. Murugappan M', 
        role: 'Professor', 
        institution: 'Electronics and Communication Engineering, Kuwait College of Science and Technology Kuwait City, Kuwait' 
    },
    { 
        name: 'Dr. Saad Mekhilef', 
        role: 'Professor', 
        institution: 'Electrical Engineering, University of Malaya Kuala Lumpur, Malaysia' 
    },
    
    { 
        name: 'Brindha Venkateswaran',
        role: 'Software Embedded Engineer',
        institution: 'Automotive R&D Department, Aumovio Singapore,Singapore',
        email: 'brindha1429@gmail.com',
        mobile: '6590370385'
    },
    { 
        name: 'Gunasekaran Thangavel',
        role: 'Professor',
        institution: 'Electronics and Communication Engineering, University of Technology and Applied Sciences Muscat, Oman',
        email: 'gunaece2000@gmail.com'
    },
    { 
        name: 'Akhtar\u00A0Kalam',
        role: 'Professor',
        institution: 'Head of External Engagement, Leader – Smart Energy Research Unit, College of Engineering and Science Victoria, Australia',
        email: 'akhtar.kalam@vu.edu.au',
        mobile: '+61 4 0788 7964'
    },
    { 
        name: 'Dr. Abid Yahya',
        role: 'Associate Professor',
        institution: 'Computer | Electrical & Telecommunications Engineering, Botswana International University of Science and Technology Palapye, Botswana',
        email: 'yahyabid@gmail.com, yahyaa@biust.ac.bw',
        mobile: '+267 4931624'
    }
];





    // Helper function to format institution text
   const formatInstitution = (text) => {
        if (!text) return null;
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
        <main className="advisory-board">
            {/* National Advisory */}
            <header className="page-header">
                <div className="container">
                    <h1>National Advisory Committee</h1>
                </div>
            </header>

            <div className="container">
                <div className="board-grid">
                    {NationalAdvisory.map((member, index) => (
                        <div className="board-member-card" key={index} style={{ animationDelay: `${0.1 * index}s` }}>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <div className="member-institution">{formatInstitution(member.institution)}</div>
                           
                        </div>
                    ))}
                </div>
            </div>

            {/* International Advisory */}
            <header className="page-header">
                <div className="container">
                    <h1>International Advisory Committee</h1>
                </div>
            </header>

            <div className="container">
                <div className="board-grid">
                    {InternationalAdvisory.map((member, index) => (
                        <div className="board-member-card" key={index} style={{ animationDelay: `${0.1 * index}s` }}>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <div className="member-institution">{formatInstitution(member.institution)}</div>
                           
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AdvisoryBoardPage;