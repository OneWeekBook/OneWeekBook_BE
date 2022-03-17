const express = require("express");
const router = express.Router();
const { getCategory } = require("../../../controllers/bookController");

router.get("/", getCategory);

module.exports = router;
