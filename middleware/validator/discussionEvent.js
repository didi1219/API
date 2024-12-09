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

const listDiscussionEventsSchema = vine.object({
    offset: vine.number()
});

const discussionEventToListMessagesSchema = vine.object({
    id: vine.number(),
    offset: vine.number()
});

const discussionEventToListNewerMessagesSchema = vine.object({
    id: vine.number(),
    nextMessageID: vine.number()
});

const discussionEventToListOlderMessagesSchema = vine.object({
    id: vine.number(),
    previousMessageID: vine.number()
});

export const
    searchedDiscussionEvent = vine.compile(discussionEventIDSchema),
    discussionEventToAdd = vine.compile(discussionEventToAddSchema),
    discussionEventToUpdate = vine.compile(discussionEventToUpdateSchema),
    discussionEventToDelete = vine.compile(discussionEventIDSchema),
    listDiscussionEvents = vine.compile(listDiscussionEventsSchema),
    discussionEventToListMessages = vine.compile(discussionEventToListMessagesSchema),
    discussionEventToListNewerMessages = vine.compile(discussionEventToListNewerMessagesSchema),
    discussionEventToListOlderMessages = vine.compile(discussionEventToListOlderMessagesSchema);