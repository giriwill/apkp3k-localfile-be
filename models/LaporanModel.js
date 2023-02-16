import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Laporan = db.define('laporan', {
    nip: DataTypes.STRING,
    tanggal: DataTypes.STRING,
    bulan: DataTypes.STRING,
    tahun: DataTypes.STRING,
    hari: DataTypes.STRING,
    durasi: DataTypes.STRING,
    dari: DataTypes.STRING,
    sampai: DataTypes.STRING,
    kegiatan: DataTypes.TEXT,
    foto: DataTypes.STRING,
    url: DataTypes.STRING,
}, { freezeTableName: true });

export default Laporan;

(async () => {
    await db.sync();
})();