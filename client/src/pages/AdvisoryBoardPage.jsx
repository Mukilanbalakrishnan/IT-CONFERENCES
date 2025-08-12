import React from 'react';
import '../App.css';

// --- Styles Component ---
const Styles = () => {
    const css = `
        /* --- Animation Keyframes --- */
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* --- Global Variables --- */
        :root {
            --brand-orange: #F57C00;
            --brand-blue-dark: #0D47A1;
            --brand-blue-primary: #1976D2;
            --brand-blue-light: #E3F2FD;
            --brand-red: #D32F2F;
            --text-primary: #111318;
            --text-secondary: #6c757d;
            --surface-light: #f8f9fa;
            --white: #FFFFFF;
            --page-max-width: 1200px;
            --gutter: 1.25rem;
            --radius: 16px; /* Slightly larger radius for a softer look */
            --shadow-soft: 0 8px 25px rgba(17, 19, 24, 0.07);
            --shadow-strong: 0 12px 35px rgba(17, 19, 24, 0.15);
        }

        /* --- Page Layout --- */
        .page-header {
            text-align: center;
            padding: 2.5rem 0;
            background-color: var(--brand-red);
            color: var(--white);
            animation: fadeInUp 0.5s ease-out;
        }
        .page-header h1 {
            font-size: 2.5rem;
            margin: 0;
            font-weight: 600;
        }

        .board-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            padding: 4rem 0;
        }

        /* --- NEW CREATIVE Board Member Card Styles --- */
        .board-member-card {
            background: var(--white);
            border-radius: var(--radius);
            padding: 2rem;
            position: relative;
            overflow: hidden; /* Crucial for pseudo-elements */
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            opacity: 0;
            animation: fadeInUp 0.7s ease-out forwards;
            z-index: 1;
        }

        /* Glowing border effect */
        .board-member-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            border-radius: var(--radius);
            border: 2px solid transparent;
            background: linear-gradient(120deg, var(--brand-orange), var(--brand-blue-primary)) border-box;
            -webkit-mask: 
                linear-gradient(#fff 0 0) padding-box, 
                linear-gradient(#fff 0 0);
            -webkit-mask-composite: destination-out;
            mask-composite: exclude;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.4s ease;
        }
        
        /* Spotlight sweep effect */
        .board-member-card::after {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background: radial-gradient(circle at 100% 0%, rgba(227, 242, 253, 0.8), transparent 40%);
            transform: translateX(-150%);
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 0;
        }

        .board-member-card:hover {
            transform: translateY(-8px);
            box-shadow: var(--shadow-strong);
        }
        .board-member-card:hover::before {
            opacity: 1;
        }
        .board-member-card:hover::after {
            transform: translateX(150%);
        }

        .card-content {
            position: relative;
            z-index: 1;
        }

        .card-content .name {
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--brand-blue-dark);
            margin: 0;
            transition: color 0.3s ease;
        }
        
        .card-content .affiliation {
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.5;
            min-height: 80px; /* Reserve space to prevent layout shifts */
        }
        
        .board-member-card:hover .name {
            color: var(--brand-orange);
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 768px) {
            .page-header h1 { font-size: 2rem; }
            .board-grid { 
                grid-template-columns: 1fr;
                padding: 3rem 0; 
            }
        }
    `;
    return <style>{css}</style>;
};

// --- Main Component ---
const AdvisoryBoardPage = () => {
    const boardMembers = [
        { name: 'Prof. Ajit Kelkar', affiliation: 'Professor, College of Engineering, North Carolina Agricultural & Technical State University, USA' },
        { name: 'Prof. Anurag Agrawal', affiliation: 'Head, Koria Center for Digital Health at Ashoka University Dean, Biosciences and Health Research, India' },
        { name: 'Prof. Christian Roux', affiliation: 'Professor Emeritus, IMT Atlantique, France' },
        { name: 'Prof. K. N. Ganesh', affiliation: 'SERB National Science Chair, JNCASR, India' },
        { name: 'Prof. K. V. S. Hari', affiliation: 'Senior Professor and Director, Centre for Brain Research, India' },
        { name: 'Mr. NandhaKumar Raju', affiliation: 'Director, Software Engineering, UnitedHealth Group, USA' },
    ];

    return (
        <>
            <Styles />
            <main>
                <header className="page-header">
                    <div className="container">
                        <h1>Advisory Board</h1>
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
        </>
    );
};

export default AdvisoryBoardPage;