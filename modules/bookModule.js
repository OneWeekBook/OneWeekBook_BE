const axios = require("axios");
const { clientId, clientSecret } = require("../config/naverAPI.json");

const bookModule = {
  bookSearch: async (query) => {
    const key = Object.keys(query);
    let api_url;

    if (key.indexOf("query") !== -1) {
      api_url = `https://openapi.naver.com/v1/search/book_json?`;
    } else {
      api_url = `https://openapi.naver.com/v1/search/book_adv?`;
    }
    for (let i in key) {
      if (parseInt(i) === key.length - 1) {
        api_url = api_url + `${key[i]}=${encodeURI(query[key[i]])}`;
      } else {
        api_url = api_url + `${key[i]}=${encodeURI(query[key[i]])}&`;
      }
    }
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
        return response.data.items;
      } else {
        return -1;
      }
    } catch (error) {
      return -2;
    }
  },
};

module.exports = bookModule;
