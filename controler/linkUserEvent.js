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