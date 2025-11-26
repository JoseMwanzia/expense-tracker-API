import express from 'express'
import 'dotenv/config'
const { PORT } = process.env
const app = express()
import {router} from './routes/routes'
import {Users} from './entities/Users'
const { TYPE, USERNAME, HOST,DB_PORT, DATABASE, DB_PASSWORD } = process.env
import { DataSource } from 'typeorm'
import { Expenses } from './entities/Expenses'

app.use(express.json())
app.use(router)

export const AppDataSource = new DataSource({
    type: TYPE as 'postgres',
    host: HOST,
    port: DB_PORT ? parseInt(DB_PORT, 10) : undefined,
    username: USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    entities: [Users, Expenses],
    synchronize: true,
});

(async function() {
    await AppDataSource.initialize()
    .then(() => {
        console.log('Datasource has been initialized!')

        app.listen(PORT, () => {
            console.log(`App listening @ http://localhost:${PORT}`)
        })
    })
    .catch((err: any) => {
        console.error('❌ Error during Data Source initialization:', err);
        throw new Error("Unable to connect to the database!")
    });
})()
