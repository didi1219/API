import { pool } from '../database/database.js';

export const isUserInDiscussion = async (userID, discussionID) => {
    try {
        const { rows } = await pool.query(
                `SELECT COUNT(*) > 0 AS hasAccess FROM discussionEvent d 
                INNER JOIN event e ON d.event_id = e.id
                INNER JOIN linkUserEvent lue ON e.id = lue.event_id
                WHERE d.id = $1 AND lue.user_id = $2 AND lue.isaccepted = true `,
            [
                discussionID,
                userID
            ]);

        return rows[0].hasaccess;
    } catch (error) {
        throw error;
    }
};

export const isUserInEvent = async (userID, eventID) => {
    try {
        const { rows } = await pool.query(
            `SELECT COUNT(*) > 0 AS hasAccess FROM event e
            INNER JOIN linkUserEvent lue ON e.id = lue.event_id
            WHERE e.id = $1 AND lue.user_id = $2 AND lue.isaccepted = true;` ,
            [
                eventID,
                userID
            ]);

        return rows[0].hasaccess;
    } catch (error) {
        throw error;
    }
};

export const hasUserWriteRights = async (userID, discussionID) => {
    try {
        const { rows } = await pool.query(
            `SELECT COUNT(*) > 0 AS hasAccess FROM discussionEvent d
                INNER JOIN event e ON d.event_id = e.id
                INNER JOIN linkUserEvent lue ON lue.event_id = e.id
                WHERE d.id = $1 AND lue.user_id = $2 AND lue.isAccepted = true AND (d.isWritable = true OR e.user_id = $2);`,
            [
                discussionID,
                userID
            ]);

        return rows[0].hasaccess;
    } catch (error) {
        throw error;
    }
}
