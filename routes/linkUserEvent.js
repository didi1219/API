import Router from 'express-promise-router';
import {
    addLinkUserEvent,
    updateLinkUserEvent,
    getLinkUserEvent,
    deleteLinkUserEvent,
    getNbLinkUserEvents,
    countRows,
    deleteLinkUserEvents,
    getInvitationNotAcceptedByCurrentId,
    acceptInvitation,
    declineInvitation,
    isFavorite,
    getFavoriteEvent,
    getNbLinkUserEventByCurrentUser,
    followAEvent,
    unFollowAnEvent,
    linkUserEventAccepted
} from "../controler/linkUserEvent.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {linkUserEventValidatorMiddleware as LUEVM, tabValidatorMiddleware as TabVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";

const router = Router();

router.post('/',checkJWT,admin,LUEVM.linkUserEventToAdd, addLinkUserEvent);
router.patch('/',checkJWT,admin,LUEVM.linkUserEventToUpdate, updateLinkUserEvent);
router.get('/:id',LUEVM.searchedLinkUserEvent, getLinkUserEvent);
router.delete('/:id',checkJWT,admin,LUEVM.linkUserEventToDelete, deleteLinkUserEvent);

router.get('/nbLinkUserEvents/search',checkJWT,PagingVM.paging,getNbLinkUserEvents);
router.get('/nbLinkUserEvents/count/',checkJWT,countRows);
router.get('/get/invitation',checkJWT,PagingVM.paging,getInvitationNotAcceptedByCurrentId);
router.get('/favorite/event', checkJWT,PagingVM.paging,getFavoriteEvent);

router.post('/follow/event/',checkJWT,LUEVM.linkUserEventToFollow,followAEvent);

router.get('/nbLinkUserEvent/byUser/', checkJWT,getNbLinkUserEventByCurrentUser);
router.delete('/unfollow/event/:event_id',checkJWT,LUEVM.linkUserEventToUnFollow,unFollowAnEvent);
router.get('/follow/accepted/:event_id',checkJWT,LUEVM.linkUserEventIsAccepted,linkUserEventAccepted)

router.delete('/many/deleteLinkUserEvent/',checkJWT,admin,TabVM.ids,deleteLinkUserEvents);

router.patch('/invitation/accept/', checkJWT,LUEVM.linkUserEventInvitationPatch,acceptInvitation);
router.patch('/invitation/decline/', checkJWT,LUEVM.linkUserEventInvitationPatch,declineInvitation);
router.patch('/setFavorite/:event_id',checkJWT,LUEVM.linkUserEventInvitationPatch,isFavorite);

export default router;