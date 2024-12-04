import express from "express";
import cors from "cors";
import multer from "multer";
import { image } from "./controler/image.js";
import internalIp from 'internal-ip';

import {default as Router} from './routes/index.js';
const app = express();
const port = 3001;

const storage = multer.memoryStorage();
const upload = multer({
    limits: {
        fileSize: 700000
    },
    storage: storage
});

app.use(cors());

app.use(express.json());
app.use(express.static('./uploads/events'));

app.post('/uploadImage',upload.fields([
    { name: 'image', maxCount: 1}
]), image);


app.use(Router);

const internalIP = internalIp.v4.sync();


app.listen(port,internalIP, () => {
    console.log(`Exemple of listening : http://${internalIP}:${port}`);
});
/*
app.listen(port, () => {
    console.log(Exemple of listening : http://localhost:${port});
});*/