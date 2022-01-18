const { sendEmail } = require("../modules/nodeMailerModule");
let codeNumber = -111111;
let ing = false;
let timer = null;

const authController = {
  sendCode: (req, res) => {
    if (ing) {
      return res.status(400).json({
        success: false,
        message: "이미 이메일이 전송되었습니다.",
      });
    }
    const { email } = req.body;
    codeNumber = Math.floor(Math.random() * 1000000);
    const boolSendEmail = sendEmail(email, codeNumber);
    if (boolSendEmail) {
      ing = true;
      timer = setTimeout(() => {
        ing = false;
      }, 180000);
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
    if (!ing) {
      return res.status(408).json({
        success: false,
        message: "이메인 인증 제한시간이 만료되었습니다.",
      });
    }
    const { code } = req.body;
    if (parseInt(code) === codeNumber) {
      ing = false;
      clearTimeout(timer);
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
