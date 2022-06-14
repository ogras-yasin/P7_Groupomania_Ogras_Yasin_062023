const postCtrl = require("../controllers/post.controllers");
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middleware");
// const upload = multer(); //buna gerek yok
const auth = require("../middleware/auth.middleware");
const likeCtrl = require("../controllers/like.Ctrl");
// rajouter l'auth auth fonctionne correctement
// multer,
router.post("/", postCtrl.createPost);
// router.post("/", auth, multer, postCtrl.createPost);

router.post("/:id", auth, postCtrl.updatePost);
router.get("/:id", auth, postCtrl.findSinglePost);

router.get("/", auth, postCtrl.findPost);
router.delete("/:id", auth, postCtrl.deletePost);

// systeme de likee
router.post("/:id/like", auth, likeCtrl.likePost);
// router.post("/like", auth, likeCtrl.dislikePost);

// router.post("/upload", upload.single("file"), uploadCtrl.uploadProfil);

module.exports = router;
