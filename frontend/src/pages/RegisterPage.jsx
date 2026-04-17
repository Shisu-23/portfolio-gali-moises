import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RegisterPage = () => {
  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // ✅ added
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const navigate = useNavigate();

  // Popup state
  const [popupVisible, setPopupVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      alert("Please fill out all fields.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    if (!terms) {
      alert("You must agree to the terms.");
      return;
    }

    try {
      const { data } = await API.post("/auth/register", {
        name: username, // backend expects "name"
        email,
        password,
      });

      // ✅ save for navbar/auth
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ show popup
      setPopupVisible(true);
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  const closePopup = () => {
    setPopupVisible(false);

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setTerms(false);

    navigate("/home"); // redirect after register
  };

  return (
    <div>
      {/* SUCCESS POPUP */}
      {popupVisible && (
        <div id="successPopup" className="popup">
          <div className="popup-content">
            <h2>🎉 Congrats!</h2>
            <p>You are already registered</p>
            <button id="closePopup" className="btn-1" onClick={closePopup}>
              OK
            </button>
          </div>
        </div>
      )}

      <Navbar />

      <section className="home register-page">
        <section className="register-form">
          <h2 className="contact">
            <span>Regi</span>ster
          </h2>

          <form id="registerForm" onSubmit={handleSubmit}>
            <div className="input-box2">
              {/* UPDATED FIELDS */}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  checked={terms}
                  onChange={(e) => setTerms(e.target.checked)}
                />
                I agree to the terms
              </label>
            </div>

            <input type="submit" value="Submit" className="btn-1" />
          </form>
        </section>
      </section>
    </div>
  );
};

export default RegisterPage;
