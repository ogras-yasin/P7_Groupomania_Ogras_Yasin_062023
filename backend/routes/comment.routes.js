const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");

// auth
// comments CRUD
// :id
router.patch("/create-comment/:id", auth, commentCtrl.createCommentPost);
router.patch("/edit-comment/:id", auth, commentCtrl.editCommentPost);
router.patch("/delete-comment/:id", auth, commentCtrl.deleteCommentPost);
module.exports = router;
