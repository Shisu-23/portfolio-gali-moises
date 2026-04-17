import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.social}>
        <a href="#">
          <i className="bx bxl-facebook-circle"></i>
        </a>
        <a href="#">
          <i className="bx bxl-instagram"></i>
        </a>
        <a href="#">
          <i className="bx bxl-linkedin"></i>
        </a>
        <a href="#">
          <i className="bx bxl-google"></i>
        </a>
      </div>

      <ul className={styles.list}>
        <li>
          <a href="#">FAQ</a>
        </li>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/about">About Me</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>

      <p>© 2026 Moises | All Rights Reserved</p>
    </footer>
  );
}

export default Footer;
