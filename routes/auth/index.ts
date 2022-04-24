import express from "express";
import { sendCode, authEmail } from "../../controllers/authController";
const router = express.Router();

router.post("/code", sendCode);
router.post("/email", authEmail);

export default router;
