import React, { useState, useEffect, useRef } from 'react';
import './OrganizingCommitteePage.css';
import { FaUsers, FaBook, FaMoneyBill, FaClipboardList, FaHotel,FaChevronDown} from 'react-icons/fa';

const OrganizingCommitteePage = () => {
    const committeeData = [
        { 
            id: 'publication', 
            name: 'Publication Chair(s) – Coordinate Proceedings, Indexing & Journal Issues', 
            icon: <FaBook />,
            members: [
                { name: 'Dr. S. Karthikeyan', role: 'Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. S. Premalatha', role: 'Associate Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. S. Dhivagar', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. M. Subramani', role: 'Assistant Professor, EEE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. B.B. Sangamaeswaren', role: 'Assistant Professor, BME', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Ms. V.D. Nandhini', role: 'Assistant Professor, BME', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'local', 
            name: 'Local Organizing Committee', 
            icon: <FaUsers />,
            members: [
                { name: 'Dr. P. Mahendharan', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. P. Sivashankar Rajamani', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. J. Ganesh Moorthy', role: 'Assistant Professor, EEE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. P.J. Ragu', role: 'Assistant Professor, BME', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'finance', 
            name: 'Finance / Sponsorship & Fundraising Committee', 
            icon: <FaMoneyBill />,
            members: [
                { name: 'Mr. K. Karuppanasamy', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. P. Usha', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. M. Vijayakumar', role: 'Assistant Professor, EEE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mr. SS. Parameswaren', role: 'Assistant Professor, BME', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'registration', 
            name: 'Registration Committee', 
            icon: <FaClipboardList />,
            members: [
                { name: 'Ms. B. Latha', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. M. Dharani', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. S. Senthil Kumar', role: 'Assistant Professor, EEE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. E. Vani', role: 'Associate Professor, EEE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. M. Brindha', role: 'Assistant Professor, BME', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        },
        { 
            id: 'hospitality', 
            name: 'Hospitality & Accommodation Committee', 
            icon: <FaHotel />,
            members: [
                { name: 'Dr. K.P. Uvarajan', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Dr. T.M. Sathishkumar', role: 'Assistant Professor, ECE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Ms. V.D. Nandhini', role: 'Assistant Professor, BME', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' },
                { name: 'Mrs. A. Vasanthi', role: 'Assistant Professor, EEE', institution: 'KSR College of Engineering, Tiruchengode, Tamilnadu, India' }
            ]
        }
    ];

  
  const [activeCommittee, setActiveCommittee] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);
    const detailRefs = useRef({});

    useEffect(() => {
        // Check if there's a hash in the URL on initial load
        const hash = window.location.hash.substring(1);
        if (hash && committeeData.some(item => item.id === hash)) {
            setActiveCommittee(hash);
            setHasInteracted(true);
            
            // Scroll to the section after a short delay to ensure DOM is ready
            setTimeout(() => {
                detailRefs.current[hash]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }, 100);
        }

        const observer = new IntersectionObserver(  
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const newCommittee = entry.target.id;
                        setActiveCommittee(newCommittee);
                        setHasInteracted(true);
                        
                        // Update URL hash without adding to browser history
                        if (window.history.replaceState) {
                            window.history.replaceState(null, null, `#${newCommittee}`);
                        } else {
                            window.location.hash = `#${newCommittee}`;
                        }
                    }
                });
            },
            { rootMargin: '-40% 0px -60% 0px', threshold: 0 }
        );

        Object.values(detailRefs.current).forEach(ref => {
            if (ref) observer.observe(ref);
        });

        // Handle browser back/forward button clicks
        const handlePopState = () => {
            const hash = window.location.hash.substring(1);
            if (hash && committeeData.some(item => item.id === hash)) {
                setActiveCommittee(hash);
                setHasInteracted(true);
                detailRefs.current[hash]?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            } else {
                // If no hash or invalid hash, scroll to top
                setActiveCommittee(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            Object.values(detailRefs.current).forEach(ref => {
                if (ref) observer.unobserve(ref);
            });
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);
    
    const handleNavClick = (id) => {
        setIsMobileMenuOpen(false);
        setActiveCommittee(id);
        setHasInteracted(true);
        
        // Update URL hash and add to browser history
        if (window.history.pushState) {
            window.history.pushState(null, null, `#${id}`);
        } else {
            window.location.hash = `#${id}`;
        }
        
        detailRefs.current[id]?.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    };

    const handleDropdownClick = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
        // Set hasInteracted to true when dropdown is clicked
        if (!hasInteracted) {
            setHasInteracted(true);
        }
    };

    const getActiveCommitteeName = () => {
        if (!hasInteracted) return "";
        const active = committeeData.find(item => item.id === activeCommittee);
        return active ? active.shortName : "";
    };

    return (
        <main className="organizingCommitteePage">
            <header className="page-header">
                <div className="container">
                    <h1>Organizing Committee</h1>
                </div>
            </header>

            <div className="container committee-layout">
                {/* Mobile Dropdown Navigation */}
                <div className="mobile-nav-toggle">
                    <button 
                        className={`mobile-dropdown-trigger ${!hasInteracted && !activeCommittee ? 'placeholder' : ''}`}
                        onClick={handleDropdownClick}
                        aria-expanded={isMobileMenuOpen}
                    >
                        Explore our Committee
                        <span>{getActiveCommitteeName()}</span>
                        <FaChevronDown className={`dropdown-chevron ${isMobileMenuOpen ? 'open' : ''}`} />
                    </button>
                    
                    <div className={`mobile-nav-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
                        {committeeData.map(item => (
                            <a 
                                key={item.id}
                                href={`#${item.id}`}
                                className={`mobile-nav-link ${activeCommittee === item.id ? 'active' : ''}`}
                                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Left Side Navigation (Desktop) */}
                <nav className="committee-nav">
                    <h2>Committee Teams</h2>
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
                            style={{ animationDelay:` ${index * 0.1}s` }}
                        >
                            <h3 className="detail-title">{item.icon} {item.name}</h3>
                            <div className="mentor-list">
                                {item.members.map((member, i) => (
                                    <div key={i} className="mentor-item">
                                        <strong>{member.name}</strong>
                                        <span className="role">{member.role}</span>
                                        <span className="institution">{member.institution}</span>
                                    </div>
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