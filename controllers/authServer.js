import argon2 from 'argon2'
import 'dotenv/config'
import Users from '../model/usersModel.js';
import { generateAccessToken, generateRefreshToken } from './jwtGenerators.js';
import { redis } from '../config/redisConfig.js';

export async function login(req, res) {
    // 1.✅ Get the login credentials from the body.
    const { email, password } = req.body;

    try {
        // 2.✅ Hit the database to make a query for the provided email.
        const data = await Users.findByEmail(email)

        // 3.✅ Verify the password provided
        if (await argon2.verify(data.password, password)) {
            // If password is verified, generate tokens
            const token = await generateAccessToken(data)
            const refreshToken = await generateRefreshToken(data)
            return res.status(200).send({token, refreshToken});
        } else {
            return res.status(401).send("Incorrect password.")
        }

    } catch (error) {
        console.error(error.stack);
        return res.status(404).send(error.message)
    }
}

export async function refresh(refreshToken) {

    try {
        const cache = await redis.get(refreshToken, async (err, data) => {
            if(err) return err
            return data
        })
        
        return cache
    } catch (error) {
        throw new Error(error) 
    }
}