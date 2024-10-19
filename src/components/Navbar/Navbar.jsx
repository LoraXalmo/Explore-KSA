import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Import your custom CSS file

export default function Navbar() {
  return (
    <nav className="navbar-container">
      {/* Left section - Settings Icon */}
      <div className="navbar-left">
        <div className="dropdown">
          <button className="settings-btn">
            <i className="fas fa-cog"></i>
          </button>
          <div className="dropdown-content">
            <Link to="/profile">Profile</Link>
            <Link to="/logout">Log out</Link>
          </div>
        </div>
      </div>

      {/* Center section - Links */}
      <div className="navbar-center">
        <Link to="/destinations" className="navbar-link">Tourist Destinations</Link>
        <Link to="/itineraries" className="navbar-link">Tourist Itineraries</Link>
        <Link to="/accommodation" className="navbar-link">Accommodation</Link>
        <Link to="/transportation" className="navbar-link">Transportation</Link>
        <Link to="/reviews" className="navbar-link">Reviews of Users</Link>
      </div>

      {/* Right section - Saudi Arabia Map Icon */}
      <div className="navbar-right">
        <img src="/path/to/saudi-map-icon.png" alt="Saudi Arabia Map" className="saudi-icon" />
      </div>
    </nav>
  );
}
