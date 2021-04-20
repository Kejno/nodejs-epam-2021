import { bodySchemaForCreate, bodySchemaForUpdate } from '../schemas/groupSchema';
import ApiError from '../error/ApiError';


const createGroupMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForCreate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const updateGroupMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForUpdate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

export { createGroupMiddleware, updateGroupMiddleware };
