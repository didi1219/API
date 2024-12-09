import { pool } from '../database/database.js';

export const isUserInDiscussion = async (userID, discussionID) => {
    try {
        const query = `
            SELECT 
                COUNT(*) > 0 AS hasAccess
            FROM 
                discussionEvent d
            INNER JOIN 
                event e ON d.event_id = e.id
            INNER JOIN 
                linkUserEvent lue ON e.id = lue.event_id
            WHERE 
                d.id = $1
                AND lue.user_id = $2
                AND lue.isaccepted = true;
        `;

        const { rows } = await pool.query(query, [discussionID, userID]);

        return rows[0].hasaccess;
    } catch (error) {
        console.error('Error checking user access to discussion:', error);
        throw error;
    }
};

export const isUserInEvent = async (userID, eventID) => {
    try {
        const query = `
            SELECT 
                COUNT(*) > 0 AS hasAccess
            FROM 
                event e
            INNER JOIN 
                linkUserEvent lue ON e.id = lue.event_id
            WHERE 
                e.id = $1
                AND lue.user_id = $2
                AND lue.isaccepted = true;
        `;

        const { rows } = await pool.query(query, [eventID, userID]);

        return rows[0].hasaccess;
    } catch (error) {
        console.error('Error checking user access to event:', error);
        throw error;
    }
};

export const hasUserWriteRights = async (userID, discussionID) => {
    console.log('hasUserWriteRights', userID, discussionID);
    try {
        const query = `
            SELECT
                COUNT(*) > 0 AS hasAccess
            FROM
                discussionEvent d
                INNER JOIN
                event e ON d.event_id = e.id
                INNER JOIN
                linkUserEvent lue ON lue.event_id = e.id
            WHERE
                d.id = $1
              AND lue.user_id = $2
              AND lue.isAccepted = true
              AND (d.isWritable = true OR e.user_id = $2);
        `;

        const { rows } = await pool.query(query, [discussionID, userID]);

        console.log('rep', rows[0].hasaccess);
        return rows[0].hasaccess;
    } catch (error) {
        console.error('Error checking user write rights to discussion:', error);
        throw error;
    }
}
