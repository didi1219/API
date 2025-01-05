import {pool} from '../database/database.js';
import {logger} from "../middleware/logger.js";
import * as linkUserEventModel from '../model/linkUserEvent.js';
import {createInvitation, searchIdLinkUserEvents, searchLinkUserEventPaging} from "../model/linkUserEvent.js";

export const getLinkUserEvent = async (req, res) => {
    logger.info(`Entering getLinkUserEvent with params: ${JSON.stringify(req.val)}`);
    try {
        const linkUserEvent = await linkUserEventModel.readLinkUserEvent(pool, req.val);
        if (linkUserEvent) {
            logger.info(`LinkUserEvent found: ${JSON.stringify(linkUserEvent)}`);
            res.json(linkUserEvent);
        } else {
            logger.warn('LinkUserEvent not found');
            res.sendStatus(404);
        }
    } catch (err) {
        logger.error(`Error fetching LinkUserEvent: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const addLinkUserEvent = async (req, res) => {
    logger.info(`Entering addLinkUserEvent with params: ${JSON.stringify(req.val)}`);
    try {
        const linkUserEventExists = await linkUserEventModel.linkUserEventExists(pool, { user_id: req.val.user_id, event_id: req.val.event_id });
        if (!linkUserEventExists) {
            await linkUserEventModel.createLinkUserEvent(pool, req.val);
            logger.info(`LinkUserEvent created for user ${req.val.user_id} and event ${req.val.event_id}`);
            res.sendStatus(201);
        } else {
            logger.warn('LinkUserEvent already exists');
            res.status(409).send('LinkUserEvent already exists');
        }
    } catch (err) {
        logger.error(`Error adding LinkUserEvent: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteLinkUserEvent = async (req, res) => {
    logger.info(`Entering deleteLinkUserEvent with params: ${JSON.stringify(req.val)}`);
    try {
        await linkUserEventModel.deleteLinkUserEvent(pool, req.val);
        logger.info(`LinkUserEvent deleted for user ${req.val.user_id} and event ${req.val.event_id}`);
        res.sendStatus(204);
    } catch (err) {
        logger.error(`Error deleting LinkUserEvent: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const updateLinkUserEvent = async (req, res) => {
    logger.info(`Entering updateLinkUserEvent with params: ${JSON.stringify(req.val)}`);
    try {
        await linkUserEventModel.updateLinkUserEvent(pool, req.val);
        logger.info(`LinkUserEvent updated for user ${req.val.user_id} and event ${req.val.event_id}`);
        res.sendStatus(204);
    } catch (err) {
        logger.error(`Error updating LinkUserEvent: ${JSON.stringify(err.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbLinkUserEvents = async (req, res) => {
    logger.info(`Entering getNbLinkUserEvents with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await linkUserEventModel.readNbLinkUserEvents(pool, req.val);
        if (response) {
            logger.info(`Number of LinkUserEvents: ${response}`);
            res.json(response);
        } else {
            logger.warn('No LinkUserEvents found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching number of LinkUserEvents: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRows = async (req, res) => {
    logger.info(`Entering countRows with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await linkUserEventModel.readTotalRowLinkUserEvents(pool);
        if (response) {
            logger.info(`Total rows of LinkUserEvents: ${response}`);
            res.json(response);
        } else {
            logger.warn('No LinkUserEvents rows found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error counting rows: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const deleteLinkUserEvents = async (req, res) => {
    logger.info(`Entering deleteLinkUserEvents with params: ${JSON.stringify(req.val)}`);
    try {
        await linkUserEventModel.deleteManyLinkUserEvents(pool, req.val);
        logger.info(`Multiple LinkUserEvents deleted for user ${req.val.user_id}`);
        res.sendStatus(200);
    } catch (error) {
        logger.error(`Error deleting multiple LinkUserEvents: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getInvitationNotAcceptedByCurrentId = async (req, res) => {
    logger.info(`Entering getInvitationNotAcceptedByCurrentId with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const invitation = await linkUserEventModel.readInvitationNotAcceptedByCurrentId(pool, req.val);
        const nbRows = await linkUserEventModel.nbRowsInvitationNotAcceptedByCurrentId(pool, req.val);
        if (!invitation) {
            logger.warn('No invitation found');
            res.sendStatus(404);
        } else {
            logger.info(`Invitation not accepted found: ${JSON.stringify(invitation)}`);
            res.status(200).send({ invitation, nbRows });
        }
    } catch (error) {
        logger.error(`Error fetching invitation: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const searchLinkUserEvents = async (req, res) => {
    logger.info(`Entering searchLinkUserEvent with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const response = await linkUserEventModel.searchLinkUserEventPaging(pool,req.val);
        if(response){
            res.json(response);
        } else {
            res.sendStatus(404);
        }
    } catch (error){
        res.sendStatus(500);
    }
}


export const acceptInvitation = async (req, res) => {
    logger.info(`Entering acceptInvitation with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await linkUserEventModel.searchIdLinkUserEvents(pool, {user_id: req.session.id, event_id: req.val.event_id});
        await linkUserEventModel.updateLinkUserEvent(pool, { id: response.id, is_waiting: false, is_accepted: true });
        logger.info(`Invitation accepted for user ${req.val.user_id}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error accepting invitation: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const declineInvitation = async (req, res) => {
    logger.info(`Entering declineInvitation with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await linkUserEventModel.searchIdLinkUserEvents(pool, {user_id: req.session.id, event_id: req.val.event_id});
        await linkUserEventModel.deleteLinkUserEvent(pool, { id: response.id });
        logger.info(`Invitation declined for user ${req.val.user_id}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error declining invitation: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const isFavorite = async (req, res) => {
    logger.info(`Entering isFavorite with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        await linkUserEventModel.isFavoritePatch(pool, req.val);
        logger.info(`Favorite status updated for user ${req.val.user_id}`);
        res.sendStatus(204);
    } catch (error) {
        logger.error(`Error updating favorite status: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getFavoriteEvent = async (req, res) => {
    logger.info(`Entering getFavoriteEvent with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const response = await linkUserEventModel.readFavoriteEvent(pool, req.val);
        if (response) {
            logger.info(`Favorite event found: ${JSON.stringify(response)}`);
            res.status(200).json(response);
        } else {
            logger.warn('No favorite event found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching favorite event: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const followAEvent = async (req, res) => {
    logger.info(`Entering followAEvent with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const linkUserEventExists = await linkUserEventModel.linkUserEventExists(pool, { user_id: req.val.user_id, event_id: req.val.event_id });
        if (!linkUserEventExists) {
            await linkUserEventModel.subscribeAnEvent(pool, req.val);
            logger.info(`User ${req.val.user_id} followed event ${req.val.event_id}`);
            res.sendStatus(201);
        } else {
            logger.warn('LinkUserEvent already exists');
            res.status(409).send('LinkUserEvent already exists');
        }
    } catch (error) {
        logger.error(`Error following event: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const unFollowAnEvent = async (req, res) => {
    logger.info(`Entering unFollowAnEvent with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        await linkUserEventModel.unFollowAnEvent(pool, req.val);
        logger.info(`User ${req.val.user_id} unfollowed event ${req.val.event_id}`);
        res.sendStatus(200);
    } catch (error) {
        logger.error(`Error unfollowing event: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const linkUserEventAccepted = async (req, res) => {
    logger.info(`Entering linkUserEventAccepted with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const response = await linkUserEventModel.linkUserEventAccepted(pool, req.val);
        if (response) {
            logger.info(`LinkUserEvent accepted found: ${JSON.stringify(response)}`);
            res.json(response);
        } else {
            logger.warn('LinkUserEvent not accepted found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching accepted LinkUserEvent: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbLinkUserEventByCurrentUser = async (req, res) => {
    try {
        const user_id = req.session.id;
        logger.info(`Fetching number of link user events for user with ID: ${user_id}`);
        const response = await linkUserEventModel.getNbLinkUserEventByUser(pool, { user_id });
        if (response) {
            logger.info(`Successfully fetched link user events for user with ID: ${user_id}`);
            res.status(200).json({ response });
        } else {
            logger.warn(`No link user events found for user with ID: ${user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching link user events for user with ID: ${user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getRatioFavoriteEvent = async (req, res) => {
    try {
        logger.info(`Fetching favorite event ratio for user with ID: ${req.val.user_id}`);
        const response = await linkUserEventModel.ratioFavorite(pool, req.val);
        if (typeof response !== 'undefined') {
            logger.info(`Successfully fetched favorite event ratio for user with ID: ${req.val.user_id}`);
            res.status(200).json({ response });
        } else {
            logger.warn(`No favorite event ratio found for user with ID: ${req.val.user_id}`);
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching favorite event ratio for user with ID: ${req.val.user_id}: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};


export const createInvitations = async (req, res) => {
    try {
        await linkUserEventModel.createInvitation(pool,{ids:req.body.ids, event_id:req.body.event_id});
        res.sendStatus(201);
    } catch(error) {
        res.sendStatus(500);
    }
}

export const checkLinkUserEvent = async (req, res) => {
    try {
        const response = await linkUserEventModel.checkIfLinkUserEventExists(pool, req.body);
        if(response){
            res.status(200).json({ response });
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(500);
    }
}