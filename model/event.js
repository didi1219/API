export const createEvent = async (SQLClient, {title,description,event_date,street_number,user_id,location_id,category_id}) => {
    try {
        await SQLClient.query('BEGIN');
        const {rows} = await SQLClient.query(
            'INSERT INTO event (title,description,event_date,street_number,user_id,location_id,category_id) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id',
            [
                title,
                description,
                event_date,
                street_number,
                user_id,
                location_id,
                category_id
            ]
        );
        const eventId = rows[0]?.id;

        await SQLClient.query(
            'INSERT INTO discussionEvent (title, event_id) VALUES ($1,$2)',
            ["Général",eventId]
        );
        await SQLClient.query('COMMIT');

        return eventId;
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const readEvent = async (SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        'SELECT * FROM event WHERE id = $1',[id]
    );
    return rows[0];
}

export const deleteEvent = async (SQLClient, {id}) => {
    return await SQLClient.query('DELETE FROM event WHERE id = $1', [id]);
}

export const updateEvent = async (SQLClient, {id,title,description,event_date,street_number,user_id,location_id,category_id}) => {
    let query = 'UPDATE event SET ';
    const querySet = [];
    const queryValues = [];
    if (title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }
    if (description){
        queryValues.push(description);
        querySet.push(`description = $${queryValues.length}`);
    }
    if (event_date){
        queryValues.push(event_date);
        querySet.push(`event_date = $${queryValues.length}`);
    }
    if(street_number){
        queryValues.push(street_number);
        querySet.push(`street_number = $${queryValues.length}`);
    }
    if(user_id){
        queryValues.push(user_id);
        querySet.push(`user_id = $${queryValues.length}`);
    }
    if(location_id){
        queryValues.push(location_id);
        querySet.push(`location_id = $${queryValues.length}`);
    }
    if(category_id){
        queryValues.push(category_id);
        querySet.push(`category_id = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query,queryValues);
    } else {
        throw new Error('No field given');
    }
};