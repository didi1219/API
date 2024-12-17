import {pool} from '../database/database.js';
import * as linkUserEventModel from '../model/linkUserEvent.js';


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

export const getNbLinkUserEvents = async (req, res) => {
    try {
        const response = await linkUserEventModel.readNbLinkUserEvents(pool, req.val);
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    try{
        const response = await linkUserEventModel.readTotalRowLinkUserEvents(pool);
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const deleteLinkUserEvents = async (req,res) => {
    try{
        await linkUserEventModel.deleteManyLinkUserEvents(pool, req.val);
        res.sendStatus(200);
    } catch(error) {
        console.log(error)
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

export const getFavoriteEvent = async (req,res) => {
    try{
        req.val.user_id = req.session.id;
        const response = await linkUserEventModel.readFavoriteEvent(pool, req.val);
        if(response){
            res.status(200).json({response});
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
};

export const followAEvent = async (req, res) => {
    try {
        req.val.user_id = req.session.id;
        await linkUserEventModel.subscribeAEvent(pool,req.val);
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.sendStatus(500);
    }
};

export const getNbLinkUserEventByCurrentUser = async (req, res) =>{
    try{
        const user_id = req.session.id;
        const response = await linkUserEventModel.getNbLinkUserEventByUser(pool,{user_id});
        res.status(200).json({response});
    }catch(error){
        res.sendStatus(500);
    }
}