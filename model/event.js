import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";
import {formatDateTime} from "../util/formatDate.js";

export const readEvent = async (SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        'SELECT * FROM event WHERE id = $1',[id]
    );
    const event = rows[0];
    if(event){
        event.event_start = formatDateTime(event.event_start);
        event.event_end = formatDateTime(event.event_end);
    }
    return event;
};

export const createEvent = async (SQLClient, {title,description,event_start,event_end,street_number,is_private,picture_path,user_id,location_id,category_id}) => {
    try {
        await SQLClient.query('BEGIN');
        const {rows} = await SQLClient.query(
            'INSERT INTO event (title,description,event_start,event_end,street_number,is_private,picture_path,user_id,location_id,category_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',
            [
                title,
                description,
                event_start,
                event_end,
                street_number,
                is_private,
                picture_path,
                user_id,
                location_id,
                category_id
            ]
        );
        const eventId = rows[0]?.id;

        await SQLClient.query(
            'INSERT INTO discussionEvent (title,is_writable, event_id) VALUES ($1,$2,$3)',
            ["Information",false,eventId]
        );
        await SQLClient.query('COMMIT;');

        return eventId;
    } catch (error) {
        await SQLClient.query('ROLLBACK;');
        throw error;
    }
};

export const deleteEvent = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM discussionevent WHERE event_id = $1;', [id]
    );

    await SQLClient.query('BEGIN');
    try {
        for (const row of rows) {
            await SQLClient.query(
                'DELETE from message where discussion_event_id = $1',
                [row.id]
            );
        }
        await SQLClient.query('DELETE FROM discussionevent where event_id = $1;', [id]);
        await SQLClient.query('DELETE FROM notification where event_id = $1;', [id]);
        await SQLClient.query('DELETE FROM linkuserevent where event_id = $1;', [id]);
        await SQLClient.query('DELETE FROM event WHERE id = $1', [id]);

        return await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw  error;
    }
};

