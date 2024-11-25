import Router from 'express-promise-router';
import {
    getEvent,
    addEvent,
    deleteEvent,
    updateEvent,
    getDiscussionEvents,
} from '../controler/event.js'

const router = new Router();

router.get('/:id',getEvent);
router.post('/', addEvent);
router.delete('/:id',deleteEvent);
router.patch('/',updateEvent);

router.get('/:id/discussionEvent',getDiscussionEvents);

export default router;