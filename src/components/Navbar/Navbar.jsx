import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your CSS file for styling
import { GiAstronautHelmet } from "react-icons/gi";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'active' : ''}`}>
      <div className="container">
        <Link to="/" className="logo"> <GiAstronautHelmet color='white' />  <b>Space Geek</b> </Link>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className={`nav-links ${isOpen ? 'active' : ''}`}>
          <Link to="/iss" className="nav-link" onClick={toggleMenu}>Track ISS</Link>
          <Link to="/catalogs" className="nav-link" onClick={toggleMenu}>Solar System Bodies</Link>
          <Link to="/spacethings" className="nav-link" onClick={toggleMenu}>Geek API</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
