import React from "react";
import AuthContext from "../../store/authContext";
import Button from "../UI/Button";

const DeletePostCard = (props) => {
  const { title, imageUrl, description, _id, likes } = props.item.item;
  console.log("delete props.item==>", props.item.item);
  console.log("delete props==>", props);
  const authCtx = AuthContext;

  const handleDelete = async () => {
    const url = `http://localhost:3000/api/post/${_id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      console.log("Post supprimer avec succes");
    } else {
      console.log("Erreur lors de la supression du post");
    }
  };

  return (
    <div>
      {authCtx.isAdmin === true || authCtx.userId === props.item.userId ? (
        <Button className="deleteButton" onClickProps={handleDelete}>
          Suprimer le post
        </Button>
      ) : null}
    </div>
  );
};

export default DeletePostCard;
