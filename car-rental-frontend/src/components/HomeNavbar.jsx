
import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>DriveEasy</h2>
          </div>
          
          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <div className="nav-item">Home</div>
            <div className="nav-item">Our Fleet</div>
            <div className="nav-item">Pricing</div>
            <div className="nav-item">Contact</div>
            <div className="nav-item">Login</div>
            <div className="nav-item">
              <button className="register-btn">Register</button>
            </div>
          </div>
          
          <div className="nav-toggle" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>
      </nav>

      <div className="hero-section">
        <div className="hero-content">
          <h1>Find Your Dream Ride</h1>
          <button className="cta-button">Get Started</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;