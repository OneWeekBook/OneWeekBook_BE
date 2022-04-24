import express from "express";
import {
  login,
  register,
  getUser,
  newPassword,
  deleteUser,
  updateNick,
} from "../../controllers/userController";
import { isLoggedIn } from "../../modules/authModule";

const router = express.Router();

router.get("/", isLoggedIn, getUser);
router.post("/login", login);
router.post("/register", register);
router.post("/resign", isLoggedIn, deleteUser);
router.put("/password", isLoggedIn, newPassword);
router.put("/nick", isLoggedIn, updateNick);

export default router;
