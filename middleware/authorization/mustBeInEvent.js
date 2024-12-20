import {isUserInEvent} from "../../model/accessChecks.js";
import {logger} from '../logger.js';

export const inEvent = (req, res, next) => {
    logger.info('Check if user is in the event')
    if(req.session.status === 'admin'){
        logger.info('He is admin => full access')
        next();
    } else {
        logger.warn('No admin')
        const userID = req.session.id;
        const eventID = req.val.id;
        logger.info('Checking acces');
        isUserInEvent(userID, eventID)
            .then((hasAccess) => {
                if(hasAccess){
                    logger.info('Successfully check => has access')
                    next();
                } else {
                    logger.warn('Has no access');
                    res.sendStatus(403);
                }
            })
            .catch((error) => {
                logger.error(`Error when checking Acces: ${JSON.stringify(error.messages, null, 2)}`);
                res.sendStatus(500);
            });
    }
};