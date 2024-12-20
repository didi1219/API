import Router from 'express-promise-router'
import{
    getMessage,
    addMessage,
    deleteMessage,
    updateMessage,
    getNbMessages,
    countRows,
    deleteMessages
} from "../controler/message.js"
import {
    messageValidatorMiddleware as MVM,
    pagingValidatorMiddleWare as PagingVM,
    tabValidatorMiddleware as TabVM
} from "../middleware/validation.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {hasWriteRights} from "../middleware/authorization/mustHaveWriteRights.js";

import {logger} from '../middleware/logger.js';

const router = Router();

router.use((req, res, next) => {
    logger.info(`Accessing message route: ${req.method} ${req.url}`);
    next();
  });

router.get('/:id', checkJWT, admin, MVM.searchedMessage, getMessage);
router.post('/', checkJWT, hasWriteRights, MVM.messageToAdd, addMessage);
router.patch('/',checkJWT,admin,MVM.messageToUpdate, updateMessage);
router.delete('/:id',checkJWT,admin,MVM.messageToDelete, deleteMessage);

router.get('/nbMessages/search', checkJWT,PagingVM.paging,getNbMessages);
router.get('/nbMessages/count/',checkJWT,countRows);

router.delete('/many/deleteMessages/',checkJWT,admin,TabVM.ids ,deleteMessages);

export default router;