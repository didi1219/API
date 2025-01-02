import vine from '@vinejs/vine';

export const tabTransformCat = (req, res, next) => {
    if (req.query.categories) {
        req.query.categories = req.query.categories.split(',').map(Number);
    }
    next();
};

export const tabTransformLoc = (req, res, next) => {
    if (req.query.localities) {
        req.query.localities = req.query.localities.split(',').map(Number);
    }
    next();
};

const pagingSchema = vine.object({
    page: vine.number(),
    perPage: vine.number().min(1),
});

const pagingSearchByNameSchema = vine.object({
    page: vine.number(),
    perPage: vine.number().min(1),
    name: vine.string().trim(),
});

const pagingSearchGeneralSchema = vine.object({
    page: vine.number(),
    perPage: vine.number().min(1),
    search: vine.string(),
});

const pagingSearchByCategoriesSchema = vine.object({
    page: vine.number(),
    perPage: vine.number().min(1),
    categories: vine.array(vine.number())
});

const pagingSearchByLocSchema = vine.object({
    page: vine.number(),
    perPage: vine.number().min(1),
    localities: vine.array(vine.number())
});

const pagingWithIdSchema = vine.object({
    page: vine.number(),
    perPage: vine.number(),
    id: vine.number(),
});

const pagingWithAllFilterSchema = vine.object({
    page: vine.number(),
    perPage: vine.number(),
    locality: vine.string().optional(),
    categories: vine.array(vine.number()).optional(),
    search: vine.string().optional(),
})

export const
    paging = vine.compile(pagingSchema),
    pagingSearchByName = vine.compile(pagingSearchByNameSchema),
    pagingSearchGeneral =  vine.compile((pagingSearchGeneralSchema)),
    pagingSearchByCategories = vine.compile(pagingSearchByCategoriesSchema),
    pagingSearchByLoc = vine.compile(pagingSearchByLocSchema),
    pagingWithId = vine.compile(pagingWithIdSchema),
    pagingWithAllFilters = vine.compile(pagingWithAllFilterSchema);
