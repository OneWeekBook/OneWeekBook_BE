const nodemailer = require("nodemailer");
const {
  senderEmail,
  senderPassword,
  service,
  host,
} = require("../config/nodeMailerConfig.json");

const nodeMailerModule = {
  sendEmail: async (email, code) => {
    const mailConfig = {
      service,
      host,
      auth: {
        user: senderEmail,
        pass: senderPassword,
      },
    };

    const message = {
      from: senderEmail,
      to: email,
      subject: "이메일 인증 요청",
      html: `<div align="center">
                <p>아래 인증코드를 입력하세요</p>
                <br>
                <span>${code}</span>
            </div>
            `,
    };
    const transporter = nodemailer.createTransport(mailConfig);
    try {
      await transporter.sendMail(message);
      await transporter.close();
    } catch (error) {
      return false;
    }
    return true;
  },
};

module.exports = nodeMailerModule;
