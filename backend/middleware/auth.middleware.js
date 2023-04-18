// const Usermodels
const jwt = require("jsonwebtoken");

// Récupération du TOKEN qu'il y a dans la REQUEST envoyé par le FRONT
module.exports = (req, res, next) => {
  try {
    // separer le bearer du token avec .split(" ")[1]
    const token = req.headers.authorization.split(" ")[1];
    // decoder le token
    jwt.verify(token, process.env.SECRET_TOKEN, (error, decodedToken) => {
      if (error) {
        req.auth = null;
        return res.status(403).json({ message: "Non autorisée" });
      }
      req.auth = {
        userId: decodedToken.userId,
      };
      next();
    });
  } catch (error) {
    res.status(500).json({
      error: "autorisation echouée",
    });
    next();
    // CE NEXT PERMET DE PASSER AU CONTROLLER SUIVANT L'ORSQUE IL Y A UNE ERRREUR  et DE NE PAS CRACHER LE SERVEUR
  }
};
