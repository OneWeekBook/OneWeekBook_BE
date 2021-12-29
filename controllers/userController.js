const { compare, hash } = require("../modules/bcryptModule");
const { create } = require("../modules/jwtModule");

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    let user = null;
    try {
      user = await User.findOne({ email });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB 서버에러!",
      });
    }
    if (user) {
      // 유저 존재o
      // 유저 비밀번호 비교
      const tf = compare(password, user.password);
      if (tf) {
        //비밀번호 o
        const accessToken = create({ id: user.id });
        return res.status(200).json({
          success: true,
          accessToken,
        });
      }
      return res.status(401).json({
        //비밀번호 x
        success: false,
        message: "비밀번호가 다릅니다.",
      });
    }
    return res.status(400).json({
      success: false,
      message: "유저가 존재하지 않습니다.",
    });
  },
  register: async (req, res) => {
    const { email, username, password, nickname } = req.body;
    let fUser = null;
    try {
      fUser = await User.findOne({ email });
    } catch (error) {
      return res.status(500).json({
        message: "DB 서버에러!",
        success: false,
      });
    }
    if (!fUser) {
      //이메일이 없을 때
      const encryptPassword = hash(password);
      const user = new User({
        email,
        username,
        password: encryptPassword,
        nickname,
      });
      try {
        await user.save();
        res.status(200).json({
          message: "회원가입 완료!",
          success: true,
        });
      } catch (error) {
        res.status(500).json({
          message: "DB 서버에러!",
          success: false,
        });
      }
    }
    // 이미 존재하는 이메일
    return res.status(400).json({
      success: false,
      message: "이미 존재하는 이메일 입니다.",
    });
  },
};

module.exports = userController;
