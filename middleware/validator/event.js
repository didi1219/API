import vine from '@vinejs/vine';

const eventIDSchema = vine.object({
    id: vine.number()
});

const eventToAddSchema = vine.object({
    title: vine.string(),
    description: vine.string(),
    event_date: vine.date(),
    street_number: vine.string(),
    is_private: vine.boolean(),
    picture_path: vine.string().trim(),
    duration: vine.number(),
    location_id: vine.number(),
    category_id: vine.number()
});

const eventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().optional(),
    description: vine.string().optional(),
    event_date: vine.date().optional(),
    street_number: vine.string().optional(),
    is_private: vine.boolean().optional(),
    picture_path: vine.string().trim().optional(),
    duration: vine.number().optional(),
    location_id: vine.number().optional(),
    category_id: vine.number().optional()
});

export const
    searchedEvent = vine.compile(eventIDSchema),
    eventToAdd = vine.compile(eventToAddSchema),
    eventToUpdate = vine.compile(eventToUpdateSchema),
    eventToDelete = vine.compile(eventIDSchema),
    eventToListDiscussion = vine.compile(eventIDSchema);
