"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptModule_1 = require("../modules/bcryptModule");
const jwtModule_1 = require("../modules/jwtModule");
const models_1 = require("../models");
const userController = {
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        let user = null;
        try {
            user = yield models_1.User.findOne({ where: { email } });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB 에러!",
            });
        }
        if (user) {
            // 유저 존재o
            // 유저 비밀번호 비교
            const compare_pwd = yield (0, bcryptModule_1.compare)(password, user.password);
            if (!compare_pwd.success) {
                return res.status(510).json({
                    message: "bcrypt compare 에러",
                    success: false,
                });
            }
            if (compare_pwd.compare) {
                //비밀번호 o
                const accessToken = (0, jwtModule_1.create)({ id: user.id });
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
    }),
    register: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, username, password, nick } = req.body;
        let fUser = null;
        try {
            fUser = yield models_1.User.findOne({ where: { email } });
        }
        catch (error) {
            return res.status(500).json({
                message: "DB 에러!",
                success: false,
            });
        }
        if (!fUser) {
            //이메일이 없을 때
            const encryptPassword = yield (0, bcryptModule_1.hash)(password);
            if (!encryptPassword.success) {
                return res.status(511).json({
                    message: "bcrypt hash 에러",
                    success: false,
                });
            }
            try {
                yield models_1.User.create({
                    email,
                    username,
                    password: encryptPassword.hash,
                    nick,
                });
                return res.status(201).json({
                    message: "회원가입 완료!",
                    success: true,
                });
            }
            catch (error) {
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
    }),
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
    newPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = req.body;
        let fUser;
        try {
            fUser = yield models_1.User.findOne({ where: { email } });
        }
        catch (error) {
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
        const encryptPassword = yield (0, bcryptModule_1.hash)(password);
        if (!encryptPassword.success) {
            return res.status(511).json({
                message: "bcrypt hash 에러",
                success: false,
            });
        }
        try {
            yield models_1.User.update({ password: encryptPassword.hash }, { where: { email } });
            return res.status(200).json({
                message: "비밀번호 변경 완료!",
                success: true,
            });
        }
        catch (error) {
            return res.status(500).json({
                message: "DB 에러!",
                success: false,
            });
        }
    }),
    deleteUser: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { password, id } = req.body;
        try {
            const user = yield models_1.User.findOne({ where: { id } });
            if (user) {
                const compare_pwd = yield (0, bcryptModule_1.compare)(password, user.password);
                if (!compare_pwd.success) {
                    return res.status(510).json({
                        message: "bcrypt compare 에러!",
                        success: false,
                    });
                }
                if (compare_pwd.compare) {
                    try {
                        yield models_1.User.destroy({ where: { id } });
                        return res.status(200).json({
                            success: false,
                            message: "유저 삭제 완료!",
                        });
                    }
                    catch (error) {
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
        }
        catch (error) {
            return res.status(500).json({
                message: "DB 에러!",
                success: false,
            });
        }
    }),
    updateNick: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { nick, id } = req.body;
        try {
            yield models_1.User.update({ nick }, { where: { id } });
            return res.status(200).json({
                success: true,
                message: "닉네임 변경이 완료되었습니다.",
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "DB 에러!",
            });
        }
    }),
};
exports.default = userController;
