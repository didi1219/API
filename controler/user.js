import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {sign} from '../util/jwt.js';
import {readPerson} from "../model/person.js";

export const getUser = async (req, res) => {
    try {
        const user = await userModel.readUser(pool, req.val);
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
        const id = await userModel.createUser(pool, req.val);
        res.status(201).json({id});
    } catch (err) {
        res.sendStatus(500);
    }
};

export const deleteUser = async (req, res) => {
    try {
        await userModel.deleteUser(pool, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const updateUser = async (req, res) => {
    try {
        await userModel.updateUser(pool,req.session.id, req.val);
        res.sendStatus(204);
    } catch (err) {
        res.sendStatus(500);
    }
};

export const login = async (req, res) => {
    try {
        const rep = await readPerson(pool, req.val);
        if(rep.id) {
            const jwt = sign(rep,{
                expiresIn: '8h'
            });
            res.status(201).send(jwt);
        } else {
            res.sendStatus(404);
        }
    } catch (err) {
        res.sendStatus(500);
    }
};

export const registration = async (req, res) => {
    try {
        const exist = await userModel.userExists(pool,req.val.email);
        if(exist){
            res.status(409).send('Email already used');
        } else {
            await userModel.createUser(pool,req.val);
            res.sendStatus(201);
        }
    } catch(e) {
        res.sendStatus(500);
    }
};

export const getUserInfo = async (req, res) => {
    const {id}= req.session;
    try {
        const info = await userModel.getUserByID(pool,id);
        res.send(info);
    } catch (e){
        res.sendStatus(500);
    }
};

export const getAllUsers = async (req,res) => {
    try{
        const response = await userModel.readAllUser(pool, req.val);
        res.json(response);
    }catch{
        res.sendStatus(500);
    }
}
export const countRows = async (req, res) => {
    try{
        const response = await userModel.nbRows(pool);
        return res.json(response);
    }catch(error){
        res.sendStatus(500);
    }
}
export const deleteUsers = async (req,res) => {
    try{
        await userModel.deleteManyUsers(pool,req.val);
        res.sendStatus(204);
    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }
}
export const checkEmailExist = async (req,res) => {
    try{
        const {idEmailExist, emailDoesntExist} = await userModel.checkIfEmailExists(pool,req.body);
        res.json({idEmailExist, emailDoesntExist});
    }catch(error){
        res.sendStatus(500);
    }
}