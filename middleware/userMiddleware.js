const { querySchema, bodySchemaForCreate, bodySchemaForUpdate } = require('../schemas/userSchema');
const ApiError = require('../error/ApiError');

const getAllUsersMiddleware = async (req, res, next) => {
    try {
        await querySchema.validateAsync(req.query);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const createUserMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForCreate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

const updateUserMiddleware = async (req, res, next) => {
    try {
        await bodySchemaForUpdate.validateAsync(req.body);

        return next();
    } catch (err) {
        res.status(400).json(ApiError.badRequest(err.details[0].message));
    }
};

module.exports = { getAllUsersMiddleware, createUserMiddleware, updateUserMiddleware };
