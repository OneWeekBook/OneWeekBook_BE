const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../../../modules/authModule");
const {
  getMyList,
  addMyList,
  updateProgress,
  deleteMyList,
} = require("../../../controllers/bookController");

router.get("/", isLoggedIn, getMyList);
router.post("/", isLoggedIn, addMyList);
router.put("/", isLoggedIn, updateProgress);
router.delete("/", isLoggedIn, deleteMyList);
module.exports = router;
