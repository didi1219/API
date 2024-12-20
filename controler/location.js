import {logger} from '../middleware/logger.js'
import {pool} from '../database/database.js';
import * as locationModel from '../model/location.js';

export const getLocation = async (req,res) =>{
    try {
        logger.info(`Fetching location with ID: ${req.val.id}`);
        const location = await locationModel.readLocation(pool,req.val);
        if(location){
            logger.info(`Successfully retrieved location: ${JSON.stringify(location)}`);
            res.json(location);
        } else {
            logger.warn(`Location with ID ${req.val.id} not found`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching location with ID ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const addLocation = async (req,res) => {
    try {
        logger.info(`Creating Location`);
        const id = await locationModel.createLocation(pool,req.val);
        logger.info(`Successfully created location with new ID ${id}`);
        res.status(201).json({id});
    } catch(error) {
        logger.error(`Error creating location`);
        res.sendStatus(500);
    }
};

export const deleteLocation = async (req,res) => {
    try{
        logger.info(`Deleting Location with ID: ${req.val.id}`);
        await locationModel.deleteLocation(pool,req.val);
        logger.info(`Successfully deleted location`);
        res.sendStatus(204)
    } catch (error) {
        logger.error(`Error deleting location with ID ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateLocation = async (req,res) => {
    try {
        logger.info(`Updating Location with ID: ${req.val.id}`);
        const response = await locationModel.updateLocation(pool,req.val);
        if(response.rowCount > 0){
            logger.info(`Successfully updated location`);
            res.sendStatus(204);
        }else{
            logger.warn(`Location with ID ${req.val.id} not found`);
            res.status(404).send("Id not found");
        }
    } catch(error) {
        logger.error(`Error updating location with ID ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getAllLocations = async(req, res) => {
    try {
        logger.info(`Fetching list of location`);
        const locations = await locationModel.readAllLocations(pool);
        if(locations){
            logger.info(`Successfully retrieved location: ${JSON.stringify(locations)}`);
            res.json(locations);
        } else {
            logger.warn(`Locations not found`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching locations: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbLocations = async(req, res) => {
    try {
        logger.info(`Fetching location with paging=> page:${req.val.page} perPage:${req.val.perPage}`);
        const response = await locationModel.readNbLocations(pool, req.val);
        logger.info(`Successfully retrieved location: ${JSON.stringify(response)}`);
        res.json(response);
    } catch(error) {
        logger.error(`Error fetching locations: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    try{
        logger.info(`Counting number of row`)
        const response = await locationModel.readTotalRowLocations(pool);
        logger.info(`Successfully count`)
        res.json(response);
    } catch(error) {
        logger.error(`Error counting rows: ${JSON.stringify(error.message, null, 2)}`)
        res.sendStatus(500);
    }
};

export const deleteLocations = async (req,res) => {
    try{
        logger.info(`Deleting Location with list of IDs: ${req.val.ids}`);
        await locationModel.deleteManyLocations(pool,req.val);
        logger.info(`Successfully deleted locations`);
        res.sendStatus(204);
    } catch(error) {
        logger.error(`Error deleting location with ID ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};