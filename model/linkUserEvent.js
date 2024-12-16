import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";

export const readLinkUserEvent = async (SQLClient, {id}) => {

    const {rows} = await SQLClient.query(
        'SELECT * FROM linkuserevent WHERE id = $1', [id]
    );
    return rows[0];
};

export const createLinkUserEvent = async (SQLClient, {user_id, event_id, is_waiting, is_accepted}) => {
    const {rows} = await SQLClient.query('INSERT INTO linkuserevent (user_id, event_id, is_waiting, is_accepted, is_favorite) VALUES ($1, $2, $3, $4,$5)',
        [
            user_id,
            event_id,
            is_waiting,
            is_accepted,
            false
        ]);
    return rows[0];
};

export const deleteLinkUserEvent = async (SQLClient, {id}) => {
    return await SQLClient.query(
        'DELETE FROM linkuserevent WHERE id = $1', [id]
    );
};

export const deleteManyLinkUserEvents = async (SQLClient, {ids}) => {
    try {
        await SQLClient.query('BEGIN');
        for (const id of ids) {
            await deleteLinkUserEvent(SQLClient, {id});
        }
        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
}

export const updateLinkUserEvent = async (SQLClient, {id, user_id, event_id, is_waiting, is_accepted}) => {
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
    if (typeof is_waiting !== 'undefined') {
        queryValues.push(is_waiting);
        querySet.push(`is_waiting = $${queryValues.length}`);
    }
    if (typeof is_accepted !== 'undefined') {
        queryValues.push(is_accepted);
        querySet.push(`is_accepted = $${queryValues.length}`);
    }

    if (querySet.length > 0) {
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No fields to update provided.');
    }
};

export const readNbLinkUserEvents = async (SQLClient, {page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "select l.id, l.user_id, l.event_id, l.is_accepted, l.is_waiting, e.title AS \"event\", u.user_name from linkuserevent l inner join users u on u.id = l.user_id inner join event e on e.id = l.event_id ORDER BY l.id LIMIT $1 OFFSET $2", [perPage, offset]
    );
    return rows;
};

export const readTotalRowLinkUserEvents = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM linkuserevent"
    );
    return rows[0]?.count_rows;
}

export const readInvitationNotAcceptedByCurrentId = async (SQLClient,{user_id}) =>{
    const {rows} = await SQLClient.query(
        "SELECT * FROM linkuserevent l INNER JOIN event e on l.event_id = e.id WHERE l.user_id = $1 AND is_waiting",[user_id]
    )
    return rows;
}

export const isFavoritePatch = async (SQLClient,{user_id,event_id}) => {
    const {rows} = await SQLClient.query(
        "UPDATE linkuserevent SET is_favorite = NOT is_favorite WHERE user_id = $1 AND event_id = $2",[user_id,event_id]
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

;
