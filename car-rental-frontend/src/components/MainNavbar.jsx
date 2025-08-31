// src/components/MainNavbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Make sure this file exists

const MainNavbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <i className="fas fa-car"></i> DriveEasy
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cars">Our Fleet</Link>
        <Link to="/#pricing">Pricing</Link>
        <Link to="/#contact">Contact</Link>
      </nav>
      <div className="auth-buttons">
        <Link to="/login" className="auth-btn login-btn">Login</Link>
        <Link to="/register" className="auth-btn register-btn">Register</Link>
      </div>
    </header>
  );
};

export default MainNavbar;