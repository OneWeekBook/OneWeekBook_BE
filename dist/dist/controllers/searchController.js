"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookModule_1 = require("../modules/bookModule");
const searchController = {
    search: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const bookData = yield (0, bookModule_1.bookSearch)(req.query);
            if (bookData === -1) {
                return res.status(509).json({
                    message: "데이터를 가져오는데 실패했습니다.",
                    success: false,
                });
            }
            else if (bookData === -2) {
                return res.status(508).json({
                    message: "네이버 API 에러!",
                    success: false,
                });
            }
            else {
                return res.status(200).json({
                    success: true,
                    message: "데이터 조회 성공",
                    books: bookData,
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB 에러!",
            });
        }
    }),
};
exports.default = searchController;
