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
exports.signUp = signUp;
const Users_1 = require("../entities/Users");
const argon2_1 = __importDefault(require("argon2"));
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        try {
            const hashedPassword = yield argon2_1.default.hash(password);
            const users = Users_1.Users.create({ name, email, password: hashedPassword });
            yield users.save();
            return res.status(200).send(users);
        }
        catch (error) {
            console.error(error);
            return res.status(400).send(error);
        }
    });
}
//# sourceMappingURL=usersControllers.js.map