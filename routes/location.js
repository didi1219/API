import Router from 'express-promise-router';
import {
    getLocation,
    addLocation,
    deleteLocation,
    updateLocation,
    getAllLocations,
    countRows,
    getAllLocation,
    deleteLocations
} from '../controler/location.js'

import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {locationValidatorMiddleware as LVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {tabValidatorMiddleware as TabVM} from "../middleware/validation.js";
import {tabIds} from "../middleware/validator/tabValidator.js";
import {createDiscussionEvent} from "../model/discussionEvent.js";


const router = new Router();

router.get('/:id',LVM.searchedLocation,getLocation);
router.post('/',checkJWT,admin,LVM.locationToAdd,addLocation);
router.delete('/:id',checkJWT,admin,LVM.locationToDelete,deleteLocation);
router.patch('/',checkJWT,admin,LVM.locationToUpdate,updateLocation);

router.get('/get/all',getAllLocation);

router.get('/getAll/location', checkJWT,PagingVM.paging,getAllLocations);
router.get('/nbLocation/count/',checkJWT,countRows);

router.delete('/many/deleteLocation',checkJWT,tabIds,TabVM.ids,deleteLocations);

export default router;