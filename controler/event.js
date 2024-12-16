import {pool} from '../database/database.js';
import * as eventModel from '../model/event.js';

export const getNbEventsOfUserCreated = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const event = await eventModel.readNbEventsOfUserCreated(pool,req.val);
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
};

export const addEventOneSelf = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const id = await eventModel.createEvent(pool, req.val);
        res.status(201).json({id});
    } catch(error){
        res.sendStatus(500);
    }
};

export const deleteEventOneSelf = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const event = await eventModel.searchEvent(pool,req.val);
        req.val.id = event[req.val.id - 1].id;

        await eventModel.deleteEvent(pool,req.val);
        res.sendStatus(204);
    } catch(error) {
        res.sendStatus(500);
    }
};

export const updateEventOneSelf = async (req, res) => {
    try {
        req.val.user_id = req.session.id;

        const event = await eventModel.searchEvent(pool,req.val);
        req.val.id = event[req.val.id - 1].id;

        await eventModel.updateEvent(pool,req.val);
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    }
};

export const getEvent = async(req,res) => {
    try {
        const event = await eventModel.readEvent(pool,req.val);
        if(event){
            res.json(event);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const addEvent = async (req,res) => {
    try {
        const id = await eventModel.createEvent(pool,req.val);
        res.status(201).json({id});
    } catch (error) {
        res.sendStatus(500);
    }
};

export const deleteEvent = async (req,res) => {
    try {
        await eventModel.deleteEvent(pool,req.val);
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    }
};

export const updateEvent = async (req,res) => {
    try {
        await eventModel.updateEvent(pool,req.val);
        res.sendStatus(204);
    } catch(error){
        console.log(error)
        res.sendStatus(500);
    }
};

export const getDiscussionEvents = async (req,res) => {
    try {
        const response = await eventModel.listDiscussionEvent(pool, req.val);
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getAllEventTitle = async(req, res) => {
    try {
        const categories = await eventModel.readAllEventTitle(pool);
        if(categories){
            res.json(categories);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getNbEvents = async (req, res) => {
    try {
        const events = await eventModel.readNbEvents(pool, req.val);
        if(events){
            res.json(events);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
};

export const getTotalRowEvent = async (req, res) => {
    try {
        const totalRow = await eventModel.readTotalRowEvent(pool);
        if(totalRow){
            res.json(totalRow);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};
export const deleteEvents = async (req,res) => {
    try{
        await eventModel.deleteManyEvents(pool, req.val)
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
};



export const getNbSubscribers = async (req, res) => {
    try {
        const nbSubscribers = await eventModel.countSubscribers(pool, req.val);
        res.status(200).send({count: nbSubscribers});
    } catch (error) {
        res.sendStatus(500);
    }
}