export const deleteManyEvents = async (SQLClient, {ids}) => {
    try {
        await SQLClient.query('BEGIN');
        for (const id of ids) {
            await deleteEvent(SQLClient, { id });
        }
        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const updateEvent = async (SQLClient, {id, title, description, event_start, event_end, street_number,is_private,picture_path, user_id, location_id, category_id}) => {
    let query = 'UPDATE event SET ';
    const querySet = [];
    const queryValues = [];
    if (title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }
    if (typeof description !== 'undefined'){
        queryValues.push(description);
        querySet.push(`description = $${queryValues.length}`);
    }
    if (event_start){
        queryValues.push(event_start);
        querySet.push(`event_start = $${queryValues.length}`);
    }
    if (event_end){
        queryValues.push(event_end);
        querySet.push(`event_end = $${queryValues.length}`);
    }
    if(street_number){
        queryValues.push(street_number);
        querySet.push(`street_number = $${queryValues.length}`);
    }
    if(typeof is_private !== 'undefined'){
        queryValues.push(is_private);
        querySet.push(`is_private = $${queryValues.length}`);
    }
    if(picture_path){
        queryValues.push(picture_path);
        querySet.push(`picture_path = $${queryValues.length}`);
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
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length} RETURNING id`;
        const result = await SQLClient.query(query,queryValues);
        return result.rows[0]?.id;
    } else {
        throw new Error('No field given');
    }
};

export const searchEvent = async (SQLClient, {user_id}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM event where user_id = $1 ORDER BY id', [user_id]
    );
    return rows;
};

export const readNbEventsOfUserCreated = async (SQLClient, {user_id, perPage, page}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        'select e.id, e.title, e.description, e.event_start, e.event_end, e.street_number, e.is_private, e.picture_path, e.user_id, e.location_id, e.category_id, l.label as "locality", c.icon_component_name, c.icon_name from event e inner join category c on c.id = e.category_id inner join location l on l.id = e.location_id where user_id = $1 ORDER BY id LIMIT $2 OFFSET $3', [user_id, size, offset]
    );

    rows.map((item) => {
        item.event_start = formatDateTime(item.event_start);
        item.event_end = formatDateTime(item.event_end);
    });

    return rows;
};

export const readAllEventsOfUserSubscribed = async (SQLClient, {user_id, perPage, page}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        'select event.id, event.title, event.description, event.event_start,event.event_end, event.street_number, event.is_private, event.picture_path,event.location_id, event.category_id,c.icon_name,c.icon_component_name,loc.label as "locality", l.is_accepted, l.is_waiting from event inner join linkuserevent l on event.id = l.event_id inner join category c on c.id = event.category_id inner join location loc on loc.id = event.location_id where l.user_id = $1 and l.is_accepted = true LIMIT $2 OFFSET $3', [user_id, size, offset]
    );

    rows.map((item) => {
        item.event_start = formatDateTime(item.event_start);
        item.event_end = formatDateTime(item.event_end);
    });

    return rows;
};

export const listDiscussionEvent = async (SQLClient, { id }) => {
    const { rows } = await SQLClient.query(
        `SELECT
            d.id AS discussionId,
            d.title AS conversationTitle,
            e.description AS eventDescription, 
            d.is_writable,
            u_creator.user_name as eventCreatorUserName,
            ARRAY_AGG(DISTINCT jsonb_build_object('user_name', u.user_name, 'picture_path', u.picture_path)) as usePicturePaths,
            COUNT(DISTINCT m.user_id) AS usersCount,
            MAX(m.sending_date) AS lastMessageSendingDate,
            (
                SELECT m2.content
                FROM message m2 
                WHERE m2.discussion_event_id = d.id
                ORDER BY m2.sending_date DESC
                LIMIT 1
            ) AS lastMessageContent,
            (
                SELECT jsonb_build_object('user_name', u2.user_name, 'picture_path', u2.picture_path)
                FROM message m2
                JOIN users u2 ON m2.user_id = u2.id
                WHERE m2.discussion_event_id = d.id
                ORDER BY m2.sending_date DESC
                LIMIT 1
            ) AS lastMessageUserInfo
        FROM discussionEvent d
        LEFT JOIN event e ON d.event_id = e.id
        LEFT JOIN message m ON d.id = m.discussion_event_id
        LEFT JOIN users u on u.id = m.user_id
        LEFT JOIN users u_creator on u_creator.id = e.user_id
        WHERE d.event_id = $1
        GROUP BY d.id, e.description,u_creator.user_name`, [id]
    );
    return rows;
};

export const readAllEventTitle = async (SQLClient) => {
    const {rows} = await SQLClient.query(
        'SELECT title, id FROM event ORDER BY id'
    );
    return rows;
};

export const readNbEvents = async (SQLClient, {page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        `select e.id, e.title, e.description, e.event_start,e.event_end, e.street_number,e.picture_path, e.is_private as "is_private", e.user_id, u.user_name as "user_name", l.label as "locality", l.id as "location_id", c.title as "category", c.id as "category_id", c.icon_component_name, c.icon_name FROM event e inner join location l on e.location_id = l.id inner join category c on e.category_id = c.id inner join users u on u.id = e.user_id where is_private = false ORDER BY id LIMIT $1 OFFSET $2`,[perPage,offset]
    );

    rows.map((item) => {
        item.event_start = formatDateTime(item.event_start);
        item.event_end = formatDateTime(item.event_end);
    });

    return rows;
};

export const readTotalRowEvent = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM event"
    )
    return rows[0]?.count_rows;
};

export const countSubscribers = async (SQLClient, {id: event_id}) => {
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) as count FROM linkuserevent WHERE event_id = $1 AND is_accepted = true', [event_id]
    );
    return rows[0].count;
};

export const searchOwnerEvent = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        'select user_name, u.picture_path from users u inner join event e on e.user_id = u.id where e.id = $1', [id]
    );
    return rows[0];
};