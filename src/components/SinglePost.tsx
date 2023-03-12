import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Post } from "../App";

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post>();

  const fetchPost = async (slug: string) => {
    try {
      const rawPost = await fetch(`${process.env.REACT_APP_SERVER_ENDPOINT}/api/posts/${slug}`);

      const post = await rawPost.json();

      setPost(post[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (slug && !post) {
      fetchPost(slug);
    }
  });

  return (
    <article className="App">
      {post && (
        <>
          <h1>{post?.name}</h1>
          <p>{post.content}</p>
        </>
      )}
    </article>
  );
};

export default SinglePost;
