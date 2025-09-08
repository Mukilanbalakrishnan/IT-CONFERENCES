import React from 'react';

// This component includes its own styles for a self-contained setup.
const componentStyles = `
/* --- Global Styles & Variables --- */
:root {
    --brand-bg-dark: #2a2a3e; /* Dark purple/blue from image */
    --text-light: #ffffff;
    --text-accent: #fcd03c; /* Bright yellow for highlights */
}

/* --- Main Layout --- */
.deadlines-container {
    font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: linear-gradient(135deg, #1e1e32, #3c3c54);
    width: 100%;
    max-width: 800px; /* Wider for desktop */
    margin: 4rem auto; /* More vertical space for a webpage context */
    border-radius: 1.5rem;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2), 0 10px 10px -5px rgba(0,0,0,0.1);
    overflow: hidden;
    padding: 2rem; /* Responsive padding */
    position: relative;
    box-sizing: border-box;
}

/* Decorative background lines */
.deadlines-container::before, .deadlines-container::after {
    content: '';
    position: absolute;
    bottom: 2rem;
    left: 10%;
    right: 10%;
    height: 3px;
    border-radius: 2px;
    opacity: 0.5;
    z-index: 0;
}
.deadlines-container::before {
    background: linear-gradient(90deg, #84C766, #4CB395);
    transform: rotate(-2deg);
}
.deadlines-container::after {
    background: linear-gradient(90deg, #A955B8, #2790C3);
    transform: rotate(1deg);
    bottom: 2.5rem;
}

.deadlines-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 1rem; /* Row and column gap */
    margin-bottom: 3rem;
    position: relative;
    z-index: 1;
}

.header-title {
    font-size: 2rem; /* Mobile first font size */
    font-weight: 900;
    color: var(--text-light);
    line-height: 1;
    text-transform: uppercase;
}

.header-year {
    background-color: var(--text-accent);
    color: #1C1C1E;
    font-size: 2rem; /* Mobile first font size */
    font-weight: 900;
    padding: 0.5rem 1rem;
    border-radius: 0.75rem;
    line-height: 1;
}

/* --- Deadlines List --- */
.deadlines-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    position: relative;
    z-index: 1;
}

.deadline-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
}

/* Staggered layout for larger screens */
@media (min-width: 640px) {
    .deadline-item[data-align="right"] {
        flex-direction: row-reverse;
    }
    .deadline-item[data-align="right"] .deadline-details {
        text-align: right;
    }
}

.date-block {
    flex-shrink: 0;
    color: var(--text-light);
    padding: 0.75rem 1rem;
    border-radius: 0.75rem;
    text-align: center;
    width: 70px; /* Slightly smaller base for mobile */
}
.date-month {
    font-size: 1.125rem;
    font-weight: 700;
    display: block;
    line-height: 1;
}
.date-day {
    font-size: 1.75rem;
    font-weight: 900;
    display: block;
    line-height: 1;
}

.deadline-details {
    flex-grow: 1;
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
    padding-bottom: 0.75rem;
}

.deadline-title {
    font-size: 1.125rem; /* Base size for mobile */
    font-weight: 800;
    color: var(--text-accent);
    text-transform: uppercase;
    margin: 0;
}

.deadline-description {
    font-size: 0.875rem;
    color: var(--text-light);
    opacity: 0.8;
    margin: 0.25rem 0 0 0;
}

.deadlines-footer {
    text-align: center;
    margin-top: 3rem;
    color: var(--text-light);
    opacity: 0.8;
    position: relative;
    z-index: 1;
}
.footer-text {
    font-size: 0.875rem;
}
.footer-url {
    font-size: 1rem;
    font-weight: 700;
    display: block;
    margin-top: 0.25rem;
}

/* Responsive adjustments for larger screens */
@media (min-width: 640px) {
    .deadlines-container {
        padding: 2.5rem 3rem;
    }
    .header-title, .header-year {
        font-size: 2.5rem;
    }
    .deadline-title {
        font-size: 1.25rem;
    }
    .date-block {
        width: 80px;
    }
    .date-month {
        font-size: 1.25rem;
    }
    .date-day {
        font-size: 1.875rem;
    }
}
`;

// Data with your deadlines and the styles for each item
const deadlineData = [
  { month: 'NOV', day: '30', title: 'Full Paper Submission', description: 'Deadline for 2025', color: '#E94B55', align: 'left' },
  { month: 'DEC', day: '15', title: 'Late Submission', description: 'Extended Deadline for 2025', color: '#2790C3', align: 'right' },
  { month: 'JAN', day: '31', title: 'Acceptance Notification', description: 'For 2026 Submissions', color: '#A955B8', align: 'left' },
  { month: 'FEB', day: '20', title: 'Author Registration', description: 'Registration Deadline for 2026', color: '#84C766', align: 'right' },
  { month: 'MAR', day: '10', title: 'Final Registration', description: 'Final Deadline for 2026', color: '#F3B62F', align: 'left' },
  { month: 'MAR', day: '26-27', title: 'Conference Days', description: 'S3-ECBE\' 2026', color: '#4CB395', align: 'right' },
];


const UpcomingDeadlines = () => {
    return (
        <React.Fragment>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&display=swap');
                {componentStyles}
            </style>
            <div className="deadlines-container">
                <header className="deadlines-header">
                    <span className="header-title">Important Dates</span>
                    {/* <span className="header-year">2026</span> */}
                </header>

                <div className="deadlines-list">
                    {deadlineData.map((item, index) => (
                        <div key={index} className="deadline-item" data-align={item.align}>
                            <div className="date-block" style={{ backgroundColor: item.color }}>
                                <span className="date-month">{item.month}</span>
                                <span className="date-day">{item.day}</span>
                            </div>
                            <div className="deadline-details">
                                <h3 className="deadline-title">{item.title}</h3>
                                <p className="deadline-description">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* <footer className="deadlines-footer">
                    <p className="footer-text">Visit our website for more upcoming events</p>
                    <p className="footer-url">www.s3ecbe-2026.com</p>
                </footer> */}
            </div>
        </React.Fragment>
    );
};

export default UpcomingDeadlines;

