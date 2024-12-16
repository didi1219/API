import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";

export const readLinkUserEvent = async (SQLClient, {user_id, event_id}) => {

    const {rows} = await SQLClient.query('SELECT * FROM linkuserevent WHERE user_id = $1 AND event_id = $2', [user_id, event_id]);
    return rows[0];
};

export const createLinkUserEvent = async (SQLClient, {user_id, event_id, is_waiting, is_accepted}) => {
    const {rows} = await SQLClient.query('INSERT INTO linkuserevent (user_id, event_id, is_waiting, is_accepted) VALUES ($1, $2, $3, $4)',
        [
            user_id,
            event_id,
            is_waiting,
            is_accepted
        ]);
    return rows[0];
};

export const deleteLinkUserEvent = async (SQLClient, {user_id, event_id}) => {
    return await SQLClient.query('DELETE FROM linkuserevent WHERE user_id = $1 AND event_id = $2', [user_id, event_id]);
};

export const updateLinkUserEvent = async (SQLClient, { user_id, event_id, is_waiting, is_accepted }) => {
    if (!user_id || !event_id) {
        throw new Error("Both 'user_id' and 'event_id' are required to update a record.");
    }
    let query = 'UPDATE linkUserEvent SET ';
    const querySet = [];
    const queryValues = [];

    if (typeof is_waiting !== 'undefined') {
        queryValues.push(is_waiting);
        querySet.push(`is_waiting = $${queryValues.length}`);
    }
    if (typeof is_accepted !== 'undefined') {
        queryValues.push(is_accepted);
        querySet.push(`is_accepted = $${queryValues.length}`);
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

export const readNbLinkUserEvents = async (SQLClient, {page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "select l.user_id, l.event_id, l.is_accepted, l.is_waiting, e.title AS \"event\", u.user_name from linkuserevent l inner join users u on u.id = l.user_id inner join event e on e.id = l.event_id ORDER BY l.user_id LIMIT $1 OFFSET $2", [perPage, offset]
    );
    return rows;
};

export const readTotalRowLinkUserEvents = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM linkuserevent"
    );
    return rows[0]?.count_rows;
};
