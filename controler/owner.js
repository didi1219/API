import {pool} from '../database/database.js';
import * as ownerModel from '../model/owner.js'

export const getOwner = async (req, res) => {
    try {
        const owner = await ownerModel.readOwner(pool, req.params);
        if (owner) {
            res.json(owner);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

export const addOwner = async (req, res) => {
    try {
        const id = await ownerModel.createOwner(pool, req.body);
        res.status(201).json({id});
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateOwner = async (req, res) => {
    try {
        await ownerModel.updateOwner(pool, req.body);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteOwner = async (req, res) => {
    try {
        await ownerModel.deleteOwner(pool, req.params);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};