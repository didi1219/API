import * as searchModel from "../model/search.js";
import { pool } from "../database/database.js";
import {logger} from '../middleware/logger.js';
import {countCombineCategoriesAndLocalitiesOwnEvent} from "../model/search.js";

export const searchEventByName = async (req, res) => {
    logger.info(`Entering searchEventByName with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.readEventByName(pool, req.val);
        if (response) {
            logger.info(`Event found by name: ${JSON.stringify(response)}`);
            res.json({ response });
        } else {
            logger.warn('Event not found by name');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error searching event by name: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const searchEvent = async (req, res) => {
    logger.info(`Entering searchEvent with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.readEventGeneric(pool, req.val);
        if (response) {
            logger.info(`Event found: ${JSON.stringify(response)}`);
            res.json({ response });
        } else {
            logger.warn('Event not found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error searching event: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getPublicEvents = async (req, res) => {
    logger.info(`Entering getPublicEvents with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.readPublicEvents(pool, req.val);
        if (response) {
            logger.info(`Public events found: ${JSON.stringify(response)}`);
            res.json({ response });
        } else {
            logger.warn('No public events found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching public events: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countNbRowPublicEvent = async (req, res) => {
    logger.info(`Entering countNbRowPublicEvent with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.nbRowsreadPublicEvents(pool);
        if (response) {
            logger.info(`Number of public event rows: ${response}`);
            res.json(response);
        } else {
            logger.warn('No rows found for public events');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error counting rows for public events: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getTotalRowEventGenericSearched = async (req, res) => {
    logger.info(`Entering getTotalRowEventGenericSearched with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.readTotalRowEventGenericSearched(pool, req.val);
        logger.info(`Total rows for event search: ${JSON.stringify(response)}`);
        res.json({ response });
    } catch (error) {
        logger.error(`Error fetching total rows for event search: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getEventCategories = async (req, res) => {
    logger.info(`Entering getEventCategories with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.readEventByCategories(pool, req.val);
        if (response) {
            logger.info(`Event categories found: ${JSON.stringify(response)}`);
            res.json({ response });
        } else {
            logger.warn('No event categories found');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching event categories: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getEventByLoc = async (req, res) => {
    logger.info(`Entering getEventByLoc with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.readEventByLocalities(pool, req.val);
        if (response) {
            logger.info(`Events found by locality: ${JSON.stringify(response)}`);
            res.json({ response });
        } else {
            logger.warn('No events found by locality');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching events by locality: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbEventByOwner = async (req, res) => {
    logger.info(`Entering getNbEventByOwner with params: ${JSON.stringify(req.session.id)}`);
    try {
        const nbRows = await searchModel.readNbEventOwner(pool, { id: req.session.id });
        if (nbRows) {
            logger.info(`Number of events by owner: ${nbRows}`);
            res.json({ nbRows });
        } else {
            logger.warn('No events found by owner');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching number of events by owner: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbRowsSearchByCategories = async (req, res) => {
    logger.info(`Entering getNbRowsSearchByCategories with params: ${JSON.stringify(req.val)}`);
    try {
        const nbRows = await searchModel.readNbRowsSearchByCategories(pool, req.val);
        if (nbRows) {
            logger.info(`Number of rows for search by categories: ${nbRows}`);
            res.json({ nbRows });
        } else {
            logger.warn('No rows found for search by categories');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching rows for search by categories: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getNbRowsSearchByLocalities = async (req, res) => {
    logger.info(`Entering getNbRowsSearchByLocalities with params: ${JSON.stringify(req.val)}`);
    try {
        const nbRows = await searchModel.readNbRowsSearchByLocalities(pool, req.val);
        if (nbRows) {
            logger.info(`Number of rows for search by localities: ${nbRows}`);
            res.json({ nbRows });
        } else {
            logger.warn('No rows found for search by localities');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching rows for search by localities: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getEventSearchFollowByCurrentUser = async (req, res) => {
    logger.info(`Entering getEventSearchFollowByCurrentUser with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const response = await searchModel.readEventGenericByUser(pool, req.val);
        if (response) {
            logger.info(`Event search by current user: ${JSON.stringify(response)}`);
            res.status(200).json({ response });
        } else {
            logger.warn('No events found for current user');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching event search by current user: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getEventSeachByOwner = async (req, res) => {
    logger.info(`Entering getEventSeachByOwner with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const response = await searchModel.readEventGenericByUser(pool, req.val);
        if (response) {
            logger.info(`Event search by owner: ${JSON.stringify(response)}`);
            res.status(200).json({ response });
        } else {
            logger.warn('No events found for owner');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error fetching event search by owner: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRowsEventGenericByOwner = async (req, res) => {
    logger.info(`Entering countRowsEventGenericByOwner with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const nbRows = await searchModel.nbRowsEventGenericByOwner(pool, req.val);
        logger.info(`Number of rows for event search by owner: ${nbRows}`);
        res.status(200).send({ nbRows });
    } catch (error) {
        logger.error(`Error counting rows for event search by owner: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRowsEventGenericByFollow = async (req, res) => {
    logger.info(`Entering countRowsEventGenericByFollow with params: ${JSON.stringify(req.val)}`);
    try {
        req.val.user_id = req.session.id;
        const nbRows = await searchModel.nbRowsEventGenericByFollow(pool, req.val);
        logger.info(`Number of rows for event search by follow: ${nbRows}`);
        res.status(200).send(nbRows);
    } catch (error) {
        logger.error(`Error counting rows for event search by follow: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getCombineSearchPublic = async (req, res) => {
    logger.info(`Entering getCombineSearchPublic with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.searchCombinePublicEvent(pool, req.val);
        if (response) {
            logger.info(`Combined public search results: ${JSON.stringify(response)}`);
            res.status(200).json(response);
        } else {
            logger.warn('No results for combined public search');
            res.sendStatus(404);
        }
    } catch (error) {
        logger.error(`Error performing combined public search: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const countRowsGetCombineSearchPublic = async (req, res) => {
    logger.info(`Entering countRowsGetCombineSearchPublic with params: ${JSON.stringify(req.val)}`);
    try {
        const response = await searchModel.nbRowsSearchCombinePublicEvent(pool, req.val);
        logger.info(`Number of rows for combined public search: ${JSON.stringify(response)}`);
        res.status(200).json(response);
    } catch (error) {
        logger.error(`Error counting rows for combined public search: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getSearchCombineCategoriesAndLocalities = async (req, res) => {
    logger.info(`Entering getSearchCombineCategoriesAndLocalities with params: ${JSON.stringify(req.val)}`);
    try {
        const events = await searchModel.searchCombineCategoriesAndLocalities(pool, req.val);
        const nbRows = await searchModel.nbRowsSearchCombineCategoriesAndLocalities(pool, req.val);
        logger.info(`Combined search results by categories and localities: ${JSON.stringify(events)}`);
        res.status(200).json({ events, nbRows });
    } catch (error) {
        logger.error(`Error performing combined search by categories and localities: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};

export const getSearchCombineCategoriesAndLocalitiesOwnEvent = async (req, res) => {
    logger.info(`Entering getSearchCombineCategoriesAndLocalities with params: ${JSON.stringify(req.val)}`);
    try {
        req.query.user_id = req.session.id;
        const events = await searchModel.searchCombineCategoriesAndLocalitiesOwnEvent(pool, req.query);
        const nbRows = await searchModel.countCombineCategoriesAndLocalitiesOwnEvent(pool, req.query);
        logger.info(`Combined search results by categories and localities: ${JSON.stringify(events)}`);
        res.status(200).json({ events, nbRows });
    } catch (error) {
        logger.error(`Error performing combined search by categories and localities: ${JSON.stringify(error.message, null, 2)}`);
        console.log(error)
        res.sendStatus(500);
    }
};

export const getSearchCombineCategoriesAndLocalitiesByFollow = async (req, res) => {
    logger.info(`Entering getSearchCombineCategoriesAndLocalities with params: ${JSON.stringify(req.val)}`);
    try {

        const user_id = req.session.id;
        const events = await searchModel.searchCombineCategoriesAndLocalitiesFollowedEvent(pool, user_id);
        const nbRows = await searchModel.countCombineCategoriesAndLocalitiesFollowedEvent(pool, req.val);
        logger.info(`Combined search results by categories and localities: ${JSON.stringify(events)}`);
        res.status(200).json({ events, nbRows });
    } catch (error) {
        logger.error(`Error performing combined search by categories and localities: ${JSON.stringify(error.message, null, 2)}`);
        res.sendStatus(500);
    }
};


