import Router from 'express-promise-router';
import {
    updateUser,
    deleteUser,
    registration,
    login,
    getUserInfo,
    getAllUsers,
    countRows,
    deleteUsers,
    getUser,
    checkEmailExist,
    deleteCurrentUser
} from "../controler/user.js";

import {checkJWT} from "../middleware/identification/JWT.js";
import {userValidatorMiddleware as UVM} from "../middleware/validation.js";
import {getAllUsersTitle} from "../controler/admin.js";
import { pagingValidatorMiddleWare as PagingVM } from '../middleware/validation.js';
import { admin } from '../middleware/authorization/mustBeAdmin.js';
import { tabValidatorMiddleware as TabVM } from '../middleware/validation.js';

const router = Router();

router.post('/registration', UVM.user, registration);
router.post('/login',UVM.login,login);
router.get('/me',checkJWT,getUserInfo);
router.patch('/me',checkJWT,UVM.update,updateUser);

router.get('/getAll/users',checkJWT,PagingVM.paging,getAllUsers);
router.get('/nbUser/count/', checkJWT,countRows);
router.delete('/many/deleteUser/',checkJWT,admin,TabVM.ids,deleteUsers);

router.get('/:id', UVM.searchedUser, getUser);

router.get('/checkEmail/',checkJWT,checkEmailExist);

router.get('/get/allTitle', checkJWT,admin, getAllUsersTitle);

router.delete('/delete/currentUser/', checkJWT, deleteCurrentUser);


export default router;