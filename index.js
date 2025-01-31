import express from 'express'
import 'dotenv/config'
const { PORT } = process.env
const app = express()

app.get('/', (req, res) => {
    res.send('Hello There!')
})

app.listen(PORT, () => {
    console.log(`App listening @ http://localhost:${PORT}`)
})
