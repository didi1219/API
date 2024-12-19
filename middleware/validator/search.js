import vine from '@vinejs/vine';

const idSchema = vine.object({
   id : vine.number()
});

const searchSchema = vine.object({
   search : vine.string()
});

export const
    idSearched = vine.compile(idSchema),
    searchValidation = vine.compile(searchSchema);