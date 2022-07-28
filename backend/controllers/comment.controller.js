// const { findByIdAndUpdate } = require("../models/post.model");
const Post = require("../models/post.model");

// commenter un post
module.exports.createCommentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterID: req.body.commenterId,
            // c
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    ).clone();

    // .save()
  } catch (err) {
    return res.status(400).send(err);
  }
};

// modifier un post
module.exports.editCommentPost = (req, res) => {
  try {
    // essaye avec findone id: req...
    return Post.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) => {
        return comment._id.equals(req.body.commentId);
      });
      console.log("theComment");
      console.log(theComment);

      if (!theComment) {
        return res.status(400).send("Comment not found");
      }
      theComment.text = req.body.text;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
};

// Query veux dire le odcument qu'on recherche right ?!
// le doc
// A.findByIdAndUpdate(id, update, options, callback) // executes
// { new: true }, option na koyuyoruz why

// supprimer un post
module.exports.deleteCommentPost = (req, res) => {
  try {
    return Post.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
