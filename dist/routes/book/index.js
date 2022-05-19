"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mylist_1 = __importDefault(require("./mylist"));
const paragraph_1 = __importDefault(require("./paragraph"));
const reviews_1 = __importDefault(require("./reviews"));
const bookController_1 = require("../../controllers/bookController");
const router = express_1.default.Router();
router.get("/categories", bookController_1.getCategories);
router.use("/reviews", reviews_1.default);
router.use("/mylist", mylist_1.default);
router.use("/paragraph", paragraph_1.default);
exports.default = router;
