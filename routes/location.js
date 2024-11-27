import Router from 'express-promise-router';
import {
    getLocation,
    addLocation,
    deleteLocation,
    updateLocation,
} from '../controler/location.js'

import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {locationValidatorMiddleware as LVM} from "../middleware/validation.js";


const router = new Router();

router.get('/:id',LVM.searchedLocation,getLocation);
router.post('/',checkJWT,admin,LVM.locationToAdd,addLocation);
router.delete('/:id',checkJWT,admin,LVM.locationToDelete,deleteLocation);
router.patch('/',checkJWT,admin,LVM.locationToUpdate,updateLocation);

export default router;