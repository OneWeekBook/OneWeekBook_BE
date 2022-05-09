import express from "express";
import {
  getAllReviews,
  getOneBookReviews,
  getOneReview,
  createReview,
  likeReview,
  cancelLikeReview,
  deleteReview,
<<<<<<< HEAD:routes/book/reviews/index.ts
} from "../../../controllers/bookController";
import { isLoggedIn } from "../../../modules/authModule";

const router = express.Router();
=======
  updateReview,
} = require("../../../controllers/bookController");
const { isLoggedIn } = require("../../../modules/authModule");
>>>>>>> 957033c197ed2d82cf1a393d2a79ae6b4fcda445:routes/book/reviews/index.js

router.get("/", getAllReviews);
router.get("/:isbn", getOneBookReviews);
router.get("/:bookId/:userId", getOneReview);
router.post("/:bookId", isLoggedIn, createReview);
router.post("/:bookId/like", isLoggedIn, likeReview);
router.post("/:bookId/like/cancel", isLoggedIn, cancelLikeReview);
router.put("/:bookId", isLoggedIn, updateReview);
router.delete("/:bookId", isLoggedIn, deleteReview);

export default router;
