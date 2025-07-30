import "./../../css/App.css";
import nariri_school from "./../../assets/images/nariri_school.jpg";
import { Link } from "react-router-dom";

export default function SplitScreen() {
  return (
    <div className="split-container animated-container">
      <div className="left-pane fade-in-left">
        <h1>
          Welcome To <span className="brand-name">Nawiri Students Portal</span>
        </h1>
        <p>
          Nawiri avails necessary academic and career information in realtime to increase productivity. </p>
        <div className="button-group">
          {/* <button className="primary-button">Student</button> */}
          <Link to="/signin" className="primary-button">
            Sign In
          </Link>
          {/* <button className="secondary-button">Teacher</button> */}
        </div>
        <p>
          Are you a new user? <Link to="/signup">Sign Up</Link> |{" "}
          <Link to="/reset-password">Forgot Password</Link>
        </p>
      </div>
      <div className="right-pane fade-in-right">
        <img src={nariri_school} alt="Nariri School" className="full-image" />
      </div>
    </div>
  );
}
