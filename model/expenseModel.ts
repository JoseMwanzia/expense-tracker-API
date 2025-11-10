import sql from "../config/dbConfig"

export default class Expense {
    static async getAllExpenses( user_id: number, limit: number, offset: number ) {
        try {
            const data = await sql `SELECT * FROM expenses WHERE user_id=${user_id} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset};`
            return data
        } catch (error) {
            throw new Error(`Error querying data from the database, ${error}`)
        }
    }

    static async createExpense( amount: number, category: string, user_id: number) {
        try {
            const data = await sql `INSERT INTO expenses (amount, category, user_id) VALUES (${amount}, ${category}, ${user_id}) RETURNING *;`
            return data
        } catch (error) {
            throw new Error(`Error inserting data to the database, ${error}`)
        }
    }

    static async deleteExpense(user_id: number, expense_id: number) {
        try {
            const deleteData = await sql `DELETE FROM expenses WHERE id=${expense_id} AND user_id = ${user_id} RETURNING id;`
            return deleteData
        } catch (error) {
            throw new Error(`Error deleting data in the database, ${error}`)
        }
    }

    static async updateData(user_id: number, expense_id: number, amount: number) {
        try {
            const updateData = await sql `UPDATE expenses SET amount = ${amount} WHERE id = ${expense_id} AND user_id = ${user_id} RETURNING id, amount, user_id;`
            return updateData
        } catch (error) {
            throw new Error(`Error updating data in the database, ${error}`)
        }
    }
}