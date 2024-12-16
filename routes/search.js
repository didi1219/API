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
    getPublicEvents
} from "../controler/search.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import { pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import { searchValidatorMiddleWare as SM} from "../middleware/validation.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {tabTransformLoc, tabTransformCat} from '../middleware/validator/paging.js'

const router = new Router();

router.get('/eventName/name',checkJWT,PagingVM.pagingSearchByName,searchEventByName);
router.get('/events/search',checkJWT,PagingVM.pagingSearchGeneral,searchEvent);
router.get('/events/count',checkJWT,PagingVM.pagingSearchGeneral,getTotalRowEventGenericSearched);
router.get('/events/type/public/',checkJWT,PagingVM.paging,getPublicEvents);

router.get('/event/byCategory',checkJWT,tabTransformCat,PagingVM.pagingSearchByCategories,getEventCategories);
router.get('/event/byLocality',checkJWT,tabTransformLoc,PagingVM.pagingSearchByLoc,getEventByLoc);

//router.patch('/isFavorite/:id',checkJWT, setFavoriteEvent);

router.get('/byOwner/nb/:id',checkJWT,admin,SM.searchedId,getNbEventByOwner);
router.get('/byUser/nb/:id',checkJWT,admin,SM.searchedId,getNbEventByUser);


export default router;

