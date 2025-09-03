import React, { useState, useEffect, useRef } from 'react';
import './OrganizingCommitteePage.css'; // Import the new stylesheet
import { FaUsers, FaFlask, FaBook, FaBullhorn } from 'react-icons/fa'; // Example icons

const OrganizingCommitteePage = () => {
    const committeeData = [
        { id: 'academic', name: 'Academic & Rapporteur Committee', mentor: 'Track 1: Prof. Atul Kulkarni\nTrack 2: Prof. Sunil Saroj\nTrack 3: Dr. Bhushan Borotikar\nTrack 4: Dr Prakash Rao\nTrack 5: Prof. Ketan Kotecha', icon: <FaBook /> },
        { id: 'research', name: 'Research & Publication Committee', mentor: 'Prof. Yogesh Patil', icon: <FaFlask /> },
        { id: 'stage', name: 'Stage Committee', mentor: 'Dr. Sammita Jadhav', icon: <FaUsers /> },
        { id: 'it', name: 'AV Aid and IT Committee', mentor: 'Dr. Prasad Bhanap', icon: <FaUsers /> },
        { id: 'finance', name: 'Finance Committee', mentor: 'Dr. Alaka Chandak', icon: <FaUsers /> },
        { id: 'sponsorship', name: 'Sponsorship Committee', mentor: 'Dr. Shubhada Sharma', icon: <FaUsers /> },
        { id: 'reception', name: 'Invitation & Reception Committee', mentor: 'Dr. Parimala Veluvali', icon: <FaUsers /> },
        { id: 'branding', name: 'Branding, Press & Media Committee', mentor: 'Dr. Girija Mahale', icon: <FaBullhorn /> },
    ];

    const [activeCommittee, setActiveCommittee] = useState(committeeData[0].id);
    const detailRefs = useRef({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveCommittee(entry.target.id);
                    }
                });
            },
            { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
        );

        Object.values(detailRefs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => {
            Object.values(detailRefs.current).forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, []);
    
    const handleNavClick = (id) => {
        detailRefs.current[id]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    return (
        <main className="committee-page">
            <header className="page-header">
                <div className="container">
                    <h1>Organizing Committee</h1>
                </div>
            </header>

            <div className="container committee-layout">
                {/* Left Side Navigation */}
                <nav className="committee-nav">
                    <ul>
                        {committeeData.map(item => (
                            <li key={item.id}>
                                <a 
                                    href={`#${item.id}`}
                                    className={`nav-link ${activeCommittee === item.id ? 'active' : ''}`}
                                    onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Right Side Content */}
                <div className="committee-details">
                    {committeeData.map((item, index) => (
                        <section 
                            id={item.id} 
                            key={item.id}
                            ref={el => detailRefs.current[item.id] = el}
                            className="detail-card"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <h3 className="detail-title">{item.name}</h3>
                            <div className="mentor-list">
                                {item.mentor.split('\n').map((mentor, i) => (
                                    <p key={i} className="mentor-item">{mentor}</p>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default OrganizingCommitteePage;