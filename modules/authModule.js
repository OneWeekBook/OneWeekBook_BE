const { verify } = require("./jwtModule");
const { User } = require("../models");
const authModule = {
  isLoggedIn: async (req, res, next) => {
    const accessToken = req.headers.authorization;
    if (!accessToken) {
      return res.status(409).json({
        message: "액세스 토큰이 존재하지 않습니다.",
        success: false,
      });
    }
    const decode = verify(accessToken);

    if (decode === -1) {
      return res.status(408).json({
        success: false,
        message: "토큰이 만료되었습니다.",
      });
    } else if (decode === -2) {
      return res.status(407).json({
        success: false,
        message: "유효하지 않은 토큰입니다.",
      });
    } else if (decode === -3) {
      return res.status(406).json({
        success: false,
        message: "토큰 에러",
      });
    } else {
      try {
        const user = await User.findOne({ where: { id: decode.id } });
        req.user = {
          id: user.id,
          email: user.email,
          nick: user.nick,
          username: user.username,
          state: user.state,
          status: user.status,
        };
        next();
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "DB서버 에러",
        });
      }
    }
  },
};

module.exports = authModule;
