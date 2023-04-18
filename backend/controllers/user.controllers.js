const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      user
        .save()
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé !",
          })
        )
        .catch((error) =>
          res.status(400).json({ error: "Ce nom Utilisateur est déjà utilisé" })
        );
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: "ceci est une erreur de serveur" });
    });
};

exports.login = (req, res, next) => {
  // Chercher l'utilisateur dans la base de donées
  User.findOne({ email: req.body.email })
    .then((user) => {
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
              isAdmin: user.isAdmin,
              userId: user._id,
              token: jwt.sign({ userId: user._id }, process.env.SECRET_TOKEN, {
                expiresIn: "24h",
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
