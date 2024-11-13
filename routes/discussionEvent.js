import Router from 'express'

import {
    getDiscussionEvent,
    createDiscussionEvent,
    updateDiscussionEvent,
    deleteDiscussionEvent,
} from "../controler/discussionEvent.js"

const router = Router();

router.get('/:id', getDiscussionEvent);
router.post('/', createDiscussionEvent);
router.patch('/', updateDiscussionEvent);
router.delete('/:id', deleteDiscussionEvent);

export default router;