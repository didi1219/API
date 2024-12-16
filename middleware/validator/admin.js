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
});

const userToUpdateSchema = vine.object({
    id: vine.number(),
    email : vine.string().email().trim().optional(),
    password: vine.string().optional(),
    last_name: vine.string().trim().optional(),
    first_name: vine.string().trim().optional(),
    user_name: vine.string().trim().optional(),
    bio: vine.string().optional()
});

const adminToLoginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string()
});

export const
    searchedUser = vine.compile(userIdSchema),
    userToAdd = vine.compile(userToAddSchema),
    userToUpdate = vine.compile(userToUpdateSchema),
    userToDelete = vine.compile(userIdSchema),
    adminToLogin = vine.compile(adminToLoginSchema);