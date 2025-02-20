import Redis from 'ioredis'
import 'dotenv/config'
const { REDIS_URL } = process.env

export const redis = new Redis(REDIS_URL)
