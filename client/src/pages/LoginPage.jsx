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

        /* --- Global Variables --- */
        :root {
            --brand-orange: #F57C00; --brand-orange-dark: #E65100;
            --brand-blue-dark: #0D47A1; --brand-blue-primary: #1976D2;
            --brand-blue-light: #E3F2FD; --brand-red: #D32F2F;
            --text-primary: #111318; --text-secondary: #6c757d;
            --surface-light: #f8f9fa; --surface-dark: #e9ecef; --white: #FFFFFF;
            --page-max-width: 1200px; --gutter: 1.25rem; --radius: 12px;
            --shadow-soft: 0 6px 20px rgba(17, 19, 24, 0.06);
            --shadow-strong: 0 10px 30px rgba(17, 19, 24, 0.1);
        }

        /* --- Login Page Layout --- */
        .login-page-container {
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            background-color: var(--surface-light);
            padding: 2rem var(--gutter);
        }

        .login-form {
            background: var(--white);
            padding: 2.5rem;
            border-radius: var(--radius);
            box-shadow: var(--shadow-strong);
            width: 100%;
            max-width: 450px;
            text-align: center;
            opacity: 0;
            animation: fadeInUp 0.7s ease-out forwards;
        }

        .login-form h1 {
            font-size: 2rem;
            color: var(--brand-blue-dark);
            margin: 0 0 0.5rem 0;
        }

        .login-form .subtitle {
            color: var(--text-secondary);
            margin-bottom: 2rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
            text-align: left;
        }

        .form-group label {
            display: block;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 0.5rem;
        }

        .form-group input {
            width: 100%;
            padding: 0.8rem 1rem;
            border: 1px solid var(--surface-dark);
            border-radius: 8px;
            font-size: 1rem;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .form-group input:focus {
            outline: none;
            border-color: var(--brand-blue-primary);
            box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
        }

        .form-actions {
            margin-top: 2rem;
        }
        
        .form-links {
            margin-top: 1.5rem;
            font-size: 0.9rem;
        }

        .form-links a {
            color: var(--brand-blue-primary);
            text-decoration: none;
            font-weight: 500;
        }
        .form-links a:hover {
            text-decoration: underline;
        }
        .form-links .separator {
            margin: 0 0.5rem;
            color: var(--text-secondary);
        }

        /* --- UNIFIED BUTTON STYLES --- */
        .btn {
            display: inline-flex; align-items: center; justify-content: center;
            width: 100%; /* Make button full-width */
            border: none; font-weight: 700; border-radius: 8px; cursor: pointer;
            text-decoration: none; transition: all 0.2s ease-in-out;
            padding: 0.85rem 1.5rem;
            font-size: 1rem;
        }
        .btn:hover { transform: translateY(-2px); }
        .btn-primary {
            background: var(--brand-orange);
            color: var(--white);
            box-shadow: 0 6px 18px rgba(245, 124, 0, 0.25);
        }
        .btn-primary:hover {
            background: var(--brand-orange-dark);
            box-shadow: 0 10px 26px rgba(245, 124, 0, 0.3);
        }
    `;
    return <style>{css}</style>;
};

// --- Main Component ---
const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // In a real application, you would handle the login logic here
        console.log('Login attempt with:', { email, password });
        alert('Login functionality is for demonstration only.');
    };

    return (
        <>
            <Styles />
            <div className="login-page-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Conference Login</h1>
                    <p className="subtitle">Access your conference dashboard</p>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            Sign In
                        </button>
                    </div>

                    <div className="form-links">
                        <a href="#">Forgot Password?</a>
                        <span className="separator">|</span>
                        <a href="#">Create an Account</a>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LoginPage;