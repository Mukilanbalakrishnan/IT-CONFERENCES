import React, { useEffect, useRef } from 'react';
import './AdvisoryBoardPage.css';

const AdvisoryBoardPage = () => {
    const NationalAdvisory = [
        { name: 'Prof. P. Somasundaram', role: 'Professor', department: 'Electrical and Electronics Engineering', institution: 'Anna University Chennai, Tamil Nadu India' },
        { name: 'Prof. A. Kirubakaran', role: 'Associate Professor', department: 'Electrical and Electronics Engineering', institution: 'National Institute of Technology Warangal, Telangana India' },
        { name: 'Dr. N.P. Subramanian', role: 'Associate Professor', department: 'Electrical and Electronics Engineering', institution: 'Puducherry Technological University, Puducherry, India' },
        { name: 'Dr. Bharatiraja C', role: 'Professor', department: 'Faculty of Engineering and Technology', institution: 'SRM Institute of Science and Technology, Kattankulathur, Tamil Nadu India' },
        { name: 'Dr. Rijo Jackson Tom', role: 'Principal Data Scientist', department: 'Information Technology', institution: 'Augusta Hitech Soft Solutions, Coimbatore, Tamil Nadu India' },
        { name: 'Dr. S. Moorthi', role: 'Associate Professor', department: 'Electrical and Electronics Engineering', institution: 'National Institute of Technology, Tiruchirappalli, Tamil Nadu India' },
        { name: 'Dr. W. Wilfred Godfrey', role: 'Associate Professor', department: 'Electronics and Communication Engineering', institution: 'Indian Institute of Technology and Management, Gwalior, Madhya Pradesh India' },
        { name: 'Dr. S. Janakiraman', role: 'Associate Professor', department: 'Banking Technology, School of Management', institution: 'Pondicherry University, Puducherry, India' },
        { name: 'Dr. P. Damodharan', role: 'Associate Professor', department: 'Electronics and Communication Engineering', institution: 'Indian Institute of Information Technology Design & Manufacturing (IIITD&M), Kancheepuram, Tamil Nadu India' },
        { name: 'Dr. Vijayakumar Krishnasamy', role: 'Associate Professor', department: 'Electronics and Communication Engineering', institution: 'IIITDM Kancheepuram, Chennai, Tamil Nadu India' }
    ];

    const InternationalAdvisory = [
        { name: 'Dr. Muhammad H Rashid', role: 'Professor', department: 'Electrical and Computer Engineering', institution: 'University of West Florida, Pensacola, Florida USA' },
        { name: 'Dr. H.J. Ahmad Rashidy Razali', role: 'Professor', department: 'Electronics and Communication Engineering', institution: 'Universiti Teknologi MARA (UiTM), Shah Alam, Selangor Malaysia' },
        { name: 'Dr. Jens Bo Holm Nielsen', role: 'Emeritus Associate Professor', department: 'Faculty of Engineering and Science', institution: 'Aalborg University, Aalborg, Denmark' },
        { name: 'Dr. Atsuo Kawamura', role: 'Professor', department: 'Electrical and Computer Engineering', institution: 'Yokohama National University, Yokohama, Kanagawa Japan' },
        { name: 'Dr. Murugappan M', role: 'Professor', department: 'Electronics and Communication Engineering', institution: 'Kuwait College of Science and Technology, Kuwait City, Kuwait' },
        { name: 'Dr. Saad Mekhilef', role: 'Professor', department: 'Electrical Engineering', institution: 'University of Malaya, Kuala Lumpur, Malaysia' },
        { name: 'Brindha Venkateswaran', role: 'Software Embedded Engineer', department: 'Automotive R&D Department', institution: 'Aumovio Singapore, Singapore' },
        { name: 'Gunasekaran Thangavel', role: 'Professor', department: 'Electronics and Communication Engineering', institution: 'University of Technology and Applied Sciences, Muscat, Oman' },
        { name: 'Akhtar Kalam', role: 'Professor', department: 'Head of External Engagement, Leader – Smart Energy Research Unit', institution: 'College of Engineering and Science, Victoria, Australia' },
        { name: 'Dr. Abid Yahya', role: 'Associate Professor', department: 'Computer | Electrical & Telecommunications Engineering', institution: 'Botswana International University of Science and Technology, Palapye, Botswana' }
    ];

    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        const sections = sectionRef.current.querySelectorAll('.page-header, .board-member-card');
        sections.forEach((section) => {
            observer.observe(section);
        });

        return () => {
            sections.forEach((section) => {
                observer.unobserve(section);
            });
        };
    }, []);


    return (
        <main className="advisory-board" ref={sectionRef}>
            {/* National Advisory */}
            <header className="page-header">
                <div className="container">
                    <h1>National Advisory Committee</h1>
                </div>
            </header>

            <div className="container">
                <div className="board-grid">
                    {NationalAdvisory.map((member, index) => (
                        <div className="board-member-card" key={index}>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <div className="member-institution">
                                <p className="institution-line">
                                    <span className="institution-department">{member.department}</span>
                                </p>
                                <p className="institution-line">
                                    {member.institution}
                                </p>
                            </div>
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
                        <div className="board-member-card" key={index}>
                            <h3 className="member-name">{member.name}</h3>
                            <p className="member-role">{member.role}</p>
                            <div className="member-institution">
                                <p className="institution-line">
                                    <span className="institution-department">{member.department}</span>
                                </p>
                                <p className="institution-line">
                                    {member.institution}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AdvisoryBoardPage;

