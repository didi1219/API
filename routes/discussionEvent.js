import Router from 'express-promise-router';

import {
    getDiscussionEvent,
    addDiscussionEvent,
    updateDiscussionEvent,
    deleteDiscussionEvent,
    getMessagesInDiscussion,
    getNbDiscussionsEvent,
    countNbRows,
    deleteDiscussionEvents,
    getNewerMessagesInDiscussion,
    getOlderMessagesInDiscussion,
    getAllDiscussionTitle
} from "../controler/discussionEvent.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {discussionEventValidatorMiddleware as DVM, tabValidatorMiddleware as TabVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {tabIds} from "../middleware/validator/tabValidator.js";
import {inDiscussion} from "../middleware/authorization/mustBeInDiscussion.js";

const router = Router();

router.get('/:id', checkJWT, admin, DVM.searchedDiscussionEvent, getDiscussionEvent);
router.post('/',checkJWT,admin,DVM.discussionEventToAdd, addDiscussionEvent);
router.patch('/',checkJWT,admin,DVM.discussionEventToUpdate, updateDiscussionEvent);
router.delete('/:id',checkJWT,admin,DVM.discussionEventToDelete, deleteDiscussionEvent);

router.get('/:id/messages/:offset', checkJWT, DVM.discussionEventToListMessages, inDiscussion, getMessagesInDiscussion);
router.get('/:id/newerMessages/:nextMessageID', checkJWT, DVM.discussionEventToListNewerMessages, inDiscussion, getNewerMessagesInDiscussion);
router.get('/:id/olderMessages/:previousMessageID', checkJWT, DVM.discussionEventToListOlderMessages, inDiscussion, getOlderMessagesInDiscussion);

router.get('/get/allTitle',checkJWT,getAllDiscussionTitle);

router.get('/nbDiscussionsEvent/search',checkJWT, PagingVM.paging,getNbDiscussionsEvent);
router.get('/nbDiscussionsEvent/count/', checkJWT, countNbRows);

router.delete('/many/deleteDiscussionEvent/', checkJWT,admin,tabIds,TabVM.ids,deleteDiscussionEvents)

export default router;