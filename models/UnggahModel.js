import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Unggah = db.define('unggah', {
    nama: DataTypes.STRING,
    foto: DataTypes.STRING,
    url: DataTypes.STRING,
}, { freezeTableName: true });

export default Unggah;

(async () => {
    await db.sync();
})();