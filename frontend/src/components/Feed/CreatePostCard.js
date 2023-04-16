import Button from "../UI/Button";
import React, { useState } from "react";
import Post from "./Post";
import "../../style/create-post.css";

const CreatePostCard = (props) => {
  const [titleInput, setTitleInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [displayCreatePost, setDisplayCreatePost] = useState(false);
  const [statusCreate, setStatusCreate] = useState(false);

  const toogleExpandCollapseForm = (e) => {
    setDisplayCreatePost((displayCreatePost) => !displayCreatePost);
    console.log("toogleDisplayCreatePost ==>", displayCreatePost);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("onclickk activated");
    const url = "http://localhost:3000/api/post/";
    const formData = new FormData();
    formData.append("title", titleInput);
    formData.append("description", descriptionInput);
    formData.append("image", e.target.image.files[0]);
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          console.log("Post created");
          // le status Create est true seullemnt penddant la duree dfe reposnse.ok
          setStatusCreate(true);

          // window.location.reload(false);
        } else {
          console.log("failed to create Post");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };
  // console.log(statusCreate);
  if (statusCreate) {
    // setStatusCreate(false);
    // lorsque je cree un poste il se met a true, puis une fois la reponse envoyer le statuscreate se remet par default a false
    return <Post />;
  } else {
    return (
      <div>
        <Button onClickProps={toogleExpandCollapseForm}>
          display create post
        </Button>
        {displayCreatePost && (
          <form onSubmit={handleFormSubmit} className="create-post">
            <div>
              <label htmlFor="title">Title: </label>
              <input
                type="text"
                id="title"
                name="title"
                onChange={(e) => {
                  console.log(e);
                  return setTitleInput(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                onChange={(e) => setDescriptionInput(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="image">Image: </label>
              <input type="file" id="image" name="image" accept="*" />
            </div>
            <Button type="submit">Create Post</Button>
          </form>
        )}
      </div>
    );
  }
};

export default CreatePostCard;
