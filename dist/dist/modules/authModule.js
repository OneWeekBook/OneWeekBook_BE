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
const jwtModule_1 = require("./jwtModule");
const models_1 = require("../models");
const authModule = {
    isLoggedIn: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const accessToken = req.headers.authorization;
        if (!accessToken) {
            return res.status(401).json({
                message: "액세스 토큰이 존재하지 않습니다.",
                success: false,
            });
        }
        const decode = (0, jwtModule_1.verify)(accessToken);
        if (decode === -1) {
            return res.status(401).json({
                success: false,
                message: "토큰이 만료되었습니다.",
            });
        }
        else if (decode === -2) {
            return res.status(401).json({
                success: false,
                message: "유효하지 않은 토큰입니다.",
            });
        }
        else if (decode === -3) {
            return res.status(401).json({
                success: false,
                message: "토큰 에러",
            });
        }
        else {
            try {
                const user = yield models_1.User.findOne({ where: { id: decode.id } });
                req.user = {
                    id: user.id,
                    email: user.email,
                    nick: user.nick,
                    username: user.username,
                    role: user.role,
                };
                next();
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: "DB서버 에러",
                });
            }
        }
    }),
};
exports.default = authModule;
