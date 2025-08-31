// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Header/Navbar */}
      <header className="header">
        <Link to="/" className="logo">
          <i className="fas fa-car"></i>RentPlus
        </Link>
        
        <nav className="nav-links">
          <Link to="/"><i className="fas fa-home"></i> Home</Link>
          <Link to="/fleet"><i className="fas fa-car-side"></i> Our Fleet</Link>
          <Link to="/pricing"><i className="fas fa-tag"></i> Pricing</Link>
          <Link to="/contact"><i className="fas fa-phone"></i> Contact</Link>
        </nav>
        
        <div className="auth-buttons">
          <Link to="/login" className="auth-btn login-btn">
            <i className="fas fa-sign-in-alt"></i> Login
          </Link>
          <Link to="/register" className="auth-btn register-btn">
            <i className="fas fa-user-plus"></i> Register
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Find Your Dream Ride</h1>
          <p>Experience luxury and performance with our premium fleet of vehicles</p>
          <div className="hero-buttons">
            <Link to="/fleet" className="hero-button primary">
              <i className="fas fa-search"></i> Explore Fleet
            </Link>
            <Link to="/register" className="hero-button secondary">
              <i className="fas fa-calendar-check"></i> Reserve Now
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose RentPlus</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-dollar-sign"></i>
            </div>
            <h3>Best Prices</h3>
            <p>Competitive rates with no hidden fees. Get the best value for your money.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-car"></i>
            </div>
            <h3>Wide Selection</h3>
            <p>From economy to luxury, we have the perfect vehicle for every occasion.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <i className="fas fa-headset"></i>
            </div>
            <h3>24/7 Support</h3>
            <p>Our customer service team is always available to assist you.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>RentPlus</h3>
            <p>Your premium car rental service for every journey.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/fleet">Our Fleet</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p><i className="fas fa-phone"></i> +1 (555) 123-4567</p>
            <p><i className="fas fa-envelope"></i> info@rentplus.com</p>
            <p><i className="fas fa-map-marker-alt"></i> 123 Main St, City, State</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 RentPlus. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;