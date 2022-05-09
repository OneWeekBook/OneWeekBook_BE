import express from "express";
const router = express.Router();

import userRouter from "./user";
import bookRouter from "./book";
import authRouter from "./auth";
import searchRouter from "./search";

router.use("/user", userRouter);
router.use("/book", bookRouter);
router.use("/auth", authRouter);
router.use("/search", searchRouter);

export default router;
