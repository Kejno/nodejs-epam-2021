import { ConsoleLogger } from '../utils/logger';
import { bodySchemaForCreate, bodySchemaForUpdate } from '../schemas/groupSchema';
import ApiError from '../error/ApiError';
import { BAD_REQUEST_STATUS } from '../constants';


const createGroupMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForCreate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(BAD_REQUEST_STATUS).json(ApiError.badRequest(err.details[0].message));
    }
};

const updateGroupMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForUpdate.validateAsync(req.body);
        return next();
    } catch (err) {
        res.status(BAD_REQUEST_STATUS).json(ApiError.badRequest(err.details[0].message));
    }
};

const getGroupByIdMiddleware = async (req, res, next) => {
    try {
        return next();
    } catch (error) {
        ConsoleLogger.error(error);
    }
};

export { createGroupMiddleware, updateGroupMiddleware, getGroupByIdMiddleware };
