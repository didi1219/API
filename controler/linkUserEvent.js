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
        console.log(err)
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
    try {
        for (const ids of req.val.ids) {
            await linkUserEventModel.deleteLinkUserEvent(pool, ids);
        }
        res.sendStatus(200);
    } catch(error) {
        res.sendStatus(500);
    }
};