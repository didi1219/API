import * as discussionEventModel from '../model/discussionEvent.js';
import {pool} from "../database/database.js";

export const getDiscussionEvent = async (req, res) => {
    try {
        const discussionEvent = await discussionEventModel.readDiscussionEvent(pool, req.val);
        if(discussionEvent) {
            res.json(discussionEvent);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        return res.sendStatus(500);
    }
};

export const addDiscussionEvent = async (req, res) => {
    try {
        const id = await discussionEventModel.createDiscussionEvent(pool, req.val);
        res.status(201).json({id});
    } catch(err) {
        return res.sendStatus(500);
    }
};

export const deleteDiscussionEvent = async (req, res) => {
    try {
        await discussionEventModel.deleteDiscussionEvent(pool, req.val);
        res.sendStatus(200);
    } catch(err) {
        res.sendStatus(500);
    }
};

export const updateDiscussionEvent = async (req, res) => {
    try {
        await discussionEventModel.updateDiscussionEvent(pool, req.val);
        res.sendStatus(204);
    } catch(err) {
        return res.sendStatus(500);
    }
};

export const getMessagesInDiscussion = async (req, res) => {
    try {
        const messages = await discussionEventModel.readMessagesInDiscussion(pool, req.val);
        if(messages) {
            res.json(messages);
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        res.sendStatus(500);
    }
};

export const getNewerMessagesInDiscussion = async (req, res) => {
    try {
        const messages = await discussionEventModel.readNewerMessagesInDiscussion(pool, req.val);
        if(messages) {
            res.json(messages);
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        res.sendStatus(500);
    }
};

export const getOlderMessagesInDiscussion = async (req, res) => {
    try {
        const messages = await discussionEventModel.readOlderMessagesInDiscussion(pool, req.val);
        if(messages) {
            res.json(messages);
        } else {
            res.sendStatus(404);
        }
    } catch(err) {
        res.sendStatus(500);
    }
};

export const getAllDiscussionTitle = async(req, res) => {
    try {
        const discussion = await discussionEventModel.readAllDiscussionTitle(pool);
        if(discussion){
            res.json(discussion);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getNbDiscussionsEvent = async (req, res) => {
    try {
        const page = req.val.page;
        const perPage = req.val.perPage;
        const response = await discussionEventModel.readNbDiscussionsEvent(pool, {perPage,page});
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const countNbRows = async (req, res) => {
    try {
        const response = await discussionEventModel.readTotalRowDiscussionsEvent((pool));
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const deleteDiscussionEvents = async (req,res) => {
    try{
        for (const id of req.val.ids) {
            await discussionEventModel.deleteDiscussionEvent(pool,{id});
        }
        res.sendStatus(204);
    } catch(error) {
        res.sendStatus(500);
    }
};