import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = users.some((u) => u.email === formData.email);
    if (userExists) {
      setMessage("⚠️ User already exists, please login.");
      return;
    }

    // Save new user
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));

    setMessage("✅ Registration successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Account</h2>
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              placeholder="Enter your full name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email"
              name="email" 
              placeholder="Enter your email address" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Create a password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit">
            <i className="fas fa-user-plus"></i> Register
          </button>
        </form>
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;