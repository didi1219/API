import e from "express";

export const readLinkUserEvent = async (SQLClient, {userID, eventID}) => {
    const {rows} = await SQLClient.query('SELECT * FROM linkuserevent WHERE user_id = $1 AND event_id = $2', [userID, eventID]);
    return rows[0];
};

export const createLinkUserEvent = async (SQLClient, {userID, eventID, isWaiting, isAccepted}) => {
    // Check if the user and the event exist ?
    await SQLClient.query('INSERT INTO linkuserevent (user_id, event_id, is_waiting, is_accepted) VALUES ($1, $2, $3, $4)',
        [
            userID,
            eventID,
            isWaiting,
            isAccepted
        ]);
};

export const deleteLinkUserEvent = async (SQLClient, {userID, eventID}) => {
    return await SQLClient.query('DELETE FROM linkuserevent WHERE user_id = $1 AND event_id = $2', [userID, eventID]);
};

export const updateLinkUserEvent = async(SQLClient, {userID, eventID, isWaiting, isAccepted}) => {
    let query = 'UPDATE linkUserEvent SET ';
    const querySet = [];
    const queryValues = [];
    if(userID){
        queryValues.push(userID);
        querySet.push(`user_id = $${queryValues.length}`);
    }
    if(eventID){
        queryValues.push(eventID);
        querySet.push(`event_id = $${queryValues.length}`);
    }
    if(isWaiting){
        queryValues.push(isWaiting);
        querySet.push(`is_waiting = $${queryValues.length}`);
    }
    if(isAccepted){
        queryValues.push(isAccepted);
        querySet.push(`is_accepted = $${queryValues.length}`);
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