import vine from '@vinejs/vine';

const categoryIDSchema = vine.object({
    id: vine.number(),
});

const categoryToAddSchema = vine.object({
    title: vine.string().trim(),
});

const categoryToUpdateSchema = vine.object({
    id: vine.number(),
    title: vine.string().trim().optional(),
})

export const
    searchedCategory = vine.compile(categoryIDSchema),
    categoryToAdd = vine.compile(categoryToAddSchema),
    categoryToUpdate = vine.compile(categoryToUpdateSchema),
    categoryToDelete = vine.compile(categoryToUpdateSchema);