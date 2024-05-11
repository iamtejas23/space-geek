// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Space Explorer</Link>
        <div className="nav-links">
          <Link to="/iss" className="nav-link">Track ISS</Link>
          <Link to="/catalogs" className="nav-link">Solar System Bodies</Link>
          <Link to="/spacethings" className="nav-link">Space Things</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
