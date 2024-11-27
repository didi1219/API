export const readEventByName = async (SQLClient, {name})=> {
    const nameConcat = `%${name}%`
    const {rows} = await SQLClient.query(
        "SELECT * FROM event WHERE title ILIKE $1",[nameConcat]
    )
    return rows;
};

export const readEventGeneric = async (SQLClient,{search})=>{
    const searchConcat = `%${search}%`;
    const {rows} = await SQLClient.query(
        "SELECT e.id, e.title as EvenTitle, e.description, e.event_date, e.street_number, l.label as locality, c.title as categorytitle FROM event e INNER JOIN location l on e.location_id = l.id INNER JOIN category c on e.category_id = c.id WHERE (e.title ILIKE $1 OR label ILIKE $1 OR c.title ILIKE $1)",[searchConcat]
    )
    return rows;
};

export const readEventByCategories = async (SQLClient, categoryId)=> {
    const sqlCategories = categoryId.map((_, index) => `$${index + 1}`).join(', ');
    const {rows} = await SQLClient.query(
        `SELECT * FROM event WHERE category_id IN (${sqlCategories})`, categoryId
    )
    return rows;
};

export const readEventByLocalities = async (SQLClient, localitiesID)=>{
    const idCategories = localitiesID.map((_, index) => `$${index + 1}`).join(', ');
    const {rows} = await SQLClient.query(
        `SELECT * FROM event WHERE location_id IN (${idCategories})`, localitiesID
    )
    return rows;
};

export const readAllEvents = async (SQLClient)=>{
    const {rows} = await SQLClient.query(
        "SELECT * FROM event"
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