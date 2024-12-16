import {pool} from '../database/database.js';
import * as locationModel from '../model/location.js';
import {readAllLocations} from "../model/location.js";

export const getLocation = async (req,res) =>{
    try {
        const location = await locationModel.readLocation(pool,req.val);
        if(location){
            res.json(location);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const addLocation = async (req,res) => {
    try {
        const id = await locationModel.createLocation(pool,req.val);
        res.status(201).json({id});
    } catch(error) {
        res.sendStatus(500);
    }
};

export const deleteLocation = async (req,res) => {
    try{
        await locationModel.deleteLocation(pool,req.val);
        res.sendStatus(204)
    } catch (error) {
        res.sendStatus(500);
    }
};

export const updateLocation = async (req,res) => {
    try {
        await locationModel.updateLocation(pool,req.val);
        res.sendStatus(204);
    } catch(error) {
        res.sendStatus(500);
    }
};

export const getAllLocations = async(req, res) => {
    try {
        const locations = await locationModel.readAllLocations(pool);
        if(locations){
            res.json(locations);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};

export const getNbLocations = async(req, res) => {
    try {
        const response = await locationModel.readNbLocations(pool, req.val);
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
        const response = await locationModel.readTotalRowLocations(pool);
        if (response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const deleteLocations = async (req,res) => {
    try{
        for (const id of req.val.ids) {
            await locationModel.deleteLocation(pool,{id});
        }
        res.sendStatus(204);
    } catch(error) {
        res.sendStatus(500);
    }
};