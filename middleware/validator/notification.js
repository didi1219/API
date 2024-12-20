import vine from '@vinejs/vine';


const notificationIDSchema = vine.object({
    id: vine.number()
});

const notificationToAddSchema = vine.object({
    title: vine.string().trim().minLength(1).maxLength(250),
    content: vine.string().trim().minLength(1).maxLength(250),
    event_id: vine.number(),
    creation_date: vine.date(),
    type: vine.string().trim().minLength(1).maxLength(250)
});

const notificationToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().minLength(1).maxLength(250).optional(),
    content: vine.string().trim().minLength(1).maxLength(250).optional(),
    event_id: vine.number().optional(),
    creation_date: vine.date().optional(),
    type: vine.string().trim().minLength(1).maxLength(250).optional()
});

export const
    searchedNotification = vine.compile(notificationIDSchema),
    notificationToAdd = vine.compile(notificationToAddSchema),
    notificationToUpdate = vine.compile(notificationToUpdateSchema),
    notificationToDelete = vine.compile(notificationIDSchema);