import {pool} from '../database/database.js';
import * as eventModel from '../model/event.js';
import {readEventSubcribed} from "../model/event.js";

export const updateEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const event = await eventModel.searchEvent(pool,req.val);
        console.log(event);
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    }
};

export const addEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const id = await eventModel.createEvent(pool, req.val);
        res.status(201).json({id});
    } catch(error){
        res.sendStatus(500);
    }
};

export const getEventSubscribed = async (req, res) => {
    try {
        req.val = {}
        req.val.user_id = req.session.id;
        const events = await eventModel.readEventSubcribed(pool,req.val);
        if(events){
            res.json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
};

export const getEventCreated = async (req, res) => {
    try {
        req.val = {}
        req.val.user_id = req.session.id;
        const events = await eventModel.readEventCreated(pool,req.val);
        if(events){
            res.json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
};