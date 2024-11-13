export const createCategory = async (SQLClient, {title}) => {
    const {rows} = await SQLClient.query(
        'INSERT INTO category (title) VALUES ($1) RETURNING id',
        [title]
    );
    return rows[0]?.id;
}

export const readCategory = async (SQLClient, {id}) => {
  const {rows} = await SQLClient.query(
      'SELECT * FROM category WHERE id = $1', [id]
  );
  return rows[0];
};

export const updateCategory = async (SQLClient, {id,title}) => {
    let query = 'UPDATE category SET ';
    const querySet = [];
    const queryValues = [];
    if (title){
        queryValues.push(title);
        querySet.push(`title = $${queryValues.length}`);
    }
    if(queryValues.length > 0){
        queryValues.push(id);
        query += `${querySet.join(', ')} WHERE id = $${queryValues.length}`;
        return await SQLClient.query(query,queryValues);
    } else {
        throw new Error('No field given');
    }
};

export const deleteCategory = async (SQLClient, {id}) => {
  return await SQLClient.query('DELETE FROM category WHERE id = $1',[id]);
};