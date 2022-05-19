import { Request, Response } from "express";
import {
  Category,
  UserBookList,
  BookParagraph,
  BookReview,
  BookReviewLike,
} from "../models";

const bookController = {
  getCategories: async (req: Request, res: Response) => {
    try {
      const categories = await Category.findAll();
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB 에러!",
      });
    }
  },
  getMyList: async (req: Request, res: Response) => {
    try {
      const { userId, progress } = req.query;
      const myList = await UserBookList.findAll({
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  addMyList: async (req: Request, res: Response) => {
    try {
      const { isbn, title, author, publisher, img, userId } = req.body;
      const isbn13 = isbn.split(" ")[1];
      await UserBookList.create({
        isbn: isbn13,
        title,
        author,
        publisher,
        img,
        userId,
      });

      return res.status(201).json({
        success: true,
        message: "내 서재에 추가 완료!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  updateProgress: async (req: Request, res: Response) => {
    try {
      const { isbn, userId, progress } = req.body;
      if (progress === 1) {
        await UserBookList.update(
          {
            progress,
            startTime: new Date(),
          },
          {
            where: {
              userId,
              isbn,
            },
          }
        );
      }
      if (progress === 2) {
        await UserBookList.update(
          {
            progress,
            endTime: new Date(),
          },
          {
            where: {
              userId,
              isbn,
            },
          }
        );
      }
      return res.status(200).json({
        success: true,
        message: "진행상태 변경완료!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  deleteMyList: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      await UserBookList.destroy({
        where: { id },
      });
      return res.status(200).json({
        success: true,
        message: "내 서재에서 삭제되었습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  getParagraphs: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.query;
      const paragraphs = await BookParagraph.findAll({ where: { bookId } });
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  addParagraph: async (req: Request, res: Response) => {
    try {
      const { paragraph, bookId } = req.body;
      await BookParagraph.create({
        paragraph,
        bookId,
      });
      return res.status(201).json({
        success: true,
        message: "구절 등록 완료!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  deleteParagraph: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      await BookParagraph.destroy({
        where: { id },
      });
      return res.status(200).json({
        success: true,
        message: "구절이 삭제되었습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  getAllReviews: async (req: Request, res: Response) => {
    try {
      const reviews = await BookReview.findAll();
      if (reviews) {
        return res.status(200).json({
          success: true,
          message: "리뷰 조회 완료!",
          reviews,
        });
      }
      return res.status(404).json({
        success: false,
        message: "리뷰 조회 실패!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  getOneReviews: async (req: Request, res: Response) => {
    try {
      console.log(req.params);
      const { bookId } = req.params;
      console.log(bookId);
      const reviews = await BookReview.findAll({ where: { bookId } });
      if (reviews) {
        return res.status(200).json({
          success: true,
          message: "리뷰 조회 완료!",
          reviews,
        });
      }
      return res.status(404).json({
        success: false,
        message: "리뷰 조회 실패!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  createReview: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const { review, rating } = req.body;

      await BookReview.create({
        review,
        rating,
        bookId,
      });
      return res.status(201).json({
        message: "리뷰 작성 성공!",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  deleteReview: async (req: Request, res: Response) => {
    try {
      const { id } = req.query;
      await BookReview.destroy({ where: { id } });
      return res.status(200).json({
        success: true,
        message: "리뷰 삭제 성공!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  likeReview: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const { userId } = req.body;
      await BookReviewLike.findOrCreate({
        where: { userId, bookId },
      });
      return res.status(200).json({
        success: true,
        message: "좋아요 성공!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  cancelLikeReview: async (req: Request, res: Response) => {
    try {
      const { bookId } = req.params;
      const { userId } = req.body;
      await BookReviewLike.destroy({
        where: { userId, bookId },
      });
      return res.status(200).json({
        success: true,
        message: "좋아요 취소!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
};

export default bookController;
