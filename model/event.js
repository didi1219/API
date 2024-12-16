import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";

export const readEvent = async (SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        'SELECT * FROM event WHERE id = $1',[id]
    );
    return rows[0];
};

export const createEvent = async (SQLClient, {title,description,event_start,event_end,street_number,isPrivate,picture_path,user_id,location_id,category_id}) => {
    try {
        await SQLClient.query('BEGIN');
        const {rows} = await SQLClient.query(
            'INSERT INTO event (title,description,event_start,event_end,street_number,isPrivate,picture_path,user_id,location_id,category_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id',
            [
                title,
                description,
                event_start,
                event_end,
                street_number,
                isPrivate,
                picture_path,
                user_id,
                location_id,
                category_id
            ]
        );
        const eventId = rows[0]?.id;

        await SQLClient.query(
            'INSERT INTO discussionEvent (title,isWritable, event_id) VALUES ($1,$2,$3)',
            ["Information",false,eventId]
        );
        await SQLClient.query('COMMIT');

        return eventId;
    } catch (error) {
        await SQLClient.query('ROLLBACK');
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

export const updateEvent = async (SQLClient, {id, title, description, event_start, event_end, street_number,isPrivate,picture_path, user_id, location_id, category_id}) => {
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
    if (event_start){
        queryValues.push(event_start);
        querySet.push(`event_date = $${queryValues.length}`);
    }
    if (event_end){
        queryValues.push(event_end);
        querySet.push(`event_end = $${queryValues.length}`);
    }
    if(street_number){
        queryValues.push(street_number);
        querySet.push(`street_number = $${queryValues.length}`);
    }
    if(isPrivate){
        queryValues.push(isPrivate);
        querySet.push(`isPrivate = $${queryValues.length}`);
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
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query,queryValues);
    } else {
        throw new Error('No field given');
    }
};

export const readAllEventsOfUserCreated = async (SQLClient, {user_id, perPage, page}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        'SELECT * FROM event where user_id = $1 ORDER BY id LIMIT $2 OFFSET $3', [user_id, size, offset]
    );
    return rows;
};

export const readAllEventsOfUserSubscribed = async (SQLClient, {user_id, perPage, page}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        'select event.id, event.title, event.description, event.event_date, event.street_number, event.isprivate, event.picture_path, event.duration,event.location_id, event.category_id, l.isaccepted, l.iswaiting from event inner join linkuserevent l on event.id = l.event_id where l.user_id = $1 and l.isAccepted = true LIMIT $2 OFFSET $3', [user_id, size, offset]
    );
    return rows;
};

export const listDiscussionEvent = async (SQLClient, { id }) => {
    const { rows } = await SQLClient.query(
        `SELECT
            d.id AS discussionId,
            d.title AS conversationTitle,
            e.description AS eventDescription,
            COUNT(DISTINCT m.user_id) AS usersCount,
            MAX(m.sending_date) AS lastMessageSendingDate,
            (
                SELECT m2.content
                FROM message m2
                WHERE m2.discussion_event_id = d.id
                ORDER BY m2.sending_date DESC
                LIMIT 1
            ) AS lastMessageContent
        FROM
            discussionEvent d
        LEFT JOIN
            event e ON d.event_id = e.id
        LEFT JOIN
            message m ON d.id = m.discussion_event_id
        WHERE
            d.event_id = $1
        GROUP BY
            d.id, e.description`,
        [id]
    );
    return rows;
};


/*
export const searchEvent = async (SQLClient, {user_id}) => {
    try {
       const {rows} = await SQLClient.query(
            'SELECT * FROM event where user_id = $1', [user_id]
       );
       return rows;
    } catch (error){
        throw new Error();
    }
};*/

export const readEvents = async (SQLClient, {page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        `SELECT * FROM event ORDER BY id LIMIT $1 OFFSET $2`,[perPage,offset]
    );
    return rows;
};

export const readTotalRowEvent = async (SQLClient) =>{
    const query = `SELECT COUNT(*) AS total_rows FROM event`;
    const { rows } = await SQLClient.query(query);
    return rows[0].total_rows;
};

export const nbRows = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM event"
    )
    return rows[0].count_rows;
}

export const countSubscribers = async (SQLClient, {id: event_id}) => {
    const {rows} = await SQLClient.query(
        'SELECT COUNT(*) as count FROM linkuserevent WHERE event_id = $1 AND isAccepted = true', [event_id]
    );
    return rows[0].count;
}
