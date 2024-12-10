
import Router from 'express-promise-router';
import {
    getAllEventsOfUserCreated,
    getAllEventsOfUserSubscribed,
    addEvent,
    deleteEvent,
    updateEvent,

} from '../controler/event.js'
import {checkJWT} from "../middleware/identification/JWT.js";
import {eventValidatorMiddleware as EVM} from "../middleware/validation.js";

const router = new Router();

router.get('/created/',checkJWT,getAllEventsOfUserCreated);
router.get('/subscribed/',checkJWT,getAllEventsOfUserSubscribed);
router.post('/',checkJWT,EVM.eventToAdd,addEvent);
router.patch('/',checkJWT,EVM.eventToUpdate,updateEvent);
router.delete('/:id',checkJWT,EVM.eventToDelete,deleteEvent);

export default router;