import express from 'express'
import 'dotenv/config'
const { PORT } = process.env
const app = express()
import {router} from './routes/routes.js'

app.use(express.json())
app.use('/',router)

app.listen(PORT, () => {
    console.log(`App listening @ http://localhost:${PORT}`)
})
