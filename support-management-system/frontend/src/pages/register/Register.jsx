import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import {
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";

function Register() {

  const navigate = useNavigate();

  const handleRegister = (e) => {
  e.preventDefault();

  console.log("Register Clicked");

  navigate("/login");
};

  return (
    <>

      {/* ================= Navbar ================= */}

      <header className="navbar">

        <div className="navbar-logo">

          <img src={logo} alt="Logo" />

          <h2>Support Management System</h2>

        </div>

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

            <li>
              <Link to="/register" className="active">
                Register
              </Link>
            </li>

          </ul>

        </nav>

      </header>

      {/* ================= Register Page ================= */}

      <section className="register-page">

        <div className="register-wrapper">

          {/* ================= Left Panel ================= */}

          <div className="register-left">

            <div className="navbar-logo">

              <img src={logo} alt="Logo" />

              <h2>Support Management System</h2>

            </div>

            <h1>Create Your Account</h1>

            <p>

              Join our Support Management System to submit support requests,
              track ticket progress and communicate with our support team.

            </p>

            <div className="features">

              <div className="feature">

                <FaCheckCircle />

                <span>Easy Registration</span>

              </div>

              <div className="feature">

                <FaCheckCircle />

                <span>Track Support Tickets</span>

              </div>

              <div className="feature">

                <FaCheckCircle />

                <span>Secure User Account</span>

              </div>

              <div className="feature">

                <FaCheckCircle />

                <span>Real-Time Communication</span>

              </div>

            </div>

          </div>

          {/* ================= Right Panel ================= */}

          <div className="register-right">

            <div className="register-form">

              <h2>Create Your Account</h2>

              <p>

                Fill in your information to create a new account.

              </p>

              <form onSubmit={handleRegister}>
                                {/* Full Name */}

                <div className="input-group">

                  <label>Full Name</label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />

                </div>

                {/* Email */}

                <div className="input-group">

                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  />

                </div>

                {/* Phone */}

                <div className="input-group">

                  <label>Phone Number</label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    required
                  />

                </div>

                {/* Password */}

                <div className="input-group">

                  <label>Password</label>

                  <div className="password-box">

                    <input
                      type="password"
                      placeholder="Enter password"
                      required
                    />

                    <FaEye />

                  </div>

                </div>

                {/* Confirm Password */}

                <div className="input-group">

                  <label>Confirm Password</label>

                  <div className="password-box">

                    <input
                      type="password"
                      placeholder="Confirm password"
                      required
                    />

                    <FaEye />

                  </div>

                </div>

                {/* Terms & Conditions */}

                <div className="terms">

                  <label>

                    <input
                      type="checkbox"
                      required
                    />

                    I agree to the Terms & Conditions

                  </label>

                </div>

                {/* Register Button */}

                <button
  type="submit"
  className="register-btn"
  onClick={() => console.log("Button Pressed")}
>
  Create Account
</button>

                
              </form>
                          

              {/* ================= Login Link ================= */}

              <p className="login-link">

                Already have an account?{" "}

                <Link to="/login">

                  Login

                </Link>

              </p>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}

export default Register;