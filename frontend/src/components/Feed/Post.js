import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import CreatePostCard from "./CreatePostCard";
import PostCard from "./PostCard";
import "../../style/Post-card-parent.css";
const Post = () => {
  const [dataPost, setDataPost] = useState([]);
  const AuthCtx = useContext(AuthContext);

  // recuperation de tous les posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/post", {
          method: "GET",
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

  return (
    <section className="post-card-all">
      <CreatePostCard />
      {dataPost.length > 0 ? (
        dataPost.map((item) => <PostCard item={item} key={item._id} />)
      ) : (
        <p>Aucun post trouvé.</p>
      )}
    </section>
  );
};

export default Post;
