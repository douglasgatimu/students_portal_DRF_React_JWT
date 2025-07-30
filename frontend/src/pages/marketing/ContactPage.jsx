import nawiri_contact from "./../../assets/images/nawiri_contact.jpg";
import React, { useState, useEffect } from "react";
import "./../../css/App.css";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Contact Us";
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setFormData({ name: "", number: "", message: "" });

    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="split-container">
      <div className="left-pane">
        <h1>Contact Us</h1>
        <p>If you have any enquiries, please contact us here.</p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <br />
          <input
            type="tel"
            name="number"
            placeholder="Your phone number"
            value={formData.number}
            onChange={handleChange}
            required
          />
          <br />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your message"
            rows="5"
            cols="30"
            required
          />
          <br />
          <button type="submit" className="primary-button">
            Send Message
          </button>
        </form>

        {success && (
          <p className="success-message">Your message has been sent!</p>
        )}
      </div>
      <div className="right-pane">
        <img src={nawiri_contact} alt="Nariri School" className="full-image" />
      </div>
    </div>
  );
}

export default ContactPage;
