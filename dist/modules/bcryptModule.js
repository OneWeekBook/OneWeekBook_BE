"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const bcryptConfig_json_1 = require("../config/bcryptConfig.json");
const salt = parseInt(bcryptConfig_json_1.saltRounds);
const bcryptModule = {
    compare: (inputPassword, dbPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const passwordTrueFalse = yield bcrypt_1.default.compare(inputPassword, dbPassword);
            return {
                success: true,
                compare: passwordTrueFalse,
            };
        }
        catch (error) {
            return { success: false };
        }
    }),
    hash: (inputPassword) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const hash = yield bcrypt_1.default.hash(inputPassword, salt);
            return {
                success: true,
                hash,
            };
        }
        catch (error) {
            return { success: false };
        }
    }),
};
exports.default = bcryptModule;
