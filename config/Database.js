import { Sequelize } from "sequelize";

const db = new Sequelize('pppk', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;