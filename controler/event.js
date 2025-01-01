/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: 'Unique identifier for the event'
 *         title:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: 'Title of the event'
 *         description:
 *           type: string
 *           maxLength: 250
 *           description: 'Description of the event'
 *         event_start:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$'
 *           description: 'Start date and time of the event in the format YYYY-MM-DDTHH:MM or YYYY-MM-DD HH:MM'
 *         event_end:
 *           type: string
 *           pattern: '^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$|^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$'
 *           description: 'End date and time of the event in the format YYYY-MM-DDTHH:MM or YYYY-MM-DD HH:MM'
 *         street_number:
 *           type: string
 *           minLength: 1
 *           maxLength: 250
 *           description: 'Street number or address of the event location'
 *         is_private:
 *           type: boolean
 *           description: 'Indicates whether the event is private or public'
 *         picture_path:
 *           type: string
 *           maxLength: 250
 *           description: 'Path to the event image or picture'
 *         location_id:
 *           type: integer
 *           description: 'ID of the location where the event takes place'
 *         category_id:
 *           type: integer
 *           description: 'ID of the category to which the event belongs'
 *       required:
 *         - id
 *         - title
 *         - event_start
 *         - event_end
 *         - location_id
 *         - category_id
 */

import {pool} from '../database/database.js';
import { logger } from '../middleware/logger.js';
import * as eventModel from '../model/event.js';

const table = "Event"

export const getNbEventsOfUserCreated = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        logger.info(`Fetching number of events created by user with ID: ${req.val.user_id}`);
        const event = await eventModel.readNbEventsOfUserCreated(pool, req.val);
        if (event) {
            logger.info(`Successfully fetched events for user with ID: ${req.val.user_id}`);
            res.json(event);
        } else {
            logger.warn(`No events found for user with ID: ${req.val.user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching events for user with ID: ${req.val.user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getAllEventsOfUserSubscribed = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        logger.info(`Fetching all subscribed events for user with ID: ${req.val.user_id}`);
        const event = await eventModel.readAllEventsOfUserSubscribed(pool, req.val);
        if (event) {
            logger.info(`Successfully fetched  subscribed events for user with ID: ${req.val.user_id}`);
            res.json(event);
        } else {
            logger.warn(`No subscribed events found for user with ID: ${req.val.user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching subscribed events for user with ID: ${req.val.user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const addEventOneSelf = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        logger.info(`Adding a new event for user with ID: ${req.val.user_id}`);
        const id = await eventModel.createEvent(pool, req.val);
        logger.info(`Successfully created event with ID: ${id}`);
        res.status(201).json({ id });
    } catch (error) {
        logger.error(`Error adding new event for user with ID: ${req.val.user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteEventOneSelf = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        logger.info(`Attempting to delete an event for user with ID: ${req.val.user_id}`);
        const event = await eventModel.searchEvent(pool, req.val);
        if (event.length > 0) {
            req.val.id = event[req.val.id - 1].id;
            await eventModel.deleteEvent(pool, req.val);
            logger.info(`Successfully deleted event with ID: ${req.val.id}`);
            res.sendStatus(204);
        } else {
            logger.warn(`No event found to delete for user with ID: ${req.val.user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error deleting event for user with ID: ${req.val.user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateEventOneSelf = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        logger.info(`Attempting to update an event for user with ID: ${req.val.user_id}`);
        const event = await eventModel.searchEvent(pool, req.val);
        if (event.length > 0) {
            req.val.id = event[req.val.id - 1].id;
            const id = await eventModel.updateEvent(pool, req.val);
            logger.info(`Successfully updated event with ID: ${req.val.id}`);
            res.status(201).json({ id });
        } else {
            logger.warn(`No event found to update for user with ID: ${req.val.user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error updating event for user with ID: ${req.val.user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};


/**
 * @swagger
 * components:
 *   responses:
 *     getEvent:
 *       description: Return event
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 */
export const getEvent = async (req, res) => {
    try {
        logger.info(`Fetching event for user with ID: ${req.val.id}`);
        const event = await eventModel.readEvent(pool, req.val);
        if (event) {
            logger.info(`Successfully fetched event for user with ID: ${req.val.id}`);
            res.json(event);
        } else {
            logger.warn(`No event found for user with ID: ${req.val.user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching event for user with ID: ${req.val.id}, error: ${error.message}`);
        res.sendStatus(500);
    }
};

export const addEvent = async (req, res) => {
    try {
        logger.info(`Adding a new event`);
        const id = await eventModel.createEvent(pool, req.val);
        logger.info(`Successfully created event with ID: ${id}`);
        res.status(201).json({ id });
    } catch (error) {
        logger.error(`Error adding event: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteEvent = async (req, res) => {
    try {
        logger.info(`Attempting to delete event with ID: ${req.val.id}`);
        await eventModel.deleteEvent(pool, req.val);
        logger.info(`Successfully deleted event with ID: ${req.val.id}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting event with ID: ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateEvent = async (req, res) => {
    try {
        logger.info(`Attempting to update event with ID: ${req.val.id}`);
        logger.info(`Successfully updated event with ID: ${req.val.id}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error updating event with ID: ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getDiscussionEvents = async (req, res) => {
    try {
        logger.info(`Fetching discussion events for user with ID: ${req.val.user_id}`);
        const response = await eventModel.listDiscussionEvent(pool, req.val);
        if (response) {
            logger.info(`Successfully fetched discussion events for user with ID: ${req.val.user_id}`);
            res.json(response);
        } else {
            logger.warn(`No discussion events found for user with ID: ${req.val.user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching discussion events for user with ID: ${req.val.user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getAllEventTitle = async (req, res) => {
    try {
        logger.info(`Fetching all event titles`);
        const categories = await eventModel.readAllEventTitle(pool);
        if (categories) {
            logger.info(`Successfully fetched all event titles`);
            res.json(categories);
        } else {
            logger.warn(`No event titles found`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching event titles: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbEvents = async (req, res) => {
    try {
        logger.info(`Fetching number of events`);
        const events = await eventModel.readNbEvents(pool, req.val);
        if (events) {
            logger.info(`Successfully fetched number of events`);
            res.json(events);
        } else {
            logger.warn(`No events found`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching number of events: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getTotalRowEvent = async (req, res) => {
    try {
        logger.info(`Fetching total number of events`);
        const totalRow = await eventModel.readTotalRowEvent(pool);
        if (totalRow) {
            logger.info(`Successfully fetched total number of events`);
            res.json(totalRow);
        } else {
            logger.warn(`No events found`);
            res.sendStatus(204);
        }
    } catch (error) {
        logger.error(`Error fetching total number of events: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteEvents = async (req, res) => {
    try {
        logger.info(`Attempting to delete multiple events`);
        await eventModel.deleteManyEvents(pool, req.val);
        logger.info(`Successfully deleted multiple events`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting multiple events: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbSubscribers = async (req, res) => {
    try {
        logger.info(`Fetching number of subscribers for event with ID: ${req.val.id}`);
        const nbSubscribers = await eventModel.countSubscribers(pool, req.val);
        logger.info(`Successfully fetched number of subscribers: ${nbSubscribers}`);
        res.status(200).send({ count: nbSubscribers });
    } catch (error) {
        logger.error(`Error fetching number of subscribers for event with ID: ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getOwnerEvent = async (req, res) => {
    try {
        const response = await eventModel.searchOwnerEvent(pool, req.val);
        if(response){
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};