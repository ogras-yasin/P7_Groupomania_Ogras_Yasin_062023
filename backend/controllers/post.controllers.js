const Post = require("../models/post.model");
const User = require("../models/users.model");
// const isAdmin = require("../middleware/isAdmin");

// creation Post seulement text

exports.createPost = (req, res, next) => {
  // 15.03.23 LORSQUE JE PARSE CA NE FONCTIONNE PAS?? il se parse automatiquement? Pourtant ds postman j'envoie les donnees en stringify!

  const { post } = req.body;
  const postObject = JSON.parse(post);
  // console.log("postObject id varmi?:", postObject);
  delete postObject._id;
  console.log(post);
  // console.log(req);
  // console.log("req.body====>", req.body);
  // return;
  const addPost = new Post({
    userId: req.auth.userId,
    title: postObject.title,
    description: postObject.description,

    imageUrl: `${req.protocol}://${req.get("host")}/images/${
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

exports.updatePost = (req, res, next) => {
  //   plustard modifier l'image aussi
  // console.log("req.body");
  // console.log(req.body);
  Post.updateOne(
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
      // console.log(getAllPost);
      res.status(200).json({ msg: "read", getAllPost });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

// supprimer un post

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("object-article suprimée");
      res.status(200).json({ msg: "poste suprimer par le user" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

// BROUILLON
// A sSUPPRIMER
// c'est pas ideale pour savoir user is admin
// const jwt = require("jsonwebtoken");

// original changer le findOne par deleteOne
// jwt decode et puis voir si ces admin ou non
// Post.findOne({ _id: req.params.id }).then(() => {
//   console.log(req.params.id);
//   res
//     .status(200)
//     .json({ msg: " votre post a été supprimer", _id: req.params.id });
// });

//   .catch(() => res.status(400).json({ error: error }));

// J'essaye de deonner une autorisation au admin polur pouvoir suprimer mais je n'arrive pas

/* exports.deletePost = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;

  // user is admin
   User.findOne({ _id: userId }).then((a) => {
    console.log(object);
    if (object.isAdmin !== false) {
      Post.deleteOne({ _id: req.body.params }).then((a) => {
        console.log("you are a moderateur");
        return res.status(200).json({ a, msg: "poste suprimer par le admin" });
      });
    }
    // user is owner of this post
    else {
      Post.deleteOne({ _id: req.params.id })
        .then(() => {
          console.log("object-article suprimée");
          res.status(200).json({ msg: "poste suprimer par le user" });
        })
        .catch((error) => res.status(400).json({ error: error }));
    }
  }); */

// exports.signup = (req, res, next) => {
//   res.json({ message: "Je suis dans la route users !" });
// };

const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res, next) => {
  console.log("you reach the route signup");
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // console.log(user);//verifier si je RENVOIE une res
      user
        .save()
        // type de message attendue { message: string } accomplie
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
          })
        )
        .catch(
          (error) =>
            res
              .status(400)
              .json({ error: "Ce nom Utilisateur est déjà utilisé" })
          // devrai-je mettre un jwt.sign, envoyer un token
        );
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "ceci est une erreur de serveur" });
    });
  // res.json({ message: "Je suis dans la route users !" });
};

exports.login = (req, res, next) => {
  // Chercher l'utilisateur dans la base de donées
  User.findOne({ email: req.body.email })
    .then((user) => {
      // console.log("user----------", user);
      // si aucun user ne correspond a la req envoye par le client
      // on recoit null
      if (!user) {
        console.log(user);
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              console.log("incorrect login : " + valid); // il me lance true
              return res
                .status(401)
                .json({ message: "mot de passe incorrect !" });
            }
            res.status(200).json({
              //  In computing and telecommunications, the PAYLOAD is the part of transmitted data that is the actual intended message. Headers and metadata are sent only to enable payload delivery
              // ce token contient l'ID de l'utilisateur en tant que payload
              // (les données encodées dans le token) ;

              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
                expiresIn: "240h",
              }),
              message: "mot de passe correct",
            });
          })
          // mot de passe incorrect
          .catch((error) => res.status(401).json({ error }));
      }
    })
    // erreur serveur
    .catch((error) => res.status(500).json({ error }));
};
