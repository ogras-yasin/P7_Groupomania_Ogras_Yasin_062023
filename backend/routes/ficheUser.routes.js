const postCtrl = require("../controllers/ficheUser.controllers");
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middleware");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, multer, postCtrl.createFicheUser);
router.post("/:id", auth, postCtrl.updateFicheUser);
router.get("/:id", postCtrl.findSingleFicheUser);
router.delete("/:id", auth, postCtrl.deleteFicheUser);

module.exports = router;
