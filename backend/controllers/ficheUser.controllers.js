// ----- en cours ------
// --- Ce n'est pas encore tout a fait operationnel ----

const FicheUser = require("../models/ficheUser.model");

exports.createFicheUser = (req, res, next) => {
  const { post } = req.body;
  const postObject = JSON.parse(post);
  delete postObject._id;

  console.log("req.body====>", req.body);
  const addPost = new FicheUser({
    userId: req.auth.userId,
    // Le token est demonter par le middleware auth, ici on recupere userId de  auth, donc tres securisée
    nom: postObject.nom,
    age: postObject.age,
    prenom: postObject.prenom,
    photoProfilUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  addPost
    // sauvegarde dans mongoDB
    .save()
    .then(() => {
      res
        .status(200)
        .json({ msg: "Un post doit pouvoir contenir du texte et une image" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//   changer les modifications dans la base de données

exports.updateFicheUser = (req, res, next) => {
  const postFicheUser = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };

  FicheUser.updateOne(
    { userId: req.params.id },
    {
      ...postFicheUser,
      userId: req.params.id,
    }
  )
    .then((object) => {
      console.log("object");
      console.log(object);

      res.status(200).json({ msg: "update" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// récupérer un profil spécifique
exports.findSingleFicheUser = (req, res, next) => {
  FicheUser.findOne({ userId: req.params.id })

    .then((ficheUser) => {
      if (!ficheUser) {
        throw new Error("ficheUser not found");
      }
      res.status(200).json({ msg: "ficheUser found", ficheUser });
    })
    .catch((error) => {
      res.status(404).json({ msg: "ficheUser not found", error });
    });
};

// supprimer un post

exports.deleteFicheUser = (req, res, next) => {
  FicheUser.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("object-article suprimée");
      res.status(200).json({ msg: "poste suprimer par le user" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};
