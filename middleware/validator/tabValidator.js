import vine from '@vinejs/vine'

export const tabIds = (req, res, next) => {
    if (req.query.ids) {
        req.query.ids = req.query.ids.split(',').map(Number);
    }
    next();
}
const tabIdsQuerySchema = vine.object({
    ids: vine.array(vine.number()),
})

export const ids = vine.compile(tabIdsQuerySchema)

