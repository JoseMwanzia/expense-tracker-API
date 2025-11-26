import jwt from 'jsonwebtoken'
import { redis } from '../config/redisConfig'
import 'dotenv/config'
const { ACCESS_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = process.env



export function generateAccessToken(data: Object) {
    if (!ACCESS_TOKEN) {
        throw new Error("ACCESS_TOKEN is not defined in environment variables");
    }
    return jwt.sign(data, ACCESS_TOKEN, { expiresIn: ACCESS_TOKEN_EXPIRES as any });
}

export async function generateRefreshToken(data: object) {
    if (!REFRESH_TOKEN) {
        throw new Error("REFRESH_TOKEN is not defined in environment variables");
    }
    const refreshToken = jwt.sign(data, REFRESH_TOKEN, {expiresIn: REFRESH_TOKEN_EXPIRES as any})

    //✅ store refreshToken in Redis with an expiry, for referencing.
    const storeRefreshToken = await redis.set(refreshToken, JSON.stringify(data), 'EX', 7 * 24 * 60 * 60)

    if (storeRefreshToken) {
        return refreshToken
    } else {
        console.error('Error storing to the redis cache');
        throw new Error ('Error storing to the redis cache');
    }
}