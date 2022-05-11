"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authModule_1 = require("../../../modules/authModule");
const bookController_1 = require("../../../controllers/bookController");
const router = express_1.default.Router();
router.get("/", authModule_1.isLoggedIn, bookController_1.getParagraphs);
router.post("/", authModule_1.isLoggedIn, bookController_1.addParagraph);
router.delete("/", authModule_1.isLoggedIn, bookController_1.deleteParagraph);
exports.default = router;
