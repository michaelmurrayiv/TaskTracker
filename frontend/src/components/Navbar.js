import React from "react";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="navbar-logo">
          TaskTracker
        </a>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <a href="/" className="navbar-links">
              Profile
            </a>
          </li>
          <li className="navbar-item">
            <a href="/about" className="navbar-links">
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
