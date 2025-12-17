import { DataSource } from "typeorm";
import { Users } from "../entities/Users";
import { Expenses } from "../entities/Expenses";

export const testDataSource = new DataSource({
    type: 'sqlite',
    database: ':memory:',
    dropSchema: true,
    synchronize: true,
    entities: [Users, Expenses]
})