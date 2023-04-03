// const Usermodels
const jwt = require("jsonwebtoken");
// const User = require("../models/users.model");
// Récupération du TOKEN qu'il y a dans la REQUEST envoyé par le FRONT

module.exports = (req, res, next) => {
  try {
    // récuperer le token dans le [headers] [authorization]: bearer token
    // separer le bearer du token avec .split(" ")[1]
    const token = req.headers.authorization.split(" ")[1];
    // decoder le token
    jwt.verify(token, process.env.SECRET_TOKEN, (error, decodedToken) => {
      if (error) {
        req.auth = null;
        res.status(402).json({ message: "session expirée" });
      } else {
        req.auth = {
          userId: decodedToken.userId,
        };
      }
      next();
    });

    // recuperer le userdId qu'il y a a l'interieur du token
    // si il y aa un req.body.userId et si ce req.body.userId et different de auth userId
    // req.auth.userId
    // if (req.body.userId && req.body.userId !== userId) {
    //   throw "Invalid user ID";
    //   // Le token corespond bien a l'utilisateur
    // }
    // next();
  } catch (error) {
    res.status(401).json({
      error: error,
    });
    // console.log("error in try/catch see in middleware");
  }
};
