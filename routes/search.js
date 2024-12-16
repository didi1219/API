import Router from 'express-promise-router';
import {
    searchEventByName,
    searchEvent,
    getTotalRowEventGenericSearched,
    getEventCategories,
    getEventByLoc,
    setFavoriteEvent,
    getAllEventOfOwner,
    getNbEventByOwner,
    getNbEventByUser,
    getNbRowsBySearch,
    getNbRowsSearchByCategories,
    getNbRowsSearchByLocalities,
    getPublicEvents
} from "../controler/search.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import { pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import { eventManagementValidatorMiddleware as EMVM} from '../middleware/validation.js';
import { searchValidatorMiddleWare as SM} from "../middleware/validation.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {tabTransformLoc, tabTransformCat} from '../middleware/validator/paging.js';
import { decodeQuery } from '../middleware/decodeURI/decode.js';

const router = new Router();

router.get('/eventName/name',checkJWT,PagingVM.pagingSearchByName,searchEventByName);
router.get('/events/search',checkJWT,PagingVM.pagingSearchGeneral,searchEvent);
router.get('/events/count',checkJWT,decodeQuery,PagingVM.pagingSearchGeneral,getTotalRowEventGenericSearched);
router.get('/events/type/public/',checkJWT,PagingVM.paging,getPublicEvents);
router.get('/event/byCategory/',checkJWT,tabTransformCat,PagingVM.pagingSearchByCategories,getEventCategories);
router.get('/event/byLocality',checkJWT,tabTransformLoc,PagingVM.pagingSearchByLoc,getEventByLoc);

router.get('/nbRows/byOwner/:id',checkJWT,admin,EMVM.searchedEvent,getNbEventByOwner);
router.get('/nbRows/byUser/:id',checkJWT,EMVM.searchedEvent,getNbEventByUser);
router.get('/nbRows/generic',checkJWT,decodeQuery,EMVM.eventToCountRows,getTotalRowEventGenericSearched);
router.get('/nbRows/byCategories/', checkJWT, EMVM.eventToCountRowsSearchByCategories, getNbRowsSearchByCategories);
router.get('/nbRows/byLocalities/',checkJWT, EMVM.eventToCountRowsSearchByLocalities, getNbRowsSearchByLocalities);

export default router;

