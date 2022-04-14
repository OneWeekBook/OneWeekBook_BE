const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../../modules/authModule");
const categoryRouter = require("./category");
const myRouter = require("./my");

router.use("/category", categoryRouter);
router.use("/my", myRouter);
module.exports = router;
