import * as notificationModel from "../model/notification.js";
import {pool} from "../database/database.js";

export const getNotification = async (req, res) => {
    try {
        const notification =  await notificationModel.readNotification(pool, req.val);
        if(notification){
            res.json(notification)
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        res.sendStatus(500);
    }
};

export const addNotification = async (req, res) => {
    try {
        const id = await notificationModel.createNotification(pool, req.val);
        res.status(201).json({id});
    } catch(err) {
        res.sendStatus(500);
    }
};

export const deleteNotification = async (req, res) => {
    try {
        await notificationModel.deleteNotification(pool, req.val);
        return res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateNotification = async (req, res) => {
    try {
        await notificationModel.updateNotification(pool, req.val);
        res.sendStatus(204);
    } catch(err) {
        res.sendStatus(500);
    }
};

export const getNbNotifications = async (req, res) => {
    try {
        const response = await notificationModel.readNbNotifications(pool, req.val);
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    try{
        const response = await notificationModel.readTotalRowNotifications(pool);
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
};

export const deleteNotifications = async (req,res) => {
    try{
        await notificationModel.deleteManyNotifications(pool, req.val);
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
};

export const getNotificationByCurrentUser = async (req, res) => {
    try{
        req.val.user_id = req.session.id;
        const notification = await notificationModel.getNotificationByUser(pool,req.val);
        const nbRows = await notificationModel.nbRowsNotificationByUser(pool,req.val);
        res.status(201).json({notification, nbRows});
    }catch(error){
        res.sendStatus(500);
    }
}