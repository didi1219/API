import Router from 'express-promise-router';

const router = new Router();

router.use((req,res) =>{
    console.error(`Bad URL: ${req.path}`);
    return res.status(404).send("Il ne s'agit pas d'une URL prise en charge par l'application");
})

export default router;