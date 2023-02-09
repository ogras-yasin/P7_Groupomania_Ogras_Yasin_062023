const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controller");
const auth = require("../middleware/auth.middleware");

// auth
// comments CRUD
// :id
// J'utilise le verbe PATCH pour creer des commentaire
// ON me demande pas de faire un commentaire mais je vais quand meme le faire

// Ne fait pas le COMMENTAIRE fait le strict minimum
router.patch("/create-comment/:id", auth, commentCtrl.createCommentPost);
router.patch("/edit-comment/:id", auth, commentCtrl.editCommentPost);
router.patch("/delete-comment/:id", auth, commentCtrl.deleteCommentPost);
module.exports = router;
