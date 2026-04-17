import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, logout } = useAuth(); // 🔥 important

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", darkMode ? "light" : "dark");
    setDarkMode(!darkMode);
  };

  return (
    <header className={styles.header}>
      <img src="/logo.png" width="50" height="50" alt="logo" />

      <Link to="/" className={styles.logo}>
        <span>Moi</span>ses
      </Link>

      <nav className={styles.navbar}>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {/* NOT LOGGED IN */}
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {/* USER */}
        {user && user.role !== "admin" && (
          <>
            <Link to="/profile">Profile</Link>
            <Link to="/create-post">Create</Link>
            <span
              onClick={logout}
              style={{ cursor: "pointer", color: "white", marginLeft: "20px" }}
            >
              Logout
            </span>
          </>
        )}

        {/* ADMIN */}
        {user && user.role === "admin" && (
          <>
            <Link to="/admin">Admin</Link>
            <Link to="/profile">Profile</Link>
            <span
              onClick={logout}
              style={{ cursor: "pointer", color: "white", marginLeft: "20px" }}
            >
              Logout
            </span>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
