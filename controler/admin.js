import { pool } from "../database/database.js";
import { updateUser as updateU} from "../model/user.js";
import { deleteUser as deleteU} from "../model/user.js";
import { readUser as readU } from "../model/user.js";
import {readPerson} from "../model/person.js";
import {sign} from "../util/jwt.js";
import * as userModel from "../model/user.js";
import {logger} from '../middleware/logger.js';

export const getUser = async (req, res) => {
    try {
        logger.info(`Fetching location with ID: ${req.val.id}`);
        const user = await readU(pool, req.val);
        if (user) {
            logger.info(`Successfully retrieved user: ${JSON.stringify(user)}`);
            res.json(user);
        } else {
            logger.warn(`User with ID ${req.val.id} not found`);
            res.sendStatus(404);
        }
        res.sendStatus(204);
    } catch (error){
        logger.error(`Error fetching user with ID ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.status(500);
    }
};

export const updateUser = async (req,res) => {
    try {
        logger.info(`Trying to update User ID: ${req.val.id}` )
        let existEmail = false;
        let existUserName = false;
        if(req.val.email){
            logger.info(`Checking if email exist`)
            existEmail = await userModel.userExists(pool,req.val);
        }
        if(req.val.user_name){
            logger.info(`Checking if pseudo exist`)
            existUserName = await userModel.checkPseudoExist(pool,req.val);
        }
        if(!existEmail && !existUserName){
            logger.info(`Successfully update of user with ID: ${req.val.id}`)
            await userModel.updateUser(pool,req.val);
            res.sendStatus(204);
        } else if(existEmail && existUserName){
            logger.warn(`Pseudo & Email already used => email: ${req.val.email} pseudo: ${req.val.user_name} `)
            res.status(409).send('Email & Pseudo already used');
        }else if(existUserName){
            logger.warn(`Pseudo already used => peudo: ${req.val.user_name}`)
            res.status(409).send('Pseudo already used');
        }else{
            logger.warn(`Email already exist => ${req.val.email}`)
            res.status(409).send('Email already used');
        }
    } catch (err) {
        logger.error(`Internal Server Error: trying to update user with ID: ${req.val.id} error : ${JSON.stringify(err.message, null, 2)}`)
        res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        logger.info(`Deleting Location with ID: ${req.val.id}`);
        await deleteU(pool,req.val);
        logger.info(`Successfully deleted location`);
        res.sendStatus(204);
    } catch(error){
        logger.error(`Error deleting User with ID ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const login = async (req, res) => {
    logger.info(`Trying to login with email and password`);
    try {
        logger.info(`Trying to find user with email and password`);
        const rep = await readPerson(pool, req.val);
        logger.info(`Status recovering`);
        if(rep.id) {
            if(rep.status === 'admin') {
                logger.info(`User is admin`);
                const jwt = sign(rep, {
                    expiresIn: '8h'
                });
                logger.info(`Successfully created JWT`);
                res.status(201).send(jwt);
            } else {
                logger.warn(`Not authorized`);
                res.sendStatus(403);
            }
        } else {
            logger.warn(`user not found`);
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error to login with email and password: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getAllUsersTitle = async(req, res) => {
    try {
        logger.info(`Fetching list of users`);
        const users = await userModel.readAllUsers(pool);
        if(users){
            logger.info(`Successfully retrieved users: ${JSON.stringify(users)}`);
            res.json(users);
        } else {
            logger.warn(`Users not found`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching users: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};


export const getNbUsers = async (req,res) => {
    try {
        logger.info(`Fetching users with paging=> page:${req.val.page} perPage:${req.val.perPage}`);
        const response = await userModel.readNbUsers(pool, req.val);
        if(response) {
            logger.info(`Successfully retrieved users: ${JSON.stringify(response)}`);
            res.json(response);
        } else {
            logger.warn(`Users not found`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching users: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    try {
        logger.info(`Counting number of row`);
        const response = await userModel.readTotalRowUsers(pool);
        logger.info(`Successfully count`);
        res.json(response);
    } catch(error) {
        logger.error(`Error counting rows: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteUsers = async (req,res) => {
    try{
        logger.info(`Deleting Location with list of IDs: ${req.val.ids}`);
        await userModel.deleteUsersByIds(pool, req.val);
        logger.info(`Successfully deleted Users`);
        res.sendStatus(204);
    } catch(error) {
        logger.error(`Error deleting Users with ID ${req.val.id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};