import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";

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

export const deleteManyLinkUserEvents = async (SQLClient, linkUserEvents) => {
    if (!Array.isArray(linkUserEvents) || linkUserEvents.length === 0) {
        throw new Error('No linkUserEvents provided for deletion.');
    }
    try {
        await SQLClient.query('BEGIN');
        for (const { user_id, event_id } of linkUserEvents) {
            await deleteLinkUserEvent(SQLClient, { user_id, event_id });
        }
        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
}

export const updateLinkUserEvent = async (SQLClient, { user_id, event_id, isWaiting, isAccepted }) => {
    let query = 'UPDATE linkUserEvent SET ';
    const querySet = [];
    const queryValues = [];

    if (typeof isWaiting !== 'undefined') {
        queryValues.push(isWaiting);
        querySet.push(`isWaiting = $${queryValues.length}`);
    }
    if (typeof isAccepted !== 'undefined') {
        queryValues.push(isAccepted);
        querySet.push(`isAccepted = $${queryValues.length}`);
    }

    if (querySet.length > 0) {
        queryValues.push(user_id);
        queryValues.push(event_id);
        query += `${querySet.join(', ')} WHERE user_id = $${queryValues.length - 1} AND event_id = $${queryValues.length}`;
        
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No fields to update provided.');
    }
};

export const readAllLinkUserEvent = async (SQLClient, {page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT * FROM linkuserevent LIMIT $1 OFFSET $2", [perPage, offset]
    )
    return rows;
}
export const nbRows = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM linkuserevent"
    )
    return rows[0].count_rows;
}

export const readInvitationNotAcceptedByCurrentId = async (SQLClient,{user_id}) =>{
    const {rows} = await SQLClient.query(
        "SELECT * FROM linkuserevent l INNER JOIN event e on l.event_id = e.id WHERE l.user_id = $1 AND isWaiting",[user_id]
    )
    return rows;
}

export const isFavoritePatch = async (SQLClient,{user_id,event_id}) => {
    const {rows} = await SQLClient.query(
        "UPDATE linkuserevent SET isFavorite = NOT isFavorite WHERE user_id = $1 AND event_id = $2",[user_id,event_id]
    )
    return rows;
}

export const readFavoriteEvent = async (SQLClient, {user_id, page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT * FROM linkuserevent l INNER JOIN event e on l.event_id = e.id where l.user_id = $1 LIMIT $2 OFFSET $3 ", [user_id, size,offset]
    )
    return rows;
}

