import {isUserInDiscussion} from "../../model/accessChecks.js";
import {logger} from '../logger.js';

export const inDiscussion = (req, res, next) => {
    logger.info('Check if user have acces at discussion')
    if(req.session.status === 'admin'){
        logger.info('Successfully check => He is admin');
        next();
    } else {
        logger.warn('Not admin');
        const userID = req.session.id;
        const discussionID = req.val.id;
        logger.info('Checking if he is in the discussion/event');
        isUserInDiscussion(userID, discussionID)
            .then((hasAccess) => {
                if(hasAccess){
                    logger.info('Successfully check => has access');
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