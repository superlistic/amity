import React from 'react';
import { NavLink } from 'react-router-dom';
// import { connect } from "react-redux";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar__container">
        <NavLink to="/" className="navbar__link">
          <img
            className="navbar__logo"
            src="./static/logo.svg"
            alt="logo"
            to="/"
            width="120rem"
            height="32rem"
          />
        </NavLink>

        <NavLink to="/about" className="navbar__link">
          About
        </NavLink>
        <div className="navbar__actions">
          <NavLink to="/login" className="navbar__link">
            Login
          </NavLink>
          <NavLink to="/register">
            <button className="navbar__register">Register</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

// <Link to="/settings" className="navbar__settings">
// Settings
// </Link>
