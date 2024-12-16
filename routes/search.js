import Router from 'express-promise-router';
import {
    searchEventByName,
    searchEvent,
    getEventCategories,
    getEventByLoc,
    getAllEv,
    setFavoriteEvent,
    getAllEventOfOwner,
    getNbEventByOwner,
    getNbEventByUser,
    getNbRowsBySearch,
    getNbRowsSearchByCategories,
    getNbRowsSearchByLocalities
} from "../controler/search.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import { eventManagementValidatorMiddleware as EMVM} from '../middleware/validation.js';
import {tabTransformLoc, tabTransformCat} from '../middleware/validator/paging.js';
import { decodeQuery } from '../middleware/decodeURI/decode.js';

const router = new Router();

router.get('/eventName/name',checkJWT,PagingVM.pagingSearchByName,searchEventByName);
router.get('/general/search',checkJWT,decodeQuery,PagingVM.pagingSearchGeneral,searchEvent);
router.get('/event/byCategory/',checkJWT,tabTransformCat,PagingVM.pagingSearchByCategories,getEventCategories); //http://localhost:3040/search/event/byCategory?categories=1,2
router.get('/event/byLocality',checkJWT,tabTransformLoc,PagingVM.pagingSearchByLoc,getEventByLoc);
router.get('/event/all',checkJWT,PagingVM.paging,getAllEv);

router.get('/nbRows/byOwner/:id',checkJWT,EMVM.searchedEvent,getNbEventByOwner);
router.get('/nbRows/byUser/:id',checkJWT,EMVM.searchedEvent,getNbEventByUser);
router.get('/nbRows/generic',checkJWT,decodeQuery,EMVM.eventToCountRows,getNbRowsBySearch);
router.get('/nbRows/byCategories/', checkJWT, EMVM.eventToCountRowsSearchByCategories, getNbRowsSearchByCategories);
router.get('/nbRows/byLocalities/',checkJWT, EMVM.eventToCountRowsSearchByLocalities, getNbRowsSearchByLocalities);

export default router;

