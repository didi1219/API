import {pool} from '../database/database.js';
import * as linkUserEventModel from '../model/linkUserEvent.js';
import {readAllLinkUserEvent} from "../model/linkUserEvent.js";
import * as userModel from "../model/user.js";

export const getLinkUserEvent = async (req, res) => {
    try {
        const linkUserEvent = await linkUserEventModel.readLinkUserEvent(pool, req.val);
        if (linkUserEvent) {
            res.json(linkUserEvent);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

export const addLinkUserEvent = async (req, res) => {
    try {
        await linkUserEventModel.createLinkUserEvent(pool, req.val);
        res.sendStatus(201);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteLinkUserEvent = async (req, res) => {
    try {
        await linkUserEventModel.deleteLinkUserEvent(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateLinkUserEvent = async (req, res) => {
    try {
        await linkUserEventModel.updateLinkUserEvent(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};
export const getAllLinkUserEvent = async (req, res) => {
    try{
        const response = await linkUserEventModel.readAllLinkUserEvent(pool, req.val);
        res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const countRows = async (req, res) => {
    try{
        const response = await linkUserEventModel.nbRows(pool);
        return res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const deleteLinkUserEvents = async (req,res) => {
    try{
        await linkUserEventModel.deleteManyLinkUserEvents(pool, ids);
        res.sendStatus(200);
    }catch(error){
        res.sendStatus(500);
    }
}

export const addInvitations = async (req,res) => {
    try {
        await linkUserEventModel.createInvitations(pool,req.val);
        res.sendStatus(201);
    } catch (error){
        res.sendStatus(500);
    }
}

export const getInvitationNotAcceptedByCurrentId = async (req, res) =>{
    try{
        req.val={};
        req.val.user_id = req.session.id;
        const response = await linkUserEventModel.readInvitationNotAcceptedByCurrentId(pool,req.val);
        if(!response){
            res.sendStatus(404);
        }else{
            res.status(200).send(response);
        }
    }catch(error){
        res.sendStatus(500);
    }
}

export const acceptInvitation = async (req, res) => {
    try{
        req.val.user_id = req.session.id;
        console.log(req.val.user_id);
        await linkUserEventModel.updateLinkUserEvent(pool,{user_id:req.val.user_id, event_id:req.val.event_id, isWaiting : false, isAccepted : true});
        res.sendStatus(204);
    }catch(error){

        res.sendStatus(500);
    }
}

export const declineInvitation = async (req, res) => {
    try{
        req.val.user_id = req.session.id;
        await linkUserEventModel.updateLinkUserEvent(pool,{user_id:req.val.user_id, event_id:req.val.event_id, isWaiting : false, isAccepted : false});
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500)
    }
}

export const isFavorite = async (req,res) => {
    try{
        req.val.user_id = req.session.id;
        await linkUserEventModel.isFavoritePatch(pool,req.val);
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
}