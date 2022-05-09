import express from "express";
import myListRouter from "./mylist";
import paragraphRouter from "./paragraph";
import reviewsRouter from "./reviews";
import { getCategories } from "../../controllers/bookController";

const router = express.Router();

router.get("/categories", getCategories);
router.use("/reviews", reviewsRouter);
router.use("/mylist", myListRouter);
router.use("/paragraph", paragraphRouter);

export default router;
