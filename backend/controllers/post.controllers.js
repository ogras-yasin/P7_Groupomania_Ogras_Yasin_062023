const Post = require("../models/post.model");

// creation Post
exports.createPost = (req, res, next) => {
  // const postObject = JSON.parse(req.body.post);
  const post = new Post({
    // commentary: req.body.commentary,
    ...req.body,
  });
  //   i dont know that i am doing
  console.log("post");
  console.log(post);
  //   spread operator excelent
  post
    .save()
    .then(() => {
      res
        .status(200)
        .json({ msg: "Un post doit pouvoir contenir du texte et une image" });
    })
    .catch(() => {
      res.status(400).json({ error: error });
    });
};

//   charger les modifications dans la base de données
exports.updatePost = (req, res, next) => {
  //   plustard modifier l'image aussi
  Post.updateOne({ _id: req.params.id }, { commentary: req.body.commentary })
    .then(() => {
      //   console.log(req.body.commentary);
      res.status(200).json({ msg: "update" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// recuperer un Post specifique
exports.findSinglePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(() => {
      console.log(req.params);
      res.status(200).json({ msg: "read" });
    })
    .catch((error) => {
      console.log("Allah beni affetsin");
      res.status(400).json({ error: error });
    });
};

// recuperer toutes les Post
exports.findPost = (req, res, next) => {
  Post.find()
    .then((getAllPost) => {
      //   console.log(getAllPost);
      res.status(200).json({ msg: "read", getAllPost });
    })
    .catch((error) => res.status(400).json({ error: error }));
};

// supprimer un post
exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log(req.params.id);
      res
        .status(200)
        .json({ msg: " votre post a été supprimer", _id: req.params.id });
    })

    .catch(() => res.status(400).json({ error: error }));
};
