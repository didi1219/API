import {calculOffset,verifyValueOfPerPage} from '../util/paging.js'
import {formatDateTime} from "../util/formatDate.js";

export const readEventByName = async (SQLClient, {name,perPage, page})=> {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const nameConcat = `%${name}%`
    const {rows} = await SQLClient.query(
        'SELECT * FROM event WHERE title ILIKE $1 ORDER BY id LIMIT $2 OFFSET $3',
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
        'select e.id, e.title, e.description, e.event_start,e.event_end, e.street_number,e.picture_path, e.is_private as "is_private", e.user_id, u.user_name as "user_name", l.label as "locality", l.id as "location_id", c.title as "category", c.id as "category_id", c.icon_component_name, c.icon_name FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1 ORDER BY e.id ASC LIMIT $2 OFFSET $3',
        [
            searchConcat,
            size,
            offset
        ]
    );
    return rows;
};

export const readTotalRowEventGenericSearched = async (SQLClient, { search })=>{
    const searchConcat = `%${search}%`;
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) as count_rows FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1",
        [
            searchConcat
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
        `select e.id, e.title, e.description, e.event_start,e.event_end, e.street_number,e.picture_path, e.is_private as "is_private", e.user_id, u.user_name as "user_name", l.label as "locality", l.id as "location_id", c.title as "category", c.id as "category_id", c.icon_component_name, c.icon_name FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE e.is_private = false ORDER BY e.id ASC LIMIT $1 OFFSET $2`,
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
};

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

export const searchCombinePublicEvent = async(SQLClient,{search,page, perPage}) =>{
    const searchConcat = `%${search}%`;
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({size, page});
    const { rows } = await SQLClient.query(
        'select e.id, e.title, e.description, e.event_start,e.event_end, e.street_number,e.picture_path, e.is_private as "is_private", e.user_id, u.user_name as "user_name", l.label as "locality", l.id as "location_id", c.title as "category", c.id as "category_id", c.icon_component_name, c.icon_name FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE (e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1) AND NOT e.is_private ORDER BY e.id ASC LIMIT $2 OFFSET $3',
        [
            searchConcat,
            size,
            offset
        ]
    );
    return rows;
};

export const nbRowsSearchCombinePublicEvent = async(SQLClient, {search}) => {
    const searchConcat = `%${search}%`;
    const { rows } = await SQLClient.query(
        'SELECT COUNT(*) as rows_count FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id INNER JOIN users u on u.id = e.user_id WHERE (e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1) AND NOT e.is_private',
        [
            searchConcat,
 
        ]
    );
    return rows[0].rows_count;
};

export const searchCombineCategoriesAndLocalities = async (SQLClient, { locality, categories, search, page, perPage }) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({ size, page });

    const filters = [];
    const values = [];


    if (locality) {
        const localityPlaceholder = `$${values.length + 1}`;
        filters.push(`l.label ILIKE ${localityPlaceholder}`);
        values.push(`%${locality}%`);
    }


    if (categories && categories.length > 0) {
        const categoriesPlaceholders = categories.map((_, index) => `$${values.length + index + 1}`).join(', ');
        filters.push(`e.category_id IN (${categoriesPlaceholders})`);
        values.push(...categories);
    }


    if (search) {
        const searchPlaceholder = `$${values.length + 1}`;
        filters.push(`(e.title ILIKE ${searchPlaceholder} OR l.label ILIKE ${searchPlaceholder} OR c.title ILIKE ${searchPlaceholder})`);
        values.push(`%${search}%`);
    }

    const limitPlaceholder = `$${values.length + 1}`;
    const offsetPlaceholder = `$${values.length + 2}`;
    values.push(size, offset);


    const whereClause = `WHERE e.is_private = false` + (filters.length > 0 ? ` AND ${filters.join(' AND ')}` : '');

    const query = `
        SELECT 
            e.id, e.title, e.description, e.event_start, e.event_end, e.street_number, 
            e.picture_path, e.is_private, u.user_name, l.label AS locality, c.title AS category, c.icon_component_name, c.icon_name
        FROM event e
        INNER JOIN location l ON e.location_id = l.id
        INNER JOIN category c ON e.category_id = c.id
        INNER JOIN users u ON e.user_id = u.id
        ${whereClause}
        ORDER BY e.id ASC
        LIMIT ${limitPlaceholder} OFFSET ${offsetPlaceholder};
    `;
    const { rows } = await SQLClient.query(query, values);

    return rows;
};

