const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUser,
} = require("../../controllers/userController");
const { isLoggedIn } = require("../../modules/authModule");

router.post("/login", login);
router.post("/register", register);
router.get("/", isLoggedIn, getUser);

module.exports = router;
