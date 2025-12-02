"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.signupSchema = joi_1.default.object({
    name: joi_1.default.string().required().alphanum().min(2).max(30),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required().min(8)
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
//# sourceMappingURL=usersValidations.js.map