export const nbRowsSearchCombineCategoriesAndLocalities = async (SQLClient, { locality, categories, search}) => {

    const filters = [];
    const values = [];


    if (locality) {
        const localityPlaceholder = `$${values.length + 1}`;
        filters.push(`l.label ILIKE ${localityPlaceholder}`);
        values.push(`%${locality}%`);
    }


    if (categories && categories.length > 0) {
        const categoriesPlaceholders = categories.map((_, index) => `$${values.length + index + 1}`).join(', ');
        filters.push(`e.category_id IN (${categoriesPlaceholders})`);
        values.push(...categories);
    }


    if (search) {
        const searchPlaceholder = `$${values.length + 1}`;
        filters.push(`(e.title ILIKE ${searchPlaceholder} OR l.label ILIKE ${searchPlaceholder} OR c.title ILIKE ${searchPlaceholder})`);
        values.push(`%${search}%`);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';
    
    const query = `
        SELECT 
            COUNT(*) as rows_count
        FROM event e
        INNER JOIN location l ON e.location_id = l.id
        INNER JOIN category c ON e.category_id = c.id
        INNER JOIN users u ON e.user_id = u.id
        ${whereClause};`;
    const { rows } = await SQLClient.query(query, values);

    return rows[0].rows_count;
};


export const searchCombineCategoriesAndLocalitiesOwnEvent = async (SQLClient, { search, user_id }) => {
    const filters = [];
    const values = [];


    if (search) {
        const searchPlaceholder = `$${values.length + 1}`;
        filters.push(`(e.title ILIKE ${searchPlaceholder} OR l.label ILIKE ${searchPlaceholder} OR c.title ILIKE ${searchPlaceholder})`);
        values.push(`%${search}%`);
    }

    if (user_id) {
        const userPlaceholder = `$${values.length + 1}`;
        filters.push(`e.user_id = ${userPlaceholder}`);
        values.push(user_id);
    }


    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    const query = `
        SELECT
            e.id, e.title, e.description, e.event_start, e.event_end, e.street_number,
            e.picture_path, e.is_private, u.user_name, l.label AS locality, c.title AS category, c.icon_component_name, c.icon_name
        FROM event e
                 INNER JOIN location l ON e.location_id = l.id
                 INNER JOIN category c ON e.category_id = c.id
                 INNER JOIN users u ON e.user_id = u.id
            ${whereClause}
    `;
    const { rows } = await SQLClient.query(query, values);

    rows.map((item) => {
        item.event_start = formatDateTime(item.event_start);
        item.event_end = formatDateTime(item.event_end);
    });

    return rows;
};

export const countCombineCategoriesAndLocalitiesOwnEvent = async (SQLClient, {search, user_id }) => {
    const filters = [];
    const values = [];


    if (search) {
        const searchPlaceholder = `$${values.length + 1}`;
        filters.push(`(e.title ILIKE ${searchPlaceholder} OR l.label ILIKE ${searchPlaceholder} OR c.title ILIKE ${searchPlaceholder})`);
        values.push(`%${search}%`);
    }

    if (user_id) {
        const userPlaceholder = `$${values.length + 1}`;
        filters.push(`e.user_id = ${userPlaceholder}`);
        values.push(user_id);
    }

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    const query = `
        SELECT 
            COUNT(*) AS total
        FROM event e
        INNER JOIN location l ON e.location_id = l.id
        INNER JOIN category c ON e.category_id = c.id
        INNER JOIN users u ON e.user_id = u.id
        ${whereClause};
    `;

    const { rows } = await SQLClient.query(query, values);

    return rows[0].total;
};

export const searchCombineCategoriesAndLocalitiesFollowedEvent = async (SQLClient, { search, page, perPage, user_id }) => {
    const size = verifyValueOfPerPage(perPage);
    const offset = calculOffset({ size, page })

    const filters = [];
    const values = [];

    if (search) {
        const searchPlaceholder = `$${values.length + 1}`;
        filters.push(`(e.title ILIKE ${searchPlaceholder} OR l.label ILIKE ${searchPlaceholder} OR c.title ILIKE ${searchPlaceholder})`);
        values.push(`%${search}%`);
    }

    if (user_id) {
        const userPlaceholder = `$${values.length + 1}`;
        filters.push(`le.user_id = ${userPlaceholder}`);
        values.push(user_id);
    }

    const limitPlaceholder = `$${values.length + 1}`;
    const offsetPlaceholder = `$${values.length + 2}`;
    values.push(size, offset);

    const whereClause = filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

    const query = `
        SELECT 
            e.id, e.title, e.description, e.event_start, e.event_end, e.street_number, 
            e.picture_path, e.is_private, u.user_name, l.label AS locality, c.title AS category, c.icon_component_name, c.icon_name
        FROM event e
        INNER JOIN location l ON e.location_id = l.id
        INNER JOIN category c ON e.category_id = c.id
        INNER JOIN users u ON e.user_id = u.id
        INNER JOIN linkuserevent le ON e.id = le.event_id
        ${whereClause}
        ORDER BY e.id ASC
        LIMIT ${limitPlaceholder} OFFSET ${offsetPlaceholder};
    `;

    const { rows } = await SQLClient.query(query, values);
    rows.map((item) => {
        item.event_start = formatDateTime(item.event_start);
        item.event_end = formatDateTime(item.event_end);
    });

    return rows;
};
export const countCombineCategoriesAndLocalitiesFollowedEvent = async (SQLClient, { locality, categories, search, user_id }) => {
    const filters = [];
    const values = [];

    // Vérification de la localité
    if (locality) {
        const localityPlaceholder = `$${values.length + 1}`;
        filters.push(`l.label ILIKE ${localityPlaceholder}`);
        values.push(`%${locality}%`);
    }

    // Vérification des catégories
    if (categories && categories.length > 0) {
        const categoriesPlaceholders = categories.map((_, index) => `$${values.length + index + 1}`).join(', ');
        filters.push(`e.category_id IN (${categoriesPlaceholders})`);
        values.push(...categories);
    }

    // Vérification de la recherche
    if (search) {
        const searchPlaceholder = `$${values.length + 1}`;
        filters.push(`(e.title ILIKE ${searchPlaceholder} OR l.label ILIKE ${searchPlaceholder} OR c.title ILIKE ${searchPlaceholder})`);
        values.push(`%${search}%`);
    }

    if (user_id) {
        const userPlaceholder = `$${values.length + 1}`;
        filters.push(`le.user_id = ${userPlaceholder}`);
        values.push(user_id);
    }

    const whereClause = filters.length > 0 ? `WHERE e.is_private = false AND ${filters.join(' AND ')}` : '';

    const query = `
        SELECT
            COUNT(*) AS total
        FROM event e
        INNER JOIN location l ON e.location_id = l.id
        INNER JOIN category c ON e.category_id = c.id
        INNER JOIN linkuserevent le ON e.id = le.event_id
        ${whereClause};
    `;

    const { rows } = await SQLClient.query(query, values);

    return rows[0].total;
};
