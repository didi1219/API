import * as discussionEventModel from '../model/discussionEvent.js';
import {pool} from "../database/database.js";

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

export const listDiscussionEvents = async (req, res) => {
    try{
        const discussionEvents = await discussionEventModel.readDiscussionEvents(pool, req.val);
        res.json(discussionEvents);
    }catch(err){
        res.sendStatus(500);
    }
};

export const getMessagesInDiscussion = async (req, res) => {
    try{
        const messages = await discussionEventModel.readMessagesInDiscussion(pool, req.val);
        if(messages) {
            res.json(messages);
        } else {
            res.sendStatus(404);
        }
    }catch(err){
        res.sendStatus(500);
    }
};

export const getNewerMessagesInDiscussion = async (req, res) => {
    try{
        const messages = await discussionEventModel.readNewerMessagesInDiscussion(pool, req.val);
        if(messages) {
            res.json(messages);
        } else {
            res.sendStatus(404);
        }
    }catch(err){
        res.sendStatus(500);
    }
};

export const getOlderMessagesInDiscussion = async (req, res) => {
    try{
        const messages = await discussionEventModel.readOlderMessagesInDiscussion(pool, req.val);
        if(messages) {
            res.json(messages);
        } else {
            res.sendStatus(404);
        }
    }catch(err){
        res.sendStatus(500);
    }
};