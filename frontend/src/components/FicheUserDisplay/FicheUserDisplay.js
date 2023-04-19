//  ------------EN COURS CE NEST PAS ENCORE TOTALEMNET FONCTIONNEL
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../store/authContext";
import "../../style/ficheUserDisplay.css";
import Button from "../UI/Button";

// je ne sais pourquoi j'ai 4 rendu a chaque fois dans ma console.log()
const FicheUserDisplay = ({ data }) => {
  const [dataUpdate, setDataUpdate] = useState(data);
  const [modification, setModification] = useState(false);
  const nomInputRef = useRef();
  const prenomInputRef = useRef();
  const ageInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);

  // faire un ANTIPATERN pour ne pas etre en boucle infini stackoverflow
  useEffect(() => {
    console.log(data);
    setDataUpdate(data);
  }, [data]);

  // afficher bouton modfier/envoyer
  const modificationHandler = () => {
    setModification((modification) => !modification);
    console.log({ modification });
  };

  // gerer la modif d'image puis sauvegarde dans state
  const handleChangeImage = (event) => {
    const newPhoto = event.target.files[0];
    console.log("image==>", newPhoto);
    console.log("event==>", event);

    setSelectedImage(newPhoto);

    // const formData = new FormData();
    // formData.append("image", newPhoto);
    // console.log(formData.get("image"));

    // Pour mettre a jour le state dataUptade
    setDataUpdate({
      ...data,
      newPhoto: newPhoto,
    });
  };

  // pour surveiller les modifcations qui sont faites dans les champs
  // event ne fonctiopnne pas
  const changeHandler = (event) => {
    const enteredNom = nomInputRef.current.value;
    const enteredPrenom = prenomInputRef.current.value;
    const enteredAge = ageInputRef.current.value;

    // const newPhoto = event.target.files[0];
    // console.log(newPhoto);

    // envoyer les nouvelles donnees
    const formData = new FormData();
    // formData.append("nom", enteredNom);
    // formData.append("prenom", enteredPrenom);
    // formData.append("age", enteredAge);
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    formData.append("post", dataUpdate);
    console.log(formData.get("post"));

    const url = "localhost:3000/api/ficheUser/641af2a83635b744899eed8a";
    const fetchUploadHandler = async () => {
      try {
        const response = await fetch(url, {
          method: "post",
          headers: {
            "Content-Type": "form-data",
            Authorization: `Bearer ${authCtx.token}`,
          },
          body: formData,
        });
        if (response.ok) {
          const dataResponse = await response.json();
          console.log(response);
          console.log("dataResponse==>", dataResponse);
        } else {
          console.log("----pas ok");
          // throw new Error(dataResponse.error)
          console.log("error");
        }
      } catch (error) {
        console.log("catch update");
      }
    };

    fetchUploadHandler();
    // mettre a jour le state

    // je veux que l'image soit dans changeHandler pour envoyer ensemble avec le form-data meme je pense que tu sais mieux que moi comment faire
    setDataUpdate({
      ...data,
      nom: enteredNom,
      prenom: enteredPrenom,
      age: enteredAge,
      // newPhoto: newPhoto,
    });
  };

  return (
    <div className="user">
      <h1>Bonjour: {data.prenom} </h1>
      <p className="user-description">Vous êtes sur votre fiche utilisateur</p>
      <div>
        <img src={data.photo} alt="profil" />
      </div>
      {modification && (
        <input
          type="file"
          accept=".jpeg, .jpg, .png"
          onChange={handleChangeImage}
        ></input>
      )}
      <p className="user-description">votre nom:</p>
      {!modification && <p>{dataUpdate.nom}</p>}
      {modification && (
        <input
          type="text"
          value={dataUpdate.nom}
          onChange={changeHandler}
          ref={nomInputRef}
        ></input>
      )}
      <p className="user-description"> votre prénom:</p>
      {!modification && <p> {dataUpdate.prenom} </p>}
      {modification && (
        <input
          type="text"
          value={dataUpdate.prenom}
          onChange={changeHandler}
          ref={prenomInputRef}
        ></input>
      )}

      <p className="user-description">votre age: (en année)</p>
      <p>{data.age} </p>
      {modification && (
        <input
          type="text"
          value={dataUpdate.age}
          onChange={changeHandler}
          ref={ageInputRef}
        ></input>
      )}
      {/* <p>object id : {data._id}</p> */}
      <div>
        <Button onClickProps={modificationHandler}>
          {!modification ? "Modifier la fiche" : "Envoyer"}
        </Button>
        <Button>Supression du compte</Button>
      </div>
    </div>
  );
};

export default FicheUserDisplay;
