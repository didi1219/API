import vine from '@vinejs/vine';


const idSchema = vine.object({
   id : vine.number()
});


export const
    idSearched = vine.compile(idSchema);