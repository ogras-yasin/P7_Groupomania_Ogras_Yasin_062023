const mongoose = require("mongoose");

// est il obliger de mettre une maj a schema / OUI
const modelsPostSchema = mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: {},
  //   // imageUrl: {type: File, required: true}, // error : file is not defined

  //   // système de like disliked
  likes: { type: Number, default: 0 },
  usersLiked: { type: [String], default: [] },
  comments: {
    type: [
      {
        commenterID: String,
        commenterPseudo: String,
        text: String,
        timestamp: Number,
      },
    ],
    // required: true,
  },
});

module.exports = mongoose.model("Post", modelsPostSchema);
