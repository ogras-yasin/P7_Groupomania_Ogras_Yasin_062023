const Post = require("../models/post.model");

exports.likePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
    .then((ThePost) => {
      //   si userId n'est pas dans le tableau et like === 1 ALORS incrementer +1 et ajouter l'userId ds le tbl usersLiked
      if (
        !ThePost.usersLiked.includes(req.body.userId) &&
        req.body.like === 1
      ) {
        Post.updateOne(
          { _id: req.params.id },
          { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
        )
          .then((getAllPost) => {
            res
              .status(200)
              .json({ msg: "like ajoutée", getAllPost: getAllPost });
          })
          .catch((error) => res.status(400).json({ error: error }));
      }

      //   si userId present dans usersLiked et like = 0  alors enlever le like et enlever l'userId dans le tbl usersLiked
      else if (
        ThePost.usersLiked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        Post.updateOne(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then((getAllPost) => {
            res
              .status(200)
              .json({ msg: "enlever le like", getAllPost: getAllPost });
          })
          .catch((error) => res.status(400).json({ error: error }));
      }

      //   si aucun ne correspond
      else {
        console.log(ThePost);
        res.status(401).json({ you: "else" });
      }
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};
