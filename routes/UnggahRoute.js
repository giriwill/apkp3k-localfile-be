import express from 'express';
import {
    getUnggah,
    saveUnggah,
    deleteUnggah
} from '../controllers/UnggahController.js';

const router = express.Router();

router.post('/unggah', saveUnggah);


export default router;