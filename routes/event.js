import Router from 'express-promise-router';
import {
    addEvent,
    updateEvent,
    getDiscussionEvents,
} from '../controler/event.js'
import {checkJWT} from "../middleware/identification/JWT.js";
import {eventValidatorMiddleware as EVM} from "../middleware/validation.js";

const router = new Router();

router.post('/',checkJWT,EVM.eventToAdd,addEvent);
//router.patch('/',checkJWT,EVM.eventToUpdate,updateEvent);

router.get('/:id/discussionEvent',getDiscussionEvents);

router.get('/:id/discussionEvent',getDiscussionEvents);

export default router;