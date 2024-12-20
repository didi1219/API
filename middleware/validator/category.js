import vine from '@vinejs/vine';

const categoryIDSchema = vine.object({
    id: vine.number(),
});


/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryToAddSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: The title of the category.
 *         icon_component_name:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: The icon component name of the category.
 *         icon_name:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: The icon name of the category.
 *       required:
 *         - title
 *         - icon_component_name
 *         - icon_name
 */
const categoryToAddSchema = vine.object({
    title: vine.string().trim().minLength(1).maxLength(250),
    icon_component_name: vine.string().trim().minLength(1).maxLength(250),
    icon_name: vine.string().trim().minLength(1).maxLength(250),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoryToUpdateSchema:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The ID of the category to update.
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: The title of the category (optional).
 *         icon_component_name:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: The icon component name of the category (optional).
 *         icon_name:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: The icon name of the category (optional).
 *       required:
 *         - id
 */

const categoryToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().minLength(1).maxLength(250).optional(),
    icon_component_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    icon_name: vine.string().trim().minLength(1).maxLength(250).optional(),
});

export const
    searchedCategory = vine.compile(categoryIDSchema),
    categoryToAdd = vine.compile(categoryToAddSchema),
    categoryToUpdate = vine.compile(categoryToUpdateSchema),
    categoryToDelete = vine.compile(categoryToUpdateSchema);