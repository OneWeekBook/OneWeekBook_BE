const { sendEmail } = require("../modules/nodeMailerModule");
let codeNumber = -111111;
const authController = {
  sendCode: (req, res) => {
    const { email } = req.body;
    codeNumber = Math.floor(Math.random() * 1000000);
    const boolSendEmail = sendEmail(email, codeNumber);
    if (boolSendEmail) {
      return res.status(200).json({
        message: "이메일 전송 완료!",
        success: true,
      });
    }
    return res.status(500).json({
      message: "nodemailer 에러!",
      success: false,
    });
  },

  authEmail: (req, res) => {
    const { code } = req.body;
    if (parseInt(code) === codeNumber) {
      res.status(200).json({
        message: "이메일 인증에 성공했습니다.",
        success: true,
      });
    } else {
      res.status(400).json({
        message: "인증번호가 틀립니다.",
        success: false,
      });
    }
  },
};

module.exports = authController;
