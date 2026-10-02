import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // Counter state
  const [count, setCount] = useState(0);

  // API records
  const [posts, setPosts] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Fetch posts from JSONPlaceholder
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch records");
        }

        return response.json();
      })
      .then((data) => {
        setPosts(data.slice(0, 12));
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>Day 09 - React Hooks</h1>
        <p>useState & useEffect</p>
      </header>

      <main className="container">
        {/* Counter */}
        <section className="section">
          <h2>Counter Application</h2>
          <p className="description">
            This counter is created using the useState Hook.
          </p>

          <div className="counter-card">
            <h3>{count}</h3>

            <div className="buttons">
              <button
                className="decrease"
                onClick={() => setCount(count - 1)}
              >
                − Decrease
              </button>

              <button
                className="reset"
                onClick={() => setCount(0)}
              >
                Reset
              </button>

              <button
                className="increase"
                onClick={() => setCount(count + 1)}
              >
                + Increase
              </button>
            </div>
          </div>
        </section>

        {/* API Records */}
        <section className="section">
          <h2>JSONPlaceholder Records</h2>

          <p className="description">
            Records are fetched using the useEffect Hook.
          </p>

          {loading && (
            <div className="loading">
              Loading records...
            </div>
          )}

          {error && (
            <div className="error">
              Error: {error}
            </div>
          )}

          {!loading && !error && (
            <div className="posts-grid">
              {posts.map((post) => (
                <div className="post-card" key={post.id}>
                  <span className="post-id">
                    Post #{post.id}
                  </span>

                  <h3>{post.title}</h3>

                  <p>{post.body}</p>

                  <small>
                    User ID: {post.userId}
                  </small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer>
        Day 09 React Practice
      </footer>
    </div>
  );
}

export default App;