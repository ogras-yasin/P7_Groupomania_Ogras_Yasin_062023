const mongoose = require("mongoose");

// est il obliger de mettre une maj a schema / OUI
const modelsPostSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: {},
  //   // imageUrl: {type: File, required: true}, // error : file is not defined

  // système de like disliked
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },

  // tableau des identifiants qui ont aimer ou pas aimer
  usersLiked: { type: [String], default: [] },
  usersDisliked: { type: [String], default: [] },
});

module.exports = mongoose.model("Post", modelsPostSchema);
