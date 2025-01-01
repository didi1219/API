import vine from '@vinejs/vine';
import * as yup from 'yup';

const commonPasswords = [
  '123456',
  'password',
  '123456789',
  '12345',
  '1234',
  'qwerty',
  'abc123',
  'password1',
  '111111',
  '123123',
  'admin',
  'letmein',
  'welcome',
  'iloveyou',
  'dragon',
  'sunshine',
  'qwertyuiop',
  'password123',
  '123qwe',
  'football',
  'monkey',
  '123321',
  '123qaz',
  '1q2w3e4r',
  '123abc',
  'superman',
  'qwerty123',
  '123000',
  'starwars',
  'trustno1',
  '1password',
  'master',
  'hello123',
  'password1!',
  'welcome1',
  'freedom',
  'cheese',
  'lovely',
  'sunshine1',
  'princess',
  'qwertyuiop123',
  '12345a',
  'football1',
  'iloveyou1',
  'monkey1',
  'secret',
  'shadow',
  'ashley',
  'sunshine123',
  'batman',
  'password1234',
  'letmein1',
  '1qaz2wsx',
  'qazwsx'
];

const passwordSchema = yup
  .string()
  .required('The password is required')
  .min(8, 'The password must be at least 8 characters long')
  .max(255, 'The password must be no longer than 255 characters')
  .matches(/[A-Z]/, 'The password must contain at least one uppercase letter')
  .matches(/\d/, 'The password must contain at least one number')
  .matches(/[.#@$!%*?&]/, 'The password must contain at least one special character')
  .notOneOf(commonPasswords, 'This password is too common');

export const validatePassword = async (req, res, next) => {
    try {
        if(req.val.password !== undefined) {
            req.val.password = await passwordSchema.validate(req.body.password);
        }
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
    last_name: vine.string().trim().minLength(1).maxLength(250),
    first_name: vine.string().trim().minLength(1).maxLength(250),
    user_name: vine.string().trim().minLength(1).maxLength(250),
    bio: vine.string().minLength(1).maxLength(500).optional(),
    picture_path: vine.string().maxLength(250)
});

const loginSchema = vine.object({
    email: vine.string().email().maxLength(250),
    password: vine.string().maxLength(250)
});

const updateSchema = vine.object({
    email: vine.string().maxLength(250).optional(),
    password: vine.string().maxLength(250).optional(),
    last_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    first_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    user_name: vine.string().trim().minLength(1).maxLength(250).optional(),
    bio: vine.string().maxLength(500).optional(),
    picture_path: vine.string().maxLength(250).optional()
});


export const
    searchedUser = vine.compile(userIDSchema),
    user = vine.compile(userSchema),
    login = vine.compile(loginSchema),
    update = vine.compile(updateSchema);