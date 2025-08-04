import React from 'react';
import { Link } from 'react-router-dom';
import { isLoggedIn, logout } from '../utils/auth';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">Lets Blog</Link>
      <div className="ms-auto">
        {isLoggedIn() ? (
          <button className="btn btn-outline-light" onClick={logout}>
            Logout
          </button>
        ) : (
          <>
            <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
            <Link className="btn btn-light" to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
