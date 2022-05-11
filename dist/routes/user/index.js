"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../../controllers/userController");
const authModule_1 = require("../../modules/authModule");
const router = express_1.default.Router();
router.get("/", authModule_1.isLoggedIn, userController_1.getUser);
router.post("/login", userController_1.login);
router.post("/register", userController_1.register);
router.post("/resign", authModule_1.isLoggedIn, userController_1.deleteUser);
router.put("/password", authModule_1.isLoggedIn, userController_1.newPassword);
router.put("/nick", authModule_1.isLoggedIn, userController_1.updateNick);
exports.default = router;
