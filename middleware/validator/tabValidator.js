import vine from '@vinejs/vine';

export const tabIds = (req, res, next) => {
    if (req.query.ids) {
        req.query.ids = req.query.ids.split(',').map(Number);
    }
    next();
};

const tabIdsQuerySchema = vine.object({
    ids: vine.array(vine.number()),
});

const tabEmailsSchema = vine.object({
    emails: vine.array(vine.string().email().trim().maxLength(250)),
})

export const
    ids = vine.compile(tabIdsQuerySchema),
    emails = vine.compile(tabEmailsSchema);
