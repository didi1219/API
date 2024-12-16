import vine from '@vinejs/vine'

const eventIDSchema = vine.object({
    id: vine.number(),
});

const nbEventsSchema = vine.object({
    page: vine.number(),
    perPage: vine.number(),
});

const eventToAddSchema = vine.object({
    title: vine.string().trim().maxLength(250),
    description: vine.string().maxLength(250),
    event_date: vine.date(),
    street_number: vine.string().maxLength(250),
    isPrivate: vine.boolean(),
    picture_path: vine.string().trim().maxLength(250),
    duration: vine.number(),
    user_id: vine.number(),
    location_id: vine.number(),
    category_id: vine.number(),
});
const eventToAddWithInvitationsSchema = vine.object({
    title: vine.string().trim().maxLength(250),
    description: vine.string().maxLength(250),
    event_date: vine.date(),
    street_number: vine.string().maxLength(250),
    picture_path: vine.string().trim().maxLength(250),
    duration: vine.number(),
    user_id: vine.number(),
    location_id: vine.number(),
    category_id: vine.number(),
    users_id: vine.array(vine.number()),
});
const eventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().maxLength(250).optional(),
    description: vine.string().maxLength(250).optional(),
    event_date: vine.date().optional(),
    street_number: vine.string().maxLength(250).optional(),
    isPrivate: vine.boolean().optional(),
    picture_path: vine.string().trim().maxLength(250).optional(),
    duration: vine.number().optional(),
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
    searchedEvents = vine.compile(nbEventsSchema),
    eventToAddWithInvitations = vine.compile(eventToAddWithInvitationsSchema),
    eventToCountRows = vine.compile(eventToCountRowsSchema),
    eventToCountRowsSearchByCategories = vine.compile(eventToCountRowsSearchByCategoriesSchema),
    eventToCountRowsSearchByLocalities = vine.compile(eventToCountRowsSearchByLocalitiesSchema);