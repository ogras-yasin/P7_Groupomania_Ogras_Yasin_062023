const Post = require("../models/post.model");

exports.createPost = (req, res, next) => {
  console.log(req.get("Content-Type"));
  console.log(req);
  const { title, description } = req.body;

  const addPost = new Post({
    userId: req.auth.userId,
    title: title,
    description: description,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  // sauvegarde dans mongoDB
  addPost
    .save()
    .then(() => {
      res
        .status(200)
        .json({ msg: "Un post doit pouvoir contenir du texte et une image" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

//   changer les modifications dans la base de données
exports.updatePost = (req, res, next) => {
  console.log("req.body");
  console.log(req.body);
  console.log("---> inside put then you do a req the res is :");
  const postObject = req.file
    ? {
        ...req.body,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Post.updateOne(
    { _id: req.params.id },
    {
      ...postObject,
      _id: req.params.id,
    }
  )
    .then((object) => {
      console.log("object");
      console.log(object);
      console.log(req.body);

      res.status(200).json({ msg: "update" });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// recuperer un Post specifique
exports.findSinglePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then((insidePromise) => {
      console.log(req.params);
      res.status(200).json({ msg: "read", insidePromise });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
};

// recuperer toutes les Post
exports.findPost = (req, res, next) => {
  Post.find()
    .then((getAllPost) => {
      console.log(getAllPost);
      res.status(200).json(getAllPost);
    })
    .catch((error) => {
      res.status(500).json({ error: error });
    });
};

// supprimer un post
exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("object-article supriméeastalabistya");
      res.status(200).json({ msg: "poste suprimer par le user" });
    })
    .catch((error) => res.status(400).json({ error: error }));
};
