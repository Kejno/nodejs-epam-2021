import User from '../models/User';
import ApiError from '../error/ApiError';
import { generateToken } from '../utils/generateToken';

export const authUserService = async ({ login, password }) => {
    try {
        const userData = await User.findOne({
            attributes: ['id', 'login', 'age'],
            where: { login,  password }
        });

        if (!userData || userData.dataValues.is_deleted) {
            throw ApiError.badRequest('Invalid email or password');
        }

        const user = userData.dataValues;
        const { id, login: loginUser, age } = user;

        return { id, login: loginUser, age, accessToken: generateToken(id, login) };
    } catch (error) {
        throw ApiError.badRequest(error);
    }
};
