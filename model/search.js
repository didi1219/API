export const readEventByName = async (SQLClient, {name})=> {
    const nameConcat = `%${name}%`
    const {rows} = await SQLClient.query(
        "SELECT * FROM event WHERE title ILIKE $1",[nameConcat]
    )
    return rows;
};

export const readEventGeneric = async (SQLClient, { page, perPage, search }) => {
    const searchConcat = `%${search}%`;
    const offset = (page - 1) * perPage;


    const { rows } = await SQLClient.query("SELECT e.id, e.title AS EvenTitle, e.description, e.event_date, e.street_number,  l.label AS locality, c.title AS categorytitle FROM event e INNER JOIN location l ON e.location_id = l.id INNER JOIN category c ON e.category_id = c.id WHERE e.title ILIKE $1 OR l.label ILIKE $1 OR c.title ILIKE $1 ORDER BY e.id ASC LIMIT $2 OFFSET $3", [searchConcat, perPage, offset]);
    return rows;
};

export const readEventByCategories = async (SQLClient, {categoriesIds, page , perPage})=> {
    const offset = (page - 1) * perPage;
    const sqlCategories = categoriesIds.map((_, index) => `$${index + 1}`).join(', ');
    const {rows} = await SQLClient.query(
        `SELECT * FROM event WHERE category_id IN (${sqlCategories}) ORDER BY id LIMIT $${categoriesIds.length + 1} OFFSET $${categoriesIds.length + 2}`, [...categoriesIds, perPage, offset]
    )
    return rows;
};

export const readEventByLocalities = async (SQLClient, {localitiesId, page, perPage})=>{
    const offset = (page - 1) * perPage;
    console.log(localitiesId)
    const idLocalities = localitiesId.map((_, index) => `$${index + 1}`).join(', ');
    const {rows} = await SQLClient.query(
        `SELECT * FROM event WHERE location_id IN (${idLocalities}) ORDER BY id LIMIT $${localitiesId.length+1} OFFSET $${localitiesId.length+2}`, [...localitiesId,perPage, offset]
    )
    return rows;
};

export const readAllEvents = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT * FROM event ORDER BY id"
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

export const readEventByOwner = async(SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        "SELECT * FROM event WHERE user_id = $1", [id]
    )
    return rows;
};

export const readNbEventOwner = async(SQLClient, {id}) =>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) FROM event WHERE user_id = $1", [id]
    )
    return rows[0];
};

export const readNbEventUser = async(SQLClient, {id})=>{
    const {rows} = await SQLClient.query(
        "SELECT COUNT(*) FROM linkuserevent WHERE user_id = $1 AND isAccepted",[id]
    )
    return rows[0];
};