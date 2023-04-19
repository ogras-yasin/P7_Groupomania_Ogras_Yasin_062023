import AuthContext from "../../store/authContext";
import Button from "../UI/Button";
import "../../style/delete-post.css";
import { useContext } from "react";

const DeletePostCard = (props) => {
  const { _id, userId } = props.item.item;
  const authCtx = useContext(AuthContext);
  const handleDelete = async (tag) => {
    const url = `http://localhost:3000/api/post/${_id}`;

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    if (response.ok) {
      console.log("Post supprimer avec succes");
      console.log("tag ==>", tag);
      // suprime le post en choisisant tout ce qu'il y a à l'interieur de la classe post-card-children
      tag.target.closest(".post-card-children").remove();
    } else {
      console.log("Erreur lors de la supression du post");
    }
  };

  return (
    <div className="user2">
      {authCtx.isAdmin === true || authCtx.userId === userId ? (
        <Button className="deleteButton" onClickProps={handleDelete}>
          Suprimer le post
        </Button>
      ) : null}
    </div>
  );
};
// };
export default DeletePostCard;
