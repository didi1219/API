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

import {logger} from '../middleware/logger.js';

const router = Router();

router.use((req, res, next) => {
    logger.info(`Accessing category route: ${req.method} ${req.url}`);
    next();
  });

/**
 * @swagger
 * /category/{id}:
 *   get:
 *     summary: Fetching an existing category
 *     description: This route fetches an existing category.
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the category to get
 *     responses:
 *       200:
 *         description: Successfully retrieved the category.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/getCategory'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Server error.
 */
router.get('/:id',PVM.searchedCategory, getCategory);
/**
 * @swagger
 * /category/:
 *   post:
 *     summary: Create a new category
 *     description: This route creates a new category. The user must have admin privileges to perform this action.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryToAddSchema'
 *     responses:
 *       201:
 *         description: Category successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the newly created category
 *       400:
 *         description: Bad request - Validation failed or invalid input
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/mustBeAdmin'
 *       500:
 *         description: Internal server error
 */
router.post('/',checkJWT,admin,PVM.categoryToAdd, addCategory);
/**
 * @swagger
 * /category/{id}:
 *   delete:
 *     summary: Delete an existing category
 *     description: This route deletes an existing category. The user must have admin privileges to perform this action.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the category to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category successfully deleted
 *       400:
 *         description: Bad request - Invalid ID or data
 *       401:
 *         description: Unauthorized - Invalid or missing token
 *       403:
 *         description: Forbidden - Admin role required (this check is performed by the `admin` middleware)
 *       500:
 *         description: Internal server error
 */
router.delete('/:id',checkJWT,admin,PVM.categoryToDelete,deleteCategory);
/**
 * @swagger
 * /category/:
 *   patch:
 *     summary: Update an existing category
 *     description: This route updates an existing category. The user must have admin privileges to perform this action.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       description: The data required to update an existing category. You must provide a valid ID
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryToUpdateSchema'
 *     responses:
 *       204:
 *         description: Category successfully updated
 *       400:
 *         description: Bad request - Validation failed or invalid input
 *       403:
 *         description: Forbidden - Admin role required (this check is performed by the `admin` middleware)
 *       404:
 *         description: Category not found
 *       500:
 *         description: Internal server error
 */
router.patch('/',checkJWT,admin,PVM.categoryToUpdate,updateCategory);

router.get('/get/allTitle',getAllCategories);

router.get('/nbCategories/search',checkJWT,PagingVM.paging,getNbCategories);
router.get('/nbCategories/count/',checkJWT,getTotalRowCategories);

router.delete('/many/deleteCategory/',checkJWT,admin,TabVM.ids,deleteCategories);

export default router;