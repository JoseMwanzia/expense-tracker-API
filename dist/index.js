"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const { PORT } = process.env;
const app = (0, express_1.default)();
const routes_1 = require("./routes/routes");
const Users_1 = require("./entities/Users");
const { TYPE, USERNAME, HOST, DB_PORT, DATABASE, DB_PASSWORD } = process.env;
const typeorm_1 = require("typeorm");
const Expenses_1 = require("./entities/Expenses");
app.use(express_1.default.json());
app.use(routes_1.router);
exports.AppDataSource = new typeorm_1.DataSource({
    type: TYPE,
    host: HOST,
    port: DB_PORT ? parseInt(DB_PORT, 10) : undefined,
    username: USERNAME,
    password: DB_PASSWORD,
    database: DATABASE,
    entities: [Users_1.Users, Expenses_1.Expenses],
    synchronize: true,
});
(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield exports.AppDataSource.initialize()
            .then(() => {
            console.log('Datasource has been initialized!');
            app.listen(PORT, () => {
                console.log(`App listening @ http://localhost:${PORT}`);
            });
        })
            .catch((err) => {
            console.error('❌ Error during Data Source initialization:', err);
            throw new Error("Unable to connect to the database!");
        });
    });
})();
//# sourceMappingURL=index.js.map