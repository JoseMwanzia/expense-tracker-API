import { Request, Response } from "express"
import {Users} from "../entities/Users"
import argon2 from "argon2"

export async function signUp(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body

    try {
        const hashedPassword = await argon2.hash(password)
        
        const users = Users.create({ name, email, password: hashedPassword })
        await users.save()
        // return res.status(200).send(users)
    } catch (error) {
        console.error(error);
        return res.status(400).send(error)
    }
}