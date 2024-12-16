import Router from 'express-promise-router';
import {
    addLinkUserEvent,
    updateLinkUserEvent,
    getLinkUserEvent,
    deleteLinkUserEvent,
    getAllLinkUserEvent,
    countRows,
    deleteLinkUserEvents,
    getInvitationNotAcceptedByCurrentId,
    acceptInvitation,
    declineInvitation,
    isFavorite,
    getFavoriteEvent
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

router.get('/getAll/linkUserEvent',checkJWT,PagingVM.paging,getAllLinkUserEvent);
router.get('/nbLinkUserEvent/count/',checkJWT,countRows);
router.get('/getInvitation/',checkJWT,getInvitationNotAcceptedByCurrentId);
router.get('/favoriteEvent', checkJWT,PagingVM.paging,getFavoriteEvent);

router.delete('/many/deleteLinkUserEvent',checkJWT,LUEVM.linkUserEventToDeleteMany,deleteLinkUserEvents);

router.patch('/invitation/accept/:event_id', checkJWT,LUEVM.linkUserEventInvitationPatch,acceptInvitation);
router.patch('/invitation/decline/:event_id', checkJWT,LUEVM.linkUserEventInvitationPatch,declineInvitation);
router.patch('/setFavorite/:event_id',checkJWT,LUEVM.linkUserEventInvitationPatch,isFavorite);

export default router;