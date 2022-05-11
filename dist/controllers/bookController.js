"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const bookController = {
    getCategories: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categories = yield models_1.Category.findAll();
            if (categories) {
                return res.status(200).json({
                    success: true,
                    message: "카테고리 조회 성공",
                    categories,
                });
            }
            return res.status(404).json({
                success: false,
                message: "카테고리를 가져오는데 실패했습니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB 에러!",
            });
        }
    }),
    getMyList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId, progress } = req.query;
            const myList = yield models_1.UserBookList.findAll({
                where: {
                    userId,
                    progress,
                },
            });
            if (myList) {
                return res.status(200).json({
                    success: true,
                    message: "데이터 조회 성공!",
                    myList,
                });
            }
            return res.status(404).json({
                success: false,
                message: "찜 목록을 가져오는데 실패했습니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    addMyList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { isbn, title, author, publisher, img, userId } = req.body;
            const isbn13 = isbn.split(" ")[1];
            const [, created] = yield models_1.UserBookList.findOrCreate({
                where: {
                    isbn: isbn13,
                    title,
                    author,
                    publisher,
                    img,
                    userId,
                },
            });
            if (created) {
                return res.status(201).json({
                    success: true,
                    message: "내 서재에 추가 완료!",
                });
            }
            return res.status(409).json({
                success: false,
                message: "이미 찜한 책 입니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    updateProgress: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { isbn, userId, progress } = req.body;
            if (progress === 1) {
                yield models_1.UserBookList.update({
                    progress,
                    startTime: new Date(),
                }, {
                    where: {
                        userId,
                        isbn,
                    },
                });
            }
            if (progress === 2) {
                yield models_1.UserBookList.update({
                    progress,
                    endTime: new Date(),
                }, {
                    where: {
                        userId,
                        isbn,
                    },
                });
            }
            return res.status(200).json({
                success: true,
                message: "진행상태 변경완료!",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    deleteMyList: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            yield models_1.UserBookList.destroy({
                where: { id },
            });
            return res.status(200).json({
                success: true,
                message: "내 서재에서 삭제되었습니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    getParagraphs: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookId } = req.query;
            const paragraphs = yield models_1.BookParagraph.findAll({ where: { bookId } });
            if (paragraphs) {
                return res.status(200).json({
                    success: true,
                    message: "구절 조회 완료!",
                    paragraphs,
                });
            }
            return res.status(404).json({
                success: false,
                message: "구절 조회 실패!",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    addParagraph: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { paragraph, bookId } = req.body;
            yield models_1.BookParagraph.create({
                paragraph,
                bookId,
            });
            return res.status(201).json({
                success: true,
                message: "구절 등록 완료!",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    deleteParagraph: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.query;
            yield models_1.BookParagraph.destroy({
                where: { id },
            });
            return res.status(200).json({
                success: true,
                message: "구절이 삭제되었습니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    getAllReviews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { start, display, sortby } = req.query;
        let sort_value = "createdAt";
        if (sortby === "recommend") {
            sort_value = "recommend";
        }
        try {
            const reviews = yield models_1.UserBookList.findAndCountAll({
                where: {
                    review: {
                        [Op.ne]: null,
                    },
                },
                group: ["isbn"],
                attributes: {
                    exclude: [
                        "userId",
                        "review",
                        "rating",
                        "progress",
                        "startTime",
                        "endTime",
                        "createdAt",
                        "updatedAt",
                    ],
                },
                offset: parseInt(start) || 0,
                limit: parseInt(display) || 10,
                order: [[sort_value, "DESC"]],
            });
            return res.status(200).json({
                success: true,
                message: "리뷰 조회 성공!",
                reviews,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    getOneBookReviews: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { isbn } = req.params;
            const callProcedure = `
        call getonebookreviews(:isbn);
      `;
            const queryResults = yield sequelize.query(callProcedure, {
                replacements: { isbn },
                type: sequelize.QueryTypes.SELECT,
            });
            const results = procedureParsing(queryResults);
            if (results) {
                return res.status(200).json({
                    success: true,
                    message: "리뷰 조회 완료!",
                    results,
                });
            }
            return res.status(404).json({
                success: false,
                message: "리뷰 조회 실패!",
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    getOneReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookId, userId } = req.params;
            const review = yield models_1.UserBookList.findOne({
                include: [
                    {
                        model: User,
                        where: { id: userId },
                        attributes: { exclude: ["password"] },
                    },
                ],
                where: {
                    id: bookId,
                },
            });
            if (review) {
                return res.status(200).json({
                    success: true,
                    message: "리뷰 조회 성공!",
                    review,
                });
            }
            return res.status(404).json({
                success: false,
                message: "조회할 리뷰가 없습니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    createReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookId } = req.params;
            const { review, rating } = req.body;
            const book = yield models_1.UserBookList.findOne({
                where: { id: bookId },
            });
            if (book.review) {
                return res.status(409).json({
                    message: "이미 리뷰가 존재합니다.",
                    success: false,
                });
            }
            yield models_1.UserBookList.update({
                review,
                rating,
            }, {
                where: {
                    id: bookId,
                },
            });
            return res.status(201).json({
                message: "리뷰 작성 성공!",
                success: true,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    updateReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookId } = req.params;
            const { review, rating } = req.body;
            yield models_1.UserBookList.update({ review, rating }, { where: { id: bookId } });
            return res.status(200).json({
                success: true,
                message: "리뷰 수정 완료!",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    deleteReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookId } = req.params;
            yield models_1.UserBookList.update({ review: null, rating: 0.0 }, { where: { id: bookId } });
            return res.status(200).json({
                success: true,
                message: "리뷰 삭제 성공!",
            });
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    likeReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookId } = req.params;
            const { state, userId } = req.body;
            const [, created] = yield models_1.BookReviewLike.findOrCreate({
                where: { userId, userBookListId: bookId },
                defaults: {
                    state,
                    userBookListId: bookId,
                    userId,
                },
            });
            if (created) {
                return res.status(200).json({
                    success: true,
                    message: "좋아요 성공!",
                });
            }
            return res.status(409).json({
                success: false,
                message: "이미 좋아하는 리뷰입니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
    cancelLikeReview: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookId } = req.params;
            const { userId } = req.body;
            const result = yield models_1.BookReviewLike.destroy({
                where: { userId, userBookListId: bookId },
            });
            if (result) {
                return res.status(200).json({
                    success: true,
                    message: "좋아요 취소!",
                });
            }
            return res.status(400).json({
                success: false,
                message: "이 게시물을 좋아하지 않습니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB서버 에러!",
            });
        }
    }),
};
exports.default = bookController;
