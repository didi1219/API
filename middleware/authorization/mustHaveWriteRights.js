import {hasUserWriteRights} from "../../model/accessChecks.js";
import {logger} from '../logger.js';

export const hasWriteRights = (req, res, next) => {
    logger.info('Checking the Write permissions of the user');
    if(req.session.status === 'admin'){
        logger.info('Has all permissions => Admin');
        next();
    } else {
        logger.warn('Not Admin');
        const userID = req.session.id;
        const discussionID = req.body.discussion_event_id;
        logger.info('Checking the permissions...');
        hasUserWriteRights(userID, discussionID)
            .then((hasAccess) => {
                if(hasAccess){
                    logger.info('Successfully check => has permissions')
                    next();
                } else{
                    logger.warn('Has no permissions')
                    res.sendStatus(403);
                }
            })
            .catch((error) => {
                logger.error(`Error when checking Acces: ${JSON.stringify(error.messages, null, 2)}`);
                res.sendStatus(500);
            });
    }
};