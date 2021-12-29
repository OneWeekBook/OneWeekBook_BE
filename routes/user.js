// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcrypt");
// const nodemailer = require("nodemailer");
// const { User } = require("../models");
// const { login } = require("../controllers/authController");
// const { hash } = require("../modules/bcryptModule");
// let codeNumber;
// router.post("/login", login);
// router.post("/emailcode", async (req, res, next) => {
//   try {
//     const { code } = req.body;
//     if (parseInt(code) === codeNumber) {
//       res.json({
//         success: true,
//       });
//     } else {
//       res.json({
//         success: false,
//       });
//     }
//   } catch (error) {
//     next(error);
//   }
// });
// router.post("/email", async (req, res, next) => {
//   const { email } = req.body;
//   try {
//     const mailconfig = {
//       service: "Gmail",
//       host: "smtp.gmail.com",
//       auth: {
//         user: process.env.SENDER_EMAIL,
//         pass: process.env.SENDER_PASSWORD,
//       },
//     };
//     codeNumber = Math.floor(Math.random() * 10000);
//     const message = {
//       from: `${process.env.SENDER_EMAIL}`,
//       to: email,
//       subject: "이메일 인증 요청",
//       html: `<div align="center">
//                     <p>아래 인증코드를 입력하세요</p>
//                     <br>
//                     <span>${codeNumber}</span>
//                 </div>
//                 `,
//     };

//     const transporter = nodemailer.createTransport(mailconfig);
//     await transporter.sendMail(message);
//     await transporter.close();
//     res.json({
//       success: true,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// router.post("/signup", async (req, res, next) => {
//   try {
//     const saltRounds = parseInt(process.env.SALTROUNDS);
//     const { email, username, password, nickname } = req.body;
//     const fUser = await User.findOne({ email });
//     if (!fUser) {
//       //이메일이 없을 때
//       const hash = hash(password, saltRounds);
//       const user = await User.create({
//         email,
//         username,
//         password: hash,
//         nickname,
//       });
//       return res.json({
//         success: true,
//       });
//     }
//     // 이미 존재하는 이메일
//     return res.json({
//       success: false,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

// module.exports = router;
