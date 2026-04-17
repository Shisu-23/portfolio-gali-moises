import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState, useEffect } from "react";
import API from "../api/axios";

const ContactPage = () => {
  // Slider state
  const slidesData = ["pic1.jpg", "pic2.jpg", "pic3.jpg"];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Contact form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);

  // Slider effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert("Please fill out all fields.");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email.");
      return;
    }

    try {
      await API.post("/contact", {
        name,
        email,
        message,
      });

      setPopupVisible(true);
    } catch (err) {
      alert("Failed to send message");
    }
  };
  // Close popup
  const closePopup = () => {
    setPopupVisible(false);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div>
      {/* CONTACT SUCCESS POPUP */}
      {popupVisible && (
        <div id="contactPopup" className="popup">
          <div className="popup-content">
            <h2>✅ Message Sent!</h2>
            <p>Thank you for contacting me 😊</p>
            <button
              id="closeContactPopup"
              className="btn-1"
              onClick={closePopup}
            >
              OK
            </button>
          </div>
        </div>
      )}

      <Navbar />

      <section className="home">
        {/* Slider */}
        <div className="slider-container">
          {slidesData.map((src, i) => (
            <img
              key={i}
              src={src}
              className={`slide ${i === currentSlide ? "active" : ""}`}
              alt={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Contact Form */}
        <section className="contact-form">
          <h2 className="contact">
            Contact <span>Me</span>
          </h2>

          <form id="contactForm" onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <textarea
              cols="30"
              rows="10"
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            ></textarea>

            <input type="submit" value="Submit" className="btn-1" />
          </form>
        </section>
      </section>

      {/* Resources Table */}
      <section className="home">
        <table border="1" align="center">
          <thead>
            <tr>
              <th>Resource Name</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td align="center">MDN Web Docs</td>
              <td align="center">
                Official documentation for web technologies
              </td>
            </tr>
            <tr>
              <td align="center">W3Schools</td>
              <td align="center">Beginner-friendly tutorials</td>
            </tr>
            <tr>
              <td align="center">freeCodeCamp</td>
              <td align="center">Hands-on coding practice</td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Location */}
      <section className="home">
        <div className="home-content4">
          <h2>Location</h2>
          <div className="contact-nec">
            <img src="nec.png" alt="Map placeholder" />
          </div>
        </div>
      </section>

      {/* External Links */}
      <section className="home">
        <div className="home-content4">
          <h2>
            External<span>Link</span>
          </h2>
          <a
            href="https://developer.mozilla.org"
            target="_blank"
            rel="noreferrer"
          >
            MDN Web Docs
          </a>
          <br />
          <a href="https://www.w3schools.com" target="_blank" rel="noreferrer">
            W3Schools
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
