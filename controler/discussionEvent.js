import * as discussionEventModel from '../model/discussionEvent.js';
import {pool} from "../database/database.js";
import * as userModel from "../model/user.js";
import {getNbRows} from "../model/discussionEvent.js";


export const getDiscussionEvent = async (req, res) => {
    try{
        const discussionEvent = await discussionEventModel.readDiscussionEvent(pool, req.val);
        if(discussionEvent) {
            res.json(discussionEvent);
        } else {
            res.sendStatus(404);
        }
    }catch(err){
        return res.sendStatus(500);
    }
};

export const addDiscussionEvent = async (req, res) => {
    try{
        const id = await discussionEventModel.createDiscussionEvent(pool, req.val);
        res.status(201).json({id});
    }catch(err){
        return res.sendStatus(500);
    }
};

export const deleteDiscussionEvent = async (req, res) => {
    try{
        await discussionEventModel.deleteDiscussionEvent(pool, req.val);
        res.sendStatus(200);
    }catch(err){
        res.sendStatus(500);
    }
};

export const updateDiscussionEvent = async (req, res) => {
    try{
        await discussionEventModel.updateDiscussionEvent(pool, req.val);
        res.sendStatus(204);
    }catch(err){
        return res.sendStatus(500);
    }
};


export const getMessagesInDiscussion = async (req, res) => {
    try{
        const params = {
            discussion_event_id: req.params.id,
            offset: req.params.offset,
        }
        const messages = await discussionEventModel.readMessagesInDiscussion(pool, params);
        if(messages) {
            res.json(messages);
        } else {
            res.sendStatus(404);
        }
    }catch(err){
        res.sendStatus(500);
    }
};
export const getAllDiscussionPaging = async (req, res) => {
    try{
        const page = req.val.page;
        const perPage = req.val.perPage;
        const response = await discussionEventModel.readAllDiscussion(pool, {perPage,page})
        res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const countNbRows = async (req, res) => {
    try{
        const response = await discussionEventModel.getNbRows((pool))
        res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const countRows = async (req, res) => {
    try{
        const response = await discussionEventModel.getNbRows(pool);
        return res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const deleteDiscussionEvents = async (req,res) => {
    try{
        for (const id of req.val.ids) {
            await discussionEventModel.deleteDiscussionEvent(pool,{id});
        }
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
}