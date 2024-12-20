import Router from 'express-promise-router'
import{
    getNotification,
    addNotification,
    updateNotification,
    deleteNotification,
    getNbNotifications,
    countRows,
    deleteNotifications,
    getNotificationByCurrentUser
} from "../controler/notification.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {notificationValidatorMiddleware as NVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {tabValidatorMiddleware as TabVM} from "../middleware/validation.js";

import {logger} from '../middleware/logger.js';

const router = Router();

router.use((req, res, next) => {
    logger.info(`Accessing notification route: ${req.method} ${req.url}`);
    next();
  });

router.get('/:id',checkJWT,admin,NVM.searchedNotification, getNotification);
router.post('/',checkJWT,admin,NVM.notificationToAdd, addNotification);
router.patch('/',checkJWT,admin,NVM.notificationToUpdate, updateNotification)
router.delete('/:id',checkJWT,admin,NVM.notificationToDelete, deleteNotification);

router.get('/nbNotifications/search',checkJWT,PagingVM.paging,getNbNotifications);
router.get('/nbNotifications/count/',checkJWT,countRows);

router.get('/get/currentUser', checkJWT,PagingVM.paging, getNotificationByCurrentUser)

router.delete('/many/deleteNotification/',checkJWT,admin,TabVM.ids ,deleteNotifications);

export default router;