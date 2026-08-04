import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import Features from "../../components/Features/Features";
import WhyChoose from "../../components/WhyChoose/WhyChoose";
import Workflow from "../../components/Workflow/Workflow";
import Statistics from "../../components/Statistics/Statistics";
import Testimonials from "../../components/Testimonials/Testimonials";
import Contact from "../../components/Contact/Contact";
import Footer from "../../components/Footer/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <WhyChoose />
      <Workflow />
      <Statistics />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;