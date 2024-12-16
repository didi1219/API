import vine from '@vinejs/vine';

const userIDSchema = vine.object({
    id: vine.number()
});

const userSchema = vine.object({
    email: vine.string().email().trim(),
    password: vine.string(),
    last_name: vine.string().trim(),
    first_name: vine.string().trim(),
    user_name: vine.string().trim(),
    bio: vine.string()
});

const loginSchema = vine.object({
    email: vine.string().email(),
    password: vine.string()
});

const updateSchema = vine.object({
    email: vine.string().optional(),
    password: vine.string().optional(),
    last_name: vine.string().trim().optional(),
    first_name: vine.string().trim().optional(),
    user_name: vine.string().trim().optional(),
    bio: vine.string().optional()
});


export const
    searchedUser = vine.compile(userIDSchema),
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema);