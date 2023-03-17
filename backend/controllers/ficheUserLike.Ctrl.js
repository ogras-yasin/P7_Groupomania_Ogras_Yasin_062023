// Bune gerek oldugunu sanmiyorum
// Enfaite tu me sert a rien
const Post = require("../models/post.model");

exports.likeFicheUser = (req, res) => {
  // trouver l'id de l'object puis manipuler les l'object(likes,usersLiked,...)
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
          .then(() => {
            res.status(401).json({ msg: "like ajoutée" });
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
          .then(() => {
            res.status(201).json({ msg: "enlever le like" });
          })
          .catch((error) => res.status(400).json({ error: error }));
      }

      // si userId n'est pas dans le tableau et like = -1 ALORS incrementer +1 et ajouter l'userId ds le tbl usersDisliked
      else if (
        !ThePost.usersDisliked.includes(req.body.userId) &&
        req.body.like === -1
      ) {
        Post.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
        )
          .then(() => {
            res.status(201).json({ msg: "dislike +1 ajoutee" });
          })
          .catch((error) => res.status(401).json({ error: error }));
      }

      // si userId est dans le tableau et like = 0 ALORS enlever le dislike et enlever l'userId dans le tbl usersDisliked
      else if (
        ThePost.usersDisliked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        Post.updateOne(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() => {
            res.status(201).json({ msg: " dislike enlever" });
          })
          .catch((error) => res.status(401).json({ error: error }));
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
