import { pool } from '../database/database.js';

export const isUserInDiscussion = async (userID, discussionID) => {
    try {
        const { rows } = await pool.query(
                `SELECT COUNT(*) > 0 AS hasAccess FROM discussionEvent d 
                INNER JOIN event e ON d.event_id = e.id
                INNER JOIN linkUserEvent lue ON e.id = lue.event_id
                WHERE d.id = $1 AND lue.user_id = $2 AND lue.is_accepted = true `,
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
            `SELECT COUNT(*) > 0 AS hasAccess
             FROM event e
                      LEFT JOIN linkUserEvent lue ON e.id = lue.event_id AND lue.user_id = $1 AND lue.is_accepted = true
             WHERE e.id = $2 AND (e.user_id = $1 OR lue.user_id IS NOT NULL);`,
            [
                userID,
                eventID
            ]
        );

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
                WHERE d.id = $1 AND lue.user_id = $2 AND lue.is_accepted = true AND (d.is_writable = true OR e.user_id = $2);`,
            [
                discussionID,
                userID
            ]);

        return rows[0].hasaccess;
    } catch (error) {
        throw error;
    }
}
