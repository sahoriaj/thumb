import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Free online image compression tool with format conversion. Compress images to exact sizes without quality loss.</p>
          <div className="social-links">
            <a href="#" title="Facebook"><FaFacebook color="#1877f2" /></a>
            <a href="#" title="Twitter"><FaTwitter color="#1da1f2" /></a>
            <a href="#" title="Instagram"><FaInstagram color="#e4405f" /></a>
            <a href="#" title="LinkedIn"><FaLinkedin color="#0077b5" /></a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Support</h3>
          <ul>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#help">Help Center</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Tools</h3>
          <ul>
            <li><a href="#compress">Image Compressor</a></li>
            <li><a href="#resize">Image Resizer</a></li>
            <li><a href="#convert">Format Converter</a></li>
            <li><a href="#optimize">Bulk Optimizer</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 ImageCompress. All rights reserved. | Made with ❤️ for better web</p>
      </div>
    </footer>
  );
};

export default Footer;
