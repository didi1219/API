import Router from 'express-promise-router';

import {
    getDiscussionEvent,
    addDiscussionEvent,
    updateDiscussionEvent,
    deleteDiscussionEvent,
    getMessagesInDiscussion,
    getNewerMessagesInDiscussion,
    getOlderMessagesInDiscussion
} from "../controler/discussionEvent.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {inDiscussion} from "../middleware/authorization/mustBeInDiscussion.js";
import {discussionEventValidatorMiddleware as DVM} from "../middleware/validation.js";

const router = Router();

router.get('/:id', checkJWT, admin, DVM.searchedDiscussionEvent, getDiscussionEvent);
router.post('/',checkJWT,admin,DVM.discussionEventToAdd, addDiscussionEvent);
router.patch('/',checkJWT,admin,DVM.discussionEventToUpdate, updateDiscussionEvent);
router.delete('/:id',checkJWT,admin,DVM.discussionEventToDelete, deleteDiscussionEvent);

router.get('/:id/messages/:offset', checkJWT, inDiscussion, DVM.discussionEventToListMessages, getMessagesInDiscussion);
router.get('/:id/newerMessages/:nextMessageID', checkJWT, DVM.discussionEventToListNewerMessages, inDiscussion, getNewerMessagesInDiscussion);
router.get('/:id/olderMessages/:previousMessageID', checkJWT, DVM.discussionEventToListOlderMessages, inDiscussion, getOlderMessagesInDiscussion);

export default router;