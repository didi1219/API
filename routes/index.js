import {default as notificationRouter} from './notification.js';
import {default as messageRouter} from './message.js';
import {default as discussionEventRouter} from './discussionEvent.js';
import {default as categoryRouter} from './category.js';
import {default as locationRouter} from './location.js';
import {default as eventRouter} from './event.js';
import {default as userRouter} from './user.js';
import {default as linkUserEventRouter} from "./linkUserEvent.js";
import {default as adminRouter} from "./admin.js";
import {default as searchRouter} from './search.js';

import Router from 'express-promise-router';
import { logger } from '../middleware/logger.js';

const router = Router();

router.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

router.use('/notification', notificationRouter);
router.use('/message', messageRouter);
router.use('/discussionEvent', discussionEventRouter);
router.use('/category',categoryRouter);
router.use('/location',locationRouter);

router.use('/event',eventRouter);
router.use('/search',searchRouter)

router.use('/user', userRouter);
router.use('/linkUserEvent', linkUserEventRouter);

router.use('/admin',adminRouter);


router.use((req,res) =>{
    logger.warn(`Bad URL: ${req.path}`);
    return res.status(404).send("Il ne s'agit pas d'une URL prise en charge par l'application");
})


export default router;