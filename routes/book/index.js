const express = require("express");
const router = express.Router();
const myListRouter = require("./mylist");
const paragraphRouter = require("./paragraph");
const reviewsRouter = require("./reviews");
const { getCategories } = require("../../controllers/bookController");

router.get("/categories", getCategories);
router.use("/reviews", reviewsRouter);
router.use("/mylist", myListRouter);
router.use("/paragraph", paragraphRouter);
module.exports = router;
