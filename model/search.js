import {calculOffset,verifyValueOfPerPage} from '../util/paging.js'


export const readEventByName = async (SQLClient, {name,perPage, page})=> {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    console.log(name)
    const nameConcat = `%${name}%`
    const {rows} = await SQLClient.query(
        "SELECT * FROM event WHERE title ILIKE $1 LIMIT $2 OFFSET $3",[nameConcat, size, offset]
    )
    return rows;
};

export const readEventGeneric = async (SQLClient, { page, perPage, search }) => {
    const searchConcat = `%${search}%`;
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const { rows } = await SQLClient.query("SELECT e.id, e.title AS EvenTitle, e.description, e.event_date, e.street_number,  l.label AS locality, c.title AS categorytitle FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id WHERE e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1 ORDER BY e.id ASC LIMIT $2 OFFSET $3", [searchConcat, size, offset]);
    return rows;
};

export const readEventByCategories = async (SQLClient, {categories, page , perPage})=> {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const sqlCategories = categories.map((_, index) => `$${index + 1}`).join(', ');
    const {rows} = await SQLClient.query(
        `SELECT * FROM event WHERE category_id IN (${sqlCategories}) ORDER BY id LIMIT $${categories.length + 1} OFFSET $${categories.length + 2}`, [...categories, size, offset]
    )
    return rows;
};

export const readEventByLocalities = async (SQLClient, { localities, page, perPage }) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({ size, page });
    const sqlLocalities = localities.map((_, index) => `$${index + 1}`).join(', ');
    const { rows } = await SQLClient.query(
        `SELECT * FROM event WHERE location_id IN (${sqlLocalities}) ORDER BY id LIMIT $${localities.length + 1} OFFSET $${localities.length + 2}`,
        [...localities, size, offset]
    );

    return rows;
};

export const readAllEvents = async (SQLClient,{page, perPage})=>{
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT * FROM event ORDER BY id LIMIT $1 OFFSET $2", [size, offset]
    )
    return rows;
};

export const setFavorite = async (SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        "UPDATE event SET is_favorite = NOT is_favorite WHERE id = $1",
        [id]
    )
    return rows;
};

export const readEventByOwner = async(SQLClient, {id, perPage, page}) =>{
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT * FROM event WHERE user_id = $1 LIMIT $2 OFFSET $3", [id, size,offset]
    )
    return rows;
};

export const readNbEventOwner = async(SQLClient, {id, perPage, page}) =>{
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) FROM event WHERE user_id = $1 LIMIT $2 OFFSET $3", [id, size,offset]
    )
    return rows[0];
};

export const readNbEventUser = async(SQLClient, {id})=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) FROM linkuserevent WHERE user_id = $1 AND isAccepted",[id]
    )
    return rows[0];
};