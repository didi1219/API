import {isUserOwnerOfEvent} from "../../model/accessChecks.js";
import {logger} from '../logger.js';

export const isOwner = (req, res, next) => {
    logger.info('Check if user is the owner of the event');

    if (req.session.status === 'admin') {
        logger.info('User is admin => full access');
        next();
    } else {
        logger.warn('User is not an admin');
        const userID = req.session.id;
        const eventID = req.val.event_id;

        logger.info('Checking ownership');
        isUserOwnerOfEvent(userID, eventID)
            .then((isOwner) => {
                if (isOwner) {
                    logger.info('Successfully verified => user is the owner');
                    next();
                } else {
                    logger.warn('User is not the owner');
                    res.sendStatus(403); // Accès refusé
                }
            })
            .catch((error) => {
                logger.error(`Error when checking ownership: ${JSON.stringify(error.message, null, 2)}`);
                res.sendStatus(500); // Erreur interne du serveur
            });
    }
};
