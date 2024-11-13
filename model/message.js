export const readMessage = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        "SELECT * FROM message WHERE  id = $1", [id]
    );
    return rows[0];
}
export const createMessage = async (SQLClient, {content, gps, type, user_id, discussion_event_id}) => {
    const {rows} = await SQLClient.query(
        "INSERT INTO message(content, gps, type, user_id,discussion_event_id) VALUES ($1,$2,$3,$4,$5) RETURNING id",
        [
            content,
            gps,
            type,
            user_id,
            discussion_event_id,
        ]
    );
    return rows[0];
}
export const deleteMessage = async (SQLClient, {id}) => {
    await SQLClient.query(
        "DELETE FROM message WHERE id = $1",[id]
    );
}
export const updateMessage = async (SQLClient, {id,content, gps, type, user_id, discussion_event_id}) => {
    let query = "UPDATE message SET ";
    const querySet = [];
    const queryValues = [];
    if(content){
        queryValues.push(content);
        querySet.push(`content = $${queryValues.length}`);
    }
    if(gps){
        queryValues.push(gps);
        querySet.push(`gps = $${queryValues.length}`);
    }
    if(type){
        queryValues.push(type);
        querySet.push(`type = $${queryValues.length}`);
    }
    if(user_id){
        queryValues.push(user_id);
        querySet.push(`user_id = $${queryValues.length}`);
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
}