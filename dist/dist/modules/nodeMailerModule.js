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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodeMailerConfig_json_1 = require("../config/nodeMailerConfig.json");
const nodeMailerModule = {
    sendEmail: (email, code) => __awaiter(void 0, void 0, void 0, function* () {
        const mailConfig = {
            service: nodeMailerConfig_json_1.service,
            host: nodeMailerConfig_json_1.host,
            auth: {
                user: nodeMailerConfig_json_1.senderEmail,
                pass: nodeMailerConfig_json_1.senderPassword,
            },
        };
        const message = {
            from: nodeMailerConfig_json_1.senderEmail,
            to: email,
            subject: "이메일 인증 요청",
            html: `<div align="center">
                <p>아래 인증코드를 입력하세요</p>
                <br>
                <span>${code}</span>
            </div>
            `,
        };
        const transporter = nodemailer_1.default.createTransport(mailConfig);
        try {
            yield transporter.sendMail(message);
            yield transporter.close();
        }
        catch (error) {
            return false;
        }
        return true;
    }),
};
exports.default = nodeMailerModule;
