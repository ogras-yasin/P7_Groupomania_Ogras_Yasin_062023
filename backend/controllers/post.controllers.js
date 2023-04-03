const Post = require("../models/post.model");
// const isAdmin = require("../middleware/isAdmin");

exports.createPost = (req, res, next) => {
  // 15.03.23
  // console.log(req);
  console.log(req.get("Content-Type"));
  console.log(req);
  // const { post } = req.body;
  const { title, description } = req.body;
  // res.status(200).json({ msg: post });
  // Je RECOIS UN OBJET VIDE

  // const postObject = post;
  // Express parse déjà le JSON pour vous. Dans votre middleware app.use(express.json())JSON.parse(post);
  // delete postObject._id;

  // COK ONEMLI APLLICATION/JSON ILE DEGIL SADECE FORM/DATA ILE YOLLA cunku image'da var
  const addPost = new Post({
    userId: req.auth.userId, // Le token est demonter par le middleware auth, ici on recupere userId de  auth
    title: title,
    description: description,
    // title: postObject.title,
    // description: postObject.description,

    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  // return;
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

exports.updatePost = (req, res, next) => {
  //   plustard modifier l'image aussi
  console.log("req.body");
  console.log(req.body);
  // console.log(req.file);

  // return;
  // description ok image non
  console.log("---> inside put then you do a req the res is :");
  // return;
  const postObject = req.file
    ? // si req.file existe (le client a ajouter une image) alors on recupere la chaine de caractere(req.body.sauce) et on la parse en object JSON.parse et on modifie l'image URL.
      {
        // ...JSON.parse je le parse deja dans app.js avec express.json donc pas besoin de reparser
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : // sinon on prend le corps de la requete
      { ...req.body };
  Post.updateOne(
    { _id: req.params.id },
    {
      ...postObject,
      _id: req.params.id,
    }
  )
    .then((object) => {
      console.log("object");
      console.log(object);
      console.log(req.body);

      res.status(200).json({ msg: "update" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// recuperer un Post specifique
exports.findSinglePost = (req, res, next) => {
  // original
  Post.findOne({ _id: req.params.id })
    .then((insidePromise) => {
      console.log(req.params);
      res.status(200).json({ msg: "read", insidePromise });
    })
    // .sort({ createdAt: -1 }) pour regler le fil du commentaire
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// recuperer toutes les Post
exports.findPost = (req, res, next) => {
  Post.find()
    .then((getAllPost) => {
      console.log(getAllPost);
      // res.status(200).json({ msg: "read", getAllPost });
      res.status(200).json(getAllPost);
    })
    .catch((error) => res.status(400).json({ error: error }));
};

// supprimer un post

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("object-article supriméeastalabistya");
      res.status(200).json({ msg: "poste suprimer par le user" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};
