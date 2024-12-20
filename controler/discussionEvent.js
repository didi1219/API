import * as discussionEventModel from '../model/discussionEvent.js';
import {pool} from "../database/database.js";
import {logger} from '../middleware/logger.js';

const table = "Discussion event"

export const getDiscussionEvent = async (req, res) => {
    try {
        logger.info(`Fetching ${table} with ID: ${req.val.id}`);
        const discussionEvent = await discussionEventModel.readDiscussionEvent(pool, req.val);
        if(discussionEvent) {
            logger.info(`Successfully retrieved ${table}: ${JSON.stringify(discussionEvent)}`);
            res.json(discussionEvent);
        } else {
            logger.warn(`${table}t with ID ${req.val.id} not found`);
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching ${table} with ID ${req.val.id}: ${JSON.stringify(error.messages, null, 2)}`);
        return res.sendStatus(500);
    }
};

export const addDiscussionEvent = async (req, res) => {
    try {
        logger.info(`Creating ${table}`);
        const id = await discussionEventModel.createDiscussionEvent(pool, req.val);
        logger.info(`Successfully created ${table} with new ID ${id}`);
        res.status(201).json({id});
    } catch(err) {
        logger.error(`Error creating ${table}`);
        return res.sendStatus(500);
    }
};

export const deleteDiscussionEvent = async (req, res) => {
    try {
        logger.info(`Deleting ${table} with ID: ${req.val.id}`);
        await discussionEventModel.deleteDiscussionEvent(pool, req.val);
        logger.info(`Successfully deleted ${table}`);
        res.sendStatus(200);
    } catch(err) {
        logger.error(`Error deleting ${table} with ID ${req.val.id}: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateDiscussionEvent = async (req, res) => {
    try {
        logger.info(`Updating ${table} with ID: ${req.val.id}`);
        const response = await discussionEventModel.updateDiscussionEvent(pool, req.val);
         if(response.rowCount > 0){
            logger.info(`Successfully updated ${table}`);
            res.sendStatus(204);
        }else{
            logger.warn(`${table} with ID ${req.val.id} not found`);
            res.status(404).send("Id not found");
        }
    } catch(err) {
        logger.error(`Error updating ${table} with ID ${req.val.id}: ${JSON.stringify(error.messages, null, 2)}`);
        return res.sendStatus(500);
    }
};

export const getMessagesInDiscussion = async (req, res) => {
    try {
        logger.info(`Fetching messages in discussion with ID: ${req.val.id}`);
        const messages = await discussionEventModel.readMessagesInDiscussion(pool, req.val);
        if (messages) {
            logger.info(`Successfully fetched messages for discussion ID: ${req.val.id}`);
            res.json(messages);
        } else {
            logger.warn(`No messages found for discussion ID: ${req.val.id}`);
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching messages for discussion ID: ${req.val.id}: ${JSON.stringify(err.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNewerMessagesInDiscussion = async (req, res) => {
    try {
        logger.info(`Fetching newer messages in discussion with ID: ${req.val.id}`);
        const messages = await discussionEventModel.readNewerMessagesInDiscussion(pool, req.val);
        if (messages) {
            logger.info(`Successfully fetched newer messages for discussion ID: ${req.val.id}`);
            res.json(messages);
        } else {
            logger.warn(`No newer messages found for discussion ID: ${req.val.id}`);
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching newer messages for discussion ID: ${req.val.id}: ${JSON.stringify(err.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getOlderMessagesInDiscussion = async (req, res) => {
    try {
        logger.info(`Fetching older messages in discussion with ID: ${req.val.id}`);
        const messages = await discussionEventModel.readOlderMessagesInDiscussion(pool, req.val);
        if (messages) {
            logger.info(`Successfully fetched older messages for discussion ID: ${req.val.id}`);
            res.json(messages);
        } else {
            logger.warn(`No older messages found for discussion ID: ${req.val.id}`);
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching older messages for discussion ID: ${req.val.id}: ${JSON.stringify(err.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getAllDiscussionTitle = async (req, res) => {
    try {
        logger.info(`Fetching all discussion titles`);
        const discussion = await discussionEventModel.readAllDiscussionTitle(pool);
        if (discussion) {
            logger.info(`Successfully fetched all discussion titles:${JSON.stringify(discussion)}`);
            res.json(discussion);
        } else {
            logger.warn(`No discussion titles found`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching discussion titles: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbDiscussionsEvent = async (req, res) => {
    try {
        const { page, perPage } = req.val;
        logger.info(`Fetching number of discussions with pagination: page ${page}, perPage ${perPage}`);
        const response = await discussionEventModel.readNbDiscussionsEvent(pool, { perPage, page });
        if (response) {
            logger.info(`Successfully fetched discussions with pagination: ${JSON.stringify(response)}`);
            res.json(response);
        } else {
            logger.warn(`No discussions found with pagination: page ${page}, perPage ${perPage}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching discussions with pagination: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countNbRows = async (req, res) => {
    try {
        logger.info(`Counting total rows in discussions table`);
        const response = await discussionEventModel.readTotalRowDiscussionsEvent(pool);
        if (response) {
            logger.info(`Successfully counted total rows in discussions table`);
            res.json(response);
        } else {
            logger.warn(`No rows found in discussions table`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error counting rows in discussions table: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteDiscussionEvents = async (req, res) => {
    try {
        logger.info(`Deleting discussion events with IDs: ${req.val.ids}`);
        await discussionEventModel.deleteDiscussionEvents(pool, req.val);
        logger.info(`Successfully deleted discussion events with IDs: ${req.val.ids}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting discussion events with IDs: ${req.val.ids}: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};