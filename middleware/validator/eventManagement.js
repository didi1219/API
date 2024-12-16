import vine from '@vinejs/vine'

const eventIDSchema = vine.object({
    id: vine.number(),
});

const eventToAddSchema = vine.object({
    title: vine.string().trim().maxLength(250),
    description: vine.string().maxLength(250),
    event_start: vine.date(),
    event_end: vine.date(),
    street_number: vine.string().maxLength(250),
    is_private: vine.boolean(),
    picture_path: vine.string().trim().maxLength(250),
    user_id: vine.number(),
    location_id: vine.number(),
    category_id: vine.number(),
});
const eventToAddWithInvitationsSchema = vine.object({
    title: vine.string().trim().maxLength(250),
    description: vine.string().maxLength(250),
    event_start: vine.date(),
    event_end: vine.date(),
    street_number: vine.string().maxLength(250),
    picture_path: vine.string().trim().maxLength(250),
    user_id: vine.number(),
    location_id: vine.number(),
    category_id: vine.number(),
    users_id: vine.array(vine.number()),
});
const eventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().maxLength(250).optional(),
    description: vine.string().maxLength(250).optional(),
    event_start: vine.date().optional(),
    event_end: vine.date().optional(),
    street_number: vine.string().maxLength(250).optional(),
    is_private: vine.boolean().optional(),
    picture_path: vine.string().trim().maxLength(250).optional(),
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