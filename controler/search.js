import * as searchModel from "../model/search.js";
import {pool} from "../database/database.js";


export const searchEventByName = async (req,res) => {
    try {
        const response = await searchModel.readEventByName(pool,req.params);
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
        const response = await searchModel.readEventGeneric(pool,req.params);
        if(response) {
            res.json({response});
        } else {
            res.sendStatus(404);
        }
    } catch(error){
        res.sendStatus(500);
    }
};

export const getEventCategories = async (req,res) => {
    try {
        const {categories} = req.query;
        if(!categories){
            res.status(404).send('Pas de parametres');
        }
        const categoriesIds = categories.split(',').map(id => parseInt(id.trim()));
        const result = await searchModel.readEventByCategories(pool,categoriesIds);
        res.json({result});
    }catch (error){
        res.sendStatus(500);
    }
};

export const getEventByLoc = async (req,res) => {
    try {
        const {localities} = req.query;
        if(!localities){
            res.status(404).send('Pas de parametres');
        }else{
            const localitiesIds = localities.split(',').map(id => parseInt(id.trim()));
            const result = await searchModel.readEventByLocalities(pool, localitiesIds);
            res.json({result})
        }
    } catch(error){
        res.sendStatus(500);
    }
};

export const getAllEv = async(req,res) => {
    try {
        const response = await searchModel.readAllEvents(pool,req.params);
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
        const response = await searchModel.readEventByOwner(pool, req.params);
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
        const response = await searchModel.readNbEventOwner(pool,req.params);
        if(response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    }catch(error){
        res.sendStatus(500);
    }
};

export const getNbEventByUser = async (req, res)=>{
    try{
        const response = await searchModel.readNbEventUser(pool,req.params);
        if(response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error){
        res.sendStatus(500);
    }
};