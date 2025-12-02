"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const usersControllers_1 = require("../controllers/usersControllers");
const expenseController_1 = require("../controllers/expenseController");
const authServer_1 = require("../controllers/authServer");
const usersValidations_1 = require("../validations/usersValidations");
const expensesValidation_1 = require("../validations/expensesValidation");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const auth_1 = require("../middlewares/auth");
router.post('/signup', (0, validationMiddleware_1.validationMiddleware)(usersValidations_1.signupSchema), usersControllers_1.signUp);
router.post('/login', (0, validationMiddleware_1.validationMiddleware)(usersValidations_1.loginSchema), authServer_1.login);
router.get('/expenses', auth_1.authenticateToken, expenseController_1.expenses);
router.post('/expense', (0, validationMiddleware_1.validationMiddleware)(expensesValidation_1.expenseSchema), auth_1.authenticateToken, expenseController_1.createExpenses);
router.delete('/expense/:id', auth_1.authenticateToken, expenseController_1.deleteExpense);
router.put('/expense/:id', (0, validationMiddleware_1.validationMiddleware)(expensesValidation_1.expenseSchema), auth_1.authenticateToken, expenseController_1.updateExpense);
//# sourceMappingURL=routes.js.map