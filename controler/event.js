import {pool} from '../database/database.js'
import * as eventModel from '../model/event.js'

export const getEvent = async(req,res) => {
    try {
        const event = await eventModel.readEvent(pool,req.params);
        if(event){
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    }catch(error) {
        res.sendStatus(500);
    }
};

export const addEvent = async (req,res) => {
    try{
        const id = await eventModel.createEvent(pool,req.body);
        console.log(req.body);
        res.status(201).json({id});
    } catch (error) {
        res.sendStatus(500);
    }
};

export const deleteEvent = async (req,res) => {
    try {
        await eventModel.deleteEvent(pool,req.params);
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    }
};

export const updateEvent = async (req,res) => {
    try {
        await eventModel.updateEvent(pool,req.body);
        res.sendStatus(204);
    } catch(error){
        res.sendStatus(500);
    }
};