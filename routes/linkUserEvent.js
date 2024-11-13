import Router from 'express-promise-router';
import {
    addLinkUserEvent,
    updateLinkUserEvent,
    getLinkUserEvent,
    deleteLinkUserEvent
} from "../controler/linkUserEvent.js";

const router = Router();

router.post('/', addLinkUserEvent);
router.patch('/', updateLinkUserEvent);
router.get('/', getLinkUserEvent);
router.delete('/', deleteLinkUserEvent);



export default router;