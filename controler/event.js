import {pool} from '../database/database.js';
import * as eventModel from '../model/event.js';

/*
export const updateEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const event = await eventModel.searchEvent(pool,req.val);
        console.log(event);
        res.sendStatus(204);
    } catch (error){
        res.sendStatus(500);
    }
};*/

export const addEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        const id = await eventModel.createEvent(pool, req.val);
        res.status(201).json({id});
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
}