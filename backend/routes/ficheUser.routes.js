const postCtrl = require("../controllers/ficheUser.controllers");
const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer.middleware");
const auth = require("../middleware/auth.middleware");

router.post("/", auth, multer, postCtrl.createFicheUser);
router.post("/:id", auth, postCtrl.updateFicheUser);
router.get("/:id", postCtrl.findSingleFicheUser);
// je pense pas que j'ai besoin de ca car chaque personne devra voir seulement son profil
// router.get("/", auth, postCtrl.findFicheUser);
router.delete("/:id", auth, postCtrl.deleteFicheUser);

module.exports = router;
