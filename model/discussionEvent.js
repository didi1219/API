export const readDiscussionEvent = async (SQLClient,{id}) => {
    const {rows} = await SQLClient.query(
        "SELECT * FROM discussionevent WHERE id = $1",[id]
    );
    return rows[0];
}
export const createDiscussionEvent = async (SQLClient,{title, event_id}) => {
    const {rows} = await SQLClient.query(
        "INSERT INTO discussionevent (title, event_id) VALUES ($1,$2) RETURNING id",[title, event_id]
    );
    return rows[0];
}
export const deleteDiscussionEvent = async (SQLClient,{id}) => {
    const {rows} = await SQLClient.query(
        "DELETE FROM discussionevent WHERE id = $1",[id]
    )
    return rows[0];
}
export const updateDiscussionEvent = async (SQLClient,{id,title, event_id}) => {
    let query = "UPDATE discussionevent SET "
    const queryValues = [];
    const querySet = [];
    if(title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
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
}