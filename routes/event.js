import Router from 'express-promise-router';
import {
    addEvent,
    updateEvent,
    getEventSubscribed,
    getEventCreated
} from '../controler/event.js'
import {checkJWT} from "../middleware/identification/JWT.js";
import {eventValidatorMiddleware as EVM} from "../middleware/validation.js";

const router = new Router();

router.post('/',checkJWT,EVM.eventToAdd,addEvent);
router.patch('/',checkJWT,EVM.eventToUpdate,updateEvent);

router.get('/subscribed',checkJWT,getEventSubscribed);
router.get('/created',checkJWT,getEventCreated);

export default router;