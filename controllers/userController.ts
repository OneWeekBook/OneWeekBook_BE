import { compare, hash } from "../modules/bcryptModule";
import { create } from "../modules/jwtModule";
import { User } from "../models";

const userController = {
  login: async (req, res) => {
    const { email, password } = req.body;
    let user = null;
    try {
      user = await User.findOne({ where: { email } });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB 에러!",
      });
    }
    if (user) {
      // 유저 존재o
      // 유저 비밀번호 비교
      const compare_pwd = await compare(password, user.password);
      if (!compare_pwd.success) {
        return res.status(510).json({
          message: "bcrypt compare 에러",
          success: false,
        });
      }
      if (compare_pwd.compare) {
        //비밀번호 o
        const accessToken = create({ id: user.id });
        return res.status(200).json({
          message: "로그인 성공!",
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
    return res.status(404).json({
      success: false,
      message: "유저가 존재하지 않습니다.",
    });
  },
  register: async (req, res) => {
    const { email, username, password, nick } = req.body;
    let fUser = null;
    try {
      fUser = await User.findOne({ where: { email } });
    } catch (error) {
      return res.status(500).json({
        message: "DB 에러!",
        success: false,
      });
    }
    if (!fUser) {
      //이메일이 없을 때
      const encryptPassword = await hash(password);
      if (!encryptPassword.success) {
        return res.status(511).json({
          message: "bcrypt hash 에러",
          success: false,
        });
      }
      try {
        await User.create({
          email,
          username,
          password: encryptPassword.hash,
          nick,
        });
        return res.status(201).json({
          message: "회원가입 완료!",
          success: true,
        });
      } catch (error) {
        return res.status(500).json({
          message: "DB 에러!",
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

  getUser: (req, res) => {
    if (!req.user) {
      return res.status(404).json({
        success: false,
        message: "유저 정보가 없습니다.",
      });
    }
    return res.status(200).json({
      message: "유저 정보 조회 성공!",
      success: true,
      user: req.user,
    });
  },

  newPassword: async (req, res) => {
    const { email, password } = req.body;
    let fUser;
    try {
      fUser = await User.findOne({ where: { email } });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB 에러!",
      });
    }
    if (!fUser) {
      return res.status(404).json({
        message: "해당하는 유저가 없습니다.",
        success: false,
      });
    }
    const encryptPassword = await hash(password);
    if (!encryptPassword.success) {
      return res.status(511).json({
        message: "bcrypt hash 에러",
        success: false,
      });
    }
    try {
      await User.update(
        { password: encryptPassword.hash },
        { where: { email } }
      );
      return res.status(200).json({
        message: "비밀번호 변경 완료!",
        success: true,
      });
    } catch (error) {
      return res.status(500).json({
        message: "DB 에러!",
        success: false,
      });
    }
  },
  deleteUser: async (req, res) => {
    const { password, id } = req.body;
    try {
      const user = await User.findOne({ where: { id } });
      if (user) {
        const compare_pwd = await compare(password, user.password);
        if (!compare_pwd.success) {
          return res.status(510).json({
            message: "bcrypt compare 에러!",
            success: false,
          });
        }
        if (compare_pwd.compare) {
          try {
            await User.destroy({ where: { id } });
            return res.status(200).json({
              success: false,
              message: "유저 삭제 완료!",
            });
          } catch (error) {
            return res.status(500).json({
              message: "DB 에러!",
              success: false,
            });
          }
        }
        return res.status(400).json({
          success: false,
          message: "비밀번호가 다릅니다.",
        });
      }
      return res.status(404).json({
        success: false,
        message: "유저가 존재하지 않습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        message: "DB 에러!",
        success: false,
      });
    }
  },
  updateNick: async (req, res) => {
    const { nick, id } = req.body;
    try {
      await User.update({ nick }, { where: { id } });
      return res.status(200).json({
        success: true,
        message: "닉네임 변경이 완료되었습니다.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "DB 에러!",
      });
    }
  },
};

export default userController;
