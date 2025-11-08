import Expense from "../model/expenseModel.js";
import getDateRange from "../middlewares/utils/getDateRange.js";

export async function expenses(req, res) {
    const user_id = req.user.id
    const {duration, startDate, endDate} = req.query
    let page = parseInt(req.query.page, 10) || 1; // Current page (default: 1)
    let limit = parseInt(req.query.limit, 10) || 10; // Items per page (default: 10)
    let offset = (page - 1) * limit;
    
    try {
        const dateRange = getDateRange({duration, startDate, endDate})
        const data = await Expense.getAllExpenses( user_id, limit, offset )

        // Convert dateRange to Date objects for comparison
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);

        // Filter data between start and end (inclusive)
        const filteredData = data.filter((item) => {
            const created = new Date(item.created_at);
            return created >= start && created <= end;
        });

        startDate ? res.status(200).send({filteredData}) : res.status(200).send( {data})

    } catch (error) {
        res.status(400).send(error.message)
        console.error(error.message)
    }
}

export async function createExpenses(req, res) {
    try {
        const user_id = req.user.id
        const {amount} = req.body
        const data = await Expense.createExpense(amount, user_id)
        res.status(200).send(data)    
    } catch (error) {
        res.status(400).send(error.message)
        console.error(error)
    }
}

export async function deleteExpense(req, res) {
    try {
        const user_id = req.user.id;
        const expense_id = req.params.id
        const deletedExpense = await Expense.deleteExpense(user_id, expense_id)
        res.status(200).send(deletedExpense)
    } catch (error) {
        res.status(400).send(error.message)
        console.error(error)
    }
}

export async function updateExpense(req, res) {
    try {
        const user_id = req.user.id
        const expense_id = req.params.id;
        const {amount} = req.body;
        const updatedData = await Expense.updateData(user_id, expense_id, amount)
        res.status(200).send(updatedData)
    } catch (error) {
        res.status(400).send(error.message)
        console.error(error)
    }
}