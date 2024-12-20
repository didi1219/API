import { v4 as uuidv4 } from 'uuid';
import { saveImage } from '../model/imageManager.js';
import {logger} from '../middleware/logger.js';

const desFolderEvents = "./uploads/events";

export const image = (req, res) => {
    const image = req.files.image ? req.files.image[0] : undefined; // Change 'images' to 'image'

    if (!image) {
        logger.warn("No image received in the request");
        return res.status(400).send("Aucune image reçue");
    }

    logger.info(`Received image with original name: ${image.originalname}`);

    saveImage(image.buffer, uuidv4(), desFolderEvents)
        .then((savedImagePath) => {
            logger.info(`Image successfully uploaded and saved at: ${savedImagePath}`);
            res.status(201).json({
                imagePath: savedImagePath
            });
        })
        .catch((err) => {
            logger.error(`Error occurred while uploading the image: ${JSON.stringify(err.message, null, 2)}`);
            res.status(500).send("Erreur lors de l'upload de l'image");
        });
};
