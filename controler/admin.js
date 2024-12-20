import { pool } from "../database/database.js";
import { updateUser as updateU} from "../model/user.js";
import { deleteUser as deleteU} from "../model/user.js";
import { readUser as readU } from "../model/user.js";
import {readPerson} from "../model/person.js";
import {sign} from "../util/jwt.js";
import * as userModel from "../model/user.js";

export const getUser = async (req, res) => {
    try {
        const user = await readU(pool, req.val);
        if (user) {
            res.json(user);
        } else {
            res.sendStatus(404);
        }
        res.sendStatus(204);
    } catch (error){
        res.status(500);
    }
};

export const updateUser = async (req,res) => {
    try {
        let existEmail = false;
        let existUserName = false;

        if(req.val.email){
            existEmail = await userModel.userExists(pool,req.val);
        }
        if(req.val.user_name){
            existUserName = await userModel.checkPseudoExist(pool,req.val);
        }

        if(!existEmail && !existUserName){
            await userModel.updateUser(pool,req.val);
            res.sendStatus(204);
        } else if(existEmail && existUserName){
            res.status(409).send('Email & Pseudo already used');
        }else if(existUserName){
            res.status(409).send('Pseudo already used');
        }else{
            res.status(409).send('Email already used');
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await deleteU(pool,req.val);
        res.sendStatus(204);
    } catch(error){
        res.sendStatus(500);
    }
};

export const login = async (req, res) => {
    try {
        const rep = await readPerson(pool, req.val);
        if(rep.id) {
            if(rep.status === 'admin') {
                const jwt = sign(rep, {
                    expiresIn: '8h'
                });
                res.status(201).send(jwt);
            } else {
                res.sendStatus(403);
            }
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

export const getAllUsersTitle = async(req, res) => {
    try {
        const users = await userModel.readAllUsers(pool);
        if(users){
            res.json(users);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
};


export const getNbUsers = async (req,res) => {
    try {
        const response = await userModel.readNbUsers(pool, req.val);
        if(response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch {
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    try {
        const response = await userModel.readTotalRowUsers(pool);
        if(response) {
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch(error) {
        res.sendStatus(500);
    }
};

export const deleteUsers = async (req,res) => {
    try{
        for (const id of req.val.ids) {
            await userModel.deleteUser(pool,{id});
        }
        res.sendStatus(204);
    } catch(error) {
        res.sendStatus(500);
    }
};