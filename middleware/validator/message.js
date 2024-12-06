import vine from '@vinejs/vine'


const messageIDSchema = vine.object({
    id: vine.number(),
});

const messageToAddSchema = vine.object({
    content: vine.string().maxLength(250),
    type: vine.number(),
    user_id: vine.number(),
    discussion_event_id: vine.number()
});

const messageToUpdateSchema = vine.object({
    id: vine.number(),
    content: vine.string().maxLength(250).optional(),
    type: vine.number().optional(),
    user_id: vine.number().optional(),
    discussion_event_id: vine.number().optional()
});

export const
    searchedMessage = vine.compile(messageIDSchema),
    messageToAdd = vine.compile(messageToAddSchema),
    messageToUpdate = vine.compile(messageToUpdateSchema),
    messageToDelete = vine.compile(messageIDSchema);