import vine from '@vinejs/vine';
import * as yup from 'yup';

const passwordSchema = yup
  .string()
  .required('Le mot de passe est requis')
  .min(8, 'Le mot de passe doit comporter au moins 8 caractères')
  .matches(/[A-Z]/, 'Le mot de passe doit contenir au moins une lettre majuscule')
  .matches(/\d/, 'Le mot de passe doit contenir au moins un chiffre')
  .matches(/[#@$!%*?&]/, 'Le mot de passe doit contenir au moins un caractère spécial');

export const validatePassword = async (req, res, next) => {
  try {
    await passwordSchema.validate(req.body.password);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const userIDSchema = vine.object({
    id: vine.number()
});

const userSchema = vine.object({
    email: vine.string().email().trim().maxLength(250),
    password: vine.string().maxLength(250),
    last_name: vine.string().trim().maxLength(250),
    first_name: vine.string().trim().maxLength(250),
    user_name: vine.string().trim().maxLength(250),
    bio: vine.string().maxLength(500),
    picture_path: vine.string().maxLength(250)
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
    bio: vine.string().maxLength(500).optional(),
    picture_path: vine.string().maxLength(250).optional()
});


export const
    searchedUser = vine.compile(userIDSchema),
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema);