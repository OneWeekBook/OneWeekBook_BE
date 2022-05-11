"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookController_1 = require("../../../controllers/bookController");
const authModule_1 = require("../../../modules/authModule");
const router = express_1.default.Router();
router.get("/", bookController_1.getAllReviews);
router.get("/:isbn", bookController_1.getOneBookReviews);
router.get("/:bookId/:userId", bookController_1.getOneReview);
router.post("/:bookId", authModule_1.isLoggedIn, bookController_1.createReview);
router.post("/:bookId/like", authModule_1.isLoggedIn, bookController_1.likeReview);
router.post("/:bookId/like/cancel", authModule_1.isLoggedIn, bookController_1.cancelLikeReview);
router.put("/:bookId", authModule_1.isLoggedIn, updateReview);
router.delete("/:bookId", authModule_1.isLoggedIn, bookController_1.deleteReview);
exports.default = router;
