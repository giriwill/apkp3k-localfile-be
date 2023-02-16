import { Sequelize } from "sequelize";
import Unggah from "../models/UnggahModel.js";
import path from "path";
import fs from "fs";

const Op = Sequelize.Op;

export const getUnggah = async (req, res) => {
    try {
        const response = await Unggah.findAll({
            order:[
                ['id']
            ]
        })
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
}


export const saveUnggah = async (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const name = req.body.nama;
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = ['.png','.jpg','.jpeg'];

    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});

    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Unggah.create({nama: name, foto: fileName, url: url});
            res.status(201).json({msg: "Unggah Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    })
}

export const deleteUnggah = async (req, res) => {
    try {
        const response = await Unggah.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status('201').json({ msg: "Unggah berhasil dihapus" });
    } catch (error) {
        console.log(err.message);
    }
}