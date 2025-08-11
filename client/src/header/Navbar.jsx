import React from 'react';
import './Navbar.css'; // Import the navbar-specific styles

const Navbar = () => {
  return (
    <header className="header">
      <div className="container inner">
        <a href="#" className="brand">
          <div className="brand-text">KSR</div>
          <div className="brand-sub">Educational Institutions</div>
        </a>
        <nav className="nav">
          <a href="#">Home</a>
          <a href="#">Schedules</a>
          <a href="#">Speakers</a>
          <a href="#">Contact</a>
        </nav>
        <div className="header-actions">
          <button className="btn btn-primary">Register</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
