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

export const getAllUsers = async (limit, loginSubstring) => {
    try {
        const users = await User.findAndCountAll({limit: 1});

        const filteredUsersList = users.rows
            .filter(user => !user.dataValues.is_deleted)
            .map(user => {
                // eslint-disable-next-line no-unused-vars
                const { password, createdAt, updatedAt, is_deleted, ...rest } = user.dataValues;
                return rest;
            });


        const sortedUsersList = filteredUsersList.sort((a, b) => {
            const loginA = a.login.toLowerCase();
            const loginB = b.login.toLowerCase();
            if (loginA < loginB) return -1;
            if (loginA > loginB) return 1;
            return 0;
        });

console.log(sortedUsersList)
        return sortedUsersList;
    } catch (error) {
        return ApiError.badRequest(error.details[0].message);
    }
};
