import Router from 'express'

import {
    getDiscussionEvent,
    createDiscussionEvent,
    updateDiscussionEvent,
    deleteDiscussionEvent,
    getMessages, getNewerMessages, getOlderMessages,
} from "../controler/discussionEvent.js"

const router = Router();

router.get('/:id', getDiscussionEvent);
router.post('/', createDiscussionEvent);
router.patch('/', updateDiscussionEvent);
router.delete('/:id', deleteDiscussionEvent);

router.get('/:id/messages/:offset', getMessages);
router.get('/:id/newerMessages/:nextMessageID', getNewerMessages);
router.get('/:id/olderMessages/:previousMessageID', getOlderMessages);

export default router;