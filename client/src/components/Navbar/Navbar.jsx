import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Logo
        </Link>
        <Link to="/about" className="navbar__link">
          About
        </Link>
        <div className="navbar__actions">
          <Link to="/login" className="navbar__link">
            Login
          </Link>
          <Link to="/register">
            <button className="navbar__register">Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// <Link to="/settings" className="navbar__settings">
// Settings
// </Link>
