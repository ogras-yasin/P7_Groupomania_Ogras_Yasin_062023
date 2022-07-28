const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, //je peux modifier vraiment
  isAdmin: { type: Boolean, default: false, required: true },
  // is admin est toujours false je ne sais pas pourquoi
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User_p7", userSchema);
