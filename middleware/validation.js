import * as adminValidator from './validator/admin.js';
import * as categoryValidator from './validator/category.js';
import * as discussionEventValidator from './validator/discussionEvent.js';
import * as eventValidator from './validator/event.js';
import * as eventManagementValidator from './validator/eventManagement.js';
import * as linkUserEventValidator from './validator/linkUserEvent.js';
import * as locationValidator from './validator/location.js';
import * as messageValidator from './validator/message.js';
import * as notificationValidator from './validator/notification.js';
import * as userValidator from './validator/user.js';

export const adminValidatorMiddleware = {
    searchedUser : async (req, res, next) => {
        try {
            req.val = await adminValidator.searchedUser.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    addUser : async (req, res, next) => {
        try {
            req.val = await adminValidator.userToAdd.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            req.val = await adminValidator.userToUpdate.validate(req.body);
            next();
        }catch (error){
            res.status(400).send(error.messages);
        }
    },
    userToDelete:  async (req, res, next) => {
        try {
            req.val = await adminValidator.userToDelete.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    adminToLogin: async (req, res, next) => {
        try {
            req.val = await adminValidator.adminToLogin.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const categoryValidatorMiddleware = {
    searchedCategory: async (req, res, next) => {
        try {
            req.val = await categoryValidator.searchedCategory.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    categoryToAdd: async (req, res, next) => {
        try {
            req.val = await categoryValidator.categoryToAdd.validate(req.body);
            next();
        } catch(error){
            res.status(400).send(error.messages);
        }
    },
    categoryToUpdate: async (req, res, next) => {
        try {
            req.val = await categoryValidator.categoryToUpdate.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    categoryToDelete: async (req, res, next) => {
        try {
            req.val = await categoryValidator.categoryToDelete.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const discussionEventValidatorMiddleware = {
    searchedDiscussionEvent : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.searchedDiscussionEvent.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    discussionEventToAdd : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.discussionEventToAdd.validate(req.body);
            next();
        } catch (error){
            res.status(400).send(error.messages);
        }
    },
    discussionEventToUpdate : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.discussionEventToUpdate.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    discussionEventToDelete : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.discussionEventToDelete.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    listDiscussions : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.listDiscussionEvents.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    discussionEventToListMessages : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.discussionEventToListMessages.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    discussionEventToListNewerMessages : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.discussionEventToListNewerMessages.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    discussionEventToListOlderMessages : async (req, res, next) => {
        try {
            req.val = await discussionEventValidator.discussionEventToListOlderMessages.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const eventValidatorMiddleware = {
    eventToAdd : async (req, res, next) => {
        try {
            req.val = await eventValidator.eventToAdd.validate(req.body);
            next();
        } catch (error){
            res.status(400).send(error.messages);
        }
    },
    eventToUpdate : async (req, res, next) => {
        try {
            req.val = await eventValidator.eventToUpdate.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    eventToListDiscussions : async (req, res, next) => {
        try {
            req.val = await eventValidator.eventToListDiscussion.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const eventManagementValidatorMiddleware = {
    searchedEvent : async (req, res, next) => {
        try {
            req.val = await eventManagementValidator.searchedEvent.validate(req.params);
            next();
        } catch(error){
            res.status(400).send(error.messages);
        }
    },
    eventToAdd : async (req, res, next) => {
        try {
            req.val = await eventManagementValidator.eventToAdd.validate(req.body);
            next();
        } catch (error){
            res.status(400).send(error.messages);
        }
    },
    eventToUpdate : async (req, res, next) => {
        try {
            req.val = await eventManagementValidator.eventToUpdate.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    eventToDelete : async (req, res, next) => {
        try {
            req.val = await eventManagementValidator.eventToDelete.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const linkUserEventValidatorMiddleware = {
    searchedLinkUserEvent : async (req, res, next) => {
        try {
            req.val = await linkUserEventValidator.searchedLinkUserEvent.validate(req.query);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    linkUserEventToAdd : async (req, res, next) => {
        try {
            req.val = await linkUserEventValidator.linkUserEventToAdd.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    linkUserEventToUpdate : async (req, res, next) => {
        try {
            req.val = await linkUserEventValidator.linkUserEventToUpdate.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    linkUserEventToDelete : async (req, res, next) => {
        try {
            req.val = await linkUserEventValidator.linkUserEventToDelete.validate (req.query);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const locationValidatorMiddleware = {
    searchedLocation : async (req, res, next) => {
        try {
            req.val = await locationValidator.searchedLocation.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    locationToAdd : async (req, res, next) => {
        try {
            req.val = await locationValidator.locationToAdd.validate(req.body);
            next();
        } catch (error){
            res.status(400).send(error.messages);
        }
    },
    locationToUpdate : async (req, res, next) => {
        try {
            req.val = await locationValidator.locationToUpdate.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    locationToDelete : async (req, res, next) => {
        try {
            req.val = await locationValidator.locationToDelete.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const messageValidatorMiddleware = {
    searchedMessage : async(req, res, next) => {
        try {
            req.val = await messageValidator.searchedMessage.validate(req.params);
            next();
        } catch (error){
            res.status(400).send(error.messages);
        }
    },
    messageToAdd : async(req, res, next) => {
        try {
            req.val = await messageValidator.messageToAdd.validate(req.body);
            next();
        } catch(error){
            res.status(400).send(error.messages);
        }
    },
    messageToUpdate : async (req, res, next) => {
        try {
            req.val = await messageValidator.messageToUpdate.validate(req.body);
            next();
        } catch(error){
            res.status(400).send(error.messages);
        }
    },
    messageToDelete : async (req, res, next)=> {
        try {
            req.val = await messageValidator.messageToDelete.validate(req.params);
            next();
        } catch(error){
            res.status(400).send(error.messages);
        }
    },
    listMessages : async (req, res, next) => {
        try {
            req.val = await messageValidator.listMessages.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const notificationValidatorMiddleware = {
    searchedNotification: async (req, res, next) => {
        try {
            req.val = await notificationValidator.searchedNotification.validate(req.params);
            next();
        } catch (error){
            res.status(400).send(error.messages);
        }
    },
    notificationToAdd : async (req, res, next) => {
        try {
            req.val = await notificationValidator.notificationToAdd.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    notificationToUpdate : async (req, res, next) => {
        try {
            req.val = await notificationValidator.notificationToUpdate.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    notificationToDelete : async (req, res, next) => {
        try {
            req.val = await notificationValidator.notificationToDelete.validate(req.params);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};

export const userValidatorMiddleware = {
    login: async (req, res, next) => {
        try {
            req.val = await userValidator.login.validate(req.body);
            next();
        } catch (error){
            res.status(400).send(error.messages);
        }
    },
    user: async (req, res, next) => {
        try {
            req.val = await userValidator.user.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    },
    update: async (req, res, next) => {
        try {
            req.val = await userValidator.update.validate(req.body);
            next();
        } catch (error) {
            res.status(400).send(error.messages);
        }
    }
};