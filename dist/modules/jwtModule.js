"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtConfig_json_1 = require("../config/jwtConfig.json");
const jwtModule = {
    create: (payload) => {
        //option을 아래와 같이 주려면 payload값이 {}형태여야 sign이 됨
        const option = {
            algorithm: "HS256",
            expiresIn: "30d",
            issuer: "oneweekbook",
        };
        const token = jsonwebtoken_1.default.sign(payload, jwtConfig_json_1.secretKey, option);
        return token;
    },
    verify: (token) => {
        try {
            const decode = jsonwebtoken_1.default.verify(token, jwtConfig_json_1.secretKey);
            return decode;
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                console.log("expired token");
                return -1;
            }
            else if (error.name === "JsonWebTokenError") {
                console.log("invalid token");
                return -2;
            }
            else {
                console.log("jwt not active");
                return -3;
            }
        }
    },
};
exports.default = jwtModule;
