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

    static async findByEmail(email) {
        try {
            const data =  await sql `SELECT id, name, email, password FROM users WHERE email=${email}`
            if (data.length === 0) throw new Error('Email not found!');
            return data[0]
        } catch (error) {
            throw new Error(error)   
        }
    }
}
