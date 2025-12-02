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
exports.generateAccessToken = generateAccessToken;
exports.generateRefreshToken = generateRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisConfig_1 = require("../config/redisConfig");
require("dotenv/config");
const { ACCESS_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = process.env;
function generateAccessToken(data) {
    if (!ACCESS_TOKEN) {
        throw new Error("ACCESS_TOKEN is not defined in environment variables");
    }
    return jsonwebtoken_1.default.sign(data, ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_EXPIRES });
}
function generateRefreshToken(data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!REFRESH_TOKEN) {
            throw new Error("REFRESH_TOKEN is not defined in environment variables");
        }
        const refreshToken = jsonwebtoken_1.default.sign(data, REFRESH_TOKEN, { expiresIn: REFRESH_TOKEN_EXPIRES });
        const storeRefreshToken = yield redisConfig_1.redis.set(refreshToken, JSON.stringify(data), 'EX', 7 * 24 * 60 * 60);
        if (storeRefreshToken) {
            return refreshToken;
        }
        else {
            console.error('Error storing to the redis cache');
            throw new Error('Error storing to the redis cache');
        }
    });
}
//# sourceMappingURL=jwtGenerators.js.map