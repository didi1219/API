import Router from 'express'

import {
    getDiscussionEvent,
    createDiscussionEvent,
    updateDiscussionEvent,
    deleteDiscussionEvent,
    getMessages,
} from "../controler/discussionEvent.js"

const router = Router();

router.get('/:id', getDiscussionEvent);
router.post('/', createDiscussionEvent);
router.patch('/', updateDiscussionEvent);
router.delete('/:id', deleteDiscussionEvent);

router.get('/:id/messages/:offset', getMessages);

export default router;