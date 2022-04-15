const express = require("express");
const router = express.Router();
const categoryRouter = require("./category");
const myListRouter = require("./mylist");
const paragraphRouter = require("./paragraph");

router.use("/category", categoryRouter);
router.use("/mylist", myListRouter);
router.use("/paragraph", paragraphRouter);
module.exports = router;
