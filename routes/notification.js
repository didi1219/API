import Router from 'express-promise-router'
import{
    getNotification,
    addNotification,
    updateNotification,
    deleteNotification,
    getAllNotifications,
    countRows,
    deleteNotifications
} from "../controler/notification.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {notificationValidatorMiddleware as NVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {tabValidatorMiddleware as TabVM} from "../middleware/validation.js";
import {tabIds} from "../middleware/validator/tabValidator.js";


const router = Router();

router.get('/:id',checkJWT,admin,NVM.searchedNotification, getNotification);
router.post('/',checkJWT,admin,NVM.notificationToAdd, addNotification);
router.patch('/',checkJWT,admin,NVM.notificationToUpdate, updateNotification)
router.delete('/:id',checkJWT,admin,NVM.notificationToDelete, deleteNotification);

router.get('/getAll/notification',checkJWT,PagingVM.paging,getAllNotifications);
router.get('/nbNotification/count/',checkJWT,countRows)

router.delete('/many/deleteNotification/',checkJWT,TabVM.ids ,deleteNotifications);

export default router;