const express = require("express");
const router = express.Router();
const { search } = require("../../controllers/bookController");
router.get("/search", search);

// router.get("/review/:isbn");
module.exports = router;
