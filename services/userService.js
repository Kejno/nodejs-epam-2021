import { Op } from 'sequelize';
import User from '../models/User';
import ApiError from '../error/ApiError';
import { formatForCreate } from '../formatters/userFormatter';

export const createUserService = async (userData) => {
    try {
        const candidate = await User.findOne({
            attributes: ['id'],
            where: {
                [Op.and]: [{ login: userData.login }, { is_deleted: false }]
            }
        });

        if (candidate) {
            return { errorCode: 409, message: 'login should be unique' };
        }

        const formatedUser = formatForCreate(userData);
        const { id, login, age } = await User.create(formatedUser);

        return { id, login, age };
    } catch (error) {
        return ApiError.badRequest(error.details[0].message);
    }
};

export const getUsersService = async ({ limit }) => {
    try {
        const usersData = await User.findAndCountAll(
            {
                attributes: ['id', 'login', 'age'],
                limit,
                where : { is_deleted: false },
                order: ['login']
            }
        );

        return usersData;
    } catch (error) {
        return ApiError.badRequest(error.details[0].message);
    }
};

export const getUserByIdService = async (userId) => {
    try {
        const userData = await User.findOne({
            attributes: ['id', 'login', 'age'],
            where: { id: userId }
        });

        if (!userData || userData.dataValues.is_deleted) {
            return ApiError.badRequest('user not found');
        }
        const user = userData.dataValues;
        const { id, login, age } = user;

        return { id, login, age };
    } catch (error) {
        return ApiError.badRequest(error.details[0].message);
    }
};

export const updateUserService = async (userId, body) => {
    try {
        const userData = await User.update(body, {
            where: {
                id: userId,
                is_deleted: false
            },
            returning: ['id', 'login', 'age']
        });


        return userData[1][0];
    } catch (error) {
        return ApiError.badRequest(error);
    }
};

export const deleteUserService = async (userId) => {
    try {
        const userData = await User.update({ is_deleted: true }, {
            where: {
                id: userId,
                is_deleted: false
            }
        });

        return userData;
    } catch (error) {
        return ApiError.badRequest(error);
    }
};
