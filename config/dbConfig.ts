import postgres from 'postgres'
import 'dotenv/config'
const { DB_URL } = process.env

const sql = postgres(DB_URL!)

export default sql 