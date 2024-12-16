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
    } catch(error){
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

export const getNbRowsBySearch = async (req,res) => {
    try{
        const nbRows = await searchModel.readNbRowEventGeneric(pool, req.val);
        if(nbRows){
            res.json({nbRows});
        }else{
            res.sendStatus(404);
        }
    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }
}

export const getEventCategories = async (req,res) => {
    try {
        const events = await searchModel.readEventByCategories(pool,req.val);
        res.json({events});
    }catch (error){
        console.log(error)
        res.sendStatus(500);
    }
};

export const getEventByLoc = async (req,res) => {
    try {
        const result = await searchModel.readEventByLocalities(pool, req.val);
        res.json({result})
    } catch(error){
        console.log(error)
        res.sendStatus(500);
    }
};

export const getAllEv = async(req,res) => {
    try {
        const response = await searchModel.readAllEvents(pool,req.val);
        if(response) {
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch (error){
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