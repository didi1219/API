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

const router = new Router();

router.get('/eventName/name?',searchEventByName);
router.get('/general/search?',searchEvent);
router.get('/event/byCategory',getEventCategories); //http://localhost:3040/search/event/byCategory?categories=1,2
router.get('/event/byLocality',getEventByLoc);
router.get('/event/all',getAllEv);

//router.patch('/isFavorite/:id',checkJWT, setFavoriteEvent);

router.get('/byOwner/:id',getAllEventOfOwner);
router.get('/byOwner/nb/:id', getNbEventByOwner);
router.get('/byUser/nb/:id',getNbEventByUser);


export default router;

