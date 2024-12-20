import {logger} from '../logger.js';

export const decodeQuery = (req, res, next) => {
    logger.info(`Decode the query`);
    for (let key in req.query) {
            req.query[key] = decodeURI(req.query[key]);
            req.query[key] = req.query[key].replace(/\+/g, ' ');
    }
    next();
};