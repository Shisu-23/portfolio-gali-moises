import "../styles/admin.css";
import { useState, useEffect } from "react";
import API from "../api/axios";

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [tab, setTab] = useState("users");

  useEffect(() => {
    API.get("/admin/users").then((r) => setUsers(r.data));
    API.get("/admin/posts").then((r) => setPosts(r.data));
    API.get("/contact").then((r) => setMessages(r.data));
  }, []);

  const unreadCount = messages.filter((m) => !m.isRead).length;

  const toggleStatus = async (id) => {
    const { data } = await API.put(`/admin/users/${id}/status`);
    setUsers(users.map((u) => (u._id === id ? data.user : u)));
  };

  const removePost = async (id) => {
    await API.put(`/admin/posts/${id}/remove`);
    setPosts(
      posts.map((p) => (p._id === id ? { ...p, status: "removed" } : p)),
    );
  };

  const markAsRead = async (id) => {
    await API.put(`/contact/${id}/read`);
    setMessages(
      messages.map((m) => (m._id === id ? { ...m, isRead: true } : m)),
    );
  };

  const deleteMsg = async (id) => {
    if (!window.confirm("Delete this message?")) return;
    await API.delete(`/contact/${id}`);
    setMessages(messages.filter((m) => m._id !== id));
  };

  return (
    <div className="admin-page">
      <br />
      <br />
      <br />
      <br />
      <br />

      {/* ✅ HEADER WITH BELL ON RIGHT */}
      <div className="admin-header">
        <h2>Admin Dashboard</h2>

        <div className="notif-bell" onClick={() => setTab("messages")}>
          🔔
          {unreadCount > 0 && (
            <span className="notif-count">{unreadCount}</span>
          )}
        </div>
      </div>

      <div className="admin-tabs">
        <button
          onClick={() => setTab("users")}
          className={tab === "users" ? "active" : ""}
        >
          Members ({users.length})
        </button>

        <button
          onClick={() => setTab("posts")}
          className={tab === "posts" ? "active" : ""}
        >
          All Posts ({posts.length})
        </button>

        <button
          onClick={() => setTab("messages")}
          className={tab === "messages" ? "active" : ""}
        >
          Messages ({messages.length})
        </button>
      </div>

      {/* USERS */}
      {tab === "users" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={`status-badge ${u.status}`}>{u.status}</span>
                </td>
                <td>
                  <button
                    onClick={() => toggleStatus(u._id)}
                    className={
                      u.status === "active" ? "btn-danger" : "btn-success"
                    }
                  >
                    {u.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* POSTS */}
      {tab === "posts" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.author?.name}</td>
                <td>
                  <span className={`status-badge ${p.status}`}>{p.status}</span>
                </td>
                <td>
                  {p.status === "published" && (
                    <button
                      className="btn-danger"
                      onClick={() => removePost(p._id)}
                    >
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* MESSAGES */}
      {tab === "messages" && (
        <div className="messages-container">
          {messages.map((m) => (
            <div
              key={m._id}
              className={`message-card ${m.isRead ? "" : "unread"}`}
              onClick={() => markAsRead(m._id)}
            >
              <div className="msg-header">
                <strong>{m.name}</strong>
                <span>{m.email}</span>
              </div>

              <p>{m.message}</p>

              <div className="msg-footer">
                <small>{new Date(m.createdAt).toLocaleString()}</small>

                <button
                  className="btn-sm-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteMsg(m._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
