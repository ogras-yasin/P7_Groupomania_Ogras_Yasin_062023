const mongoose = require("mongoose");

const modelsFicheUserSchema = mongoose.Schema({
  userId: { type: String, required: true },
  age: { type: Number, default: 0 },
  nom: { type: String, default: "" },
  prenom: { type: String, default: "" },
  photoProfilUrl: {},
});

module.exports = mongoose.model("FicheUser", modelsFicheUserSchema);
