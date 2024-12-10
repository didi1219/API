import Router from 'express-promise-router'
import{
    getNotification,
    addNotification,
    updateNotification,
    deleteNotification,
    getAllNotifications,
    countRows
} from "../controler/notification.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {notificationValidatorMiddleware as NVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";


const router = Router();

router.get('/:id',checkJWT,admin,NVM.searchedNotification, getNotification);
router.post('/',checkJWT,admin,NVM.notificationToAdd, addNotification);
router.patch('/',checkJWT,admin,NVM.notificationToUpdate, updateNotification)
router.delete('/:id',checkJWT,admin,NVM.notificationToDelete, deleteNotification);

router.get('/getAll/notification',checkJWT,PagingVM.paging,getAllNotifications);
router.get('/nbNotification/count/',checkJWT,countRows)

export default router;