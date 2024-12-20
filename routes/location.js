import Router from 'express-promise-router';
import {
    getLocation,
    addLocation,
    deleteLocation,
    updateLocation,
    getNbLocations,
    countRows,
    getAllLocations,
    deleteLocations,
} from '../controler/location.js'

import {checkJWT} from "../middleware/identification/JWT.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";
import {locationValidatorMiddleware as LVM} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {tabValidatorMiddleware as TabVM} from "../middleware/validation.js";

import {logger} from '../middleware/logger.js';

const router = new Router();

router.use((req, res, next) => {
    logger.info(`Accessing location route: ${req.method} ${req.url}`);
    next();
  });

router.get('/:id',LVM.searchedLocation,getLocation);
router.post('/',checkJWT,admin,LVM.locationToAdd,addLocation);
router.delete('/:id',checkJWT,admin,LVM.locationToDelete,deleteLocation);
router.patch('/',checkJWT,admin,LVM.locationToUpdate,updateLocation);

router.get('/get/allTitle',checkJWT,getAllLocations);

router.get('/nbLocations/search', checkJWT,PagingVM.paging,getNbLocations);
router.get('/nbLocations/count/',checkJWT,countRows);

router.delete('/many/deleteLocation/',checkJWT,admin,TabVM.ids,deleteLocations);

export default router;