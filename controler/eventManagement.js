import {pool} from '../database/database.js';
import * as eventModel from '../model/event.js';

export const getEvent = async(req,res) => {
    try {
        const event = await eventModel.readEvent(pool,req.val);
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
        res.sendStatus(500);
    }
};

export const getDiscussionEvents = async (req,res) => {
    try {
        const discussionEvents = await eventModel.listDiscussionEvent(pool, req.params);
        res.status(200).send(discussionEvents);
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getEvents = async (req, res) => {
    try {
        const events = await eventModel.readEvents(pool, req.val);
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