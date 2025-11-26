import { AppDataSource } from "../index";
import { Expenses } from "../entities/Expenses";
import getDateRange from "../middlewares/utils/getDateRange";
import { Users } from "../entities/Users";
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request{
    user?: any
}

export async function expenses(req: AuthenticatedRequest, res: Response) {
    const {duration, startDate, endDate} = req.query
    const  user_id = req.user.id

     const user = await Users.findOne({
            where: {id: parseInt(user_id)},
        })
    
    let page = Number(req.query.page) || 1; // Current page (default: 1)
    let limit = Number(req.query.limit) || 10; // Items per page (default: 10)
    let offset = (page - 1) * limit;
    
    try {
        const dateRange = getDateRange({duration, startDate, endDate});
        const userRepository = AppDataSource.getRepository(Expenses);
        const data = await userRepository
            .createQueryBuilder('expenses')
            .skip(offset)
            .take(limit)
            .where("expenses.user_id = :user_id", { user_id })
            .getMany()

        // Convert dateRange to Date objects for comparison
        const start = new Date(dateRange.startDate);
        const end = new Date(dateRange.endDate);

        // Filter data between start and end (inclusive)
        const filteredData = data.filter((item) => {
            const created = new Date(item.created_at);
            return created >= start && created <= end;
        });

        startDate || duration ? res.status(200).send({filteredData}) : res.status(200).send( {data})

    } catch (error) {
        res.status(400).send(error.message)
        console.error(error.message)
    }
}

export async function createExpenses(req: AuthenticatedRequest, res: Response) {
    try {
        const user_id = req.user.id
        const {amount, category} = req.body

        const user = await Users.findOne({
            where: {id: parseInt(user_id)},
        })

        if (!user) return res.status(400).send('User not found. Login Again')

        const expense = Expenses.create({
            amount, category, user_id: user.id // used user.id to remove nested relations
        })

        await expense.save()
        return res.status(200).send(expense)    
    } catch (error) {
        console.error(error)
        return res.status(400).send(error.message)
    }
}

export async function deleteExpense(req: AuthenticatedRequest, res: Response) {
    try {
        const expense_id = req.params.id
        const user_id = req.user.id

        if (!expense_id) return res.status(400).send('User not found. Login Again')

        const response = await Expenses.createQueryBuilder()
            .delete()
            .where("id = :expense_id", { expense_id })
            .andWhere("user_id = :user_id", { user_id })
            .execute();

        return res.status(200).send(response)
    } catch (error) {
        console.error(error)
        return res.status(400).send(error.message)
    }
}

export async function updateExpense(req: AuthenticatedRequest, res: Response) {
    try {
        const user_id = req.user.id
        const {id} = req.params;
        const {amount, category} = req.body;
        
        const user = await Expenses.findOne({
            where: {user_id: parseInt(user_id)}
        })

        if (!user) return res.status(400).send('Please login again!')

        const data = await Expenses.update(id, {amount, category})

        if (data.affected === 0) return res.status(400).send('Expense does not exist!')

        return res.status(200).send({msg: 'Expense updated!', data})
    } catch (error) {
        console.error(error)
        return res.status(400).send(error.message)
    }
}