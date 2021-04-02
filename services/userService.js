import User from '../models/User';
import ApiError from '../error/ApiError';
import { formatForCreate } from '../formatters/userFormatter';

export const createUserToDb = async ({ login, password, age }) => {
    try {
        const candidate = await User.findOne({ where: { login } });

        if (candidate) {
            return { errorCode: 409, message: 'login should be unique' };
        }

        const formatedUser = formatForCreate({ login, password, age });
        const createdUser = await User.create(formatedUser);

        return createdUser;
    } catch (error) {
        return ApiError.badRequest(error.details[0].message);
    }
};
