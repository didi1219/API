import {logger} from '../logger.js';
/**
 * @swagger
 * components:
 *  responses:
 *      mustBeAdmin:
 *          description: The action must be realized by a Admin
 *          content:
 *           text/plain:
 *              schema:
 *                 type: string
 */

export const admin = (req, res, next) => {
    logger.info('Check if current user is Admin')
    if(req.session.status === 'admin'){
        logger.info('Successfully check admin => the user is an admin')
        next();
    } else {
        logger.warn('The current User is not an admin');
        res.sendStatus(403);
    }
};