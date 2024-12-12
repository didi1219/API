import Router from 'express-promise-router';
import {
    addEvent,
    getDiscussionEvents,
//    updateEvent,
} from '../controler/event.js'
import {checkJWT} from "../middleware/identification/JWT.js";
import {inEvent} from "../middleware/authorization/mustBeInEvent.js";
import {eventValidatorMiddleware as EVM} from "../middleware/validation.js";

const router = new Router();

router.post('/',checkJWT,EVM.eventToAdd,addEvent);
//router.patch('/',checkJWT,EVM.eventToUpdate,updateEvent);

router.get('/:id/discussions', checkJWT, EVM.eventToListDiscussions, inEvent, getDiscussionEvents);

export default router;