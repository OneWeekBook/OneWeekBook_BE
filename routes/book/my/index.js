const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../../../modules/authModule");
const { getWishList } = require("../../../controllers/bookController");

router.get("/", isLoggedIn, getWishList);
module.exports = router;
