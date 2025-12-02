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
exports.authenticateToken = authenticateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const authServer_1 = require("../controllers/authServer");
const { ACCESS_TOKEN } = process.env;
function authenticateToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const authHeader = req.headers['authorisation'];
        const token = (_a = (Array.isArray(authHeader) ? authHeader[0] : authHeader)) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const refreshToken = (_b = (Array.isArray(authHeader) ? authHeader[0] : authHeader)) === null || _b === void 0 ? void 0 : _b.split(" ")[2];
        if (token == null)
            return res.status(401).send({ message: 'Unauthorised!' });
        try {
            return jsonwebtoken_1.default.verify(token, ACCESS_TOKEN, (err, data) => __awaiter(this, void 0, void 0, function* () {
                if (err && err.message == 'jwt expired') {
                    console.warn('Access token expired. Attempting to refresh page...');
                    if (refreshToken == null)
                        return res.status(401).send({ message: 'Provide refreshToken in the authorisation headers!' });
                    const cachedData = yield (0, authServer_1.refresh)(refreshToken);
                    if (cachedData == null)
                        return res.status(401).send({ message: 'PLEASE LOG IN AGAIN!' });
                    req.user = JSON.parse(cachedData);
                    return next();
                }
                req.user = data;
                next();
            }));
        }
        catch (error) {
            console.log(error);
            return res.status(401).send('Invalid or expired access token!');
        }
    });
}
//# sourceMappingURL=auth.js.map