import jwt from 'jsonwebtoken'
import { redis } from '../config/redisConfig'
const { ACCESS_TOKEN, REFRESH_TOKEN, ACCESS_TOKEN_EXPIRES, REFRESH_TOKEN_EXPIRES } = process.env

export async function generateAccessToken(data: Object) {
    return jwt.sign(data, ACCESS_TOKEN!, {expiresIn: Number(ACCESS_TOKEN_EXPIRES)})
}

export async function generateRefreshToken(data: Object) {
    const refreshToken = jwt.sign(data, REFRESH_TOKEN!, {expiresIn: Number(REFRESH_TOKEN_EXPIRES)})

    //✅ store refreshToken in Redis with an expiry, for referencing.
    const storeRefreshToken = await redis.set(refreshToken, JSON.stringify(data), 'EX', 7 * 24 * 60 * 60)

    if (storeRefreshToken) {
        return refreshToken
    } else {
        console.error('Error storing to the redis cache');
        throw new Error ('Error storing to the redis cache');
    }
}