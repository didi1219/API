import Router from 'express-promise-router';

import {
    getDiscussionEvent,
    addDiscussionEvent,
    updateDiscussionEvent,
    deleteDiscussionEvent,
    getMessagesInDiscussion,
    getAllDiscussionPaging,
    countNbRows
} from "../controler/discussionEvent.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {discussionEventValidatorMiddleware as DVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";

const router = Router();

router.get('/:id',checkJWT,DVM.searchedDiscussionEvent, getDiscussionEvent);
router.post('/',checkJWT,admin,DVM.discussionEventToAdd, addDiscussionEvent);
router.patch('/',checkJWT,admin,DVM.discussionEventToUpdate, updateDiscussionEvent);
router.delete('/:id',checkJWT,admin,DVM.discussionEventToDelete, deleteDiscussionEvent);

// Ajouter un middleware de validation et autorisation
router.get('/:id/messages/:offset',checkJWT,getMessagesInDiscussion);

router.get('/getall/paging?',checkJWT, PagingVM.paging,getAllDiscussionPaging);
router.get('/nbRows/count/', checkJWT, countNbRows);

export default router;