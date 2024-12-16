import Router from 'express-promise-router';
import {
    addLinkUserEvent,
    updateLinkUserEvent,
    getLinkUserEvent,
    deleteLinkUserEvent,
    getNbLinkUserEvents,
    countRows,
    deleteLinkUserEvents
} from "../controler/linkUserEvent.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {linkUserEventValidatorMiddleware as LUEVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";

const router = Router();

router.post('/',checkJWT,admin,LUEVM.linkUserEventToAdd, addLinkUserEvent);
router.patch('/',checkJWT,admin,LUEVM.linkUserEventToUpdate, updateLinkUserEvent);
router.get('/',LUEVM.searchedLinkUserEvent, getLinkUserEvent);
router.delete('/',checkJWT,admin,LUEVM.linkUserEventToDelete, deleteLinkUserEvent);

router.get('/nbLinkUserEvents/search',checkJWT,PagingVM.paging,getNbLinkUserEvents);
router.get('/nbLinkUserEvents/count/',checkJWT,countRows);

router.delete('/many/deleteLinkUserEvent/',checkJWT,admin,LUEVM.linkUserEventToDeleteMany,deleteLinkUserEvents);


export default router;