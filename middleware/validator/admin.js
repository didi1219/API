import vine from '@vinejs/vine'

const userIdSchema = vine.object({
    id: vine.number()
});

const userToAddSchema = vine.object({
    email: vine.string().email().trim(),
    password: vine.string(),
    last_name: vine.string().trim(),
    first_name: vine.string().trim(),
    user_name: vine.string().trim(),
    bio: vine.string()
})

const userToUpdateSchema = vine.object({
    id: vine.number(),
    password: vine.string(),
    last_name: vine.string().trim(),
    first_name: vine.string().trim(),
    user_name: vine.string().trim(),
    bio: vine.string()
});

export const
    searchedUser = vine.compile(userIdSchema),
    userToAdd = vine.compile(userToAddSchema),
    userToUpdate = vine.compile(userToUpdateSchema),
    userToDelete = vine.compile(userIdSchema);