import Router from 'express-promise-router'
import{
    getMessage,
    addMessage,
    deleteMessage,
    updateMessage,
} from "../controler/message.js"
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {messageValidatorMiddleware as MVM} from "../middleware/validation.js";

const router = Router();

router.get('/:id',MVM.searchedMessage, getMessage);
router.post('/',checkJWT,admin,MVM.messageToAdd, addMessage);
router.patch('/',checkJWT,admin,MVM.messageToUpdate, updateMessage);
router.delete('/:id',checkJWT,admin,MVM.messageToDelete, deleteMessage);

export default router;