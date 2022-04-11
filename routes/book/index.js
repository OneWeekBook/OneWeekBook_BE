const express = require("express");
const router = express.Router();
const { search } = require("../../controllers/bookController");
const categoryRouter = require("./category");
const wishBookRouter = require("./wishBook");

router.use("/category", categoryRouter);
router.use("/wishBook");
router.get("/search", search);

module.exports = router;
