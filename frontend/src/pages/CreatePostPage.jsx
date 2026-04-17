// frontend/src/pages/CreatePostPage.jsx
import "../styles/createpost.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const fd = new FormData();
    fd.append("title", title);
    fd.append("body", body);

    if (image) fd.append("image", image);

    try {
      const { data } = await API.post("/posts", fd);
      navigate(`/posts/${data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to publish post");
      setIsLoading(false);
    }
  };

  return (
    <div className="create-post-page">
      <br />
      <br />
      <br />
      <br />
      <h2>Write a New Post</h2>

      {error && <p className="error-msg">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />

        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your post here..."
          rows={12}
          required
        />
        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {user?.role === "admin" && (
          <div>
            <label>Upload Cover Image (Admin only):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        )}

        <button type="submit">
          {isLoading ? "Uploading Post..." : "Publish Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
