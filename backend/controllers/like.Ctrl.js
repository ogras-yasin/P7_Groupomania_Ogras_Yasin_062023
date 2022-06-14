const Post = require("../models/post.model");

exports.likePost = (req, res) => {
  // you can only like once per user

  // first like a post
  // id of the post log the Post to see the object
  Post.findOne({ _id: req.params.id })
    .then((ThePost) => {
      //   si userId pas dans le tableau et like 1 ALORS incrementer +1
      //   puis ajouTER PUIS LIKE =1
      console.log("req.body");

      //   incrementation de like
      console.log(req.body);
      if (
        !ThePost.usersLiked.includes(req.body.userId) &&
        req.body.like === 1
      ) {
        console.log("userId non trouve ds le usersLiked");
        console.log(Post);
        console.log(ThePost);

        Post.updateOne(
          { _id: req.params.id },
          { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
        )
          .then(() => {
            console.log("i am inside then");
            res.status(401).json({ you: "did it" });
          })
          .catch((error) => res.status(400).json({ error: error }));
      }
      //   si userId present dans usersLiked et like -1 alors enlever le like
      else if (
        ThePost.usersLiked.includes(req.body.userId) &&
        req.body.like === 0
      ) {
        console.log("enlever le like");
        Post.updateOne(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => {
            res.status(201).json({ msg: "enlever le like" });
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

// exports.dislikePost = (req, res) => {
//   res.status(401).json({ you: "did it" });
// };
