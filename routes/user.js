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
    checkEmailExist
} from "../controler/user.js";

import {checkJWT} from "../middleware/identification/JWT.js";
import {userValidatorMiddleware as UVM} from "../middleware/validation.js";
import {getAllUsersTitle} from "../controler/admin.js";

const router = Router();

router.post('/registration', UVM.user, registration);
router.post('/login',UVM.login,login);
router.get('/me',checkJWT,getUserInfo);
router.patch('/me',checkJWT,UVM.update,updateUser);

router.get('/getAll/users',checkJWT,PagingVM.paging,getAllUsers);
router.get('/nbUser/count/', checkJWT,countRows);
router.delete('/many/deleteUser/',checkJWT,TabVM.ids,deleteUsers);

router.get('/checkEmail/',checkJWT,checkEmailExist);


export default router;