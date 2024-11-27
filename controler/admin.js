import { pool } from "../database/database.js";
import { updateUser as updateU} from "../model/user.js";
import { deleteUser as deleteU} from "../model/user.js";
import { readUser as readU } from "../model/user.js";

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

