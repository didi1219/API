import * as messageModel from '../model/message.js';
import {pool} from "../database/database.js";
import {logger} from '../middleware/logger.js';

export const getMessage = async (req, res) => {
    logger.info(`Entering getMessage with params: ${JSON.stringify(req.val)}`);
    try {
        const message = await messageModel.readMessage(pool, req.val);
        if (message) {
            logger.info(`Message found: ${JSON.stringify(message)}`);
            res.json(message);
        } else {
            logger.warn('Message not found');
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching message: ${JSON.stringify(err.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const addMessage = async (req, res) => {
    logger.info(`Entering addMessage with params: ${JSON.stringify(req.val)}`);
    try {
        const id = await messageModel.createMessage(pool, req.val);
        logger.info(`Message created with ID: ${id}`);
        res.status(201).json({ id });
    } catch (err) {
        logger.error(`Error adding message: ${JSON.stringify(err.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteMessage = async (req, res) => {
    logger.info(`Entering deleteMessage with params: ${JSON.stringify(req.val)}`);
    try {
        await messageModel.deleteMessage(pool, req.val);
        logger.info(`Message deleted: ${JSON.stringify(req.val)}`);
        res.sendStatus(204);
    } catch (err) {
        logger.error(`Error deleting message: ${JSON.stringify(err.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteMessages = async (req, res) => {
    logger.info(`Entering deleteMessages with params: ${JSON.stringify(req.val)}`);
    try {
        await messageModel.deleteManyMessages(pool, req.val);
        logger.info(`Multiple messages deleted: ${JSON.stringify(req.val)}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting multiple messages: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateMessage = async (req, res) => {
    logger.info(`Entering updateMessage with params: ${JSON.stringify(req.val)}`);
    try {
        await messageModel.updateMessage(pool, req.val);
        logger.info(`Message updated: ${JSON.stringify(req.val)}`);
        res.sendStatus(204);
    } catch (err) {
        logger.error(`Error updating message: ${err.message}`);
        res.sendStatus(500);
    }
};

export const getNbMessages = async (req, res) => {
    logger.info(`Entering getNbMessages with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await messageModel.readNbMessages(pool, req.val);
        if (response) {
            logger.info(`Number of messages: ${response}`);
            res.json(response);
        } else {
            logger.warn('No messages found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching number of messages: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    logger.info(`Entering countRows with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await messageModel.readTotalRowMessages(pool);
        if (response) {
            logger.info(`Total rows of messages: ${response}`);
            res.json(response);
        } else {
            logger.warn('No rows found for messages');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error counting message rows: ${JSON.stringify(error.messages, null, 2)}`);
        res.sendStatus(500);
    }
};