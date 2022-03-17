const express = require("express");
const router = express.Router();
const { search } = require("../../controllers/bookController");
const categoryRouter = require("./category");
router.get("/search", search);

router.use("/category", categoryRouter);
module.exports = router;
