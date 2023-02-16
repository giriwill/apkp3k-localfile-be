import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Guru = db.define('guru', {
    nama: DataTypes.STRING,
    nip: DataTypes.STRING,
    jenis: DataTypes.STRING
}, { freezeTableName: true });

export default Guru;

(async () => {
    await db.sync();
})();