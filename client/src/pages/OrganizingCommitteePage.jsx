import React, { useState } from 'react';
import '../App.css';

// --- Styles Component ---
const Styles = () => {
    const css = `
        /* --- Animation Keyframes --- */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        /* --- Global Variables --- */
        :root {
            --brand-orange: #F57C00;
            --brand-blue-dark: #0D47A1;
            --brand-blue-primary: #1976D2;
            --brand-blue-light: #E3F2FD;
            --text-primary: #111318;
            --text-secondary: #6c757d;
            --surface-light: #f8f9fa;
            --white: #FFFFFF;
            --page-max-width: 1200px;
            --gutter: 1.25rem;
            --radius: 12px;
            --shadow-soft: 0 6px 20px rgba(17, 19, 24, 0.06);
        }

        /* --- Page Layout --- */
        .page-header {
            text-align: center;
            padding: 2.5rem 0;
            background-color: var(--brand-blue-light);
            animation: fadeInUp 0.5s ease-out;
        }
        .page-header h1 {
            font-size: 2.5rem;
            color: var(--brand-blue-dark);
            margin: 0;
            font-weight: 600;
        }
        
        .committee-container {
            padding: 4rem 0;
        }

        /* --- NEW CREATIVE Accordion Styles --- */
        .accordion-item {
            background: var(--white);
            border-radius: var(--radius);
            box-shadow: var(--shadow-soft);
            margin-bottom: 1rem;
            opacity: 0;
            animation: fadeInUp 0.6s ease-out forwards;
            border: 1px solid var(--surface-dark);
        }

        .accordion-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.25rem 1.5rem;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        .accordion-header:hover {
            background-color: var(--brand-blue-light);
        }

        .accordion-header .committee-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--brand-blue-dark);
        }

        .accordion-icon {
            font-size: 1.5rem;
            font-weight: bold;
            color: var(--brand-blue-primary);
            transition: transform 0.3s ease;
        }

        .accordion-item.active .accordion-icon {
            transform: rotate(45deg);
        }

        .accordion-content {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.4s ease-out, padding 0.4s ease-out;
        }

        .accordion-item.active .accordion-content {
            max-height: 500px; /* Adjust if content is taller */
            transition: max-height 0.5s ease-in;
        }

        .accordion-body {
            padding: 0 1.5rem 1.5rem;
            border-top: 1px solid var(--surface-dark);
            color: var(--text-secondary);
            line-height: 1.6;
        }
        
        .mentor-track {
            display: block;
            margin-bottom: 0.5rem;
        }
        .mentor-track:last-child {
            margin-bottom: 0;
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 768px) {
            .page-header h1 { font-size: 2rem; }
            .committee-container { padding: 3rem 0; }
        }
    `;
    return <style>{css}</style>;
};

// --- Main Component ---
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
        <>
            <Styles />
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
        </>
    );
};

export default OrganizingCommitteePage;