import * as discussionEventModel from '../model/discussionEvent.js'
import {pool} from "../database/database.js"
export const getMessages = async (req, res) => {
    try{
        const params = {
            discussion_event_id: req.params.id,
            offset: req.params.offset,
        }
        const messages = await discussionEventModel.readMessages(pool, params);
        res.status(200).send(messages);
    }catch(err){
        res.sendStatus(500);
    }
}
export const getDiscussionEvent = async (req, res) => {
    try{
        const discussionEvent = await discussionEventModel.readDiscussionEvent(pool, req.params);
        if(discussionEvent) {
            return res.status(200).send(discussionEvent);
        }
        return res.sendStatus(404);
    }catch(err){
        return res.sendStatus(500);
    }
}
export const deleteDiscussionEvent = async (req, res) => {
    try{
        await discussionEventModel.deleteDiscussionEvent(pool, req.params);
        return res.sendStatus(200);
    }catch(err){
        return res.sendStatus(500);
    }
}
export const createDiscussionEvent = async (req, res) => {
    try{
        const id = await discussionEventModel.createDiscussionEvent(pool, req.body);
        if(id){
            return res.status(200).send(id)
        }
        return res.sendStatus(404);
    }catch(err){
        return res.sendStatus(500);
    }
}
export const updateDiscussionEvent = async (req, res) => {
    try{
        const response = await discussionEventModel.updateDiscussionEvent(pool, req.body);
        if (response){
            return res.sendStatus(200)
        }
        return res.sendStatus(404);
    }catch(err){
        return res.sendStatus(500);
    }
}