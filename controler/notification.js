import * as notificationModel from "../model/notification.js";
import {pool} from "../database/database.js";

export const getNotification = async (req, res) => {
    try{
        const notification =  await notificationModel.readNotifiation(pool, req.params);
        if(notification){
            return res.send(notification);
        }
        return res.sendStatus(404);
    }catch(err){
        return res.sendStatus(500);
    }
}
export const deleteNotification = async (req, res) => {
    try{
        await notificationModel.deleteNotification(pool, req.params);
        return res.sendStatus(200);
    }catch (err){
        return res.sendStatus(500);
    }
}
export const updateNotification = async (req, res) => {
    try{
        const response = await notificationModel.updateNotification(pool, req.body);
        if(response){
            return res.sendStatus(200);
        }
        return res.sendStatus(404);
    }catch(err){
        return res.sendStatus(500);
    }
}
export const createNotification = async (req, res) => {
    try{
        const id = await notificationModel.createNotification(pool, req.body);
        if(id){
            return res.sendStatus(200);
        }
        return res.sendStatus(400);
    }catch(err){
        return res.sendStatus(500);
    }
}