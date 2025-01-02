import Router from 'express-promise-router';
import {
    searchEventByName,
    searchEvent,
    getTotalRowEventGenericSearched,
    getEventCategories,
    getEventByLoc,
    getNbEventByOwner,
    getNbRowsSearchByCategories,
    getNbRowsSearchByLocalities,
    getPublicEvents,
    getEventSearchFollowByCurrentUser,
    getEventSeachByOwner,
    countRowsEventGenericByFollow,
    countRowsEventGenericByOwner,
    countNbRowPublicEvent,
    getCombineSearchPublic,
    countRowsGetCombineSearchPublic,
    getSearchCombineCategoriesAndLocalities,
    getSearchCombineCategoriesAndLocalitiesOwnEvent,
    getSearchCombineCategoriesAndLocalitiesByFollow
} from "../controler/search.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import { pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import { eventManagementValidatorMiddleware as EMVM} from '../middleware/validation.js';
import { searchValidatorMiddleWare as SM} from "../middleware/validation.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {tabTransformLoc, tabTransformCat} from '../middleware/validator/paging.js';
import { decodeQuery } from '../middleware/decodeURI/decode.js';

import {logger} from '../middleware/logger.js';

const router = new Router();

router.use((req, res, next) => {
    logger.info(`Accessing search route: ${req.method} ${req.url}`);
    next();
  });

router.get('/eventName/name',checkJWT,PagingVM.pagingSearchByName,searchEventByName);
router.get('/events/search',checkJWT,PagingVM.pagingSearchGeneral,searchEvent);
router.get('/events/count',checkJWT,decodeQuery,SM.searchField,getTotalRowEventGenericSearched);
router.get('/events/type/public',checkJWT,PagingVM.paging,getPublicEvents);
router.get('/event/byCategory',tabTransformCat,PagingVM.pagingSearchByCategories,getEventCategories);
router.get('/event/byLocality',checkJWT,tabTransformLoc,PagingVM.pagingSearchByLoc,getEventByLoc);

router.get('/nbRows/byOwner/',checkJWT,getNbEventByOwner);;
router.get('/nbRows/generic',checkJWT,decodeQuery,EMVM.eventToCountRows,getTotalRowEventGenericSearched);
router.get('/nbRows/byCategories/', checkJWT, EMVM.eventToCountRowsSearchByCategories, getNbRowsSearchByCategories);
router.get('/nbRows/byLocalities/',checkJWT, EMVM.eventToCountRowsSearchByLocalities, getNbRowsSearchByLocalities);

router.get('/events/searchByOwner',checkJWT,PagingVM.pagingSearchGeneral,getEventSeachByOwner);
router.get('/events/searchByFollow',checkJWT,PagingVM.pagingSearchGeneral,getEventSearchFollowByCurrentUser);
router.get('/nbRows/searchByOwner', checkJWT,PagingVM.pagingSearchGeneral,countRowsEventGenericByOwner);
router.get('/nbRows/searchByFollow', checkJWT,PagingVM.pagingSearchGeneral,countRowsEventGenericByFollow);
router.get('/nbRows/type/public/',checkJWT,countNbRowPublicEvent);
router.get('/nbRows/publicAndSearch', checkJWT, SM.searchField,countRowsGetCombineSearchPublic);
router.get('/events/publicAndSearch', checkJWT,PagingVM.pagingSearchGeneral,getCombineSearchPublic);
router.get('/events/searchAllFilter',checkJWT,tabTransformCat,PagingVM.pagingWithAllFilters,getSearchCombineCategoriesAndLocalities);

router.get('/events/searchAllFilter/ownEvent',checkJWT,PagingVM.pagingSearchGeneral,getSearchCombineCategoriesAndLocalitiesOwnEvent);
router.get('/events/searchAllFilter/followEvent',checkJWT,PagingVM.pagingSearchGeneral,getSearchCombineCategoriesAndLocalitiesByFollow);


export default router;

