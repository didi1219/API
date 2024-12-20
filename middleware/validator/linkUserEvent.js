import vine from '@vinejs/vine';

const linkUserEventIDSchema = vine.object({
    id: vine.number(),
});

const linkUserEventEventIDSchema = vine.object({
    event_id: vine.number(),
});

const linkUserEventToAddSchema = vine.object({
    event_id: vine.number(),
    user_id: vine.number(),
    is_waiting: vine.boolean(),
    is_accepted: vine.boolean(),
});

const linkUserEventToUpdateSchema = vine.object({
    id: vine.number(),
    event_id: vine.number().optional(),
    user_id: vine.number().optional(),
    is_waiting: vine.boolean().optional(),
    is_accepted: vine.boolean().optional(),
});

const linUserEventInvitationPatchSchema = vine.object({
    id:vine.number(),
});

export const
    searchedLinkUserEvent = vine.compile(linkUserEventIDSchema),
    linkUserEventToFollow = vine.compile(linkUserEventEventIDSchema),
    linkUserEventToUnFollow = vine.compile(linkUserEventEventIDSchema),
    linkUserEventIsAccepted = vine.compile(linkUserEventEventIDSchema),
    linkUserEventToAdd = vine.compile(linkUserEventToAddSchema),
    linkUserEventToUpdate = vine.compile(linkUserEventToUpdateSchema),
    linkUserEventToDelete = vine.compile(linkUserEventIDSchema),
    linkUserEventInvitationPatch = vine.compile(linkUserEventEventIDSchema),
    linkUserEventRatioFavorite = vine.compile(linkUserEventEventIDSchema);