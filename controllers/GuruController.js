import { Sequelize } from "sequelize";
import Guru from "../models/GuruModel.js";

const Op = Sequelize.Op;

export const getGuru = async (req, res) => {
    try {
        const response = await Guru.findAll({
            limit: 30,
            order:[
                ['nama']
            ]
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get guru berdasarkan nip
export const getGuruNip = async (req, res) => {
    try {
        const response = await Guru.findOne({
            where:{
                nip: req.params.nip,
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//get guru berdasarkan id untuk keperluan edit
export const getGuruToEdit = async (req, res) => {
    try {
        const response = await Guru.findOne({
            where:{
                id: req.body.id,
            }
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//cek sebelum input data guru

export const saveGuruCek = async (req, res) => {
    try {
        const response = await Guru.count({
            where :{
                nip : req.body.nip
            }
        })
        res.json(response)
    } catch (error) {
        console.log(error.message);
    }
}

// input data guru 

export const saveGuru = async (req, res) => {
    try {
        const response = await Guru.create(req.body);
        res.status('201').json({ msg: 'Guru Berhasil Diinput' });
    } catch (error) {
        console.log(error.message);
    }
}

export const getGuruById = async (req, res) => {
    try {
        const response = await Guru.findOne({
            where: {
                id: req.params.id,
            }
        });
        res.json(response);
    } catch (error) {

    }
}

export const deleteGuru = async (req, res) => {
    try {
        const response = await Guru.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status('201').json({ msg: "Guru berhasil dihapus" });
    } catch (error) {
        console.log(err.message);
    }
}

export const updateGuru = async (req, res) => {
    try {
        const response = await Guru.update({nama:req.body.nama,nip:req.body.nip}, {
            where: {
                id: req.params.id,
            }
        });
        res.status('201').json({ msg: "Data Produk berhasil di ubah" });
        // res.json(req.body.nama);
    } catch (error) {
        console.log(err.message);
    }
}

export const getLikeGuru = async (req, res) => {
    try {
        const response = await Guru.findAll({
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