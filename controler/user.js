import { pool } from '../database/database.js';
import * as userModel from '../model/user.js';
import { sign } from '../util/jwt.js';
import { readPerson } from "../model/person.js";
import {logger} from '../middleware/logger.js';

export const getUser = async (req, res) => {
    logger.info(`Entering getUser with params: ${JSON.stringify(req.val)}`);
    try {
        const data = await userModel.readUser(pool, req.val);
        if (data) {
            const user = {
                id: data.id,
                user_name: data.user_name,
                bio: data.bio
            };
            logger.info(`User found: ${JSON.stringify(user)}`);
            res.json(user);
        } else {
            logger.warn('User not found');
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching user: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateUser = async (req, res) => {
    logger.info(`Entering updateUser with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.id = req.session.id;
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
        logger.error(`Error updating user: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const login = async (req, res) => {
    logger.info(`Entering login with params: ${JSON.stringify(req.val.email)}`);
    try {
        const rep = await readPerson(pool, req.val);
        if (rep.id) {
            const jwt = sign(rep, { expiresIn: '8h' });
            logger.info(`User logged in, JWT generated`);
            res.status(201).send(jwt);
        } else {
            logger.warn('User not found');
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error during login:${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const registration = async (req, res) => {
    logger.info(`Entering registration with params: ${JSON.stringify(req.val)}`);
    try {
        const existEmail = await userModel.userExists(pool, req.val);
        const existUserName = await userModel.checkPseudoExist(pool, req.val);
        if (!existEmail && !existUserName) {
            await userModel.createUser(pool, req.val);
            logger.info(`User registered successfully`);
            res.sendStatus(201);
        } else if (existEmail && existUserName) {
            logger.warn('Email & Pseudo already used');
            res.status(409).send('Email & Pseudo already used');
        } else if (existUserName) {
            logger.warn('Pseudo already used');
            res.status(409).send('Pseudo already used');
        } else {
            logger.warn('Email already used');
            res.status(409).send('Email already used');
        }
    } catch (e) {
        logger.error(`Error during registration: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getUserInfo = async (req, res) => {
    logger.info(`Entering getUserInfo with user id: ${req.session.id}`);
    try {
        const { id } = req.session;
        const info = await userModel.getUserByID(pool, id);
        if (info) {
            logger.info(`User info found: ${JSON.stringify(info)}`);
            res.send(info);
        } else {
            logger.warn('User info not found');
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching user info: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getAllUsers = async (req, res) => {
    logger.info(`Entering getAllUsers`);
    try {
        const response = await userModel.readAllUsers(pool, req.val);
        logger.info(`All users fetched: ${JSON.stringify(response)}`);
        res.json(response);
    } catch (err) {
        logger.error(`Error fetching all users: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    logger.info(`Entering countRows`);
    try {
        const response = await userModel.nbRows(pool);
        logger.info(`Number of rows: ${JSON.stringify(response)}`);
        return res.json(response);
    } catch (error) {
        logger.error(`Error counting rows: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteUsers = async (req, res) => {
    logger.info(`Entering deleteUsers with params: ${JSON.stringify(req.val)}`);
    try {
        await userModel.deleteManyUsers(pool, req.val);
        logger.info(`Multiple users deleted successfully`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting multiple users: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const checkEmailExist = async (req, res) => {
    logger.info(`Entering checkEmailExist with params: ${JSON.stringify(req.val)}`);
    try {
        const { idEmailExist, emailDoesntExist } = await userModel.checkIfEmailExists(pool, req.val);
        logger.info(`Email check result: idEmailExist = ${idEmailExist}, emailDoesntExist = ${emailDoesntExist}`);
        res.json({ idEmailExist, emailDoesntExist });
    } catch (error) {
        logger.error(`Error checking email existence: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteCurrentUser = async (req, res) => {
    logger.info(`Entering deleteCurrentUser with user id: ${req.session.id}`);
    try {
        const id = req.session.id;
        await userModel.deleteUser(pool, { id });
        logger.info(`Current user deleted successfully`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error deleting current user: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};