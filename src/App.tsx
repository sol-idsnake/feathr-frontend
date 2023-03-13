import { useEffect, useState } from "react";
import "./App.css";

export type Post = {
  name: string;
  slug: string;
  id: string;
  content: string;
};

function App() {
  const [posts, setPosts] = useState<Post[] | []>([]);

  const fetchPosts = async () => {
    try {
      const rawPosts = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/posts/`);

      const { posts } = await rawPosts.json();

      setPosts(posts);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  });

  return (
    <div className="App">
      <h2>Recent Posts</h2>

      <ul>
        {posts &&
          posts.map((post) => {
            return (
              <li key={post.id}>
                <h3>{post.name}</h3>
                <p>{`${post.content.substring(0, 25)}...`}</p>
                <a href={post.slug}>Read more &gt;</a>
              </li>
            );
          })}
        {posts.length === 0 && <li key="empty">No posts found.</li>}
      </ul>
    </div>
  );
}

export default App;
