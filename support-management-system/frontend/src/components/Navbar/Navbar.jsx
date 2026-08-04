import "./Navbar.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";

function Navbar() {
  return (
    <header className="header">

      <div className="container">

        {/* Logo */}

        <div className="logo">

          <img src={logo} alt="SupportMS Logo" />

          <h2>
            Support<span>MS</span>
          </h2>

        </div>

        {/* Navigation */}

        <nav>

          <ul>

            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/about">About</Link>
            </li>

            <li>
              <Link to="/features">Features</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

          </ul>

        </nav>

        {/* Buttons */}

        <div className="nav-buttons">

          <Link to="/login" className="btn-login">
            Login
          </Link>

          <Link to="/register" className="btn-register">
            Register
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;