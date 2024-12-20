import vine from '@vinejs/vine'

/**
 * @swagger
 * components:
 *   schemas:
 *     EventID:
 *       type: integer
 *       description: ID of the event to be retrieved, updated, or deleted
 */
const eventIDSchema = vine.object({
    id: vine.number(),
});

/**
 * @swagger
 * components:
 *   schemas:
 *     EventToAddSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *         description:
 *           type: string
 *           maxLength: 250
 *         event_start:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$'
 *           description: 'Event start date and time in the format YYYY-MM-DDTHH:MM or YYYY-MM-DD HH:MM'
 *         event_end:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$'
 *           description: 'Event end date and time in the format YYYY-MM-DDTHH:MM or YYYY-MM-DD HH:MM'
 *         street_number:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *         is_private:
 *           type: boolean
 *         picture_path:
 *           type: string
 *           maxLength: 250
 *         location_id:
 *           type: integer
 *         category_id:
 *           type: integer
 *       required:
 *         - title
 *         - event_start
 *         - event_end
 *         - street_number
 *         - is_private
 *         - picture_path
 *         - location_id
 *         - category_id
 */
const eventToAddSchema = vine.object({
    title: vine.string().trim().minLength(1).maxLength(250),
    description: vine.string().maxLength(250).optional(),
    event_start: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
    event_end: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
    street_number: vine.string().minLength(1).maxLength(250),
    is_private: vine.boolean(),
    picture_path: vine.string().trim().maxLength(250),
    user_id: vine.number(),
    location_id: vine.number(),
    category_id: vine.number(),
});
const eventToAddWithInvitationsSchema = vine.object({
    title: vine.string().trim().minLength(1).maxLength(250),
    description: vine.string().maxLength(250).optional(),
    event_start: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
    event_end: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/),
    street_number: vine.string().minLength(1).maxLength(250),
    picture_path: vine.string().trim().maxLength(250),
    user_id: vine.number(),
    location_id: vine.number(),
    category_id: vine.number(),
    users_id: vine.array(vine.number()),
});
/**
 * @swagger
 * components:
 *   schemas:
 *     EventToUpDateSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           maxLength: 250
 *         description:
 *           type: string
 *           maxLength: 250
 *         event_start:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$'
 *           description: 'Event start date and time in the format YYYY-MM-DDTHH:MM or YYYY-MM-DD HH:MM'
 *         event_end:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$'
 *           description: 'Event end date and time in the format YYYY-MM-DDTHH:MM or YYYY-MM-DD HH:MM'
 *         street_number:
 *           type: string
 *           maxLength: 250
 *         is_private:
 *           type: boolean
 *         picture_path:
 *           type: string
 *           maxLength: 250
 *         location_id:
 *           type: integer
 *         category_id:
 *           type: integer
 *       required:
 *         - id
 */
const eventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().minLength(1).maxLength(250).optional(),
    description: vine.string().maxLength(250).optional(),
    event_start: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).optional(),
    event_end: vine.string().regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/).optional(),
    street_number: vine.string().minLength(1).maxLength(250).optional(),
    is_private: vine.boolean().optional(),
    picture_path: vine.string().trim().minLength(1).maxLength(250).optional(),
    user_id: vine.number().optional(),
    location_id: vine.number().optional(),
    category_id: vine.number().optional(),
});
const eventToCountRowsSchema = vine.object({
    search: vine.string()
})
const eventToCountRowsSearchByCategoriesSchema = vine.object({
    categories: vine.array(vine.number())
})
const eventToCountRowsSearchByLocalitiesSchema = vine.object({
    localities: vine.array(vine.number())
})
export const
    searchedEvent = vine.compile(eventIDSchema),
    eventToAdd = vine.compile(eventToAddSchema),
    eventToUpdate = vine.compile(eventToUpdateSchema),
    eventToDelete = vine.compile(eventIDSchema),
    searchedEvents = vine.compile(eventIDSchema),
    eventToAddWithInvitations = vine.compile(eventToAddWithInvitationsSchema),
    eventToCountRows = vine.compile(eventToCountRowsSchema),
    eventToCountRowsSearchByCategories = vine.compile(eventToCountRowsSearchByCategoriesSchema),
    eventToCountRowsSearchByLocalities = vine.compile(eventToCountRowsSearchByLocalitiesSchema);