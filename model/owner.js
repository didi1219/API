export const readOwner = async (SQLClient, {id}) => {
    const {rows} = await SQLClient.query('SELECT * FROM owner WHERE id = $1', [id]);
    return rows[0];
};

export const createOwner = async (SQLClient, {email, password, lastName, firstName, userName, bio}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO owner (email, password, last_name, first_name, user_name, bio) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
        [email, password, lastName, firstName, userName, bio]);
    return rows[0]?.id;
};

export const deleteOwner = async (SQLClient, {id}) => {
    return await SQLClient.query('DELETE FROM owner WHERE id = $1', [id]);
};

export const updateOwner = async(SQLClient, {email, password, lastName, firstName, userName, bio, id}) => {
    let query = 'UPDATE owner SET ';
    const querySet = [];
    const queryValues = [];
    if(email){
        queryValues.push(email);
        querySet.push(`email = $${queryValues.length}`);
    }
    if(password){
        queryValues.push(password);
        querySet.push(`password = $${queryValues.length}`);
    }
    if(lastName){
        queryValues.push(lastName);
        querySet.push(`last_name = $${queryValues.length}`);
    }
    if(firstName){
        queryValues.push(firstName);
        querySet.push(`first_name = $${queryValues.length}`);
    }
    if(userName){
        queryValues.push(userName);
        querySet.push(`user_name = $${queryValues.length}`);
    }
    if(bio){
        queryValues.push(bio);
        querySet.push(`bio = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query, queryValues);
    } else {
        throw new Error('No field given');
    }
};