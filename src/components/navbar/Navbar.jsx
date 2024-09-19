import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export const NavBar = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${visible ? 'visible' : 'hidden'} ${isOpen ? 'open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">Travel Smart</Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </button>
        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/about" className="navbar-item">About</Link>
          <Link to="/trips-catalog" className="navbar-item">Trips Catalog</Link>
          <Link to="/trip-reviews" className="navbar-item">Trip Reviews</Link>
          <Link to="/contact-us" className="navbar-item">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};
