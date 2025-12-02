"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.expenseSchema = joi_1.default.object({
    amount: joi_1.default.number().required(),
    category: joi_1.default.string().required().valid('Groceries', 'Leisure', 'Electronics', 'Utilities', 'Clothing', 'Health', 'Others')
});
//# sourceMappingURL=expensesValidation.js.map