import Router from 'express-promise-router'
import{
    getMessage,
    addMessage,
    deleteMessage,
    updateMessage,
    listMessages,
} from "../controler/message.js"
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {messageValidatorMiddleware as MVM} from "../middleware/validation.js";
import {hasWriteRights} from "../middleware/authorization/mustHaveWriteRights.js";

const router = Router();

router.get('/:id', checkJWT, admin, MVM.searchedMessage, getMessage);
router.post('/', checkJWT, hasWriteRights, MVM.messageToAdd, addMessage);
router.patch('/',checkJWT,admin,MVM.messageToUpdate, updateMessage);
router.delete('/:id',checkJWT,admin,MVM.messageToDelete, deleteMessage);

router.get('/all/:offset', checkJWT, admin, MVM.listMessages, listMessages);

export default router;