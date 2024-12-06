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
import {discussionEventValidatorMiddleware as DVM} from "../middleware/validation.js";

const router = Router();

router.get('/:id',DVM.searchedDiscussionEvent, getDiscussionEvent);
router.post('/',checkJWT,admin,DVM.discussionEventToAdd, addDiscussionEvent);
router.patch('/',checkJWT,admin,DVM.discussionEventToUpdate, updateDiscussionEvent);
router.delete('/:id',checkJWT,admin,DVM.discussionEventToDelete, deleteDiscussionEvent);

// Ajouter un middleware de validation et autorisation
router.get('/:id/messages/:offset',checkJWT,getMessagesInDiscussion);
router.get('/:id/newerMessages/:nextMessageID', getNewerMessagesInDiscussion);
router.get('/:id/olderMessages/:previousMessageID', getOlderMessagesInDiscussion);

export default router;