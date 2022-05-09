import express from "express";
const router = express.Router();
import { isLoggedIn } from "../../../modules/authModule";
import {
  getMyList,
  addMyList,
  updateProgress,
  deleteMyList,
} from "../../../controllers/bookController";

router.get("/", isLoggedIn, getMyList);
router.post("/", isLoggedIn, addMyList);
router.put("/", isLoggedIn, updateProgress);
router.delete("/", isLoggedIn, deleteMyList);

export default router;
