import Router from 'express-promise-router'
import{
    getNotification,
    addNotification,
    updateNotification,
    deleteNotification,
} from "../controler/notification.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {notificationValidatorMiddleware as NVM} from "../middleware/validation.js";


const router = Router();

router.get('/:id',NVM.searchedNotification, getNotification);
router.post('/',checkJWT,admin,NVM.notificationToAdd, addNotification);
router.patch('/',checkJWT,admin,NVM.notificationToUpdate, updateNotification)
router.delete('/:id',checkJWT,admin,NVM.notificationToDelete, deleteNotification);

export default router;