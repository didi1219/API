/**
 * @swagger
 * components:
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  responses:
 *     UnauthorizedError:
 *        description: JWT is missing or invalid
 *        content:
 *           text/plain:
 *              schema:
 *                 type: string
 */
import {verify} from '../../util/jwt.js';
import {logger} from '../logger.js';

export const checkJWT = async (req, res, next) => {
    logger.info(`Checking JWT`);
    const authorize = req.get('authorization');
    if(authorize?.includes('Bearer')){
        const jwtEncoded = authorize.split(' ')[1];
        try {
            req.session = verify(jwtEncoded);
            logger.info(`JWT accpeted`);
            next();
        } catch (e){
            logger.warn(`Verify failed: ${JSON.stringify(error.messages, null, 2)}`);
            res.status(401).send(e.message);
        }
    } else {
        logger.warn(`No JWT`);
        res.status(401).send('No jwt');
    }
};