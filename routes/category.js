import Router from 'express-promise-router';
import {
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
} from '../controler/category.js'

const router = Router();

router.get('/:id', getCategory);
router.post('/', addCategory);
router.delete('/:id',deleteCategory);
router.patch('/',updateCategory);

export default router;