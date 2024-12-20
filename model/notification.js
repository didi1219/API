import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";
import {formatDate} from "../util/formatDate.js";

export const readNotification = async (SQLClient,{id}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM notification WHERE id = $1',[id]
    );
    const notification = rows[0];
    if(notification) {
        notification.creation_date = formatDate(notification.creation_date);
    }
    return notification;
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
};

export const deleteNotification = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        'DELETE FROM notification WHERE id = $1',[id]
    )
    return rows[0];
};

export const deleteManyNotifications = async (SQLClient, {ids}) => {
    try {
        for (const id of ids) {
            await deleteNotification(SQLClient, { id });
        }
    } catch (err) {
        throw new Error('Failed to delete notifications');
    }
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

export const readNbNotifications = async (SQLClient,{page,perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        `select n.id, n.title, n.content, n.event_id,  n.creation_date, n.type, n.creation_date, e.title as "event" from notification n inner join event e on e.id = n.event_id ORDER BY id LIMIT $1 OFFSET $2;`, [size, offset]
    );
    if(rows.length > 0){
        rows.map((item) => {
            item.creation_date = formatDate(item.creation_date);
        });
    }
    return rows;
};

export const readTotalRowNotifications = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM notification"
    );
    return rows[0]?.count_rows;
};

export const getNotificationByUser = async (SQLClient,{user_id,perPage,page}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT * FROM notification n inner join event e on n.event_id = e.id inner join linkuserevent l on l.event_id = e.id where l.user_id = $1 AND l.is_accepted ORDER BY n.creation_date LIMIT $2 OFFSET $3",[user_id, size,offset]
    )
    return rows;
};

export const nbRowsNotificationByUser = async (SQLClient, {user_id}) =>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) FROM notification n inner join event e on n.event_id = e.id inner join linkuserevent l on l.event_id = e.id where l.user_id = $1 AND l.is_accepted",[user_id]
    )
    return rows;
};