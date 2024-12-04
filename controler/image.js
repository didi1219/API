import { v4 as uuidv4 } from 'uuid';
import { saveImage } from '../model/imageManager.js';

const desFolderEvents = "./uploads/events";

export const image = (req, res) => {
    const image = req.files.image ? req.files.image[0] : undefined; // Change 'images' to 'image'

    if (!image) {
        return res.status(400).send("Aucune image reçue");
    }

    const promises = [];

    promises.push(
        saveImage(image.buffer, uuidv4(), desFolderEvents)
    );

    Promise.all(promises)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        })
};
