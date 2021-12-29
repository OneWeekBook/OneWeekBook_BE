const express = require("express");
const router = express.Router();
const userRouter = require("./user");
const bookRouter = require("./book");
const authRouter = require("./auth");

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/auth", authRouter);

module.exports = router;
