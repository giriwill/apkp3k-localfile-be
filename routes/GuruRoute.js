import express from 'express';
import {
    getGuru,
    saveGuru,
    saveGuruCek,
    getGuruById,
    deleteGuru,
    updateGuru,
    getLikeGuru,
    getGuruNip,
    getGuruToEdit
} from '../controllers/GuruController.js';

const router = express.Router();

router.get('/guru', getGuru);
router.post('/gurucek', saveGuruCek);
router.post('/guru', saveGuru);
router.get('/guru/:id', getGuruById);
router.delete('/guru/:id', deleteGuru);
router.put('/guru/:id', updateGuru);
router.get('/guru-cari/:word', getLikeGuru);
router.get('/guru-nip/:nip', getGuruNip);
router.post('/guru-edit', getGuruToEdit);


export default router;