// const User = require("../models/users");

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers.js");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
// router.get("/example", userCtrl.exampleLogic);
module.exports = router;
