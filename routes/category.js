import Router from 'express-promise-router';
import {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
    getAllCategories,
    getCategories,
    getTotalRowCategories,
    deleteCategories
} from '../controler/category.js'
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {categoryValidatorMiddleware as PVM, tabValidatorMiddleware as TabVM} from "../middleware/validation.js";
import {tabIds} from "../middleware/validator/tabValidator.js";

const router = Router();

router.get('/:id',PVM.searchedCategory, getCategory);
router.post('/',checkJWT,admin,PVM.categoryToAdd, addCategory);
router.delete('/:id',checkJWT,admin,PVM.categoryToDelete,deleteCategory);
router.patch('/',checkJWT,admin,PVM.categoryToUpdate,updateCategory);

router.get('/get/all',getAllCategories);

router.get('/nbCategories/search?',checkJWT,PVM.searchedCategories,getCategories);
router.get('/nbCategories/totalCount/',checkJWT,getTotalRowCategories);

router.delete('/many/deleteCategory',checkJWT,TabVM.ids,deleteCategories);

export default router;