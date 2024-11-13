import Router from 'express-promise-router';
import {
    getEvent,
    addEvent,
    deleteEvent,
    updateEvent,
} from '../controler/event.js'

const router = new Router();

router.get('/:id',getEvent);
router.post('/', addEvent);
router.delete('/:id',deleteEvent);
router.patch('/',updateEvent);

export default router;