import sql from "../config/dbConfig.js";

export default class Users {
    static async register(data) {
        try {
            const users = await sql `INSERT INTO users (name, email, password) VALUES (${data.name}, ${data.email}, ${data.hashedPassword}) RETURNING name, email;`
            return users
        } catch (error) {
            throw new Error(error)
        }
    }
}
