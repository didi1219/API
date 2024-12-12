import { pool } from "../database/database.js";
import { updateUser as updateU} from "../model/user.js";
import { deleteUser as deleteU} from "../model/user.js";
import { readUser as readU } from "../model/user.js";
import {readPerson} from "../model/person.js";
import {sign} from "../util/jwt.js";

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
        await updateU(pool,req.val.id,req.val);
        res.sendStatus(204);
    } catch (error){
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
        console.error(err);
        res.sendStatus(500);
    }
}