import Router from 'express'
import{
    getMessage,
    createMessage,
    deleteMessage,
    updateMessage,
} from "../controler/message.js"

const router = Router();

router.get('/:id', getMessage);
router.post('/', createMessage);
router.patch('/', updateMessage);
router.delete('/:id', deleteMessage);

export default router;