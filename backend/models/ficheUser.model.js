const mongoose = require("mongoose");

// est il obliger de mettre une maj a schema / OUI
const modelsFicheUserSchema = mongoose.Schema({
  userId: { type: String, required: true },

  //   imageUrl: {},
  //   ficheUser profil
  age: { type: Number, default: 0 },
  nom: { type: String, default: "" },
  prenom: { type: String, default: "" },
  photoProfilUrl: {},
  //je passe ce nom au lieu de imageUrl
});

module.exports = mongoose.model("FicheUser", modelsFicheUserSchema);
// Post
