import { cyan } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import { bodySchemaForCreate, bodySchemaForUpdate } from '../schemas/groupSchema';
import ApiError from '../error/ApiError';
import { BAD_REQUEST_STATUS } from '../constants';


const createGroupMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}`);
    try {
        await bodySchemaForCreate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(BAD_REQUEST_STATUS).json(ApiError.badRequest(err.details[0].message));
    }
};

const updateGroupMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}`);
    try {
        await bodySchemaForUpdate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(BAD_REQUEST_STATUS).json(ApiError.badRequest(err.details[0].message));
    }
};

const getAllGroupsMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}`);
    return next();
};

const getGroupByIdMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.params)}`);
    return next();
};

const deleteGroupMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.params)}`);
    return next();
};

export { createGroupMiddleware, updateGroupMiddleware, getAllGroupsMiddleware, getGroupByIdMiddleware, deleteGroupMiddleware };
