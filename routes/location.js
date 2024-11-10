import Router from 'express-promise-router';
import {
    getLocation,
    addLocation,
    deleteLocation,
    updateLocation,
} from '../controler/location.js'


const router = new Router();

router.get('/:id',getLocation);
router.post('/',addLocation);
router.delete('/:id',deleteLocation);
router.patch('/',updateLocation);

export default router;