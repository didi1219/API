import vine from '@vinejs/vine';

const eventToAddSchema = vine.object({
    title: vine.string(),
    description: vine.string(),
    event_date: vine.date(),
    street_number: vine.string(),
    isPrivate: vine.boolean(),
    picture_path: vine.string().trim(),
    duration: vine.number(),
    location_id: vine.number(),
    category_id: vine.number()
});

const eventToUpdateSchema = vine.object({
    title: vine.string().optional(),
    description: vine.string().optional(),
    event_date: vine.date().optional(),
    street_number: vine.string().optional(),
    isPrivate: vine.boolean().optional(),
    picture_path: vine.string().trim().optional(),
    duration: vine.number().optional(),
    location_id: vine.number().optional(),
    category_id: vine.number().optional()
});

const eventToListDiscussionSchema = vine.object({
    id: vine.number()
});

export const
    eventToAdd = vine.compile(eventToAddSchema),
    eventToUpdate = vine.compile(eventToUpdateSchema),
    eventToListDiscussion = vine.compile(eventToListDiscussionSchema);
