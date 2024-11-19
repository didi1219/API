import {pool} from '../database/database.js';
import * as userModel from '../model/user.js'

export const getUser = async (req, res) => {
    try {
        const user = await userModel.readUser(pool, req.params);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

export const addUser = async (req, res) => {
    try {
        const id = await userModel.createUser(pool, req.body);
        res.status(201).json({id});
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool, req.body);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(pool, req.params);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};