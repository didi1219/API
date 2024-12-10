import { hash } from '../util/index.js';

export const userExists = async (SQLClient, {email}) => {
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) FROM users WHERE email = $1', [email]
    );
    return rows.count > 0;
};

export const readUserByEmail = async (SQLClient, {email}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM users WHERE email = $1', [email]
    );
    return rows[0];
};

export const getUserByID = async (SQLClient, id) => {
    const {rows} = await SQLClient.query(
        'SELECT id,email,last_name,first_name,user_name,bio FROM users WHERE id = $1', [id]
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

export const createUser = async (SQLClient, {email, password, last_name, first_name, user_name, bio}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO users (email, password, last_name, first_name, user_name, bio,isAdmin) VALUES ($1, $2, $3, $4, $5, $6,$7) RETURNING id',
        [
            email,
            await hash(password),
            last_name,
            first_name,
            user_name,
            bio,
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
    } catch (error){
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const updateUser = async(SQLClient,id, {email, password, last_name, first_name, user_name, bio}) => {
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
    if(bio){
        queryValues.push(bio);
        querySet.push(`bio = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};

