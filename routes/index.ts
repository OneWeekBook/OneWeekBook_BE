const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const bookRouter = require("./book");
const authRouter = require("./auth");
const searchRouter = require("./search");

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/auth", authRouter);
router.use("/search", searchRouter);
module.exports = router;
