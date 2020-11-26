import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css';
import { logOut } from '../../actions/auth';

const Navbar = ({ isAuthenticated, logOut }) => {
  const NAV_LINKS = {
    true: (
      <div className="navbar__container--authenticated">
        <NavLink to="/connection" className="navbar__link">
          <img
            className="navbar__logo"
            src="./static/logo.svg"
            alt="logo"
            to="/"
            width="145rem"
            height="32rem"
          />
        </NavLink>

        <div className="navbar__actions">
          <NavLink to="/settings" className="navbar__settings">
            <span class="material-icons navbar__settings__span">settings</span>
          </NavLink>
          <NavLink to="/" className="navbar__link" onClick={logOut}>
            Logout
          </NavLink>
        </div>
      </div>
    ),
    false: (
      <div className="navbar__container">
        <NavLink to="/" className="navbar__link">
          <img
            className="navbar__logo"
            src="./static/logo.svg"
            alt="logo"
            to="/"
            width="145rem"
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
    ),
  };

  return <div className="navbar">{NAV_LINKS[isAuthenticated]}</div>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { logOut })(Navbar);
// { logout }
