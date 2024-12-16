import vine from '@vinejs/vine';

const userIDSchema = vine.object({
    id: vine.number()
});

const userSchema = vine.object({
    email: vine.string().email().trim().maxLength(250),
    password: vine.string().maxLength(250),
    last_name: vine.string().trim().maxLength(250),
    first_name: vine.string().trim().maxLength(250),
    user_name: vine.string().trim().maxLength(250),
    bio: vine.string().maxLength(500)
});

const loginSchema = vine.object({
    email: vine.string().email().maxLength(250),
    password: vine.string().maxLength(250)
});

const updateSchema = vine.object({
    email: vine.string().maxLength(250).optional(),
    password: vine.string().maxLength(250).optional(),
    last_name: vine.string().trim().maxLength(250).optional(),
    first_name: vine.string().trim().maxLength(250).optional(),
    user_name: vine.string().trim().maxLength(250).optional(),
    bio: vine.string().maxLength(500).optional()
});


export const
    searchedUser = vine.compile(userIDSchema),
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema);