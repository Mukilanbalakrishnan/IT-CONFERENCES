import React from 'react';

// This component contains all the specific styles needed for the footer.
const Styles = () => {
    const css = `
        /* Root variables needed for the footer styles */
        :root {
            --brand-orange: #F57C00;
            --brand-blue-dark: #0D47A1;
            --surface-light: #f8f9fa;
            --white: #FFFFFF;
            --page-max-width: 1200px;
            --gutter: 1.25rem;
        }

        /* --- Footer Component Styles --- */
        .footer {
            background: var(--brand-blue-dark);
            padding: 2.5rem 0;
            color: var(--surface-light);
            /* This ensures it stays below the content on mobile */
            margin-top: auto; 
        }

        .footer .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap; /* Allows items to stack on small screens */
            gap: 1.5rem; /* Provides space between items when they stack */
        }

        .footer p {
            color: var(--surface-light);
            margin: 0; /* Removes default paragraph margin */
            font-weight: 500;
        }

        .footer .links {
            display: flex;
            gap: 1.5rem; /* Space between links */
            flex-wrap: wrap;
        }

        .footer a {
            color: var(--white);
            font-weight: 500;
            text-decoration: none;
            transition: color 0.2s ease;
        }

        .footer a:hover {
            color: var(--brand-orange);
            text-decoration: underline;
        }
        
        /* A generic container class needed by the footer */
        .container {
            width: 100%;
            max-width: var(--page-max-width);
            margin: 0 auto;
            padding: 0 var(--gutter);
        }

        /* Responsive adjustment for small screens */
        @media (max-width: 600px) {
            .footer .container {
                flex-direction: column; /* Stack the copyright and links vertically */
                text-align: center;
            }
        }
    `;
    return <style>{css}</style>;
};

const Footer = () => {
    return (
        <>
            <Styles />
            <footer className="footer">
                <div className="container">
                    <p>&copy; {new Date().getFullYear()} KSR Institutions. All Rights Reserved.</p>
                    <div className="links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Use</a>
                        <a href="#">Contact</a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;