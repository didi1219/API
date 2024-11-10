import Router from 'express-promise-router';
import {default as categoryRouter} from './category.js';
import {default as locationRouter} from './location.js';
import {default as eventRouter} from './event.js';

const router = new Router();

router.use('/category',categoryRouter);
router.use('/location',locationRouter);
router.use('/event',eventRouter);


router.use((req,res) =>{
    console.error(`Bad URL: ${req.path}`);
    return res.status(404).send("Il ne s'agit pas d'une URL prise en charge par l'application");
})

export default router;