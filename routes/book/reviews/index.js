const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getOneReviews,
  createReview,
  likeReview,
  cancelLikeReview,
  deleteReview,
} = require("../../../controllers/bookController");
const { isLoggedIn } = require("../../../modules/authModule");

router.get("/", getAllReviews);
router.get("/:bookId", getOneReviews);
router.post("/:bookId", isLoggedIn, createReview);
router.post("/:bookId/like", isLoggedIn, likeReview);
router.post("/:bookId/like/cancel", isLoggedIn, cancelLikeReview);
router.delete("/", isLoggedIn, deleteReview);

module.exports = router;
