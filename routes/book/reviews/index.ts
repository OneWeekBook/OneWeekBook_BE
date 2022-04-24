import express from "express";
import {
  getAllReviews,
  getOneReviews,
  createReview,
  likeReview,
  cancelLikeReview,
  deleteReview,
} from "../../../controllers/bookController";
import { isLoggedIn } from "../../../modules/authModule";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:bookId", getOneReviews);
router.post("/:bookId", isLoggedIn, createReview);
router.post("/:bookId/like", isLoggedIn, likeReview);
router.post("/:bookId/like/cancel", isLoggedIn, cancelLikeReview);
router.delete("/", isLoggedIn, deleteReview);

export default router;
