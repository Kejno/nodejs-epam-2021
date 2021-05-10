import { cyan } from 'colors';
import { ConsoleLogger } from '../utils/logger';
import { querySchema, bodySchemaForCreate, bodySchemaForUpdate } from '../schemas/userSchema';
import ApiError from '../error/ApiError';

const getAllUsersMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.query)}`);
    try {
        await querySchema.validateAsync(req.query);
        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const getUserByIdMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.params)}`);
    try {
        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const createUserMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
    try {
        await bodySchemaForCreate.validateAsync(req.body);
        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const updateUserMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
    try {
        await bodySchemaForUpdate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const deleteUserMiddleware = async (req, res, next) => {
    ConsoleLogger.info(`${cyan('Request')}: ${req.method} ${req.url}, ${cyan('Query')}: ${JSON.stringify(req.body)}`);
    return next();
};

export { getAllUsersMiddleware, getUserByIdMiddleware, createUserMiddleware, updateUserMiddleware, deleteUserMiddleware };
