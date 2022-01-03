const { bookSearch } = require("../modules/bookModule");

const bookController = {
  search: async (req, res) => {
    try {
      const bookData = await bookSearch(req.query);
      if (bookData === -1) {
        return res.status(509).json({
          message: "Naver API 에러!",
          success: false,
        });
      } else if (bookData === -2) {
        return res.status(508).json({
          message: "Axios 에러!",
          success: false,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: "데이터 조회 성공",
          books: bookData,
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "서버에러!",
      });
    }
  },
};

module.exports = bookController;
