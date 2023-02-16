import express from 'express';
import {
    getLaporan,
    saveLaporan,
    getLaporanById,
    deleteLaporan,
    updateLaporan,
    getLikeLaporan,
    getLaporanKhusus,
    getLaporanBulan,
    getLaporanSum,
    getHitungLaporan
} from '../controllers/LaporanController.js';

const router = express.Router();

router.get('/laporan', getLaporan);
router.post('/laporan', saveLaporan);
router.post('/laporan-khusus', getLaporanKhusus);
router.post('/laporan-sum', getLaporanSum);
router.get('/laporan/:id', getLaporanById);
router.delete('/laporan/:id', deleteLaporan);
router.patch('/laporan/:id', updateLaporan);
router.get('/laporan-cari/:word', getLikeLaporan);
router.post('/laporan-bulan', getLaporanBulan);
router.get('/hitunglaporan', getHitungLaporan);


export default router;