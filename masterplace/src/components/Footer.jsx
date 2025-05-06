import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="modern-footer">
      <div className="footer-container">
        {/* Top Section - Newsletter & Quick Links */}
        <div className="footer-top">
          <div className="footer-newsletter">
            <h3>Stay Updated</h3>
            <p>Subscribe to our newsletter for the latest property listings and real estate news</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button className="subscribe-btn">
                Subscribe <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <div className="social-links">
            <a href="https://www.facebook.com/yourrealestatepage" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF/>
              </a>
              <a href="https://twitter.com/yourrealestate" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter/>
              </a>
              <a href="https://www.instagram.com/yourrealestate" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram/>
              </a>
              <a href="https://www.linkedin.com/company/your-real-estate" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn/>
              </a>
              <a href="https://www.youtube.com/c/yourrealestate" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube/>
              </a>
            </div>
          </div>

          <div className="footer-links">
            <div className="links-column">
              <h4>Company</h4>
              <ul>
              <li><a href="/">Home</a></li>
                <li><a href="/homeslist">Properties</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Services</h4>
              <ul>
                <li>Buy Property</li>
                <li>Sell Property</li>
                <li>Rent Property</li>
                <li>Property Valuation</li>
                <li>Home Loans</li>
              </ul>
            </div>

            <div className="links-column">
              <h4>Contact</h4>
              <ul className="contact-info">
              <li><FaMapMarkerAlt /> 123 Real Estate, Pune, MH 411001</li>
                <li><a href="tel:+919876543210"><FaPhoneAlt /> +91 98765 43210</a></li>
                <li><a href="mailto:info@realestate.com"><FaEnvelope /> info@realestate.com</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="footer-bottom">
          <div className="copyright">
            © {new Date().getFullYear()} RealEstate India. All rights reserved.
          </div>
         
          <div className="payment-methods">
            <i className="fab fa-cc-visa"></i>
            <i className="fab fa-cc-mastercard"></i>
            <i className="fas fa-rupee-sign"></i>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;