import {pool} from '../database/database.js';
import * as eventModel from '../model/event.js';

export const getAllEventsOfUserCreated = async (req, res) => {
    try{
        req.val.user_id = req.session.id;
        const event = await eventModel.readAllEventsOfUserCreated(pool,req.val);
        if(event){
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
};

export const getAllEventsOfUserSubscribed = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const event = await eventModel.readAllEventsOfUserSubscribed(pool,req.val);
        if(event) {
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
}

export const addEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const id = await eventModel.createEvent(pool, req.val);
        res.status(201).json({id});
    } catch(error){
        res.sendStatus(500);
    }
};

export const deleteEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const event = await eventModel.readAllEventsOfUserCreated(pool,req.val);
        req.val.id = event[req.val.id - 1].id;

        await eventModel.deleteEvent(pool,req.val);
        res.sendStatus(204);
    } catch(error) {
        res.sendStatus(500);
    }
};

export const updateEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;

        const event = await eventModel.readAllEventsOfUserCreated(pool,req.val);
        req.val.id = event[req.val.id - 1].id;

        await eventModel.updateEvent(pool,req.val);
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    }
};
