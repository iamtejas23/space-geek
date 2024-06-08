// Footer.js
import React from 'react';
import './Footer.css'; // Import the CSS file for styling
import { GiAstronautHelmet } from "react-icons/gi";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">Tejas Mane <GiAstronautHelmet /></p>
        <div className="footer-links">
          <a href="https://github.com/iamtejas23" className="footer-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/iamtejas23" className="footer-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
