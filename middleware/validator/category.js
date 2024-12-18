import vine from '@vinejs/vine';

const categoryIDSchema = vine.object({
    id: vine.number(),
});

const categoryToAddSchema = vine.object({
    title: vine.string().trim().maxLength(250),
    icon_component_name: vine.string().trim().maxLength(250),
    icon_name: vine.string().trim().maxLength(250),
});

const categoryToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().maxLength(250).optional(),
    icon_component_name: vine.string().trim().maxLength(250).optional(),
    icon_name: vine.string().trim().maxLength(250).optional(),
});

export const
    searchedCategory = vine.compile(categoryIDSchema),
    categoryToAdd = vine.compile(categoryToAddSchema),
    categoryToUpdate = vine.compile(categoryToUpdateSchema),
    categoryToDelete = vine.compile(categoryToUpdateSchema);