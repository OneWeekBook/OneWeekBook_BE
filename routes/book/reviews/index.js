const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  getOneBookReviews,
  getOneReview,
  createReview,
  likeReview,
  cancelLikeReview,
  deleteReview,
  updateReview,
} = require("../../../controllers/bookController");
const { isLoggedIn } = require("../../../modules/authModule");

router.get("/", getAllReviews);
router.get("/:isbn", getOneBookReviews);
router.get("/:bookId/:userId", getOneReview);
router.post("/:bookId", isLoggedIn, createReview);
router.post("/:bookId/like", isLoggedIn, likeReview);
router.post("/:bookId/like/cancel", isLoggedIn, cancelLikeReview);
router.put("/:bookId", isLoggedIn, updateReview);
router.delete("/:bookId", isLoggedIn, deleteReview);

module.exports = router;
