import React from 'react';
import { Link } from 'react-router-dom';
// import { connect } from "react-redux";
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        Logo
      </Link>
      <div>
        <Link to="/settings" className="navbar__settings">
          Settings
        </Link>
        <Link to="/login" className="navbar__login">
          Login/Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
