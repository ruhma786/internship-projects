import "./Contact.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from "react-icons/fa";

function Contact() {
  return (
    <section className="contact">

      <div className="container">

        <div className="section-title">

          <h2>Contact Us</h2>

          <p>
            Have any questions? We'd love to hear from you.
          </p>

        </div>

        <div className="contact-wrapper">

          {/* Left Side */}

          <div className="contact-info">

            <h3>Get In Touch</h3>

            <div className="info-box">

              <FaPhoneAlt className="info-icon"/>

              <div>
                <h4>Phone</h4>
                <p>+92 300 1234567</p>
              </div>

            </div>

            <div className="info-box">

              <FaEnvelope className="info-icon"/>

              <div>
                <h4>Email</h4>
                <p>support@supportms.com</p>
              </div>

            </div>

            <div className="info-box">

              <FaMapMarkerAlt className="info-icon"/>

              <div>
                <h4>Address</h4>
                <p>COMSATS University, Vehari Campus</p>
              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="contact-form">

            <form>

              <input
                type="text"
                placeholder="Your Name"
              />

              <input
                type="email"
                placeholder="Your Email"
              />

              <input
                type="text"
                placeholder="Subject"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
              ></textarea>

              <button type="submit">
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Contact;