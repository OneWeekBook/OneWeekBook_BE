const axios = require("axios");
const { clientId, clientSecret } = require("../config/naverAPI.json");
const bookController = {
  search: async (req, res) => {
    const { query } = req.query;

    const api_url =
      "https://openapi.naver.com/v1/search/book_json?query=" + encodeURI(query); // json 결과
    // const api_url = `https://openapi.naver.com/v1/search/book_adv?d_titl=${encodeURI(d_titl)}`; //상세 검색
    // const request = require('request');
    const options = {
      url: api_url,
      headers: {
        "X-Naver-Client-Id": clientId,
        "X-Naver-Client-Secret": clientSecret,
      },
      method: "get",
    };
    try {
      const response = await axios(options);
      if (response.status === 200) {
        // res.json(response.data.items);//일반
        res.status(200).json({
          success: true,
          message: "책 조회 성공",
          books: response.data.items,
        });
      } else {
        return res.status(response.status).json({
          success: false,
          message: "Naver api 오류",
        });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Naver api 오류",
      });
    }
  },
};

module.exports = bookController;
