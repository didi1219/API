import vine from '@vinejs/vine';

const userIdSchema = vine.object({
    id: vine.number()
});

const userToAddSchema = vine.object({
    email: vine.string().email().trim().maxLength(250),
    password: vine.string().maxLength(250),
    last_name: vine.string().trim().maxLength(250),
    first_name: vine.string().trim().maxLength(250),
    user_name: vine.string().trim().maxLength(250),
    bio: vine.string().maxLength(500),
    picture_path: vine.string().maxLength(250)
});

const userToUpdateSchema = vine.object({
    id: vine.number(),
    email: vine.string().maxLength(250).optional(),
    password: vine.string().maxLength(250).optional(),
    last_name: vine.string().trim().maxLength(250).optional(),
    first_name: vine.string().trim().maxLength(250).optional(),
    user_name: vine.string().trim().maxLength(250).optional(),
    bio: vine.string().maxLength(500).optional(),
    picture_path: vine.string().maxLength(250).optional()
});

const adminToLoginSchema = vine.object({
    email: vine.string().email().maxLength(250),
    password: vine.string().maxLength(250)
});

export const
    searchedUser = vine.compile(userIdSchema),
    userToAdd = vine.compile(userToAddSchema),
    userToUpdate = vine.compile(userToUpdateSchema),
    userToDelete = vine.compile(userIdSchema),
    adminToLogin = vine.compile(adminToLoginSchema);