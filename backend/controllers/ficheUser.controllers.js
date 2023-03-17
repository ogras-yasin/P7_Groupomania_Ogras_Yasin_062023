const FicheUser = require("../models/ficheUser.model");

exports.createFicheUser = (req, res, next) => {
  const { post } = req.body;
  const postObject = JSON.parse(post);
  delete postObject._id;

  console.log("req.body====>", req.body);
  // return;
  // COK ONEMLI APLLICATION/JSON ILE DEGIL SADECE FORM/DATA ILE YOLLA cunku image'da var
  const addPost = new FicheUser({
    userId: req.auth.userId, // Le token est demonter par le middleware auth, ici on recupere userId de  auth

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
  //   plustard modifier l'image aussi
  // console.log("req.body");
  // console.log(req.body);
  FicheUser.updateOne(
    { _id: req.params.id },
    {
      ...req.body,
      _id: req.params.id,
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

/* // recuperer un Profil specifique
exports.findSingleFicheUser = (req, res, next) => {
  // original
  FicheUser.findOne({ _id: req.params.id })
    .then((insidePromise) => {
      console.log(req.params);
      res.status(200).json({ msg: "fiche user recu", insidePromise });
    })
    // .sort({ createdAt: -1 }) pour regler le fil du commentaire
    .catch((error) => {
      res.status(400).json({ error: error });
    });
}; */
// récupérer un profil spécifique
exports.findSingleFicheUser = (req, res, next) => {
  console.log("req.params.id==>", req.params.id);
  FicheUser.findById(req.params.id)
    // FicheUser.findOne({ _id: req.params.id })

    .then((ficheUser) => {
      if (!ficheUser) {
        throw new Error("ficheUser not found");
      }
      console.log("ficheUser==>", ficheUser);
      res.status(200).json({ msg: "ficheUser found", ficheUser });
    })
    .catch((error) => {
      res.status(404).json({ msg: "ficheUser not found", error });
    });
};

// recuperer toutes les Post
exports.findFicheUser = (req, res, next) => {
  console.log(req);
  FicheUser.find()
    .then((getAllPost) => {
      // console.log(getAllPost);
      res.status(200).json({ msg: "read", getAllPost });
    })
    .catch((error) => res.status(400).json({ error: error }));
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
