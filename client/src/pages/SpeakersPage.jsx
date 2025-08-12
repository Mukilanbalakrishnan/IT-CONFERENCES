import React from 'react';
import '../App.css';
import speaker1 from '../assets/Speaker-image/speaker1.jpeg';

// --- Sub-Component for a single Speaker Card ---
const SpeakerCard = ({ speaker, animationDelay }) => {
    return (
        <div className="speaker-card" style={{ animationDelay }}>
            <div className="speaker-image-container">
                <svg width="100%" height="100%" viewBox="0 0 160 160" className="speaker-svg-border">
                    <defs>
                        {/* Unique clipPath ID for each speaker to avoid conflicts */}
                        <clipPath id={`speaker-clip-${speaker.id}`}>
                            <circle cx="80" cy="80" r="70" />
                        </clipPath>
                    </defs>
                    <image
                        clipPath={`url(#speaker-clip-${speaker.id})`}
                        href={speaker.image}
                        x="10" y="10" height="140" width="140"
                        preserveAspectRatio="xMidYMid slice"
                    />
                    {/* These paths will be animated with CSS */}
                    <path d="M 155,80 A 75,75 0 1 1 80,5" />
                    <path d="M 5,80 A 75,75 0 1 1 80,155" />
                </svg>
            </div>
            <div className="speaker-info">
                <h3>{speaker.name}</h3>
                <p className="speaker-affiliation">{speaker.affiliation}</p>
                <p className="speaker-bio">{speaker.bio}</p>
            </div>
        </div>
    );
};


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
            --brand-orange: #F57C00; --brand-blue-dark: #0D47A1;
            --brand-blue-primary: #1976D2; --brand-blue-light: #E3F2FD;
            --brand-red: #D32F2F; --text-primary: #111318;
            --text-secondary: #6c757d; --surface-light: #f8f9fa;
            --white: #FFFFFF; --page-max-width: 1200px;
            --gutter: 1.25rem; --radius: 16px;
            --shadow-soft: 0 8px 25px rgba(17, 19, 24, 0.07);
            --shadow-strong: 0 12px 35px rgba(17, 19, 24, 0.15);
        }

        /* --- Page Layout --- */
        .page-header {
            text-align: center; padding: 3rem 0;
            background-color: var(--brand-blue-light);
            animation: fadeInUp 0.5s ease-out;
        }
        .page-header h1 { font-size: 2.5rem; color: var(--brand-blue-dark); margin: 0; }
        .page-header p { font-size: 1.1rem; color: var(--brand-blue-primary); max-width: 700px; margin: 0.5rem auto 0; }

        .speakers-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2.5rem;
            padding: 5rem 0;
        }

        /* --- NEW CREATIVE Speaker Card Styles --- */
        .speaker-card {
            background: var(--white); border-radius: var(--radius);
            box-shadow: var(--shadow-soft);
            padding: 2rem;
            position: relative;
            overflow: hidden; /* Important for the background sweep effect */
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            opacity: 0;
            animation: fadeInUp 0.7s ease-out forwards;
        }
        .speaker-card:hover { transform: translateY(-10px); box-shadow: var(--shadow-strong); }

        /* Background Sweep Effect */
        .speaker-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 150%;
            height: 100%;
            background: linear-gradient(90deg, var(--brand-blue-light), transparent);
            opacity: 0.5;
            transform: translateX(-100%);
            transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 0;
        }
        .speaker-card:hover::before { transform: translateX(0); }

        .speaker-image-container, .speaker-info {
            position: relative;
            z-index: 1; /* Ensure content is above the background sweep */
        }
        
        .speaker-image-container {
            width: 160px;
            height: 160px;
            margin: 0 auto 1.5rem auto;
        }

        /* SVG Border Drawing Animation */
        .speaker-svg-border path {
            fill: none;
            stroke-width: 5;
            stroke-linecap: round;
            stroke-dasharray: 236; /* Approx. length of a semicircle with radius 75 */
            stroke-dashoffset: 236;
            transition: stroke-dashoffset 0.8s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .speaker-svg-border path:nth-of-type(1) { stroke: var(--brand-red); }
        .speaker-svg-border path:nth-of-type(2) { stroke: var(--brand-blue-primary); }

        .speaker-card:hover .speaker-svg-border path {
            stroke-dashoffset: 0;
        }
        .speaker-card:hover .speaker-svg-border path:nth-of-type(2) {
            transition-delay: 0.2s; /* Stagger the animation */
        }
        
        .speaker-info { text-align: center; }
        .speaker-info h3 { font-size: 1.5rem; color: var(--brand-blue-dark); margin: 0 0 0.25rem 0; }
        .speaker-info .speaker-affiliation { font-size: 0.95rem; color: var(--brand-orange); font-weight: 600; margin-bottom: 1rem; }
        .speaker-info .speaker-bio { font-size: 0.95rem; color: var(--text-secondary); line-height: 1.6; }

        /* --- Responsive Adjustments --- */
        @media (max-width: 768px) {
            .page-header h1 { font-size: 2rem; }
            .speakers-grid { padding: 4rem 0; }
        }
    `;
    return <style>{css}</style>;
};

// --- Main Component ---
const SpeakersPage = () => {
    const speakers = [
        {
            id: 'spk1',
            name: 'Dr. Arul Prakash',
            affiliation: 'Lead AI Researcher, TechCorp',
            bio: 'A leading expert in machine learning and neural networks, with over 15 years of experience in pioneering AI-driven solutions.',
            image: speaker1,
        },
        {
            id: 'spk2',
            name: 'Priya Menon',
            affiliation: 'Cloud Architect, AWS',
            bio: 'Specializes in scalable cloud infrastructure and serverless computing. Author of "The Cloud Native Mindset".',
            image: 'https://placehold.co/150x150/F57C00/FFFFFF?text=PM',
        },
        {
            id: 'spk3',
            name: 'Dr. Ben Carter',
            affiliation: 'Professor of Robotics, INTI University',
            bio: 'An esteemed academic from our partner university, focusing on human-robot interaction and autonomous systems.',
            image: 'https://placehold.co/150x150/D32F2F/FFFFFF?text=BC',
        },
    ];

    return (
        <>
            <Styles />
            <main>
                <header className="page-header">
                    <div className="container">
                        <h1>Meet Our Speakers</h1>
                        <p>We are honored to host a diverse group of industry leaders, innovative researchers, and esteemed academics from around the world.</p>
                    </div>
                </header>

                <div className="container">
                    <div className="speakers-grid">
                        {speakers.map((speaker, index) => (
                            <SpeakerCard 
                                key={speaker.id} 
                                speaker={speaker} 
                                animationDelay={`${0.15 * (index + 1)}s`} 
                            />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
};

export default SpeakersPage;