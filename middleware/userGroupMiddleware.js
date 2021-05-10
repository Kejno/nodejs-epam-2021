import { cyan } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import { bodySchemaForCreate, bodySchemaForUpdate } from '../schemas/userGroupSchema';
import ApiError from '../error/ApiError';


const createUserGroupMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
    try {
        await bodySchemaForCreate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const updateUserGroupMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
    try {
        await bodySchemaForUpdate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const getAllUserGroupsMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}`);
    return next();
};

export { createUserGroupMiddleware, updateUserGroupMiddleware, getAllUserGroupsMiddleware };
