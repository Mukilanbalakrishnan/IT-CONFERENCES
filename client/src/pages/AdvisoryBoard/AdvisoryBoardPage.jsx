import React from 'react';
import './AdvisoryBoardPage.css'; // This stylesheet will be updated

// --- Main Component ---
const AdvisoryBoardPage = () => {
    const teamMembers = [
        { 
            id: 'tm1',
            name: 'John Doe', 
            role: 'Leader', 
            bio: 'Lorem ipsum dolor amet, diam pharetra adipiscing elit.',
            image: 'https://placehold.co/200x200/EFEFEF/333?text=JD',
        },
        { 
            id: 'tm2',
            name: 'Jane Doe', 
            role: 'Senior', 
            bio: 'Lorem ipsum dolor amet, diam pharetra adipiscing elit.',
            image: 'https://placehold.co/200x200/EFEFEF/333?text=JD',
        },
        { 
            id: 'tm3',
            name: 'John Doe', 
            role: 'Senior', 
            bio: 'Lorem ipsum dolor amet, diam pharetra adipiscing elit.',
            image: 'https://placehold.co/200x200/EFEFEF/333?text=JD',
        },
        { 
            id: 'tm4',
            name: 'Jane Doe', 
            role: 'Junior', 
            bio: 'Lorem ipsum dolor amet, diam pharetra adipiscing elit.',
            image: 'https://placehold.co/200x200/EFEFEF/333?text=JD',
        },
    ];

    return (
        <main>
            <section className="team-section">
                <div className="container">
                    <div className="team-header">
                        <p className="subtitle">Meet Our Team</p>
                        <h2 className="title">Our Team</h2>
                    </div>

                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div className="team-member-profile" key={member.id} style={{ animationDelay: `${0.15 * (index + 1)}s` }}>
                                <div className="image-container">
                                    <svg width="100%" height="100%" viewBox="0 0 180 180" className="hexagon-svg">
                                        <defs>
                                            <clipPath id={`hexagon-clip-${member.id}`}>
                                                <path d="M 90,0 L 175,45 V 135 L 90,180 L 5,135 V 45 Z" />
                                            </clipPath>
                                        </defs>
                                        <image
                                            clipPath={`url(#hexagon-clip-${member.id})`}
                                            href={member.image}
                                            x="0" y="0" height="180" width="180"
                                            preserveAspectRatio="xMidYMid slice"
                                        />
                                        {/* Two paths for the two-color border */}
                                        <path className="hexagon-border border-blue" d="M 90,0 L 175,45 V 135 L 90,180 L 5,135 V 45 Z" />
                                        <path className="hexagon-border border-orange" d="M 90,0 L 175,45 V 135 L 90,180 L 5,135 V 45 Z" />
                                    </svg>
                                </div>
                                <h3 className="name">{member.name}</h3>
                                <p className="role">{member.role}</p>
                                <p className="bio">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdvisoryBoardPage;