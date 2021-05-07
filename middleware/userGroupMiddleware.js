import { bodySchemaForCreate, bodySchemaForUpdate } from '../schemas/userGroupSchema';
import ApiError from '../error/ApiError';


const createUserGroupMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForCreate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const updateUserGroupMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForUpdate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

export { createUserGroupMiddleware, updateUserGroupMiddleware };
