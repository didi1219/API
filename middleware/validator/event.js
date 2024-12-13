import vine from '@vinejs/vine';

const eventIDSchema = vine.object({
    id: vine.number()
});

const eventToAddSchema = vine.object({
    title: vine.string(),
    description: vine.string(),
    event_start: vine.date(),
    event_end: vine.date(),
    street_number: vine.string(),
    isPrivate: vine.boolean(),
    picture_path: vine.string().trim(),
    location_id: vine.number(),
    category_id: vine.number()
});

const eventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().optional(),
    description: vine.string().optional(),
    event_start: vine.date().optional(),
    event_end: vine.date().optional(),
    street_number: vine.string().optional(),
    isPrivate: vine.boolean().optional(),
    picture_path: vine.string().trim().optional(),
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
