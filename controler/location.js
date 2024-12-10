import {pool} from '../database/database.js';
import * as locationModel from '../model/location.js';
import * as userModel from "../model/user.js";

export const getLocation = async (req,res) =>{
    try {
        const location = await locationModel.readLocation(pool,req.val);
        if(location){
            res.json(location);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
};

export const addLocation = async (req,res) => {
    try {
        const id = await locationModel.createLocation(pool,req.val);
        res.status(201).json({id});
    }catch(error){
        res.sendStatus(500);
    }
};

export const deleteLocation = async (req,res) => {
    try{
        await locationModel.deleteLocation(pool,req.val);
        res.sendStatus(204)
    }catch (error){
        res.sendStatus(500);
    }
};

export const updateLocation = async (req,res) => {
    try {
        await locationModel.updateLocation(pool,req.val);
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
};
export const getAllLocations = async(req, res) => {
    try{
        const response = await locationModel.readAllLocations(pool, req.val);
        res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const countRows = async (req, res) => {
    try{
        const response = await locationModel.nbRows(pool);
        return res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}