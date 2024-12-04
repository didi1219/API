import { v4 as uuidv4 } from 'uuid';
import { saveImage} from "../model/imageManager.js";


const desFolderEvents = "./uploads/events";


export const image = (req, res) => {
    const images = req.files.images ? req.files.images[0] : undefined;

    const promises = [];

    promises.push(
        saveImage(images.buffer, uuidv4(), desFolderEvents)
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