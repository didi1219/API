import vine from '@vinejs/vine';


const discussionEventIDSchema = vine.object({
    id: vine.number()
});

const discussionEventToAddSchema = vine.object({
    title: vine.string().trim(),
    isWritable: vine.boolean(),
    event_id: vine.number()
});

const discussionEventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().optional(),
    isWritable: vine.boolean().optional(),
    event_id: vine.number().optional()
});

export const
    searchedDiscussionEvent = vine.compile(discussionEventIDSchema),
    discussionEventToAdd = vine.compile(discussionEventToAddSchema),
    discussionEventToUpdate = vine.compile(discussionEventToUpdateSchema),
    discussionEventToDelete = vine.compile(discussionEventIDSchema);