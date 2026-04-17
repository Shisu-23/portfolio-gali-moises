import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/splashpage.css";

function SplashPage() {
  const [dots, setDots] = useState(".");
  const [fade, setFade] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let dotCount = 1;

    const dotInterval = setInterval(() => {
      dotCount = dotCount === 3 ? 1 : dotCount + 1;
      setDots(".".repeat(dotCount));
    }, 500);

    setTimeout(() => {
      clearInterval(dotInterval);
      setFade(true);

      setTimeout(() => {
        navigate("/home"); // ✅ proper redirect
      }, 500);
    }, 3000);

    return () => clearInterval(dotInterval);
  }, [navigate]);

  return (
    <div className="body">
      <div className={`loader-container ${fade ? "fade-out" : ""}`}>
        <br />
        <br />
        <br />
        <br />
        <img className="logo" src="/brave.jpg" alt="logo" />
        <h1>Coding Journey</h1>

        <div className="spinner"></div>

        <div className="loading-text">
          Loading<span className="dots">{dots}</span>
        </div>
      </div>
    </div>
  );
}

export default SplashPage;
