import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.jpg";
import { FaCheckCircle, FaEye } from "react-icons/fa";

function Login() {

  const navigate = useNavigate();

  const handleLogin = (e) => {

    e.preventDefault();

    // Temporary Login
    navigate("/client-dashboard");

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
              <Link to="/login" className="active">
                Login
              </Link>
            </li>

          </ul>

        </nav>

      </header>

      {/* ================= Login Page ================= */}

      <section className="login-page">

        <div className="login-wrapper">

          {/* ================= Left Panel ================= */}

          <div className="login-left">

            <div className="navbar-logo">

              <img src={logo} alt="Logo" />

              <h2>Support Management System</h2>

            </div>

            <h1>Welcome Back!</h1>

            <p>
              Login to access your dashboard, manage support tickets,
              communicate with your team, and resolve client issues efficiently.
            </p>

            <div className="features">

              <div className="feature">
                <FaCheckCircle />
                <span>Secure Login</span>
              </div>

              <div className="feature">
                <FaCheckCircle />
                <span>Role-Based Dashboard</span>
              </div>

              <div className="feature">
                <FaCheckCircle />
                <span>Real-Time Ticket Tracking</span>
              </div>

              <div className="feature">
                <FaCheckCircle />
                <span>Fast & Professional Support</span>
              </div>

            </div>

          </div>

          {/* ================= Right Panel ================= */}

          <div className="login-right">

            <div className="login-form">

              <h2>Login Portal</h2>

              <p>
                Welcome back! Please login to access your account.
              </p>

              <form onSubmit={handleLogin}>
                                {/* ================= Email ================= */}

                <div className="input-group">

                  <label>Email Address</label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                  />

                </div>

                {/* ================= Password ================= */}

                <div className="input-group">

                  <label>Password</label>

                  <div className="password-box">

                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                    />

                    <FaEye />

                  </div>

                </div>

                {/* ================= Remember Me ================= */}

                <div className="login-options">

                  <label>

                    <input type="checkbox" />

                    Remember Me

                  </label>

                  <Link to="/forgot-password">

                    Forgot Password?

                  </Link>

                </div>

                {/* ================= Login Button ================= */}

                <button
                  type="submit"
                  className="login-btn"
                >

                  Login

                </button>

              </form>

              {/* ================= Register Link ================= */}

              <p className="register-link">

                Don't have an account?{" "}

                <Link to="/register">

                  Register

                </Link>

              </p>

            </div>

          </div>

        </div>

      </section>

    </>

  );

}

export default Login;
             