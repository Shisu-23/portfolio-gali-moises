import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AboutPage() {
  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <section className="home">
        <div className="home-content3">
          <h2>
            <span>What I Love About Coding</span>
          </h2>

          <p>
            Coding is more than just writing programs. It is a skill that helps
            me understand how technology works and how systems are built.
          </p>

          <div className="coding">
            <img src="/coding.jpg" alt="Student coding" />
          </div>
        </div>
      </section>

      <section className="home">
        <div className="home-content3">
          <h2>
            <span>My Journey with Programming</span>
          </h2>

          <ol>
            <li>Started learning basic computer concepts</li>
            <li>Explored HTML and CSS for web design</li>
            <li>Learned programming fundamentals</li>
            <li>Built small academic and personal projects</li>
          </ol>

          <div className="program">
            <img src="/program.jpg" alt="Code editor" />
          </div>
        </div>
      </section>

      <blockquote className="home">
        "Programming is not about what you know; it is about what you can figure
        out."
      </blockquote>

      <Footer />
    </>
  );
}

export default AboutPage;
