import Router from 'express-promise-router';
import {
    updateUser,
    deleteUser,
    getUser,
    login,
    getNbUsers,
    countRows,
    getAllUsersTitle,
    deleteUsers
} from "../controler/admin.js";
import {
    adminValidatorMiddleware as AVM,
    pagingValidatorMiddleWare as PagingVM,
    tabValidatorMiddleware as TabVM
} from "../middleware/validation.js";
import {registration} from "../controler/user.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {tabIds} from "../middleware/validator/tabValidator.js";
import {logger} from '../middleware/logger.js';
import {validatePassword as PasswordVM} from "../middleware/validator/user.js";

const router = Router();

router.use((req, res, next) => {
    logger.info(`Accessing admin route: ${req.method} ${req.url}`);
    next();
  });

router.get('/:id',checkJWT,admin,AVM.searchedUser,getUser);
router.post('/',checkJWT,admin,AVM.addUser,PasswordVM,registration);
router.patch('/',checkJWT,admin,AVM.updateUser,updateUser);
router.delete('/:id',checkJWT,admin,AVM.userToDelete,deleteUser);

router.get('/get/allTitle',checkJWT,getAllUsersTitle);

router.get('/nbUsers/search',checkJWT,PagingVM.paging,getNbUsers);
router.get('/nbUsers/count/', checkJWT,countRows);

router.delete('/many/deleteUser/',checkJWT,admin,tabIds,TabVM.ids,deleteUsers);

router.post('/login', AVM.adminToLogin, login);

export default router;