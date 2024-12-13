import vine from '@vinejs/vine';

const eventIDSchema = vine.object({
    id: vine.number()
});

const eventToAddSchema = vine.object({
    title: vine.string().maxLength(250),
    description: vine.string().maxLength(250),
    event_date: vine.date(),
    street_number: vine.string().maxLength(250),
    isPrivate: vine.boolean(),
    picture_path: vine.string().trim().maxLength(250),
    duration: vine.number(),
    location_id: vine.number(),
    category_id: vine.number()
});

const eventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().maxLength(250).optional(),
    description: vine.string().maxLength(250).optional(),
    event_date: vine.date().optional(),
    street_number: vine.string().maxLength(250),
    isPrivate: vine.boolean().optional(),
    picture_path: vine.string().trim().maxLength(250).optional(),
    duration: vine.number().optional(),
    location_id: vine.number().optional(),
    category_id: vine.number().optional()
});

const eventToListDiscussionSchema = vine.object({
    id: vine.number()
});

export const
    searchedEvent = vine.compile(eventIDSchema),
    eventToAdd = vine.compile(eventToAddSchema),
    eventToUpdate = vine.compile(eventToUpdateSchema),
    eventToDelete = vine.compile(eventIDSchema),
    eventToListDiscussion = vine.compile(eventToListDiscussionSchema);
