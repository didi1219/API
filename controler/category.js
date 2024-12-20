/**
 * @swagger
 * components:
 *  schemas:
 *      Category:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The unique identifier of the category.
 *              title:
 *                  type: string
 *                  description: The title of the category.
 *              icon_component_name:
 *                  type: string
 *                  description: The name of the component representing the category's icon.
 *              icon_name:
 *                  type: string
 *                  description: The name of the icon representing the category.
 */

import {pool} from '../database/database.js';
import * as categoryModel from '../model/category.js';
import {logger} from '../middleware/logger.js';

/**
 * @swagger
 * components:
 *   responses:
 *     getCategory:
 *       description: Return category
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 */
export const getCategory = async (req,res) => {
    try {
        logger.info(`Fetching Category with id: ${req.val.id}`)
        const category = await categoryModel.readCategory(pool,req.val)
        if(category){
            logger.info(`Successfully fetch category`)
            res.json(category);
        } else {
            logger.warn('Category not found')
            res.sendStatus(404);
        }
    } catch(error) {
        logger.error(`Internalt Server Error : ${JSON.stringify(error.message, null, 2)}`)
        res.sendStatus(500);
    }
};

export const addCategory = async (req, res) => {
    try {
        logger.info("Adding a new category");
        const id = await categoryModel.createCategory(pool, req.val);
        logger.info(`Successfully added category with id: ${id}`);
        res.status(201).json({ id });
    } catch (error) {
        logger.error(`Internal Server Error: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteCategory = async (req, res) => {
    try {
        logger.info(`Deleting category with id: ${req.val.id}`);
        await categoryModel.deleteCategory(pool, req.val);
        logger.info("Successfully deleted category");
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Internal Server Error: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateCategory = async (req, res) => {
    try {
        logger.info(`Updating category with id: ${req.val.id}`);
        const response = await categoryModel.updateCategory(pool, req.val);
        if (response.rowCount > 0) {
            logger.info("Successfully updated category");
            res.sendStatus(204);
        } else {
            logger.warn("Category id not found");
            res.status(404).send("Id not found");
        }
    } catch (error) {
        logger.error(`Internal Server Error: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getAllCategories = async (req, res) => {
    try {
        logger.info("Fetching all categories");
        const categories = await categoryModel.readAllCategories(pool);
        if (categories) {
            logger.info("Successfully fetched all categories");
            res.json(categories);
        } else {
            logger.warn("No categories found");
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Internal Server Error: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbCategories = async (req, res) => {
    try {
        logger.info("Fetching the number of categories");
        const categories = await categoryModel.readNbCategories(pool, req.val);
        if (categories) {
            logger.info("Successfully fetched the number of categories");
            res.json(categories);
        } else {
            logger.warn("No categories found");
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Internal Server Error: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getTotalRowCategories = async (req, res) => {
    try {
        logger.info("Fetching total row count for categories");
        const totalRow = await categoryModel.readTotalRowCategories(pool);
        if (totalRow) {
            logger.info("Successfully fetched total row count");
            res.json(totalRow);
        } else {
            logger.warn("No rows found");
            res.sendStatus(204);
        }
    } catch (error) {
        logger.error(`Internal Server Error: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteCategories = async (req, res) => {
    try {
        logger.info("Deleting multiple categories");
        await categoryModel.deleteCategories(pool, req.val);
        logger.info("Successfully deleted categories");
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Internal Server Error: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

