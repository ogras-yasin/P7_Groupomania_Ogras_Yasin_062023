import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import "../../style/PostCard.css";
import Button from "../UI/Button";
import DeletePostCard from "./DeletePostCard";
import LikePost from "./LikePost";
import UpdatePostCart from "./UpdatePostCart";
// import "../../style/post-card.css"
const PostCard = (props) => {
  const { title, imageUrl, description, _id, likes } = props.item;
  // console.log("props.item ==> ", props.item);
  // console.log("props ==> ", props);

  const authCtx = useContext(AuthContext);

  // --------------gerer les likes----------------

  return (
    <div className="post-card ">
      <h1>{title}</h1>

      <div>
        <img src={imageUrl} alt={title} className="" />
      </div>
      <p>{description}</p>

      {/* <div> */}
      {/* <div onClick={handleLike} className={"like"}>
          <LikePost likes={likes} onLike={handleLike} /> */}

      {/* prendre le resultat de 🖇 
            ajouter ds le statet  */}
      {/* inserrer le state ds le input  */}
      {/* </div> */}
      {/* </div> */}
      <LikePost item={props} />
      <DeletePostCard item={props} />

      <UpdatePostCart item={props} />
    </div>
  );
};

export default PostCard;
