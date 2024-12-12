import {isUserInDiscussion} from "../../model/accessChecks.js";

export const inDiscussion = (req, res, next) => {
    if(req.session.status === 'admin'){
        next();
    } else {
        const userID = req.session.id;
        const discussionID = req.val.discussion_event_id;
        isUserInDiscussion(userID, discussionID)
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