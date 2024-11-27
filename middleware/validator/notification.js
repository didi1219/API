import vine from '@vinejs/vine';


const notificationIDSchema = vine.object({
    id: vine.number()
});

const notificationToAddSchema = vine.object({
    title: vine.string().trim(),
    content: vine.string().trim(),
    event_id: vine.number(),
    creation_date: vine.date(),
    type: vine.string().trim()
});

const notificationToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().optional(),
    content: vine.string().trim().optional(),
    event_id: vine.number().optional(),
    creation_date: vine.date().optional(),
    type: vine.string().trim().optional()
});

export const
    searchedNotification = vine.compile(notificationIDSchema),
    notificationToAdd = vine.compile(notificationToAddSchema),
    notificationToUpdate = vine.compile(notificationToUpdateSchema),
    notificationToDelete = vine.compile(notificationIDSchema);