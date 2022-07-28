// JE NUTILISE PAS CE  MIDLLEWARE

// const Usermodels
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

exports.deletePost = (req, res, next) => {
  // essaie
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
  const userId = decodedToken.userId;
  const isAdmin = {};

  console.log("userId " + userId);
  User.findOne({ _id: userId })
    .then((reqUser) => {
      console.log("requser ");
      console.log(reqUser.isAdmin);
      // je vais essayer de retourner ds le then suivant
      // soit je vais reussir soit il va arreter toute la fonction
      // return reqUser.isAdmin;
      isAdmin = reqUser.isAdmin;
      console.log(isAdmin);
    })
    .catch((err) => res.status(400).json({ err }));
};
