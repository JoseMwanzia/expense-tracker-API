import fs from 'fs'
import sql from './dbConfig.js'
import path from 'path'
const __dirname = path.resolve()

if (process.argv[2] == 'create_users_table') {
    runMigration()
} else if (process.argv[2] == 'drop_users_table') {
    dropUsersTable()
}

async function runMigration() {
    try {
        const filePath = path.join(__dirname, 'migrations', '001_users_table.sql')
        const query = fs.readFileSync(filePath, 'utf8')

        await sql.begin(async (sql) => {
            await sql.unsafe(query);
        })

        console.info(`Migration  applied succesfully!`);
        await sql.end()
    } catch (err) {
        console.error(`Error applying migration `, err);
    }
}

async function dropUsersTable() {
    try {
        const filePath = path.join(__dirname, 'migrations', '001_drop_users.sql')
        const query = fs.readFileSync(filePath, 'utf8')

        await sql.begin(async (sql) => {
            await sql.unsafe(query);
        })

        console.info(`Table droped succesfully!`);
        await sql.end()
    } catch (error) {
        console.error(error);
    }
}
