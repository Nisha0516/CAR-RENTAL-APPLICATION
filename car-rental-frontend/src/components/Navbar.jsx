// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ isAuthenticated, user, onLogout }) => {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <i className="fas fa-car"></i> DriveEasy
      </Link>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/#fleet">Our Fleet</Link>
        <Link to="/#pricing">Pricing</Link>
        <Link to="/#contact">Contact</Link>
      </nav>
      <div className="auth-buttons">
        {isAuthenticated ? (
          <>
            <span className="welcome-text">Welcome, {user?.name}</span>
            <Link to="/dashboard" className="auth-btn dashboard-btn">
              Dashboard
            </Link>
            <button className="auth-btn logout-btn" onClick={onLogout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="auth-btn login-btn">
              Login
            </Link>
            <Link to="/register" className="auth-btn register-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;