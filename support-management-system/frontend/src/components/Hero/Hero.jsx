import "./Hero.css";
import { Link } from "react-router-dom";
import heroImage from "../../assets/images/hero-support.png";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        {/* Left Side */}

        <div className="hero-text">

          <h1>
            Support <span>Management System</span>
          </h1>

          <p>
            A modern support portal that helps clients,
            administrators, project managers and consultants
            manage support requests efficiently.
          </p>

          <div className="hero-buttons">

            <Link to="/register" className="btn-primary">
              Get Started
            </Link>

            <Link to="/login" className="btn-secondary">
              Login
            </Link>

          </div>

        </div>

        {/* Right Side */}

        <div className="hero-image">

          <img
            src={heroImage}
            alt="Support Management System"
          />

        </div>

      </div>

    </section>
  );
}

export default Hero;