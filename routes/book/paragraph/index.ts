import express from "express";
import { isLoggedIn } from "../../../modules/authModule";
import {
  getParagraphs,
  addParagraph,
  deleteParagraph,
} from "../../../controllers/bookController";

const router = express.Router();

router.get("/", isLoggedIn, getParagraphs);
router.post("/", isLoggedIn, addParagraph);
router.delete("/", isLoggedIn, deleteParagraph);

export default router;
