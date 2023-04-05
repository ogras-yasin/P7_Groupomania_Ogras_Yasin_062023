import { useContext, useState } from "react";
import AuthContext from "../../store/authContext";
import Button from "../UI/Button";

const UpdatePostCart = (props) => {
  // console.log("props======>", props.item.item._id);
  // State
  const [toogleUpdatePost, setToogleUpdatePost] = useState(false);
  const [updateDescription, setUpdateDescription] = useState();
  const [titleInput, setTitleInput] = useState();

  const handleModification = () => {
    setToogleUpdatePost((toogleUpdatePost) => !toogleUpdatePost);
  };
  // props.item.item
  const handleUpdateFormSubmit = async (e) => {
    e.preventDefault();
    // console.log("e.target ==>", e);
    const url = `http://localhost:3000/api/post/${props.item.item._id}`;
    const formData = new FormData();
    formData.append("title", titleInput);
    formData.append("description", updateDescription);
    if (
      e.target.image &&
      e.target.image.files &&
      e.target.image.files.length > 0
    ) {
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
    } else {
      console.log("Error Post not updated");
    }
  };

  // logique pour enregistrer dans input state
  const authCtx = useContext(AuthContext);
  const handleInputDescription = (e) => {
    setUpdateDescription(e.target.value);
  };
  const handleInputTitle = (e) => {
    setTitleInput(e.target.value);
  };
  // HANDLE INPUTU DA OKUTALIM APRES C BON JE PENSE . ON DOIT SUREMENT PASSER DANS PPROS

  return (
    <div>
      <form onSubmit={handleUpdateFormSubmit}>
        {/* -------- titre ----------  */}
        {toogleUpdatePost && (
          <>
            <label htmlFor="title"></label>
            <input
              type="text"
              id="title"
              value={titleInput}
              placeholder="title"
              onChange={handleInputTitle}
            />
          </>
        )}
        <div>
          {/* ------ image --------  */}

          {toogleUpdatePost && (
            <div>
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" accept="*" />
            </div>
          )}
        </div>
        {/* ---------- description ------------  */}

        {toogleUpdatePost && (
          <>
            <label>description: </label>
            <input
              placeholder="description"
              type="text"
              id="description"
              onChange={handleInputDescription}
              value={updateDescription}
            ></input>
          </>
        )}

        {authCtx.userId === props.item.item.userId ? (
          <Button className="updateButton" onClickProps={handleModification}>
            {!toogleUpdatePost ? "Modifier le post" : "Annuler"}
          </Button>
        ) : null}

        <div>{toogleUpdatePost && <Button type="submit">Envoyer</Button>}</div>
      </form>
    </div>
  );
};

export default UpdatePostCart;
