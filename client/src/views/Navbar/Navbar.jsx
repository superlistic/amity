import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import './Navbar.css';
import { logOut } from '../../actions/auth';
import { ThinAccentOutlinedButton } from '../../components/button';

const Navbar = ({ isAuthenticated, logOut, user, loading, stateSocket }) => {
  const onLogOut = () => {
    if (stateSocket) stateSocket.disconnect();
    logOut();
  };

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
          <NavLink
            to={user ? `/profile/${user.username}` : '/connection'}
            className="navbar__link--auth"
          >
            {user && user.username}
          </NavLink>
          <NavLink to="/schedule" className="navbar__icon-container">
            <span className="material-icons navbar__icon">today</span>
          </NavLink>
          <NavLink to="/settings" className="navbar__icon-container">
            <span className="material-icons navbar__icon">settings</span>
          </NavLink>
          <NavLink to="/" className="navbar__link--auth" onClick={onLogOut}>
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
          <ThinAccentOutlinedButton className="navbar__register" to="/register">
            Register
          </ThinAccentOutlinedButton>
        </div>
      </div>
    ),
  };
  return <div className="navbar">{NAV_LINKS[isAuthenticated]}</div>;
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  user: state.auth.user,
  stateSocket: state.auth.stateSocket,
});

export default connect(mapStateToProps, { logOut })(Navbar);
