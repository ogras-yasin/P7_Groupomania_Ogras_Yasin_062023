// --------------gerer les likes----------------

import "../../style/like.css";
import React, { useContext, useState } from "react";

import AuthContext from "../../store/authContext";
const LikePost = (props) => {
  const { item } = props.item;
  const authCtx = useContext(AuthContext);
  const [numLikes, setNumLikes] = useState(item.likes);

  const handleLike = async () => {
    const url = `http://localhost:3000/api/post/${item._id}/like`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ like: 1, userId: authCtx.userId }),
      });
      const dataResponse = await response.json();
      if (response.ok) {
        const data = await dataResponse.getAllPost;
        console.log("Response is ok", data);
        setNumLikes(numLikes + 1);
      } else {
        console.log("like non executer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ----------------------
  const handleRemoveLike = async () => {
    const url = `http://localhost:3000/api/post/${item._id}/like`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ like: 0, userId: authCtx.userId }),
      });
      const dataResponse = await response.json();
      if (response.ok) {
        console.log("Response is ok");
        console.log(dataResponse);
        setNumLikes(numLikes - 1);
      } else {
        console.log("like non executer");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <i>like </i>
      <span>:{numLikes}</span>

      <div>
        <i
          onClick={handleLike}
          className="cssLike fa-solid fa-thumbs-up fa-2xl"
        ></i>

        <i
          onClick={handleRemoveLike}
          className="cssLike fa-solid fa-thumbs-down fa-2xl"
        ></i>
      </div>
    </div>
  );
};
// };
export default LikePost;
