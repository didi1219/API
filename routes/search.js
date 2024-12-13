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
    getNbEventByUser
} from "../controler/search.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {tabTransformLoc, tabTransformCat} from '../middleware/validator/paging.js';
import { decodeQuery } from '../middleware/decodeURI/decode.js';

const router = new Router();

router.get('/eventName/name',checkJWT,PagingVM.pagingSearchByName,searchEventByName);
router.get('/general/search',checkJWT,decodeQuery,PagingVM.pagingSearchGeneral,searchEvent);
router.get('/event/byCategory',checkJWT,tabTransformCat,PagingVM.pagingSearchByCategories,getEventCategories); //http://localhost:3040/search/event/byCategory?categories=1,2
router.get('/event/byLocality',checkJWT,tabTransformLoc,PagingVM.pagingSearchByLoc,getEventByLoc);
router.get('/event/all',checkJWT,PagingVM.paging,getAllEv);

router.get('/byOwner/nb/:id',checkJWT,getNbEventByOwner);
router.get('/byUser/nb/:id',checkJWT,getNbEventByUser);


export default router;

