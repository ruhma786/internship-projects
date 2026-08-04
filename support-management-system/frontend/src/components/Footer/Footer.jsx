import "./Footer.css";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

import logo from "../../assets/images/logo.jpg";

function Footer() {
  return (
    <footer className="footer">

      <div className="container">

        <div className="footer-grid">

          {/* Logo & About */}

          <div className="footer-column">

            <div className="footer-logo">

              <img src={logo} alt="Logo" />

              <h2>SupportMS</h2>

            </div>

            <p>
              Support Management System helps clients,
              administrators, project managers and consultants
              manage support tickets efficiently and professionally.
            </p>

          </div>

          {/* Quick Links */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <ul>

              <li><Link to="/">Home</Link></li>

              <li><Link to="/about">About</Link></li>

              <li><Link to="/features">Features</Link></li>

              <li><Link to="/contact">Contact</Link></li>

            </ul>

          </div>

          {/* Services */}

          <div className="footer-column">

            <h3>Services</h3>

            <ul>

              <li>Ticket Management</li>

              <li>Project Tracking</li>

              <li>Consultant Support</li>

              <li>Reports & Analytics</li>

            </ul>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h3>Contact</h3>

            <p><FaPhoneAlt /> +92 300 1234567</p>

            <p><FaEnvelope /> support@supportms.com</p>

            <p><FaMapMarkerAlt /> Vehari, Pakistan</p>

            <div className="social-icons">

              <a href="#"><FaFacebookF /></a>

              <a href="#"><FaLinkedinIn /></a>

              <a href="#"><FaGithub /></a>

            </div>

          </div>

        </div>

        <hr />

        <div className="copyright">

          <p>
            © 2026 Support Management System. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;