// src/components/Footer.jsx
import React from "react";
import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>© {new Date().getFullYear()} CarRental • Built with MERN</p>
      </div>
    </footer>
  );
}
