/* eslint-disable react/style-prop-object */
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css'; 

const Footer = () => {
  return (
    <div>
      <section className="footer">
        <footer>
            <div className="text">
                <h1>Travel Smart &copy;</h1>
            </div>
          <div className="footer-content">
            {/* About Section */}
            <div className="footer-section">
              <h3>About Us</h3>
              <p>Explore the world with us! Discover breathtaking destinations, hidden gems, and travel tips to make your adventures unforgettable.</p>
            </div>

            {/* Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/review">Travel Review</a></li>
                <li><a href="/catalog">Trip Catalog</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>

            {/* Social Media */}
            <div className="footer-section">
              <h3>Follow Us</h3>
              <p>Stay connected for the latest travel updates!</p>
              <div className="social-icons">
                <a href="https://www.facebook.com/"><FaFacebook width="90px" height="40px" /></a>
                <a href="https://www.twitter.com/"><FaTwitter width="40px" height="40px" /></a>
                <a href="https://www.instagram.com/"><FaInstagram width="40px" height="40px" /></a>
                <a href="https://www.linkedin.com/"><FaLinkedin width="40px" height="40px" /></a>
              </div>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 Travel Smart. All Rights Reserved. | <a href="...">Privacy Policy</a> | <a href="...">Terms of Service</a></p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Footer;