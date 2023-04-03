import { useContext } from "react";
import AuthContext from "../../store/authContext";

const UpdatePostCart = () => {
  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    console.log("e.target ==>", e);
    const url = `http://localhost:3000/api/post/${_id}`;
    const formData = new FormData();
    formData.append("title", titleInput);
    formData.append("description", updateDescription);
    if (e.target.image.files && e.target.image.files.length > 0) {
      formData.append("image", e.target.image.files[0]);
    }
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    });
    if (response.ok) {
      console.log("Post update");
      console.log("response ==>", response);
    } else {
      console.log("Error Post not updated");
    }
  };

  const authCtx = useContext(AuthContext);
  const handleInputDescription = (e) => {
    setUpdateDescription(e.target.value);
    console.log(updateDescription);
  };
  const handleInputTitle = (e) => {
    setTitleInput(e.target.value);
    console.log(titleInput);
  };

  return (
    <div>
      <></>

      {authCtx.isAdmin === true || authCtx.userId === props.item.userId ? (
        <Button className="deleteButton" onClickProps={handleDelete}>
          Suprimer le post
        </Button>
      ) : null}
      {/* -----------deplacer ca dans update */}
      {authCtx.userId === props.item.userId ? (
        <Button className="updateButton" onClickProps={handleModification}>
          {!toogleUpdatePost ? "Modifier le post" : "Annuler"}
        </Button>
      ) : null}
    </div>
  );
};

export default UpdatePostCart;
