import Router from 'express-promise-router';
import {
    getNbEventsOfUserCreated,
    getAllEventsOfUserSubscribed,
    addEventOneSelf,
    deleteEventOneSelf,
    updateEventOneSelf,
    getEvent,
    addEvent,
    deleteEvent,
    updateEvent,
    getDiscussionEvents,
    getNbEvents,
    getTotalRowEvent,
    getAllEventTitle,
    deleteEvents,
    getNbSubscribers,
    getOwnerEvent
} from '../controler/event.js'
import {
    eventManagementValidatorMiddleware as EMVM,
    eventValidatorMiddleware as EVM,
    tabValidatorMiddleware as TabVM
} from "../middleware/validation.js";
import {pagingValidatorMiddleWare as PagingVM} from "../middleware/validation.js";
import {checkJWT} from "../middleware/identification/JWT.js";
import {inEvent} from "../middleware/authorization/mustBeInEvent.js";
import {admin} from "../middleware/authorization/mustBeAdmin.js";

import {logger} from '../middleware/logger.js';

const router = new Router();

router.use((req, res, next) => {
    logger.info(`Accessing event route: ${req.method} ${req.url}`);
    next();
  });

router.get('/created',checkJWT,PagingVM.paging,getNbEventsOfUserCreated);
router.get('/subscribed',checkJWT,PagingVM.paging,getAllEventsOfUserSubscribed);
router.get('/nbSubscribers/:id',checkJWT,EVM.searchedEvent,getNbSubscribers);
router.post('/oneself/',checkJWT,EVM.eventToAdd,addEventOneSelf);
router.patch('/oneself/',checkJWT,EVM.eventToUpdate,updateEventOneSelf);
router.delete('/:id',checkJWT,EVM.eventToDelete,deleteEventOneSelf);

router.get('/owner/username/:id',checkJWT,EVM.searchedEvent,getOwnerEvent);

router.get('/:id/discussions', checkJWT, EVM.eventToListDiscussions, inEvent, getDiscussionEvents);
router.get('/discussion/event',checkJWT,admin, PagingVM.pagingWithId,getDiscussionEvents);

/**
 * @swagger
 * /event/id/{id}:
 *   get:
 *     summary: Fetch an existing event
 *     description: This route fetch an existing event.
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/EventID'
 *         required: true
 *         description: The unique identifier of the event to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved the event with the given ID.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       400:
 *         description: Invalid event ID format.
 *       404:
 *         description: Event not found for the given ID.
 *       500:
 *         description: Internal server error.
 */
router.get('/id/:id',EMVM.searchedEvent,getEvent);
/**
 * @swagger
 * /event/delete/{id}:
 *   delete:
 *     summary: Delete an existing event
 *     description: This route delete an existing event.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           $ref: '#/components/schemas/EventID'
 *         required: true
 *         description: The unique identifier of the event to retrieve.
 *     responses:
 *       204:
 *         description: Event successfully deleted
 *       400:
 *         description: Bad request - Validation failed or invalid input
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/mustBeAdmin'
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:id',checkJWT, admin, EMVM.eventToDelete, deleteEvent);
/**
 * @swagger
 * /event/:
 *   post:
 *     summary: Crete a new event
 *     description: This route create a new event.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventToAddSchema'
 *     responses:
 *       201:
 *         description: Event successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID of the newly created category
 *       400:
 *         description: Bad request - Validation failed or invalid input
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/mustBeAdmin'
 *       500:
 *         description: Internal server error
 */
router.post('/',checkJWT,admin,EMVM.eventToAdd, addEvent);
/**
 * @swagger
 * /event/:
 *   patch:
 *     summary: Update an existing Event
 *     description: This route updates an existing event. The user must have admin privileges to perform this action.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Event
 *     requestBody:
 *       required: true
 *       description: The data required to update an existing Event. You must provide a valid ID
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventToUpDateSchema'
 *     responses:
 *       204:
 *         description: Event successfully deleted
 *       400:
 *         description: Bad request - Validation failed or invalid input
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/mustBeAdmin'
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
router.patch('/',checkJWT,admin,EMVM.eventToUpdate,updateEvent);

router.get('/get/allTitle',getAllEventTitle);

router.get('/nbEvents/search',PagingVM.paging,getNbEvents);
router.get('/nbEvents/count/',getTotalRowEvent);

router.delete('/many/deleteEvent/',checkJWT,admin,TabVM.ids,deleteEvents);



export default router;