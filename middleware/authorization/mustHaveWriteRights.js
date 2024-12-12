import {hasUserWriteRights} from "../../model/accessChecks.js";

export const hasWriteRights = (req, res, next) => {
    if(req.session.status === 'admin'){
        next();
    } else {
        console.log(req.body);
        const userID = req.session.id;
        const discussionID = req.body.discussion_event_id;
        console.log('hasWriteRights', userID, discussionID);
        hasUserWriteRights(userID, discussionID)
            .then((hasAccess) => {
                if(hasAccess){
                    next();
                } else {
                    res.sendStatus(403);
                }
            })
            .catch((error) => {
                console.error('Error checking user access to discussion:', error);
                res.sendStatus(500);
            });
    }
};