import Router from 'express-promise-router';
import {
    addOwner,
    updateOwner,
    getOwner,
    deleteOwner
} from "../controler/owner.js";

const router = Router();

router.post('/', addOwner);
router.patch('/', updateOwner);
router.get('/:id', getOwner);
router.delete('/:id', deleteOwner);

export default router;