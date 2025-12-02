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
exports.expenses = expenses;
exports.createExpenses = createExpenses;
exports.deleteExpense = deleteExpense;
exports.updateExpense = updateExpense;
const index_1 = require("../index");
const Expenses_1 = require("../entities/Expenses");
const getDateRange_1 = __importDefault(require("../middlewares/utils/getDateRange"));
const Users_1 = require("../entities/Users");
function expenses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { duration, startDate, endDate } = req.query;
        const user_id = req.user.id;
        const user = yield Users_1.Users.findOne({
            where: { id: parseInt(user_id) },
        });
        let page = Number(req.query.page) || 1;
        let limit = Number(req.query.limit) || 10;
        let offset = (page - 1) * limit;
        try {
            const dateRange = (0, getDateRange_1.default)({ duration, startDate, endDate });
            const userRepository = index_1.AppDataSource.getRepository(Expenses_1.Expenses);
            const data = yield userRepository
                .createQueryBuilder('expenses')
                .skip(offset)
                .take(limit)
                .where("expenses.user_id = :user_id", { user_id })
                .getMany();
            const start = new Date(dateRange.startDate);
            const end = new Date(dateRange.endDate);
            const filteredData = data.filter((item) => {
                const created = new Date(item.created_at);
                return created >= start && created <= end;
            });
            startDate || duration ? res.status(200).send({ filteredData }) : res.status(200).send({ data });
        }
        catch (error) {
            res.status(400).send(error.message);
            console.error(error.message);
        }
    });
}
function createExpenses(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = req.user.id;
            const { amount, category } = req.body;
            const user = yield Users_1.Users.findOne({
                where: { id: parseInt(user_id) },
            });
            if (!user)
                return res.status(400).send('User not found. Login Again');
            const expense = Expenses_1.Expenses.create({
                amount, category, user_id: user.id
            });
            yield expense.save();
            return res.status(200).send(expense);
        }
        catch (error) {
            console.error(error);
            return res.status(400).send(error.message);
        }
    });
}
function deleteExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const expense_id = req.params.id;
            const user_id = req.user.id;
            if (!expense_id)
                return res.status(400).send('User not found. Login Again');
            const response = yield Expenses_1.Expenses.createQueryBuilder()
                .delete()
                .where("id = :expense_id", { expense_id })
                .andWhere("user_id = :user_id", { user_id })
                .execute();
            return res.status(200).send(response);
        }
        catch (error) {
            console.error(error);
            return res.status(400).send(error.message);
        }
    });
}
function updateExpense(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user_id = req.user.id;
            const { id } = req.params;
            const { amount, category } = req.body;
            const user = yield Expenses_1.Expenses.findOne({
                where: { user_id: parseInt(user_id) }
            });
            if (!user)
                return res.status(400).send('Please login again!');
            const data = yield Expenses_1.Expenses.update(id, { amount, category });
            if (data.affected === 0)
                return res.status(400).send('Expense does not exist!');
            return res.status(200).send({ msg: 'Expense updated!', data });
        }
        catch (error) {
            console.error(error);
            return res.status(400).send(error.message);
        }
    });
}
//# sourceMappingURL=expenseController.js.map