export const readMessage = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        "SELECT * FROM message WHERE  id = $1", [id]
    );
    return rows[0];
};

export const createMessage = async (SQLClient, {content, type, user_id, discussion_event_id}) => {
    const sending_date = new Date();
    const {rows} = await SQLClient.query(
        "INSERT INTO message(content, type, sending_date, user_id, discussion_event_id) VALUES ($1,$2,$3,$4,$5) RETURNING id",
        [
            content,
            type,
            sending_date,
            user_id,
            discussion_event_id,
        ]
    );
    return rows[0]?.id;
};

export const deleteMessage = async (SQLClient, {id}) => {
    return await SQLClient.query(
        'DELETE FROM message WHERE id = $1',[id]
    );
};

export const updateMessage = async (SQLClient, {id,content, type, user_id, sending_date, discussion_event_id}) => {
    let query = "UPDATE message SET ";
    const querySet = [];
    const queryValues = [];
    if(content){
        queryValues.push(content);
        querySet.push(`content = $${queryValues.length}`);
    }
    if(type){
        queryValues.push(type);
        querySet.push(`type = $${queryValues.length}`);
    }
    if(user_id){
        queryValues.push(user_id);
        querySet.push(`user_id = $${queryValues.length}`);
    }
    if(sending_date){
        queryValues.push(sending_date);
        querySet.push(`sending_date = $${queryValues.length}`);
    }
    if(discussion_event_id){
        queryValues.push(discussion_event_id);
        querySet.push(`discussion_event_id = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    }else{
        throw new Error ("No field Given");
    }
};