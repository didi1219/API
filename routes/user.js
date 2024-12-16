import Router from 'express-promise-router';
import {
    updateUser,
    deleteUser,
    registration,
    login,
    getUserInfo,
} from "../controler/user.js";

import {checkJWT} from "../middleware/identification/JWT.js";
import {userValidatorMiddleware as UVM} from "../middleware/validation.js";
import {getAllUsersTitle} from "../controler/admin.js";

const router = Router();

router.post('/registration', UVM.user, registration);
router.post('/login',UVM.login,login);
router.get('/me',checkJWT,getUserInfo);
router.patch('/me',checkJWT,UVM.update,updateUser);

router.get('/get/allTitle',checkJWT,getAllUsersTitle);


export default router;