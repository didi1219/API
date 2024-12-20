import express from "express";
import cors from "cors";
import multer from "multer";
import { image } from "./controler/image.js";
import internalIp from 'internal-ip';

import { default as Router } from './routes/index.js';

import morgan from 'morgan'
import { logger } from './middleware/logger.js'
import promClient from 'prom-client'; 
const register = new promClient.Registry();

const app = express();
const port = 3001;

const storage = multer.memoryStorage();
const upload = multer({
  limits: {
    fileSize: 10 * 1024 * 1024
  },
  storage: storage
});

app.use(cors());
app.use(express.json());
app.use(express.static('./uploads/events'));

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

app.use('/api/v1', Router);

app.post('/uploadImage', upload.fields([
  { name: 'image', maxCount: 1 }
]), image);

app.use(Router);

const internalIP = internalIp.v4.sync();

app.listen(port, internalIP, () => {
  console.log(`Exemple of listening : http://${internalIP}:${port}`);
});
