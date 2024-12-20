import * as notificationModel from "../model/notification.js";
import { pool } from "../database/database.js";
import {logger} from '../middleware/logger.js';

export const getNotification = async (req, res) => {
    logger.info(`Entering getNotification with params: ${JSON.stringify(req.val)}`);
    try {
        const notification = await notificationModel.readNotification(pool, req.val);
        if (notification) {
            logger.info(`Notification found: ${JSON.stringify(notification)}`);
            res.json(notification);
        } else {
            logger.warn('Notification not found');
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching notification: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const addNotification = async (req, res) => {
    logger.info(`Entering addNotification with params: ${JSON.stringify(req.val)}`);
    try {
        const id = await notificationModel.createNotification(pool, req.val);
        logger.info(`Notification created with ID: ${id}`);
        res.status(201).json({ id });
    } catch (err) {
        logger.error(`Error adding notification: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteNotification = async (req, res) => {
    logger.info(`Entering deleteNotification with params: ${JSON.stringify(req.val)}`);
    try {
        await notificationModel.deleteNotification(pool, req.val);
        logger.info(`Notification deleted: ${JSON.stringify(req.val)}`);
        res.sendStatus(204);
    } catch (err) {
        logger.error(`Error deleting notification: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateNotification = async (req, res) => {
    logger.info(`Entering updateNotification with params: ${JSON.stringify(req.val)}`);
    try {
        await notificationModel.updateNotification(pool, req.val);
        logger.info(`Notification updated: ${JSON.stringify(req.val)}`);
        res.sendStatus(204);
    } catch (err) {
        logger.error(`Error updating notification: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbNotifications = async (req, res) => {
    logger.info(`Entering getNbNotifications with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await notificationModel.readNbNotifications(pool, req.val);
        if (response) {
            logger.info(`Number of notifications: ${response}`);
            res.json(response);
        } else {
            logger.warn('No notifications found');
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching number of notifications: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    logger.info(`Entering countRows with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await notificationModel.readTotalRowNotifications(pool);
        if (response) {
            logger.info(`Total rows of notifications: ${response}`);
            res.json(response);
        } else {
            logger.warn('No rows found for notifications');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error counting notification rows: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteNotifications = async (req, res) => {
    logger.info(`Entering deleteNotifications with params: ${JSON.stringify(req.val)}`);
    try {
        await notificationModel.deleteManyNotifications(pool, req.val);
        logger.info(`Multiple notifications deleted: ${JSON.stringify(req.val)}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting multiple notifications: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNotificationByCurrentUser = async (req, res) => {
    logger.info(`Entering getNotificationByCurrentUser with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const notification = await notificationModel.getNotificationByUser(pool, req.val);
        const nbRows = await notificationModel.nbRowsNotificationByUser(pool, req.val);
        logger.info(`Notifications for current user: ${JSON.stringify(notification)} with ${nbRows} rows`);
        res.status(201).json({ notification, nbRows });
    } catch (error) {
        logger.error(`Error fetching notifications for current user: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};
