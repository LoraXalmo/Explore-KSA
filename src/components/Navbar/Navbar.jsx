import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // إضافة useNavigate
import './Navbar.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // استخدام useNavigate



  const getLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    const dropdown = document.getElementById('settingsDropdown');
    const navbar = document.querySelector('.navbar');

    // Check if the click was outside the dropdown and the navbar
    if (dropdown && !dropdown.contains(event.target) && !navbar.contains(event.target)) {
      setDropdownOpen(false);
    }

    // Only close the menu if the click is outside of the navbar
    if (!navbar.contains(event.target) && menuOpen) {
      setMenuOpen(false);
    }
  };

  // الدالة التي تتعامل مع Logout
  const handleLogout = () => {
    localStorage.removeItem('token'); // حذف الـ token من localStorage
    navigate('/'); // إعادة التوجيه إلى الصفحة الرئيسية
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/HomePage">Explore KSA</Link>
        <button className="navbar-toggler bg-success" type="button" onClick={toggleMenu} aria-expanded={menuOpen}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          <ul className="navbar-nav py-2 mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`${getLinkClass("/HomePage")} text-light`} to="/HomePage">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/Tourist-Destinations")} text-light`} to="/Tourist-Destinations">Tourist Destinations</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/Tourist-Itineraries")} text-light`} to="/Tourist-Itineraries">Tourist Itineraries</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/Accommodation")} text-light`} to="/Accommodation">Accommodation</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/Transportation")} text-light`} to="/Transportation">Transportation</Link>
            </li>
            <li className="nav-item">
              <Link className={`${getLinkClass("/Reviews-of-Users")} text-light`} to="/Reviews-of-Users">Reviews of Users</Link>
            </li>
            
          </ul>
          
         

          <div className="dropdown pt-1">
            <button style={{borderRadius:"50px"}} onClick={toggleDropdown} className="btn btn-success dropdown-toggle" id="settingsDropdown" aria-expanded={dropdownOpen}>
              <i className="fas fa-cog"></i>
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu" aria-labelledby="settingsDropdown">
                <li><Link className="dropdown-item" to="/profile">Profile Page</Link></li>
                <li><button className="dropdown-item" onClick={handleLogout}>Log Out</button></li> {/* تعديل هنا */}
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
