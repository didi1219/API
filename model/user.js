import { hash } from '../util/index.js';
import {calculOffset, verifyValueOfPerPage} from '../util/paging.js';

export const userExists = async (SQLClient, {email}) => {
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) as rows_count FROM users WHERE email = $1', [email]
    );
    return rows[0].rows_count > 0;
};

export const checkPseudoExist = async(SQLClient,{user_name})=>{
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) as rows_count FROM users WHERE user_name = $1', [user_name]
    )
    return rows[0].rows_count > 0;
};

export const readUserByEmail = async (SQLClient, {email}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM users WHERE email = $1', [email]
    );
    return rows[0];
};

export const getUserByID = async (SQLClient, id) => {
    const {rows} = await SQLClient.query(
        'SELECT id,email,last_name,first_name,user_name,bio, picture_path FROM users WHERE id = $1', [id]
    );
    return rows[0];
};

export const readAdmin = async (SQLClient, {email}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM users WHERE isAdmin = true AND email = $1', [email]
    );
    return rows[0];
};

export const readUser = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM users WHERE id = $1', [id]
    );
    return rows[0];
};

export const createUser = async (SQLClient, {email, password, last_name, first_name, user_name, bio,picture_path}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO users (email, password, last_name, first_name, user_name, bio,picture_path,isAdmin) VALUES ($1, $2, $3, $4, $5, $6,$7,$8) RETURNING id',
        [
            email,
            await hash(password),
            last_name,
            first_name,
            user_name,
            bio,
            picture_path,
            false
        ]);
    return rows[0]?.id;
};

export const deleteUser = async (SQLClient, {id}) => {
    try {
        await SQLClient.query('BEGIN');

        await SQLClient.query('DELETE FROM message where user_id = $1', [id]);
        await SQLClient.query('UPDATE event SET user_id = NULL where user_id = $1', [id]);
        await SQLClient.query('UPDATE linkUserEvent SET user_id = NULL where user_id = $1', [id]);
        await SQLClient.query('DELETE FROM users WHERE id = $1', [id]);

        return await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const deleteUsersByIds = async (SQLClient, {ids}) => {
    try {
        await SQLClient.query('BEGIN');

        for (const id of ids) {
            await deleteUser(SQLClient, { id });
        }

        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const deleteManyUsers = async (SQLClient, {ids}) => {
    try {
        await SQLClient.query('BEGIN');
        for (const id of ids) {
            await deleteUser(SQLClient, { id });
        }
        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const updateUser = async(SQLClient, {id, email, password, last_name, first_name, user_name, bio,picture_path}) => {
    let query = 'UPDATE users SET ';
    const querySet = [];
    const queryValues = [];

    if(email){
        queryValues.push(email);
        querySet.push(`email = $${queryValues.length}`);
    }

    if(password){
        queryValues.push(await hash(password));
        querySet.push(`password = $${queryValues.length}`);
    }
    if(last_name){
        queryValues.push(last_name);
        querySet.push(`last_name = $${queryValues.length}`);
    }
    if(first_name){
        queryValues.push(first_name);
        querySet.push(`first_name = $${queryValues.length}`);
    }
    if(user_name){
        queryValues.push(user_name);
        querySet.push(`user_name = $${queryValues.length}`);
    }
    if(typeof bio !== 'undefined'){
        queryValues.push(bio || "");
        querySet.push(`bio = $${queryValues.length}`);
    }
    if(picture_path){
        queryValues.push(picture_path);
        querySet.push(`picture_path = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};

export const readAllUsers = async (SQLClient) => {
    const {rows} = await SQLClient.query(
        'SELECT id,first_name, last_name, user_name FROM users ORDER BY id'
    );
    return rows;
};


export const readNbUsers = async (SQLClient,{page,perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        'SELECT id , email, last_name, first_name, user_name, bio,picture_path FROM users ORDER BY id LIMIT $1 OFFSET $2',[perPage, offset]
    );
    return rows;
};

export const readTotalRowUsers = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) as count_rows FROM users'
    );
    return rows[0]?.count_rows;
}
export const checkIfEmailExists = async (SQLClient, {emails}) => {
    const emailDoesntExist = [];
    const idEmailExist = [];

    for (const email of emails) {
        try{
            const rows = await readUserByEmail(SQLClient, {email});
            idEmailExist.push(rows.id);
        }catch(error){
            emailDoesntExist.push(email);
        }
    }
    return {idEmailExist, emailDoesntExist};
};