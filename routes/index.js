import {Router} from 'express';
import {default as notificationRouter} from './notification.js';
import {default as messageRouter} from './message.js';
import {default as discussionEventRouter} from './discussionEvent.js';

const router = Router();

router.use('/notification', notificationRouter);
router.use('/message', messageRouter);
router.use('/discussionEvent', discussionEventRouter);

export default router;