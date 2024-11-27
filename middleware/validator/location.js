import vine from '@vinejs/vine';


const locationIDSchema = vine.object({
    id: vine.number()
});

const locationToAddSchema = vine.object({
    label: vine.string().trim(),
    postalCode: vine.number()
});

const locationToUpdateSchema = vine.object({
    id: vine.number(),
    label: vine.string().trim().optional(),
    postalCode: vine.number().optional()
});

export const
    searchedLocation = vine.compile(locationIDSchema),
    locationToAdd = vine.compile(locationToAddSchema),
    locationToUpdate = vine.compile(locationToUpdateSchema),
    locationToDelete = vine.compile(locationIDSchema);