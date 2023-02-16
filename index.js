import express from 'express';
import cors from 'cors';
import FileUpload from 'express-fileupload';
import GuruRoute from './routes/GuruRoute.js';
import LaporanRoute from './routes/LaporanRoute.js';
import UnggahRoute from './routes/UnggahRoute.js';

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(FileUpload());
app.use(GuruRoute);
app.use(LaporanRoute);
app.use(UnggahRoute);

app.listen(5000, () =>  console.log("Server running on port 5000"));