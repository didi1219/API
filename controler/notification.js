import * as notificationModel from "../model/notification.js";
import {pool} from "../database/database.js";
import * as userModel from "../model/user.js";

export const getNotification = async (req, res) => {
    try{
        const notification =  await notificationModel.readNotification(pool, req.val);
        if(notification){
            res.json(notification)
        } else {
            res.sendStatus(404);
        }
    }catch(err){
        res.sendStatus(500);
    }
};

export const addNotification = async (req, res) => {
    try{
        const id = await notificationModel.createNotification(pool, req.val);
        res.status(201).json({id});
    }catch(err){
        res.sendStatus(500);
    }
};

export const deleteNotification = async (req, res) => {
    try{
        await notificationModel.deleteNotification(pool, req.val);
        return res.sendStatus(204);
    }catch (err){
        res.sendStatus(500);
    }
};

export const updateNotification = async (req, res) => {
    try{
        await notificationModel.updateNotification(pool, req.val);
        res.sendStatus(204);
    }catch(err){
        res.sendStatus(500);
    }
};

export const getAllNotifications = async (req, res) => {
    try{
        const response = await notificationModel.readAllNotifications(pool, req.val)
        res.json(response)
    }catch(err){
        res.sendStatus(500);
    }
}
export const countRows = async (req, res) => {
    try{
        const response = await notificationModel.nbRows(pool);
        res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const deleteNotifications = async (req,res) => {
    try{
        for (const id of req.val.ids) {
            await notificationModel.deleteNotification(pool, {id});
        }
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
}