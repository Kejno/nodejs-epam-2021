import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError';
import { FORBIDDEN_STATUS, UNAUTHORIZED_STATUS } from '../constants';

export const checkToken = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET);

            return next();
        } catch (error) {
            res.status(FORBIDDEN_STATUS).json(ApiError.forbidden('Not authorized, token failed'));
        }
    }

    if (!token) {
        res.status(UNAUTHORIZED_STATUS).json(ApiError.unauthorized('Not authorized, no token'));
    }
};

