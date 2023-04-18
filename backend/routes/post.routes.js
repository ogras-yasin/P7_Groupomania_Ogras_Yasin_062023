const postCtrl = require("../controllers/post.controllers");
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middleware");
const auth = require("../middleware/auth.middleware");
const likeCtrl = require("../controllers/like.Ctrl");

router.post("/", auth, multer, postCtrl.createPost);
router.post("/:id", auth, multer, postCtrl.updatePost);
router.get("/:id", auth, postCtrl.findSinglePost);

router.get("/", auth, postCtrl.findPost);
router.delete("/:id", auth, postCtrl.deletePost);

// systeme de like
router.post("/:id/like", auth, likeCtrl.likePost);

module.exports = router;
