import {calculOffset, verifyValueOfPerPage} from "../util/paging.js";

export const readCategory = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query(
        'SELECT * FROM category WHERE id = $1', [id]
    );
    return rows[0];
};

export const createCategory = async (SQLClient, {title,icon_component_name,icon_name}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO category (title,icon_component_name,icon_name) VALUES ($1,$2,$3) RETURNING id',
        [title,icon_component_name,icon_name]
    );
    return rows[0]?.id;
};

export const deleteCategory = async (SQLClient, {id}) => {

    await SQLClient.query('UPDATE event SET category_id = NULL WHERE category_id = $1', [id]);

    return await SQLClient.query('DELETE FROM category WHERE id = $1',[id]);
};

export const deleteCategories = async (SQLClient, {ids}) => {
    try {
        await SQLClient.query('BEGIN');
        for (const id of ids) {
            await deleteCategory(SQLClient, {id});
        }
        await SQLClient.query('COMMIT');
    } catch (error) {
        await SQLClient.query('ROLLBACK');
        throw error;
    }
};

export const updateCategory = async (SQLClient, {id,title,icon_component_name,icon_name}) => {
    let query = 'UPDATE category SET ';
    const querySet = [];
    const queryValues = [];
    if (title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }
    if (icon_component_name){
        queryValues.push(icon_component_name);
        querySet.push(`icon_component_name = $${queryValues.length}`);
    }
    if (icon_name){
        queryValues.push(icon_name);
        querySet.push(`icon_name = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query,queryValues);
    } else {
        throw new Error('No field given');
    }
};

export const readAllCategories = async (SQLClient) => {
    const {rows} = await SQLClient.query(
        'SELECT id, title, icon_component_name, icon_name FROM category ORDER BY id'
    );
    return rows;
};

export const readNbCategories = async (SQLClient, {page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        `SELECT id, title , icon_component_name, icon_name FROM category ORDER BY id LIMIT $1 OFFSET $2`,[perPage, offset]
    );
    return rows;
};

export const readTotalRowCategories = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM category"
    );
    return rows[0]?.count_rows;
};