import sql from "../config/dbConfig"

export default class Expense {
    static async getAllExpenses( user_id, limit, offset ) {
        try {
            const data = await sql `SELECT * FROM tasks WHERE user_id=${user_id} ORDER BY id DESC LIMIT ${limit} OFFSET ${offset};`
            return data
        } catch (error) {
            throw new Error(`Error querying data from the database, ${error}`)
        }
    }
}