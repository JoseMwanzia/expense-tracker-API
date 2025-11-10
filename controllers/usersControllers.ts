import Users from "../model/usersModel"
import argon2 from "argon2"

export async function signUp(req: any, res: any) {
    const { name, email, password } = req.body

    try {
        const hashedPassword = await argon2.hash(password)
        const users = await Users.register({ name, email, hashedPassword })
        return res.send(users)
    } catch (error) {
        res.status(400).send(error)
        console.error(error);
    }
}