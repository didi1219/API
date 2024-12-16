import Router from 'express-promise-router';
import {
    getEvent,
    addEvent,
    deleteEvent,
    updateEvent,
    getDiscussionEvents,
    getEvents,
    getTotalRowEvent,
    deleteEvents,
    addEventWithInvitations
} from '../controler/eventManagement.js'
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {eventManagementValidatorMiddleware as EVM, tabValidatorMiddleware as TabVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {tabIds} from "../middleware/validator/tabValidator.js";


const router = new Router();

router.get('/:id',EVM.searchedEvent,getEvent);
router.post('/',checkJWT,admin,EVM.eventToAdd, addEvent);
router.delete('/:id',checkJWT, admin, EVM.eventToDelete, deleteEvent);
router.patch('/',checkJWT,admin,EVM.eventToUpdate,updateEvent);


router.get('/nbEvents/search?',checkJWT,PagingVM.paging,getEvents);
router.get('/nbEvents/totalCount/',checkJWT,getTotalRowEvent);

router.get('/discussion/event',checkJWT, PagingVM.pagingWithId,getDiscussionEvents);

router.delete('/many/deleteEvent',checkJWT,TabVM.ids,deleteEvents);

router.post('/createPrivate/withInvitation/',checkJWT,EVM.eventToAddWithInvitation,addEventWithInvitations);


export default router;