// import React, { useContext } from "react";
// import AuthContext from "../../store/authContext";

import "../../style/post-card-children.css";
import DeletePostCard from "./DeletePostCard";
import LikePost from "./LikePost";
import UpdatePostCart from "./UpdatePostCart";

const PostCard = (props) => {
  // const { title, imageUrl, description, _id, likes } = props.item;
  const { title, imageUrl, description } = props.item;

  // const authCtx = useContext(AuthContext);

  // --------------gerer les likes----------------

  return (
    <div className="post-card-children">
      <h1 className="title">{title}</h1>

      <div>
        <img src={imageUrl} alt={title} className="" />
      </div>
      <p className="description">{description}</p>

      <LikePost item={props} />
      <div className="button-card">
        <DeletePostCard item={props} />
        <UpdatePostCart item={props} />
      </div>
    </div>
  );
};

export default PostCard;
