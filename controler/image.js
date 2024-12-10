import { v4 as uuidv4 } from 'uuid';
import { saveImage } from '../model/imageManager.js';

const desFolderEvents = "./uploads/events";

export const image = (req, res) => {
    const image = req.files.image ? req.files.image[0] : undefined; // Change 'images' to 'image'

    if (!image) {
        return res.status(400).send("Aucune image reçue");
    }

    saveImage(image.buffer, uuidv4(), desFolderEvents)
        .then((savedImagePath) => {
            res.status(201).json({
                imagePath: savedImagePath
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Erreur lors de l'upload de l'image");
        });
};
