import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export const NavBar = () => {
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isVisible = prevScrollPos > currentScrollPos;

      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [prevScrollPos]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav ref={navRef} className={`navbar ${visible ? 'visible' : 'hidden'} ${isOpen ? 'open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>Travel Smart</Link>
        <button className="navbar-toggle" onClick={toggleMenu}>
          <span className="navbar-toggle-icon"></span>
        </button>
        <div className={`navbar-menu ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`navbar-item ${location.pathname === '/' ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
          <Link to="/about" className={`navbar-item ${location.pathname === '/about' ? 'active' : ''}`} onClick={closeMenu}>About</Link>
          <Link to="/trips-catalog" className={`navbar-item ${location.pathname === '/trips-catalog' ? 'active' : ''}`} onClick={closeMenu}>Trips Catalog</Link>
          <Link to="/trips-review" className={`navbar-item ${location.pathname === '/trips-review' ? 'active' : ''}`} onClick={closeMenu}>Trip Reviews</Link>
          <Link to="/contact-us" className={`navbar-item ${location.pathname === '/contact-us' ? 'active' : ''}`} onClick={closeMenu}>Contact Us</Link>
        </div>
      </div>
    </nav>
  );
};
