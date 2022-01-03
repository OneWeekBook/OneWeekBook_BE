const express = require("express");
const router = express.Router();
const { search, detailSearch } = require("../../controllers/bookController");
router.get("/search", search);

module.exports = router;
