import {pool} from '../database/database.js';
import * as userModel from '../model/user.js';
import {sign} from '../util/jwt.js';
import {readPerson} from "../model/person.js";

export const getUser = async (req, res) => {
    try {
        const data = await userModel.readUser(pool, req.val);
        if (data) {
            const user = {
                id: data.id,
                user_name: data.user_name,
                bio: data.bio
            };
            res.json(user);
        } else {
            res.sendStatus(404);
        }
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
        req.val.id = req.session.id;
        await userModel.updateUser(pool,req.val);
        res.sendStatus(204);
    } catch (err) {
        console.log(error)
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
        const existEmail = await userModel.userExists(pool,req.val);
        const existUserName = await userModel.checkPseudoExist(pool,req.val);
        if(!existEmail && !existUserName){
            await userModel.createUser(pool,req.val);
            res.sendStatus(201);
        } else if(existEmail && existUserName){
            res.status(409).send('Email & Pseudo already used');
        }else if(existUserName){
            res.status(409).send('Pseudo already used');
        }else{
            res.status(409).send('Email already used');
        }
    } catch(e) {
        res.sendStatus(500);
    }
};

export const getUserInfo = async (req, res) => {
    try {
        const {id} = req.session;
        const info = await userModel.getUserByID(pool,id);
        if (info) {
            res.send(info);
        } else {
            res.sendStatus(404);
        }
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

export const deleteCurrentUser = async (req, res) => {
    try{
        const id = req.session.id;
        await userModel.deleteUser(pool, {id});
        res.sendStatus(204);
    }catch(error){
        res.sendStatus(500);
    }
}