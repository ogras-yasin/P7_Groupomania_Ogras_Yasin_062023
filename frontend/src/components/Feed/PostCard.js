import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authContext";
import "../../style/PostCard.css";
import Button from "../UI/Button";
import DeletePostCard from "./DeletePostCard";
import UpdatePostCart from "./UpdatePostCart";

const PostCard = (props) => {
  const { title, imageUrl, description, _id, likes } = props.item;
  console.log("props.item ==> ", props.item);
  console.log("props ==> ", props);
  // const handleDelete = async () => {
  //   const url = `http://localhost:3000/api/post/${_id}`;
  //   const response = await fetch(url, {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("token"),
  //     },
  //   });
  //   if (response.ok) {
  //     console.log("Post supprimer avec succes");
  //   } else {
  //     console.log("Erreur lors de la supression du post");
  //   }
  // };

  const [toogleUpdatePost, setToogleUpdatePost] = useState(false);
  const [updateDescription, setUpdateDescription] = useState();
  const [titleInput, setTitleInput] = useState();

  const handleModification = () => {
    setToogleUpdatePost((toogleUpdatePost) => !toogleUpdatePost);
  };

  // ---------deplacer ca dans update
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

  // --------------gerer les likes----------------
  // . 1.consolelog lorsque je clique
  // 2. faire la fonc
  // 3. fetch envoyer le resultat ou recup la route
  const [numLikes, setNumLikes] = useState(likes);
  const handleLike = () => {
    setNumLikes(numLikes + 1);
    const url = "http://localhost:3000/api/post/6427f756886ceff809998d50/like";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },

      // lorsque je clique sur like soit tu incremente sopit tu demcremente
      // rendre le resultat like  dynamique
      // je met le like en brut comment le passer en dynamique
      body: JSON.stringify({ like: 0, userId: authCtx.userId }),
    })
      .then((response) => response.json())
      .then((data) => console.log("data=>", data))
      .catch((error) => error);
  };

  return (
    <div className="post-card">
      <form onSubmit={handleUpdateFormSubmit}>
        <h1>{title}</h1>
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
          <img src={imageUrl} alt={title} className="" />
          {toogleUpdatePost && (
            <div>
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" name="image" accept="*" />
            </div>
          )}
        </div>
        <p>{description}</p>
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

        <div>
          <div onClick={handleLike} className={"like"}>
            <i>like </i>

            <i className="fas fa-heart"> </i>
            <span> : {numLikes}</span>
            {/* prendre le resultat de 🖇 
            ajouter ds le statet  */}
            {/* inserrer le state ds le input  */}
          </div>
        </div>
        <div>{toogleUpdatePost && <Button type="submit">Envoyer</Button>}</div>
      </form>
      {/* {authCtx.isAdmin === true || authCtx.userId === props.item.userId ? (
        <Button className="deleteButton" onClickProps={handleDelete}>
          Suprimer le post
        </Button>
      ) : null} */}
      {/* DELETE CA FONCTIONNE */}
      <DeletePostCard item={props} />
      {/* -----------deplacer ca dans update */}
      {/* {authCtx.userId === props.item.userId ? ( */}
      <>
        {/* <Button className="updateButton" onClickProps={handleModification}>
            {!toogleUpdatePost ? "Modifier le post" : "Annuler"}
          </Button> */}
        <UpdatePostCart item={props} />
      </>
      {/* // ) : null} */}
    </div>
  );
};

export default PostCard;
