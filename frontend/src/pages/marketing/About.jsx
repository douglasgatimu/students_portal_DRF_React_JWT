import React from "react";
import { Link } from "react-router-dom";
import nawiri_about from "./../../assets/images/nawiri_about.jpg";
import "./../../css/App.css";

function About() {
  return (
    <div className="split-container">
      <div className="left-pane">
        <h1>About Nawiri</h1>
        <p>
          Nawiri is a platform that connects students with mentors to help them
          achieve their academic and career goals. Our mission is to empower
          students through mentorship and guidance.
        </p>
        <p>
          For more information, please visit our{" "}
          <Link to="/contact">Contact Us</Link> page.
        </p>
      </div>
      <div className="right-pane">
        <img src={nawiri_about} alt="Nawiri About" className="full-image" />
      </div>
    </div>
  );
}
export default About;
