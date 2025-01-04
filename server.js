import express from "express";
import cors from "cors";
import multer from "multer";
import { image } from "./controler/image.js";
import internalIp from 'internal-ip';

import { default as Router } from './routes/index.js';
import morgan from 'morgan';
import { logger } from './middleware/logger.js';

const app = express();
const port = 3001;

const storage = multer.memoryStorage();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 // 5 Mo
  },
  storage: storage
});

app.use(cors());
app.use(express.json());
app.use(express.static('./uploads/events'));

app.use(morgan('combined', { stream: { write: (message) => logger.info(message.trim()) } }));

// Gestionnaire d'erreur Multer pour les fichiers trop grands
app.post('/api/v1/uploadImage', upload.fields([
  { name: 'image', maxCount: 1 }
]), (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json("Image too large (Limit 5Mo)");
    }
    return res.status(500).json({ error: 'An error occurred during the file upload.' });
  } else if (err) {
    return res.status(500).json({ error: 'An unexpected error occurred.' });
  }
  next();
}, image);

app.use('/api/v1', Router);

const internalIP = internalIp.v4.sync();

app.listen(port, internalIP, () => {
  console.log(`Exemple de serveur en écoute : http://${internalIP}:${port}`);
});
