export const readLinkUserEvent = async (SQLClient, {user_id, event_id}) => {

    const {rows} = await SQLClient.query('SELECT * FROM linkuserevent WHERE user_id = $1 AND event_id = $2', [user_id, event_id]);
    return rows[0];
};

export const createLinkUserEvent = async (SQLClient, {user_id, event_id, isWaiting, isAccepted}) => {
    const {rows} = await SQLClient.query('INSERT INTO linkuserevent (user_id, event_id, isWaiting, isAccepted) VALUES ($1, $2, $3, $4)',
        [
            user_id,
            event_id,
            isWaiting,
            isAccepted
        ]);
    return rows[0];
};

export const deleteLinkUserEvent = async (SQLClient, {user_id, event_id}) => {
    return await SQLClient.query('DELETE FROM linkuserevent WHERE user_id = $1 AND event_id = $2', [user_id, event_id]);
};

export const updateLinkUserEvent = async(SQLClient, {user_id, event_id, isWaiting, isAccepted}) => {
    let query = 'UPDATE linkUserEvent SET ';
    const querySet = [];
    const queryValues = [];
    if(user_id){
        queryValues.push(user_id);
        querySet.push(`user_id = $${queryValues.length}`);
    }
    if(event_id){
        queryValues.push(event_id);
        querySet.push(`event_id = $${queryValues.length}`);
    }
    if(isWaiting){
        queryValues.push(isWaiting);
        querySet.push(`isWaiting = $${queryValues.length}`);
    }
    if(isAccepted){
        queryValues.push(isAccepted);
        querySet.push(`isAccepted = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(userID);
        queryValues.push(eventID);
        query += `${querySet.join(', ')} WHERE user_id = $${queryValues.length - 1} AND event_id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};