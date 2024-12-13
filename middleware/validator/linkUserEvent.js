import vine from '@vinejs/vine';

const linkUserEventIDSchema = vine.object({
    event_id: vine.number(),
    user_id: vine.number(),
});

const linkUserEventToAddSchema = vine.object({
    event_id: vine.number(),
    user_id: vine.number(),
    isWaiting: vine.boolean(),
    isAccepted: vine.boolean(),
});

const linkUserEventToUpdateSchema = vine.object({
    event_id: vine.number(),
    user_id: vine.number(),
    isWaiting: vine.boolean().optional(),
    isAccepted: vine.boolean().optional(),
});
const linUserEventInvitationPatchSchema = vine.object({
    event_id: vine.number()
})

export const
    searchedLinkUserEvent = vine.compile(linkUserEventIDSchema),
    linkUserEventToAdd = vine.compile(linkUserEventToAddSchema),
    linkUserEventToUpdate = vine.compile(linkUserEventToUpdateSchema),
    linkUserEventToDelete = vine.compile(linkUserEventIDSchema),
    linkUserEventInvitationPatch = vine.compile(linUserEventInvitationPatchSchema);