import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";

export const readLocation = async (SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        'SELECT * FROM location WHERE id = $1', [id]
    );
    return rows[0];
};

export const createLocation = async (SQLClient, {label,postal_code}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO location (label,postal_code) VALUES ($1,$2) RETURNING id', [label,postal_code]
    );
    return rows[0]?.id;
};

export const deleteLocation = async (SQLClient, {id}) => {
    await SQLClient.query('UPDATE event SET location_id = NULL WHERE location_id = $1',[id])

    return await SQLClient.query(
        'DELETE FROM location WHERE id = $1', [id]
    );
};


export const deleteManyLocations = async (SQLClient, {ids}) => {
    try {
        await SQLClient.query('BEGIN');
        for (const id of ids) {
            await deleteLocation(SQLClient, { id });
        }
        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const updateLocation = async (SQLClient, {id,label,postal_code}) =>{
    let query = 'UPDATE location SET ';
    const querySet = [];
    const queryValues = [];
    if(label){
        queryValues.push(label);
        querySet.push(`label = $${queryValues.length}`);
    }
    if(postal_code){
        queryValues.push(postal_code);
        querySet.push(`postal_code = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query,queryValues);
    } else {
        throw new Error('No field given');
    }
};

export const readAllLocations = async (SQLClient) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM location ORDER BY id'
    );
    return rows;
};

export const readNbLocations = async (SQLClient, {page,perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT * FROM location ORDER BY id LIMIT $1 OFFSET $2", [perPage, offset]
    );
    return rows;
};

export const readTotalRowLocations = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM location"
    );
    return rows[0]?.count_rows;
};