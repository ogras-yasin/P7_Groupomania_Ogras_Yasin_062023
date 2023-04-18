const mongoose = require("mongoose");

const modelsPostSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },

  // système de like disliked
  likes: { type: Number, default: 0 },

  // tableau des identifiants qui ont aimer ou pas aimer
  usersLiked: { type: [String], default: [] },
});

module.exports = mongoose.model("Post", modelsPostSchema);
