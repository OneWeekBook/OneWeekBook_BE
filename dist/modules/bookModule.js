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
const axios_1 = __importDefault(require("axios"));
const naverAPI_json_1 = require("../config/naverAPI.json");
const bookModule = {
    bookSearch: (query) => __awaiter(void 0, void 0, void 0, function* () {
        const key = Object.keys(query);
        let api_url;
        if (key.indexOf("query") !== -1) {
            api_url = `https://openapi.naver.com/v1/search/book_json?`;
        }
        else {
            api_url = `https://openapi.naver.com/v1/search/book_adv?`;
        }
        for (let i in key) {
            if (parseInt(i) === key.length - 1) {
                api_url = api_url + `${key[i]}=${encodeURI(query[key[i]])}`;
            }
            else {
                api_url = api_url + `${key[i]}=${encodeURI(query[key[i]])}&`;
            }
        }
        const options = {
            url: api_url,
            headers: {
                "X-Naver-Client-Id": naverAPI_json_1.clientId,
                "X-Naver-Client-Secret": naverAPI_json_1.clientSecret,
            },
            method: "get",
        };
        try {
            const response = yield (0, axios_1.default)(options);
            if (response.status === 200) {
                return response.data.items;
            }
            else {
                return -1;
            }
        }
        catch (error) {
            return -2;
        }
    }),
};
exports.default = bookModule;
