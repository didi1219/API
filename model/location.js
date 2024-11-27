export const readLocation = async (SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        'SELECT * FROM location WHERE id = $1', [id]
    );
    return rows[0];
};

export const createLocation = async (SQLClient, {label,postalCode}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO location (label,postalCode) VALUES ($1,$2) RETURNING id', [label,postalCode]
    );
    return rows[0]?.id;
};

export const deleteLocation = async (SQLClient, {id}) => {
    await SQLClient.query('UPDATE event SET location_id = NULL WHERE location_id = $1',[id])

    return await SQLClient.query(
        'DELETE FROM location WHERE id = $1', [id]
    );
};

export const updateLocation = async (SQLClient, {id,label,postalCode}) =>{
    let query = 'UPDATE location SET ';
    const querySet = [];
    const queryValues = [];
    if(label){
        queryValues.push(label);
        querySet.push(`label = $${queryValues.length}`);
    }
    if(postalCode){
        queryValues.push(postalCode);
        querySet.push(`postalCode = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query,queryValues);
    } else {
        throw new Error('No field given');
    }
};