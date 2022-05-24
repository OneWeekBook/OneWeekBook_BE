const {
  Category,
  UserBookList,
  BookParagraph,
  BookReviewLike,
  User,
  Op,
  sequelize,
} = require("../models");
const { procedureParsing } = require("../modules/procedureParsing");
const bookController = {
  getCategories: async (req, res) => {
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
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "DB 에러!",
      });
    }
  },
  getMyList: async (req, res) => {
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

  addMyList: async (req, res) => {
    try {
      const { isbn, title, author, publisher, img, userId } = req.body;
      const isbn13 = isbn.split(" ")[1];
      const [, created] = await UserBookList.findOrCreate({
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  updateProgress: async (req, res) => {
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

  deleteMyList: async (req, res) => {
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

  getParagraphs: async (req, res) => {
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

  addParagraph: async (req, res) => {
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

  deleteParagraph: async (req, res) => {
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

  getAllReviews: async (req, res) => {
    let { start, display, sortby } = req.query;
    start = parseInt(start);
    display = parseInt(display);
    try {
      let callQuery;
      if (sortby === "totalReviews") {
        callQuery = `select title, author, publisher, img, isbn, count(*) as countReviews from userbooklists where review is not null group by isbn order by countReviews desc limit ?, ?`;
      } else {
        callQuery = `select title, author, publisher, img, isbn, count(*) as countReviews from userbooklists where review is not null group by isbn order by createdAt desc limit ?, ?`;
      }
      const reviews = await sequelize.query(callQuery, {
        replacements: [start, display],
        type: sequelize.QueryTypes.SELECT,
      });
      return res.status(200).json({
        success: true,
        message: "리뷰 조회 성공!",
        reviews,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  getOneBookReviews: async (req, res) => {
    try {
      const { isbn } = req.params;
      const { sortby } = req.query;
      let sort_value = "createdAt";
      if (sortby === "recommend") {
        sort_value = "recommend";
      }
      const callProcedure = `
        call getonebookreviews(:isbn);
      `;
      const queryResults = await sequelize.query(callProcedure, {
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
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  getOneReview: async (req, res) => {
    try {
      const { bookId, userId } = req.params;
      const review = await UserBookList.findOne({
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  createReview: async (req, res) => {
    try {
      const { bookId } = req.params;
      const { review, rating } = req.body;

      const book = await UserBookList.findOne({
        where: { id: bookId },
      });
      if (book.review) {
        return res.status(409).json({
          message: "이미 리뷰가 존재합니다.",
          success: false,
        });
      }
      await UserBookList.update(
        {
          review,
          rating,
        },
        {
          where: {
            id: bookId,
          },
        }
      );
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

  updateReview: async (req, res) => {
    try {
      const { bookId } = req.params;
      const { review, rating } = req.body;
      await UserBookList.update({ review, rating }, { where: { id: bookId } });
      return res.status(200).json({
        success: true,
        message: "리뷰 수정 완료!",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  deleteReview: async (req, res) => {
    try {
      const { bookId } = req.params;
      await UserBookList.update(
        { review: null, rating: 0.0 },
        { where: { id: bookId } }
      );
      return res.status(200).json({
        success: true,
        message: "리뷰 삭제 성공!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },

  likeReview: async (req, res) => {
    try {
      const { bookId } = req.params;
      const { state, userId } = req.body;
      const [, created] = await BookReviewLike.findOrCreate({
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
  cancelLikeReview: async (req, res) => {
    try {
      const { bookId } = req.params;
      const { userId } = req.body;
      const result = await BookReviewLike.destroy({
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
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB서버 에러!",
      });
    }
  },
};

module.exports = bookController;
