import vine from '@vinejs/vine';


const discussionEventIDSchema = vine.object({
    id: vine.number()
});

const discussionEventToAddSchema = vine.object({
    title: vine.string().trim().maxLength(250),
    isWritable: vine.boolean(),
    event_id: vine.number()
});

const discussionEventToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().maxLength(250).optional(),
    isWritable: vine.boolean().optional(),
    event_id: vine.number().optional()
});

const listDiscussionEventsSchema = vine.object({
    offset: vine.number()
});

const discussionEventToListMessagesSchema = vine.object({
    discussion_event_id: vine.number(),
    offset: vine.number()
});

const discussionEventToListNewerMessagesSchema = vine.object({
    discussion_event_id: vine.number(),
    nextMessageID: vine.number()
});

const discussionEventToListOlderMessagesSchema = vine.object({
    discussion_event_id: vine.number(),
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