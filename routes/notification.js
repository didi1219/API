import Router from 'express'

import{
    getNotification,
    createNotification,
    updateNotification,
    deleteNotification,
} from "../controler/notification.js";


const router = Router();

router.get('/:id', getNotification);
router.post('/', createNotification);
router.patch('/', updateNotification)
router.delete('/:id', deleteNotification);

export default router;