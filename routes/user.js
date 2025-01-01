import Router from 'express-promise-router';
import {
    updateUser,
    registration,
    login,
    getUserInfo,
    getAllUsers,
    countRows,
    deleteUsers,
    checkEmailExist,
    deleteCurrentUser
} from "../controler/user.js";

import {checkJWT} from "../middleware/identification/JWT.js";
import {userValidatorMiddleware as UVM} from "../middleware/validation.js";
import {getAllUsersTitle} from "../controler/admin.js";
import { pagingValidatorMiddleWare as PagingVM } from '../middleware/validation.js';
import { admin } from '../middleware/authorization/mustBeAdmin.js';
import { tabValidatorMiddleware as TabVM } from '../middleware/validation.js';
import {validatePassword as PasswordVM} from '../middleware/validator/user.js';

import {logger} from '../middleware/logger.js';

const router = Router();

router.use((req, res, next) => {
  if (!res.headersSent) {
      logger.info(`Accessing User route: ${req.method} ${req.url}`);
  }
  next();
});

router.post('/registration', UVM.user,PasswordVM, registration);
router.post('/login',UVM.login,login);
router.get('/me',checkJWT,getUserInfo);
router.patch('/me',checkJWT,UVM.update,PasswordVM,updateUser);

router.get('/getAll/users',checkJWT,PagingVM.paging,getAllUsers);
router.get('/nbUser/count/', checkJWT,countRows);
router.delete('/many/deleteUser/',checkJWT,admin,TabVM.ids,deleteUsers);

router.post('/checkEmail/',checkJWT,TabVM.emails,checkEmailExist);

router.get('/get/allTitle', checkJWT,admin, getAllUsersTitle);

router.delete('/delete/currentUser/', checkJWT, deleteCurrentUser);


export default router;