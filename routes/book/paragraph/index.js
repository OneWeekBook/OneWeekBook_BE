const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../../../modules/authModule");
const {
  getParagraphs,
  addParagraph,
  deleteParagraph,
} = require("../../../controllers/bookController");

router.get("/", isLoggedIn, getParagraphs);
router.post("/", isLoggedIn, addParagraph);
router.delete("/", isLoggedIn, deleteParagraph);

module.exports = router;
