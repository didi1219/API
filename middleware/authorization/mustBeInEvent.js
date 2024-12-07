import {isUserInEvent} from "../../util/accessChecks.js";

export const inEvent = (req, res, next) => {
    if(req.session.status === 'admin'){
        next();
    } else {
        const userID = req.session.id;
        const eventID = req.params.id;
        isUserInEvent(userID, eventID)
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