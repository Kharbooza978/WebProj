import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Styles/SignUp.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "Guest", // Default role
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/register`,
        formData
      );
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="signup-container">
      {/* Left-side image */}
      <div className="signup-image">
        <img src="./SignUp.jpeg" alt="SignUp Illustration" />
      </div>

      {/* Right-side form */}
      <div className="signup-form-container">
        <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="signup-input"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="signup-input"
            required
          />
          <label className="signup-role-label">
            <span>Select Role:</span>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="signup-select"
            >
              <option value="Guest">Guest</option>
              <option value="Host">Host</option>
            </select>
          </label>
          <button type="submit" className="signup-button">
            Sign Up
          </button>
          <p className="signup-message">{message}</p>
          <Link to="/signin" className="signin-link">
            Already have an account? Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
