import Router from 'express-promise-router';
import {
    updateUser,
    deleteUser,
    getUser,
    login,
} from "../controler/admin.js";
import {registration, getUserInfo} from "../controler/user.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {adminValidatorMiddleware as AVM} from "../middleware/validation.js";

const router = Router();

router.get('/user/:id',checkJWT,admin,AVM.searchedUser,getUser);
router.post('/user/',checkJWT,admin,AVM.addUser,registration);
router.patch('/user/',checkJWT,admin,AVM.updateUser,updateUser);
router.delete('/user/:id',checkJWT,admin,AVM.userToDelete,deleteUser);

router.post('/login', AVM.adminToLogin, login);

export default router;