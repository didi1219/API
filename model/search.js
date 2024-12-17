import { user } from '../middleware/validator/user.js';
import {calculOffset,verifyValueOfPerPage} from '../util/paging.js'

export const readEventByName = async (SQLClient, {name,perPage, page})=> {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const nameConcat = `%${name}%`
    const {rows} = await SQLClient.query(
        'SELECT * FROM event WHERE title ORDER BY id ILIKE $1 LIMIT $2 OFFSET $3',
        [
            nameConcat,
            size,
            offset
        ]
    );
    return rows;
};

export const readEventGeneric = async (SQLClient, { page, perPage, search }) => {
    const searchConcat = `%${search}%`;
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const { rows } = await SQLClient.query(
        'SELECT e.id, e.title,e.description,e.event_start,e.event_end,e.street_number,e.picture_path,e.is_private,u.user_name,l.label AS locality, c.title as category FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1 ORDER BY e.id ASC LIMIT $2 OFFSET $3',
        [
            searchConcat,
            size,
            offset
        ]
    );
    return rows;
};

export const readTotalRowEventGenericSearched = async (SQLClient, { page, perPage, search })=>{
    const searchConcat = `%${search}%`;
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1 LIMIT $2 OFFSET $3",
        [
            searchConcat,
            size,
            offset
        ]
    );
    return rows[0]?.count_rows;
};


export const readEventByCategories = async (SQLClient, {categories, page , perPage})=> {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const sqlCategories = categories.map((_, index) => `$${index + 1}`).join(', ');
    const {rows} = await SQLClient.query(
        `SELECT * FROM event WHERE category_id IN (${sqlCategories}) ORDER BY id LIMIT $${categories.length + 1} OFFSET $${categories.length + 2}`,
        [
            ...categories,
            size,
            offset
        ]
    );
    return rows;
};

export const readNbRowsSearchByCategories = async (SQLClient, {categories})=> {
    const sqlCategories = categories.map((_, index) => `$${index + 1}`).join(', ');
    const {rows} = await SQLClient.query(
        `SELECT COUNT(*) as count_rows FROM event WHERE category_id IN (${sqlCategories})`, [...categories]
    )
    return rows[0].count_rows;
};

export const readEventByLocalities = async (SQLClient, { localities, page, perPage }) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({ size, page });
    const sqlLocalities = localities.map((_, index) => `$${index + 1}`).join(', ');
    const { rows } = await SQLClient.query(
        `SELECT * FROM event WHERE location_id IN (${sqlLocalities}) ORDER BY id LIMIT $${localities.length + 1} OFFSET $${localities.length + 2}`,
        [...localities,
             size,
              offset
        ]
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


export const readEventByOwner = async(SQLClient, {id, perPage, page}) =>{
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await SQLClient.query(
        `SELECT * FROM event WHERE user_id = $1 LIMIT $2 OFFSET $3`,
        [
            id,
            size,
            offset
        ]
    );
    return rows;
};

export const readNbEventOwner = async(SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM event WHERE user_id = $1", [id]
    )
    return rows[0].count_rows;
};


export const readPublicEvents = async (SQLClient,{ page, perPage}) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const {rows} = await  SQLClient.query(
        `SELECT e.id, e.title,e.description,e.event_start,e.event_end,e.street_number,e.picture_path,e.is_private,u.user_name,l.label AS locality, c.title as category FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE e.is_private = false ORDER BY e.id ASC LIMIT $1 OFFSET $2`,
        [
            size,
            offset
        ]
    );
    return rows;
};
export const nbRowsreadPublicEvents = async (SQLClient) => {
    const {rows} = await  SQLClient.query(
        `SELECT COUNT(*) as rows_count FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE e.is_private = false`
    );
    return rows[0].rows_count;
};

export const readEventGenericByUser = async (SQLClient, { page, perPage, search, user_id }) => {
    const searchConcat = `%${search}%`;
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const { rows } = await SQLClient.query(
        'SELECT * FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id  inner join linkuserevent link on link.event_id = e.id where link.user_id = $1 AND e.title ILIKE $2 OR l.label ILIKE $2 OR c.title ILIKE $2 LIMIT $3 OFFSET $4',
        [
            user_id,
            searchConcat,
            size,
            offset
        ]
    );
    return rows;
};

export const readEventGenericByOwner = async (SQLClient, { page, perPage, search, user_id }) => {
    const searchConcat = `%${search}%`;
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const { rows } = await SQLClient.query(
        'SELECT * FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id where e.user_id = $1 AND e.title ILIKE $2 OR l.label ILIKE $2  OR c.title ILIKE $2 LIMIT $3 OFFSET $4',
        [
            user_id,
            searchConcat,
            size,
            offset
        ]
    );
    return rows;
};

export const nbRowsEventGenericByOwner = async(SQLClient, { search, user_id }) => {
    const searchConcat = `%${search}%`;
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const { rows } = await SQLClient.query(
        'SELECT COUNT(*) as rows_count FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id where e.user_id = $1 AND e.title ILIKE $2 OR l.label ILIKE $2  OR c.title ILIKE $2',
        [
            user_id,
            searchConcat,
        ]
    );
    return rows[0]?.rows_count;
}

export const nbRowsEventGenericByFollow = async (SQLClient, {search, user_id }) => {
    const searchConcat = `%${search}%`;
    const { rows } = await SQLClient.query(
        'SELECT COUNT(*) as rows_count FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id  inner join linkuserevent link on link.event_id = e.id where link.user_id = $1 AND e.title ILIKE $2 OR l.label ILIKE $2 OR c.title ILIKE $2',
        [
            user_id,
            searchConcat,
        ]
    );
    return rows[0].rows_count;
};

export const searchCombinePublicEvent = async(SQClient,{search,}) =>{
    
}