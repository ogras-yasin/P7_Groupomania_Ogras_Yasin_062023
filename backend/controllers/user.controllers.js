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
            // BENIM YAZDIGIM ONUN SILDIGI 16.03.23 discord chti dev
            //   message: "Utilisateur créé !",
            //   email: req.body.email,
            //   userId: user._id,
            //   token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
            //     expiresIn: "240h",

            // })
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
