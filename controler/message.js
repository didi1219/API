import * as messageModel from '../model/message.js';
import {pool} from "../database/database.js"

export const getMessage = async (req, res) => {
    try{
        const message = await messageModel.readMessage(pool, req.params);
        if(message){
            return res.status(200).send(message);
        }
        return res.sendStatus(404);
    }catch(err){
        console.log(err);
        return res.sendStatus(500);
    }
}
export const updateMessage = async (req, res) => {
    try{
        const id = await messageModel.updateMessage(pool, req.body);
        if(id){
            return res.sendStatus(200);
        }
        return res.sendStatus(404);
    }catch(err){
        return res.sendStatus(500);
    }
}
export const deleteMessage = async (req, res) => {
    try{
        await messageModel.deleteMessage(pool, req.params);
        return res.sendStatus(200);
    }catch(err){
        return res.sendStatus(500);
    }
}
export const createMessage = async (req, res) => {
    try{
        const id = await messageModel.createMessage(pool, req.body);
        if(id){
            return res.status(200).send(id);
        }
        return res.sendStatus(404);
    }catch(err){
        return res.sendStatus(500);
    }
}