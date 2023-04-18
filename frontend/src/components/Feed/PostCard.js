import { useState } from "react";
import "../../style/post-card-children.css";
import DeletePostCard from "./DeletePostCard";
import LikePost from "./LikePost";
import UpdatePostCart from "./UpdatePostCart";

const PostCard = (props) => {
  // const { title, imageUrl, description, _id, likes } = props.item;
  const { title, imageUrl, description } = props.item;

  // Parent to child
  const [data, setData] = useState(true);
  const childToParent = (childData) => {
    setData(childData);
  };

  // console.log("data ==>", data);

  return (
    <div className="post-card-children">
      <h1 className="title">{title}</h1>

      <div>
        <img src={imageUrl} alt={title} className="" />
      </div>
      <p className="description">{description}</p>

      <LikePost item={props} />
      <div className="button-card">
        {data && <DeletePostCard item={props} />}
        <UpdatePostCart item={props} childToParent={childToParent} />
      </div>
    </div>
  );
};

export default PostCard;
