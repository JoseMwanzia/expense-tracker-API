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
exports.login = login;
exports.refresh = refresh;
const argon2_1 = __importDefault(require("argon2"));
require("dotenv/config");
const Users_1 = require("../entities/Users");
const jwtGenerators_1 = require("./jwtGenerators");
const redisConfig_1 = require("../config/redisConfig");
const index_1 = require("../index");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        try {
            const userRepository = index_1.AppDataSource.getRepository(Users_1.Users);
            const data = yield userRepository
                .createQueryBuilder('users')
                .where('users.email = :email', { email })
                .getOne();
            if (!data) {
                return res.status(404).send("Incorrect email or password.");
            }
            if (yield argon2_1.default.verify(data.password, password)) {
                const token = (0, jwtGenerators_1.generateAccessToken)(Object.assign({}, data));
                const refreshToken = yield (0, jwtGenerators_1.generateRefreshToken)(Object.assign({}, data));
                return res.status(200).send({ token, refreshToken });
            }
            else {
                return res.status(401).send("Incorrect email or password.");
            }
        }
        catch (error) {
            console.error(error.stack);
            return res.status(404).send(error.message);
        }
    });
}
function refresh(refreshToken) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cache = yield redisConfig_1.redis.get(refreshToken, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    return err;
                return data;
            }));
            return cache;
        }
        catch (error) {
            throw new Error(error);
        }
    });
}
//# sourceMappingURL=authServer.js.map