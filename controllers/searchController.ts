import { bookSearch } from "../modules/bookModule";
import { Request, Response } from "express";

const searchController = {
  search: async (req: Request, res: Response) => {
    try {
      const bookData = await bookSearch(req.query);
      if (bookData === -1) {
        return res.status(509).json({
          message: "데이터를 가져오는데 실패했습니다.",
          success: false,
        });
      } else if (bookData === -2) {
        return res.status(508).json({
          message: "네이버 API 에러!",
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
        message: "DB 에러!",
      });
    }
  },
};

export default searchController;
