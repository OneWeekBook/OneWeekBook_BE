const { Category, WishBook } = require("../models");

const bookController = {
  getCategory: async (req, res) => {
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
  getWishList: async (req, res) => {
    try {
      const { userId } = req.query;
      const wishes = await WishBook.findAll({
        where: {
          userId,
        },
      });
      if (wishes.length) {
        return res.status(200).json({
          success: true,
          message: "데이터 조회 성공!",
          wishes,
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
};

module.exports = bookController;
