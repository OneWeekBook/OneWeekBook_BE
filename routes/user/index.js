const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUser,
  newPassword,
} = require("../../controllers/userController");
const { isLoggedIn } = require("../../modules/authModule");

router.post("/login", login);
router.post("/register", register);
router.get("/", isLoggedIn, getUser);
router.put("/password", newPassword);

module.exports = router;
