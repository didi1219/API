import * as messageModel from '../model/message.js';
import {pool} from "../database/database.js";

export const getMessage = async (req, res) => {
    try{
        const message = await messageModel.readMessage(pool, req.val);
        if(message){
            res.json(message)
        } else {
            res.sendStatus(404);
        }
    }catch(err){
        res.sendStatus(500);
    }
};

export const addMessage = async (req, res) => {
    try{
        const id = await messageModel.createMessage(pool, req.val);
        res.status(201).json({id});
    }catch(err){
        res.sendStatus(500);
    }
};

export const deleteMessage = async (req, res) => {
    try{
        await messageModel.deleteMessage(pool, req.val);
        res.sendStatus(204);
    }catch(err){
        res.sendStatus(500);
    }
};

export const updateMessage = async (req, res) => {
    try{
        await messageModel.updateMessage(pool, req.val);
        res.sendStatus(204);
    }catch(err){
        res.sendStatus(500);
    }
};