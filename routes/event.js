import Router from 'express-promise-router';
import {
    getNbEventsOfUserCreated,
    getAllEventsOfUserSubscribed,
    addEventOneSelf,
    deleteEventOneSelf,
    updateEventOneSelf,
    getEvent,
    addEvent,
    deleteEvent,
    updateEvent,
    getDiscussionEvents,
    getNbEvents,
    getTotalRowEvent,
    getAllEventTitle,
    deleteEvents
    getNbSubscribers,
} from '../controler/event.js'
import {
    eventManagementValidatorMiddleware as EMVM,
    eventValidatorMiddleware as EVM,
    tabValidatorMiddleware as TabVM
} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {inEvent} from "../middleware/authorization/mustBeInEvent.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";

const router = new Router();

router.get('/created',checkJWT,PagingVM.paging,getNbEventsOfUserCreated);
router.get('/subscribed',checkJWT,PagingVM.paging,getAllEventsOfUserSubscribed);
router.get('/nbSubscribers/:id',checkJWT,EVM.searchedEvent,getNbSubscribers);
router.post('/oneself/',checkJWT,EVM.eventToAdd,addEventOneSelf);
router.patch('/oneself/',checkJWT,EVM.eventToUpdate,updateEventOneSelf);
router.delete('/:id',checkJWT,EVM.eventToDelete,deleteEventOneSelf);

//Diff ?
router.get('/:id/discussions', checkJWT,admin, EVM.eventToListDiscussions, inEvent, getDiscussionEvents);
router.get('/discussion/event',checkJWT,admin, PagingVM.pagingWithId,getDiscussionEvents);

// admin
router.get('/id/:id',EMVM.searchedEvent,getEvent);
router.post('/',checkJWT,admin,EMVM.eventToAdd, addEvent);
router.delete('/delete/:id',checkJWT, admin, EMVM.eventToDelete, deleteEvent);
router.patch('/',checkJWT,admin,EMVM.eventToUpdate,updateEvent);

router.get('/get/allTitle',getAllEventTitle);

router.get('/nbEvents/search',checkJWT,PagingVM.paging,getNbEvents);
router.get('/nbEvents/count/',checkJWT,getTotalRowEvent);

router.delete('/many/deleteEvent/',checkJWT,admin,TabVM.ids,deleteEvents);



export default router;