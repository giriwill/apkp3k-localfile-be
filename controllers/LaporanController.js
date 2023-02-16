import { Sequelize } from "sequelize";
import Laporan from "../models/LaporanModel.js";
import path from "path";
import fs from "fs";

const Op = Sequelize.Op;

export const getLaporan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            order: [
                ['id']
            ]
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get jumlah menit berdasarkan nip tanggal bulan tahun
export const getHitungLaporan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            attributes: [
                'nip',
                [Sequelize.fn('count', Sequelize.col('nip')), 'count'],
            ],
            group: ['nip']
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get laporan berdasarkan nip dan tanggal dan bulan dan tahun
export const getLaporanKhusus = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            where: {
                nip: req.body.nip,
                tanggal: req.body.tanggal,
                bulan: req.body.bulan,
                tahun: req.body.tahun
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get jumlah menit berdasarkan nip tanggal bulan tahun
export const getLaporanSum = async (req, res) => {
    try {
        const response = await Laporan.sum('durasi', {
            where: {
                nip: req.body.nip,
                tanggal: req.body.tanggal,
                bulan: req.body.bulan,
                tahun: req.body.tahun
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get laporan bulanan
export const getLaporanBulan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            where: {
                nip: req.body.nip,
                bulan: req.body.bulan
            },
            order: [
                ['tanggal']
            ]
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const saveLaporan = async (req, res) => {
    if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
    const nip = req.body.nip;
    const tanggal = req.body.tanggal;
    const bulan = req.body.bulan;
    const tahun = req.body.tahun;
    const hari = req.body.hari;
    const dari = req.body.dari;
    const sampai = req.body.sampai;
    const durasi = req.body.durasi;
    const kegiatan = req.body.kegiatan;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    file.mv(`./public/images/${fileName}`, async (err) => {
        if (err) return res.status(500).json({ msg: err.message });
        try {
            await Laporan.create({
                nip: nip,
                tanggal : tanggal,
                bulan:bulan,
                tahun:tahun,
                hari:hari,
                dari:dari,
                sampai:sampai,
                durasi:durasi,
                kegiatan:kegiatan,
                foto: fileName,
                url: url
                // update durasi 
            });
            res.status(201).json({ msg: "Laporan Created Successfuly" });
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const getLaporanById = async (req, res) => {
    try {
        const response = await Laporan.findOne({
            where: {
                id: req.params.id,
            }
        });
        res.json(response);
    } catch (error) {

    }
}

export const deleteLaporan = async (req, res) => {
    try {
        const laporanku = await Laporan.findOne({
            where:{
                id : req.params.id
            }
        });
        const filepath = `./public/images/${laporanku.foto}`;
        fs.unlinkSync(filepath);
            
        if(!laporanku) return res.status(404).json({msg: "No Data Found"});
    } catch (error) {
        
    }

    try {
        const response = await Laporan.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status('201').json({ msg: "Laporan berhasil dihapus" });
    } catch (error) {
        console.log(err.message);
    }
}

export const updateLaporan = async (req, res) => {
    try {
        const response = await Laporan.update(req.body, {
            where: {
                id: req.params.id,
            }
        });
        res.status('201').json({ msg: "Data Produk berhasil di ubah" });
    } catch (error) {
        console.log(err.message);
    }
}

export const getLikeLaporan = async (req, res) => {
    try {
        const response = await Laporan.findAll({
            where: {
                nama: {
                    [Op.like]: '%' + req.params.word + '%'
                }
            }
        });
        res.json(response);
    } catch (error) {
        console.log(err.message);
    }
}