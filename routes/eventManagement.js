import Router from 'express-promise-router';
import {
    getEvent,
    addEvent,
    deleteEvent,
    updateEvent,
    getDiscussionEvents,
    getEvents,
    getTotalRowEvent
} from '../controler/eventManagement.js'
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {eventManagementValidatorMiddleware as EVM} from "../middleware/validation.js";

const router = new Router();

router.get('/:id',EVM.searchedEvent,getEvent);
router.post('/',checkJWT,admin,EVM.eventToAdd, addEvent);
router.delete('/:id',checkJWT, admin, EVM.eventToDelete, deleteEvent);
router.patch('/',checkJWT,admin,EVM.eventToUpdate,updateEvent);


router.get('/nbEvents/search?',checkJWT,EVM.searchedEvents,getEvents);
router.get('/nbEvents/totalCount/',checkJWT,getTotalRowEvent);


router.get('/discussionEvent/:id',checkJWT,getDiscussionEvents);

export default router;