const express = require("express");
const router = express.Router();
const {
  login,
  register,
  getUser,
  newPassword,
  deleteUser,
  updateNick,
} = require("../../controllers/userController");
const { isLoggedIn } = require("../../modules/authModule");

router.get("/", isLoggedIn, getUser);
router.post("/login", login);
router.post("/register", register);
router.post("/resign", isLoggedIn, deleteUser);
router.put("/password", isLoggedIn, newPassword);
router.put("/nick", isLoggedIn, updateNick);
module.exports = router;
