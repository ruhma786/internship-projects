import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  return (
    <section className="testimonials">

      <div className="container">

        <div className="section-title">

          <h2>What Our Clients Say</h2>

          <p>
            Our clients trust us for fast, reliable and professional support services.
          </p>

        </div>

        <div className="testimonial-grid">

          <div className="testimonial-card">

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>
              "Excellent support system! My issue was resolved quickly and the consultant guided me throughout the process."
            </p>

            <h3>Ali Khan</h3>

            <span>Client</span>

          </div>

          <div className="testimonial-card">

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>
              "The ticket tracking feature is amazing. I could easily monitor every update without contacting support repeatedly."
            </p>

            <h3>Sara Ahmed</h3>

            <span>Business Owner</span>

          </div>

          <div className="testimonial-card">

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>

            <p>
              "Professional dashboard, easy interface and excellent communication between client and consultant."
            </p>

            <h3>Hassan Raza</h3>

            <span>Project Manager</span>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Testimonials;