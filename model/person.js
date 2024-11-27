import {compare} from '../util/index.js'
import {readUserByEmail, readAdmin} from "./user.js";


export const readPerson = async (SQLClient, {email,password}) => {
    const responses = await Promise.all([
        readAdmin(SQLClient,{email}),
        readUserByEmail(SQLClient, {email})
    ]);


    if(responses[0]){
        return await compare(password, responses[0].password) ?
            {id: responses[0].id, status: 'admin'} :
            {id: null, status: null};
    } else if (responses[1]){
        return await compare(password, responses[1].password) ?
            {id: responses[1].id, status: 'user'}:
            {id: null, status: null};
    } else {
        return {id: null, status: null};
    }
};