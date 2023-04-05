import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";
import "../../style/PostCard.css";
const Post = () => {
  const [dataPost, setDataPost] = useState([]);
  const AuthCtx = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/post", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${AuthCtx.token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDataPost(data.reverse());
        } else {
          throw new Error("Erreur lors de la récupération des posts");
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchPosts();
  }, [AuthCtx.token]);

  const [posts, setPosts] = useState([]);
  const handleLike = (postId, newLikes) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: newLikes } : post
      )
    );
  };

  return (
    <section className="post-card">
      <CreatePostCard setDataPost={setDataPost} dataPost={dataPost} />
      {dataPost.length > 0 ? (
        dataPost.map((item) => (
          <PostCard item={item} key={item._id} onLike={handleLike} />
        ))
      ) : (
        <p>Aucun post trouvé.</p>
      )}
    </section>
  );
};

export default Post;
