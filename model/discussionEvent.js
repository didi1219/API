export const readDiscussionEvent = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM discussionevent WHERE id = $1',[id]
    );
    return rows[0];
};

export const createDiscussionEvent = async (SQLClient, {title,is_writable, event_id}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO discussionevent (title,is_writable, event_id) VALUES ($1,$2,$3) RETURNING id',
        [
            title,
            is_writable,
            event_id
        ]
    );
    return rows[0]?.id;
};

export const deleteDiscussionEvent = async (SQLClient,{id}) => {
    try {
        await SQLClient.query('BEGIN');
        await SQLClient.query('DELETE FROM message where discussion_event_id = $1', [id]);
        await SQLClient.query('DELETE FROM discussionevent WHERE id = $1', [id]);

        return await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const deleteDiscussionEvents = async (SQLClient, {ids}) => {
    try {
        await SQLClient.query('BEGIN');

        for (const id of ids) {
            await deleteDiscussionEvent(SQLClient, { id });
        }
        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const updateDiscussionEvent = async (SQLClient, {id, title,is_writable, event_id}) => {
    let query = 'UPDATE discussionevent SET '
    const queryValues = [];
    const querySet = [];
    if(title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }
    if(typeof is_writable !== 'undefined'){
        queryValues.push(is_writable);
        querySet.push(`is_writable = $${queryValues.length}`);
    }
    if(event_id){
        queryValues.push(event_id);
        querySet.push(`event_id = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    }else{
        throw new Error ("No field Given");
    }
};


export const readMessagesInDiscussion = async (SQLClient, { id: discussion_event_id, offset }) => {
    const { rows } = await SQLClient.query(
        `SELECT 
            m.id AS messageId,m.content AS messageContent,m.type AS messageType,m.sending_date AS sendingDate,u.id AS userId,u.user_name AS userName, u.picture_path
        FROM message m LEFT JOIN users u ON m.user_id = u.id
        WHERE m.discussion_event_id = $1
        ORDER BY m.sending_date DESC 
        LIMIT 20 OFFSET $2`,
        [discussion_event_id,offset]
    );
    return rows;
};

export const readNewerMessagesInDiscussion = async (SQLClient, { id: discussion_event_id, nextMessageID }) => {
    const { rows } = await SQLClient.query(
        `SELECT m.id AS messageId, m.content AS messageContent, m.type AS messageType, m.sending_date AS sendingDate, u.id AS userId, u.user_name AS userName
        FROM message m LEFT JOIN users u ON m.user_id = u.id
        WHERE m.discussion_event_id = $1
          AND m.sending_date > (SELECT sending_date FROM message WHERE id = $2)
        ORDER BY m.sending_date DESC`,
        [discussion_event_id, nextMessageID]
    );
    return rows;
};

export const readOlderMessagesInDiscussion = async (SQLClient, { id: discussion_event_id, previousMessageID }) => {
    const { rows } = await SQLClient.query(
        `SELECT m.id AS messageId, m.content AS messageContent, m.type AS messageType, m.sending_date AS sendingDate, u.id AS userId,u.user_name AS userName
        FROM message m LEFT JOIN users u ON m.user_id = u.id
        WHERE m.discussion_event_id = $1
          AND m.sending_date < ( SELECT sending_date FROM message WHERE id = $2)
        ORDER BY m.sending_date DESC LIMIT 20`,
        [discussion_event_id, previousMessageID]
    );
    return rows;
};

export const readAllDiscussionTitle = async (SQLClient) => {
    const {rows} = await SQLClient.query(
        'select de.id, de.title as "discussionTitle", e.title from discussionevent de inner join event e on e.id = de.event_id order by id',
    );
    return rows;
};

export const readNbDiscussionsEvent = async (SQLClient,{perPage, page}) => {
    const offset = perPage * (page - 1);
    const {rows} = await SQLClient.query(
        "select de.id, de.title, de.is_writable, de.event_id, e.title AS \"event\" from discussionevent de inner join event e on e.id = de.event_id ORDER BY id LIMIT $1 OFFSET $2",[perPage, offset]
    );
    return rows;
};

export const readTotalRowDiscussionsEvent = async (SQLClient) => {
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as nb_columns FROM discussionevent"
    );
    return rows[0]?.nb_columns;
};