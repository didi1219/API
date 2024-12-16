import * as searchModel from "../model/search.js";
import {pool} from "../database/database.js";


export const searchEventByName = async (req,res) => {
    try {
        const response = await searchModel.readEventByName(pool, req.val);
        if(response) {
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const searchEvent = async (req, res) =>{
    try {
        const response = await searchModel.readEventGeneric(pool,req.val);
        if(response) {
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch(error){
        res.sendStatus(500);
    }
};

export const getPublicEvents = async (req,res) => {
    try {
        const response = await searchModel.readPublicEvents(pool,req.val);
        if(response) {
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getTotalRowEventGenericSearched = async (req, res) => {
    try {
        const response = await searchModel.readTotalRowEventGenericSearched(pool, req.val);
        if(response){
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getEventCategories = async (req,res) => {
    try {
        const response = await searchModel.readEventByCategories(pool,req.val);
        if(response) {
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getEventByLoc = async (req,res) => {
    try {
        const response = await searchModel.readEventByLocalities(pool, req.val);
        if(response) {
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch(error){
        res.sendStatus(500);
    }
};

export const setFavoriteEvent = async (req,res)=>{
    try{
        await searchModel.setFavorite(pool,req.params);
        res.sendStatus(204);
    } catch(error){
        res.sendStatus(500);
    }
};

export const getAllEventOfOwner = async (req,res) => {
    try{
        const response = await searchModel.readEventByOwner(pool, req.val);
        if(response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error){
        res.sendStatus(500);
    }
};

export const getNbEventByOwner = async(req,res) => {
    try{
        const nbRows = await searchModel.readNbEventOwner(pool, req.val);
        if(nbRows) {
            res.json({nbRows});
        } else {
            res.sendStatus(404);
        }
    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }
};

export const getNbEventByUser = async (req, res)=>{
    try{
        const nbRows = await searchModel.readNbEventUser(pool,req.val);
        if(nbRows) {
            res.json({nbRows});
        } else {
            res.sendStatus(404);
        }
    } catch(error){
        res.sendStatus(500);
    }
};

export const getNbRowsSearchByCategories = async (req, res) => {
    try{
        const nbRows = await searchModel.readNbRowsSearchByCategories(pool, req.val);
        if(nbRows){
            res.json({nbRows});
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
}

export const getNbRowsSearchByLocalities = async (req, res) => {
    try{
        const nbRows = await searchModel.readNbRowsSearchByLocalities(pool, req.val);
        if(nbRows){
            res.json({nbRows});
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
}

export const getEventSearchFollowByCurrentUser = async (req,res) =>{
    try{
        req.val.user_id = req.session.id;
        const response = await searchModel.readEventGenericByUser(pool, req.val);
        if(response){
            res.status(200).json({response});
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
}

export const getEventSeachByOwner = async (req,res) => {
    try{
        req.val.user_id = req.session.id;
        const response = await searchModel.readEventGenericByUser(pool, req.val);
        if(response){
            res.status(200).json({response});
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
}

export const countRowsEventGenericByOwner = async (req,res) =>{
    try{
        req.val.user_id = req.session.id;
        const nbRows = await searchModel.nbRowsEventGenericByOwner(pool, req.val)
        res.status(200).send({nbRows});
    }catch(error){
        res.sendStatus(500);
    }
}

export const countRowsEventGenericByFollow = async (req, res) =>{
    try{
        req.val.user_id = req.session.id;
        const nbRows = await searchModel.nbRowsEventGenericByFollow(pool, req.val)
        res.status(200).send({nbRows});
    }catch(error){
        res.sendStatus(500);
    }
}