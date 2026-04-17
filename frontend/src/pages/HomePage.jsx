import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likeCounts, setLikeCounts] = useState({});
  const navigate = useNavigate();

  // ✅ check if logged in
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    API.get("/posts")
      .then((res) => {
        console.log("POSTS:", res.data); // debug (pwede mo alisin later)
        setPosts(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  // ✅ require login function
  const requireLogin = () => {
    alert("Please login or register first.");
    navigate("/login");
  };

  return (
    <>
      <Navbar />

      {/* ORIGINAL DESIGN (DI GINALAW) */}
      <section className="home">
        <div className="home-content">
          <h3>Hi</h3>
          <h1>
            Welcome to my <span>Coding Journey</span>
          </h1>

          <p>
            This website showcases my passion for coding, Web Development, and
            my journey as a BSCS Student.
          </p>
        </div>

        <div className="img-box">
          <img src="/brave.jpg" alt="profile" />
        </div>
      </section>

      {/* POSTS SECTION */}
      <section className="posts-section">
        <h2>Latest Posts</h2>

        {loading && <p>Loading posts...</p>}

        {!loading && posts.length === 0 && (
          <p>No posts yet. Be the first to write one!</p>
        )}

        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post._id} className="post-card">
              {post.image && <img src={`${post.image}`} alt={post.title} />}

              <h3>
                <Link to={`/posts/${post._id}`}>{post.title}</Link>
              </h3>

              <p>{post.body.substring(0, 120)}...</p>

              <small>
                By {post.author?.name} ·{" "}
                {new Date(post.createdAt).toLocaleDateString()}
              </small>

              {/* ACTION BUTTONS */}
              <div className="post-actions">
                {/* LIKE */}
                <button
                  className="like-btn"
                  onClick={() => {
                    if (!user) return requireLogin();

                    setLikeCounts((prev) => ({
                      ...prev,
                      [post._id]: (prev[post._id] || 0) + 1,
                    }));
                  }}
                >
                  ❤️ {likeCounts[post._id] || 0}
                </button>

                {/* COMMENT */}
                <button
                  onClick={
                    user ? () => navigate(`/posts/${post._id}`) : requireLogin
                  }
                >
                  💬 Comment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CREATE POST BUTTON */}
        <div style={{ marginTop: "20px" }}>
          <button
            className="btn-1"
            onClick={user ? () => navigate("/create-post") : requireLogin}
          >
            Create Post
          </button>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default HomePage;
