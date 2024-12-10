import Router from 'express-promise-router';
import {
    addUser,
    updateUser,
    getUser,
    deleteUser,
    registration,
    login,
    getUserInfo,
    getAllUsers,
    countRows
} from "../controler/user.js";

import {checkJWT} from "../middleware/identification/JWT.js";
import {userValidatorMiddleware as UVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";

const router = Router();

router.post('/registration', UVM.user, registration);
router.post('/login',UVM.login,login);
router.get('/me',checkJWT,getUserInfo);
router.patch('/me',checkJWT,UVM.update,updateUser);

router.get('/getAll/users',checkJWT,PagingVM.paging,getAllUsers);
router.get('/nbUser/count/', checkJWT,countRows);

export default router;