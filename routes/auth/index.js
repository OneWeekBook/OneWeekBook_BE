const express = require("express");
const router = express.Router();
const { sendCode, authEmail } = require("../../controllers/authController");

router.post("/code", sendCode);
router.post("/email", authEmail);

module.exports = router;
