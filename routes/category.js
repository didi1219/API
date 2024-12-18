import Router from 'express-promise-router';
import {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
    getAllCategories,
    getNbCategories,
    getTotalRowCategories,
    deleteCategories,
} from '../controler/category.js'
import {
    categoryValidatorMiddleware as PVM,
    pagingValidatorMiddleWare as PagingVM,
    tabValidatorMiddleware as TabVM
} from "../middleware/validation.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";

const router = Router();

router.get('/:id',PVM.searchedCategory, getCategory);
router.post('/',checkJWT,admin,PVM.categoryToAdd, addCategory);
router.delete('/:id',checkJWT,admin,PVM.categoryToDelete,deleteCategory);
router.patch('/',checkJWT,admin,PVM.categoryToUpdate,updateCategory);

router.get('/get/allTitle',getAllCategories);

router.get('/nbCategories/search',checkJWT,PagingVM.paging,getNbCategories);
router.get('/nbCategories/count/',checkJWT,getTotalRowCategories);

router.delete('/many/deleteCategory/',checkJWT,admin,TabVM.ids,deleteCategories);

export default router;