export const readNotification = async (SQLClient,{id}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM notification WHERE id = $1',[id]
    )
    return rows[0];
};

export const createNotification = async (SQLClient, {title, content, event_id, creation_date, type}) => {
    const {rows} = await SQLClient.query(
     'INSERT INTO notification(title, content,event_id, creation_date, type) VALUES ($1,$2,$3,$4,$5) RETURNING id',
     [
         title,
         content,
         event_id,
         creation_date,
         type
     ]
    );
    return rows[0]?.id;
}

export const deleteNotification = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        'DELETE FROM notification WHERE id = $1',[id]
    )
    return rows[0];
};

export const updateNotification = async (SQLClient, {id, title, content, event_id, creation_date, type}) => {
    let query = 'UPDATE notification SET ';
    const querySet = [];
    const queryValues = [];
    if(title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }
    if(content){
        queryValues.push(content);
        querySet.push(`content = $${queryValues.length}`);
    }
    if(event_id){
        queryValues.push(event_id);
        querySet.push(`event_id = $${queryValues.length}`);
    }
    if(type){
        queryValues.push(type);
        querySet.push(`type = $${queryValues.length}`);
    }
    if(creation_date){
        queryValues.push(creation_date);
        querySet.push(`creation_date = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query +=`${querySet.join(", ")} WHERE  id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    }else{
        throw new Error("No field given");
    }
};
