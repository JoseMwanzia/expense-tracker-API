import fs from 'fs'
import sql from './dbConfig.js'
import path from 'path'
const __dirname = path.resolve()

if (process.argv[2] == 'create_users_table') { // node migrate.js create_users_table
    runMigration('001_users_table.sql')
} else if (process.argv[2] == 'drop_users_table') {
    runMigration('001_drop_users.sql')
} else if (process.argv[2] == 'create_expenses_table') {
    runMigration('002_create_expenses_table.sql')
} else if (process.argv[2] == 'drop_expenses_table') {
    runMigration('002_drop_expenses_table.sql')
}

async function runMigration(fileName) {
    try {
        const filePath = path.join(__dirname, 'migrations', fileName)
        const query = fs.readFileSync(filePath, 'utf8')

        await sql.begin(async (sql) => {
            await sql.unsafe(query);
        })

        console.info(`Migration applied succesfully! ✅ ✅ ✅`);
        await sql.end()
    } catch (err) {
        console.error(`Error applying migration `, err.message);
    }
}
